import {
  Body,
  CacheKey,
  CacheTTL,
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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
// import { BypassAuth } from '../decorators/bypass.decorator';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('User')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Create user
   * @example 'asdf'
   */
  @Post()
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.createUser(data);
    return res.status(HttpStatus.CREATED).json(result);
  }

  /**
   * Get All users
   */
  @Get()
  async getUsers(): Promise<getAllUsersResDto[]> {
    const result = await this.usersService.getUsers();
    return result;
  }

  /**
   * Get user by Id
   */
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<getUserByIdResDto> {
    const result = await this.usersService.getUserById(userId);
    return result;
  }

  /**
   * Update user by Id
   */
  @Patch('/:id')
  async updateUserById(
    @Param('id') userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<updateUserByIdResDto> {
    const result = await this.usersService.updateUserById(userId, data);
    return result;
  }

  /**
   * Patch user by Id
   */
  @Patch('/userinfo/:id')
  async updateUserInfoById(
    @Param('id') userId: string,
    @Body() data: UpdateUserInfoDto,
  ): Promise<updateUserInfoByIdResDto> {
    const result = await this.usersService.updateUserInfoById(userId, data);
    return result;
  }

  /**
   * Delete user by Id
   */
  @Delete('/:id')
  async deleteUserById(@Param('id') userId: string): Promise<string> {
    const result = await this.usersService.deleteUserById(userId);
    return result;
  }
}
