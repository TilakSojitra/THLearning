import { CommentRoutes } from '../modules/comments/comments.module.js'
import { PostRoutes } from '../modules/posts/posts.module.js'
import { UserRoutes } from '../modules/user/user.module.js'

export const routes = [
  {
    path: '/',
    route: UserRoutes
  },
  {
    path: '/post',
    route: PostRoutes
  },
  {
    path: '/comment',
    route: CommentRoutes
  }
]

export default routes
