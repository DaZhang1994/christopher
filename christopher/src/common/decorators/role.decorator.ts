import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/constants/role.constant';

export const Role = (permittedRole = UserRole.ADMIN) => SetMetadata('Role', permittedRole);

