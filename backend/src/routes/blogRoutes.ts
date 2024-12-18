import { Hono } from "hono";
import { makeBlog } from "../controller/userController";
import { updateBlog } from "../controller/userController";
import { getBlog } from "../controller/userController";
import { getAllBlog } from "../controller/userController";

const blogRouter = new Hono();

blogRouter.post("/", makeBlog);
blogRouter.put("/", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.get("/bulk", getAllBlog);

export default blogRouter;
