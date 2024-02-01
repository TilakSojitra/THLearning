import prisma from '../../utils/prisma-client.js'
import { userService } from '../user/user.module.js'

const AdminService = {
  assignAdmin: async (req, res) => {
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
  },

  removeAdmin: async (req, res) => {
    const user = await userService.findUserById({ userId: parseInt(req.params.id) })
    const admin = parseInt(process.env.ADMIN)

    const User = parseInt(process.env.USER)
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }

    if (user.id === req.user.id) {
      return res.status(403).json({ msg: 'you can\'t remove yourself from admin!!' })
    }

    if (user.roleId !== admin) {
      return res.status(400).json({ msg: 'User is not admin' })
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
  },

  makeManager: async (req, res) => {
    const managerId = req.body.managerId
    const uId = parseInt(req.params.id)

    // user and their manager cannot be same
    if (managerId === undefined || req.body.managerId === uId) {
      return res.status(400).json({ msg: 'Invalid Manager Id' })
    }

    const user = await userService.findUserById({ userId: uId })

    const manager = await userService.findUserById({ userId: managerId })

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

    await prisma.user.update({
      where: {
        id: manager.id
      },
      data: {
        roleId: parseInt(process.env.MANAGER)
      }
    })

    return res.status(200).json({
      msg: 'manager assigned successfully',
      email: u.email,
      managerId: u.managerId
    })
  },

  removeManager: async (req, res) => {
    const user = await userService.findUserById({ userId: parseInt(req.params.id) })

    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }

    if (user.managerId === null) {
      return res.json({ msg: 'User has not been assigned any manager previosuly' })
    }

    const manager = await userService.findUserById({ userId: user.managerId })

    const u = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        managerId: null
      }
    })

    await prisma.user.update({
      where: {
        id: manager.id
      },
      data: {
        roleId: parseInt(process.env.USER)
      }
    })

    return res.status(200).json({
      msg: 'manager removed successfully',
      email: u.email,
      managerId: u.managerId
    })
  }
}

export default AdminService
