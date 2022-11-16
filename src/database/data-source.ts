import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as env from 'dotenv';

env.config({ path: 'env/.env.development' });

export const typeormOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  logging: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : false,
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  seeds: [`${process.env.TYPEORM_SEEDING_SEEDS}`],
  factories: [`${process.env.TYPEORM_SEEDING_FACTORIES}`],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
};

export const dataSource = new DataSource(typeormOptions);
