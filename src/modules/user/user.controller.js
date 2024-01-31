/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../utils/prisma-client.js'

export const signup = async (request, response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: request.body.email
      }
    })

    if (user) {
      return response.status(409).json({ msg: 'email already exist' })
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
    return response.status(201).json({ msg: 'signup successful', user: u })
  } catch (error) {
    return response.status(500).json(error.message)
  }
}

export const login = async (request, response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email
    }
  })

  if (!user) {
    return response.status(404).json({ msg: 'User not found' })
  }

  try {
    const match = await bcrypt.compare(request.body.password, user.password)

    if (match) {
      const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_KEY, {
        expiresIn: '60m'
      })
      const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_KEY)

      return response
        .status(200)
        .json({
          accessToken,
          refreshToken,
          name: user.name,
          email: user.email
        })
    } else {
      return response
        .status(400)
        .json({ msg: 'email and password not matching' })
    }
  } catch (error) {
    return response.status(500).json(error.message)
  }
}

export const getAllUsers = async (request, response) => {
  try {
    const users = await prisma.user.findMany()

    return response.status(200).json(users)
  } catch (error) {
    return response.status(500).json(error.message)
  }
}
