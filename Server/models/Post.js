const mongoose = require("mongoose");

const postSchema = new mongoose.Schema ({
    username : {
        type : String,
        required: true,
    },
    content : {
        type : String,
        required: true,
    },
    completed : {
        type : Boolean,
        default: false,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;