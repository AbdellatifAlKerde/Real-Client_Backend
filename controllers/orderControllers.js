import Order from "../models/orderModel.js";
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT;

const getAllOrder = async (req, res, next) => {
    try {
      let response = await Order.find();
      res.status(200).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  };
  
  
  
  const getOrder = async (req, res, next) => {
    try {
      let { id } = req.params;
      let response = await Order.findOne({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  };

  
  const addOrder = async (req, res, next) => {
    let body = req.body;
    try {
      let newOrder = new Order(body);
      let response = await newOrder.save();
      res.status(201).send({ success: true, response });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: true, error });
    }
  };
  

  
  const putOrder = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
  
    try {
      console.log("data", data);
      let response = await Order.updateOne({ _id: id }, { $set: data });
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(400).send({ error: true, error });
    }
  };
  

  
  const deleteOrder= async (req, res, next) => {
    let id = req.params.id;
    try {
      let response = await Order.findByIdAndRemove({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      res.status(400).send({ error: true, error });
    }
  };
  
  export default {
    getAllOrder,
    getOrder,
    addOrder,
    putOrder,
    deleteOrder,
  };