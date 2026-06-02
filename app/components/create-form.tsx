import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import "../styles/create-form.css";
import db from "~/utils/db.service";
import type { displayState, Task } from "../shared/types";
import type { Dispatch, SetStateAction } from "react";

// const schema = z.object({
//   name: z.string().min(1, "Provide a name for the activity"),
//   endTime: z
//     .string()
//     .regex(
//       /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
//       "Provide a valid time in HH:MM format",
//     ),
// });

interface CreateFormProps {
  setDisplayState: Dispatch<SetStateAction<displayState>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  setSessionsCount: Dispatch<SetStateAction<number>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export default function CreateForm({
  setDisplayState,
  setMinutes,
  setSessionsCount,
  setTasks,
}: CreateFormProps) {
  // const form = useForm({
  //   defaultValues: {
  //     name: "",
  //     desc: "",
  //     endTime: "",
  //   },
  // });

  const [formData, setFormData] = useState<Task>({
    taskName: "",
    desc: "",
    mins: 0,
    endTime: "",
    startTime: "",
    status: "in-progress",
    icon: "calendar",
    id: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      // convert number field type to number before saving
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      ...formData,
      startTime: String(Date.now()),
    };

    // update local form state
    setFormData(newTask);

    // await db operations
    await db.addData(newTask);
    const allTasks = await db.getAllData();

    // set actual task array from db
    setTasks(allTasks);

    setDisplayState("timer");
    // setStartTimer(true);
    setMinutes(newTask.mins || 0);
    setSessionsCount((prev) => prev + 1);
    console.log(newTask);
  };

  return (
    <form
      id="create-form"
      className="flex flex-col gap-4 bg-(--color-surface-container-high) p-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="taskName">Task:</label>
        <input
          type="text"
          name="taskName"
          id="taskName"
          min="1"
          step="1"
          placeholder="Study"
          className="input-base"
          value={formData.taskName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Study for the exam"
          className="input-base"
          value={formData.desc}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mins">Duration (in minutes):</label>
        <input
          type="number"
          name="mins"
          id="mins"
          placeholder="25"
          className="input-base"
          value={formData.mins}
          onChange={handleChange}
        />
      </div>

      <input type="submit" value="Start" className="btn-secondary" />
    </form>
  );
}
