import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { deleteExp } from '../../actions/profileAction';


class ExpDisplay extends Component {

    onDeleteClick(id){
        this.props.deleteExp(id);
    }

  render() {
      const exps = this.props.exps.map(exp => (
        <tr key= {exp._id}> 
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -   
                { exp.to === null ? ' Now' : ( <Moment format="DD/MM/YYYY">  {exp.to}</Moment>) }
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this,exp._id)}>
                    Delete
                </button>
            </td>
        </tr>
      ))
    return (
      <div>
        <h4 className='mb-4'>Experiences</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                {exps}
            </thead>
        </table>
      </div>
    )
  }
}


export default connect(null,{ deleteExp })(ExpDisplay);