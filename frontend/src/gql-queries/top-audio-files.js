import { gql } from "@apollo/client";

const TOP_AUDIO_FILES = gql
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
             user{
              name
             }
            }
          }
        }
    }
  }
`;

export default TOP_AUDIO_FILES;