import React, { Component } from 'react';
import Movies from './component/movies';
import Slider from './component/slider';

class App extends Component {
  render() {
    return (
      <div>    
        
        <Slider></Slider>
        <Movies></Movies>


      </div>
    );
  }
}

export default App;
