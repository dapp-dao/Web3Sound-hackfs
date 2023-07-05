import { useQuery } from '@apollo/client'
import React from 'react'
import GET_FOLLOWING from '../gql-queries/get-following';


function Following() {
  const { loading, error, data } = useQuery(GET_FOLLOWING);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const following = data?.viewer?.followList?.edges || [];

  return (
    <div className='following-main'>
      <h1 className='following-title'>Following</h1>
      {following.length > 0 ? (
        <ul>
          {following.map(({ node }, index) => (
            <div className='following-list'>
              <img src='../../public/profilepic.png' alt='profile' className='following-list-image' />
              <div className='following-details'>
                <li key={index}>
                  <span className="name">{node.following.user.name}</span>
                  <br />
                  <span className="id">{node.following.id}</span>
                </li>

              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>0 following.</p>
      )}
    </div>
  );
}

export default Following