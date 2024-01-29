import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import * as postDTO from './dtos/posts.dto.js'
import router from '../../utils/route.js'
import { PostController } from './posts.module.js'

router.post('/post/create', [ensureAuthentication, validateDto(postDTO.postData)], PostController.createPost)
router.patch('/post/update/:id', [ensureAuthentication, validateDto(postDTO.postUpdateData)], PostController.editPost)
router.delete('/post/delete/:id', [ensureAuthentication], PostController.deletePost)

export default router
