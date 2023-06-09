import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const saltOrRounds = 10;
    const user = await this.usersService.findOne(username);
    // const password = await bcrypt.hash(user.password, saltOrRounds)
    const passwordValid = await bcrypt.compare(pass, user.password)
    // pass = await bcrypt.hash(pass, saltOrRounds)

    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}