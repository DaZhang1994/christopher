import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.entity';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly User) {

  }

  async findUser(user: User) {
    try{
      return await this.User.findOne(user);
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

  async addUser(user: User) {
    try{
      new this.User(user).save();
    }
    catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  async updateUser(oriUser: User, desUser: User) {
    try{
      await this.User.updateOne(oriUser, desUser);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  async deleteUser(user: User) {
    try{
      this.User.deleteOne(user);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }
}
