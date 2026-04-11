import Fastify from 'fastify'
import { z } from 'zod'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'
import authPlugin from './plugins/auth.js'
import authRoutes from './routes/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const fastify = Fastify({
    logger: true,
  })

  // Register plugins
  await fastify.register(fastifyHelmet)
  await fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'default-secret-change-in-production',
  })
  await fastify.register(fastifyCors, {
    origin: process.env.NODE_ENV === 'production' ? false : true,
    credentials: true,
  })

  // Register custom plugins
  await fastify.register(authPlugin)

  // Serve static files (for production builds)
  await fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../frontend/dist'),
    prefix: '/',
    decorateReply: false,
  })

  // API routes
  fastify.get('/api/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  // Register auth routes
  await fastify.register(authRoutes, { prefix: '/api' })

  // Catch-all handler for SPA (must be last)
  fastify.setNotFoundHandler(async (request, reply) => {
    if (request.raw.url?.startsWith('/api')) {
      return reply.code(404).send({ error: 'Not Found' })
    }

    // Serve index.html for SPA routes
    return reply.sendFile('index.html')
  })

  return fastify
}

// Start server
async function start() {
  try {
    const fastify = await createServer()
    const port = parseInt(process.env.PORT || '3000')
    const host = process.env.HOST || '0.0.0.0'

    await fastify.listen({ port, host })
    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()