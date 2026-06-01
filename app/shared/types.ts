// export type TimerState = "create"
import { type SvgName } from "../components/svg";

export type displayState = "action" | "create" | "edit" | "timer";

export interface Timer {
  id: number;
  name: string;
  desc: string;
  startTime: string;
  endTime: string;
}

export interface Task {
  id: number;
  taskName: string;
  desc: string;
  mins: number;
  startTime: string;
  endTime: string;
  icon: SvgName;
  status: "completed" | "pending" | "in-progress";
}
