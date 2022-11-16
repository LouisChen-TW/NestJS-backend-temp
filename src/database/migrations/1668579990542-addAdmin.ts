import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserInfo } from '../../users/entities/user-info.entity';
import { User } from '../../users/entities/user.entity';

export class addAdmin1668579990542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userInfoRepo = queryRunner.connection.getRepository(UserInfo);
    const user = new User();
    const userInfo = new UserInfo();
    user.id = 'ADMIN';
    user.account = 'ADMIN';
    user.email = 'admin@admin.admin';
    user.isEnabled = true;
    user.name = 'admin';
    user.password = 'admin';
    userInfo.address = 'admin';
    userInfo.birthDate = new Date('1995/12/06');
    userInfo.mobilePhone = '0988921862';
    userInfo.user = user;
    await userInfoRepo.save(userInfo);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getRepository(User);
    const user = await userRepo.findOneBy({ id: 'ADMIN' });
    await userRepo.remove(user);
  }
}
