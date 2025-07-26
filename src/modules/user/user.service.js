import prisma from '../../utils/prisma-client.js'

const UserService = {
  findUserById: async ({ userId }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return user
  }
}

export default UserService
