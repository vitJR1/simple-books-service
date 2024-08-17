import { Matches } from 'class-validator';

export class UpdateUserRoleDto {
  @Matches(/^[0|1]{5}$/)
  role: string;
}
