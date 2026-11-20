import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Type augmentation for globalThis (modern approach)
declare global {
  var prisma: PrismaClient | undefined
}

// Initialize or reuse existing instance
export const prisma = global.prisma || new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })

// Preserve instance in development
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma