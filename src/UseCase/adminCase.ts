import { Types } from "mongoose";
import { createAdminDB, adminLoginDB, addStudentDB, getStudentsIDs, assignTaskDB } from "../Database/Repository/admin";
import { passwordHashing } from "../Services/bcrypt";
import { generateToken } from "../Services/jwt";
import { AdminData, AdminLoginInterface, AdminRegisterInterface } from "../Types/adminInterface";
import { HttpStatus } from "../Types/httpStatus";
import { StudentRegisterInterface } from "../Types/studentInterface";
import { TaskData, TaskDocument } from "../Types/taskInterface";
import AppError from "../Utils/appError";
import TaskModel from "../Database/Models/taskSchema";

// Admin Register
export const adminRegisterUseCase = async (data: AdminRegisterInterface | null) => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }
  const hashPassword = await passwordHashing(data.password);
  if (hashPassword === null) {
    throw new AppError("Password hashing failed", HttpStatus.INTERNAL_SERVER_ERROR);
  }
  data.password = hashPassword;
  try {
    const studentDocument = await createAdminDB(data);
    return studentDocument;
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
export const adminLoginUseCase = async (data: AdminLoginInterface | null) => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }
  try {
    let adminData: AdminData | undefined = await adminLoginDB(data);
    if (adminData) {
      let token: string = generateToken(adminData.name);
      return { adminData, token };
    }
  } catch (error) {
    throw new AppError("An error occurred", HttpStatus.CONFLICT);
  }
};

// Admin Add Student
export const adminAddStudentUseCase = async (data: StudentRegisterInterface | null) => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }
  const hashPassword = await passwordHashing(data.password);
  if (hashPassword === null) {
    throw new AppError("Password hashing failed", HttpStatus.INTERNAL_SERVER_ERROR);
  }
  data.password = hashPassword;
  try {
    let studentDocument = await addStudentDB(data);
    return studentDocument;
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      throw new AppError(errorMessage, HttpStatus.CONFLICT);
    } else {
      throw new AppError("An error occurred", HttpStatus.CONFLICT);
    }
  }
};

// Admin Assign Task to Student
export const adminAssignTaskUseCase = async (data: TaskData) => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError("No Content", HttpStatus.NO_CONTENT);
  }
  try {
    const arrayOfStudents: Types.ObjectId[] = await getStudentsIDs(data.department);
    const taskToAssign = new TaskModel({
      assignedBy: data.assignedBy,
      title: data.title,
      publishDate: new Date(),
      description: data.description,
      department: data.department,
      dueTime: data.dueTime,
      status: {
        pending: arrayOfStudents,
        completed: [],
        overdue: [],
      },
    });
    console.log("Task to upload", taskToAssign);
    let assignedTask = await assignTaskDB(taskToAssign);
    return assignedTask;
  } catch (error) {
    throw new AppError("An error occurred", HttpStatus.CONFLICT);
  }
};

// Admin view task details
// export const taskDetailsUseCase = async (data: any) => {
//   return 1;
// };
