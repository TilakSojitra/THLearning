import prisma from '../../utils/prisma-client.js'
import Response from '../../utils/response.js'
import { postService } from './posts.module.js'

const PostController = {

  createPost: async (req, res) => {
    const post = {
      ...req.body,
      authorId: req.user.id
    }

    const p = await prisma.post.create({
      data: post
    })

    return res.status(201).json(Response(201, p, []))
  },

  editPost: async (req, res) => {
    const post = await postService.findPostById({ postId: parseInt(req.params.id) })
    const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })
    const admin = parseInt(process.env.ADMIN)

    if (!post) {
      return res.status(404).json(Response(404, [], ['post not found']))
    }

    // Author of the post is admin and admin is not logged  in then anyone can not delete it or
    // Author of the post,Manager of author and admin any of three is not logged In then post can't be edited
    if ((postAuthor.roleId === admin && req.user.roleId !== admin) || (post.authorId !== req.user.id && postAuthor.managerId !== req.user.id && req.user.roleId !== admin)) {
      return res.status(403).json(Response(403, [], ['Post can\'t be edited by you']))
    }

    const p = await prisma.post.update({
      where: {
        id: post.id
      },
      data: {
        ...post,
        ...req.body,
        updatedAt: new Date().toISOString()
      }
    })

    return res.status(200).json(Response(200, p, []))
  },

  deletePost: async (req, res) => {
    const post = await postService.findPostById({ postId: parseInt(req.params.id) })

    if (!post) {
      return res.status(404).json(Response(404, [], ['post not found']))
    }

    const postAuthor = await postService.findPostAuthorById({ authorId: post.authorId })

    const admin = parseInt(process.env.ADMIN)

    // Author of the post is admin and admin is not logged  in then anyone can not delete it or
    // Author of the post,Manager of author and admin any of three is not logged In then post can't be deleted
    if ((postAuthor.roleId === admin && req.user.roleId !== admin) || (post.authorId !== req.user.id && postAuthor.managerId !== req.user.id && req.user.roleId !== admin)) {
      return res.status(403).json(Response(403, [], ['Post can\'t be deleted by you']))
    }

    await prisma.post.delete({
      where: {
        id: post.id
      }
    })

    return res.status(204)
  }
}

export default PostController
