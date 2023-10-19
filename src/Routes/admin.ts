import express from "express";
import adminController from "../Controller/adminController";

const adminRoute = () => {
  const router = express.Router();
  const AdminController = adminController();

  router.post("/register", AdminController.adminRegister);
  router.post("/login", AdminController.adminLogin);
  router.post("/assign-task", AdminController.assignTask);

  return router;
};

export default adminRoute;
