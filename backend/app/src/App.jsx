import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import UploadAudioFile from './pages/UploadAudioFile';
import SearchCreators from './pages/SearchCreators';
import CreateProfile from './pages/CreateProfile';
import MyUploadedAudio from './pages/MyUploadedAudio';
import AudioStore from './pages/AudioStore';
import Dashboard from './pages/Dashboard';
import TempUpdateUser from './pages/tempUpdateUser';
import MyFollowers from './pages/MyFollowers';
import newSearchCreators from './pages/newSearchCreators';
import AudioPlayer from './pages/Player'
import { web3client } from './client-objects/web3client';
import Following from './pages/Following';

function App() {
  
  const [did, setDid] = useState(null);
  const [parenId, setParentId]= useState(null);
  const [session, setSession]= useState(null);
  const [qData, setQData]= useState(null); //the viewer data object
  return (
    <div>
      <Switch>
        <AuthContext.Provider value={{ did, setDid, session, setSession, compose, client, parenId, setParentId, qData, setQData, web3client}}>
        <Route exact path="/" component={WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/myuploadedaudio" component= {MyUploadedAudio}/>
        <Route path= "/uploadaudio" component= {UploadAudioFile}/>
        <Route path="/searchcreators" component={newSearchCreators}/>
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/audiostore" component={AudioStore}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/tempupdate" component={TempUpdateUser}/>
        <Route path="/myfollowers" component={MyFollowers}/>
        <Route path="/player" component = {AudioPlayer}/>
        <Route path='/myfollowing' component={Following} />
        </AuthContext.Provider>
      </Switch>
      </div>
  );
}

export default App;
