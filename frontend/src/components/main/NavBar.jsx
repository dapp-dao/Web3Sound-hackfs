import React, { useState, useContext } from "react";
import { useEffect } from "react";
import logo from "../../assets/cropped-logo.png";
import routes from "../../config/routes";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isCreator, setIsCreator] = useState(true);
  const navigate = useNavigate();

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
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="main logo" height={"80px"} width={"80px"} />
        <span className="logo-text">Web3Sound.</span>
      </div>
      <div className="navbar-elements">
        <p
          onClick={() => {
            navigate(routes.TOPSONGS);
          }}
        >
          Top Songs
        </p>
        {isCreator && (
          <div className="navbar-elements">
            <p
              onClick={() => {
                navigate(routes.MYUPLOADS);
              }}
            >
              My Uploads
            </p>
            <p
              onClick={() => {
                navigate(routes.FOLLOWING);
              }}
            >
              Following
            </p>
          </div>
        )}
        <p  onClick={() => {
                navigate(routes.FOLLOWERS);
              }}>Followers</p>
        <p
          onClick={() => {
            navigate(routes.UPLOADTRACK);
          }}
        >
          Upload Track
        </p>
        <p onClick={()=>{
          navigate(routes.FOLLOWMORE);
        }}>Follow More</p>
      </div>
      
      <button className="button-class">Logout</button>
    </div>
  );
}

export default NavBar;
