import { Hono } from "hono";
import userRouter from "./userRoutes";
import blogRouter from "./blogRoutes";

const indexRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variable: {
    userId: string;
  };
}>();

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

export default indexRouter;
