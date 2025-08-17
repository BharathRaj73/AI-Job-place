import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Mail, Lock, ArrowLeft } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (email && password) {
        // Simulate user authentication
        const userData = {
          id: Date.now(),
          firstName: "John",
          lastName: "Doe",
          email: email,
          userType: "job_seeker",
          isAuthenticated: true,
          profileCompleted: true, // Existing user has completed profile
          skills: ["React", "TypeScript", "Node.js"], // Example skills for existing user
        }

        login(userData)

        // If user has completed profile, go to profile page to view/edit
        // If not completed, go to profile page to complete
        navigate("/profile")
      } else {
        alert("Please enter valid credentials")
      }
    } catch (error) {
      alert("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    const userData = {
      id: Date.now(),
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      userType: "job_seeker",
      isAuthenticated: true,
      profileCompleted: true,
    }

    login(userData)
    navigate("/profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-500">Sign in to your JobMatch AI account</p>
            </div>

            <div className="space-y-5">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 h-12 border-slate-300 hover:bg-slate-50 transition"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3Ljk2QzE3LjY2IDE1LjY5IDE2Ljg0IDE2Ljg4IDE1LjYxIDE3LjY4VjIwLjU5SDE5LjIzQzIxLjMgMTguNzggMjIuNTYgMTUuNzUgMjIuNTYgMTIuMjVaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik0xMiAyM0M5IDIzIDYuNDMgMjEuNzQgNC43NiAxOS44NEw4LjQ1IDE3LjdDOS42OSAxOC41MSAxMS4yNSAxOSAxMiAxOUMxNS4yMyAxOSAxNy45NiAxNy45MiAxOS4yMyAxNS41OUgxNS42MUMxNC41NCAxNi40IDE0LjEyIDE3IDEyIDE3QzguNzMgMTcgNS45MyAxNC42OSA1LjA1IDExLjVINi42N0M2LjY3IDExLjUgOC40NSA5LjM2IDguNDUgOS4zNkM5LjY5IDEwLjE3IDEwLjg0IDEwLjY5IDEyIDEwLjY5QzE0LjEyIDEwLjY5IDE0LjU0IDExLjI5IDE1LjYxIDEyLjFIMTkuMjNDMTcuOTYgOS43NyAxNS4yMyA4LjY5IDEyIDguNjlDMTEuMjUgOC42OSA5LjY5IDkuMTggOC40NSA5Ljk5TDQuNzYgNy44NUM2LjQzIDUuOTUgOSA0LjY5IDEyIDQuNjlDMTYuNTQgNC42OSAyMC4zNSA3LjUgMjEuNyAxMS42OUwyMi41NiAxMi4yNVoiIGZpbGw9IiMzNDk2M0YiLz4KPC9zdmc+"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-medium rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => navigate("/onboarding")}
                    className="text-indigo-600 hover:text-indigo-500 font-medium p-0 h-auto"
                  >
                    Sign up for free
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
