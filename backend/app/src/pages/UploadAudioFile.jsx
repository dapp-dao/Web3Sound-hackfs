import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { useMutation, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './UploadAudioFile.css'

const CREATE_AUDIO_MUTATION = gql
  `
  mutation CreateAudio($input: CreateaudioInput!) {
    createaudio(input: $input) {
      document {
        likes
        public
        title
        audioTrack
        audioImage
      }
      clientMutationId
    }
  }
`;

const USER_UPDATE_QUERY = gql
  `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      document {
        id
        name
        creator
      }
    }
  }
`;

function UploadAudioFile() {
  const { client, qData } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Track success message visibility
  const web3client = new Web3Storage({
    token:
      process.env.WEB3_TOKEN,
  });
  const history = useHistory();

  const [createAudio, { loading, error }] = useMutation(CREATE_AUDIO_MUTATION);
  const [updateUser, { loadingUpdate, errorUpdate }] = useMutation(USER_UPDATE_QUERY);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event, cidTrack) => {
    event.preventDefault();

    try {
      await createAudio({
        variables: {
          input: {
            content: {
              title: title,
              audioTrack: cidTrack,
              audioImage: 'bafybeiesvihx7glvmgcltfehkp5bevz6yxibyl5g2o5doja4oxdxg6ctma',
              public: true,
              likes: 0,
            },
          },
        },
        context: {
          client: client,
        },
        onCompleted: (data) => {
          if (data && data.createaudio) {
            setShowSuccessMessage(true);
            if (!qData.viewer.user.creator) {
              handleUpdateUser();
            }
          }
        },
      });

      if (error) return <p>Error: {error.message}</p>;
    } catch (error) {
      console.log('Error occurred during mutation:', error);
    }
  };


  const handleUpdateUser = async () => {
    const input = {
      id: qData.viewer.user.id,
      content: {
        creator: true,
      },
    };

    try {
      console.log('Before updating: ', qData.viewer.user.creator);
      const { data } = await updateUser({ variables: { input } });
      console.log('User updated:', data.updateUser.document);
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

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    return file;
  }

  return (
    <>
      <h1 className='upload-title'>Upload your track</h1>
      <form onSubmit={(event)=> handleSubmit(event, cid)}>
        <label>
          Title:
          <input type="text" className='input-box' value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <br/>
        <label>Audio: 
        <input type="file" className='input-box' onChange={handleFileInputChange} />
        </label>
        <br/>
        <br/>
        <button
          className='outlined-upload-button'
          onClick={async () => {
            const fileInput = document.querySelector('input[type="file"]');
            const file = handleFileInputChange({ target: { files: fileInput.files } });
            setUploading(true);
            try {
              const cidReturned = await storeWithProgress(file);
              setCid(cidReturned);
              console.log('CID:', cid);
            } catch (error) {
              console.log('Error occurred during file upload:', error);
            } finally {
              setUploading(false);
            }
          }}
        >
          Upload Audio
        </button>
        <br />
        <br />
        {uploading && <p>Uploading audio file...</p>}
        <br />
        <br/>
        <br/>
        <br/>
        <button type="submit" className='outlined-upload-button' disabled={!cid || uploading}>
          Upload
        </button>
        <br />
        {loading && <p>Uploading your track...</p>}
        {showSuccessMessage && <p>Audio uploaded successfully!</p>}
        {loadingUpdate && <p>Updating you to a creator! XD</p>}
      </form>


      <br/>
      <br/>
      <br/>
      <br/>
      <button
      className='upload-button'
        onClick={() => {
          history.push('/dashboard');
        }}
      >
        Back to Dashboard
      </button>
      <br/>
      <br/>
    </>
  );

}

export default UploadAudioFile;
