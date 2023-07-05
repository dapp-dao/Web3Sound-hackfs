import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

function LikeButton() {
    const [liked, setLiked]= useState(true)
  return (
    <div>
        {liked? (
            <FontAwesomeIcon size='xl' color='#fb5789' icon={faHeartSolid}/>
        ): (
            <FontAwesomeIcon color='#FFFFFF' icon={faHeartRegular}/>
        )}
    </div>
  )
}

export default LikeButton