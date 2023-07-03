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
    const[newFollowed, setNewFollowed]=useState('');
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
                    setNewFollowed(data.createFollow.document.following.id);
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
            <h1 className='creator-title'>Creators</h1>

            {creatorUsers.length > 0 ? (
                <ul>
                    {creatorUsers.map(({ node: user }) => {
                        if (user.did.id === currentId) {
                            return null;
                        }
                        return (
                            <div className='creator-list'>
                            <img src='../../public/profilepic.png' alt='profile' className='creator-list-image' />
                            <div className='creator-details'>
                            <li key={user.did.id}>
                                <span className="creator-name">{user.name}</span>
                                <br />
                                <span className="creator-id">{user.did.id}</span>
                                <span> -- </span>
                                
                                <button onClick={() => handleFollow(user.did.id)} disabled={isFollowed(user.did.id) ||newFollowed && newFollowed===user.did.id}>{isFollowed(user.did.id) || newFollowed && newFollowed===user.did.id ? <span>Following</span>: <span>Follow</span>}</button>
                               
                            </li>
                            </div>
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <p>No creator users found.</p>
            )}
            {followLoading && <p>Following...</p>}

            <br />
            <br />
            <button className='creator-button' onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
            <br/>
            <br/>
        </>
    );
}

export default NewSearchCreators;
