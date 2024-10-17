import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
    private readonly logger = new Logger(ErrorHandlingMiddleware.name);

    use(_req: Request, res: Response, next: NextFunction): void {
        try {
            next();
        } catch (err) {
            this.logger.error(`Error occurred: ${err.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
