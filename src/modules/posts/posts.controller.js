import prisma from '../../utils/prisma-client.js'

const PostController = {

  createPost: async (req, res) => {
    try {
      const post = {
        ...req.body,
        authorId: req.user.id
      }

      await prisma.post.create({
        data: post
      })

      return res.status(200).json({ msg: 'post created successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  editPost: async (req, res) => {
    try {
      const pId = parseInt(req.params.id)

      const post = await prisma.post.findUnique({
        where: {
          id: pId
        }
      })

      if (!post) {
        return res.status(404).json({ msg: 'post not found' })
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default PostController
