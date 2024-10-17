// src/middleware/email-validation.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EmailValidationMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net)$/;

    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: 'Invalid email format.',
      });
      next();
    }

    next();
  }
}