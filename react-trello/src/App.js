import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Board from './components/Board';
import data from './sampleData';

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
        {this.state.boards.map(board => (
          <div key={board.id}>
            <span>{board.id}</span>
            <h3>{board.title}</h3>
            <p>{board.background}</p>
          </div>

        ))}
      </div>
  );
}
}

export default App;
