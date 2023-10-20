import  { Document } from "mongoose";

export interface StudentRegisterInterface {
  name: string;
  email: string;
  department: "computer" | "science";
  password: string;
}

export interface StudentDocument extends Document {
  name: string;
  email: string;
  department: string;
  password: string;
}
