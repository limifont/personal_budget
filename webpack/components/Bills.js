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

	AddNewBill() {

		let name = this.refs.name.value;
		let amount = this.refs.amount.value;
		let due_date = this.refs.dueDate.value;
		let category = this.refs.options.value;
		console.log('hello');
		$.ajax({
			url: `/api/bills`,
			type: 'POST',
			data: { bill: {name, amount, category, due_date } },
			dataType: 'JSON'
		}).done( bill => { 

			this.setState({
				bills: [ {...bill}, ...this.state.bills ]
			});

			this.refs.addBill.reset();

		}).fail( data => {
				debugger
			console.log(data);
		});
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
			<div>
				<form className="container" ref="addBill" onSubmit={() => this.AddNewBill.bind(this)}>
	        <input ref="name" placeholder="Name" required={true}  />
	        <input ref="amount" placeholder="Amount" type="number"/>
	        <input ref="dueDate" placeholder="Due Date" type="date"/>
	        <div class="input-field col s12">
            <select ref="options" className='browser-default' id="addForm">
              <option value="" disabled selected>Choose a category</option>
              <option value="1">Home</option>
              <option value="2">transportation</option>
              <option value="3">Health</option>
              </select>
           </div>
	        <button type="submit" className="btn">Add</button>
	      </form>
				<div className='row'>
					<h3>{bills}</h3>
				</div>
			</div>
		)
	}
}

export default Bills;
