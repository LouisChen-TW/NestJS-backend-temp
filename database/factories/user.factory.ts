// import * as faker from '@faker-js/faker';

import { setSeederFactory } from 'typeorm-extension';
import { UserInfo } from '../../src/users/entities/user-info.entity';
import { User } from '../../src/users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  const userInfo = new UserInfo();
  // user.id = 'admin';
  // user.account = 'admin';
  // user.email = 'admin@admin.admin';
  // user.isEnabled = true;
  // user.name = 'ADMIN';
  // user.password = 'admin';
  user.account = faker.internet.userName();
  user.email = faker.internet.email();
  user.isEnabled = true;
  user.name = faker.name.fullName();
  user.password = 'root';
  userInfo.address = '123';
  // userInfo.birthDate = new Date(1995 - 12 - 6);
  userInfo.mobilePhone = '0988921862';
  // user.userInfo.address = '彰化';
  // user.userInfo.birthDate = new Date(1995 - 12 - 6);
  // user.userInfo.mobilePhone = '0988921862';
  return user;
});
