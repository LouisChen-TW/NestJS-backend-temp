export const POLICIES = [
  // admin can access all route
  ['admin', '/api/v1/*', 'post'],
  ['admin', '/api/v1/*', 'get'],
  ['admin', '/api/v1/*', 'patch'],
  ['admin', '/api/v1/*', 'put'],
  ['admin', '/api/v1/*', 'delete'],
  // users
  ['users_create', '/api/v1/users', 'post', 'User', 'Information'],
  ['users_read', '/api/v1/users', 'get', 'User', 'Information'],
  ['user_read', '/api/v1/users/id/:id', 'get', 'User', 'Information'],
  ['user_update', '/api/v1/users/:id', 'patch', 'User', 'Information'],
  ['user_delete', '/api/v1/users/:id', 'delete', 'User', 'Information'],
  // users/authz
  [
    'user_roles_read',
    '/api/v1/users/authz/:id',
    'get',
    'User',
    'Authorization',
  ],
  [
    'user_roles_create',
    '/api/v1/users/authz/:id',
    'post',
    'User',
    'Authorization',
  ],
  [
    'user_permissions_get',
    '/api/v1/users/authz/permissions/:id',
    'get',
    'User',
    'Permissions',
  ],
];
