import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import data from './sampleData';
import Home from './components/pages/Home';

class App extends React.Component {
  state = {
    boards: []
  }
  componentDidMount()  {
    this.setState({ boards: data.boards});
  }

  render() {
    return (
      <div>
        <Home boards={this.state.boards}/>
      </div>
  );
}
}

export default App;
