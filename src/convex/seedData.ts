import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const seedTodos = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if user already has todos
    const existingTodos = await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (existingTodos.length > 0) {
      return { message: "User already has todos" };
    }

    // Create sample todos
    const sampleTodos = [
      {
        title: "Welcome to your Todo App!",
        description: "This is your first todo. Click the checkbox to mark it as complete.",
        completed: false,
        priority: "high" as const,
        userId,
      },
      {
        title: "Create your first custom todo",
        description: "Click the + button to add a new todo item.",
        completed: false,
        priority: "medium" as const,
        userId,
      },
      {
        title: "Explore the features",
        description: "Try filtering todos, editing them, and marking them as complete.",
        completed: false,
        priority: "low" as const,
        userId,
      },
    ];

    for (const todo of sampleTodos) {
      await ctx.db.insert("todos", todo);
    }

    return { message: "Sample todos created successfully" };
  },
});
