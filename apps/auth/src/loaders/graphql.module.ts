import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './dist/apps/auth/schema.gql',
      playground:
        process.env.NODE_ENV !== 'production'
          ? {
              settings: {
                'request.credentials': 'include',
                'schema.polling.interval': 200,
              },
            }
          : false,
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
  ],
})
export class GraphqlModule {}
