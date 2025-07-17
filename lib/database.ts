// Simple in-memory database simulation
// In a real application, you would use a proper database like PostgreSQL, MongoDB, etc.

export interface Student {
  id: string
  name: string
  email: string
  password: string
  feesPaid: boolean
  createdAt: Date
}

export interface Session {
  id: string
  userId: string
  createdAt: Date
  expiresAt: Date
}

// In-memory storage (will reset on server restart)
const students: Student[] = [
  {
    id: "1",
    name: "Shivam Kumar",
    email: "shivam07",
    password: "shiv00",
    feesPaid: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@student.com",
    password: "password123",
    feesPaid: true,
    createdAt: new Date(),
  },
]

let sessions: Session[] = []

// Student operations
export const getAllStudents = () => {
  return students.map(({ password, ...student }) => student)
}

export const getStudentById = (id: string) => {
  return students.find((student) => student.id === id)
}

export const getStudentByEmail = (email: string) => {
  return students.find((student) => student.email === email)
}

export const createStudent = (studentData: Omit<Student, "id" | "createdAt">) => {
  const newStudent: Student = {
    ...studentData,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  students.push(newStudent)
  return newStudent
}

export const updateStudent = (id: string, updates: Partial<Student>) => {
  const index = students.findIndex((student) => student.id === id)
  if (index !== -1) {
    students[index] = { ...students[index], ...updates }
    return students[index]
  }
  return null
}

export const updateStudentFeeStatus = (id: string, feesPaid: boolean) => {
  return updateStudent(id, { feesPaid })
}

// Session operations
export const createSession = (userId: string) => {
  const session: Session = {
    id: Date.now().toString(),
    userId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }
  sessions.push(session)
  return session
}

export const getSession = (sessionId: string) => {
  const session = sessions.find((s) => s.id === sessionId)
  if (session && session.expiresAt > new Date()) {
    return session
  }
  return null
}

export const deleteSession = (sessionId: string) => {
  sessions = sessions.filter((s) => s.id !== sessionId)
}

// Clean up expired sessions
setInterval(
  () => {
    const now = new Date()
    sessions = sessions.filter((s) => s.expiresAt > now)
  },
  60 * 60 * 1000,
) // Clean up every hour

export const getStudentByUsername = (username: string) => {
  return students.find((student) => student.email === username)
}
