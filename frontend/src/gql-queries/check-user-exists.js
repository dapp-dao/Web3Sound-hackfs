import { gql } from "@apollo/client";

const CHECK_USER_EXISTS = gql

`
query {
    viewer {
      id
      user {
        id
        creator
      }
    }
  }
`;

export default CHECK_USER_EXISTS;