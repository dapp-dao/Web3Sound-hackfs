import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
import {compose} from './composeClient';


// Create a custom ApolloLink using the ComposeClient instance to execute operations
const link = new ApolloLink((operation) => {
  return new Observable((observer) => {
    compose.execute(operation.query, operation.variables).then(
      (result) => {
        observer.next(result)
        observer.complete()
      },
      (error) => {
        observer.error(error)
      }
    )
  })
})

// Use the created ApolloLink instance in your ApolloClient configuration
export const client = new ApolloClient({ cache: new InMemoryCache(), link })