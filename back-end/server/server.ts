import dotenv from "dotenv";
import { join } from "path";

const dotenvResult = dotenv.config({ path: join(__dirname, "..", ".env") });
if (dotenvResult.error) {
  throw new Error(
    "There's no .env file on the root. Please, refer to README.md to get instructions about creating the environment configuration file."
  );
}

import { ExtendedLoopbackApplication } from "./types-and-interfaces/ExtendedLoopBackApplication";
import { readFileSync } from "fs";
import https from "https";
import http from "http";
import loopback from "loopback";
import boot from "loopback-boot";
import debugFactory from "debug";

const debug = debugFactory("app");

// @ts-ignore
const app: ExtendedLoopbackApplication = loopback();

export default app;

let server: https.Server | http.Server | null = null;

if (process.env.SSL_CERTIFICATE && process.env.SSL_CERTIFICATE_KEY) {
  const serverOptions = {
    key: readFileSync(process.env.SSL_CERTIFICATE_KEY),
    cert: readFileSync(process.env.SSL_CERTIFICATE)
  };

  app.start = (): void => {
    server = https
      .createServer(serverOptions, app)
      .listen(app.get("port"), (): void => {
        app.emit("started");
        const baseUrl = `https://${app.get("host")}:${app.get("port")}`;
        debug("Web server listening at: %s", baseUrl);
        if (app.get("loopback-component-explorer")) {
          const explorerPath = app.get("loopback-component-explorer").mountPath;
          debug("Browse your REST API at %s%s", baseUrl, explorerPath);
        }
      });
  };
} else {
  app.start = (): void => {
    server = app.listen((): void => {
      app.emit("started");
      const baseUrl = app.get("url").replace(/\/$/, "");
      debug("Web server listening at: %s", baseUrl);
      if (app.get("loopback-component-explorer")) {
        const explorerPath = app.get("loopback-component-explorer").mountPath;
        debug("Browse your REST API at %s%s", baseUrl, explorerPath);
      }
    });
  };
}

app.stop = (): void => {
  if (server) {
    server.close((): void => {
      server = null;
    });
  }
};

boot(app, __dirname, (err: Error): void => {
  if (err) throw err;
  if (require.main === module) {
    app.start();
  }
});
