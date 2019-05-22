import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { getCurrentProfile , deleteAccount } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileSettings from './ProfileSettings';
import ExpDisplay from './ExpDisplay';
import EduDisplay from './EduDisplay';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick = (e) => {
      this.props.deleteAccount();
    }

  render() {
    
    const {user} = this.props.auth;
    const {profile , loading} = this.props.profile;

    let dashboardContent ;

    if (profile === null || loading) {
      dashboardContent = <Spinner/>;
    }else{
      // Check if logged in user has profile
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}
          </Link>
          </p>
          <ProfileSettings />
          <ExpDisplay exps={profile.experience} />
          <EduDisplay edus={profile.education} />
          <div style={{ marginBottom:'60px' }} />
          <button onClick={this.onDeleteClick} className='btn btn-danger'>Delete My Account </button>
          </div>
        )
      } else {
        // Logged in user has no profile 
        dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p> You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
        )
      }
    }


    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>

        {}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

export default  connect(mapStateToProps,{getCurrentProfile , deleteAccount})(Dashboard);