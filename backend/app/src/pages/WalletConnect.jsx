import { useContext } from 'react';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { DIDSession } from 'did-session';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_USERS_QUERY = gql
`
  query {
    userIndex(first: 10) {
      edges {
        node {
          did
          {
            id
          }
          name
          creator
        }
      }
    }
  }
`;

function WalletConnect() {
  const {setDid, compose, setParentId, setSession, client} = useContext(AuthContext);
  var session;
  const history= useHistory();
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
      client,
    });

  async function connectWallet() {
    try {
      const ethProvider = window.ethereum;
      const addresses = await ethProvider.request({ method: 'eth_requestAccounts' });
      const accountId = await getAccountId(ethProvider, addresses[0]);
      const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

      session = await DIDSession.authorize(authMethod, { resources: compose.resources });
      setSession(session);
      console.log('Session:', session);
      console.log('parent: ',session.did._parentId);
      compose.setDID(session.did);
      console.log('Authenticated: ', compose);
      setParentId(session.did._parentId);


    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async function checkUserExists()
  {
    
    const userID= session.did._parentId;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const users = data?.userIndex?.edges || [];
  
    const ExistingUser = await users.filter((user) => user.node.did.id==userID);
    const newLink= ExistingUser.length > 0 ? '/dashboard' : '/createprofile'
    return newLink;
  }

  async function authenticationSteps()
  {
    try{
      await connectWallet().then(async()=>
      {
        console.log('After connecting Wallet')
        setDid(session.did._id);
        await checkUserExists().then((link)=>{
          console.log('After checking if user exists. The link is: ',link)
          history.push(link);
        }).catch((err)=>{
          console.log('User didnt get checked ig ',err)
        })
        
      }).catch((err)=>{
        console.log('Error- ',err)
      })
      
    }
    catch(err)
    {
      console.log('Inside authentication steps- ',err)
    }
      
  }


  return (
    <>
      <h1>Wallet Connect Page</h1>
      <button onClick={authenticationSteps}>Connect Wallet</button>
    </>
  );
}

export default WalletConnect;
