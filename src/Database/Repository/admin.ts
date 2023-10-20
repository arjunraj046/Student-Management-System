import { passwordComparing } from "../../Services/bcrypt";
import { AdminData, AdminDocument, AdminLoginInterface, AdminRegisterInterface } from "../../Types/adminInterface";
import { HttpStatus } from "../../Types/httpStatus";
import { StudentRegisterInterface } from "../../Types/studentInterface";
import AppError from "../../Utils/appError";
import AdminModel from "../Models/adminSchema";
import StudentModel from "../Models/studentSchema";
import { MongoError } from "mongodb";

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

export const getStudentsIDs = (department: string) => {
  try {
    let studentsarray = StudentModel.aggregate( [
      {
        $match: {
          department: 'computer', // Replace with your desired department
        },
      },
      {
        $group: {
          _id: null,
          studentIds: {
            $push: '$_id',
          },
        },
      },
      {
        $project: {
          _id: 0,
          studentIds: 1,
        },
      },
    ]);

    return studentsarray;
  } catch (error) {
    throw new AppError("An error occurred", HttpStatus.CONFLICT);
  }
};

export const assignTaskDB = () => {
  return 1;
};
