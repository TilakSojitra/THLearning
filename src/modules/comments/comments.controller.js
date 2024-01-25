import prisma from '../../utils/prisma-client.js'
import { commentService } from './comments.module.js'
import { postService } from '../posts/posts.module.js'

const CommentController = {

  createComment: async (req, res) => {
    try {
      const post = await postService.findPostById({ postId: parseInt(req.params.id) })

      if (!post) {
        return res.status(404).json({ msg: 'post not found' })
      }

      const comment = {
        ...req.body,
        authorId: req.user.id,
        postId: post.id
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
      const comment = await commentService.findCommentById({ commentId: parseInt(req.params.id) })

      if (!comment) {
        return res.status(404).json({ msg: 'comment not found' })
      }

      const commentAuthor = await commentService.findCommentAuthorById({ authorId: comment.authorId })

      if (req.user.id !== commentAuthor.id) {
        return res.status(403).json({ msg: 'Comment can\'t be edited by you' })
      }

      await prisma.comment.update({
        where: {
          id: comment.id
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
      const comment = await commentService.findCommentById({ commentId: parseInt(req.params.id) })

      if (!comment) {
        return res.status(404).json({ msg: 'comment not found' })
      }

      const commentAuthor = await commentService.findCommentAuthorById({ authorId: comment.authorId })

      const post = await postService.findPostById(comment.postId)

      const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })

      const admin = parseInt(process.env.ADMIN)

      // Author of the comment is admin and admin is not logged  in then anyone can not delete it or
      // Author of the comment,Manager of post author and admin any of three is not logged In then comment can't be deleted
      if ((commentAuthor.roleId === admin && req.user.roleId !== admin) || (req.user.id !== postAuthor.id && req.user.id !== commentAuthor.id && req.user.roleId !== admin && req.user.id !== postAuthor.managerId)) {
        return res.status(403).json({ msg: 'Comment can\'t be deleted by you' })
      }

      await prisma.comment.delete({
        where: {
          id: comment.id
        }
      })

      return res.status(200).json({ msg: 'comment deleted successfully' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default CommentController
