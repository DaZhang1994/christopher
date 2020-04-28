import { SetMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CacheMeta } from '../entities/cache_meta.entity';

export const Cache = (key: string, ttl?: number) => SetMetadata('Cache', plainToClass(CacheMeta, { key: key, ttl: ttl}));

