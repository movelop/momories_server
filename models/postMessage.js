import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags:[String],
    selectedFile: String,
    likeCount: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: [] },

}, { timestamps: true });

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;