import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://36a70b874b19.ngrok.io/graphql',
  cache: new InMemoryCache(),
});
