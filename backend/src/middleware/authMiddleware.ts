import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const auth = async (c: Context, next: Next) => {
  try {
    const jwt = c.req.header("authorization") || "";

    if (!jwt) {
      c.status(401);
      return c.json({
        error: `No token provided`,
      });
    }

    const token = jwt.split(" ")[1];

    if (!token) {
      return c.json({ error: "Invalid token format" }, 401);
    }

    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      c.status(401);
      return c.json({ error: "Invalid token" });
    }

    c.set("userId", payload.id);

    await next();
  } catch (error) {
    return c.json(
      {
        message: `Auth failed: ${error}`,
      },
      500
    );
  }
};
