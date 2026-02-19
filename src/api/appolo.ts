import { HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

export const appoloClient = new ApolloClient({
  link: link,
  cache: cache,
});
