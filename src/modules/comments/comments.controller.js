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
  }
}

export default CommentController
