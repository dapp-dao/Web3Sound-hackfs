import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DIDSession } from 'did-session';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import CHECK_USER_EXISTS from '../gql-queries/check-user-exists';
import routes from '../config/routes';


function WalletConnect() {
  const { session, setSession, compose, client, setQData } = useContext(AuthContext);
  const [didSet, setDidSet] = useState(false); // Track if setDID is completed
  const [executeQuery, { loading, error, data }] = useLazyQuery(CHECK_USER_EXISTS, {
    client,
    fetchPolicy: 'network-only',
    onCompleted: handleQueryCompleted,
  });
  const navigate= useNavigate();

  useEffect(() => {
    const authSession = async () => {
      try {
        if (session && session.did) {
          await compose.setDID(session.did);
          console.log(compose);
          setDidSet(true)
        }
      } catch (err) {
        console.log('Error in setting auth session - ', err);
      }
    };
    authSession();
  }, [session]);

  useEffect(() => {
    if (didSet) {
      executeQuery(); 
    }
  }, [didSet, executeQuery]);

  function handleQueryCompleted(queryData) {
    if (queryData && queryData.viewer && queryData.viewer.user) {
      setQData(queryData);
      console.log('data:', queryData);
      navigate(routes.AUDIOSTORE);

    } else if (didSet) {
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

      const sesh = await DIDSession.authorize(authMethod, { resources: compose.resources });
      setSession(sesh); 
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