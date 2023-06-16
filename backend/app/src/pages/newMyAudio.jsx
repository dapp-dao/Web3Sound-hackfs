import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHENTICATED_USER_AUDIOS = gql
`
query {
  viewer {
    id
    audioList {
      edges {
        node {
          id
          title
          audioTrack
        }
      }
    }
  }
}

`;

function NewAudioList() {
  const [audios, setAudios] = useState([]);
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER_AUDIOS);

  useEffect(() => {
    console.log('data= ',data);
    if (data && data.viewer && data.viewer.audioList) {
      setAudios(data.viewer.audioList.edges.map((edge) => edge.node));
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* {audios.map((audio) => (
        <div key={audio.id}>
          <h3>{audio.title}</h3>
          <p>Public: {audio.public ? 'Yes' : 'No'}</p>
          <img src={audio.audioImage} alt="Audio Image" />
          <audio controls>
            <source src={audio.audioTrack} type="audio/mpeg" />
          </audio>
        </div>
      ))} */}
    </div>
  );
}

export default NewAudioList;
