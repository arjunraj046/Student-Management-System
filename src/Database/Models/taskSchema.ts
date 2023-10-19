import { model, Schema } from "mongoose";

const taskSchemas = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
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
});

const taskSchema = model("taskSchemas", taskSchemas, "taskSchemas");
export default taskSchema;
