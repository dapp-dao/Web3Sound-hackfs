import { gql } from "@apollo/client";

const CREATE_AUDIO_MUTATION = gql
  `
  mutation CreateAudio($input: CreateaudioInput!) {
    createaudio(input: $input) {
      document {
        likes
        public
        title
        audioTrack
        audioImage
      }
      clientMutationId
    }
  }
`;
export default CREATE_AUDIO_MUTATION;