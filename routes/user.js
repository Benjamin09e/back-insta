const User = require("../models/User");
const router = require('express').Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//creer 
router.post("/", async (req, res) => {
    const newUser = new User(req.body)
    try {
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// login 
router.post("/login", [
    body("email").isEmail().normalizeEmail(),
    body("mot_de_passe").notEmpty().trim()
], async (req, res) => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check if the user with the provided email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Verify the password
        const isPasswordValid = await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // You can include any data you want here
            "your_secret_key", // Replace with your own secret key
            { expiresIn: "1h" } // Token expiration time
        );
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// register 
router.post("/register", async (req, res) => {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(404).json({ message: "User found" });
    }
    const saltRounds = 10;
    //hash a password
    let pass = ''
    bcrypt.hash(req.body.mot_de_passe, 10, async function (err, hash) {
        // Store hash in your password DB.
        const newuser = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mot_de_passe: hash
        })
        try {
            // Check if the user with the provided email exists
            const save =  await newuser.save()
            res.status(200).json(save);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    });

})


//update
router.put("/:id", async (req, res) => {

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete("/:id", async (req, res) => {

    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("utilisateur supprimer")
    } catch (error) {
        res.status(500).json(error)
    }
})


//find by id
router.get("/:id", async (req, res) => {
    try {
        const userFind = await User.findById(
            req.params.id
        )
        res.status(200).json(userFind)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;