const { read } = require("fs");
const Post = require("../models/Posts");
const User = require("../models/User");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    // console.log(req.body)
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        // const username = req.body.username; // Récupération du nom d'utilisateur depuis la requête
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(updatePost)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("post supprimer")
    } catch (error) {
        res.status(500).json(error)
    }
})


//find by id
router.get("/:id", async (req, res)=>{
    
    try {
         const postFind = await Post.findById(req.params.id)
        res.status(200).json(postFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
    const posts = await Post.find().sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//profile connect
router.get("/user-posts/:id", async (req, res) => {
    try {
        const postFind = await Post.find({User_id:req.params.id})
        res.status(200).json(postFind)
    } catch (error) {
        res.status(500).json(error)
    }

    

});



module.exports = router;