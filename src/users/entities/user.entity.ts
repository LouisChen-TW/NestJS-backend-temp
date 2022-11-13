import * as bcrypt from 'bcrypt';
import { IsEmail, validateOrReject } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  account?: string;

  @Column({ select: false })
  password?: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @Column()
  name?: string;

  @Column({ default: false })
  isEnabled?: boolean;

  @CreateDateColumn()
  registerTime?: Date;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  userInfo?: UserInfo;

  // 寫入或更新時判斷資料格式
  @BeforeInsert()
  @BeforeUpdate()
  protected async validate?() {
    await validateOrReject(this);
  }

  // 註冊寫入資料時雜湊密碼
  @BeforeInsert()
  protected async hashPassword?() {
    const plainPassword = this.password;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    this.password = hashedPassword;
  }
}
