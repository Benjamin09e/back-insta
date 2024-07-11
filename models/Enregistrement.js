const mongoose = require("mongoose")

const EnregistrementSchema = new mongoose.Schema(
    {
        User_id: { type: String ,require:true },
        Posts_id: { type: String ,require:true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Enregistrement", EnregistrementSchema);