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
			return(
				<div key={`bill-${bill.id}`} className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{bill.name}</span>
              <p>{bill.amount}</p>
            </div>
            <div className="card-action">
            	<Link to={`/bills/${bill.id}`}>Show</Link>
            </div>
          </div>
        </div>
			)
		})

		return(
			<div className='row'>
				<h3>{bills}</h3>
			</div>
		)
	}
}

export default Bills;
