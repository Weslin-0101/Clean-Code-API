import express, { Express } from "express";
import setupMiddlewares from "./middlewares";
import setupApolloServer from "./apollo-server";
import setupRoutes from "./routes";
import setupStaticFiles from "./static-files";
import setupSwagger from "./config-swagger";

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupApolloServer(app);
  setupStaticFiles(app);
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
