import React from 'react'

import Music from '/music.mp3'
import { Media, Player, controls,utils } from 'react-media-player'

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
  } = controls
  const { keyboardControls } = utils
  return (
    <Media>
    {mediaProps => (
      <div
        className="media"
        onKeyDown={keyboardControls.bind(null, mediaProps)}
      >
        <Player src={Music} className="media-player" />
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
  )
}

export default AudioPlayer