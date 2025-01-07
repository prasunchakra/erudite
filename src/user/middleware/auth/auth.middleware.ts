import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { ExpressRequest } from 'src/user/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: ExpressRequest, res: Response, next: NextFunction) {
    console.log("AuthMiddleware", req.headers['authorization']);
    if (!req.headers['authorization']) {
      throw new UnauthorizedException('Unauthorized');
    }
    try { 
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = verify(token, JWT_SECRET);
      console.log(decoded);
      req.user = decoded;   
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
    next();
  }
}

