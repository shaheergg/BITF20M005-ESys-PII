import app from "./server";
import * as dotenv from "dotenv";

app.get("/", (req, res) => {
  res.json({ message: "API says hello!" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
