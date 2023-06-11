import { ComposeClient } from "@composedb/client";
import { definition } from "../../compiled/runtime-composite";
import { DIDSession } from 'did-session';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import React, { useState } from 'react';
import { useMutation, gql} from '@apollo/client';
import {compose} from './composeClient';
import { client } from './apolloClient'; 

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


function App() {
  const [did, setDid] = useState(null);

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  async function connectWallet() {
    try {
      const ethProvider = window.ethereum;
      const addresses = await ethProvider.request({ method: 'eth_requestAccounts' });
      const accountId = await getAccountId(ethProvider, addresses[0]);
      const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

      const session = await DIDSession.authorize(authMethod, { resources: compose.resources });
      console.log('Session:', session);
      console.log('session did: ', session.did);
      compose.setDID(session.did);
      console.log('Authenticated: ', compose);
      setDid(session.did._id);

    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async function mutateData() {
    try {
      await createUser({
        variables: {
          input: {
            content: {
              name: "Tejaswini",
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
      <button onClick={connectWallet} disabled={did !== null}>Connect Wallet</button>
      {did && <div>DID: {did}</div>}
      <button onClick={mutateData} disabled={did === null}>Mutate Data</button>
    </>
  );
}

export default App;
