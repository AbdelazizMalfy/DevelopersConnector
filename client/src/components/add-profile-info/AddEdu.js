import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {addEdu} from '../../actions/profileAction';

class AddEdu extends Component {
    state = {
        school:'',
        degree:'',
        fieldofstudy:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:'',
        disabled: false,
        errors: {}
    }


    onCheck = (e) =>{
        this.setState({
            current : !this.state.current,
            disabled : !this.state.disabled
        })
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newEdu = {
            school:this.state.school,
            degree:this.state.degree,
            fieldofstudy:this.state.fieldofstudy,
            location:this.state.location,
            from:this.state.from,
            to:this.state.to,
            current:this.state.current,
            description:this.state.description,
            disabled: this.state.disabled
        }
        
        this.props.addEdu(newEdu,this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }
  render() {
      const {errors} = this.state;
    return (
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Add Your Education</h1>
                    <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                    <small className="d-block pb-3">* = required field</small>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <input 
                        type="text" 
                        className={classnames("form-control form-control-lg", {
                            'is-invalid':errors.school
                          })}
                        placeholder="* School Or Bootcamp" 
                        name="school"
                        value={this.state.school}
                        onChange={this.onChange}
                        />
                        { errors.school && <div className="invalid-feedback"> {errors.school} </div> }
                        </div>
                        <div className="form-group">
                        <input 
                        type="text" 
                        className={classnames("form-control form-control-lg",{
                            'is-invalid': errors.degree
                        })} 
                        placeholder="* Degree Or Certificate" 
                        name="degree"
                        value={this.state.degree}
                        onChange={this.onChange}
                        />
                        { errors.degree && <div className="invalid-feedback"> {errors.degree} </div> }
                        </div>
                        <div className="form-group">
                        <input 
                        type="text" 
                        className={classnames("form-control form-control-lg",{
                            'is-invalid': errors.fieldofstudy
                        })} 
                        placeholder="* Field Of Study" 
                        name="fieldofstudy"
                        value={this.state.fieldofstudy}
                        onChange={this.onChange} />
                        { errors.fieldofstudy && <div className="invalid-feedback"> {errors.fieldofstudy} </div> }
                        </div>
                        <h6>From Date</h6>
                        <div className="form-group">
                        <input 
                        type="date" 
                        className={classnames("form-control form-control-lg",{
                            'is-invalid': errors.from
                        })} 
                        name="from"
                        value={this.state.from}
                        onChange={this.onChange} />
                        { errors.from && <div className="invalid-feedback"> {errors.from} </div> }
                        </div>
                        <h6>To Date</h6>
                        <div className="form-group">
                        <input 
                        type="date" 
                        className={classnames("form-control form-control-lg",{
                            'is-invalid': errors.to
                        })} 
                        name="to"
                        value={this.state.to}
                        onChange={this.onChange}
                        disabled={this.state.disabled ? 'disabled' : '' } />
                        { errors.to && <div className="invalid-feedback"> {errors.to} </div> }
                        </div>
                        <div className="form-check mb-4">
                        <input 
                        className={classnames("form-check-input",{
                            'is-invalid': errors.current
                        })}
                        type="checkbox"
                        name="current"
                        id="current"
                        value={this.state.to}
                        onChange={this.onCheck} />
                        { errors.current && <div className="invalid-feedback"> {errors.current} </div> }
                        <label className="form-check-label" for="current">
                            Current Job
                        </label>
                        </div>
                        <div className="form-group">
                        <textarea 
                        className={classnames("form-control form-control-lg",{
                            'is-invalid': errors.description
                        })}
                        placeholder="Program Description" 
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}>
                        </textarea>
                        { errors.description && <div className="invalid-feedback"> {errors.description} </div> }
                        <small className="form-text text-muted">Tell us about your experience and what you learned</small>
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    profile:state.profile,
    errors:state.errors
})

export default connect(mapStateToProps , {addEdu})(withRouter(AddEdu));
