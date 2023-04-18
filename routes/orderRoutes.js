import express from 'express';
const router = express.Router();
import controller from "../controllers/orderControllers.js";
router.get('/',controller.getAllOrder);
router.get('/:id',controller.getOrder);
router.post('/',controller.addOrder);
router.put('/:id',controller.putOrder);
router.delete('/:id',controller.deleteOrder);


export default router;