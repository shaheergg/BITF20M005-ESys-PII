import { Router } from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
} from "./handlers/student";
import { checkInterest } from "./middlewares/checkInterest";
import {
  getAllInterests,
  getBottom5Interests,
  getDistinctInterests,
  getTop5Interests,
} from "./handlers/interest";
import {
  getAboutToGraduateStudents,
  getActivitiesLast24Hours,
  getActivitiesPerDay,
  getCurrentlyEnrolledStudents,
  getDegreeDistribution,
  getDepartmentDistribution,
  getGenderDistribution,
  getGraduatedStudents,
  getProvincialDistribution,
  getRecentlyEnrolledStudents,
} from "./handlers/analytics";
import { handleInputError } from "./middlewares/handleInputError";
import { body } from "express-validator";
const router = Router();

router.get("/students", getAllStudents);

router.get("/students/:id", getOneStudent);

router.post(
  "/students",
  checkInterest,
  body("name").isString(),
  body("email").isEmail(),
  body("rollNumber").isString(),
  body("gender").isString(),
  body("dob").isString(),
  body("city").isString(),
  body("department").isString(),
  body("degree").isString(),
  body("subject").isString(),
  body("startDate").isString(),
  body("endDate").isString(),
  body("interestId").isInt(),
  handleInputError,
  createNewStudent
);

router.put(
  "/students/:id",
  body("name").isString(),
  body("email").isEmail(),
  body("rollNumber").isString(),
  body("gender").isString(),
  body("dob").isString(),
  body("city").isString(),
  body("department").isString(),
  body("degree").isString(),
  body("subject").isString(),
  body("startDate").isString(),
  body("endDate").isString(),
  updateStudent
);

router.delete("/students/:id", deleteStudent);

router.get("/interstes", getAllInterests);

router.get("/interests/top-5", getTop5Interests);

router.get("/interests/bottom-5", getBottom5Interests);

router.get("/interests/distinct", getDistinctInterests);

router.get("/gender-distribution", getGenderDistribution);

router.get("/activities-per-day", getActivitiesPerDay);

router.get("/activities-last-day", getActivitiesLast24Hours);

router.get("/department-distribution", getDepartmentDistribution);

router.get("/degree-distribution", getDegreeDistribution);

router.get("/graduated-students", getGraduatedStudents);

router.get("/sutdying", getCurrentlyEnrolledStudents);

router.get("/about-to-gradaute", getAboutToGraduateStudents);

router.get("/recently-enrolled", getRecentlyEnrolledStudents);

router.get("/province-distribution", getProvincialDistribution);
export default router;
