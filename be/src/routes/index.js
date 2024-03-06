import express from "express"
import authRoutes from "./authRoutes.js"

const router = express.Router()

// Path: /api/auth
router.use("/auth", authRoutes)

export default router
