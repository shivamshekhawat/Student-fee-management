"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Moon, Sun, Users, LogOut, Menu, X, User } from "lucide-react"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      window.location.href = "/all-students"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Fee Portal
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/all-students"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === "/all-students"
                  ? "bg-blue-500 text-white shadow-lg transform scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Users size={18} />
              <span>All Students</span>
            </Link>
            {user && (
              <Link
                href="/profile"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === "/profile"
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* User actions */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 bg-transparent"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slideDown">
            <div className="space-y-2">
              <Link
                href="/all-students"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === "/all-students" ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={18} />
                <span>All Students</span>
              </Link>
              {user && (
                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === "/profile" ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              )}

              {user && (
                <div className="px-4 py-3 border-t">
                  <div className="p-2 rounded-lg">
                    <p className="text-sm font-medium mb-1">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-1 bg-transparent"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
