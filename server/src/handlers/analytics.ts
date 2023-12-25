import prisma from "../db";

export const getGenderDistribution = async (req, res) => {
  try {
    const genderDistribution = await prisma.student.groupBy({
      by: ["gender"],
      _count: {
        _all: true,
      },
    });

    const formattedGenderDistribution = genderDistribution.map((entry) => ({
      gender: entry.gender,
      count: entry._count._all,
    }));

    res.json({ data: formattedGenderDistribution });
  } catch (error) {
    console.error("Error getting gender distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getActivitiesPerDay = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    const activities = await prisma.activity.findMany({
      where: {
        createdAt: {
          gte: lastMonthDate,
        },
        userId: req.user.id,
      },
    });

    // Group activities by day and count them
    const activitiesPerDay = activities.reduce((acc, activity) => {
      const activityDay = activity.createdAt.toISOString().split("T")[0];

      if (acc[activityDay]) {
        acc[activityDay]++;
      } else {
        acc[activityDay] = 1;
      }

      return acc;
    }, {});

    const formattedActivitiesPerDay = Object.entries(activitiesPerDay).map(
      ([day, count]) => ({
        day,
        count,
      })
    );

    res.json({ data: formattedActivitiesPerDay });
  } catch (error) {
    console.error("Error getting activities per day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 *
 * @description Get activities in the last 24 hours
 * @param res, req
 */

export const getActivitiesLast24Hours = async (req, res) => {
  try {
    const currentDate = new Date();
    const last24HoursDate = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );

    const activities = await prisma.activity.findMany({
      where: {
        createdAt: {
          gte: last24HoursDate,
        },
        userId: req.user.id,
      },
    });

    // Group activities by day and count them
    const activitiesPerDay = activities.reduce((acc, activity) => {
      const activityDay = activity.createdAt.toISOString().split("T")[0];

      if (acc[activityDay]) {
        acc[activityDay]++;
      } else {
        acc[activityDay] = 1;
      }

      return acc;
    }, {});

    const formattedActivitiesPerDay = Object.entries(activitiesPerDay).map(
      ([day, count]) => ({
        day,
        count,
      })
    );

    res.json({ data: formattedActivitiesPerDay });
  } catch (error) {
    console.error("Error getting activities in the last 24 hours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @description Student Department Distribution
 * @param res, req
 */

export const getDepartmentDistribution = async (req, res) => {
  try {
    const departmentDistribution = await prisma.student.groupBy({
      by: ["department"],
      _count: {
        _all: true,
      },
    });

    const formattedDepartmentDistribution = departmentDistribution.map(
      (entry) => ({
        department: entry.department,
        count: entry._count._all,
      })
    );

    res.json({ data: formattedDepartmentDistribution });
  } catch (error) {
    console.error("Error getting department distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDegreeDistribution = async (req, res) => {
  try {
    const degreeDistribution = await prisma.student.groupBy({
      by: ["degree"],
      _count: {
        _all: true,
      },
    });

    const formattedDegreeDistribution = degreeDistribution.map((entry) => ({
      degree: entry.degree,
      count: entry._count._all,
    }));

    res.json({ data: formattedDegreeDistribution });
  } catch (error) {
    console.error("Error getting degree distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGraduatedStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        endDate: {
          lte: new Date(),
        },
      },
    });

    res.json({ data: students });
  } catch (error) {
    console.error("Error getting graduated students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentlyEnrolledStudents = async (req, res) => {
  try {
    const currentDate = new Date();

    const students = await prisma.student.findMany({
      where: {
        endDate: {
          gte: currentDate,
        },
      },
    });

    res.json({ data: students });
  } catch (error) {
    console.error("Error getting currently enrolled students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecentlyEnrolledStudents = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    const students = await prisma.student.findMany({
      where: {
        startDate: {
          gte: lastMonthDate,
        },
      },
    });

    res.json({ data: students });
  } catch (error) {
    console.error("Error getting recently enrolled students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAboutToGraduateStudents = async (req, res) => {
  try {
    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const students = await prisma.student.findMany({
      where: {
        endDate: {
          lte: nextMonthDate,
        },
      },
    });

    res.json({ data: students });
  } catch (error) {
    console.error("Error getting about to graduate students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProvincialDistribution = async (req, res) => {
  try {
    const provincialDistribution = await prisma.student.groupBy({
      by: ["city"],
      _count: {
        _all: true,
      },
    });

    const formattedProvincialDistribution = provincialDistribution.map(
      (entry) => ({
        city: entry.city,
        count: entry._count._all,
      })
    );

    res.json({ data: formattedProvincialDistribution });
  } catch (error) {
    console.error("Error getting provincial distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
