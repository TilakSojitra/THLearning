import prisma from '../../utils/prisma-client.js'
import { userService } from '../user/user.module.js'

const AdminController = {
  assignAdmin: async (req, res) => {
    try {
      const user = await await userService.findUserById({ userId: parseInt(req.params.id) })
      const admin = parseInt(process.env.ADMIN)

      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }

      const u = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          roleId: admin
        }
      })

      return res.status(200).json({
        msg: 'admin assigned successfully',
        email: u.email,
        roleId: u.roleId
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  removeAdmin: async (req, res) => {
    try {
      const user = await userService.findUserById({ userId: parseInt(req.params.id) })

      const User = parseInt(process.env.USER)
      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }

      if (user.id === req.user.id) {
        return res.status(403).json({ msg: 'you can\'t remove yourself from admin!!' })
      }

      const u = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          roleId: User
        }
      })

      return res.status(200).json({
        msg: 'admin removed successfully',
        email: u.email,
        roleId: u.roleId
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  makeManager: async (req, res) => {
    try {
      const user = await userService.findUserById({ userId: parseInt(req.params.id) })

      const manager = await userService.findUserById({ userId: req.body.managerId })

      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }

      if (!manager) {
        return res.status(404).json({ msg: 'manager not found' })
      }

      const u = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          managerId: manager.id
        }
      })

      return res.status(200).json({
        msg: 'manager assigned successfully',
        email: u.email,
        managerId: u.managerId
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  removeManager: async (req, res) => {
    try {
      const user = await userService.findUserById({ userId: parseInt(req.params.id) })

      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }

      const u = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          managerId: null
        }
      })

      return res.status(200).json({
        msg: 'manager removed successfully',
        email: u.email,
        managerId: u.managerId
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default AdminController
