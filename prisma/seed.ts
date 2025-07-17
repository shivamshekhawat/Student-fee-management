import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding MongoDB database...")

  // Hash passwords
  const hashedPassword = await bcrypt.hash("shiv00", 12)
  const hashedPassword2 = await bcrypt.hash("password123", 12)

  // Create students
  const student1 = await prisma.student.upsert({
    where: { email: "shivam07" },
    update: {},
    create: {
      name: "Shivam Kumar",
      email: "shivam07",
      username: "shivam07",
      password: hashedPassword,
      feesPaid: false,
    },
  })

  const student2 = await prisma.student.upsert({
    where: { email: "amit@student.com" },
    update: {},
    create: {
      name: "Amit",
      email: "amit@student.com",
      username: "amit_00",
      password: hashedPassword2,
      feesPaid: true,
    },
  })

  const student3 = await prisma.student.upsert({
    where: { email: "aarav@student.com" },
    update: {},
    create: {
      name: "Aarav Singh",
      email: "aarav@student.com",
      username: "aarav_singh",
      password: hashedPassword2,
      feesPaid: false,
    },
  })

  const student4 = await prisma.student.upsert({
    where: { email: "alice@student.com" },
    update: {},
    create: {
      name: "Alice Brown",
      email: "alice@student.com",
      username: "alice_brown",
      password: hashedPassword2,
      feesPaid: true,
    },
  })

  // Create a sample payment for Jane
  await prisma.payment.upsert({
    where: { transactionId: "TXN_SAMPLE_001" },
    update: {},
    create: {
      studentId: student2.id,
      amount: 5000, // $50.00
      paymentMethod: "card",
      transactionId: "TXN_SAMPLE_001",
      status: "completed",
    },
  })

  // Create a sample payment for Alice
  await prisma.payment.upsert({
    where: { transactionId: "TXN_SAMPLE_002" },
    update: {},
    create: {
      studentId: student4.id,
      amount: 5000, // $50.00
      paymentMethod: "paypal",
      transactionId: "TXN_SAMPLE_002",
      status: "completed",
    },
  })

  console.log("✅ MongoDB database seeded successfully!")
  console.log("🎯 Demo credentials:")
  console.log("   Username: shivam07, Password: shiv00")
  console.log("   Email: jane@student.com, Password: password123")
  console.log("   Email: bob@student.com, Password: password123")
  console.log("   Email: alice@student.com, Password: password123")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
