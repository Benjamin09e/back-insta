const enregistrement = require("../models/Enregistrement");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newEnregistrement = new enregistrement(req.body)
    try {
        const saveEnregistrement = await newEnregistrement.save()
        res.status(200).json(saveEnregistrement)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const EnregistrementUser = await enregistrement.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(EnregistrementUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await enregistrement.findByIdAndDelete(
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
         const enregistrementFind = await enregistrement.findById(
            req.params.id
        )
        res.status(200).json(enregistrementFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const Nextenregistrement = await enregistrement.find()
        res.status(200).json(Nextenregistrement)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;