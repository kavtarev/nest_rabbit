import { NestConfig } from '@nest_rabbit/nest';

export const dbConfig = NestConfig.registerAs('dbConfig', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5433,
  database: process.env.DATABASE_DATABASE || 'kavtarev',
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSPORT || 'postgres',
}));
