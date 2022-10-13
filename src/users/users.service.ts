import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.entity';

import { RegisterDto } from './users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private readonly usersInfoRepository: Repository<UserInfo>,
  ) {}

  async register(data: RegisterDto): Promise<object> {
    const user: User = {
      account: data.account,
      password: data.password,
      name: data.name,
      email: data.email,
    };
    const userInfo: UserInfo = {
      address: data.address,
      birthDate: data.birthDate,
      mobilePhone: data.mobilePhone,
    };

    const isExistAccount = await this.usersRepository.findOneBy({
      account: data.account,
    });
    if (isExistAccount) throw new BadRequestException('此帳號已被註冊');

    const isExistEmail = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (isExistEmail) throw new BadRequestException('此信箱已被註冊');

    const isExistMobilePhone = await this.usersInfoRepository.findOneBy({
      mobilePhone: data.mobilePhone,
    });
    if (isExistMobilePhone) throw new BadRequestException('此電話已被註冊過');

    const newUser: User = this.usersRepository.create(user);
    userInfo.user = newUser;
    this.usersInfoRepository.create(userInfo);
    const newUserInfo: UserInfo = await this.usersInfoRepository.save(userInfo);

    return {
      id: newUserInfo.user.id,
      account: newUserInfo.user.account,
    };
  }

  async findUser(account: string): Promise<User> {
    const qb = this.usersRepository.createQueryBuilder('user');
    const user = await qb
      .addSelect('user.password')
      .where('user.account = :account', { account: account })
      .getOne();

    return user;
  }

  async getProfile(id: string): Promise<object> {
    const qb = this.usersRepository.createQueryBuilder('user');
    const user = await qb
      .leftJoinAndSelect('user.userInfo', 'userInfo')
      .where('user.id = :userId', { userId: id })
      .getOne();

    return user;
  }
}
