import React, { useEffect, useState } from 'react';
import { Media, Player, controls, utils } from 'react-media-player';
import web3client from '../../client-objects/web3Client';
import { useLocation } from 'react-router-dom';

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
  const { audioId, pg, name } = location.state;

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
    <div>
      {exists ? (<>
        <Media>
          {mediaProps => (
            <div
              onKeyDown={keyboardControls.bind(null, mediaProps)}>
              <Player src={path}/>
              <div>
                <div>{name}</div>
                <div className='cover-image'>
                <img src='../../public/cover.jpg' alt='Cover' />
                </div>
                <div >
                <CurrentTime />
                <SeekBar />
                <Duration />
                </div>
                <PlayPause />
                <div>
                <MuteUnmute />
                <Volume />
                </div>
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          )}
        </Media>
      </>) : (<><p>Audio file not found!</p></>)}

    </div>
  );
}

export default AudioPlayer;