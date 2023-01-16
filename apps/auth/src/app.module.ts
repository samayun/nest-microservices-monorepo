import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './loaders/graphql.module';
import { AuthModule } from './modules/auth/auth.module';

console.log({ Auth: process.env.MONGODB_URI });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    GraphqlModule,
    AuthModule,
  ],
})
export class AppModule {}
