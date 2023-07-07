import { gql } from "@apollo/client";

const MUTATE_FOLLOW = gql
`
  mutation CreateFollow($input: CreateFollowInput!) {
    createFollow(input: $input) {
      document {
        following {
          id
        }
        follower {
          id
        }
      }
    }
  }
`;

export default MUTATE_FOLLOW;