import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import MY_AUDIO_FILES from "../../gql-queries/my-audio-files";
import routes from "../../config/routes";
import albumCover from "../../assets/album-cover.jpg"
import { client } from "../../client-objects/apolloClient";


function MyUploads() {
  const { loading, error, data } = useQuery(MY_AUDIO_FILES,{
    client
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.viewer?.audioList?.edges || [];
  const sortedAudioFiles= audioFiles.filter((audio)=>audio.node.deleted===false)
  console.log('audiofiles= ',audioFiles);
  if (sortedAudioFiles.length === 0) {
    return <p >No audio files found for the specified creator.</p>;
  }

  return (
    <div>
      <h1>My Uploads</h1>

      {sortedAudioFiles.map(({ node: audio }, index) => {
        // if (audio.audioTrack === "") {
        //   return null;
        // } 

        return (
          <div key={index} className="list-element">
            <img src={albumCover} alt="Cover" height={"100px"} className="image" />
            <div>
              <Link
                to={{
                  pathname: routes.PLAYER,
                  state: {
                    audioId: audio.audioTrack,
                    pg: true,
                    name: audio.title,
                  },
                }}
              >
                {audio.title}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyUploads;
