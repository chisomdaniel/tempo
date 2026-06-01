// import { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import "../styles/timer.css";

interface CountdownTimerProps {
  minutes: number;
  onComplete: () => void;
}

export default function CountdownTimer({
  minutes,
  onComplete,
}: CountdownTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [active, setActive] = useState<"pause" | "play">("play");

  // Reset timer when minutes change
  useEffect(() => {
    setRemainingSeconds(minutes * 60);
    setIsRunning(true);
  }, [minutes]);

  // update the timer every secs if running or secs remains
  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  // end the timer
  useEffect(() => {
    if (remainingSeconds === 0) {
      setIsRunning(false);
      onComplete?.();
    }
  }, [remainingSeconds, onComplete]);

  const handlePause = () => {
    setIsRunning(false);
    setActive("pause");
  };

  const handlePlay = () => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
      setActive("play");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setRemainingSeconds(0);
  };

  const hours = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  return (
    <>
      <div className="timer count-down flex flex-col items-center">
        <p className="text-headline-lg">
          {hours.toString().padStart(2, "0")}:{mins.toString().padStart(2, "0")}
          :{secs.toString().padStart(2, "0")}
        </p>
        <span className="chip">
          of {minutes.toString()} {minutes > 1 ? "mins" : "min"} session
        </span>
      </div>

      <div className="controls flex justify-evenly gap-4">
        <button
          className={`cntr text-body-md btn-secondary rounded-full w-12 h-12 p-0 flex items-center justify-center ${active === "pause" ? "is-active" : ""}`}
          onClick={handlePause}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className={`cntr text-body-md btn-primary flex align-middle items-center gap-2 ${active === "play" ? "is-active" : ""}`}
          onClick={handlePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          Resume
        </button>
        <button
          className="text-body-md btn-secondary rounded-full w-12 h-12 p-0 flex items-center justify-center"
          onClick={handleStop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
