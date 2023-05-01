import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    collection: "orders",
  }
);

orderSchema.plugin(mongoosePaginate);

const Order = model("Order", orderSchema);
export default Order;
