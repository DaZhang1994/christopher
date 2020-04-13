import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { BaseService } from '../../common/services/base/base.service';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserService extends BaseService<User>{

  constructor(@InjectModel('User') private UserModel) {
    super(UserModel);
  }

}
