import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LocalStrategyAdapterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.body.password = ' ';
    next();
  }
}
