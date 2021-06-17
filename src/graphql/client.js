import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

// this is used for testing in utils/test-utils
// the real client used for the app is in App.js
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://qservicesstagingapp.azurewebsites.net/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});
