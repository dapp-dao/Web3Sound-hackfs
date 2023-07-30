import { gql } from "@apollo/client";

const CREATE_AUDIO_MUTATION = gql
  `
  mutation CreateAudio($input: CreateAudioInput!) {
    createAudio(input: $input) {
      document {
        title
        audioTrack
      }
    }
  }
`;
export default CREATE_AUDIO_MUTATION;