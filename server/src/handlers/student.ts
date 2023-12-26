import prisma from "../db";

export const getAllStudents = async (req, res) => {
  try {
    // Assuming req.user.id is available in your request object
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        students: {
          include: {
            interest: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ data: user.students });
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });
    res.status(200).json({ data: student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the student" });
  }
};

export const createNewStudent = async (req, res) => {
  const {
    name,
    email,
    rollNumber,
    gender,
    dob,
    city,
    department,
    degree,
    subject,
    startDate,
    endDate,
  } = req.body;
  const userId = req.user.id;
  const { interestId } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        name,
        email,
        rollNumber,
        gender,
        dob,
        city,
        department,
        degree,
        subject,
        startDate,
        endDate,
        userId: userId,
        interestId: interestId,
      },
    });
    res.status(201).json({ student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the student" });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    rollNumber,
    gender,
    dob,
    city,
    department,
    degree,
    subject,
    startDate,
    endDate,
  } = req.body;
  const userId = req.user.id;
  try {
    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        rollNumber,
        gender,
        dob,
        city,
        department,
        degree,
        subject,
        startDate,
        endDate,
        userId: userId,
      },
    });
    res.status(200).json({ student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the student" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ student });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the student" });
  }
};
