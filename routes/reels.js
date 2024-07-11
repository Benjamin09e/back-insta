const reel = require("../models/Reels");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newReel = new reel(req.body)
    try {
        const saveReel = await newReel.save()
        res.status(200).json(saveReel)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const reelUser = await reel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(reelUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await reel.findByIdAndDelete(
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
         const reelFind = await reel.findById(
            req.params.id
        )
        res.status(200).json(reelFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const Nextreel = await reel.find()
        res.status(200).json(Nextreel)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;