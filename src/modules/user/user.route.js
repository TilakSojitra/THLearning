import validateDto from '../../middlewares/validator.js'
import express from 'express'
import * as userController from './user.controller.js'
import { authenticateToken } from '../../middlewares/auth.js'
import * as userDTOs from './dtos/user.dto.js'

const router = express.Router()

router.post('/signup', validateDto(userDTOs.validateSignupData), userController.signup)
router.post('/login', validateDto(userDTOs.validateLoginData), userController.login)
router.get('/users', authenticateToken, userController.getAllUsers)

export default router
