import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import useDashboardStore from "@/src/stores/dashboardStore";

export function ProjectDashboard() {
  const project = useDashboardStore((state) => state.project);


  const result = project?.list?.map((el)=> {
    return el.status
  })

  console.log(result)
// แยก list ตามสถานะ
const todoList = project.list.filter(item => item.status === "TODO");
const inProgressList = project.list.filter(item => item.status === "INPROGRESS");
const doneList = project.list.filter(item => item.status === "DONE");

// ดึง task ของแต่ละประเภทและรวมเป็นอาร์เรย์เดียว
const todoTasks = todoList.map(item => item.task).flat();
const inProgressTasks = inProgressList.map(item => item.task).flat();
const doneTasks = doneList.map(item => item.task).flat();


  const chartData = [
    { Status: "Done", value: Number(doneTasks.length), fill: "#43A047" },
    { Status: "In progress", value: Number(inProgressTasks.length), fill: "#5DB9F8" },
    { Status: "Todo", value: Number(todoTasks.length), fill: "#91959A" },
  ];
  console.log(Number(inProgressTasks))
  console.log(project)

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const calculatePercentages = (data) => {
    return data.map((entry) => ({
      ...entry,
      percentage: totalValue ? ((entry.value / totalValue) * 100).toFixed(0) + "%" : "0%",
    }));
  };

  const dataWithPercentages = calculatePercentages(chartData);

  // Check if "Done" is 100%
  const isDoneFullCircle = dataWithPercentages[0].percentage === "100%";

  return (
    <div className="flex bg-gray-100 w-[90%] mx-auto pt-[40px]">
      <div className="w-full px-10 py-16 bg-white rounded-[64px] flex-col justify-start items-start gap-16 inline-flex">
        <div className="text-[30px] mx-auto">Project Status Overview</div>

        <Card className="w-full flex ml-[140px] items-center overflow-hidden shadow-none border-none">
          <CardHeader className="text-center pb-4"></CardHeader>

          <CardContent className="w-full flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={isDoneFullCircle ? [{ ...dataWithPercentages[0] }] : dataWithPercentages}
                  dataKey="value"
                  nameKey="Status"
                  innerRadius={90}
                  outerRadius={150}
                  startAngle={90} // Start at top
                  endAngle={isDoneFullCircle ? 450 : -270} // Full circle if 100%, else regular
                  paddingAngle={isDoneFullCircle ? 0 : 5}
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
