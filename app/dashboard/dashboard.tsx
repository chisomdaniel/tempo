import CreateForm from "../components/create-form";
import { useState, useEffect } from "react";
import type { displayState } from "../shared/types";
import Timer from "../components/timer";
import HistoryItem from "../components/history-item";
import db from "~/utils/db.service";
import type { Task } from "../shared/types";

export function Dashboard() {
  const [minutes, setMinutes] = useState(25);
  const [startTimer, setStartTimer] = useState(false);
  const [displayState, setDisplayState] = useState<displayState>("action");
  const [sessionsCount, setSessionsCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState("User");

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
            <div className="task-card surface-card rounded-2xl w-40 h-40 p-6 shrink-0 flex flex-col gap-4 justify-between">
              <span className="bg-(--color-bg-2) w-10 h-10 rounded-full grid place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <div>
                <h3 className="text-body-md">Coding</h3>
                <p className="text-label-md">90 Min</p>
              </div>
            </div>
            <div className="task-card surface-card rounded-2xl w-40 h-40 p-6 shrink-0 flex flex-col gap-4 justify-between">
              <span className="bg-(--color-bg-2) w-10 h-10 rounded-full grid place-content-center">
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
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </span>
              <div>
                <h3 className="text-body-md">Reading</h3>
                <p className="text-label-md">45 Min</p>
              </div>
            </div>
            <div className="task-card surface-card rounded-2xl w-40 h-40 p-6 shrink-0 flex flex-col gap-4 justify-between">
              <span className="bg-(--color-bg-2) w-10 h-10 rounded-full grid place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                </svg>
              </span>

              <div>
                <h3 className="text-body-md">Writing</h3>
                <p className="text-label-md">50 Min</p>
              </div>
            </div>
          </div>
        </section>

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
