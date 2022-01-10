import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import { readdirSync } from "fs";

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
dotenv.config();
const app = express();

mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB IS CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", userRoutes);
app.use("/api", postRoutes);
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
