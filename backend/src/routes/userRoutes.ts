import { Hono } from "hono";
import { signup } from "../controller/userController";
import { signin } from "../controller/userController";

const userRouter = new Hono();

userRouter.post("/signup", signup);
userRouter.post("/signup", signin);

export default userRouter;
