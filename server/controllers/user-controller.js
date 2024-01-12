import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

export const userSignup = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: request.body.email,
                name: request.body.name,
                password: hashedPassword
            }
        })

        return response.status(200).json({ msg: 'signup successful' })
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}

export const userLogin = async (request, response) => {

    const user = await prisma.user.findUnique({
        where: {
            email: request.body.email,
        },
    })

    if (!user) {
        return response.status(404).json({ msg: 'email not found' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_KEY);

            const token = await prisma.token.create({
                data: {
                    token: refreshToken
                }
            });

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email });
        }
        else {
            return response.status(400).json({ msg: 'email and password not matching' });
        }

    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAllUsers = async (request, response) => {
    try {
        const users = await prisma.user.findMany();

        return response.status(200).json(users);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}