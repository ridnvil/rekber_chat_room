import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserDto } from 'src/common/dto/jwt-user.dto';
import { UserDto } from 'src/user/user.dto';
import { User, UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    let payload: JwtUserDto;
    let userVal: User = this.validateUser(user.username, user.password);
    payload = {
      userId: userVal.userId,
      username: userVal.username,
    };

    return {
      access_token: this.generateAccessToken(user),
    };
  }

  generateAccessToken(payload: any): string {
    let token: string;
    token = this.jwtService.sign(payload);
    return token;
  }

  verifyToken(token: string) {
    let payload: JwtUserDto;
    payload = this.jwtService.verify(token);
    return payload;
  }
}
