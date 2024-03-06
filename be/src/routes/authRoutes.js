import express from "express"
import {
	login,
	logout,
	refreshToken,
	register,
} from "../controllers/authControllers.js"
import trimRequest from "trim-request"

const router = express.Router()

// Path: http://localhost:3001/api/auth/register
router.route("/register").post(trimRequest.all, register)

router.route("/login").post(trimRequest.all, login)

router.route("/logout").post(trimRequest.all, logout)

router.route("/refresh").post(trimRequest.all, refreshToken)

export default router
