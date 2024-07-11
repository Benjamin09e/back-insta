const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema(
    {
        User_id: { type: String ,require:true },
        description: { type: String ,require:true },
        images: { type: String,  require:true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Posts", PostsSchema);

