import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import QueryData from './pages/QueryData';
import UploadAudioFile from './pages/UploadAudioFile';
import SearchCreators from './pages/SearchCreators';
import CreateProfile from './pages/CreateProfile';
import NavBar from './components/navbar';


function App() {
  
  const [did, setDid] = useState(null);
  const [parenId, setParentId]= useState(null);
  const [session, setSession]= useState(null);
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <AuthContext.Provider value={{ did, setDid, session, setSession, compose, client, parenId, setParentId}}>
        <Route exact path="/" component={WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/querydata" component= {QueryData}/>
        <Route path= "/uploadaudio" component= {UploadAudioFile}/>
        <Route path="/searchcreators" component={SearchCreators}/>
        <Route path="/createprofile" component={CreateProfile} />
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
