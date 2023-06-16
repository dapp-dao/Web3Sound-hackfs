import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
  const { client,session } = useContext(AuthContext);
  const creatorId = session.did._parentId;
  const { loading, error, data } = useQuery(GET_AUDIO_FILES_QUERY, {
    client,
    variables: { creatorId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.node?.audioList?.edges || [];

  return (
    <>
      <h1>Audio Files Page</h1>

      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map(({ node: audio }) => (
            <li key={audio.id}>
              Title: {audio.title} - Likes: {audio.likes}
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

