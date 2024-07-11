const suivre = require("../models/Suivres");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newSuivi = new suivre(req.body)
    try {
        const saveSuivi = await newSuivi.save()
        res.status(200).json(saveSuivi)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const suiviUser = await suivre.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(suiviUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await suivre.findByIdAndDelete(
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
         const suiviFind = await suivre.findById(
            req.params.id
        )
        res.status(200).json(suiviFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const Nextsuivi = await suivre.find()
        res.status(200).json(Nextsuivi)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;