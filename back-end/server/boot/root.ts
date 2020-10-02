import { ExtendedLoopbackApplication } from "../types-and-interfaces/ExtendedLoopBackApplication";

/** Install a `/` route that returns server status. */
export default (app: ExtendedLoopbackApplication): void => {
  const router = app.loopback.Router();
  router.get("/", app.loopback.status());
  app.use(router);
};
