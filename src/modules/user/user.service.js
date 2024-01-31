import prisma from '../../utils/prisma-client.js'

const UserService = {
  findUserById: async ({ userId }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      return user
    } catch (error) {
      return error
    }
  }
}

export default UserService
