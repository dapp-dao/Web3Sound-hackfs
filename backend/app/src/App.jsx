import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import QueryData from './pages/QueryData';

function App() {
  
  const [did, setDid] = useState(null);
  var session;
  return (
      <Switch>
        <AuthContext.Provider value={{ did, setDid, session,compose, client }}>
        <Route exact path="/" component={WalletConnect} />
        <Route path="/mutatedata" component={MutateData} />
        <Route path= "/querydata" component= {QueryData}/>
        </AuthContext.Provider>
      </Switch>
  );
}

export default App;
