import mongoose, { Schema } from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret, options) => {
        ret.uid = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

export const Message = mongoose.model("Message", MessageSchema);
