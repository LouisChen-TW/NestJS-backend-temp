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

export class CreateUserDto {
  @IsAlphanumeric('en-US', { message: '帳號只能為英文和數字之組合' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 18, { message: '帳號長度應為6至18之間' })
  account: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{0,}$/, {
    message: '密碼只能為數字加英文且最少需包含一個大寫英文、小寫英文和一數字',
  })
  @Length(6, 18, { message: '密碼長度應為6至18之間' })
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate: Date;
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
