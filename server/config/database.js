import mongoose from "mongoose";

const connectWithDatabase = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the data base", error.message);
  }
};

export default connectWithDatabase;
