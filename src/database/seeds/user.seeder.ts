import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserInfo } from '../../users/entities/user-info.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const userInfoRepo = dataSource.getRepository(UserInfo);

    const ROUND = 1;

    for (let round = 0; round < ROUND; round++) {
      const user = new User();
      const userInfo = new UserInfo();
      user.account = faker.random.alphaNumeric(8, { casing: 'mixed' });
      user.email = faker.internet.exampleEmail();
      user.isEnabled = true;
      user.name = faker.name.fullName();
      user.password = 'root';
      userInfo.address = faker.address.city();
      userInfo.birthDate = faker.date.birthdate({
        min: 18,
        max: 65,
        mode: 'age',
      });
      userInfo.mobilePhone = faker.phone.number('09########');
      const newUser = userRepo.create(user);
      userInfo.user = newUser;
      const newUserInfo = userInfoRepo.create(userInfo);
      await userInfoRepo.save(newUserInfo);
    }

    // const userFactory = await factoryManager.get(User);

    // const userInfoFactory = await factoryManager.get(UserInfo);
    // await userFactory.save();
    // await userFactory.save();
  }
}
