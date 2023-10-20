import mongoose, { Document } from "mongoose";

export interface AdminRegisterInterface {
  keys(obj: any): unknown;
  name: string;
  email: string;
  password: string;
}

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export interface AdminLoginInterface {
  email: string;
  password: string;
}

// export interface AdminDataInterface {
//   _id: mongoose.Types.ObjectId;
//   name?: string;
//   email: string;
//   password: string;
// }
