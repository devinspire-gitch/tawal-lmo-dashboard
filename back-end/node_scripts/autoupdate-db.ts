import * as path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
import debugFactory from "debug";
const debug = debugFactory("script:autoupdate-db");
import app from "../server/server";
import DatabaseFiller from "../server/classes/DatabaseFiller";

const dataSource = app.dataSources.db;

const modelsNamesInLowerCase: string[] = [];
const modelsLeftToCheck: string[] = [];

Object.keys(app.models).forEach((model): void => {
  if (modelsNamesInLowerCase.indexOf(model.toLowerCase()) !== -1) return;
  modelsNamesInLowerCase.push(model.toLowerCase());
  modelsLeftToCheck.push(model);
});

const checkNextModel = (): void => {
  if (!modelsLeftToCheck.length) {
    DatabaseFiller.fillDefaultTables();
    return;
  }

  const model = modelsLeftToCheck.shift();

  // @ts-ignore because model is `string`, not `l.Model`. See https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-isactual
  dataSource.isActual(model, (err: Error, actual: boolean): void => {
    if (err) throw err;

    if (actual) {
      debug(`[✓] ${model}`);
      checkNextModel();
    } else {
      // @ts-ignore because model is `string`, not `l.Model`. See https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-isactual
      dataSource.autoupdate(model, async (error: Error): void => {
        if (error) throw error;
        debug(`[ ] ${model} - Updating... OK`);
        checkNextModel();
      });
    }
  });
};

debug("Checking if database tables are up to date...");

checkNextModel();
