import express from 'express'
import { login, logout, refreshToken, register } from '../controllers/auth.js'
import trimRequest from 'trim-request'

const router = express.Router()

// http://localhost:8001/api/auth/ ....auth routes
router.route('/register').post(trimRequest.all, register)
router.route('/login').post(trimRequest.all, login)
router.route('/logout').post(trimRequest.all, logout)
router.route('/refresh').post(trimRequest.all, refreshToken)

export default router
