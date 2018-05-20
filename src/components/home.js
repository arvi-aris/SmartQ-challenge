import React, { Component } from 'react';
import AppBar from './bar.js';
import AppLanding from './landing.js';

class Home extends Component {
  render() {
    return (
     <div> 
       <AppBar />
       <AppLanding />
     </div>
    );
  }
}

export default Home;
