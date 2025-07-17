import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value

    if (!sessionId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Check if email is already taken by another user
    const existingStudent = await prisma.student.findFirst({
      where: {
        AND: [{ email: email }, { id: { not: session.studentId } }],
      },
    })

    if (existingStudent) {
      return NextResponse.json({ error: "Email is already taken" }, { status: 409 })
    }

    const updatedStudent = await prisma.student.update({
      where: { id: session.studentId },
      data: { name, email },
    })

    const { password: _, ...studentData } = updatedStudent
    return NextResponse.json(studentData)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
