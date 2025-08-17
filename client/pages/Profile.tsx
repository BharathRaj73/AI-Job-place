import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Plus,
  X,
  Save,
  LogOut
} from "lucide-react";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  experience: string;
  education: string;
  skills: string[];
  userType: string;
  isAuthenticated: boolean;
  profileCompleted: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    experience: "",
    education: "",
    skills: [],
    userType: "job_seeker",
    isAuthenticated: false,
    profileCompleted: false,
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setProfile(user);
    } else {
      // If no user data, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!profile.firstName || !profile.lastName || !profile.title) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update user data in localStorage
      const updatedProfile = { ...profile, profileCompleted: true };
      localStorage.setItem("user", JSON.stringify(updatedProfile));
      
      // Navigate to dashboard
      navigate("/dashboard/job-seeker");
    } catch (error) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 grid place-items-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">JobMatch AI</span>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div {...fadeUp(0)} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h1>
          <p className="text-slate-600">
            Tell us about yourself to get personalized job matches
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6"
          >
            <p className="text-red-600 font-medium">{error}</p>
          </motion.div>
        )}

        <div className="grid gap-6">
          {/* Basic Information */}
          <motion.div {...fadeUp(0.1)}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={profile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={profile.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Information */}
          <motion.div {...fadeUp(0.2)}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="Senior Frontend Developer"
                    value={profile.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select
                    value={profile.experience}
                    onValueChange={(value) => handleInputChange("experience", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9-12">9-12 years</SelectItem>
                      <SelectItem value="13+">13+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Brief description of your professional background and career goals..."
                    value={profile.summary}
                    onChange={(e) => handleInputChange("summary", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div {...fadeUp(0.3)}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="education">Highest Education</Label>
                  <Select
                    value={profile.education}
                    onValueChange={(value) => handleInputChange("education", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="bootcamp">Coding Bootcamp</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeUp(0.4)}>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g., React, Python, Project Management)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div {...fadeUp(0.5)} className="flex justify-end pt-6">
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition shadow-md hover:shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Profile & Continue"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
