import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts , loading } = this.props.post;

        let postContent;
        
        if (posts === null || loading ) {
            postContent = <Spinner />
        } else {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div class="feed">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);