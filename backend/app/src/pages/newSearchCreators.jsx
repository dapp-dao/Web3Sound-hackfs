import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
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

const GET_FOLLOWED_USERS_QUERY = gql
    `
  query {
    viewer {
        id
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

const MUTATE_FOLLOW = gql
    `
mutation CreateFollow($input: CreateFollowInput!){
    createFollow(input: $input){
        document{
            following{
                id
            }
            follower{
                id
            }
        }
    }

}
`

function NewSearchCreators() {
    const history = useHistory();
    const { client } = useContext(AuthContext);
    const [nowFollowed, setNowFollowed] = useState([]);
    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS_QUERY, {
        client,
    });

    const { loading: followedUsersLoading, error: followedUsersError, data: followedUsersData } = useQuery(
        GET_FOLLOWED_USERS_QUERY,
        {
            client,
        }
    );

    const [createFollow, { loading: followLoading, error: followError }] = useMutation(MUTATE_FOLLOW);

    const handleFollow = async (userDid) => {
        try {
            await createFollow({
                variables: {
                    input: {
                        content: {
                            following: userDid
                        },
                    },
                },
                context: {
                    client: client,
                },
                onCompleted: (data) => {
                    console.log('Followed creator with did: ', data);
                    console.log('now Followed: ', data.createFollow.document.following.id)
                    setNowFollowed((prevArray) => { [...prevArray, data.createFollow.document.following.id] })
                }
            })
        }
        catch (err) {

        }
    }


    if (usersLoading || followedUsersLoading) {
        return <p>Loading...</p>;
    }
    if (usersError || followedUsersError) {
        return <p>Error: {usersError?.message || followedUsersError?.message}</p>;
    }

    const users = usersData?.userIndex?.edges || [];
    const creatorUsers = users.filter((user) => user.node.creator);
    const followedUsers = followedUsersData?.viewer?.followList?.edges || [];
    const currentId = followedUsersData?.viewer?.id;

    console.log('current Id= ', currentId);


    const isFollowed = (userId) => {
        return followedUsers.some((followedUser) => followedUser.node.following.id === userId);
    };


    return (
        <>
            <h1>Creators</h1>

            {creatorUsers.length > 0 ? (
                <ul>
                    {creatorUsers.map(({ node: user }) => {
                        if (user.did.id === currentId) {
                            return null; // Skip rendering the creator details
                        }
                        return (
                            <li key={user.did.id}>
                                Name: {user.name} - Creator: {user.creator.toString()}
                                <button onClick={() => handleFollow(user.did.id)} disabled={isFollowed(user.did.id) || nowFollowed.includes(user.did.id)}>{isFollowed(user.did.id) || nowFollowed.includes(user.did.id) ? 'Following': 'Follow'}</button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No creator users found.</p>
            )}
            {followLoading && <p>Following...</p>}

            <br />
            <br />
            <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
        </>
    );
}

export default NewSearchCreators;
