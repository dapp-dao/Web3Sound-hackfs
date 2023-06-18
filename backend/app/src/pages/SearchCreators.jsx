import { useQuery, gql, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
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

const GET_FOLLOWED_USERS_QUERY = gql

  `
  query {
    viewer {
      followList(first: 10) {
        edges {
          node {
            following {
              id
            }
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
  const [followedUsers, setFollowedUsers] = useState([]);

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS_QUERY, {
    client,
  });

  const { loading: followedUsersLoading, error: followedUsersError, data: followedUsersData } = useQuery(
    GET_FOLLOWED_USERS_QUERY,
    {
      client,
    }
  );

  const [createFollow] = useMutation(CREATE_FOLLOW_MUTATION);

  const handleFollow = async (userId) => {
    const followedUser = usersData.userIndex.edges.find((user) => user.node.id === userId);
    if (followedUser) {
      const isFollowing = followedUsers.some((user) => user.node.id === followedUser.node.id);
      if (isFollowing) {
        console.log(`Already following creator with ID: ${followedUser.node.id}`);
        return;
      }

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
        setFollowedUsers((prevUsers) => [...prevUsers, followedUser]);
      } catch (error) {
        console.log('Error creating follow:', error);
      }
    }
  };

  if (usersLoading || followedUsersLoading) return <p>Loading...</p>;
  if (usersError || followedUsersError) return <p>Error: {usersError?.message || followedUsersError?.message}</p>;

  const users = usersData?.userIndex?.edges || [];
  const creatorUsers = users.filter((user) => user.node.creator);
  console.log('creatorusers= ', creatorUsers)

  const followedUsersEdges = followedUsersData?.viewer?.followList?.edges || [];
  console.log('followed user: ', followedUsersEdges);

  useEffect(()=>{
    console.log('creatorUsers= ',creatorUsers);
    console.log('followed user= ',followedUsersEdges);
  },[creatorUsers,followedUsersEdges])

  return (
    <>
      <h1>Creators</h1>

      {creatorUsers.length > 0 ? (
        <ul>
          {creatorUsers.map(({ node: user }, index) => {
            const isFollowing = followedUsers.some((followedUser) => followedUser.node.id === user.id);
            return (
              <li key={index}>
                Name: {user.name} - Creator: {user.creator.toString()}
                <button onClick={() => handleFollow(user.id)} disabled={isFollowing}>
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </li>
            );
          })}
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
