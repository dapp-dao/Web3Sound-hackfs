import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import TOP_AUDIO_FILES from "../gql-queries/top-audio-files";
import routes from "../config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import albumCover from "../assets/album-cover.jpg"

function AudioStore() {
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(TOP_AUDIO_FILES, {
    client,
    variables: { first: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const audioFiles = data?.audioIndex?.edges || [];
  console.log('audiofiles= ', audioFiles);
  const sortedAudioFiles = audioFiles.sort(
    (a, b) => b.node.likes - a.node.likes
  );

  return (
    <div>
      <h1>Top Tracks</h1>

      {sortedAudioFiles.length > 0 ? (
        <ul>
          {sortedAudioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === "") {
              return null;
            }
            return (
              < div className="audio-list-element">
                <img 
                src={albumCover}
                alt="Cover"
                 />
                <div>
                  <li key={audio.id}>
                    <Link
                      to={{
                        pathname: routes.PLAYER,
                        state: {
                          audioId: audio.audioTrack,
                          pg: false,
                          name: audio.title,
                        },
                      }}
                    >
                      {audio.title}
                    </Link>
                    <span>{audio.likes} 
                      <FontAwesomeIcon icon={faHeart} size="lg" color="#fb5789"/>
                    </span>
                    <Link>
                      {audio.creator.user.name}
                    </Link>
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No audio files found.</p>
      )}
    </div>
   
  );
}

export default AudioStore;
