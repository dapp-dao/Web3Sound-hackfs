import { useState } from 'react';
import './App.css'
import { compose } from './client-objects/composeClient';
import { client } from './client-objects/apolloClient';
import { web3client } from './client-objects/web3Client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import WalletConnect from './pages/WalletConnect';
import AudioStore from './components/AudioStore';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [did, setDid] = useState(null);
  const [parenId, setParentId]= useState(null);
  const [session, setSession]= useState(null);
  const [qData, setQData]= useState(null); //the viewer data object

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthContext.Provider value={{ did, setDid, session, setSession, compose, client, parenId, setParentId, qData, setQData, web3client}}>
          <Routes>
            <Route path='/'element={<WalletConnect/>}/>
            <Route path= '/audiostore' element= {<AudioStore/>}/>
            <Route path='/audioplayer' element={<AudioPlayer/>}/>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
