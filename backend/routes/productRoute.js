import express from "express";
import {getProductDetails, getSingleProduct} from '../controllers/productController.js'

const router = express.Router();

router.route("/").get(getProductDetails);
router.route("/:id").get(getSingleProduct);

export default router;
