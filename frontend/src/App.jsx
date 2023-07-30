import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import routes from './config/routes';
import TopSongsPage from './pages/main/TopSongsPage';
import MyUploadsPage from './pages/main/MyUploadsPage';
import FollowingPage from './pages/main/FollowingPage';
import UploadTrackPage from './pages/main/UploadTrackPage';
import FollowMorePage from './pages/main/FollowMorePage';
import AudioPlayerPage from './pages/main/AudioPlayerPage';
import FollowersPage from './pages/main/FollowersPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
            <Route path={routes.HOME} element={<WalletConnect/>}/>
            <Route path= {routes.TOPSONGS} element= {<TopSongsPage/>}/>
            <Route path={routes.MYUPLOADS} element={<MyUploadsPage/>}/>
            <Route path={routes.FOLLOWING} element= {<FollowingPage/>}/>
            <Route path={routes.FOLLOWERS} element={<FollowersPage/>}/>
            <Route path={routes.AUDIOPLAYER} element={<AudioPlayerPage/>}/>
            <Route path={routes.UPLOADTRACK} element={<UploadTrackPage/>}/>
            <Route path={routes.FOLLOWMORE} element={<FollowMorePage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
