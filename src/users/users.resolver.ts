import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from '../entities';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(_of => Users)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => Users, { nullable: true })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string): Promise<Users> {
    try {
        return await this.userService.getUserById(id);
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
  }

  @Query(() => [Users])
  @UseGuards(AuthGuard)
  async users(
    @Context() context: any,  
  ): Promise<Users[]> {
    try {
        return await this.userService.getUserList(context.req);
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
  }
}
