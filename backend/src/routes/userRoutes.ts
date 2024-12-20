import { Hono } from "hono";
import { signup } from "../controller/userController";
import { signin } from "../controller/userController";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variable: {
    userId: string;
  };
}>();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;
