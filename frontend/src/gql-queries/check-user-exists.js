import { gql } from "@apollo/client";

const CHECK_USER_EXISTS = gql

`
query {
    viewer {
      id
      user {
        id
      }
    }
  }
`;

export default CHECK_USER_EXISTS;