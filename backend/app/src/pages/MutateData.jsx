import { useMutation, gql } from '@apollo/client';
import { client } from '../client-objects/apolloClient';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

const CREATE_USER_MUTATION = gql
`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      document {
        name
        creator
      }
      clientMutationId
    }
  }
`;

function MutateData() {

  const {did, compose, client}= useContext(AuthContext);
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  
  async function mutateData() {
    try {
      await createUser({
        variables: {
          input: {
            content: {
              name: "user1",
              creator: false,
            },
          },
        },
        client, // Set the Apollo Client instance for the mutation
      });

      console.log('Mutation successful');
    } catch (error) {
      console.log('Error occurred during mutation:', error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Mutate Data Page</h1>
      <button >Mutate Data</button>
    </>
  );
}

export default MutateData;
