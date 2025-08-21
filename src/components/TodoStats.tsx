import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Target } from "lucide-react";
import { useQuery } from "convex/react";

export function TodoStats() {
  const stats = useQuery(api.todos.getTodoStats);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="h-16 bg-green-100 dark:bg-green-900/30 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      icon: Target,
      label: "Total Tasks",
      value: stats.total,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-700",
    },
    {
      icon: Circle,
      label: "Active Tasks",
      value: stats.active,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/30",
      borderColor: "border-amber-200 dark:border-amber-700",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: stats.completed,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`hover:shadow-lg transition-all duration-200 border-2 ${item.borderColor} hover:scale-105 bg-white/80 dark:bg-green-950/50 backdrop-blur-sm`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${item.bgColor} border ${item.borderColor}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium">{item.label}</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
