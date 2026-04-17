import 'dotenv/config'
import bcrypt from 'bcrypt'
import { prisma } from './prisma.js'
import { generateAllHolidays } from './data/holidays.js'

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kalenda.app' },
    update: {},
    create: {
      email: 'admin@kalenda.app',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@kalenda.app' },
    update: {},
    create: {
      email: 'user@kalenda.app',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
    },
  })

  // Seed holidays (2025-2030)
  const existingCount = await prisma.holiday.count()
  if (existingCount === 0) {
    console.log('📅 Seeding holidays (2025-2030)...')
    const holidays = generateAllHolidays(2025, 2030)
    await prisma.holiday.createMany({
      data: holidays,
      skipDuplicates: true,
    })
    console.log(`✅ ${holidays.length} holidays seeded`)
  } else {
    console.log(`📅 Holidays already seeded (${existingCount} records)`)
  }

  console.log('✅ Database seeded successfully!')
  console.log('Admin user:', admin.email, '(password: admin123)')
  console.log('Demo user:', user.email, '(password: user123)')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
