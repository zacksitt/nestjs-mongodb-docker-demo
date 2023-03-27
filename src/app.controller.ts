import { Controller, Request, Post, UseGuards,Body,Res,HttpStatus,Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {User,UserDocument} from './users/users.model'
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { Message } from './lib/response';
import { CreateUserDto } from './users/create-user.dto';
import { GetUserDto } from './users/get-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) { }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log("Login function");
    return req.user;
  }


  @Post('signup')
    async createClass(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const saltOrRounds = 10;
            createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds)
            const newClass = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: Message.created_success_message,
                newClass,
            });

        } catch (err) {
            console.error(err);
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Class not created!',
                error: 'Bad Request'
            });
        }
    }

    @Post('user')
    async findUser(@Res() response,  @Body() getUserDto: GetUserDto) {
        try {

            const saltOrRounds = 10;
            getUserDto.password = await bcrypt.hash(getUserDto.password, saltOrRounds)
            const existingStudent = await this.userService.findUser(getUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'Student found successfully',
                existingStudent,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}