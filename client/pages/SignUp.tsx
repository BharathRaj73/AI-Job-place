import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get user type from navigation state (from onboarding)
  const userType = location.state?.userType || "job_seeker";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Create user data and login (in real app, this would be handled by backend)
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // Store password for validation
        userType: userType,
        isAuthenticated: true,
        profileCompleted: true,
        phone: "",
        location: "",
        title: "",
        summary: "",
        experience: "",
        education: "",
        skills: [],
      };

      // Store user in localStorage for later login validation
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      login(userData);
      
      // Navigate to profile page to complete setup
      navigate("/profile");
    } catch (error) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Simulate Google sign up
    const userData = {
      id: Date.now(),
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      userType: "job_seeker",
      isAuthenticated: true,
      profileCompleted: false,
      skills: [], // Initialize empty skills array
    };

    login(userData);
    navigate("/profile");
  };

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
                onClick={() => navigate("/onboarding")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
              <p className="text-slate-500">Join JobMatch AI and find your dream job</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 border border-red-300 rounded-lg p-3 mb-6"
              >
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <div className="space-y-5">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 h-12 border-slate-300 hover:bg-slate-50 transition"
                onClick={handleGoogleSignUp}
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

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10 h-12 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10 h-12 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 h-12 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
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
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="text-indigo-600 hover:text-indigo-500 font-medium p-0 h-auto"
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
