import { SetMetadata } from '@nestjs/common';

export const Token = (reqTokenField= 'token') => SetMetadata('Token', reqTokenField);

