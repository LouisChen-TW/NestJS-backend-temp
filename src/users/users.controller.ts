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
import { CreateUserDto, UpdateUserDto, UpdateUserInfoDto } from './users.dto';
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
  async getUsers(@Res() res: Response): Promise<Response> {
    const result = await this.usersService.getUsers();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('id/:id')
  async getUserById(
    @Param('id') userId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.getUserById(userId);
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch('/:id')
  async updateUserById(
    @Param('id') userId: string,
    @Body() data: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.updateUserById(userId, data);
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch('/userinfo/:id')
  async updateUserInfoById(
    @Param('id') userId: string,
    @Body() data: UpdateUserInfoDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.updateUserInfoById(userId, data);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete('/:id')
  async deleteUserById(
    @Param('id') userId: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.usersService.deleteUserById(userId);
    return res.status(HttpStatus.NO_CONTENT);
  }
}
