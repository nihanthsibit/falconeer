import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware, ErrorHandlingMiddleware } from './middleware';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validators/validation.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses, BankDetails, Roles, Salaries, Users } from './entities';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Users, Addresses, BankDetails, Roles, Salaries],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/graphql.ts'),
      context: ({ req }) => ({ req }),
      path: '/graphql'
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user');
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}