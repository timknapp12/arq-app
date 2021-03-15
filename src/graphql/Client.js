import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://76b42bc9cba0.ngrok.io/graphql', fetch }),
  cache: new InMemoryCache(),
});
