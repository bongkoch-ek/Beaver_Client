import React, { useState } from "react";
import Task from "./Task";
import StatusColums from "./StatusColums";
import AddNewStatus from "./AddNewStatus";

export default function TaskLane() {
  // DATA FOR TESTING FEATURE DRAG AND DROP
  const DEFAULT_TASKS = [
    // To do
    { title: "Look into render bug in dashboard", id: "1", column: "To do" },
    { title: "SOX compliance checklist", id: "2", column: "To do" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "To do" },
    { title: "Document Notifications service", id: "4", column: "To do" },

    // In progress
    {
      title: "Research DB options for new microservice",
      id: "5",
      column: "In progress",
    },
    { title: "Postmortem for outage", id: "6", column: "In progress" },
    {
      title: "Sync with product on Q3 roadmap",
      id: "7",
      column: "In progress",
    },

    // Done
    {
      title: "Refactor context providers to use Zustand",
      id: "8",
      column: "Done",
    },
    { title: "Add logging to daily CRON", id: "9", column: "Done" },

    // Late
    {
      title: "Set up DD dashboards for Lambda listener",
      id: "10",
      column: "Late",
    },
  ];
  const [taskCard, setTaskCard] = useState(DEFAULT_TASKS);


  const hdlTaskMove = (taskId, newStatus) => {
    setTaskCard((prev) => {
      return prev.map((task) =>
        task.id === taskId ? { ...task, column: newStatus } : task
      );
    });
  };

  return (
    <div className="self-stretch justify-start items-start gap-4 inline-flex ">
      <StatusColums
        taskCard={taskCard}
        setTaskCard={setTaskCard}
        hdlTaskMove={hdlTaskMove}
        status="To do"
      />
      <StatusColums
        taskCard={taskCard}
        setTaskCard={setTaskCard}
        hdlTaskMove={hdlTaskMove}
        status="In progress"
      />
      <StatusColums
        taskCard={taskCard}
        setTaskCard={setTaskCard}
        hdlTaskMove={hdlTaskMove}
        status="Done"
      />
      <StatusColums
        taskCard={taskCard}
        setTaskCard={setTaskCard}
        hdlTaskMove={hdlTaskMove}
        status="Late"
      /> 
      <AddNewStatus/>
    </div>
  );
}
