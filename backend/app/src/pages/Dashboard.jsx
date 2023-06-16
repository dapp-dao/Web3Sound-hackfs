import { gql, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Dashboard() {
  const history= useHistory();
  const { qData } = useContext(AuthContext);

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if(qData && qData.viewer.user){
        console.log('qdata= ',qData);
        checkIfCreator();
    }
  }, []);

  async function checkIfCreator() {
    const isUserCreator = qData.viewer.user.creator
    console.log('isCreator?', isUserCreator);
    setIsCreator(isUserCreator);
  }

  return (
    <>
     <h2>Welcome back, {qData.viewer.user.name} !</h2>
      {isCreator ? (
        <>
       <button onClick={()=>{
        history.push('/myuploadedaudio')
      }}>My Uploads </button>
       <br/>
       <br/>
       <button>My followers</button>
       <br/>
       <br/>
       </>

      ):(<></>)}
      <button >My playlist</button>
      <br />
      <br/>
      <button>Following</button>
      <br />
      <br/>
      <button onClick={()=>{
        history.push('/searchcreators')
      }}>Follow more</button>
      <br />
      <br/>
      <button onClick={()=>{
        history.push('/audiostore')
      }}>Top Songs</button>
      <br/>
      <br/>
      <button onClick={()=>{
        history.push('/uploadaudio')
      }}>Upload a track</button>
      <br/>
      <br/>
      <button onClick={()=>{
        history.push('/')
        window.location.reload();
      }}>Logout</button>
    </>
  );
}

export default Dashboard;
