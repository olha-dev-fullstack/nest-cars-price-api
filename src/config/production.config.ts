import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const migrationsFolder = path.resolve(__dirname, '..', 'migrations');
export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['**/*.entity.js'],
    synchronize: false,
    migrations: [`${migrationsFolder}/*.{ts,js}`],
    migrationsRun: true,
  }),
);
