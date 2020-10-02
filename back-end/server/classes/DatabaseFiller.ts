import debugFactory from "debug";
const debug = debugFactory("app:database-filler");
import {
  CHIEF,
  ISSUE_TYPE,
  OPERATING_MODEL,
  ROLE,
  SUBSTREAM,
  SETTING,
  VALUE_BLOCK,
  WORKSTREAM
} from "common/constants/models";
import { TEST_USERS } from "common/constants";
import { forEachSeries } from "p-iteration";
import app from "../server";
import { ExtendedStaticPersistedModel } from "../types-and-interfaces/ExtendedPersistedModel";
import { User } from "../models/user";
import { ExtendedRole } from "../types-and-interfaces/ExtendedRole";

class DatabaseFiller {
  /**
   * Returns a model of a specific type, defined by the model name.
   * @param model - Model name. Usually it's the name of the table.
   */
  private static async getRandomRecordFromDatabase<T>(
    model: string
  ): Promise<T> {
    const appModel: ExtendedStaticPersistedModel = app.models[model];
    const numberOfRecords = await appModel.count();
    const randomIndex = Math.floor(Math.random() * numberOfRecords);
    const randomRecordFromDatabase: ExtendedStaticPersistedModel = await app.models[
      model
    ].findOne({
      skip: randomIndex
    });
    return (randomRecordFromDatabase as unknown) as T;
  }

  /**
   * Fill in an specific order the database with default data for tables, if they are empty.
   */
  public static async fillDefaultTables(): Promise<void> {
    await this.fillDefaultRoles();
    await this.fillDefaultAdminAccount();
    await this.fillDefaultChiefs();
    await this.fillDefaultIssueTypes();
    await this.fillDefaultOperatingModels();
    await this.fillDefaultSettings();
    await this.fillDefaultValueBlocks();
    await this.fillDefaultWorkstreams();
    await this.fillDefaultSubstreams();
  }

  public static async createModelRecords(model, records): Promise<void> {
    await forEachSeries(
      Object.keys(records),
      async (key): Promise<void> => {
        const recordFound = await model.count({ id: records[key].id });
        if (!recordFound) await model.create(records[key]);
      }
    );
  }

  public static async fillDefaultChiefs(): Promise<void> {
    debug("DatabaseFiller: Filling default Chiefs...");
    return this.createModelRecords(app.models.Chief, CHIEF);
  }

  public static async fillDefaultIssueTypes(): Promise<void> {
    debug("DatabaseFiller: Filling default Issue Types...");
    return this.createModelRecords(app.models.IssueType, ISSUE_TYPE);
  }

  public static async fillDefaultOperatingModels(): Promise<void> {
    debug("DatabaseFiller: Filling default Operating Models...");
    return this.createModelRecords(app.models.OperatingModel, OPERATING_MODEL);
  }

  public static async fillDefaultSettings(): Promise<void> {
    debug("DatabaseFiller: Filling default Settings...");
    return this.createModelRecords(app.models.Setting, SETTING);
  }

  public static async fillDefaultValueBlocks(): Promise<void> {
    debug("DatabaseFiller: Filling default Value Blocks...");
    return this.createModelRecords(app.models.ValueBlock, VALUE_BLOCK);
  }

  public static async fillDefaultSubstreams(): Promise<void> {
    debug("DatabaseFiller: Filling default Substreams...");
    return this.createModelRecords(app.models.Substream, SUBSTREAM);
  }

  public static async fillDefaultWorkstreams(): Promise<void> {
    debug("DatabaseFiller: Filling default Workstreams...");
    return this.createModelRecords(app.models.Workstream, WORKSTREAM);
  }

  public static async fillDefaultRoles(): Promise<void> {
    debug("DatabaseFiller: Filling default Roles...");
    const records = ROLE;
    await forEachSeries(
      Object.keys(records),
      async (key): Promise<void> => {
        const recordFound = await app.models.Role.count({
          id: records[key].id
        });
        if (!recordFound) {
          const { name, description } = records[key];
          await app.models.Role.create({ name, description });
        }
      }
    );
  }

  public static async fillDefaultAdminAccount(): Promise<void> {
    const hasUsersRegistered = await app.models.User.count();

    if (hasUsersRegistered) return;

    const adminUser = await app.models.User.create<User>({
      name: "Administrator",
      username: "admin",
      email: "admin@tawal.dev",
      password: "123",
      emailVerified: "true"
    });

    const adminRole = await app.models.Role.findById<ExtendedRole>(
      ROLE.ADMIN.id
    );

    debug(
      "DatabaseFiller: Generating default Administrator Account... (admin:123)"
    );

    await adminRole.principals.create({
      principalType: app.models.RoleMapping.USER,
      principalId: adminUser["id"]
    });
  }

  /** Create a tests users for each all role, and all with password '123'. */
  public static async createTestUsers(): Promise<void> {
    const usersCount = await app.models.User.count();

    // We expect to have only the default admin user on the database.
    // If we have more users, it means we've already inserted the
    // test users, so we end this function here.
    if (usersCount !== 1) return;

    const adminRole = await app.models.Role.findById<ExtendedRole>(
      ROLE.ADMIN.id
    );

    debug(`DatabaseFiller: Generating ${TEST_USERS.length} Test Users...`);

    await forEachSeries(
      TEST_USERS,
      async (testUser: { name: string; username: string }): Promise<void> => {
        const adminUser = await app.models.User.create({
          name: testUser.name,
          username: `${testUser.username}.admin`,
          email: `${testUser.username}.admin@tawal.dev`,
          password: "123",
          emailVerified: "true"
        });

        await adminRole.principals.create({
          principalType: app.models.RoleMapping.USER,
          principalId: adminUser.id
        });
      }
    );
  }
}

export default DatabaseFiller;
