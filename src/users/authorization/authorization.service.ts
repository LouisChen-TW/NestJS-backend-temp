import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { Enforcer } from 'casbin';

import { AUTHORIZATION_ENFORCER } from './token.const';
import { AuthorizationAction } from './action.enum';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AUTHORIZATION_ENFORCER) private readonly enforcer: Enforcer,
  ) {}

  public checkPermission(subject: string, object: string, action: string) {
    return this.enforcer.enforce(subject, object, action);
  }

  public mappingAction(method: string): AuthorizationAction {
    switch (method.toUpperCase()) {
      case 'GET':
        return AuthorizationAction.READ;
      case 'POST':
        return AuthorizationAction.CREATE;
      case 'PATCH':
      case 'PUT':
        return AuthorizationAction.UPDATE;
      case 'DELETE':
        return AuthorizationAction.DELETE;
      default:
        return AuthorizationAction.NONE;
    }
  }
  async getAllSubjects() {
    const allSubjects = await this.enforcer.getAllSubjects();
    const allObjects = await this.enforcer.getAllObjects();
    const allActions = await this.enforcer.getAllActions();
    const policy = await this.enforcer.getPolicy();

    console.log(allSubjects);
    console.log(allObjects);
    console.log(allActions);
    console.log(policy);

    return allSubjects;
  }

  async getSubjectByGroupName(name: string) {
    const policies = await this.enforcer.getFilteredGroupingPolicy(0, name);
    const subjects = policies.map((policy) => {
      return policy[1];
    });
    return subjects;
  }

  async addGroupingPolicies(groupName, policies) {
    await this.enforcer.removeFilteredGroupingPolicy(0, groupName);

    const groupingRules = policies.map((policy) => {
      return [groupName, policy, 'group'];
    });

    const result = await this.enforcer.addGroupingPolicies(groupingRules);
    return result;
  }

  async getGrouping() {
    const allGroupings = await this.enforcer.getFilteredGroupingPolicy(
      2,
      'group',
    );
    let newAllGroups = allGroupings.map((group) => {
      return group[0];
    });
    newAllGroups = [...new Set(newAllGroups)];
    console.log(newAllGroups);

    return newAllGroups;
  }

  async addRolesForUser(id: string, roles) {
    await this.enforcer.deleteRolesForUser(id);

    const addRole = [];
    for (const role of roles) {
      const addRoleResult = await this.enforcer.addRoleForUser(id, role);
      addRole.push(addRoleResult);
    }
    if (addRole.some((r) => r === false)) {
      throw new ConflictException('請稍後再試');
    }
  }

  async getRolesForUser(id: string) {
    const roles = await this.enforcer.getRolesForUser(id);
    const allRoles = await this.enforcer.getAllRoles();
    const permissions = await this.enforcer.getImplicitPermissionsForUser(id);

    // console.log(roles);
    // console.log(allRoles);
    console.log(permissions);

    return roles;
  }

  async getPermissionsForUser(id: string) {
    const permissions = await this.enforcer.getImplicitPermissionsForUser(id);
    const result = permissions.map((p) => {
      return {
        void: p[0],
        api: p[1],
        event: p[2],
        system: p[3],
        children: p[4] ?? '',
      };
    });

    return result;
  }
}
