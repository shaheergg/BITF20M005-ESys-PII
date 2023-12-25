import express from "express";
import cors from "cors";
import router from "./router";
import { protect } from "./middlewares/authMiddleware";
import { createNewUser, singIn } from "./handlers/user";
import { activityLogger } from "./middlewares/activityLogger";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, activityLogger, router);
app.post("/user", createNewUser);
app.post("/signin", singIn);
export default app;
