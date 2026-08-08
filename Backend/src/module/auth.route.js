import {Router} from "express"
import { register } from "./auth.controllers.js";




const router = Router();
router.post("/register",register)



export default router;