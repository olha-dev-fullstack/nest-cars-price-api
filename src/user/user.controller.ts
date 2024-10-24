import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private readonly userServise: UserService,
    private readonly authService: AuthService,
  ) {}
  @UseGuards(AuthGuard)
  @Get('/me')
  public async me(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  public async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  public async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  public async signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  public async findUser(@Param('id') id: string) {
    return this.userServise.findOne(parseInt(id));
  }

  @Get()
  public async findAllUsers(@Query('email') email: string) {
    return this.userServise.find(email);
  }

  @Delete('/:id')
  public async removeUser(@Param('id') id: string) {
    return this.userServise.remove(parseInt(id));
  }

  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userServise.update(parseInt(id), body);
  }
}
