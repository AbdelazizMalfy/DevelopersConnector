const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load Validation
const validatePostInput = require('../../validation/post')

// @route  GET api/posts/test
// @desc   Tests posts route
// @access Puplic
router.get('/test', (req,res) => res.json({msg:'posts works'}))

// @route  GET api/posts
// @desc   show all posts
// @access Puplic
router.get('/',(req,res) => {
    Post.find()
    .sort({date: -1 })
    .then(posts => res.json(posts)) 
    .catch(err => res.status(404).json(err));
})



// @route  GET api/posts/:id
// @desc   Get post by Id
// @access Puplic
router.get('/:id',(req,res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post)) 
    .catch(err => res.status(404).json(err));
})

// @route  POST api/posts
// @desc   Create new post 
// @access Private
router.post('/', passport.authenticate('jwt',{session:false}), (req,res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation 
    if(!isValid){
        // if there is any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user:req.user.id
    })

    newPost.save().then(post => res.json(post));
});


// @route  Delete api/posts/:id
// @desc   Delete post 
// @access Private
router.delete('/:id',passport.authenticate('jwt', {session:false}), (req,res) => {
    Profile.findOne({user: req.user.id})
    .then(Profile => {
        Post.findById(req.params.id)
        .then(post => {
            // Check if post owner
            if(post.user.toString() !== req.user.id ){
                return res.status(401).json({notauthorized :'user not authorized'})
            } else {
                //Delete Post
                post.remove().then(() => res.json ({success: true}));
            }
        })
    }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
});


// @route  POST api/posts/like/:id
// @desc   like post 
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session:false}), (req,res) =>{
    Profile.findOne({ user: req.user.id })
    .then( profile => {
        Post.findById(req.params.id)
        .then( post => {
            if( post.likes.filter (like => like.user.toString() === req.user.id).length > 0 ){
                return res.status(400).json({ alreadyliked: 'user Already liked this post'})
            } else {
                // Add user to the likes array
                post.likes.unshift({user:req.user.id});

                post.save().then(post => res.json(post));
            }
        } )
    })
})


// @route  POST api/posts/unlike/:id
// @desc   unlike post 
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), (req,res) =>{
    Profile.findOne({ user: req.user.id })
    .then( profile => {
        Post.findById(req.params.id)
        .then( post => {
            if( post.likes.filter (like => like.user.toString() === req.user.id).length === 0 ){
                return res.status(400).json({ notliked: 'You have not liked this post yet'})
            } else {
                // remove use from likes array
                
                // Get remove index
                const removeIndex = post.likes
                .map(item => item.user.toString()).indexOf(req.user.id);

                //Splice it out of array
                post.likes.splice(removeIndex,1);

                //Save
                post.save().then(post => res.json(post));
            }
        } )
    })
})

// @route  POST api/posts/comment/:id
// @desc   add comment to a post 
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {session : false}), (req,res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation 
    if(!isValid){
        // if there is any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // Add comment to the array

        post.comments.unshift(newComment);

        //Save 

        post.save().then(post => res.json(post))
    }).catch (err => res.status(404).json({postnotfound:'No Post found'}))
})

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete comment to a post 
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session : false}), (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        // Check to see if the comment exits
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0 ){
            return res.status(404).json({ nocomment: 'comment is not found' })
        } else {
            // Get remove index
            const removeIndex = post.comments.map(item => item._id.toString())
            .indexOf(req.params.comment_id);

            // Splice it out of the array
            post.comments.splice(removeIndex,1);

            post.save().then(post => res.json(post));
        }
    }).catch (err => res.status(404).json({postnotfound:'No Post found'}))
})


module.exports = router;