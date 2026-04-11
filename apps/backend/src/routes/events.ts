import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { prisma } from '../prisma.js'

const createEventSchema = z.object({
  name: z.string().min(1).max(100),
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2050).nullable().optional(),
  type: z.enum(['BIRTHDAY', 'ANNIVERSARY', 'CUSTOM']).default('CUSTOM'),
  color: z.string().max(20).default('#C8502A'),
  icon: z.string().max(10).nullable().optional(),
  isRecurring: z.boolean().default(true),
})

const updateEventSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  day: z.number().int().min(1).max(31).optional(),
  month: z.number().int().min(1).max(12).optional(),
  year: z.number().int().min(2020).max(2050).nullable().optional(),
  type: z.enum(['BIRTHDAY', 'ANNIVERSARY', 'CUSTOM']).optional(),
  color: z.string().max(20).optional(),
  icon: z.string().max(10).nullable().optional(),
  isRecurring: z.boolean().optional(),
})

const eventRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /events — List all events for the current user
  fastify.get('/events', { preHandler: fastify.authenticate }, async (request, reply) => {
    const schema = z.object({
      month: z.coerce.number().int().min(1).max(12).optional(),
      year: z.coerce.number().int().min(2020).max(2050).optional(),
    })

    const parsed = schema.safeParse(request.query)
    if (!parsed.success) {
      return reply.code(400).send({
        error: 'VALIDATION_ERROR',
        message: parsed.error.issues.map((i) => i.message).join(', '),
      })
    }

    const where: Record<string, unknown> = { userId: request.user!.id }
    if (parsed.data.month !== undefined) where.month = parsed.data.month
    // For recurring events, show them regardless of year; for non-recurring, filter by year
    if (parsed.data.year !== undefined) {
      where.OR = [{ isRecurring: true }, { year: parsed.data.year }]
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: [{ month: 'asc' }, { day: 'asc' }],
    })

    reply.send({ events })
  })

  // POST /events — Create a new event
  fastify.post('/events', { preHandler: fastify.authenticate }, async (request, reply) => {
    const parsed = createEventSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({
        error: 'VALIDATION_ERROR',
        message: parsed.error.issues.map((i) => i.message).join(', '),
      })
    }

    const event = await prisma.event.create({
      data: {
        ...parsed.data,
        year: parsed.data.year ?? null,
        icon: parsed.data.icon ?? null,
        userId: request.user!.id,
      },
    })

    reply.code(201).send({ event })
  })

  // PUT /events/:id — Update an event
  fastify.put('/events/:id', { preHandler: fastify.authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const parsed = updateEventSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({
        error: 'VALIDATION_ERROR',
        message: parsed.error.issues.map((i) => i.message).join(', '),
      })
    }

    const existing = await prisma.event.findFirst({
      where: { id, userId: request.user!.id },
    })
    if (!existing) {
      return reply.code(404).send({ error: 'NOT_FOUND', message: 'Event not found' })
    }

    const event = await prisma.event.update({
      where: { id },
      data: parsed.data,
    })

    reply.send({ event })
  })

  // DELETE /events/:id — Delete an event
  fastify.delete('/events/:id', { preHandler: fastify.authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string }

    const existing = await prisma.event.findFirst({
      where: { id, userId: request.user!.id },
    })
    if (!existing) {
      return reply.code(404).send({ error: 'NOT_FOUND', message: 'Event not found' })
    }

    await prisma.event.delete({ where: { id } })
    reply.send({ success: true })
  })
}

export default eventRoutes
