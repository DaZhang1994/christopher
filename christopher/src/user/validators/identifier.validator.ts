import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { IdentifierInput } from '../dtos/identifier.input';
import { plainToClass } from 'class-transformer';


@Injectable()
export class IdentifierValidator implements PipeTransform {
  transform(identifier: IdentifierInput, metadata: ArgumentMetadata) {
    if(plainToClass(IdentifierInput, identifier).identifier == null) {
      throw new BadRequestException('Identifier must be given!');
    }
    return identifier;
  }
}
