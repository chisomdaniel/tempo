import { useState } from "react";
import "../styles/create-form.css";
import db from "~/utils/db.service";
import type { QuickTask } from "../shared/types";
import type { Dispatch, SetStateAction } from "react";

interface SaveTaskFormProps {
  setQuickTasks: Dispatch<SetStateAction<QuickTask[]>>;
  onClose: () => void;
}

export default function SaveTaskForm({
  setQuickTasks,
  onClose,
}: SaveTaskFormProps) {
  const [formData, setFormData] = useState<Omit<QuickTask, "id">>({
    taskName: "",
    desc: "",
    mins: 0,
    icon: "calendar", // default
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await db.addQuickTask(formData);
    const allQuickTasks = await db.getQuickTasks();
    setQuickTasks(allQuickTasks);
    onClose();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-headline-md mb-2">Create Saved Task</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="taskName">Task:</label>
        <input
          type="text"
          name="taskName"
          id="taskName"
          placeholder="e.g. Code Review"
          className="input-base"
          value={formData.taskName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Details..."
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
          required
          min="1"
        />
      </div>

      <input type="submit" value="Save Task" className="btn-primary mt-4" />
    </form>
  );
}
