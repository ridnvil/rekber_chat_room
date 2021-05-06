import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtUserDto } from 'src/common/dto/jwt-user.dto';
import { UserDto } from './user.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin@admin.com',
      password: 'admin@123',
    },
    {
      userId: 2,
      username: 'ridwan@gmail.com',
      password: 'ridwan',
    },
  ];

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async userProfile(userDto: JwtUserDto): Promise<User | undefined> {
    
    return this.users.find((user) => user.userId === userDto.userId);
  }

  async createUser(user: UserDto): Promise<UserDto | undefined> {
    this.users.push(user);
    return user;
  }
}
