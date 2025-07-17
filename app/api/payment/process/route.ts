import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
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

    const { paymentMethod, cardNumber, amount } = await request.json()

    // Basic validation
    if (!paymentMethod || !amount) {
      return NextResponse.json({ error: "Payment method and amount are required" }, { status: 400 })
    }

    if (paymentMethod === "card" && (!cardNumber || cardNumber.length < 13)) {
      return NextResponse.json({ error: "Valid card number is required" }, { status: 400 })
    }

    // Simulate payment success (90% success rate)
    const paymentSuccess = Math.random() > 0.1

    if (!paymentSuccess) {
      return NextResponse.json({ error: "Payment failed. Please try again." }, { status: 400 })
    }

    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create payment record and update student fee status in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payment record
      const payment = await tx.payment.create({
        data: {
          studentId: session.studentId,
          amount,
          paymentMethod,
          transactionId,
          status: "completed",
        },
      })

      // Update student fee status
      const updatedStudent = await tx.student.update({
        where: { id: session.studentId },
        data: { feesPaid: true },
      })

      return { payment, updatedStudent }
    })

    return NextResponse.json({
      message: "Payment processed successfully",
      transactionId: result.payment.transactionId,
      amount: result.payment.amount,
      paymentMethod: result.payment.paymentMethod,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
