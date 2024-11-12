import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import TaskMember from "@/src/components/TaskMember";

const chartData = [
  { Status: "Done", value: 10, fill: "#43A047" },
  { Status: "In progress", value: 5, fill: "#5DB9F8" },
  { Status: "Late", value: 4, fill: "#E53935" },
];

const calculatePercentages = (data) => {
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  return data.map((entry) => ({
    ...entry,
    percentage: ((entry.value / totalValue) * 100).toFixed(0) + "%",
  }));
};

const dataWithPercentages = calculatePercentages(chartData);

export function ProjectDashboard() {
  return (
    <div className="flex bg-gray-100 w-[90%] mx-auto pt-[40px]">
      <div className=" w-full px-10 py-16 bg-white rounded-[64px] flex-col justify-start items-start gap-16 inline-flex">
      <div className="text-[30px] mx-auto">Project Status Overview</div>
            {/* <TaskMember /> */}

        <Card className="w-full flex ml-[140px] items-center overflow-hidden shadow-none border-none">
          <CardHeader className="text-center pb-4">
            {/* <CardTitle></CardTitle> */}

          </CardHeader>

          <CardContent className="w-full flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={dataWithPercentages}
                  dataKey="value"
                  nameKey="Status"
                  innerRadius={90}
                  outerRadius={150}
                  paddingAngle={5}
                  label={({ percentage }) => percentage}
                  labelLine={false}
                >
                  {dataWithPercentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>

          {/* Custom Legend */}
          <CardFooter className="w-full flex flex-col justify-center gap-8 text-[26px]">
            {dataWithPercentages.map((entry) => (
              <div
                key={entry.Status}
                className="flex items-center gap-2"
                style={{ color: entry.fill }}
              >
                <span
                  className="w-3 h-3 inline-block rounded-full"
                  style={{ backgroundColor: entry.fill }}
                ></span>
                {entry.Status}: {entry.percentage}
              </div>
            ))}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
