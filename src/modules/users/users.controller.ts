import { Service } from 'typedi';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Security,
  Tags,
  Request,
} from 'tsoa';
import { UsersService } from './users.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserObjectDto } from './dto/user-object.dto';
import { Accesses } from '../auth/accesses/Accesses';
import { bodyValidationPipe } from '../utils/bodyValidationPipe';
import { StatusResponse } from '../utils/StatusResponse';

@Service()
@Tags('users')
@Route('/users')
export class UsersController extends Controller {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Middlewares(bodyValidationPipe(RegisterUserDto))
  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserObjectDto & LoginResponseDto> {
    return await this.usersService.register(registerUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return await this.usersService.login(loginUserDto);
  }

  @Get('/email-approve/:key')
  async emailApprove(@Path() key: string): Promise<StatusResponse> {
    await this.usersService.emailApprove(key);
    return { status: 'Email approved' };
  }

  @Security('jwt')
  @Get('/me')
  async me(@Request() req: any) {
    return await this.usersService.getUserById(req.user.id);
  }

  @Security('jwt', [Accesses.CHANGE_USER_ROLE])
  @Put('/:id/role')
  async updateUserRole(
    @Path() id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserObjectDto> {
    return await this.usersService.updateUserRole(id, updateUserRoleDto);
  }
}
