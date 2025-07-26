import { ensureAuthentication, isAdmin } from '../../middlewares/index.js'
import router from '../../utils/route.js'
import { AdminController } from './admin.module.js'

router.patch('/admin/create/:id', [ensureAuthentication, isAdmin], AdminController.assignRole)
router.patch('/admin/remove/:id', [ensureAuthentication, isAdmin], AdminController.removeRole)

export default router
