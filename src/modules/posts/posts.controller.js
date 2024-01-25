import prisma from '../../utils/prisma-client.js'
import dotenv from 'dotenv'
import { postService } from './posts.module.js'

dotenv.config()

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
      const post = await postService.findPostById({ postId: parseInt(req.params.id) })

      if (!post) {
        return res.status(404).json({ msg: 'post not found' })
      }

      if (post && post.authorId !== req.user.id) {
        return res.status(403).json({ msg: 'Post can\'t be updated by you' })
      }

      await prisma.post.update({
        where: {
          id: post.id
        },
        data: {
          ...post,
          ...req.body
        }
      })

      return res.status(200).json({ msg: 'post edited successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await postService.findPostById({ postId: parseInt(req.params.id) })

      if (!post) {
        return res.status(404).json({ msg: 'post not found' })
      }

      const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })

      const admin = parseInt(process.env.ADMIN)

      // Author of the post is admin and admin is not logged  in then anyone can not delete it or
      // Author of the post,Manager of author and admin any of three is not logged In then post can't be deleted
      if ((postAuthor.roleId === admin && req.user.roleId !== admin) || (post.authorId !== req.user.id && postAuthor.managerId !== req.user.id && req.user.roleId !== admin)) {
        return res.status(403).json({ msg: 'Post can\'t be deleted by you' })
      }

      await prisma.post.delete({
        where: {
          id: post.id
        }
      })

      return res.status(200).json({ msg: 'post deleted successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default PostController
