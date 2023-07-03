import { gql } from "@apollo/client";

const GET_FOLLOWING = gql
  `
query{
  viewer{
    followList(first: 10){
      edges{
        node{
          id
          following{
              id
              user{
                id
                name
              }
            }
          }
      }
    }
  }
}
`
export default GET_FOLLOWING;