import { type Request } from 'express';
import { logger } from '../../core/logger';
import { AuthService } from './AuthService';
import { Accesses } from './accesses/Accesses';
import { HandingError } from '../utils/HandingError';

export const expressAuthentication = async (
  req: Request,
  securityName: string,
  scopes?: string[],
): Promise<any> => {
  try {
    if (securityName !== 'jwt') {
      return null;
    }

    const token = req.headers.authorization;

    if (token === undefined) {
      throw new HandingError('User is unauthorized', 403);
    }

    const authService = new AuthService();

    const payload = authService.validateAccessToken(token);

    return await new Promise((resolve, reject) => {
      const accesses = payload.role;

      const allRequiredAccesses = scopes.reduce(
        (a, b) => (parseInt(a, 2) | parseInt(b, 2)).toString(2),
        Accesses.NONE,
      );

      const isEndpointAccessed =
        (accesses & parseInt(allRequiredAccesses, 2)) ===
        parseInt(allRequiredAccesses, 2);

      logger.debug(
        `user accesses: ${accesses.toString(2)}; required accessed: ${allRequiredAccesses}`,
      );

      if (isEndpointAccessed) {
        resolve({
          id: Number(payload.id),
          role: payload.role,
          token,
        });
      } else {
        reject(new HandingError('Forbidden', 403));
      }
    });
  } catch (e: any) {
    logger.warn(e.message);
    throw e;
  }
};
