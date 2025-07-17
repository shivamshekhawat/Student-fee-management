import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(studentId: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  const session = await prisma.session.create({
    data: {
      studentId,
      expiresAt,
    },
  })

  return session
}

export async function getSession(sessionId: string) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { student: true },
    })

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: sessionId } }).catch(() => {})
      }
      return null
    }

    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function deleteSession(sessionId: string) {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    })
  } catch (error) {
    // Session might not exist, ignore error
    console.log("Session deletion failed (might not exist):", sessionId)
  }
}

export async function cleanupExpiredSessions() {
  try {
    const result = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    console.log(`Cleaned up ${result.count} expired sessions`)
  } catch (error) {
    console.error("Error cleaning up sessions:", error)
  }
}

// Run cleanup every hour
if (typeof window === "undefined") {
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000)
}
