import express from "express"
import authRoutes from "../module/auth.route.js"
import adminRoutes from "../module/auth/admin.routes.js"

const router = express.Router();

router.get("/health",(req,res)=>{
    return res.json({
        message:"clinic management system",
        success:true
    })
})
router.use("/auth",authRoutes)
router.use("/admin",adminRoutes)




export default router
