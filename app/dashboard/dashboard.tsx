import CreateForm from "../components/create-form";
import { useState, useEffect } from "react";
import type { displayState, QuickTask } from "../shared/types";
import Timer from "../components/timer";
import HistoryItem from "../components/history-item";
import db from "~/utils/db.service";
import type { Task } from "../shared/types";
import Modal from "../components/modal";
import SaveTaskForm from "../components/save-task-form";
import Svg from "../components/svg";
import SavedTasks from "../components/saved-tasks";

export function Dashboard() {
  const [minutes, setMinutes] = useState(25);
  const [startTimer, setStartTimer] = useState(false);
  const [displayState, setDisplayState] = useState<displayState>("action");
  const [sessionsCount, setSessionsCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([]);
  const [username, setUsername] = useState("User");

  // Multi-purpose modal states
  const [isCreateSavedOpen, setIsCreateSavedOpen] = useState(false);
  const [selectedQuickTask, setSelectedQuickTask] = useState<QuickTask | null>(
    null,
  );

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) {
      const name = prompt("Please enter your name:") || "User";
      localStorage.setItem("username", JSON.stringify(name));
      setUsername(name);
    } else {
      setUsername(JSON.parse(storedName));
    }
  }, []);

  useEffect(() => {
    db.getAllData().then((data) => setTasks(data));
    db.getQuickTasks().then((data) => setQuickTasks(data));
  }, []);

  const handleStartNewTask = () => {
    setDisplayState("create");
  };

  const handleStartSavedTask = () => {
    document
      .getElementById("saved-tasks")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="layout-container mt-6">
        <nav className="nav flex justify-between">
          <img src="/logo.png" alt="logo" />
          {/* <ul className="flex">
            <a>
              <li>Home</li>
            </a>
            <a>
              <li>Analytics</li>
            </a>
            <a>
              <li>Tasks</li>
            </a>
            <a>
              <li>Profile</li>
            </a>
          </ul> */}
          <div className="profile">
            {/* <img src="profile.png" alt="Profile"></img> */}
          </div>
        </nav>
        <section className="greeting">
          <h1 className="text-headline-lg">Good morning, {username}.</h1>
          <div className="text-body-md flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
            <p>Wednesday, May 27</p>
            <span className="chip">{sessionsCount} Scheduled Sessions</span>
          </div>
        </section>
      </header>
      <main className="layout-container flex flex-col gap-20 pt-12">
        <section className="time-card surface-card self-center my-8 md:p-12 p-6 rounded-r-3xl flex flex-col items-center gap-8">
          {displayState === "action" && (
            <div className="actions flex items-center gap-4">
              <button
                className="text-body-md btn-primary"
                onClick={handleStartNewTask}
              >
                Start new task
              </button>
              <button
                className="text-body-md btn-secondary"
                onClick={handleStartSavedTask}
              >
                Select saved task
              </button>
            </div>
          )}

          {displayState === "create" && (
            <CreateForm
              setDisplayState={setDisplayState}
              setStartTimer={setStartTimer}
              setMinutes={setMinutes}
              setSessionsCount={setSessionsCount}
              setTasks={setTasks}
            />
          )}

          {displayState === "timer" && (
            <Timer
              minutes={minutes}
              onComplete={() => {
                setDisplayState("action");
                alert("Session complete!");
              }}
            />
          )}
        </section>
        <section id="saved-tasks" className="saved-tasks">
          <h2 className="text-headline-md">Quick Start</h2>
          <div
            aria-label="Saved tasks"
            className="saved-tasks-list flex gap-6 mt-6 w-full overflow-x-scroll no-scrollbar"
          >
            {quickTasks.map((qt) => (
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
            ))}

            <div
              className="task-card surface-card rounded-2xl w-40 h-40 p-6 shrink-0 flex flex-col gap-4 justify-between cursor-pointer hover:bg-(--color-surface-container-highest) transition-colors border border-dashed border-(--color-outline)"
              onClick={() => setIsCreateSavedOpen(true)}
            >
              <span className="bg-(--color-bg-2) w-12 h-12 rounded-full grid place-content-center mx-auto mt-4 text-(--color-on-surface)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>

              <div>
                <h3 className="text-body-md text-center">Add New</h3>
              </div>
            </div>
          </div>
        </section>
        <Modal
          isOpen={isCreateSavedOpen}
          onClose={() => setIsCreateSavedOpen(false)}
        >
          <SaveTaskForm
            onClose={() => {
              setIsCreateSavedOpen(false);
              db.getQuickTasks().then((data) => setQuickTasks(data));
            }}
            setQuickTasks={setQuickTasks}
          />
        </Modal>

        <Modal
          isOpen={!!selectedQuickTask}
          onClose={() => setSelectedQuickTask(null)}
        >
          {selectedQuickTask && (
            <SavedTasks
              selectedQuickTask={selectedQuickTask}
              setTasks={setTasks}
              setMinutes={setMinutes}
              setDisplayState={setDisplayState}
              setSelectedQuickTask={setSelectedQuickTask}
              setSessionsCount={setSessionsCount}
            />
          )}
        </Modal>

        <section className="today-history*: pb-16">
          <h2 className="text-headline-md mb-12">Today's Flow</h2>
          <ul className="today-history flex flex-col gap-6">
            {tasks.length === 0 ? (
              <p className="text-label-md">No sessions scheduled yet.</p>
            ) : (
              tasks.map((task) => (
                <HistoryItem
                  taskName={task.taskName}
                  mins={Number(task.mins)}
                  startTime={task.startTime}
                  id={task.id}
                  icon={task.icon}
                />
              ))
            )}
          </ul>
        </section>
      </main>

      {/* <footer className="layout-container">
        <ul>
          <a>
            <li>Home</li>
          </a>
          <a>
            <li>Analytics</li>
          </a>
          <a>
            <li>Tasks</li>
          </a>
          <a>
            <li>Profile</li>
          </a>
        </ul>
      </footer> */}
    </>
  );
}
