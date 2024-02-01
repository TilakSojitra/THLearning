import { AdminRoutes } from './admin/admin.module.js'
import { CommentRoutes } from './comments/comments.module.js'
import { PostRoutes } from './posts/posts.module.js'
import { UserRoutes } from './user/user.module.js'

export const routes = [
  {
    path: '/admin',
    route: AdminRoutes
  },
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
