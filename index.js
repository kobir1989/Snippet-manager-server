const dotenv =  require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const dbConnector = require("./config/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/snippet", require("./routers/snippetRouter"));

app.listen(port, async () => {
  console.log(`Server is up and running on port:${port}`);
  await dbConnector();
});
