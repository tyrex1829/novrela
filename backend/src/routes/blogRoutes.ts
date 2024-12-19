import { Context, Hono } from "hono";
import {
  makeBlog,
  updateBlog,
  getBlog,
  getAllBlog,
} from "../controller/blogController";
import { auth } from "../middleware/authMiddleware";

const blogRouter = new Hono();

blogRouter.use(auth);

blogRouter.post("/", makeBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.get("/bulk", getAllBlog);

export default blogRouter;
