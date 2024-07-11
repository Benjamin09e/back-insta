const Like = require("../models/Likes");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newLike = new Like(req.body)
    try {
        const saveLike = await newLike.save()
        res.status(200).json(saveLike)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const likeUser = await Like.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(likeUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await Like.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("utilisateur supprimer")
    } catch (error) {
        res.status(500).json(error)
    }
})


//find by id
router.get("/:id", async (req, res)=>{
    
    try {
         const likeFind = await Like.findById(
            req.params.id
        )
        res.status(200).json(likeFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const like = await Like.find()
        res.status(200).json(like)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;