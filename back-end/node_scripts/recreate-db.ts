import * as path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

if (process.env.NODE_ENV === "production") {
  throw new Error(
    "This script is not supposed to run on production environment."
  );
}

import debugFactory from "debug";
const debug = debugFactory("script:recreate-all-database-tables");
import server from "../server/server";
import DatabaseFiller from "../server/classes/DatabaseFiller";

const numModels = Object.keys(server.models).length;
const dataSource = server.dataSources.db;

dataSource.setMaxListeners(numModels);

dataSource.automigrate(
  async (err): Promise<void> => {
    if (err) throw err;
    await DatabaseFiller.fillDefaultTables();
    debug("Database tables were recreated and filled with default data!");
  }
);
