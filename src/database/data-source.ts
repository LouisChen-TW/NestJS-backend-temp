import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { UserInfo } from '../users/entities/user-info.entity';
import { User } from '../users/entities/user.entity';
import * as env from 'dotenv';
env.config({ path: 'env/.env.development' });

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  seeds: [`${process.env.TYPEORM_SEEDING_FACTORIES}`],
  factories: [`${process.env.TYPEORM_SEEDING_SEEDS}`],
  entities: [User, UserInfo],
};

export const dataSource = new DataSource(options);
