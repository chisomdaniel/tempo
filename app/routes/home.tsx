import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Dashboard } from "../dashboard/dashboard";
// import "../styles/base.css";
import "../styles/dashboard.css";

export default function Home() {
  return <Dashboard />;
}
