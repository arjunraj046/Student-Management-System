import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const studentController = () => {
  const studentLogin = asyncHandler(async (req: Request, res: Response) => {
    let response;
    res.json({
      status: "success",
      response,
    });
  });

  const taskList = asyncHandler(async (req: Request, res: Response) => {
    let response;
    res.json({
      status: "success",
      response,
    });
  });

  const taskUpdation = asyncHandler(async (req: Request, res: Response) => {
    let response;
    res.json({
      status: "success",
      response,
    });
  });

  return { studentLogin, taskList, taskUpdation };
};

export default studentController;
