import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Display from './components/Display'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="display" element={<Display/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);