import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
  
  },
  {
    collection: "orders",
  }
);

const Order = model("Order", orderSchema);
export default Order;
