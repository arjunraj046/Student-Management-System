import { Document, Types } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description?: string;
  assignedBy: Types.ObjectId;
  publishDate: Date;
  department: string;
  dueTime: Date;
  status: {
    pending: Types.ObjectId[];
    completed: Types.ObjectId[];
    overdue: Types.ObjectId[];
  };
}

export interface TaskData {
  assignedBy: Types.ObjectId;
  title: string;
  description?: string;
  department: string;
  dueTime: Date;
}
