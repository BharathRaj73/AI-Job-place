import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const isJobSeeker = type === "job-seeker";
  const title = isJobSeeker ? "Job Seeker Dashboard" : "Recruiter Dashboard";
  const description = isJobSeeker
    ? "Find your next opportunity with AI-powered job matching"
    : "Discover top talent with intelligent candidate matching";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            JobMatch AI
          </h1>
        </div>

        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-foreground">
              {title}
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-lg">{description}</p>
          </CardHeader>

          <CardContent className="text-center py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center shadow-inner">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Dashboard Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                This page is currently under development. Your{" "}
                {isJobSeeker ? "job matching" : "talent discovery"} dashboard
                will be available here soon.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => navigate("/onboarding")}
                  className="px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Complete Setup Again
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
