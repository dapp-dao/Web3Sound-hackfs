import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GET_AUDIO_FILES_QUERY = gql
`
  query audioFiles($first: Int!) {
    audioIndex(first: $first) {
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
`;

function AudioStore() {
  const { client } = useContext(AuthContext);
  const history= useHistory();
  const { loading, error, data } = useQuery(GET_AUDIO_FILES_QUERY, {
    client,
    variables: { first: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.audioIndex?.edges || [];

  const sortedAudioFiles = audioFiles.sort((a, b) => b.node.likes - a.node.likes);

  return (
    <>
      <h1>Audio Files Page</h1>

      {sortedAudioFiles.length > 0 ? (
        <ul>
          {sortedAudioFiles.map(({ node: audio }) => (
            <li key={audio.id}>
              Title: {audio.title} - Likes: {audio.likes}
            </li>
          ))}
        </ul>
      ) : (
        <p>No audio files found.</p>
      )}
       <button onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
    </>
  );
}

export default AudioStore;
