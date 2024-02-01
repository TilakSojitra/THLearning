import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import router from '../../utils/route.js'
import CommentController from './comments.controller.js'
import * as commentDTO from './dtos/comments.dto.js'

router.post('/comments/:id', [ensureAuthentication, validateDto(commentDTO.commentData)], CommentController.createComment)
router.patch('/comments/:id', [ensureAuthentication], CommentController.editComment)
router.delete('/comments/:id', [ensureAuthentication], CommentController.deleteComment)

export default router
