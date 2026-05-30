import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import "../styles/create-form.css";

const schema = z.object({
  name: z.string().min(1, "Provide a name for the activity"),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Provide a valid time in HH:MM format",
    ),
});

export default function CreateForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      desc: "",
      endTime: "",
    },
  });

  return (
    <form
      id="create-form"
      className="flex flex-col gap-4 bg-(--color-surface-container-high) p-4 rounded-lg"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="taskName">Task:</label>
        <input
          type="text"
          name="taskName"
          id="taskName"
          placeholder="Study"
          className="input-base"
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
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="endTime">End Time:</label>
        <input type="time" name="endTime" id="endTime" className="input-base" />
      </div>

      <input type="submit" value="Start" className="btn-secondary" />
    </form>
  );
}
