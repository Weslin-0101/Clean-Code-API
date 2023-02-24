import express from "express";
import setupMiddlewares from "./middlewares";
import setupApolloServer from "./apollo-server";
import setupRoutes from "./routes";
import setupStaticFiles from "./static-files";
import setupSwagger from "./config-swagger";

const app = express();
setupApolloServer(app);
setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);
export default app;
