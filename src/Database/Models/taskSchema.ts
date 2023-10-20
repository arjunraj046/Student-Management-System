import mongoose, { Schema, Document } from "mongoose";
import { TaskDocument } from "../Repository/taskInterface";

const taskSchemas = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "overdue", "completed"],
      default: "pending",
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchemas);
export default TaskModel;
