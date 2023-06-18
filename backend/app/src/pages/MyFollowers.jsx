import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const GET_MY_FOLLOWERS = gql
`
  query {
    followIndex(first: 50) {
      edges {
        node {
          follower {
            id
            user{
              name
            }
          }
          following {
            id
            user {
              name
            }
          }
        }
      }
    }
  }
`;

const GET_VIEWER = gql
`
  query {
    viewer {
      id
      user {
        did {
          id
        }
      }
    }
  }
`;

function MyFollowers() {
  const history = useHistory();

  const { loading: viewerLoading, error: viewerError, data: viewerData } = useQuery(GET_VIEWER);
  const { loading: followerLoading, error: followerError, data: followerData } = useQuery(GET_MY_FOLLOWERS);

  if (viewerLoading || followerLoading) return <p>Loading...</p>;
  if (viewerError) return <p>Error: {viewerError.message}</p>;
  if (followerError) return <p>Error: {followerError.message}</p>;

  const viewerId = viewerData?.viewer?.id;
  const followers = followerData?.followIndex?.edges || [];
  
  const filteredFollowers = followers.filter(({ node }) => node.following.id === viewerId);
  console.log('filtered followers= ',filteredFollowers);
  return (
    <>
      <h1>My Followers</h1>
      {filteredFollowers.length > 0 ? (
        <ul>
          {filteredFollowers.map(({ node }, index) => (
            <li key={index}>
              name: {node?.follower?.user?.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers found.</p>
      )}
      <br />
      <br />
      <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
    </>
  );
}

export default MyFollowers;
