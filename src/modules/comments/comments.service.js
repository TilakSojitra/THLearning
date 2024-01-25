import prisma from '../../utils/prisma-client.js'

const CommentService = {
  findCommentById: async ({ commentId }) => {
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId
        }
      })

      return comment
    } catch (error) {
      return error
    }
  },

  findCommentAuthorById: async ({ authorId }) => {
    try {
      const commentAuthor = await prisma.user.findUnique({
        where: {
          id: authorId
        }
      })

      return commentAuthor
    } catch (error) {
      return error
    }
  }

}

export default CommentService
