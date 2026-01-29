import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors: Record<string, string> = {};

        const extractErrors = (errorsArray: ValidationError[]) => {
          errorsArray.forEach((error) => {
            if (error.constraints) {
              errors[error.property] = Object.values(error.constraints)[0];
            }
            if (error.children?.length) {
              extractErrors(error.children);
            }
          });
        };

        extractErrors(validationErrors);

        return new BadRequestException({
          statusCode: 400,
          errors,
        });
      },
    });
  }
}
