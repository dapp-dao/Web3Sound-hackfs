import React, { useState, useContext } from "react";
import { useEffect } from "react";
import logo from "../assets/cropped-logo.png";
import LikeButton from "./common/LikeButton";

function NavBar() {
  const [isCreator, setIsCreator] = useState(true);


  // useEffect(()=>{
  //   if(qData && qData.viewer.user){
  //     checkIfCreator();
  //   }
  // })

  // const checkIfCreator=()=>{
  //   const val= qData.viewer.user.creator;
  //   setIsCreator(val);
  // }
  return (
    <div className="navbar" >
      <div className="logo">
        <img src={logo} alt="main logo" height={'80px'} width={'80px'}/>
        <span className="logo-text">Web3Sound.</span>
        </div>
      <div className="navbar-elements">
      <a href="/">Top Songs</a>
      {isCreator && (
        <div className="navbar-elements">
          <a href="/">My Uploads</a>
          <a href="/">Following</a>
        </div>
      )}
      <a href="/">Followers</a>
      <a href="/">Upload Track</a>
      <a href="/">Follow More</a>
      </div>
        <button className="button-class">Logout</button>
    </div>

  );
}

export default NavBar;
