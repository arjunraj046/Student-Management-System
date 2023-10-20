import bcrypt from "bcrypt";
import AppError from "../Utils/appError";
import { HttpStatus } from "../Types/httpStatus";

// Hashing a password
export const passwordHashing = async (password: string) => {
  try {
    const saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("hashing error", err);
    return null;
  }
};

// passwordComparing function
export const passwordComparing = async (
  hashedPassword: string,
  userPassword: string
) => {
  try {
    const result = await bcrypt.compare(userPassword, hashedPassword);
    if (result) {
      console.log("Passwords match!");
      return true;
    } else {
      console.log("Passwords do not match!");
      new AppError("No Content", HttpStatus.BAD_REQUEST);
    }
  } catch (err) {
    console.log(err);
    throw new AppError("An error occurred", HttpStatus.CONFLICT);
  }
};
