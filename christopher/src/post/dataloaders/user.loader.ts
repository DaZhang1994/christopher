import { Injectable } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { User } from '../../user/models/user.model';

@Injectable()
export class UserLoader extends OrderedNestDataLoader<string, User> {

}
