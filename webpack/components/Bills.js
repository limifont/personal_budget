import React from 'react';
import { Link } from 'react-router';

class Bills extends React.Component {
	constructor(props) {
		super(props);
		this.state = { bills: [], expenses: 0, food: 0, home: 0, health: 0, recreation: 0, transportation: 0, other: 0, allBills: false }
		this.totalExpenses = this.totalExpenses.bind(this);
	}

	componentWillMount() {

		$.ajax({
			url: `/api/bills`,
			type: 'GET',
			dataType: 'JSON'
		}).done( bills => {
			this.setState({ bills })
			let expenses = this.totalExpenses();
			this.setState( expenses );
		}).fail(data => {
			console.log(data);
		})      
	}

	totalExpenses() {
		let expenses = 0;
		let health = 0;
		let home = 0;
		let recreation = 0;
		let transportation = 0;
		let food = 0;
		this.state.bills.map( bill => {
			expenses += bill.amount;
			if(bill.category === 'Health'){
				health += bill.amount;
			} else if(bill.category === 'Home'){
				home += bill.amount;
			} else if(bill.category === 'Recreation'){
				recreation += bill.amount;
			} else if(bill.category === 'Transportation'){
				transportation += bill.amount;
			} else if(bill.category === 'Food'){
				food += bill.amount;
			}
		})
		return { expenses, health, home, recreation, transportation, food };
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

		$.ajax({
			url: `/api/bills`,
			type: 'POST',
			data: { bill: {name, amount, category, due_date } },
			dataType: 'JSON'
		}).done( bill => { 
			this.setState({
				bills: [ {...bill}, ...this.state.bills ]
			});
			let expenses = this.totalExpenses();
			this.setState( expenses );
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

				<div className="container">
					<div key={`bill-${bill.id}`} className="col s12 m6">
	          <div className="card blue-grey darken-1">
	            <div className="card-content white-text">
	              <span className="card-title">{bill.name}</span>
	              <p>Amount: ${bill.amount}</p>
	              <p>Category: {bill.category}</p>
	            </div>
	            <div className="card-action">
	            	<Link to={`/bills/${bill.id}`}>Show</Link>
	            	<button className="btn red" onClick={() => this.deleteBill(bill.id)}>Delete</button>
	            </div>
	          </div>
	        </div>
	      </div>

			)
		})

		return(
			<div>
				<div className="container">
					<div className="center">
						<p>Your total expenses are: </p>
						<p>${this.state.expenses}</p>
						<div className="row">
							<button className="btn col s12 m6">Food: ${this.state.food}</button>
							<button className="btn col s12 m6">Home: ${this.state.home}</button>
						</div>
						<div className="row">
							<button className="btn col s12 m6">Health: ${this.state.health}</button>
							<button className="btn col s12 m6">Recreation: ${this.state.recreation}</button>
						</div>
						<div className="row">
							<button className="btn col s12 m6">Transportation: ${this.state.transportation}</button>
							<button className="btn col s12 m6">Other: ${this.state.other}</button>
						</div>
					</div>
				</div>
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
