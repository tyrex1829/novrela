import { Context } from "hono";
import { getPrismaClient } from "../db";
import {
  makeBlogPost,
  updateBlogPost,
} from "@tyrex1829/novrela-common-app/dist/zod/blog.js";

export const makeBlog = async (c: Context) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success, error } = makeBlogPost.safeParse({
    title: body.title,
    content: body.content,
    published: false,
    authorId: c.get("userId"),
  });
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input", details: error.errors });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: false,
        authorId: c.get("userId"),
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
      },
    });

    if (newPost) {
      newPost.published = true;
    }

    return c.json(
      {
        message: `Successfully created post.`,
        newPost,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: `can't create post wright now: ${error}`,
      },
      500
    );
  }
};

export const updateBlog = async (c: Context) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success } = updateBlogPost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const updatePost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: c.get("userId"),
      },
      data: {
        title: body.title,
        content: body.content,
        published: true,
      },
      select: {
        title: true,
        content: true,
        published: true,
      },
    });
    return c.json(
      {
        message: `Successfully updated the post`,
        updatePost,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: `Can't update right now: ${error}`,
      },
      500
    );
  }
};

export const getBlog = async (c: Context) => {
  const prisma = getPrismaClient(c);
  const postId = c.req.param("id");

  try {
    const getPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!getPost) {
      return c.json(
        {
          message: `no post present with given postId.`,
        },
        404
      );
    }

    return c.json(
      {
        message: `Successfully fetched the particular post.`,
        getPost,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: `Can't fetch this post right now.`,
      },
      500
    );
  }
};

export const getAllBlog = async (c: Context) => {
  const prisma = getPrismaClient(c);

  try {
    const allPostTitles = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return c.json(
      {
        message: `All posts`,
        allPostTitles,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: `Can't get posts: ${error}`,
      },
      411
    );
  }
};
