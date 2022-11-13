import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.entity';

import { CreateUserDto, UpdateUserDto, UpdateUserInfoDto } from './users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private readonly usersInfoRepository: Repository<UserInfo>,
  ) {}

  async createUser(data: CreateUserDto): Promise<object> {
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
    if (!newUser || !newUserInfo) {
      throw new ConflictException('請稍後再試');
    }

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

  async getUsers(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: { userInfo: true },
    });
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new BadRequestException(`找不到使用者ID: ${id} `);
    }
    return user;
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`找不到使用者ID: ${id} `);
    }
    const updatedUser = await this.usersRepository.save({ ...user, ...data });

    if (!updatedUser) {
      throw new ConflictException('發生錯誤，請稍後再試');
    }
    return updatedUser;
  }

  async updateUserInfoById(id: string, data: UpdateUserInfoDto) {
    const qb = this.usersInfoRepository.createQueryBuilder('userInfo');

    const userInfo = await qb
      .leftJoin('userInfo.user', 'user')
      .where('user.id = :userId', { userId: id })
      .getOne();

    if (!userInfo) {
      throw new BadRequestException(`找不到使用者ID: ${id} `);
    }

    const updatedUserInfo: UserInfo = await this.usersInfoRepository.save({
      ...userInfo,
      ...data,
    });

    if (!updatedUserInfo) {
      throw new ConflictException('發生錯誤，請稍後再試');
    }
    return updatedUserInfo;
  }

  async deleteUserById(id: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`找不到使用者ID: ${id} `);
    }
    const deletedUser = await this.usersRepository.remove(user);
    if (!deletedUser) {
      throw new ConflictException('發生錯誤，請稍後再試');
    }
    return 'delete success';
  }
}
