import prisma from '../../utils/prisma-client.js'

const CommentService = {
  findCommentById: async ({ commentId }) => {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId
      }
    })

    return comment
  },

  findCommentAuthorById: async ({ authorId }) => {
    const commentAuthor = await prisma.user.findUnique({
      where: {
        id: authorId
      }
    })

    return commentAuthor
  }

}

export default CommentService
