"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, CreditCard, Edit3, Save, X, CheckCircle, AlertCircle } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  feesPaid: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [updateLoading, setUpdateLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setName(userData.name)
        setEmail(userData.email)
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateLoading(true)

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        setEditing(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handlePayFees = () => {
    router.push("/payment")
  }

  const cancelEdit = () => {
    setEditing(false)
    setName(user?.name || "")
    setEmail(user?.email || "")
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">Please login to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information and fee payments</p>
        </div>
        {showSuccess && (
          <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg animate-slideDown">
            <CheckCircle size={16} />
            <span>Profile updated successfully!</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="glass-effect hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <X size={20} />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>View and edit your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <X size={16} />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    type="submit"
                    disabled={updateLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    {updateLoading ? <div className="spinner" /> : <Save size={16} />}
                    <span>{updateLoading ? "Saving..." : "Save Changes"}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEdit}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <X size={16} />
                    <span>Full Name</span>
                  </Label>
                  <p className="text-lg font-medium mt-1">{user.name}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail size={16} />
                    <span>Email</span>
                  </Label>
                  <p className="text-lg font-medium mt-1">{user.email}</p>
                </div>

                <Button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Edit3 size={16} />
                  <span>Edit Profile</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fee Payment Status */}
        <Card className="glass-effect hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard size={20} />
              <span>Fee Payment Status</span>
            </CardTitle>
            <CardDescription>Current status of your fee payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Payment Status:</span>
                <Badge
                  variant={user.feesPaid ? "default" : "destructive"}
                  className={`text-sm transition-all duration-200 ${
                    user.feesPaid
                      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {user.feesPaid ? (
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={14} />
                      <span>Paid</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <AlertCircle size={14} />
                      <span>Pending</span>
                    </div>
                  )}
                </Badge>
              </div>

              {!user.feesPaid ? (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                      <AlertCircle size={16} />
                      <span className="font-medium">Payment Required</span>
                    </div>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                      Your fees are currently unpaid. Please complete your payment to avoid any academic holds.
                    </p>
                  </div>
                  <Button
                    onClick={handlePayFees}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 animate-bounce-subtle"
                  >
                    <CreditCard size={16} className="mr-2" />
                    Pay Fees Now
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <CheckCircle size={16} />
                    <span className="font-medium">Payment Complete</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    ✅ Your fees have been successfully paid. Thank you for your prompt payment!
                  </p>
                </div>
              )}
            </div>

            {/* Fee Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Fee Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tuition Fee:</span>
                  <span className="font-medium">$45.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Processing Fee:</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>$50.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
