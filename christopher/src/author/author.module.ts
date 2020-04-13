import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { PostService } from './post.service';
import { PostLoader } from './post.loader';

@Module({
  providers: [AuthorService, AuthorResolver, PostService, PostLoader],
  exports: [AuthorService, AuthorResolver, PostService, PostLoader]
})
export class AuthorModule {}
