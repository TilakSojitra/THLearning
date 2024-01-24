import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import router from '../../utils/route.js'
import CommentController from './comments.controller.js'
import * as commentDTO from './dtos/comments.dto.js'

router.post('/comment/create/:id', [ensureAuthentication, validateDto(commentDTO.commentData)], CommentController.createComment)
router.put('/comment/edit/:id', [ensureAuthentication], CommentController.editComment)
router.delete('/comment/delete/:id', [ensureAuthentication], CommentController.deleteComment)

export default router
