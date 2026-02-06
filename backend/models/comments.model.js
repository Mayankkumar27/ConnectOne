import e from 'express';

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  body: {
    type: String,
    default: ""
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;