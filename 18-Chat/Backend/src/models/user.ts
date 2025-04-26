import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

// userSchema.method("toJSON", function () {
//   const { password, ...object } = this.toObject();
//   return object;
// });

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.uid = ret._id;
    delete ret.password;
    delete ret.__v;
    delete ret._id;
  },
});

export const User = mongoose.model("User", UserSchema);
