import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
 let _BASE_URL="http://localhost:4000"
const httpLink = createHttpLink({
  uri: _BASE_URL,
});
console.log("newToken");
let userToken = localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  const token = userToken ? userToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzExOTMzNWQ0NWRhZjhmYmY0NjI5NjMiLCJpYXQiOjE2NjQzNDQyMTF9.7OdAOQb9pOvnCy_pK4MH4AsZ_xC7uvx0Ph8h8BORHuc";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'cache-only',
    },
  },
});
