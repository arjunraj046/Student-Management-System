import { Types } from "mongoose";

export interface TaskDocument {
  title: string;
  description?: string;
  assignedBy: Types.ObjectId;
  publishDate: Date;
  department:string;
  dueTime: Date;
  status: {
    pending: Array<string>;
    completed: Array<string>;
    overdue: Array<string>;
  };
}

export interface TaskData {
  assignedBy: Types.ObjectId;
  title: string;
  description?: string;
  department:string;
  dueTime: Date;
}
