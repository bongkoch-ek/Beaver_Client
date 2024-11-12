import React, { useEffect, useState } from "react";
import Task from "./Task";
import StatusColums from "./StatusColums";
import AddNewStatus from "./AddNewStatus";
import useUserStore from "../stores/userStore";
import useDashboardStore from "../stores/dashboardStore";

export default function TaskLane() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const actionGetProjectById = useDashboardStore(
    (state) => state.actionGetProjectById
  );
  const project = useDashboardStore((state) => state.project);

  const newProject = project?.list;

  // useEffect(() => {
  //   actionGetProjectById(1,token)
  // })
// console.log(project , "projecttt")
  // DATA FOR TESTING FEATURE DRAG AND DROP
  // const DEFAULT_TASKS = [
  //   // To do
  //   { title: "Look into render bug in dashboard", id: "1", column: "To do" },
  //   { title: "SOX compliance checklist", id: "2", column: "To do" },
  //   { title: "[SPIKE] Migrate to Azure", id: "3", column: "To do" },
  //   { title: "Document Notifications service", id: "4", column: "To do" },

  //   // In progress
  //   {
  //     title: "Research DB options for new microservice",
  //     id: "5",
  //     column: "In progress",
  //   },
  //   { title: "Postmortem for outage", id: "6", column: "In progress" },
  //   {
  //     title: "Sync with product on Q3 roadmap",
  //     id: "7",
  //     column: "In progress",
  //   },

  //   // Done
  //   {
  //     title: "Refactor context providers to use Zustand",
  //     id: "8",
  //     column: "Done",
  //   },
  //   { title: "Add logging to daily CRON", id: "9", column: "Done" },

  //   // Late
  //   {
  //     title: "Set up DD dashboards for Lambda listener",
  //     id: "10",
  //     column: "Late",
  //   },
  // ];

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
  console.log(allList)

  return (
    <div className="self-stretch justify-start items-start gap-4 inline-flex max-w-">
      {allList?.map((item) => (
        <StatusColums
          key={item?.id}
          item={item}
          title={item?.title}
          taskCard={taskCard}
          setTaskCard={setTaskCard}
          hdlTaskMove={hdlTaskMove}
          status={item?.status}
          allList={allList}
          setAllList={setAllList}
        />
      ))}
      <AddNewStatus setAllList={setAllList} />
    </div>
  );
}
