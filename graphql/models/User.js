import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
 {
  name: {
   type: String,
   required: true,
  },
  avatar: {
   type: String,
   required: true,
  },
  follower: [
   {
    type: String,
    required: true,
   },
  ],
  email: {
   type: String,
   required: true,
  },
  nickName: {
   type: String,
   required: true,
  },
  brith: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  mobile: {
   type: String,
   required: true,
  },
  subscribe: [
   {
    type: String,
    required: true,
   },
  ],
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

export default mongoose.model(`User`, User, `User`);
