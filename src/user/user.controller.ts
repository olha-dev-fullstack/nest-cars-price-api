import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { stringify } from 'querystring';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userServise: UserService) {}
  @Post('/signup')
  public async createUser(@Body() body: CreateUserDto) {
    return this.userServise.create(body.email, body.password);
  }

  @Get('/:id')
  public async findUser(@Param('id') id:string) {
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
  public async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServise.update(parseInt(id), body);
  }
}
