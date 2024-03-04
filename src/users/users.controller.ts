/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Headers,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.insertUser(createUserDto);
  }

  @Get()
  async getUsers(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("search") search: string
  ) {
    const pageNumber = parseInt(page) || 0;
    const limitNumber = parseInt(limit) || 5;
    const searchTerm = search || "";
    return this.usersService.getUsers(pageNumber, limitNumber, searchTerm);
  }
  @Get("/profile")
  async getProfile(@Headers() req: any) {
    const accessToken = req?.authorization?.split(" ")[1];
    return this.usersService.getProfile(accessToken as string);
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    console.log("updateUserDto: ", updateUserDto);
    console.log("id: ", id);

    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}
