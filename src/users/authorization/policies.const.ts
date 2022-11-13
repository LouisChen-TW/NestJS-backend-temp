export const POLICIES = [
  // admin can access all route
  ['admin', '/api/v1/*', 'post'],
  ['admin', '/api/v1/*', 'get'],
  ['admin', '/api/v1/*', 'patch'],
  ['admin', '/api/v1/*', 'put'],
  ['admin', '/api/v1/*', 'delete'],
  // users
  ['users_create', '/api/v1/users', 'post'],
  ['users_read', '/api/v1/users', 'get'],
  ['user_read', '/api/v1/users/:id', 'get'],
  ['user_update', '/api/v1/users/:id', 'patch'],
  ['user_delete', '/api/v1/users/:id', 'delete'],
  // users/authz
  ['user_roles_read', '/api/v1/users/authz/:id', 'get'],
  ['user_roles_create', '/api/v1/users/authz/:id', 'post'],
  ['user_permissions_get', '/api/v1/users/authz/permissions/:id', 'get'],
];
