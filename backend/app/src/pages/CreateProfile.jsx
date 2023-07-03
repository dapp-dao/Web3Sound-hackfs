import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

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


function CreateProfile() {
  const { client } = useContext(AuthContext);
  const [name, setName] = useState('')
  const history = useHistory();

  const [createUser, { loading2, error2 }] = useMutation(CREATE_USER_MUTATION);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }


  const handleSubmit2 = async (event) => {
    event.preventDefault();

    try {
      await createUser({
        variables: {
          input: {
            content: {
              name: name,
              creator: false,
              followers: 0
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

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>Error: {error2.message}</p>;


  return (
    <>
      <h1 className='create-profile-title'>Create Profile</h1>
      <span className='hey-you'>Hey! Looks like you haven't created a profile yet.</span>
      <br/>
      <br/>
      <form onSubmit={handleSubmit2}>
        <label>
          Name:
          <input type="text" className='input-box' value={name} onChange={handleNameChange} />
        </label>
        <br />
        <br />
        <br />
        <button className='outlined-upload-button' type="submit">Submit</button>
        <br />
        {loading2 && <p>Creating profile...</p>}
      </form>
      <br />
      <br />
      <button className='upload-button' onClick={() => {
        history.push('/');
        window.location.reload
      }}>Go to Home Page</button>

    </>

  )
}

export default CreateProfile