import React from 'react'
import * as LitJsSdk from '@lit-protocol/lit-node-client';

function LitNode() {

    const string= 'This is an encrypted string'
    console.log('before encryption: ', string);
    const func= async()=>{
        const authsig= await LitJsSdk.checkAndSignAuthMessage({chain: "ethereum"});
        const {encryptedString, symmetricKey}= await LitJsSdk.encryptString(string);
        console.log('after encryption: ', encryptedString);
    }
    func();
  return (
    <div>LitNode</div>
  )
}

export default LitNode