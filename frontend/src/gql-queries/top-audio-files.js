import { gql } from "@apollo/client";

const TOP_AUDIO_FILES = gql
`
  query audioFiles($first: Int!) {
    audioIndex(first: $first) {
      edges {
        node {
          id
          audioTrack
          title
          deleted
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