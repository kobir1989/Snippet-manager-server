const mongoose = require("mongoose");
const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.DB_URI_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Database connection Failed!");
  }
};

module.exports = dbConnector;
