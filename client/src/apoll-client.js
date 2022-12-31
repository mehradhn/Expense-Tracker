import React, { useMemo, useRef } from 'react'
import Cookies from "universal-cookie";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

import { onError } from "@apollo/client/link/error";

import { setContext } from '@apollo/client/link/context';

const graphqlEndpoint = 'http://localhost:80/graphql' 

// The name here doesn't really matter.
export default function CustomApolloProvider(props) {
  const cookies = new Cookies()
  const token = cookies.get('token')
  // const tokenRef = useRef();

  // Whenever the token changes, the component re-renders, thus updating the ref.
  // tokenRef.current = token;

  // Ensure that the client is only created once.
  const client = useMemo(() => {

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // auth: tokenRef.current ? `ut ${tokenRef.current}` : null,
        auth: `ut ${token}`
      }
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {

          // if (message === 'unathorized') {
          //   // delete cookie and navigae to wikipedia
          // }
          console.log("-------------------------------------");
          console.log(`message:${message} location:${location}`)
          console.log("-------------------------------------");

        })
      }
    
      if (networkError) {
        console.log(`networkerror: ${networkError}`)
      }
    })

    const httpLink = createUploadLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    // const wtfLink = ApolloLink.from([authLink, wsLink])
    
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [])

  return <ApolloProvider client={client} {...props} />;
}