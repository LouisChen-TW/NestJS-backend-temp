import {
  IsAlphanumeric,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.entity';

export class CreateUserDto {
  /**
   * Input the account
   * @example 'abc123'
   */
  @IsAlphanumeric('en-US', { message: '帳號只能為英文和數字之組合' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 18, { message: '帳號長度應為6至18之間' })
  account: string;
  /**
   * Input the password
   * @example 'Abc123'
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{0,}$/, {
    message: '密碼只能為數字加英文且最少需包含一個大寫英文、小寫英文和一數字',
  })
  @Length(6, 18, { message: '密碼長度應為6至18之間' })
  password: string;
  /**
   * Input the name
   * @example 'abc123'
   */
  @IsNotEmpty()
  @IsString()
  name: string;
  /**
   * Input the email
   * @example 'abc123@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;
  /**
   * Input the address
   * @example 'abc123 st.'
   */
  @IsOptional()
  @IsString()
  address: string;
  /**
   * Input the birthDate
   * @example '1970-01-01'
   */
  @IsOptional()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate: Date;
  /**
   * Input the mobile phone
   * @example '0900000000'
   */
  @IsNotEmpty()
  @IsPhoneNumber('TW')
  @Length(10, 10)
  mobilePhone: string;
}

export class UpdateUserDto {
  @IsAlphanumeric('en-US', { message: '帳號只能為英文和數字之組合' })
  @IsOptional()
  @IsString()
  @Length(6, 18, { message: '帳號長度應為6至18之間' })
  account?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateUserInfoDto {
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate: Date;
  @IsOptional()
  @IsPhoneNumber('TW')
  @Length(10, 10)
  mobilePhone: string;
}

// Response
export class getAllUsersResDto extends User {}

export class getUserByIdResDto extends User {}

export class updateUserByIdResDto extends User {}

export class updateUserInfoByIdResDto extends UserInfo {}
