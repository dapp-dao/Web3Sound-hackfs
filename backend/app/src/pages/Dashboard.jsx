import { gql, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GET_USERS_QUERY = gql`
  query {
    userIndex(first: 10) {
      edges {
        node {
          did {
            id
          }
          name
          creator
        }
      }
    }
  }
`;

function Dashboard() {
  const history= useHistory();
  const { session, client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    client,
  });

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (!loading && !error && data) {
      checkIfCreator();
    }
  }, [loading, error, data]);

  async function checkIfCreator() {
    const userID = session.did._parentId;
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    const users = data?.userIndex?.edges || [];

    const creator = users.filter((user) => user.node.did.id === userID && user.node.creator === true);
    const isUserCreator = creator.length > 0;
    console.log('isCreator?', isUserCreator);
    setIsCreator(isUserCreator);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isCreator ? (
        <>
       <button>My Uploads</button>
       <br/>
       <br/>
       <button>My followers</button>
       <br/>
       <br/>
       </>

      ):(<></>)}
      <button>My playlist</button>
      <br />
      <br/>
      <button>Following</button>
      <br />
      <br/>
      <button>Follow more</button>
      <br />
      <br/>
      <button>Top Songs</button>
      <br/>
      <br/>
      <button>Upload a track</button>
      <br/>
      <br/>
      <button onClick={()=>{
        history.push('/')
        window.location.reload();
      }}>Logout</button>
    </>
  );
}

export default Dashboard;

