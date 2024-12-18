import { Hono } from "hono";
import { signup } from "../controller/blogController";
import { signin } from "../controller/blogController";

const userRouter = new Hono();

userRouter.post("/signup", signup);
userRouter.post("/signup", signin);

export default userRouter;
