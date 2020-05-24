import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const logger = { log: e => console.error(e.stack) };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

addErrorLoggingToSchema(schema, logger);

export { schema };
