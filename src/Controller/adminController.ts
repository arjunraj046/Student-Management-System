import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { adminAddStudentUseCase, adminAssignTaskUseCase, adminLoginUseCase, adminRegisterUseCase } from "../UseCase/adminCase";
import { AdminLoginInterface, AdminRegisterInterface } from "../Types/adminInterface";
import { StudentRegisterInterface } from "../Types/studentInterface";
import { TaskData } from "../Types/taskInterface";

const adminController = () => {
  const adminRegister = asyncHandler(async (req: Request, res: Response) => {
    const data: AdminRegisterInterface | null = req.body;
    const result: any = await adminRegisterUseCase(data);
    res.json({
      status: "success",
      response: result,
    });
  });

  const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const data: AdminLoginInterface | null = req.body;
    const result = await adminLoginUseCase(data);
    if (result) {
      const { adminData, token } = result;
      res.json({
        status: "success",
        adminData: adminData,
        token: token,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Admin not found or login failed.",
      });
    }
  });

  const adminAddStudents = asyncHandler(async (req: Request, res: Response) => {
    const studentData: StudentRegisterInterface | null = req.body;
    const studentDocument: any = await adminAddStudentUseCase(studentData);
    res.json({
      status: "success",
      response: studentDocument,
    });
  });

  const assignTask = asyncHandler(async (req: Request, res: Response) => {
    let taskData: TaskData = req.body;
    console.log(taskData);
    let taskDocument = await adminAssignTaskUseCase(taskData);
    res.json({
      status: "success",
      response: taskDocument,
    });
  });

  return { adminRegister, adminLogin, adminAddStudents, assignTask };
};

export default adminController;
