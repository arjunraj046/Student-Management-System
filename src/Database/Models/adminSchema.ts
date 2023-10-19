import { model, Schema } from "mongoose";

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

const admin = model("admin", adminSchema, "admin");
export default admin;
