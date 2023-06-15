import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import QueryData from './pages/MyUploadedAudio';
import UploadAudioFile from './pages/UploadAudioFile';
import SearchCreators from './pages/SearchCreators';
import CreateProfile from './pages/CreateProfile';
import MyUploadedAudio from './pages/MyUploadedAudio';
import AudioStore from './pages/AudioStore';
import Dashboard from './pages/Dashboard';

function App() {
  
  const [did, setDid] = useState(null);
  const [parenId, setParentId]= useState(null);
  const [session, setSession]= useState(null);
  return (
      <Switch>
        <AuthContext.Provider value={{ did, setDid, session, setSession, compose, client, parenId, setParentId}}>
        <Route exact path="/" component={WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/myuploadedaudio" component= {MyUploadedAudio}/>
        <Route path= "/uploadaudio" component= {UploadAudioFile}/>
        <Route path="/searchcreators" component={SearchCreators}/>
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/audiostore" component={AudioStore}/>
        <Route path="/dashboard" component={Dashboard}/>
        </AuthContext.Provider>
      </Switch>
  );
}

export default App;
