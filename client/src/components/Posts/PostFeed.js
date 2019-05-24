import React, { Component } from 'react'
import PostItem from './PostItem';

class PostFeed extends Component {
    render() {
        const { posts } = this.props;

        const PostsIems = posts.map(post => <PostItem key={post._id} post={post} />);
        
        return (
            <div>
                {PostsIems}
            </div>
        )
    }
}
export default PostFeed;