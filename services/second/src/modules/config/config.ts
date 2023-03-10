import { NestConfig } from '@nest_rabbit/nest';

export const dbConfig = NestConfig.registerAs('dbConfig', () => ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5,
    database: process.env.DATABASE_DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSPORT,
}));

export const rabbitConfig = NestConfig.registerAs('rabbitConfig', () => ({
    amqpUrl: process.env.RABBIT_AMQP_URL,
}));
