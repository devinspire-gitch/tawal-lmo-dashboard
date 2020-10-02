import * as path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

if (process.env.NODE_ENV === "production") {
  throw new Error(
    "This script is not supposed to run on production environment."
  );
}

import debugFactory from "debug";
const debug = debugFactory("script:insert-dummy-data-on-database");
import DatabaseFiller from "../server/classes/DatabaseFiller";

async function fillDatabase(): Promise<void> {
  await DatabaseFiller.fillDefaultTables();
  await DatabaseFiller.createTestUsers();
  debug("Dummy data successfully inserted on database.");
}

fillDatabase();
