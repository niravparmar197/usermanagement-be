/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password is too short" })
  password: string;
}
