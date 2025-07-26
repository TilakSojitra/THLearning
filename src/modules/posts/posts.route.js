import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import * as postDTO from './dtos/posts.dto.js'
import router from '../../utils/route.js'
import { PostController } from './posts.module.js'

router.post('/posts', [ensureAuthentication, validateDto(postDTO.postData)], PostController.createPost)
router.patch('/posts/:id', [ensureAuthentication, validateDto(postDTO.postUpdateData)], PostController.editPost)
router.delete('/posts/:id', [ensureAuthentication], PostController.deletePost)
router.get('/posts', [ensureAuthentication], PostController.getPosts)

export default router
