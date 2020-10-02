import getValue from "get-value";
import STATUS from "http-status";
import app from "../server";
import { LoopbackError } from "../classes/LoopbackError";
import { ExtendedStaticPersistedModel } from "../types-and-interfaces/ExtendedPersistedModel";
import { NextFunction } from "express";

interface ContextModel {
  [key: string]: string | number;
}

interface ModelObserveContext {
  data: ContextModel;
  instance: { [key: string]: ContextModel };
  where: { id: number };
}

interface MixinOptions {
  fields: string[];
  role: string;
}

/** Checks if the user has privileges to edit a model properties. */
export default (
  Model: ExtendedStaticPersistedModel,
  options: MixinOptions
): void => {
  Model.observe(
    "before save",
    (ctx: ModelObserveContext, next: NextFunction): void => {
      let changedProtectedProperty = false;
      let contextModel: ContextModel, modelId: number;
      const allowedFields = ["updatedAt", "createdAt"].concat(options.fields);

      if (ctx.instance) {
        contextModel = ctx.instance["__data"];
        modelId = Number(contextModel.id);
      }

      if (ctx.data) {
        contextModel = ctx.data;
        modelId = ctx.where.id;
      }

      const currentlyLoggedInUserId = getValue(
        ctx,
        "options.accessToken.userId"
      );

      app.models.User.findById(
        currentlyLoggedInUserId,
        { include: ["roles"] },
        function(err, user): NextFunction | void {
          if (err || !user || !modelId) {
            return next();
          }

          const rolesNamesFromUser: string[] = user
            .roles()
            .map((role): string => role.name);

          if (!rolesNamesFromUser.includes(options.role)) {
            return next();
          }

          const attributesToPreventChanges = Object.keys(contextModel).filter(
            (prop): boolean => !allowedFields.includes(prop)
          );

          Model.findById(modelId, function(err, oldModel): NextFunction | void {
            attributesToPreventChanges.forEach((prop): void => {
              changedProtectedProperty =
                changedProtectedProperty ||
                getValue(contextModel, prop) !== oldModel[prop];
            });

            if (!changedProtectedProperty) return next();

            const notAllowedFieldsString = options.fields.join(", ");

            const error = new LoopbackError();
            error.status = STATUS.FORBIDDEN;
            error.name = "FIELD_NOT_ALLOWED";
            error.message = `You only have access to edit the following fields: ${notAllowedFieldsString}`;
            next(error);
          });
        }
      );
    }
  );
};
