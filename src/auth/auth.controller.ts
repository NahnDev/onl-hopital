import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

class AuthResponseType {
  @ApiProperty()
  user: User;
  @ApiProperty()
  accessToken: string;
}

@Controller('auth')
@PublicApi()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  @ApiOkResponse({ type: AuthResponseType })
  @UseGuards(LocalGuard)
  async login(@Body() login: LoginDto, @RequestUser() user: User) {
    return {
      user: user,
      accessToken: await this.authService.generateAccessToken(user),
    };
  }

  @ApiBearerAuth()
  @Post('re-login')
  @ApiOkResponse({ type: AuthResponseType })
  @UseGuards(JwtGuard)
  async reLogin(@RequestUser() user: User) {
    console.log('reLogin start');
    return {
      user: user,
      accessToken: await this.authService.generateAccessToken(user),
    };
  }

  @Post('register')
  @ApiOkResponse({ type: AuthResponseType })
  async register(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.authService.registerUser(createUserDto);
    return {
      user: user,
      accessToken: await this.authService.generateAccessToken(user),
    };
  }
}
