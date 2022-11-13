import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { AuthorizationService } from './authorization.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class AuthzController {
  constructor(private authzService: AuthorizationService) {}

  @UseGuards(RoleGuard)
  @Get('subjects')
  async getAllSubjects() {
    const result = await this.authzService.getAllSubjects();
    return result;
  }

  @Get('subjects/group')
  async getSubjectByGroupName(@Query('groupName') groupName: string) {
    const result = await this.authzService.getSubjectByGroupName(groupName);
    return { result, groupName };
  }

  @UseGuards(RoleGuard)
  @Post('groups')
  async addGroupingPolicies(@Body() data) {
    const groupName = data.groupName;
    const policies = data.policies;
    await this.authzService.addGroupingPolicies(groupName, policies);
    return { message: '成功新增角色群組權限' };
  }

  @Get('groups')
  async getGrouping() {
    const result = await this.authzService.getGrouping();
    return result;
  }

  @UseGuards(RoleGuard)
  @Post('/roles/:id')
  async addRolesForUser(@Param('id') userId: string, @Body('roles') roles) {
    await this.authzService.addRolesForUser(userId, roles);
    return { message: '成功賦予使用者角色群組權限' };
  }

  @Get('roles/:id')
  async getRolesForUser(@Param('id') userId: string) {
    const result = await this.authzService.getRolesForUser(userId);
    return result;
  }

  @Get('/permissions/:id')
  async getPermissionsForUsers(@Param('id') userId: string) {
    const result = await this.authzService.getPermissionsForUser(userId);
    return result;
  }
}
