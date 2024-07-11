const mongoose = require("mongoose")

const CommentaireSchema = new mongoose.Schema(
    {
        User_id: { type: String ,require:true },
        Posts_id: { type: String ,require:true },
        description: { type: String ,require:true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Commentaires", CommentaireSchema);