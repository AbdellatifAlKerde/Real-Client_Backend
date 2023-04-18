import mongoose from "mongoose";

const {Schema,model}=mongoose;
const orderSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},

{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
collection:'order'
},
)
const Order=model('Order',orderSchema);
export default Order