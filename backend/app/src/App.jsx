import { ComposeClient } from "@composedb/client";
import { definition } from "../../compiled/runtime-composite";
import { DIDSession } from 'did-session';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import React, { useState, useEffect } from 'react';

function App() {
  const [did, setDid] = useState(null);


  async function connectWallet() {
    try {
      const ethProvider = window.ethereum;
      console.log('line1');
      const addresses = await ethProvider.request({ method: 'eth_requestAccounts' });
      console.log('line2');
      const accountId = await getAccountId(ethProvider, addresses[0]);
      console.log('line3');
      const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);
      console.log('line4');

      const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition });
      console.log('It is a success! :))');
      const session = await DIDSession.authorize(authMethod, { resources: compose.resources });
      console.log('line6');
      console.log('Session:', session);
      console.log('session did: ', session.did);
      compose.setDID(session.did);
      setDid(session.did._id);

    } catch (error) {
      console.error('Error connecting wallet:',error);
    }
  }

  return (
    <>
      <button onClick={connectWallet} disabled={did !== null}>Connect Wallet</button>
      {did && <div>DID: {did}</div>}
    </>
  );
}

export default App;
