import mongoose, { Document } from "mongoose";

export interface StudentRegisterInterface {
  name: string;
  email: string;
  password: string;
}

export interface StudentDocument extends Document {
  [x: string]: Date;
  name: string;
  email: string;
  password: string;
}
