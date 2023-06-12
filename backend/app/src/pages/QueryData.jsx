import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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

function QueryData() {
  const { client, parentId,session } = useContext(AuthContext);
  console.log('Parent id: ', session.did._parentId);
  const creatorId = session.did._parentId; // Assuming the creator ID is available in session._parentId
  //const creatorId= "did:pkh:eip155:1:0xcdd4a0a113814085d1b73f4f473275fca59428f1"
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
    </>
  );
}

export default QueryData;

