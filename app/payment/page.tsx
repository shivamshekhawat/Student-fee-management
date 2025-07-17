"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Lock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function PaymentPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        if (userData.feesPaid) {
          router.push("/profile")
        }
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing with realistic delay
    setTimeout(async () => {
      try {
        const response = await fetch("/api/payment/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod,
            cardNumber: cardNumber.replace(/\s/g, ""),
            amount: 5000, // $50.00 in cents
          }),
        })

        if (response.ok) {
          setPaymentSuccess(true)
          setTimeout(() => {
            router.push("/profile")
          }, 3000)
        } else {
          alert("Payment failed. Please try again.")
        }
      } catch (error) {
        console.error("Payment error:", error)
        alert("Payment failed. Please try again.")
      } finally {
        setProcessing(false)
      }
    }, 2000)
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto">
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">Please login to make a payment.</p>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto animate-fadeIn">
        <Card className="glass-effect text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your fee payment of $50.00 has been processed successfully.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Redirecting to your profile...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/profile")}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft size={16} />
          <span>Back to Profile</span>
        </Button>
      </div>

      <Card className="glass-effect shadow-xl">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CreditCard size={24} className="text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simulated Payment
          </CardTitle>
          <CardDescription>
            Complete your fee payment of <span className="font-bold text-lg">$50.00</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Notice */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
              <Lock size={16} />
              <span className="font-medium text-sm">Secure Payment Simulation</span>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
              This is a demo payment form. No real transactions will be processed.
            </p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 animate-slideDown">
                <div>
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
                      setCardNumber(value)
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
                        setExpiryDate(value)
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="123"
                      maxLength={4}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-slideDown">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  You will be redirected to PayPal to complete your payment securely.
                </p>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg animate-slideDown">
                <p className="text-gray-800 dark:text-gray-200 text-sm">
                  Bank transfer details will be provided after confirmation.
                </p>
              </div>
            )}

            {/* Payment Summary */}
            <div className="border-t pt-4 space-y-3">
              <h4 className="font-medium">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tuition Fee:</span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Processing Fee:</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-600">$50.00</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                disabled={processing}
              >
                {processing ? (
                  <div className="flex items-center space-x-2">
                    <div className="spinner" />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock size={16} />
                    <span>Pay Now - $50.00</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => router.push("/profile")}
              disabled={processing}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
