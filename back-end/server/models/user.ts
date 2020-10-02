import STATUS from "http-status";
import app from "../server";
import { LoopbackError } from "../classes/LoopbackError";
import loopback, { AccessToken } from "loopback";
import { ExtendedRoleMapping } from "../types-and-interfaces/ExtendedRoleMapping";
import { Chief } from "./chief";

/** Represents a user of the application. */
export interface User extends loopback.User {
  id: string;
  realm: string;
  name: string;
  username: string;
  password: string;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  active: boolean;

  chiefId: number;
  chief(): Chief;

  toJSON();
  createAccessToken(ttl?: number): Promise<AccessToken>;
}

type StaticUser = typeof loopback.User;

/** Represents a user of the application. */
export interface UserModel extends StaticUser {
  afterRemote(event: string, callback: (ctx) => void): void;

  validate(
    field: string,
    callback: (err: () => void) => void,
    { message: string }
  ): void;

  observe(event: string, callback: (ctx) => void): void;

  once(event: string, callback: () => void): void;

  on(event: string, callback: () => void): void;
}

const getUsersIdsByRoleId = async (
  roleId: string | number
): Promise<string[]> => {
  const rolesMapping: ExtendedRoleMapping[] = await app.models.RoleMapping.find(
    {
      where: {
        roleId: roleId,
        principalType: app.models.RoleMapping.USER
      }
    }
  );

  const usersIdsList = rolesMapping.map(
    (roleMapping): string => roleMapping.principalId
  );

  return usersIdsList;
};

export default (Model: UserModel): void => {
  Model.observe(
    "before save",
    async (ctx): Promise<void> => {
      const contextModel: User = ctx.instance || ctx.data;

      if (!contextModel.name && contextModel.username) {
        contextModel.name = contextModel.username;
      }
    }
  );

  // After saving an user, verify changes in user role to update mapping.
  Model.observe(
    "after save",
    async (ctx): Promise<void> => {
      const contextModel = ctx.instance || ctx.data;

      if (typeof contextModel.role !== "undefined") {
        if (contextModel.role === "") {
          app.models.RoleMapping.destroyAll({
            principalType: app.models.RoleMapping.USER,
            principalId: contextModel.id
          });
        } else {
          const role = await app.models.Role.findOne({
            where: {
              name: contextModel.role
            }
          });

          if (!role) {
            const error = new LoopbackError();
            error.status = STATUS.NOT_FOUND;
            error.name = "ROLE_NOT_FOUND";
            error.message = "No role were found with this name.";
            throw error;
          }

          app.models.RoleMapping.findOrCreate({
            principalType: app.models.RoleMapping.USER,
            principalId: contextModel.id,
            roleId: role.id
          });
          app.models.RoleMapping.destroyAll({
            principalType: app.models.RoleMapping.USER,
            principalId: contextModel.id,
            roleId: { neq: role.id }
          });
        }
      }
    }
  );

  Model.on("dataSourceAttached", (): void => {
    // Important: The overrides need to be a function,
    // not an arrow function expression, cause it makes
    // use of 'this' and 'arguments' keywords.

    const find = Model.find;
    Model.find = function(filter): Promise<null> {
      const user = this;
      const args = arguments;
      if (filter && filter.where && filter.where.roleId) {
        getUsersIdsByRoleId(filter.where.roleId)
          .then(
            (usersIds): Promise<null> => {
              filter.where.id = { inq: usersIds };
              return find.apply(user, args);
            }
          )
          .catch(
            (): Promise<null> => {
              return find.apply(user, args);
            }
          );
      } else {
        return find.apply(user, args);
      }
    };

    const count = Model.count;
    Model.count = function(filter): Promise<number> {
      const user = this;
      const args = arguments;
      if (filter && filter.roleId) {
        getUsersIdsByRoleId(filter.roleId)
          .then(
            (usersIds): Promise<number> => {
              filter.id = { inq: usersIds };
              return count.apply(user, args);
            }
          )
          .catch(
            (): Promise<number> => {
              return count.apply(user, args);
            }
          );
      } else {
        return count.apply(user, args);
      }
    };
  });

  Model.afterRemote(
    "login",
    async (context): Promise<void> => {
      const result = context.result;
      const user: User = await app.models.User.findById(result.userId);
      if (!user.active) {
        const error = new LoopbackError();
        error.status = STATUS.UNAUTHORIZED;
        error.name = "USER_INACTIVE";
        error.message = "Your user has been inactivated.";
        throw error;
      }
    }
  );
};
