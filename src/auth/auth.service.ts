import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AccessPayload } from './types/access-payload.type';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}

  async validate(username: string, password: string): Promise<User> {
    console.log(`Username ${username} `);
    const valid = await this.userService.validAccount(username, password);
    if (valid) return await this.userService.findWithEmail(username);
    console.log('=================');
    throw new UnauthorizedException();
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: AccessPayload = { _id: user._id };
    console.log(this.config.get<string>('security.accessToken.secret'));
    return sign(
      payload,
      this.config.get<string>('security.accessToken.secret'),
      {
        expiresIn: this.config.get<number>('security.accessToken.expiresIn'),
      },
    );
  }
  async registerUser(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}
