import { UserDto } from 'src/user/user.dto';

export const authProvider = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: UserDto,
  },
];
