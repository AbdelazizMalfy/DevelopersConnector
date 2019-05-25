import React, { Component } from 'react';
import isEmpty from '../../validation/is-Empty';
import Moment from 'react-moment';


class ProfileCreds extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    
                        
                        {profile.experience.map( exp => (
                            <ul key={exp._id} className="list-group">
                            <li className="list-group-item">
                            {isEmpty(exp.company) ? 'null' : <h4>{exp.company}</h4> }
                            <p><Moment format="DD/MM/YYYY">{exp.from}</Moment> -  
                                { exp.to === null ? ' Now' : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>) }</p>
                                <hr/>
                         {isEmpty(exp.title) ? null : <p><strong>Position:   </strong> {exp.title} </p>}

                         {isEmpty(exp.description) ? null : <p> <strong>Description: </strong>{exp.description}</p> }
                        </li>
                        </ul>
                         ) )}
                        
                   
                    </div>
                    <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    { profile.education.map( edu => (
                        <ul key={edu._id} className="list-group">
                            <li className="list-group-item">
                            <h4>{edu.school}</h4>
                            <p><Moment format="DD/MM/YYYY">{edu.from}</Moment> -  
                                { edu.to === null ? ' Now' : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>) }</p>
                                <hr/>
                            <p>
                                <strong>Degree: </strong>{edu.degree}</p>
                            <p>
                                <strong>Field Of Study: </strong>{edu.fieldofstudy}
                            </p>
                            { isEmpty(edu.description) ? null : (
                            <p>
                                <strong>Description:</strong> {edu.description}
                            </p>
                            )}
                        </li>
                    </ul>
                    )) }
                    
                </div>
            </div>

        )
    }
}

export default ProfileCreds;