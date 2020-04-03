import { UsernameGuard } from './username.guard';

describe('UsernameGuard', () => {
  it('should be defined', () => {
    expect(new UsernameGuard()).toBeDefined();
  });
});
