import prisma from '../../utils/prisma-client.js'
import { commentService } from './comments.module.js'
import { postService } from '../posts/posts.module.js'
import Response from '../../utils/response.js'

const CommentController = {

  createComment: async (req, res) => {
    const post = await postService.findPostById({ postId: parseInt(req.params.id) })

    if (!post) {
      return res.status(404).json(Response(404, [], ['post not found']))
    }

    const comment = {
      ...req.body,
      authorId: req.user.id,
      postId: post.id
    }

    const c = await prisma.comment.create({
      data: comment
    })

    return res.status(201).json(Response(201, c, []))
  },

  editComment: async (req, res) => {
    const comment = await commentService.findCommentById({ commentId: parseInt(req.params.id) })

    if (!comment) {
      return res.status(404).json(Response(404, [], ['comment not found']))
    }

    const commentAuthor = await commentService.findCommentAuthorById({ authorId: comment.authorId })

    const post = await postService.findPostById({ postId: comment.postId })

    const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })

    const admin = parseInt(process.env.ADMIN)

    // Author of the comment is admin and admin is not logged  in then anyone can not delete it or
    // Author of the comment,Manager of post author and admin any of three is not logged In then comment can't be edited
    if ((commentAuthor.roleId === admin && req.user.roleId !== admin) || (req.user.id !== postAuthor.id && req.user.id !== commentAuthor.id && req.user.roleId !== admin && req.user.id !== postAuthor.managerId)) {
      return res.status(403).json(Response(403, [], ['Comment can\'t be edited by you']))
    }

    const c = await prisma.comment.update({
      where: {
        id: comment.id
      },
      data: {
        ...comment,
        ...req.body,
        updatedAt: new Date().toISOString()
      }
    })

    return res.status(200).json(Response(200, c, []))
  },

  deleteComment: async (req, res) => {
    const comment = await commentService.findCommentById({ commentId: parseInt(req.params.id) })

    if (!comment) {
      return res.status(404).json(Response(404, [], ['comment not found']))
    }

    const commentAuthor = await commentService.findCommentAuthorById({ authorId: comment.authorId })

    const post = await postService.findPostById({ postId: comment.postId })

    const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })

    const admin = parseInt(process.env.ADMIN)

    // Author of the comment is admin and admin is not logged  in then anyone can not delete it or
    // Author of the comment,Manager of post author and admin any of three is not logged In then comment can't be deleted
    if ((commentAuthor.roleId === admin && req.user.roleId !== admin) || (req.user.id !== postAuthor.id && req.user.id !== commentAuthor.id && req.user.roleId !== admin && req.user.id !== postAuthor.managerId)) {
      return res.status(403).json(Response(403, [], ['Comment can\'t be deleted by you']))
    }

    await prisma.comment.delete({
      where: {
        id: comment.id
      }
    })

    return res.status(204).json((Response(204, [], [])))
  },

  getCommentsByPostId: async (req, res) => {
    const pId = parseInt(req.params.id)

    const post = await postService.findPostById({ postId: pId })

    if (!post) {
      return res.status(404).json(Response(404, [], ['post not found']))
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: pId
      }
    })

    return res.status(200).json(Response(200, comments, []))
  }
}

export default CommentController
