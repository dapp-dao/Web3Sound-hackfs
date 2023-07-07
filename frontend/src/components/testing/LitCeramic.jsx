import React from 'react'
import * as Integration from 'lit-ceramic-sdk';

function LitCeramic() {
    
    let litCeramicIntegration = new Integration("https://ceramic-clay.3boxlabs.com", "ethereum");
    //litCeramicIntegration.startLitClient(window);
    console.log('ceramic lit: ',litCeramicIntegration);

  return (
    <div>LitCeramic</div>
  )
}

export default LitCeramic