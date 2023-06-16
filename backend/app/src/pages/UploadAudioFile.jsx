import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { useMutation, gql } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

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

function UploadAudioFile() {
  const { client } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [likes, setLikes] = useState('');
  const [intLikes, setIntLikes] = useState(0);
  const [cid, setCid] = useState('');
  const web3client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBMjBDZGMwOWI5NjUwRDA3MWE3RWRjMjkwMjlkMDY5NDA2NENlNTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY2MTk4OTY0NjQsIm5hbWUiOiJBdWRpbyJ9.t3OwHAy0E6oL1LW79nI2foXeh26cLVYytGMhtN_0aJ4' });
  const history = useHistory();


  const [createAudio, { loading, error }] = useMutation(CREATE_AUDIO_MUTATION);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
    const intval = parseInt(likes, 10);
    setIntLikes(intval);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createAudio({
        variables: {
          input: {
            content: {
              title: title,
              audioTrack: cid,
              audioImage: 'bafybeiesvihx7glvmgcltfehkp5bevz6yxibyl5g2o5doja4oxdxg6ctma',
              public: true,
              likes: intLikes,
            },
          },
        },
        context:{
          client: client
        }
      });

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      console.log('Audio Mutation successful');
    } catch (error) {
      console.log('Error occurred during mutation:', error);
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

    const cid = await web3client.put([file], { onRootCidReady, onStoredChunk });
    console.log('Upload completed. CID:', cid);
    return cid;
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    return file;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Likes:
          <input type="number" value={likes} onChange={handleLikesChange} />
        </label>
        <br />
        <button type="submit">Audio</button>
        <div>UploadAudioFile</div>
        <input type="file" onChange={handleFileInputChange} />
        <button
          onClick={async () => {
            const fileInput = document.querySelector('input[type="file"]');
            const file = handleFileInputChange({ target: { files: fileInput.files } });
            const cid = await storeWithProgress(file);
            setCid(cid);
            console.log('CID:', cid);
          }}
        >
          Upload
        </button>
      </form>

      <button onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>


    </>
  );
}

export default UploadAudioFile;
