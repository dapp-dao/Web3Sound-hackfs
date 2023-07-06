import React from 'react';
import { DIDSession } from 'did-session';
import { useNavigate } from 'react-router-dom';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import CHECK_USER_EXISTS from '../gql-queries/check-user-exists';
import routes from '../config/routes';
import { client } from '../client-objects/apolloClient';
import { compose } from '../client-objects/composeClient';
import { useLazyQuery } from '@apollo/client';


function WalletConnect() {
  const [executeQuery, { loading, error }] = useLazyQuery(CHECK_USER_EXISTS, {
    client,
    fetchPolicy: 'network-only',
    onCompleted: handleQueryCompleted,
  });
  const navigate= useNavigate();


  function handleQueryCompleted(data) {
    console.log('data: ', data)
    if (data && data.viewer && data.viewer.user) {
      navigate(routes.MYUPLOADS);

    } else  {
      console.log('no data:', queryData);
      navigate('/createprofile');
    }
  }

  async function connectWallet() {
    try {
      const ethProvider = window.ethereum;
      const addresses = await ethProvider.request({ method: 'eth_requestAccounts' });
      const accountId = await getAccountId(ethProvider, addresses[0]);
      const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

      const session = await DIDSession.authorize(authMethod, { resources: compose.resources });
      
      if(session){
        compose.setDID(session.did);
        console.log('compose client: ',compose.did);
        if(compose.did){
          executeQuery();
        }
      }
    } catch (error) {
      console.log('Inside connectWallet - ', error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 >web3Sound</h1>
      <button className='button-class' onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
  
}

export default WalletConnect;