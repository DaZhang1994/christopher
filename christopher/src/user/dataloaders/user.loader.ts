import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UserLoader extends OrderedNestDataLoader<string, User> {
  constructor(private readonly userService: UserService) {
    super();
  }

  protected getOptions = () => ({
    query: async (users: string[]) => {
      return this.userService.findByIds(users);
    }
  })

}
