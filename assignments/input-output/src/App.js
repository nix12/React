import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    usernames: [
      { username: 'testUser' },
      { username: 'exampleUser' }
    ]
  }

  usernameChangeHandler = (event) => {
    this.setState({
      usernames: [
        { username: event.target.value },
        { username: event.target.value }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <UserInput changed={ this.usernameChangeHandler } />
        <UserOutput username={ this.state.usernames[0].username } />
        <UserOutput username={ this.state.usernames[1].username } />
      </div>
    );
  }
}

export default App;
