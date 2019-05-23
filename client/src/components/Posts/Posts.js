import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component {
    render() {
        return (
            <div>
                <PostForm />
            </div>
        )
    }
}

export default connect(null)(Posts);