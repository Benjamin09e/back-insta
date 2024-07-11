const Commentaire = require("../models/Commentaires");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newCommentaire = new Commentaire(req.body)
    try {
        const saveCommentaire = await newCommentaire.save()
        res.status(200).json(saveCommentaire)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const commentaireUser = await Commentaire.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(commentaireUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await Commentaire.findByIdAndDelete(
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
         const commentaireFind = await Commentaire.findById(
            req.params.id
        )
        res.status(200).json(commentaireFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const commentaires = await Commentaire.find()
        res.status(200).json(commentaires)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;