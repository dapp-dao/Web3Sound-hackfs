import { useQuery } from '@apollo/client';
import React from 'react';
import GET_FOLLOWING from '../gql-queries/get-following';
import profilePic from '../assets/profilepic.png';
import { client } from '../client-objects/apolloClient';

function Following() {
  const { loading, error, data } = useQuery(GET_FOLLOWING,{
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const following = data?.viewer?.followList?.edges || [];

  return (
    <div>
      <h1>Following</h1>
      {following.length > 0 ? (
        <div>
          {following.map(({ node }, index) => (
            <div key={index} className='list-element'>
              <img src={profilePic} alt="profile" height={"60px"}/>
              <div>
                <p>
                  <span>{node.following.user.name}</span>
                  <br />
                  <span>{node.following.id}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>0 following.</p>
      )}
    </div>
  );
}

export default Following;
