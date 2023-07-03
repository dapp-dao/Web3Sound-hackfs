import React from 'react'
import * as LitJsSdk from "@lit-protocol/lit-node-client";

async function LitIntegration() {
    const client= new LitJsSdk.LitNodeClient();
    await client.connect();
    console.log('client= ',client);
    window.LitNodeClient= client;
  return (
    <div>LitIntegration</div>
  )
}

export default LitIntegration