import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const GET_USERS_QUERY = gql
`
  query {
    userIndex(first: 10) {
      edges {
        node {
          did
          {
            id
          }
          name
          creator
        }
      }
    }
  }
`;

function SearchCreators() {
  const history= useHistory();
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.userIndex?.edges || [];

  const creatorUsers = users.filter((user) => user.node.creator);

  const handleFollow = (userId) => {
    const followedUser = creatorUsers.find((user) => user.node.id === userId);
    if (followedUser) {
      console.log(`Followed creator with wallet address/did key: ${followedUser.node.did.id}`);
    }
  };

  return (
    <>
      <h1>Creators</h1>

      {creatorUsers.length > 0 ? (
        <ul>
          {creatorUsers.map(({ node: user }, index) => (
            <li key={index}>
              Name: {user.name} - Creator: {user.creator.toString()}
              <button onClick={() => handleFollow(user.id)}>Follow</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No creator users found.</p>
      )}
      <br/>
      <br/>
      <button onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
    </>
  );
}

export default SearchCreators;
