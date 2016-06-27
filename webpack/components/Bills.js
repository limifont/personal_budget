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
		}).fail (data => {
			console.log(data);
		})
	      
	}

	deleteBill(id) {
		console.log(id);

		$.ajax({
			url: `/api/bills/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done ( bill => {
			let bills = this.state.bills;
			let index = bills.findIndex(x => x.id === id);
			this.setState({
				bills: [
					...bills.slice(0, index),
					...bills.slice(index + 1, bills.length )
				]
			});

		}).fail (data => {
			console.log(data);
		})
	}

	addNewBill(e) {
		e.preventDefault();
		let name = this.refs.name.value;
		let amount = this.refs.amount.value;
		let due_date = this.refs.dueDate.value;
		let category = this.refs.category.value;

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
			console.log(data);
		});
	}

	showResult(value){
		console.log(value);
	}

	render() {
		let bills = this.state.bills.map( bill => {
			return(
				<div key={`bill-${bill.id}`} className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{bill.name}</span>
              <p>{bill.amount}</p>
              <p>{bill.category}</p>
            </div>
            <div className="card-action">
            	<Link to={`/bills/${bill.id}`}>Show</Link>
            	<button className="btn red" onClick={() => this.deleteBill(bill.id)}>Delete</button>
            </div>
          </div>
        </div>
			)
		})

		return(
			<div>
				<form>
					<input type="text" size="30" placeholder="Search Bills" onkeyup="showResult(this.value)" />
					<div id="livesearch"></div>
				</form>
				<br/>
				<form className="container" ref="addBill" onSubmit={this.addNewBill.bind(this)}>
	        <input ref="name" placeholder="Name" required={true}  />
	        <input ref="amount" placeholder="Amount" type="number"/>
	        <input ref="dueDate" placeholder="Due Date" type="date"/>
	        <input ref="category" placeholder="Category" type="text"/>
	        <input type="submit" className="btn"/>
	      </form>
				<div className='row'>
					<h3>{bills}</h3>
				</div>
			</div>
		)
	}
}

export default Bills;
