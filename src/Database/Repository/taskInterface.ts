import { Document } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description?: string;
  publishDate: Date;
  dueTime: Date;
  status: "pending" | "overdue" | "completed";
  assignedBy: string;
}
