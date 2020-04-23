import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class UserLoader extends OrderedNestDataLoader<string, User> {
  constructor(private readonly userService: UserService) {
    super();
  }

  protected getOptions = () => ({
    query: async (authors: string[]) => {
      return this.userService.findByIds(authors);
    }
  })
}
