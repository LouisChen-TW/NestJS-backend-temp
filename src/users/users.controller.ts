import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RegisterDto } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/register')
  async register(
    @Body() data: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.register(data);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const id = req.user.userId;
    const user = await this.usersService.getProfile(id);
    return user;
  }
}
