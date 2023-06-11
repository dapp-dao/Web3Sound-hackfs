import { useContext } from 'react';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { DIDSession } from 'did-session';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';

function WalletConnect() {
  const {setDid, compose} = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  var {session}= useContext(AuthContext);
  const history= useHistory();

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


    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async function authenticationSteps()
  {
    try{
      await connectWallet().then(async()=>
      {
        setIsAuthenticated(true);
        setDid(session.did._id);
        history.push("/mutatedata");
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
