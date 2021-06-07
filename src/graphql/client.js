import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://qservicesstagingapp.azurewebsites.net/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});
