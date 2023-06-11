import { useContext, useState } from 'react';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { DIDSession } from 'did-session';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function WalletConnect() {
  const { setIsAuthenticated, setDid, compose } = useContext(AuthContext);
  var {session}= useContext(AuthContext);
  const history = useHistory();

  async function connectWallet() {
    try {
      const ethProvider = window.ethereum;
      const addresses = await ethProvider.request({ method: 'eth_requestAccounts' });
      const accountId = await getAccountId(ethProvider, addresses[0]);
      const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

      session = await DIDSession.authorize(authMethod, { resources: compose.resources });
      console.log('Session:', session);
      console.log('session did: ', session.did);
      compose.setDID(session.did);
      console.log('Authenticated: ', compose);

      // Set the authentication status and the authenticated DID
      setIsAuthenticated(true);
      setDid(session.did._id);

      // Navigate to MutateData page after successful authentication
      history.push('/mutatedata');

    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  return (
    <>
      <h1>Wallet Connect Page</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </>
  );
}

export default WalletConnect;
