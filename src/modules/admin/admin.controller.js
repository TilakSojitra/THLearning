import Response from '../../utils/response.js'
import { adminService } from './admin.module.js'

const AdminController = {
  assignRole: async (req, res) => {
    const admin = parseInt(process.env.ADMIN)
    const manager = parseInt(process.env.MANAGER)
    const roleId = req.body.roleId

    if (roleId === manager) {
      return adminService.makeManager(req, res)
    } else if (roleId === admin) {
      return adminService.assignAdmin(req, res)
    } else {
      return res.status(400).json(Response(400, [], ['Invalid RoleId']))
    }
  },

  removeRole: async (req, res) => {
    const admin = parseInt(process.env.ADMIN)
    const manager = parseInt(process.env.MANAGER)
    const roleId = req.body.roleId

    if (roleId === manager) {
      return adminService.removeManager(req, res)
    } else if (roleId === admin) {
      return adminService.removeAdmin(req, res)
    } else {
      return res.status(400).json(Response(400, [], ['Invalid RoleId']))
    }
  }
}

export default AdminController
