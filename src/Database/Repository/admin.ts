import {
  AdminDocument,
  AdminLoginInterface,
  AdminRegisterInterface,
} from "../../Types/adminInterface";
import { HttpStatus } from "../../Types/httpStatus";
import {
  StudentDocument,
  StudentRegisterInterface,
} from "../../Types/studentInterface";
import AppError from "../../Utils/appError";
import AdminModel from "../Models/adminSchema";
import StudentModel from "../Models/studentSchema";
import { MongoError } from "mongodb";

export const createAdminDB = async (
  data: AdminRegisterInterface
): Promise<AdminDocument> => {
  try {
    let res = await AdminModel.create(data);
    return res;
  } catch (error) {
    console.log(error);
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

export const adminLoginDB = async (email: string) => {
  try {
    let adminData: any = await AdminModel.findOne({ email });
    console.log("admin mongo", adminData);
    return adminData ? adminData : new AppError("No Content", HttpStatus.BAD_REQUEST);
  } catch (error) {
    throw error;
  }
};

const addStudentDB = async (
  data: StudentRegisterInterface
): Promise<StudentDocument> => {
  try {
    // Create a new instance of the StudentModel with the provided data
    const student = new StudentModel(data);

    // Save the student to the database
    const savedStudent = await student.save();

    return savedStudent;
  } catch (error) {
    // Handle any potential errors, e.g., database connection issues
    console.error("Error while adding a student:", error);
    throw error;
  }
};

const assignTaskDB = () => {
  return 1;
};
const getTaskDetailsDB = () => {
  return 1;
};
