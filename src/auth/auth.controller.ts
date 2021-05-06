import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtUserDto } from 'src/common/dto/jwt-user.dto';
import { JwtGuard } from 'src/common/guard';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { User } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    console.log(req.body);
    const user: User = req.body;
    return this.authService.login(user);
  }
}
