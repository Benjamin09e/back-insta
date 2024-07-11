const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        prenom: { type: String ,require:true },
        nom: { type: String ,require:true },
        email: { type: String, unique: true, require:true },
        mot_de_passe: { type: String ,require:true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);