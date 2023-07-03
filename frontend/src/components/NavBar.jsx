import React, {useState, useContext} from 'react'
import { useEffect } from 'react';


function NavBar() {
  const { qData } = useContext(AuthContext);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(()=>{
    if(qData && qData.viewer.user){
      checkIfCreator();
    }
  })

  const checkIfCreator=()=>{
    const val= qData.viewer.user.creator;
    setIsCreator(val);
  }
  return (
    <div>
        <div>Top Songs</div>
        {isCreator && (
          <div>
          <div>My Uploads</div>
          <div>Following</div>
          </div>
        )
        }
        <div>Followers</div>
        <div>Upload Track</div>
        <div>Follow More</div>
        
    </div>
  )
}

export default NavBar