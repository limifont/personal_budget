import React from 'react';
import { Link } from 'react-router';

class Bills extends React.Component {
	constructor(props) {
		super(props);
		this.state = { bills: [] }
	}

	componentWillMount() {

		$.ajax({
			url: `/api/bills`,
			type: 'GET',
			dataType: 'JSON'
		}).done ( bills => {
			this.setState({ bills });
   		console.log(this.state.bills)
		}).fail (data => {
			console.log(data);
		})
	      
	}

	render() {
		let bills = this.state.bills.map( bill => {
			return (
   			<div>{bill.name}</div>
   		)
		})

		return(
			<h3>{bills}</h3>
		)
	}
}

export default Bills;
