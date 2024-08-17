import { type Request } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../core/config';
import { logger } from '../../core/logger';

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
      throw Error('User is unauthorized');
    }

    const payload = jwt.verify(token, appConfig.accessSecret);

    if (typeof payload === 'string') {
      throw Error(payload);
    }

    return await new Promise((resolve, reject) => {
      const accesses = payload.accesses;
      accesses.push(payload.type);

      let isEndpointAccessed = true;
      if (scopes !== undefined && Array.isArray(scopes) && scopes.length > 0) {
        isEndpointAccessed = scopes.some((e) => accesses.includes(e));
      }

      if (isEndpointAccessed) {
        resolve({
          id: Number(payload.id),
          token,
        });
      } else {
        reject(new Error('Incorrect token received'));
      }
    });
  } catch (e: any) {
    logger.warn(e.message);
    throw Error(e);
  }
};
