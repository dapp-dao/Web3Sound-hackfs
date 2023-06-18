import { useQuery, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MyUploadedAudio.css'
import cover from '../../public/cover.jpg'

const GET_MY_AUDIO = gql
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

function MyUploadedAudio() {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_MY_AUDIO);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.viewer?.audioList?.edges || [];
  console.log('audioFiles: ', audioFiles);
  return (
    <div className='uploaded-audio-main'>
      <h1 className='my-audio-title'>My Uploads</h1>

      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === '') {
              return null; // Skip rendering if audioTrack is null
            }

            return (
              <div className='song-list' key={audio.id}>
                <img src='../../public/cover.jpg' alt='Cover' className='song-list-image' />
                <div className='song-details'>
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
      <br />
      <br />
      <button className='my-audio-button' onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
      <br />
      <br />
    </div>
  );
}

export default MyUploadedAudio;

