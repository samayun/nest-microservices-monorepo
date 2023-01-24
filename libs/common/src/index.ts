export * from './database/database.module';
export * from './database/abstract.schema';
export * from './database/abstract.repository';

export * from './rabbitmq/rabbitmq.module';
export * from './rabbitmq/rabbitmq.service';

export * from './auth/global.auth.module';
export * from './auth/jwt-auth.guard';

export const AUTH_SERVICE = 'AUTH';
export const BILLING_SERVICE = 'BILLING';
