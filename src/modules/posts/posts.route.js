import { ensureAuthentication, validateDto } from '../../middlewares/index.js'
import * as postDTO from './dtos/posts.dto.js'
import router from '../../utils/route.js'
import { PostController } from './posts.module.js'

router.post('/post/create', [ensureAuthentication, validateDto(postDTO.postData)], PostController.createPost)
router.put('/post/edit/:id', [ensureAuthentication, validateDto(postDTO.postData)], PostController.editPost)
export default router
