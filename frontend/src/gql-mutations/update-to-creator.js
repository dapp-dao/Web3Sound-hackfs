import { gql } from "@apollo/client";

const UPDATE_TO_CREATOR = gql
  `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      document {
        id
        name
        creator
      }
    }
  }
`;

export default UPDATE_TO_CREATOR;