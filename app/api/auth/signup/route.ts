import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { hashPassword, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ email: email }, { username: email }],
      },
    })

    if (existingStudent) {
      return NextResponse.json({ error: "Student with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        feesPaid: false,
      },
    })

    const session = await createSession(newStudent.id)
    const cookieStore = await cookies()

    cookieStore.set("session", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    const { password: _, ...studentData } = newStudent
    return NextResponse.json(studentData)
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
