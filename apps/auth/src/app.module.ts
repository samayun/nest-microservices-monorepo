import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './loaders/graphql.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule, RabbitMqModule } from '@app/common';
import { AuthModule } from './modules/auth/auth.module';

console.log({ AuthDB: process.env.MONGODB_URI });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    RabbitMqModule,
    GraphqlModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
