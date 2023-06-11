import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import MutateData from './pages/MutateData';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import { client } from './client-objects/apolloClient';
import {compose} from './client-objects/composeClient';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [did, setDid] = useState(null);
  var session;
  return (
    <Router>
      <Switch>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, did, setDid, session,compose, client }}>
        <Route exact path="/">
            {isAuthenticated ? <Redirect to="/mutatedata" /> : <WalletConnect />}
          </Route>
          <Route path="/mutatedata">
            {isAuthenticated ? <MutateData /> : <Redirect to="/" />}
          </Route>
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
