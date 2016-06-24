import React from 'react';
import { Link } from 'react-router';

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bill: null, edit: false };
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentWillMount() {
   $.ajax({
    url: '/api/bills/${this.props.params.id}',
    type: 'GET',
    dataType: 'JSON'
   }).done( bill => {
    this.setState({ bill })
   }).fail( data => {
    console.log(data);
   })     
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  handleEdit(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let amount = this.refs.amount.value;
    let categroy = this.refs.categroy.value;
    let due_date = this.refs.dueDate.value;

    $.ajax({
      url: `/api/bills/${this.state.bill.id}`,
      type: 'PUT',
      data: { bill: { name, amount, category, due_date }},
      dataType: 'JSON'
    }).done( bill => {
      this.setState({ bill, edit: false })
    }).fail( data => {
      console.log(data);
    });
  }


  render() {
    if(this.state.edit){
      return(
        <div className="container">
          <h3>Edit Bill: {this.state.bill.name}</h3>
          <form onSubmit={this.handleEdit.bind(this)}>
            <input ref="name" type='text' placeholder='Name' defaultValue={this.state.bill.name} />
            <input ref="amount" type='text' placeholder='Amount' defaultValue={this.state.bill.amount} />
            <input ref="category" type='text' placeholder='Category' defaultValue={this.state.bill.category} />
            <input ref="dueDate" type='text' placeholder='Description' defaultValue={this.state.bill.due_date} />
            <input type="submit" value="Update Bill" className="btn" />
            <button type="button" onClick={this.toggleEdit} className="btn grey">Cancel</button>
          </form>
        </div>
      );
    } else {
      if(this.state.bill) {
        return(
          <div className="container">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{this.state.bill.name}</span>
                  <div>
                    <label>Amount:</label>
                    <p>${this.state.bill.amount}</p>
                    <label>Category:</label>
                    <p>{this.state.bill.category}</p>
                    <label>Due Date:</label>
                    <p>{this.state.bill.due_date}</p>
                  </div>
                </div>
                <div className="card-action">
                <Link to='/'>All Bills</Link>
                <button className="btn" onClick={this.toggleEdit}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <h3 className="center">Bill Not Loaded...</h3>
        ) 
      }
    }  
  }
}

export default Bill;
