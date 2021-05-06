export class JwtUserDto {
  userId: number;
  username: string;
  
  // default of jwt payload
  iat?: number;
  exp?: number;
  iss?: string;
}
