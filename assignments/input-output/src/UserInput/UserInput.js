import React from 'react';
import './UserInput.css';

const userInput = (props) => {
	return (
		<input 
			type="text" 
			onChange={ props.changed } 
			value={ props.username } 
			className="UserInput"
		/>
	)
}

export default userInput;