const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

const authRoute = require("./Routes/AuthRoutes");
const postRoute = require("./Routes/posts");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT);
app.listen(3000, () => console.log(`Example app listening on port 3000!`));

app.use(
  cors({
    origin: ["http://localhost:3001"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/", authRoute);