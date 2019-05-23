import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import classnames from 'classnames';

 class PostForm extends Component {
     state = {
         text:'',
         errors: {}
     }

     onChange = (e) => {
         this.setState({[e.target.name] : e.target.value })
     }

     
    componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
    }
    

     onSubmit = (e) => {
         e.preventDefault();
        
        const { user } = this.props.auth 
        
        const newPost = {
             text: this.state.text,
             name: user.name,
             avatar: user.avatar
        }

        this.props.addPost(newPost);
        this.setState({text: ''});

     }



    render() {
        const {errors} = this.state;
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="post-form mb-3">
                            <div className="card card-info">
                                <div className="card-header bg-info text-white">
                                    Say Somthing...
                                </div>
                                    <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                            <textarea 
                                            className={classnames("form-control form-control-lg", { 
                                                'is-invalid' : errors.text 
                                            })} placeholder="Create a post"
                                            name="text"
                                            value={this.state.text}
                                            onChange = {this.onChange}/>
                                            { errors.text && ( <div className="invalid-feedback">{errors.text}</div>)}
                                            </div>
                                            <button type="submit" className="btn btn-dark">Submit</button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addPost })(PostForm);