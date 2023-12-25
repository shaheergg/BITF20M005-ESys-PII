import prisma from "../db";

export const getAllInterests = async (req, res) => {
  try {
    const interests = await prisma.interest.findMany();
    res.json({ data: interests });
  } catch (error) {
    console.error("Error retrieving interests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTop5Interests = async (req, res) => {
  try {
    const interests = await prisma.interest.findMany({
      include: {
        students: true,
      },
    });

    const sortedInterests = interests.sort(
      (a, b) => b.students.length - a.students.length
    );

    const top5Interests = sortedInterests.slice(0, 5);

    res.json({ data: top5Interests });
  } catch (error) {
    console.error("Error retrieving top 5 interests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBottom5Interests = async (req, res) => {
  try {
    const interests = await prisma.interest.findMany({
      include: {
        students: true,
      },
    });

    const sortedInterests = interests.sort(
      (a, b) => a.students.length - b.students.length
    );

    const bottom5Interests = sortedInterests.slice(0, 5);

    res.json({ data: bottom5Interests });
  } catch (error) {
    console.error("Error retrieving bottom 5 interests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDistinctInterests = async (req, res) => {
  try {
    const interests = await prisma.interest.findMany({
      distinct: ["name"],
    });

    res.json({ data: interests });
  } catch (error) {
    console.error("Error retrieving distinct interests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
