import express from 'express'
import { registerController, loginController, testController } from "../controllers/authController.js";
import { requireSignIn } from '../middleswares/authMiddleware.js';
import { isAdmin } from '../middleswares/authMiddleware.js';



const router = express.Router()

//Register - POST
router.post('/register', registerController);
//Login - POST
router.post('/login', loginController);
//testing routes
router.get('/test', requireSignIn, isAdmin, testController);

export default router;