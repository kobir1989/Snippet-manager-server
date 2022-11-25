const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const dbConnector = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//Routes
app.use("/snippet", require("./routers/snippetRouter"));
app.use("/auth", require("./routers/userRouter"));

app.listen(port, async () => {
  console.log(`Server is up and running on port:${port}`);
  await dbConnector();
});
