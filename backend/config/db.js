const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline
    ); /* use colors package*/
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
