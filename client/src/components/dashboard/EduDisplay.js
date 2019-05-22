import React, { Component } from 'react';
import {connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEdu } from '../../actions/profileAction'; 

class EduDisplay extends Component {

    onDeleteClick(id) {
        this.props.deleteEdu(id);
    }

  render() {
    const edus = this.props.edus.map( edu => (
        <tr key={edu._id} > 
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -  
                { edu.to === null ? ' Now' : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>) }
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this,edu._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ))


    return (
      <div>
        <h4 className='mb-4'>Education</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                {edus}
            </thead>
        </table>
      </div>
    )
  }
}

export default connect(null,{ deleteEdu })(EduDisplay); 