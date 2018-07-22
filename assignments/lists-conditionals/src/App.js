import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    string: '',
    count: 0
  }
    
  countChangedHandler = (event) => {
    const string = event.target.value;
    const count = string.split('').length;
    this.setState({ count: count });
  }

  stringChangedHandler = (event) => {
    this.setState({ string: event.target.value });
  }

  stateChange = (event) => {
    this.countChangedHandler(event);
    this.stringChangedHandler(event);
  }

  deleteLetterHandler = (letterIndex) => {
    const letters = this.state.string.split('');
    letters.splice(letterIndex, 1);
    const updatedString = letters.join('');
    this.setState({ string: updatedString })
  }

  render() {
    const letters = (
      <div>
        {  
          this.state.string.split('').map((letter, index) => {
            return <Char 
              click={ () => this.deleteLetterHandler(index) }
              string={ letter } 
              key={ index }
            />
          })
        }
      </div>
    )

    return (
      <div className="App">
        <input type="text" onChange={ this.stateChange } />
        <p>{ this.state.count }</p>
        <Validation count={ this.state.count } />
        { letters }
      </div>
    );
  }
}

export default App;
