import { FastifyPluginAsync } from 'fastify'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { getSaintsForMonth } from '../data/saints.js'

const jwtSecret = process.env.JWT_SECRET || 'your-jwt-secret-change-in-production'

/**
 * Public render-data endpoint for Puppeteer.
 * Uses a short-lived render token instead of session cookies.
 */
const renderRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /render-data/:monthId?token=xxx
  fastify.get('/render-data/:monthId', async (request, reply) => {
    const { monthId } = request.params as { monthId: string }
    const { token } = request.query as { token?: string }

    if (!token) {
      return reply.code(401).send({ error: 'Token required' })
    }

    // Validate render token
    let payload: { monthId: string; purpose: string }
    try {
      payload = jwt.verify(token, jwtSecret) as { monthId: string; purpose: string }
    } catch {
      return reply.code(401).send({ error: 'Invalid or expired token' })
    }

    if (payload.purpose !== 'render' || payload.monthId !== monthId) {
      return reply.code(403).send({ error: 'Token mismatch' })
    }

    const month = await prisma.calendarMonth.findFirst({
      where: { id: monthId },
      include: {
        project: {
          select: { userId: true, weekStartsOn: true, name: true, year: true, autonomyCode: true },
        },
        dayCells: { orderBy: { dayNumber: 'asc' } },
      },
    })

    if (!month) {
      return reply.code(404).send({ error: 'Month not found' })
    }

    // Fetch holidays
    const holidayWhere: Record<string, unknown> = {
      year: month.year,
      month: month.month,
    }
    if (month.project.autonomyCode) {
      holidayWhere.OR = [
        { scope: 'NATIONAL' },
        { scope: 'AUTONOMY', autonomyCode: month.project.autonomyCode },
      ]
    } else {
      holidayWhere.scope = 'NATIONAL'
    }
    const holidays = await prisma.holiday.findMany({
      where: holidayWhere,
      orderBy: { day: 'asc' },
    })

    // Fetch events
    const events = await prisma.event.findMany({
      where: {
        userId: month.project.userId,
        month: month.month,
        OR: [{ isRecurring: true }, { year: month.year }],
      },
      orderBy: { day: 'asc' },
    })

    const saints = getSaintsForMonth(month.month)

    reply.send({ month, holidays, events, saints })
  })
}

export default renderRoutes
