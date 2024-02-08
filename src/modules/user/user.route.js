import { validateDto, ensureAuthentication, isAdmin } from '../../middlewares/index.js'
import * as UserController from './user.controller.js'
import * as userDTOs from './dtos/user.dto.js'
import router from '../../utils/route.js'

router.post('/signup', validateDto(userDTOs.validateSignupData), UserController.signup)
router.post('/login', validateDto(userDTOs.validateLoginData), UserController.login)
router.get('/user', [ensureAuthentication], UserController.getUser)
router.get('/users', [ensureAuthentication, isAdmin], UserController.getAllUsers)

export default router
