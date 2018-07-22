import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
	constructor(props) {
    super(props);
		console.log('[Persons.js] inside constructor', props);
		this.lastPersonRef = React.createRef();
  }

	componentWillMount() {
    console.log('[Persons.js] inside componentWillMount');
  }
  
  componentDidMount() {
		console.log('[Persons.js] inside componentDidMount');
		this.lastPersonRef.current.focus();
	}
	
	componentWillReceiveProps(nextProps) {
		console.log('[UPDATE Persons.js] Inside componentWillRecieveProps', nextProps);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
		return nextProps.persons !== this.props.persons ||
		nextProps.changed !== this.props.changed ||
		nextProps.clicked !== this.props.clicked;
		// return true;
	}
	
	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[UPDATE Persons.js] Inside compononentDidUpdate');
	}

	render() {
		console.log('[Persons.js] inside componentDidMount');

		return this.props.persons.map((person, index) => {
			return <Person 
				name={ person.name } 
				age={ person.age } 
				key={ person.id }
				ref={ this.lastPersonRef }
				position={ index }
				click={ () => this.props.clicked(index) }  
				changed={ (event) => this.props.changed(event, person.id) }
			/>
		}) 
	}
}
export default Persons;