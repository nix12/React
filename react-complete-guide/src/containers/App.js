import React, { PureComponent } from 'react';
import classes from './App.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/aux';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  // state = {
  //   persons: [
  //     { id: 'adfs', name: 'Max', age: 28 },
  //     { id: 'qewr', name: 'Manu', age: 29 },
  //     { id: 'zcxv', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  constructor(props) {
    super(props);
    console.log('[App.js] inside constructor', props);
    this.state = {
      persons: [
        { id: 'adfs', name: 'Max', age: 28 },
        { id: 'qewr', name: 'Manu', age: 29 },
        { id: 'zcxv', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggledClicked: 0,
      authenticated: false
    }
  }

  componentWillMount() {
    console.log('[App.js] inside componentWillMount');
  }
  
  componentDidMount() {
    console.log('[App.js] inside componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.showPersons !== this.state.showPersons ||
  //   nextState.persons !== this.state.persons
	// }
	
	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[UPDATE App.js] Inside compononentDidUpdate');
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);
    
    return prevState;
  }
  
  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');
  }


  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    // const person = Object.assign({}, this.state.persons[findIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState({ persons });
  }
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => { 
      return { 
        showPersons: !doesShow, 
        toggledClicked: prevState.toggledClicked + 1 
      }
    })
  }

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
  }
  
  render() {
    console.log('[App.js] inside render')

    let persons = null;
    let btnClass = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={ this.state.persons } 
            clicked={ this.deletePersonsHandler }
            changed={ this.nameChangedHandler }
          />
        </div>
      );

      btnClass = classes.Red;
    }
    
    return (
      <Aux>
        <button onClick={ () => { this.setState({ showPersons: true }) } }>
          Show Persons
        </button>
        <Cockpit 
          showPersons={ this.state.showPersons }
          persons={ this.state.persons }
          clicked={ this.togglePersonsHandler }
          login={ this.loginHandler }
        />
        <AuthContext.Provider value={ this.state.authenticated }>
          { persons }
        </AuthContext.Provider>
        { persons }
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
