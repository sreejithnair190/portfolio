import { PrismaClient } from '@prisma/client'

// Type augmentation for globalThis (modern approach)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Initialize or reuse existing instance
export const prisma = global.prisma || new PrismaClient()

// Preserve instance in development
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma