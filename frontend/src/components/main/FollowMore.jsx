import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { client } from "../../client-objects/apolloClient";
import profilePic from "../../assets/profilepic.png";
import GET_FOLLOWING from "../../gql-queries/get-following";
import GET_ALL_USERS from "../../gql-queries/get-all-users";
import MUTATE_FOLLOW from "../../gql-mutations/mutate-follow";


function FollowMore() {
  const [newFollowed, setNewFollowed] = useState("");
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_ALL_USERS, {
    client,
  });

  const {
    loading: followedUsersLoading,
    error: followedUsersError,
    data: followedUsersData,
  } = useQuery(GET_FOLLOWING, {
    client,
  });

  const [createFollow, { loading: followLoading, error: followError }] =
    useMutation(MUTATE_FOLLOW, {
      client,
    });

  const handleFollow = async (userDid) => {
    try {
      await createFollow({
        variables: {
          input: {
            content: {
              following: userDid,
            },
          },
        },
        context: {
          client: client,
        },
        onCompleted: (data) => {
          console.log("Followed creator with did: ", data);
          console.log(
            "now Followed: ",
            data.createFollow.document.following.id
          );
          setNewFollowed(data.createFollow.document.following.id);
        },
      });
    } catch (err) {}
  };

  if (usersLoading || followedUsersLoading) {
    return <p>Loading...</p>;
  }
  if (usersError || followedUsersError) {
    return <p>Error: {usersError?.message || followedUsersError?.message}</p>;
  }

  const users = usersData?.userIndex?.edges || [];
  const creatorUsers = users.filter((user) => user.node.creator);
  const followedUsers = followedUsersData?.viewer?.followList?.edges || [];

  const isFollowed = (userId) => {
    return followedUsers.some(
      (followedUser) => followedUser.node.following.id === userId
    );
  };

  return (
    <>
      <h1>Creators</h1>
      {creatorUsers.length > 0 ? (
        <div>
          {creatorUsers.map(({ node: user }, index) => {
            if (user.did.id === followedUsersData?.viewer?.id) {
              return null;
            }
            return (
              <div key={index} className="list-element">
                <img src={profilePic} alt="profile" height={"60px"} />
                <div>
                  <p>
                    <span>{user.name}</span>
                    <button
                      onClick={() => handleFollow(user.did.id)}
                      disabled={
                        isFollowed(user.did.id) ||
                        (newFollowed && newFollowed === user.did.id)
                      }
                    >
                      {isFollowed(user.did.id) ||
                      (newFollowed && newFollowed === user.did.id) ? (
                        <span>Following</span>
                      ) : (
                        <span>Follow</span>
                      )}
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No creators found.</p>
      )}
      {followLoading && <p>Following...</p>}
    </>
  );
}

export default FollowMore;
