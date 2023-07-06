import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { useMutation, useQuery } from '@apollo/client';
import CREATE_AUDIO_MUTATION from '../gql-mutations/create-audio';
import UPDATE_TO_CREATOR from '../gql-mutations/update-to-creator';
import { client } from '../client-objects/apolloClient';
import { compose } from '../client-objects/composeClient';
import CHECK_USER_EXISTS from '../gql-queries/check-user-exists'

function UploadTrack() {
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  

  const web3client = new Web3Storage({
    token: import.meta.env.VITE_WEB3STORAGE_TOKEN,
  });

  const [createAudio] = useMutation(CREATE_AUDIO_MUTATION, {client});
  const [updateUser] = useMutation(UPDATE_TO_CREATOR, {client});
  const {loading, error, data: userData}= useQuery(CHECK_USER_EXISTS, {
    client
  });

  if (error) return <p>Error: {error.message}</p>;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event, ) => {
    event.preventDefault();

    try {
    const fileInput = document.querySelector('input[type="file"]');
    const file = handleFileInputChange({ target: { files: fileInput.files } });
    setUploading(true);

    const cidReturned = await storeWithProgress(file);
    console.log('CID:', cidReturned);
    
      if(cidReturned){
        const { data } = await createAudio({
          variables: {
            input: {
              content: {
                title: title,
                audioTrack: cidReturned,
                audioImage: 'bafybeiesvihx7glvmgcltfehkp5bevz6yxibyl5g2o5doja4oxdxg6ctma',
                public: true,
                likes: 0,
              },
            },
          },
        });
  
        if (data.createaudio) {
          setShowSuccessMessage(true);
          console.log('creator: ',compose);
          if (userData.viewer.user.creator) {
            handleUpdateUser();
          }
         }
      }
      
    } catch (error) {
      console.log('Error occurred during mutation:', error);
    }
    finally{
      setUploading(false);
    }
  };

  const handleUpdateUser = async () => {
    const input = {
      id: userData.viewer.user.id,
      content: {
        creator: true,
      },
    };

    try {
      await updateUser({ variables: { input } });
      console.log('User updated');
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

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

    const cidAfterWeb3 = await web3client.put([file], { onRootCidReady, onStoredChunk });
    console.log('Upload completed. CID:', cidAfterWeb3);
    return cidAfterWeb3;
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    return file;
  };


  return(
    <>
      <h1 className="upload-title">Upload your track</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" className="input-box" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Audio:
          <input type="file" className="input-box" onChange={handleFileInputChange} />
        </label>
        <button type="submit" className="outlined-upload-button" disabled={uploading}>
          Upload
        </button>
        {(uploading || loading) && <p>Uploading track...</p>}
        {showSuccessMessage && <p>Audio uploaded successfully!</p>}
      </form>
    </>
  );
}

export default UploadTrack;
