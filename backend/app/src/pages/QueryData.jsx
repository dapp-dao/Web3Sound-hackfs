import { useQuery, gql } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const GET_AUDIO_FILES_QUERY = gql
`
  query{
    audioIndex(first:4){
        edges{
            node{
                id
                likes
                title
            }
        }
    }
  }
`;

function QueryData() {
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_AUDIO_FILES_QUERY, {
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Audio Files Page</h1>

      {data && data.audioFiles && data.audioFiles.length > 0 ? (
        <ul>
          {data.audioFiles.map((audio) => (
            <li key={audio.id}>
              Title: {audio.title} - Likes: {audio.likes}
            </li>
          ))}
        </ul>
      ) : (
        <p>No audio files found for the specified creator.</p>
      )}
    </>
  );
}

export default QueryData;
