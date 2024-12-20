import { Context, Hono } from "hono";
import {
  makeBlog,
  updateBlog,
  getBlog,
  getAllBlog,
} from "../controller/blogController";
import { auth } from "../middleware/authMiddleware";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variable: {
    userId: string;
  };
}>();

blogRouter.use("/*", auth);

blogRouter.post("/", makeBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/bulk", getAllBlog);
blogRouter.get("/:id", getBlog);

export default blogRouter;
