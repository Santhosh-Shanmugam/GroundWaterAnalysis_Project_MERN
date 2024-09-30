import React from 'react';
import WaterLevelChecker from '../src/Pages/WaterLevelChecker';
import Navbar from './Components/Navbar';
const App = () => {
  return (

    <div className='w-[85%] m-auto bg-white'>
      <Navbar />
      <WaterLevelChecker />
    </div>
  );
};

export default App;
