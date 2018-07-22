import React from 'react';
import './Char.css';

const char = (props) => {
	return (
		<p 
			className="inline-box" 
			string={ props.string }
			onClick={ props.click }
		>
			{ props.string }
		</p>
	)
}

export default char;