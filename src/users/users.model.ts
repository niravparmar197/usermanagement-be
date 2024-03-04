/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface IUsers extends mongoose.Document {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}
