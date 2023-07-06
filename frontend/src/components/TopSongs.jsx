import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import TOP_AUDIO_FILES from "../gql-queries/top-audio-files";
import routes from "../config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import albumCover from "../assets/album-cover.jpg";
import { client } from "../client-objects/apolloClient";

function TopSongs() {
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
        <div>
          {sortedAudioFiles.map(({ node: audio }) => {
            if (audio.audioTrack === "") {
              return null;
            }
            return (
              <div key={audio.audioTrack} className="list-element">
                <img
                  src={albumCover}
                  alt="Cover"
                  height={"100px"}
                />
                <div>
                  <li>
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
                    <span>
                      {audio.likes}{" "}
                      <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        color="#fb5789"
                      />
                    </span>
                    <Link>{audio.creator.user.name}</Link>
                  </li>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No audio files found.</p>
      )}
    </div>
  );
}

export default TopSongs;
