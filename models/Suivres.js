const mongoose = require("mongoose")

const SuivreSchema = new mongoose.Schema(
    {
        User_id: { type: String ,require:true },
        Suivi_id: { type: String ,require:true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Suivres", SuivreSchema);