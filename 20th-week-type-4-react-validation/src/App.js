import './App.css';
import React from 'react';
import Table from './components/Table';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Table />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </Router>
  );
}
