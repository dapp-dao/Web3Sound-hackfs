// App.tsx
import React, { useState } from 'react';
import Navbar from './navbar';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  }

  return (
    <div>
      <Navbar />
      <div style={{
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid limegreen',
        padding: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        borderRadius: '4px',
        height: '300px',
        width: '450px', 
      }}>
        <p>Hello, this is your centered div with slime green border!</p>
        
        <div style={{position: 'absolute', bottom: '10px', width: '100%'}}>
          <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
          <input type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
