import { Injectable } from '@nestjs/common';
import { Author } from './model/author';

@Injectable()
export class AuthorService {

  private author: Author = {
    id: 1,
    firstName: "makuta",
    lastName: "bb",
  };

  private authors: Author[] = [{
    id: 1,
    firstName: "aaa",
    lastName: "bbbbb",
    postIds: [1, 2]
  },{
    id: 2,
    firstName: "ccc",
    lastName: "ddd",
    postIds: [1, 2, 3]
  },
    {
      id: 3,
      firstName: "eee",
      lastName: "fff",
      postIds: [3]
    }];

  async findOneById(id: number): Promise<Author> {
    return this.author;
  }

  async findAll(): Promise<Author[]> {
    return this.authors;
  }

  async findByIds(ids: number[]): Promise<Author[]> {
    return this.authors;
  }
}
