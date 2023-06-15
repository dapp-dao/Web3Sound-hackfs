import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

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
    const {client } = useContext(AuthContext);
    const [name, setName]= useState('')
    const history= useHistory();

    const [createUser, { loading2, error2 }] = useMutation(CREATE_USER_MUTATION);

        const handleNameChange = (event)=>{
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
    <h2>Hey! Looks like you don't have a profile created yet.</h2>
    <form onSubmit={handleSubmit2}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <button type="submit">User</button>
      </form>
      <button onClick={()=>{
        history.push('/uploadaudio');
      }}>Create Music!</button>
      <br/>
      <br/>
      <button onClick={()=>{
        history.push('/searchcreators');
      }}>Search Creators</button>

      <button onClick={()=>{
        history.push('/audiostore');
      }}>Audio Store</button>
    </>
    
  )
}

export default CreateProfile