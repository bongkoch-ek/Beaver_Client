import React, { useEffect, useState } from "react";
import TaskMember from "./TaskMember";
import TaskLane from "./TaskLane";
import useDashboardStore from "../stores/dashboardStore";

export default function ProjectTask() {
  const project = useDashboardStore((state) => state.project);
  const newProject = project?.list;

  const updatedList = newProject?.map((item) => {
    return {
      ...item,
      task:
        item.task?.map((t) => ({
          ...t,
          status: item.status, // Inserting the status into each task object
          listId: item.id,
        })) || [],
    };
  });

  const newTask = updatedList?.flatMap((item) => item.task);
  const [allList, setAllList] = useState(updatedList);
  const [taskCard, setTaskCard] = useState(newTask);

  useEffect(() => {
    if (updatedList) {
      setAllList(updatedList);
    }
  }, [project]);

  useEffect(() => {
    if (newTask) {
      setTaskCard(newTask);
    }
  }, [project]);

  const hdlTaskMove = (taskId, newStatus) => {
    setTaskCard((prev) => {
      return prev?.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    });
  };

  const sortedList = allList?.sort((a, b) => {
    const statusOrder = {
      TODO: 1,
      INPROGRESS: 2,
      DONE: 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="flex bg-gray-100 w-[90%] mx-auto pt-[40px] ">
      <div className="h-full w-full px-10 pt-10 py-16 bg-white rounded-[64px] flex-col justify-start items-start gap-10 inline-flex">
        <TaskMember />
        <TaskLane
          taskCard={taskCard}
          setTaskCard={setTaskCard}
          sortedList={sortedList}
          hdlTaskMove={hdlTaskMove}
          allList={allList}
          setAllList={setAllList}
        />
      </div>
    </div>
  );
}
