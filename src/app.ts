import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./Database/databaseConnection";
import adminRoute from "./Routes/admin";
import studentRoute from "./Routes/student";

dotenv.config({ path: "config.env" });

const app: Express = express();
app.use(express.json());

//  Database Connection
connectDB();

// Define a routes
app.use("/admin", adminRoute());
app.use("/student", studentRoute());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
