import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GET_MY_AUDIO= gql 
`
  query{
    viewer{
      audioList(first: 10){
        edges{
          node{
            id
            title
            audioTrack
          }
        }
      }
    }
  }
`
const GET_AUDIO_FILES_QUERY = gql
`
  query audioFiles($creatorId: ID!) {
    node(id: $creatorId) {
      ... on CeramicAccount {
        audioList(first: 10) {
          edges {
            node {
              id
              likes
              audioTrack
              title
              creator {
                id
              }
            }
          }
        }
      }
    }
  }
`;

function MyUploadedAudio() {
  const history= useHistory();
  // const { loading, error, data } = useQuery(GET_AUDIO_FILES_QUERY, {
  //   client,
  //   variables: { creatorId },
  // });
  const {loading, error, data}= useQuery(GET_MY_AUDIO);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.viewer?.audioList?.edges || [];
   console.log('audioFiles: ',audioFiles);
  return (
    <>
      <h1>Audio Files Page</h1>

      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map(({ node: audio }) => (
            <li key={audio.id}>
               <Link to={{ pathname: '/player', state: { audioId: audio.audioTrack, pg: true } }}>
                {audio.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No audio files found for the specified creator.</p>
      )}
       <button onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
    </>
  );
}

export default MyUploadedAudio;

