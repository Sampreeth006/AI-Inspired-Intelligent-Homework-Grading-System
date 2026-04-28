import React from "react";
import {  
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function Analysis({ submissions }) {
  const avgAll = Math.round(
    submissions.reduce((sum, s) => sum + s.average, 0) / submissions.length
  );
  const data = submissions.map((s, i) => ({
    name: `Stu ${i + 1}`,
    score: s.average,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="space-y-4"
    >
      <p className="text-lg">
        Overall Average: <span className="font-bold">{avgAll}%</span>
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}