/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../utils/prisma-client.js'
import Response from '../../utils/response.js'

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

export const getAllUsers = async (request, response) => {
  const users = await prisma.user.findMany()

  users.forEach((user) => delete user.password)
  return response.status(200).json(Response(200, users, []))
}

export const getUser = (req, res) => {
  return res.status(200).json(Response(200, req.user, []))
}
