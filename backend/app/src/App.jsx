import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import {useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import UploadAudioFile from './pages/UploadAudioFile';
import CreateProfile from './pages/CreateProfile';
import MyUploadedAudio from './pages/MyUploadedAudio';
import AudioStore from './pages/AudioStore';
import Dashboard from './pages/Dashboard';
import MyFollowers from './pages/MyFollowers';
import newSearchCreators from './pages/newSearchCreators';
import AudioPlayer from './pages/Player'
import { web3client } from './client-objects/web3client';
import Following from './pages/Following';
import './App.css'

function App() {
  const [session, setSession]= useState(null);
  const [qData, setQData]= useState(null); //the viewer data object
  return (
    <div className='App'>
      <Switch>
        <AuthContext.Provider value={{session, setSession, compose, client, qData, setQData, web3client}}>
        <Route path="/" component= {WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/myuploadedaudio" component= {MyUploadedAudio}/>
        <Route path= "/uploadaudio" component= {UploadAudioFile}/>
        <Route path="/searchcreators" component={newSearchCreators}/>
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/audiostore" component={AudioStore}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/myfollowers" component={MyFollowers}/>
        <Route path="/player" component = {AudioPlayer}/>
        <Route path='/myfollowing' component={Following} />
        </AuthContext.Provider>
      </Switch>
      </div>
  );
}

export default App;
