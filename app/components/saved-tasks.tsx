import db from "~/utils/db.service";
import type { displayState, Task, QuickTask } from "../shared/types";
import type { Dispatch, SetStateAction } from "react";
import Svg from "./svg";

interface savedTasksTileProps {
  qt: QuickTask;
  setSelectedQuickTask: Dispatch<SetStateAction<QuickTask | null>>;
}

export function SavedTasksTile({
  qt,
  setSelectedQuickTask,
}: savedTasksTileProps) {
  return (
    <div
      key={qt.id}
      className="task-card surface-card rounded-2xl w-40 h-40 p-6 shrink-0 flex flex-col gap-4 justify-between cursor-pointer hover:bg-(--color-surface-container-highest) transition-colors"
      onClick={() => setSelectedQuickTask(qt)}
    >
      <span className="bg-(--color-bg-2) w-10 h-10 rounded-full grid place-content-center">
        <Svg name={qt.icon} />
      </span>
      <div>
        <h3 className="text-body-md whitespace-nowrap overflow-hidden text-ellipsis">
          {qt.taskName}
        </h3>
        <p className="text-label-md">{qt.mins} Min</p>
      </div>
    </div>
  );
}

interface SavedTasksProps {
  selectedQuickTask: QuickTask;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setDisplayState: Dispatch<SetStateAction<displayState>>;
  setSelectedQuickTask: Dispatch<SetStateAction<QuickTask | null>>;
  setSessionsCount: Dispatch<SetStateAction<number>>;
}

export default function SavedTasks({
  selectedQuickTask,
  setTasks,
  setMinutes,
  setDisplayState,
  setSelectedQuickTask,
  setSessionsCount,
}: SavedTasksProps) {
  const handleStartQuickTask = async () => {
    const newTask = {
      taskName: selectedQuickTask.taskName,
      desc: selectedQuickTask.desc,
      mins: selectedQuickTask.mins,
      icon: selectedQuickTask.icon,
      startTime: String(Date.now()),
      endTime: "",
      status: "in-progress" as Task["status"],
      id: 0, // will be set by DBservice
    };

    // await db operations
    await db.addData(newTask);
    const allTasks = await db.getAllData();

    // set actual task array from db
    setTasks(allTasks);

    setMinutes(selectedQuickTask.mins);
    setDisplayState("timer");
    setSelectedQuickTask(null);
    setSessionsCount((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-headline-md mb-4">{selectedQuickTask.taskName}</h2>
      <p className="text-body-md mb-6">{selectedQuickTask.desc}</p>
      <button
        className="btn-primary text-body-md"
        onClick={handleStartQuickTask}
      >
        Start Task
      </button>
    </div>
  );
}
