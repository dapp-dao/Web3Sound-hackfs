import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
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
    const [creator, setCreator]= useState(false);
    const [creat, setCreat]= useState('');
    const history= useHistory();

    const [createUser, { loading2, error2 }] = useMutation(CREATE_USER_MUTATION);

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

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>Error: {error2.message}</p>;


  return (
    <>
    <div>CreateProfile</div>
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
        history.push('/uploadaudio');
      }}>Create Music!</button>
      <br/>
      <br/>
      <button onClick={()=>{
        history.push('/searchcreators');
      }}>Search Creators</button>
    </>
    
  )
}

export default CreateProfile