import { gql } from "@apollo/client";

const MY_AUDIO_FILES = gql

` query{
    viewer{
      audioList(first: 100){
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

export default MY_AUDIO_FILES;
