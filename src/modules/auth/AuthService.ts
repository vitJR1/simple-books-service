import { Service } from 'typedi';
import { TokenPayload } from './types/TokenPayload';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../core/config';

@Service()
export class AuthService {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, appConfig.accessSecret, { expiresIn: '7d' });
  }
  validateAccessToken(token: string): TokenPayload {
    return <TokenPayload>jwt.verify(token, appConfig.accessSecret);
  }
}
