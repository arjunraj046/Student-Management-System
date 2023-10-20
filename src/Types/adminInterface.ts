import { Document } from "mongoose";

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

export interface AdminData {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
