/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty({ message: "Name is required" })
  readonly name: string;

  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @IsOptional()
  @IsString({ message: "Mobile number must be a string" })
  @Matches(/^[0-9]{10,15}$/, {
    message: "Mobile number must be between 10 to 15 digits",
  })
  readonly mobileNumber?: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
