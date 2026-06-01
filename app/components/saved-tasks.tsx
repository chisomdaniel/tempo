import db from "~/utils/db.service";
import type { displayState, Task, QuickTask } from "../shared/types";
import type { Dispatch, SetStateAction } from "react";

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
