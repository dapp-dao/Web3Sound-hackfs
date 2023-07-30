import { gql } from "@apollo/client";

const GET_FOLLOWERS= gql
`
query{
    node(id: "did:pkh:eip155:5:0x391cc1cc51290c1ed99e9f2474a01c49cf50170c"){
      ...on Follow{
        follower{
          id
          user{
            id
            name
          }
        }
      }
    }
  }
`
export default GET_FOLLOWERS;