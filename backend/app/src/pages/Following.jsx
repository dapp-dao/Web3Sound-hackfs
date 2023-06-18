import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GET_FOLLOWING= gql
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

function Following() {
  const history= useHistory();
const { loading, error, data } = useQuery(GET_FOLLOWING);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

const following = data?.viewer?.followList?.edges || [];

return (
  <>
    <h1>Following</h1>
    {following.length > 0 ? (
      <ul>
        {following.map(({ node }, index) => (
          <li key={index}>
            {node.following.user.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>0 following.</p>
    )}
    <br />
    <br />
    <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
  </>
);
}

export default Following