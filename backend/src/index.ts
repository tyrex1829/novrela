import { Hono } from "hono";
import indexRouter from "./routes/indexV1.js";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", indexRouter);

export default app;
