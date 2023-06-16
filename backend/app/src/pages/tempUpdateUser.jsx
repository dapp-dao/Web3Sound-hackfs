import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';

const USER_UPDATE_QUERY = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      document {
        id
        name
        creator
      }
    }
  }
`;

function TempUpdateUser() {
  const [updateUser, { loading, error }] = useMutation(USER_UPDATE_QUERY);
  const {qData}= useContext(AuthContext);

  const handleUpdateUser = async () => {
    const input = {
      id: qData.viewer.user.id,
      content: {
        creator: true,
      },
    };

    try {
      console.log('Before updating: ',qData.viewer.user.creator)
      const { data } = await updateUser({ variables: { input } });
      console.log('User updated:', data.updateUser.document);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  return (
    <div>
      <button onClick={handleUpdateUser}>Update User</button>
      {loading && <p>Updating user...</p>}
      {error && <p>Error updating user: {error.message}</p>}
    </div>
  );
}

export default TempUpdateUser;
