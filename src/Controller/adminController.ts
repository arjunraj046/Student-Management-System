import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const adminController = () => {
  const adminRegister = asyncHandler(async (req: Request, res: Response) => {
    console.log("Hello from adminRegister");
    let response: any | null = req.body;

    res.json({
      status: "success",
      response,
    });
  });

  const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    let response;

    res.json({
      status: "success",
      response,
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
