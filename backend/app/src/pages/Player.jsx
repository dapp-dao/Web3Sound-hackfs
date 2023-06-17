import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import Music from '/music.mp3'
function Player() {
  return (
    <div className="flex flex-col bg-blue w-screen h-screen items-center mt-20">AudioPlayer
    <AudioPlayer 
     autoPlay
    src={Music}
    layout="horizontal"
    onPlay={() => console.log("onPlay")}
    />
    </div>
  )
}

export default Player