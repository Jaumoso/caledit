import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Login schema
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    rememberMe: z.boolean().optional(),
  })

  // Register schema (admin only)
  const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
  })

  // Login
  fastify.post('/auth/login', {
    schema: {
      body: loginSchema,
    },
  }, async (request, reply) => {
    const { email, password, rememberMe } = request.body as z.infer<typeof loginSchema>

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.isActive) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    // Generate tokens
    const { accessToken, refreshToken } = fastify.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    // Set cookies
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000 // 7 days or 15 min

    reply
      .setCookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: maxAge / 1000, // in seconds
      })
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 / 1000, // 7 days in seconds
      })
      .send({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      })
  })

  // Logout
  fastify.post('/auth/logout', async (request, reply) => {
    reply
      .clearCookie('token')
      .clearCookie('refreshToken')
      .send({ message: 'Logged out successfully' })
  })

  // Refresh token
  fastify.post('/auth/refresh', async (request, reply) => {
    const refreshToken = request.cookies.refreshToken

    if (!refreshToken) {
      return reply.code(401).send({ error: 'No refresh token provided' })
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'your-jwt-secret-change-in-production') as any
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      })

      if (!user || !user.isActive) {
        return reply.code(401).send({ error: 'Invalid refresh token' })
      }

      const { accessToken, refreshToken: newRefreshToken } = fastify.generateTokens({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })

      reply
        .setCookie('token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60, // 15 minutes
        })
        .setCookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60, // 7 days
        })
        .send({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        })
    } catch (error) {
      return reply.code(401).send({ error: 'Invalid refresh token' })
    }
  })

  // Get current user
  fastify.get('/auth/me', {
    preHandler: fastify.authenticate,
  }, async (request, reply) => {
    reply.send({ user: request.user })
  })

  // Register new user (admin only)
  fastify.post('/auth/register', {
    preHandler: [fastify.authenticate, fastify.requireAdmin],
    schema: {
      body: registerSchema,
    },
  }, async (request, reply) => {
    const { email, name, password, role } = request.body as z.infer<typeof registerSchema>

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return reply.code(400).send({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    reply.code(201).send({ user })
  })

  // Get all users (admin only)
  fastify.get('/users', {
    preHandler: [fastify.authenticate, fastify.requireAdmin],
  }, async (request, reply) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    reply.send({ users })
  })

  // Update user (admin only)
  fastify.put('/users/:id', {
    preHandler: [fastify.authenticate, fastify.requireAdmin],
  }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { name, role, isActive } = request.body as { name?: string; role?: 'USER' | 'ADMIN'; isActive?: boolean }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    })

    reply.send({ user })
  })

  // Delete user (admin only)
  fastify.delete('/users/:id', {
    preHandler: [fastify.authenticate, fastify.requireAdmin],
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    await prisma.user.delete({
      where: { id },
    })

    reply.send({ message: 'User deleted successfully' })
  })
}

export default authRoutes