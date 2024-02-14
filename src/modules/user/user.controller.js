/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../utils/prisma-client.js'
import Response from '../../utils/response.js'
import { userService } from './user.module.js'

export const signup = async (request, response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email
    }
  })

  if (user) {
    return response.status(409).json(Response(409, [], ['Email already exist']))
  }

  const hashedPassword = await bcrypt.hash(request.body.password, 10)

  const u = await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      password: hashedPassword
    }
  })

  delete u.password

  return response.status(200).json(Response(200, u, []))
}

export const login = async (request, response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email
    }
  })

  if (!user) {
    return response.status(404).json(Response(404, [], ['User not found']))
  }

  const match = await bcrypt.compare(request.body.password, user.password)

  if (match) {
    const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_KEY, {
      expiresIn: '60m'
    })
    const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_KEY)

    return response
      .status(200)
      .json(Response(200, {
        accessToken,
        refreshToken,
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
      },
      []))
  } else {
    return response
      .status(400)
      .json(Response(400, [], ['email and password not matching']))
  }
}

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()

  return res.status(200).json(Response(200, users, []))
}

export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id)
  const user = await userService.findUserById({ userId })

  if (!user) {
    return res.status(404).json(Response(404, [], ['User not found']))
  }
  delete user.password

  return res.status(200).json(Response(200, user, []))
}

export const getMembers = async (req, res) => {
  const managerId = parseInt(req.params.id)
  const manager = await userService.findUserById({ userId: managerId })

  if (!manager) {
    return res.status(404).json(Response(404, [], ['Manager not found']))
  }

  const users = await prisma.user.findMany({
    where: {
      managerId
    }
  })

  return res.status(200).json(Response(200, users, []))
}

export const getUser = (req, res) => {
  return res.status(200).json(Response(200, req.user, []))
}

export const removeMember = async (req, res) => {
  const userId = parseInt(req.params.id)

  const user = await userService.findUserById({ userId })
  const User = parseInt(process.env.USER)

  if (!user) {
    return res.status(404).json(Response(404, [], ['User not found']))
  }

  const u = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      managerId: null
    }
  })

  const users = await prisma.user.findMany({
    where: {
      managerId: req.user.id
    }
  })

  if (users.length === 0) {
    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        roleId: User
      }
    })
  }

  return res.status(200).json(Response(200, u, []))
}
