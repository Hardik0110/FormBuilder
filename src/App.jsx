import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GeneratedForm from './pages/GeneratedForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generated-form" element={<GeneratedForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App