import { SetMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CacheMeta } from '../../auth/entities/cache.entity';

export const Cache = (key: string, ttl?: number) => SetMetadata('Cache', plainToClass(CacheMeta, { key: key, ttl: ttl}));

