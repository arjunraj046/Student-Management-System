import mongoose, { model, Schema } from "mongoose";
import { AdminDocument } from "../../Types/adminInterface";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Please add an name"],
    },
    email: {
      type: String,
      require: [true, "Please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

const AdminModel = mongoose.model<AdminDocument>("admin", adminSchema);
export default AdminModel;
