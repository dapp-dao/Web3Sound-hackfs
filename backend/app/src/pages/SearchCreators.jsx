import { useQuery, useMutation, gql } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const GET_USERS_QUERY = gql
`
  query {
    userIndex(first: 10) {
      edges {
        node {
          id
          name
          creator
          did {
            id
          }
        }
      }
    }
  }
`;

const CREATE_FOLLOW_MUTATION = gql
`
  mutation CreateFollow($input: CreateFollowInput!) {
    createFollow(input: $input) {
      document {
        id
      }
    }
  }
`;

function SearchCreators() {
  const history = useHistory();
  const { client } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    client,
  });

  const [createFollow] = useMutation(CREATE_FOLLOW_MUTATION);

  const handleFollow = async (userId) => {
    const followedUser = data.userIndex.edges.find((user) => user.node.id === userId);
    if (followedUser) {
      try {
        await createFollow({
          variables: {
            input: {
              content: {
                following: followedUser.node.did.id,
              },
            },
          },
        });
        console.log(`Successfully followed creator with ID: ${followedUser.node.id}`);
      } catch (error) {
        console.log('Error creating follow:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.userIndex?.edges || [];
  const creatorUsers = users.filter((user) => user.node.creator);

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
      <br />
      <br />
      <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
    </>
  );
}

export default SearchCreators;
