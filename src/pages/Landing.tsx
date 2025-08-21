import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Plus, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">TodoFlow</span>
        </Link>
        <AuthButton
          trigger={
            <Button size="lg" className="shadow-lg">
              Get Started Free
            </Button>
          }
          dashboardTrigger={
            <Button size="lg" variant="outline">
              <Link to="/dashboard">Open App</Link>
            </Button>
          }
        />
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-accent/50 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Simple. Fast. Beautiful.</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Organize Your Life
            <br />
            <span className="text-primary">Effortlessly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The most intuitive todo app that helps you stay focused, organized, and productive. 
            Beautiful design meets powerful functionality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <AuthButton
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Start Organizing Now
                </Button>
              }
              dashboardTrigger={
                <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                  <Link to="/dashboard" className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Open TodoFlow
                  </Link>
                </Button>
              }
            />
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-accent/30 rounded-lg">
                  <div className="w-5 h-5 border-2 border-primary rounded-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.3 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  </div>
                  <span className="font-medium">Complete project proposal</span>
                  <div className="ml-auto">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">High</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg opacity-75">
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                  <span className="text-muted-foreground">Review team feedback</span>
                  <div className="ml-auto">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Medium</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg opacity-50">
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                  <span className="text-muted-foreground">Update documentation</span>
                  <div className="ml-auto">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Low</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and beautifully.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: CheckCircle,
              title: "Smart Organization",
              description: "Organize tasks with priorities, filters, and smart categorization."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Instant sync across devices with real-time updates and offline support."
            },
            {
              icon: Sparkles,
              title: "Beautiful Design",
              description: "Clean, modern interface that makes task management a joy."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                <CardContent className="p-0">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TodoFlow.
          </p>
          <AuthButton
            trigger={
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            }
            dashboardTrigger={
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl">
                <Link to="/dashboard" className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Open TodoFlow
                </Link>
              </Button>
            }
          />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 TodoFlow. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}