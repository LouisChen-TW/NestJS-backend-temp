import {
  IsISO8601,
  IsPhoneNumber,
  Length,
  validateOrReject,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  address?: string;

  @Column()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate?: Date;

  @Column()
  @IsPhoneNumber('TW')
  mobilePhone?: string;

  @OneToOne(() => User, (user) => user.userInfo, { cascade: true })
  @JoinColumn()
  user?: User;

  // 寫入或更新時判斷資料格式
  @BeforeInsert()
  @BeforeUpdate()
  private async validate?() {
    await validateOrReject(this);
  }
}
