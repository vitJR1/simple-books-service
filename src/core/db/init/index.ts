import prisma from '../index';
import { UsersService } from '../../../modules/users/users.service';
import { AuthService } from '../../../modules/auth/AuthService';
import { Accesses } from '../../../modules/auth/accesses/Accesses';

export async function initDb() {
  try {
    const userService = new UsersService(new AuthService());

    const user = await prisma.user.findFirst();
    if (user === null) {
      const createdUser = await userService.register({
        username: 'admin',
        email: 'admin@example.com',
        password: 'Adm1nistr@toR',
      });
      await userService.updateUserRole(createdUser.id, {
        role: Accesses.FULL,
      });
    }
    await prisma.$disconnect();
  } catch (e) {
    await prisma.$disconnect();
    throw e;
  }
}
