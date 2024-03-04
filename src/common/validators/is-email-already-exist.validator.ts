/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";
import { UsersService } from "../../users/users.service";
@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly usersService: UsersService) {}

  async validate(email: any, args: ValidationArguments) {
    const user = await this.usersService.checkEmail(email);
    return !user;
  }
  defaultMessage(args: ValidationArguments) {
    return "Email $value already exists. Choose another email.";
  }
}
export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
