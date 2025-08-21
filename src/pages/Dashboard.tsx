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
import { CheckCircle, Filter, Loader2, Sparkles, Leaf } from "lucide-react";
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
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        </div>
      </Protected>
    );
  }

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">TodoFlow</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-green-700 dark:text-green-300 hidden sm:block">
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
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full px-4 py-2 mb-4 border border-green-200 dark:border-green-700"
              >
                <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Your Productivity Hub</span>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Your Tasks
              </h1>
              <p className="text-green-700 dark:text-green-300">
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
                <Filter className="w-4 h-4 text-green-600 dark:text-green-400" />
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-[180px] border-green-200 dark:border-green-700 focus:ring-green-500">
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
                <Card className="text-center py-12 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm border-green-200 dark:border-green-800">
                  <CardContent>
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 dark:border-green-700">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">
                        {filter === "all" && "No todos yet"}
                        {filter === "active" && "No active todos"}
                        {filter === "completed" && "No completed todos"}
                      </h3>
                      <p className="text-green-600 dark:text-green-400 mb-4">
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
                className="text-center mt-8 text-sm text-green-600 dark:text-green-400"
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