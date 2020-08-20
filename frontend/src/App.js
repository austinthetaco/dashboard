import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools'
import './App.css';
import Layout from './Layout';

function App() {
  return (
    <Router>
    <div className="App">
      <Layout />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
    </Router>
  );
}

export default App;
