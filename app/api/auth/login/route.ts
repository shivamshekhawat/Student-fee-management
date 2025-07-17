import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const student = await prisma.student.findFirst({
      where: {
        OR: [{ email: email }, { username: email }],
      },
    })

    if (!student) {
      return NextResponse.json({ error: "Invalid username/email or password" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, student.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid username/email or password" }, { status: 401 })
    }

    const session = await createSession(student.id)

    // ✅ Create response and set cookie
    const response = NextResponse.json({
      id: student.id,
      name: student.name,
      email: student.email,
      username: student.username,
    })

    response.cookies.set("session", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/", // needed to access from all routes
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
