import { gql } from "@apollo/client";

const GET_ALL_USERS = gql
`
  query {
    userIndex(first: 10) {
      edges {
        node {
          id
          name
          creator
          did {
            id
          }
        }
      }
    }
  }
`;

export default GET_ALL_USERS;