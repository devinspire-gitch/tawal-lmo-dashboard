import { ExtendedLoopbackApplication } from "../types-and-interfaces/ExtendedLoopBackApplication";

/** Install a `/robots.txt` route that returns information for web crawlers. */
export default (app: ExtendedLoopbackApplication): void => {
  const router = app.loopback.Router();
  router.get("/robots.txt", (req, res): void => {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  });
  app.use(router);
};
