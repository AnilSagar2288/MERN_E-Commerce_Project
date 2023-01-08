import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile,getAllUser,deleteUser, getUserById, updateUser } from "../controllers/userControllers.js";
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/login",authUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/").post(registerUser).get(protect,admin,getAllUser);
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)


export default router
