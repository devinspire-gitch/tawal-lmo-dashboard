import app from "./server";

before((done): void => {
  app.start();
  app.on("started", done);
});

after((): void => {
  app.stop();
});
