import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';

config();
const migrationsFolder = path.resolve(__dirname, 'migrations');
console.log(migrationsFolder);

const options: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Report],
  migrations: [`${migrationsFolder}/*.{ts,js}`],

};

export const dataSource = new DataSource(options);