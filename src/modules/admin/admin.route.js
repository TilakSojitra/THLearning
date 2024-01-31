import { ensureAuthentication, isAdmin } from '../../middlewares/index.js'
import router from '../../utils/route.js'
import { AdminController } from './admin.module.js'

router.patch('/admin/create/:id', [ensureAuthentication, isAdmin], AdminController.assignAdmin)
router.post('/admin/add/manager/:id', [ensureAuthentication, isAdmin], AdminController.makeManager)
router.patch('/admin/remove/:id', [ensureAuthentication, isAdmin], AdminController.removeAdmin)
router.patch('/admin/remove/manager/:id', [ensureAuthentication, isAdmin], AdminController.removeManager)

export default router
