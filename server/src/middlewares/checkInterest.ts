// if the the interest is new, create it, if it already exists assign it to the user
import prisma from "../db";

export const checkInterest = async (req, res, next) => {
  const { interestName } = req.body;
  try {
    const interest = await prisma.interest.findFirst({
      where: {
        name: interestName,
      },
    });
    if (interest) {
      req.body.interestId = interest.id;
      next();
    } else {
      const newInterest = await prisma.interest.create({
        data: {
          name: interestName,
        },
      });
      req.body.interestId = newInterest.id;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
