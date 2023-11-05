import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { MainPage } from "./components/pages/MainPage"
import { WeatherPage } from "./components/pages/WeatherPage"
import {ToastContainer} from "react-toastify"

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/weather_page" element={<WeatherPage/>} />
          </Routes>
        </div>
          <ToastContainer />
      </Router>
  );
}

export default App;
