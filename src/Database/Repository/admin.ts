import { passwordComparing } from "../../Services/bcrypt";
import { AdminData, AdminDocument, AdminLoginInterface, AdminRegisterInterface } from "../../Types/adminInterface";
import { HttpStatus } from "../../Types/httpStatus";
import { StudentRegisterInterface } from "../../Types/studentInterface";
import AppError from "../../Utils/appError";
import AdminModel from "../Models/adminSchema";
import StudentModel from "../Models/studentSchema";
import { MongoError } from "mongodb";
import { TaskDocument } from "./taskInterface";
import TaskModel from "../Models/taskSchema";

export const createAdminDB = async (data: AdminRegisterInterface): Promise<AdminDocument> => {
  try {
    let response = await AdminModel.create(data);
    return response;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      const errorObj: any = error;
      if (errorObj.keyPattern) {
        const duplicateKey = Object.keys(errorObj.keyPattern)[0];
        const customErrorMessage = `Duplicate key error: The ${duplicateKey} already exists.`;
        throw new Error(customErrorMessage);
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export const adminLoginDB = async (data: AdminLoginInterface) => {
  try {
    let adminData: AdminData | null = await AdminModel.findOne({ email: data.email });
    if (adminData) {
      let check = await passwordComparing(adminData.password, data.password);
      if (check) {
        return adminData;
      } else {
        new AppError("No Content", HttpStatus.BAD_REQUEST);
      }
    } else {
      new AppError("No Content", HttpStatus.BAD_REQUEST);
    }
  } catch (error) {
    throw error;
  }
};

export const addStudentDB = async (data: StudentRegisterInterface) => {
  try {
    const studentDocument = await StudentModel.create(data);
    return studentDocument;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      const errorObj: any = error;
      if (errorObj.keyPattern) {
        const duplicateKey = Object.keys(errorObj.keyPattern)[0];
        const customErrorMessage = `Duplicate key error: The ${duplicateKey} already exists.`;
        throw new Error(customErrorMessage);
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export const getStudentsIDs = async (department: string) => {
  try {
    const studentData = await StudentModel.aggregate([
      {
        $match: {
          department: department,
        },
      },
      {
        $group: {
          _id: null,
          studentIds: {
            $push: "$_id",
          },
        },
      },
    ]).exec();

    if (studentData.length > 0) {
      const studentArray = studentData[0]?.studentIds;
      console.log("studentData", studentData);
      console.log("studentArray", studentArray);
      return studentArray;
    } else {
      console.log("No students found for the given department.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export const assignTaskDB = async (Task: TaskDocument) => {
  try {
    let TaskDoc: any = await TaskModel.create(Task);
    return TaskDoc;
  } catch (error) {
    throw error;
  }
};
