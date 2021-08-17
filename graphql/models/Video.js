import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Video = new Schema(
 {
  title: {
   type: String,
   required: true,
  },
  thumnailPath: {
   type: String,
   required: true,
  },
  videoPath: {
   type: String,
   required: true,
  },
  explanation: {
   type: String,
   required: true,
  },

  author: {
   type: String,
   required: true,
  },
  good: [
   {
    type: String,
    required: true,
   },
  ],
  bad: [
   {
    type: String,
    required: true,
   },
  ],
  hit: {
   type: Number,
   required: true,
  },
  createdAt: {
   type: String,
   required: true,
  },
  isDelete: {
   type: Boolean,
   required: true,
  },
 },
 {
  versionKey: false,
 },
);

export default mongoose.model(`Video`, Video, `Video`);
