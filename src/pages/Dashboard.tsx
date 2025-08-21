// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { AddTodoDialog } from "@/components/AddTodoDialog";
import { TodoItem } from "@/components/TodoItem";
import { TodoStats } from "@/components/TodoStats";
import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [hasSeeded, setHasSeeded] = useState(false);

  const todos = useQuery(api.todos.getTodos);
  const seedTodos = useMutation(api.todos.seedTodos);

  // Seed initial todos for new users
  useEffect(() => {
    if (todos && todos.length === 0 && !hasSeeded) {
      seedTodos()
        .then(() => {
          setHasSeeded(true);
          toast.success("Welcome! We've added some sample todos to get you started.");
        })
        .catch(() => {
          setHasSeeded(true);
        });
    }
  }, [todos, hasSeeded, seedTodos]);

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  }) || [];

  if (!todos) {
    return (
      <Protected>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      </Protected>
    );
  }

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
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
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome back, {user?.name || user?.email}!
                </span>
                <UserButton />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your Productivity Hub</span>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Your Tasks
              </h1>
              <p className="text-muted-foreground">
                Stay organized and get things done efficiently
              </p>
            </div>

            {/* Stats */}
            <TodoStats />

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="active">Active Tasks</SelectItem>
                    <SelectItem value="completed">Completed Tasks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <AddTodoDialog />
            </motion.div>

            {/* Todo List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredTodos.length === 0 ? (
                <Card className="text-center py-12 bg-card/50 backdrop-blur-sm">
                  <CardContent>
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {filter === "all" && "No todos yet"}
                        {filter === "active" && "No active todos"}
                        {filter === "completed" && "No completed todos"}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {filter === "all" && "Create your first todo to get started!"}
                        {filter === "active" && "All your tasks are completed! 🎉"}
                        {filter === "completed" && "Complete some tasks to see them here."}
                      </p>
                      {filter === "all" && <AddTodoDialog />}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredTodos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Footer */}
            {filteredTodos.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center mt-8 text-sm text-muted-foreground"
              >
                Showing {filteredTodos.length} of {todos.length} tasks
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Protected>
  );
}