import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import TOP_AUDIO_FILES from '../gql-queries/top-audio-files';

function AudioStore() {
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(TOP_AUDIO_FILES, {
    client,
    variables: { first: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.audioIndex?.edges || [];

  const sortedAudioFiles = audioFiles.sort((a, b) => b.node.likes - a.node.likes);

  return (
    <>
      <h1>All Tracks</h1>

      {sortedAudioFiles.length > 0 ? (
        <ul>
          {sortedAudioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === '') {
              return null;
            }
            return(
            <div>
            <img src='../../public/cover.jpg' alt='Cover' className='song-list-image' />
            <div>
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
    </>
  );
}

export default AudioStore;