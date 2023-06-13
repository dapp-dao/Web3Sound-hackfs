import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';

function UploadAudioFile() {
  const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });
  async function storeWithProgress(file) {
    const onRootCidReady = (cid) => {
      console.log('Uploading file with CID:', cid);
    };

    const totalSize = file.size;
    let uploaded = 0;

    const onStoredChunk = (size) => {
      uploaded += size;
      const pct = (uploaded / totalSize) * 100;
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // Upload the file using the web3.storage client
    const cid= await client.put([file], { onRootCidReady, onStoredChunk });
    console.log('Upload completed. CID:', cid);
    return cid;
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    return file;
  }

  return (
    <>
      <div>UploadAudioFile</div>
      <input type="file" onChange={handleFileInputChange} />
      <button
        onClick={async () => {
          const fileInput = document.querySelector('input[type="file"]');
          const file = handleFileInputChange({ target: { files: fileInput.files } });
          const cid = await storeWithProgress(file);
          console.log('CID:', cid);
        }}
      >
        Upload
      </button>
    </>
  );
}

export default UploadAudioFile;
