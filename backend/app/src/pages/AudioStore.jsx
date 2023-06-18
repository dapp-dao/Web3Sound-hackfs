import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MyUploadedAudio.css'

const GET_AUDIO_FILES_QUERY = gql
`
  query audioFiles($first: Int!) {
    audioIndex(first: $first) {
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
      <h1 className='my-audio-title'>All Tracks</h1>

      {sortedAudioFiles.length > 0 ? (
        <ul>
          {sortedAudioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === '') {
              return null; // Skip rendering if audioTrack is null
            }
            return(
            <div className='song-list'>
            <img src='../../public/cover.jpg' alt='Cover' className='song-list-image' />
            <div className='song-details'>
            <li key={audio.id}>
            <Link to={{ pathname: '/player', state: { audioId: audio.audioTrack, pg: false , name: audio.title} }}>
                  {audio.title}
                </Link>
            </li>
            </div>
          </div>
            )
            })}
        </ul>
      ) : (
        <p>No audio files found.</p>
      )}
       <button className='my-audio-button' onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
      <br/>
      <br/>
    </>
  );
}

export default AudioStore;
