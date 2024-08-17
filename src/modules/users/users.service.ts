import { Service } from 'typedi';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserObjectDto } from './dto/user-object.dto';
import prisma from '../../core/db';
import { AuthService } from '../auth/AuthService';
import { HandingError } from '../utils/HandingError';

@Service()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  private readonly defaultSelection = {
    id: true,
    role: true,
    username: true,
    email: true,
    password: false,
    emailApproved: true,
    createdAt: true,
  };

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<UserObjectDto & LoginResponseDto> {
    return prisma.user
      .create({
        data: {
          ...registerUserDto,
          password: hashSync(registerUserDto.password, genSaltSync(12)),
        },
        select: this.defaultSelection,
      })
      .then((result) => ({
        ...result,
        role: result.role.toString(2),
        accessToken: this.authService.generateAccessToken({
          id: result.id,
          role: result.role,
        }),
      }));
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return prisma.user
      .findFirstOrThrow({
        where: {
          OR: [
            { username: loginUserDto.username },
            { email: loginUserDto.username },
          ],
        },
        select: {
          id: true,
          role: true,
          password: true,
        },
      })
      .then((result) => {
        if (compareSync(loginUserDto.password, result.password)) {
          return {
            accessToken: this.authService.generateAccessToken({
              id: result.id,
              role: result.role,
            }),
          };
        }
        throw Error('Incorrect password');
      })
      .catch(() => {
        throw new HandingError('Incorrect login or password', 403);
      });
  }

  async getUserById(id: number): Promise<UserObjectDto | void> {
    return await prisma.user
      .findFirstOrThrow({
        where: {
          id,
        },
        select: this.defaultSelection,
      })
      .then((result) => ({ ...result, role: result.role.toString(2) }))
      .catch(() => {
        throw new HandingError('User not found', 404);
      });
  }

  async updateUserRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserObjectDto> {
    return prisma.user
      .update({
        data: {
          role: parseInt(updateUserRoleDto.role, 2),
        },
        where: {
          id,
        },
        select: this.defaultSelection,
      })
      .then((result) => ({ ...result, role: result.role.toString(2) }));
  }
}
