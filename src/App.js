import React, { Component } from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <Content />
      </>
    );
  }
}

export default App;
