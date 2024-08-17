import { Service } from 'typedi';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserObjectDto } from './dto/user-object.dto';

@Service()
export class UsersService {
  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<UserObjectDto & LoginResponseDto> {
    return {
      id: 1,
      username: registerUserDto.username,
      email: registerUserDto.email,
      role: 31,
      emailApproved: true,
      accessToken: '',
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return {
      accessToken: '',
    };
  }

  async me(): Promise<UserObjectDto> {
    return {
      id: 1,
      username: 'one',
      email: 'two@gmail.com',
      emailApproved: true,
      role: 31,
    };
  }

  async updateUserRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserObjectDto> {
    return {
      id,
      username: 'one',
      email: 'two@gmail.com',
      emailApproved: true,
      role: parseInt(updateUserRoleDto.role, 2),
    };
  }
}
