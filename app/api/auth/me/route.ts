import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
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

    const { password: _, ...studentData } = session.student
    return NextResponse.json(studentData)
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
