import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { BypassAuth } from '../decorators/bypass.decorator';
import {
  CreateUserDto,
  getAllUsersResDto,
  getUserByIdResDto,
  updateUserByIdResDto,
  UpdateUserDto,
  updateUserInfoByIdResDto,
  UpdateUserInfoDto,
} from './users.dto';
import { UsersService } from './users.service';
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.createUser(data);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Get()
  async getUsers(): Promise<getAllUsersResDto[]> {
    const result = await this.usersService.getUsers();
    return result;
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<getUserByIdResDto> {
    const result = await this.usersService.getUserById(userId);
    return result;
  }

  @Patch('/:id')
  async updateUserById(
    @Param('id') userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<updateUserByIdResDto> {
    const result = await this.usersService.updateUserById(userId, data);
    return result;
  }

  @Patch('/userinfo/:id')
  async updateUserInfoById(
    @Param('id') userId: string,
    @Body() data: UpdateUserInfoDto,
  ): Promise<updateUserInfoByIdResDto> {
    const result = await this.usersService.updateUserInfoById(userId, data);
    return result;
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') userId: string): Promise<string> {
    const result = await this.usersService.deleteUserById(userId);
    return result;
  }
}
