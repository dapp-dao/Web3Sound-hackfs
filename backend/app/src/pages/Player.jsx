import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import Music from '/music.mp3'
function Player() {
  return (
    <div>AudioPlayer
    <AudioPlayer
     autoPlay
    src={Music}
    onPlay={() => console.log("onPlay")}
    />
    </div>
  )
}

export default Player