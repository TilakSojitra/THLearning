import prisma from '../../utils/prisma-client.js'

const PostService = {
  findPostById: async ({ postId }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    return post
  },

  findPostAuthorById: async ({ authorId }) => {
    const postAuthor = await prisma.user.findUnique({
      where: {
        id: authorId
      }
    })

    return postAuthor
  }
}

export default PostService
