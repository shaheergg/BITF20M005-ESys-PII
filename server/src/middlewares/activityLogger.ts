// gather information about every request and post in database in Activity Table

// Path: src/handlers/student.ts
import prisma from "../db";

export const activityLogger = async (req, res, next) => {
  const { method, path, body } = req;
  const { id } = req.user;
  try {
    await prisma.activity.create({
      data: {
        description: `${method} request on path: ${path}`,
        userId: id,
      },
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
  next();
};
