import React from 'react';

const validation = (props) => {
	let count = null;

	if (props.count < 5) {
		count = (
			<div>
				<p>5 character minimum</p>
			</div>
		)
	}

	if (props.count > 50) {
		count = (
			<div>
				<p>50 character maximum</p>
			</div>
		)
	}

	return (
		count 
	)
}

export default validation