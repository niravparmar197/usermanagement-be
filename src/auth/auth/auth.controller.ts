/* eslint-disable prettier/prettier */

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../../dto/login.dto"; // Adjust the import path as needed

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password
    );
    return { accessToken: accessToken };
  }
}
