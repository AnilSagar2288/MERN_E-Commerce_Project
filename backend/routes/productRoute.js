import express from "express";
import {createProduct, createProductReview, deleteProduct, getProductDetails, getSingleProduct, updateProduct} from '../controllers/productController.js'
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProductDetails).post(protect,admin,createProduct);
router.route("/:id/review").post(protect,createProductReview);
router.route("/:id").get(getSingleProduct).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct);



export default router;
