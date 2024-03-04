/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUsers } from "./users.model";
import { hashPassword } from "../common/helper/passwordHelper";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel("Users") private readonly usersModel: Model<IUsers>
  ) {}

  async insertUser(payload: CreateUserDto) {
    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;

    const createdUser = new this.usersModel(payload);
    const result = await createdUser.save();
    return result;
  }

  async getUsers(pageNumber, limitNumber, searchTerm) {
    const searchQuery = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { mobileNumber: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};
    const userscount = await this.usersModel.find().count();

    const users = await this.usersModel

      .find(searchQuery)
      .skip(pageNumber * limitNumber) // Apply pagination
      .limit(limitNumber)
      .select("name email mobileNumber")
      .exec();

    const usersDetails = {
      data: users,
      pageNumber: pageNumber,
      count: userscount,
    };

    return usersDetails;
  }

  async getUser(id: string) {
    const user = await this.usersModel.findById(id);
    return user;
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    if (Object.keys(payload).length == 0) {
      throw new NotFoundException("request data not found");
    }
    const user = await this.usersModel
      .findOne({
        _id: { $ne: id },
        email: { $regex: new RegExp("^" + payload.email + "$", "i") },
      })
      .exec();
    if (user) {
      throw new BadRequestException("Email is already in use.");
    }

    const updatedUser = await this.usersModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.usersModel.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const deletedUser = await this.usersModel.findByIdAndRemove(id);
    return deletedUser;
  }

  async findByEmail(email: string) {
    const user = await this.usersModel
      .findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } })
      .exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async checkUpadateEmail(email: string, userId: string) {
    const user = await this.usersModel
      .findOne({
        _id: { $ne: userId },
        email: { $regex: new RegExp("^" + email + "$", "i") },
      })
      .exec();
    return user;
  }

  async checkEmail(email: string) {
    const user = await this.usersModel
      .findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } })
      .exec();
    return user;
  }

  async getProfile(access_token: string) {
    const userDecord = this.jwtService.verify(access_token, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET, // Ensure you're using the same secret as when issuing the token
    });
    const user = await this.usersModel.findById(userDecord._id);
    return user;
  }
}
