import { useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom';
import MY_AUDIO_FILES from '../gql-queries/my-audio-files';

function MyUploadedAudio() {
  const { loading, error, data } = useQuery(MY_AUDIO_FILES);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.viewer?.audioList?.edges || [];
  console.log('audioFiles: ', audioFiles);
  return (
    <div>
      <h1>My Uploads</h1>

      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === '') {
              return null; 
            }

            return (
              <div className='song-list' key={audio.id}>
                <img src='../../public/cover.jpg' alt='Cover' className='song-list-image' />
                <div>
                  <li>
                    <Link to={{ pathname: '/player', state: { audioId: audio.audioTrack, pg: true, name: audio.title } }}>
                      {audio.title}
                    </Link>
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No audio files found for the specified creator.</p>
      )}

    </div>
  );
}

export default MyUploadedAudio;
