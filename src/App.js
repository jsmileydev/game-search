import React from 'react';
import Header from './components/header/header';
import ChickenCoop from './components/api';
import Footer from './components/footer/footer';
import './App.scss';
import 'normalize.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ChickenCoop />
      <Footer />
    </div>
  );
}

export default App;
