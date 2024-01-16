import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import router from '../../utils/route.js'
import CommentController from './comments.controller.js'
import * as commentDTO from './dtos/comments.dto.js'

router.post('/comment/create/:id', [ensureAuthentication, validateDto(commentDTO.commentData)], CommentController.createComment)

export default router
