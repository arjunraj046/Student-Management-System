import express from "express";
import studentController from "../Controller/studentController";

const studentRoute = () => {
  const router = express.Router();
  const StudentController = studentController();

  router.post("/login",StudentController.studentLogin);
  router.get("/task",StudentController.taskList);
  router.patch("/update-task",StudentController.taskUpdation);

  return router;
};

export default studentRoute;
