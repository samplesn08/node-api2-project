// implement your posts router here
const express = require("express");
const router = express.Router();
const Posts = require('./posts-model');

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "The posts information could not be retrieved"})
        })
})

router.get('/:id', (req, res) => {
    const idVar = req.params.id;
    Posts.findById(idVar)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

router.get('/:id/comments', (req, res) => {
    const idVar = req.params.id;
    Posts.findPostComments(idVar)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "The comments information could not be retrieved"})
        })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(newPost => {
            if (!newPost.title || !newPost.contents) {
                res.status(400).json({message: "Please provide title and contents for the post"})
            } else {
                res.status(201).json(newPost)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
})

router.put('/:id', (req, res) => {
    const idVar = req.params.id;
    const changes = req.body;
    Posts.update(idVar, changes)
        .then(post => {
            if(!post.title || !post.contents) {
                res.status(400).json({message: "Please provide title and contents for the post"})
            }else{
                if(post) {
                    res.status(200).json(post)
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "The post information could not be modified"})
        })
})

router.delete('/:id', (req, res) => {
    const idVar = req.params.id;
    Posts.remove(idVar)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "The post could not be removed"})
        })
})

module.exports = router;