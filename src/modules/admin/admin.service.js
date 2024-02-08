import prisma from '../../utils/prisma-client.js'
import Response from '../../utils/response.js'
import { userService } from '../user/user.module.js'

const AdminService = {
  assignAdmin: async (req, res) => {
    const user = await userService.findUserById({ userId: parseInt(req.params.id) })
    const admin = parseInt(process.env.ADMIN)
    const manager = parseInt(process.env.MANAGER)

    if (!user) {
      return res.status(404).json(Response(404, [], ['user not found']))
    }

    if (user.roleId === manager) {
      AdminService.removeManager(req, res)
    }

    const u = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        roleId: admin
      }
    })

    return res.status(200).json(Response(200, {
      email: u.email,
      roleId: u.roleId
    }
    , []
    ))
  },

  removeAdmin: async (req, res) => {
    const user = await userService.findUserById({ userId: parseInt(req.params.id) })
    const admin = parseInt(process.env.ADMIN)

    const User = parseInt(process.env.USER)
    if (!user) {
      return res.status(404).json(Response(404, [], ['user not found']))
    }

    if (user.id === req.user.id) {
      return res.status(403).json(Response(403, [], ['you can\'t remove yourself from admin!!']))
    }

    if (user.roleId !== admin) {
      return res.status(400).json(Response(400, [], ['User is not adn admin']))
    }

    const u = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        roleId: User
      }
    })

    return res.status(200).json(Response(200, {
      email: u.email,
      roleId: u.roleId
    }, []))
  },

  makeManager: async (req, res) => {
    const managerId = req.body.managerId
    const uId = parseInt(req.params.id)
    const admin = parseInt(process.env.ADMIN)

    // user and their manager cannot be same
    if (managerId === undefined || req.body.managerId === uId) {
      return res.status(400).json(Response(400, [], ['Invalid Manager Id']))
    }

    const user = await userService.findUserById({ userId: uId })

    const manager = await userService.findUserById({ userId: managerId })

    if (!user) {
      return res.status(404).json(Response(404, [], ['user not found']))
    }

    if (!manager) {
      return res.status(404).json(Response(404, [], ['manager not found']))
    }

    if (user.roleId === admin) {
      return res.status(400).json(Response(400, [], ['Admin can not be manager']))
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

    return res.status(200).json(Response(200, {
      msg: 'manager assigned successfully',
      email: u.email,
      managerId: u.managerId
    }, []))
  },

  removeManager: async (req, res) => {
    const user = await userService.findUserById({ userId: parseInt(req.params.id) })
    const User = parseInt(process.env.USER)

    if (!user) {
      return res.status(404).json(Response(404, [], ['user not found']))
    }

    const u = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        roleId: User
      }
    })

    await prisma.user.updateMany({
      where: {
        managerId: user.id
      },
      data: {
        managerId: null
      }
    })

    return res.status(200).json(Response(200, {
      msg: 'manager removed successfully',
      email: u.email,
      roleId: u.roleId
    }, []))
  }
}

export default AdminService
