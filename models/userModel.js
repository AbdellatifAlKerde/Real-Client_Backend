import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
  },
  location: { type: String, required: true }
});

const User = model("User", userSchema);
export default User;
