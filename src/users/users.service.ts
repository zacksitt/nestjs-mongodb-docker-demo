import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User,UserDocument } from './users.model';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { GetUserDto } from './get-user.dto';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username:String):Promise<User>{
  
    const existingUser = await this.userModel.findOne({username}).exec();
    if (!existingUser) {
        throw new NotFoundException(`User not found`);
    }
    return existingUser;
  }

  async findUser(getUserDto: GetUserDto): Promise<User> {

    const existingUser = await this.userModel.findOne(getUserDto).exec();
    if (!existingUser) {
        throw new NotFoundException(`User not found`);
    }
    return existingUser;
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

}