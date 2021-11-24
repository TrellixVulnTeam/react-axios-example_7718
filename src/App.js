import logo from './logo.svg';
import './style.scss';
import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }
  
  triggerDelete(index){
    this.setState(prevState => ({
      persons: [...prevState.persons.slice(0, index), ...prevState.persons.slice(index + 1)]
     }))
  }

  
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          { this.state.persons.map((person,index) => 
          <div className="col-lg-3 col-md-3 col-6 boxed" data-id={person.id}>
            <div className="item">
              <div className="name">
                <div><i className="ri-user-fill"></i> <span>{person.name}</span></div>
                <em>{person.company.name}</em>
              </div>
              <div className="email">
                <i className="ri-mail-fill"></i> <span>{person.email}</span>
              </div>
              <div className="telephone">
                <i className="ri-phone-fill"></i> <span>{person.phone}</span>
              </div>
              <div className="button mt-3">
                <button onClick={(e)=>{
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.triggerDelete(index);
                                        }} className="btn btn-danger d-flex align-items-center"><i className="ri-delete-bin-line"></i> Remove</button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}
