import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './MyFollowers.css'

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
    <div className='followers-main'>
      <h1 className='followers-title'>My Followers</h1>
      {filteredFollowers.length > 0 ? (
        <ul>
          {filteredFollowers.map(({ node }, index) => (
            <div className='followers-list'>
              <img src='../../public/profilepic.png' alt='profile' className='following-list-image' />
              <div className='followers-details'>
            <li key={index}>
              <span className="followers-name">{node?.follower?.user?.name}</span>
              <br/>
              <span className="followers-id">{node?.follower?.id}</span>
            </li>
            </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No followers found.</p>
      )}
      <br />
      <br />
      <button className='followers-button' onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
      <br/>
      <br/>
    </div>
  );
}

export default MyFollowers;
