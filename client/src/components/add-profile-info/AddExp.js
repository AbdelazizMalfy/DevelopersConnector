import React, { Component } from 'react'
import { Link , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {addExp} from '../../actions/profileAction';

class AddExp extends Component {
    state = {
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current: false,
        description:'',
        errors: {},
        disabled: false
    }


    onSubmit = (e) => {
        e.preventDefault();

        const newExp = {
            company: this.state.company,
            title:this.state.title,
            location:this.state.location,
            from:this.state.from,
            to:this.state.to,
            current: this.state.current,
            description:this.state.description,
        }

        this.props.addExp(newExp,this.props.history);
    }

    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    onCheck = (e) =>{
        this.setState({
            current : !this.state.current,
            disabled : !this.state.disabled
        })
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }

  render() {
    const {errors} = this.state

    return (
    <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard\" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="* Job Title" 
                  name="title" 
                  value= { this.state.title } 
                  onChange = {this.onChange} />
                  { errors.title && ( <div className="invalid-feedback">{errors.title}</div>)}
                </div>
                <div className="form-group">
                  <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="* Company" 
                  name="company" 
                  value= { this.state.company }
                  onChange = {this.onChange} />
                  { errors.company && ( <div className="invalid-feedback">{errors.company}</div>)}
                </div>
                <div className="form-group">
                  <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="Location" 
                  name="location"
                  value= { this.state.location } 
                  onChange = {this.onChange} />
                  { errors.location && ( <div className="invalid-feedback">{errors.location}</div>)}
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  name="from"
                  value= { this.state.from } 
                  onChange = {this.onChange} />
                  { errors.from && ( <div className="invalid-feedback">{errors.from}</div>)}
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  name="to"
                  value= { this.state.to } 
                  onChange = {this.onChange}
                  disabled={this.state.disabled ? 'disabled' : '' }/>
                  { errors.to && ( <div className="invalid-feedback">{errors.to}</div>)}
                </div>
                <div className="form-check mb-4">
                  <input 
                  className="form-check-input" 
                  type="checkbox" 
                  name="current" 
                  id="current"
                  value= { this.state.current } 
                  onChange = {this.onCheck} />
                  { errors.current && ( <div className="invalid-feedback">{errors.current}</div>)}
                  <label className="form-check-label" for="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <textarea 
                  className="form-control form-control-lg" 
                  placeholder="Job Description" 
                  name="description" 
                  value= { this.state.description } 
                  onChange = {this.onChange}>
                  </textarea>
                  { errors.description && ( <div className="invalid-feedback">{errors.description}
                  </div>)}
                  <small className="form-text text-muted">Some of your responsabilities, etc</small>
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
    profile: state.profile,
    errors: state.errors

})

export default connect(mapStateToProps, {addExp})(withRouter(AddExp));
