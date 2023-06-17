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
import NewAudioList from './pages/newMyAudio';
import TempUpdateUser from './pages/tempUpdateUser';
import MyFollowers from './pages/MyFollowers';
import Player from './pages/Player'

function App() {
  
  const [did, setDid] = useState(null);
  const [parenId, setParentId]= useState(null);
  const [session, setSession]= useState(null);
  const [qData, setQData]= useState(null); //the viewer data object
  return (
      <Switch>
        <AuthContext.Provider value={{ did, setDid, session, setSession, compose, client, parenId, setParentId, qData, setQData}}>
        <Route exact path="/" component={WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/myuploadedaudio" component= {MyUploadedAudio}/>
        <Route path= "/uploadaudio" component= {UploadAudioFile}/>
        <Route path="/searchcreators" component={SearchCreators}/>
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/audiostore" component={AudioStore}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/newaudio" component={NewAudioList}/>
        <Route path="/tempupdate" component={TempUpdateUser}/>
        <Route path="/myfollowers" component={MyFollowers}/>
        <Route path="/player" component = {Player}/>
        </AuthContext.Provider>
      </Switch>
  );
}

export default App;
