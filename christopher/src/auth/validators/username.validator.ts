import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Validator } from "class-validator";
const validator = new Validator();

@Injectable()
export class UsernameValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(validator.isNotEmpty(value.username) &&
       // username must contain 6 - 16 letters, numbers and underscores, but no leading underscore
       validator.matches(value.username, /^[A-Za-z_]\w{5,15}$/)) {
         return value;
    }
    else {
      throw new BadRequestException('Invalid username');
    }
  }
}

