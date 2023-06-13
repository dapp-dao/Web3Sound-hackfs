import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const GET_USERS_QUERY = gql`
  query {
    userIndex(first: 10) {
      edges {
        node {
          name
          creator
        }
      }
    }
  }
`;

function SearchCreators() {
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.userIndex?.edges || [];
  const creatorUsers = users.filter((user) => user.node.creator);

  return (
    <>
      <h1>Creators</h1>

      {creatorUsers.length > 0 ? (
        <ul>
          {creatorUsers.map(({ node: user }) => (
            <li key={user.name}>
              Name: {user.name} - Creator: {user.creator.toString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No creator users found.</p>
      )}
    </>
  );
}

export default SearchCreators;

