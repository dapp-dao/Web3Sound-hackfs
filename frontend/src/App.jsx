import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import WalletConnect from './pages/WalletConnect';
import AudioPlayer from './components/AudioPlayer';
import routes from './config/routes';
import TopSongsPage from './pages/main/TopSongsPage';
import MyUploadsPage from './pages/main/MyUploadsPage';
import FollowingPage from './pages/main/FollowingPage';
import UploadTrackPage from './pages/main/UploadTrackPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
            <Route path={routes.HOME} element={<WalletConnect/>}/>
            <Route path= {routes.TOPSONGS} element= {<TopSongsPage/>}/>
            <Route path={routes.MYUPLOADS} element={<MyUploadsPage/>}/>
            <Route path={routes.FOLLOWING} element= {<FollowingPage/>}/>
            <Route path={routes.PLAYER} element={<AudioPlayer/>}/>
            <Route path={routes.UPLOADTRACK} element={<UploadTrackPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
