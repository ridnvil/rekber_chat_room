import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtUserDto } from 'src/common/dto/jwt-user.dto';
import { JwtGuard } from 'src/common/guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  async profile(@Req() req: any) {
    const user: JwtUserDto = req.user;
    console.log(req.user);
    return await this.userService.userProfile(user);
  }

  @Post('register')
  async register(@Request() req: any) {
    const user: UserDto = req.body;
    return this.userService.createUser(user);
  }
}
