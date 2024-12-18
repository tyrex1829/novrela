import { Hono } from "hono";
import indexRouter from "./routes/indexV1.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", indexRouter);

export default app;
