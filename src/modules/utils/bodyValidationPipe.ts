import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';

export function bodyValidationPipe<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const instance = plainToInstance(targetClass, req.body);
    const errors = validateSync(instance, {
      forbidUnknownValues: true,
      validationError: {
        target: false,
      },
    });
    const fieldsErrors: { [name: string]: { message: string; value: string } } =
      {};

    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.constraints) {
          fieldsErrors[error.property] = {
            message: Object.values(error.constraints).join(', '),
            value: error.value,
          };
        }
        if (error.children) {
          error.children.forEach((errorNested) => {
            if (errorNested.constraints) {
              fieldsErrors[errorNested.property] = {
                message: Object.values(errorNested.constraints!).join(', '),
                value: errorNested.value,
              };
            }
          });
        }
      });
      next(new ValidateError(fieldsErrors, 'Validation failed'));
      return;
    }
    next();
  };
}
