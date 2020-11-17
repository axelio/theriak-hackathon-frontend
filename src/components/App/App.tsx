import React from 'react';

import './App.css';
import Content from '../Content/Content';
import Header from '../Header/Header';


const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );

}

export default App;
