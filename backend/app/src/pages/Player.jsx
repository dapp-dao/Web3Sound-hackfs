import React, { useEffect, useState } from 'react';
import { Media, Player, controls, utils } from 'react-media-player';
import { web3client } from '../client-objects/web3client';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AudioPlayer() {
  const {
    PlayPause,
    CurrentTime,
    Progress,
    SeekBar,
    Duration,
    MuteUnmute,
    Volume,
    Fullscreen,
  } = controls;

  const location = useLocation();
  const { audioId, pg } = location.state;
  const history = useHistory();

  const { keyboardControls } = utils;
  const [path, setPath] = useState('');
  const [exists, setExists] = useState(false);

  async function retrieve(cid) {
    const res = await web3client.get(cid);
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`)
    }
    const files = await res.files();
    const path1 = `https://${files[0].cid}.ipfs.w3s.link/`;
    console.log(path1);
    setPath(path1);
  }

  useEffect(() => {
    console.log('audioId= ', audioId)
    retrieve(audioId);
    if (audioId) {
      setExists(true);
    }
  }, [audioId]);

  return (
    <>
      {exists ? (<>
        <Media>
          {mediaProps => (
            <div
              className="media"
              onKeyDown={keyboardControls.bind(null, mediaProps)}
            >
              <Player src={path} className="media-player" />
              <div className="media-controls">
                <PlayPause />
                <CurrentTime />
                <Progress />
                <SeekBar />
                <Duration />
                <MuteUnmute />
                <Volume />
                <Fullscreen />
              </div>
            </div>
          )}
        </Media>
      </>) : (<><p>Audio file not found!</p></>)}

      <br />
      <br />
      {pg?(<>
      <button onClick={() => {
        history.push('/myuploadedaudio')
      }}>My Uploads</button>
      </>):( <>
      <button onClick={() => {
        history.push('/audiostore')
      }}>Audio List</button>
      </>)}
      
     
      <br />
      <br />
      <button onClick={() => {
        history.push('/dashboard');
      }}>Back to Dashboard</button>
    </>
  );
}

export default AudioPlayer;
