/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema } from "./users.model";
import { IsEmailAlreadyExistConstraint } from "../common/validators/is-email-already-exist.validator";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Users", schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, IsEmailAlreadyExistConstraint, JwtService],
})
export class UsersModule {}
