import { useMutation, gql } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

const CREATE_AUDIO_MUTATION = gql
`
  mutation CreateAudio($input: CreateaudioInput!) {
    createaudio(input: $input) {
      document {
        likes
        public
        title
      }
      clientMutationId
    }
  }
`;

const CREATE_USER_MUTATION = gql
`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      document {
        name
        creator
      }
      clientMutationId
    }
  }
`;

function MutateData() {

  const {client } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [likes, setLikes] = useState('');
  const [intLikes, setIntLikes]= useState(0);
  const [name, setName]= useState('')
  const [creator, setCreator]= useState(false);
  const [creat, setCreat]= useState('');
  const history= useHistory();


  const [createAudio, { loading, error }] = useMutation(CREATE_AUDIO_MUTATION);
  const [createUser, { loading2, error2 }] = useMutation(CREATE_USER_MUTATION);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
    const intval= parseInt(likes, 10);
    setIntLikes(intval);
  };

  const handleNameChange = (event)=>{
    setName(event.target.value);
  }

  const handleCreatorChange= (event)=>{
    setCreat(event.target.value);
    const boolval= parseInt(creat,10);
    if(boolval){
      setCreator(true);
    }
    else
    {
      setCreator(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createAudio({
        variables: {
          input: {
            content: {
              title: title,
              public: true,
              likes: intLikes,
            },
          },
        },
        client, // Set the Apollo Client instance for the mutation
      });

      console.log('Audio Mutation successful');
    } catch (error) {
      console.log('Error occurred during mutation:', error);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    try {
      await createUser({
        variables: {
          input: {
            content: {
              name: name,
              creator: creator,
            },
          },
        },
        client, // Set the Apollo Client instance for the mutation
      });

      console.log('User Mutation successful');
    } catch (error) {
      console.log('Error occurred during mutation:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>Error: {error2.message}</p>;

  return (
    <>
      <h1>Mutate Data Page</h1>
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
      </form>

      <form onSubmit={handleSubmit2}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Creator:
          <input type="number" value={creator} onChange={handleCreatorChange} />
        </label>
        <br />
        <button type="submit">User</button>
      </form>

      <button onClick={()=>{
        history.push('/searchcreators');
      }}>Search Creators</button>
    </>
  );
}

export default MutateData;

