import express from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/users',authenticateToken,getAllUsers);

export default router;