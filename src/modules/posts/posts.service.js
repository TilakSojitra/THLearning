import prisma from '../../utils/prisma-client.js'

const PostService = {
  findPostById: async ({ postId }) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId
        }
      })

      return post
    } catch (error) {
      return error
    }
  },

  findPostAuthorById: async ({ authorId }) => {
    try {
      const postAuthor = await prisma.user.findUnique({
        where: {
          id: authorId
        }
      })

      return postAuthor
    } catch (error) {
      return error
    }
  }
}

export default PostService
