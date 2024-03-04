import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { comparePassword } from '../../common/helper/passwordHelper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await comparePassword(password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userId = user._id;

    const access_token: string = this.jwtService.sign(
      { userId, email, password },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: '1d',
      },
    );
    const refresh_token: string = this.jwtService.sign(
      { userId, email, password },
      {
        secret: process.env.JWT_REFRESH_TOKEN,
        expiresIn: '7d',
      }
    );
    return {
      user_details: user,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
