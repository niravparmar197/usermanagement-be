import { Module } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UsersSchema } from "../users/users.model";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Users", schema: UsersSchema }]),
  ],
  providers: [AuthService,UsersService,JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
