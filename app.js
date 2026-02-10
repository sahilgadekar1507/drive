const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.config.js");
connectDB();
const userRouter = require("./routes/user.routes.js");
const indexRouter = require("./routes/index.routes.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/user", userRouter);


app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});
