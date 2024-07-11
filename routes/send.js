const send = require("../models/Send");

const router = require('express').Router();


//creer 
router.post("/", async (req, res)=>{
    const newSend = new send(req.body)
    try {
        const saveSend = await newSend.save()
        res.status(200).json(saveSend)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update
router.put("/:id", async (req, res)=>{
    
    try {
        const sendUser = await send.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(sendUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res)=>{
    
    try {
        await send.findByIdAndDelete(
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
         const sendFind = await send.findById(
            req.params.id
        )
        res.status(200).json(sendFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const send = await send.find()
        res.status(200).json(send)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;