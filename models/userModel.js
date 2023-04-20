import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: { 
    type: String, 
    required: true,
    trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
  },
  address: { 
    type: String, 
    required: true,
    trim: true }
},
{
  collection: "users",
});

const User = model("User", userSchema);
export default User;
