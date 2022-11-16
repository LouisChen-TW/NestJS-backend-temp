import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { UserInfo } from '../../users/entities/user-info.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
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
      userInfo.user = user;
      await userInfoRepo.save(userInfo);
    }
  }
}
