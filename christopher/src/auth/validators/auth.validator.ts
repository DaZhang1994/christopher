import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Validator } from "class-validator";
const validator = new Validator();

@Injectable()
export class AuthValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(validator.isNotEmpty(value.username) &&
       validator.isNotEmpty(value.password) &&
       // username must contain 6 - 16 letters, numbers and underscores, but no leading underscore
       validator.matches(value.username, /^[A-Za-z_]\w{5,15}$/) &&
       // password must contain 8 - 16 letters, numbers and special characters, at least 1 lowercase letter, 1 uppercase letter and 1 special character
       validator.matches(value.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,16}$/)) {
         return value;
    }
    else {
      throw new BadRequestException('Invalid username');
    }
  }
}
