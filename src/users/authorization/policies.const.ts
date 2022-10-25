export const POLICIES = [
  // admin can access all route
  ['admin', '/api/v1/*', 'post'],
  ['admin', '/api/v1/*', 'get'],
  ['admin', '/api/v1/*', 'patch'],
  ['admin', '/api/v1/*', 'put'],
  ['admin', '/api/v1/*', 'delete'],
  // users
  ['users_create', '/api/v1/users', 'post', 'System', 'User'],
  ['users_read', '/api/v1/users', 'get', 'System', 'User'],
  ['user_read', '/api/v1/users/id/:id', 'get', 'System', 'User'],
  ['user_update', '/api/v1/users/:id', 'patch', 'System', 'User'],
  ['user_delete', '/api/v1/users/:id', 'delete', 'System', 'User'],
  // users/userinfo
  [
    'user_userinfo_read',
    '/api/v1/users/userinfo/:id',
    'get',
    'User',
    'User_Info',
  ],
  [
    'user_userinfo_update',
    '/api/v1/users/userinfo/:id',
    'patch',
    'User',
    'User_Info',
  ],
  // users/authz
  ['user_roles_read', '/api/v1/users/authz/:id', 'get', 'User', 'User_Authz'],
  [
    'user_roles_create',
    '/api/v1/users/authz/:id',
    'post',
    'User',
    'User_Authz',
  ],
];
