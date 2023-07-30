import { useQuery } from '@apollo/client';
import React from 'react';
import profilePic from '../../assets/profilepic.png';
import { client } from '../../client-objects/apolloClient';
import GET_FOLLOWERS from '../../gql-queries/get-followers';

function Followers() {
  const { loading, error, data } = useQuery(GET_FOLLOWERS,{
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const followers = data?.node?.following || [];
  console.log('followers: ', followers);

  return (
    <div>
      <h1>followers</h1>
      {/* {followers.length > 0 ? (
        <div>
          {followers.map(({ node }, index) => (
            <div key={index} className='list-element'>
              <img src={profilePic} alt="profile" height={"60px"}/>
              <div>
                <p>
                  <span>{node.followers.user.name}</span>
                  <br />
                  <span>{node.followers.id}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>0 followers.</p>
      )} */}
    </div>
  );
}

export default Followers;
