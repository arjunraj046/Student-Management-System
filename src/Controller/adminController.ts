import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { adminLoginUseCase, adminRegisterUseCase } from "../UseCase/adminCase";
import { HttpStatus } from "../Types/httpStatus";
import AppError from "../Utils/appError";

const adminController = () => {
  const adminRegister = asyncHandler(async (req: Request, res: Response) => {
    const data: any | null = req.body;
    const result: any = await adminRegisterUseCase(data);
    res.json({
      status: "success",
      result,
    });
  });

  const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const data: any | null = req.body;
    const result: any = await adminLoginUseCase(data);
    res.json({
      status: "success",
      result,
    });
  });

  const assignTask = asyncHandler(async (req: Request, res: Response) => {
    let response;
    res.json({
      status: "success",
      response,
    });
  });

  return { adminRegister, adminLogin, assignTask };
};

export default adminController;
