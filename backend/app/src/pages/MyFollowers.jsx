import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_MY_FOLLOWERS = gql
`
  query {
    viewer {
      followList(first: 10) {
        edges {
          node {
            follower {
              id
              user{
              name
              }
            }
          }
        }
      }
    }
  }
`;

function MyFollowers() {
  const { loading, error, data } = useQuery(GET_MY_FOLLOWERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const followers = data?.viewer?.followList?.edges || [];

  return (
    <div>
      <h1>My Followers</h1>
      {followers.length > 0 ? (
        <ul>
          {followers.map(({ node }, index) => (
            <li key={index}>
              Follower ID: {node.follower.id} - Name: {node.follower.user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers found.</p>
      )}
    </div>
  );
}

export default MyFollowers;

