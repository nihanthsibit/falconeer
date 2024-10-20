import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpRequest } from '../types/dto';
import { ValidationPipe } from 'src/validators/validation.pipe';
import { Roles } from 'src/decorators';
import { role_id } from 'src/constants';

@Controller('user')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Post('/signup')
  async signUp(@Body(new ValidationPipe()) request: SignUpRequest, @Res({ passthrough: true }) response): Promise<object> {
    return await this.appService.createUser(request, response);
  }

  @Roles(role_id.ADMIN)
  @Post('/create')
  async create(@Body(new ValidationPipe()) request: SignUpRequest, @Res({ passthrough: true }) response): Promise<object> {
    return await this.appService.createUser(request, response);
  }

  @Roles(role_id.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res({ passthrough: true }) response): Promise<object> {
    const result = await this.appService.deleteUserById(id, response);
    return {
      data: result
    }
  }
}
