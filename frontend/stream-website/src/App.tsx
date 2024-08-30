import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Tvshows from './Components/idk/Tvshows';
import SeasonSelector from './pages/SeasonSelector';
import HomePage from './pages/HomePage';
import Episodes from './Components/idk/Episodes';
import EpisodeSelector from './pages/EpisodeSelector';

const App: React.FC = () => {
  console.log("app")
 return (
  <>
         <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/seasons" element={<SeasonSelector/>} />
            <Route path="/episodes" element={<EpisodeSelector />} />
         </Routes>
      </>

  );
};

export default App;
