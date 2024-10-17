import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '3d' },
        }),
    ],
    providers: [AuthService, AuthGuard, RolesGuard],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard, RolesGuard],
})

export class AuthModule {}