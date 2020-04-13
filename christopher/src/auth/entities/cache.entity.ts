import { IsNotEmpty } from 'class-validator';

export class CacheMeta {

  @IsNotEmpty()
  key: string;

  ttl?: number;
}
