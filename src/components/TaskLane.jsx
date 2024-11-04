import React from "react";
import Task from "./Task";
import StatusColums from "./StatusColums";

export default function TaskLane() {
  return (


    <div className="self-stretch justify-center items-start gap-4 inline-flex ">
            <StatusColums />
            <StatusColums />
            <StatusColums />
            <StatusColums />
    </div>
  );
}
