import express from "express";
import dotenv from "dotenv";
import connectWithDatabase from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/auth/", userRoutes);

const port = process.env.PORT;
const startMyServer = async () => {
  try {
    await connectWithDatabase();
    app.listen(port, () => {
      console.log(`Port successfully running on ${port}`);
    });
  } catch (error) {
    console.log(`error while connecting with the server : ${error.message}`);
  }
};
startMyServer();
