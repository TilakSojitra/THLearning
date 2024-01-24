import prisma from '../../utils/prisma-client.js'

const CommentController = {

  createComment: async (req, res) => {
    try {
    //   if (!req.params.id) {
    //     return res.status(400).json({ msg: 'post id not mentioned' })
    //   }
      const pId = parseInt(req.params.id)
      const post = await prisma.post.findUnique({
        where: {
          id: pId
        }
      })

      if (!post) {
        return res.status(404).json({ msg: 'post not found' })
      }

      const comment = {
        ...req.body,
        authorId: req.user.id,
        postId: pId
      }

      await prisma.comment.create({
        data: comment
      })

      return res.status(200).json({ msg: 'comment created successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  editComment: async (req, res) => {
    try {
      const cId = parseInt(req.params.id)

      const comment = await prisma.comment.findUnique({
        where: {
          id: cId
        }
      })

      if (!comment) {
        return res.status(404).json({ msg: 'comment not found' })
      }

      const author = await prisma.user.findUnique({
        where: {
          id: comment.authorId
        }
      })

      if (req.user.id !== author.id) {
        return res.status(403).json({ msg: 'Comment can\'t be edited by you' })
      }

      await prisma.comment.update({
        where: {
          id: cId
        },
        data: {
          ...comment,
          ...req.body
        }
      })

      return res.status(200).json({ msg: 'comment edited successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  deleteComment: async (req, res) => {
    try {
      const cId = parseInt(req.params.id)

      const comment = await prisma.comment.findUnique({
        where: {
          id: cId
        }
      })

      if (!comment) {
        return res.status(404).json({ msg: 'comment not found' })
      }

      const commentAuthor = await prisma.user.findUnique({
        where: {
          id: comment.authorId
        }
      })

      const post = await prisma.post.findUnique({
        where: {
          id: comment.postId
        }
      })

      const postAuthor = await prisma.user.findUnique({
        where: {
          id: post.authorId
        }
      })

      if (req.user.id !== postAuthor.id && req.user.id !== commentAuthor.id) {
        return res.status(403).json({ msg: 'Comment can\'t be deleted by you' })
      }

      await prisma.comment.delete({
        where: {
          id: cId
        }
      })

      return res.status(200).json({ msg: 'comment deleted successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default CommentController
