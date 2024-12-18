import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { Report } from '../report/report.entity';
import { User } from '../user/user.entity';

const migrationsFolder = path.resolve(__dirname, '..', 'migrations');
export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: [User, Report],
    synchronize: false,
    migrations: [`${migrationsFolder}/*.{ts,js}`],
    migrationsRun: process.env.NODE_ENV === 'test' ? true : false,
  }),
);
