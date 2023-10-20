import { createAdminDB, adminLoginDB } from "../Database/Repository/admin";
import { passwordHashing } from "../Services/bcrypt";
import {
  AdminLoginInterface,
  AdminRegisterInterface,
} from "../Types/adminInterface";
import { HttpStatus } from "../Types/httpStatus";
import AppError from "../Utils/appError";

// Admin Register

export const adminRegisterUseCase = async (data: AdminRegisterInterface) => {
  if (Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }

  const hashPassword = await passwordHashing(data.password);

  if (hashPassword === null) {
    throw new AppError(
      "Password hashing failed",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  data.password = hashPassword;

  try {
    const res = await createAdminDB(data);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new AppError(errorMessage, HttpStatus.CONFLICT);
    } else {
      throw new AppError("An error occurred", HttpStatus.CONFLICT);
    }
  }
};

// Admin Login
export const adminLoginUseCase = async (data: AdminLoginInterface) => {
  console.log("Received data:", data);

  if (Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }

  try {
    let response: any = await adminLoginDB(data?.email);
    let token
    
    
    
    return {response,token}
  } catch (error) {
    throw new AppError("An error occurred", HttpStatus.CONFLICT);
  }
};

// Admin Add Student
export const adminAddStudentUseCase = async (data: any) => {
  return 1;
};

// Admin Assign Task to Student
export const adminAssignTaskUseCase = async (data: any) => {
  return 1;
};

// Admin view task details
export const taskDetailsUseCase = async (data: any) => {
  return 1;
};
