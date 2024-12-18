import { Hono } from "hono";
import userRouter from "./userRoutes";
import blogRouter from "./blogRoutes";

const indexRouter = new Hono();

indexRouter.route("/user", userRouter);
indexRouter.route("/blog", blogRouter);

export default indexRouter;
