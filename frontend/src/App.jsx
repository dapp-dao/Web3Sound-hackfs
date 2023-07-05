import { useState } from 'react';
import './App.css'
import { compose } from './client-objects/composeClient';
import { client } from './client-objects/apolloClient';
import { web3client } from './client-objects/web3Client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import WalletConnect from './pages/WalletConnect';
import AudioPlayer from './components/AudioPlayer';
import NavBar from './components/NavBar';
import routes from './config/routes';
import AudioStorePage from './pages/main/AudioStorePage';

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
            <Route path={routes.HOME} element={<WalletConnect/>}/>
            <Route path= {routes.AUDIOSTORE} element= {<AudioStorePage/>}/>
            <Route path={routes.PLAYER} element={<AudioPlayer/>}/>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
