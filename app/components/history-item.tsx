import Svg, { type SvgName } from "./svg";
import "../styles/history.css";

interface HistoryItemProps {
  taskName: string;
  mins: number;
  startTime: string;
  id: number | string;
  icon: SvgName;
}

export default function HistoryItem({
  taskName,
  mins,
  startTime,
  id,
  icon,
}: HistoryItemProps) {
  const timeObj = new Date(Number(startTime));
  const timeString = timeObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className="history-item" key={id}>
      <p className="text-label-md pb-3">{timeString}</p>
      <div className="h-item surface-card p-6 rounded-lg">
        <Svg name={icon} />
        <div className="flex flex-col gap-1">
          <h3 className="text-body-md">{taskName}</h3>
          <p className="text-label-md">
            {mins > 1 ? `${mins} Mins` : `${mins} Min`}
          </p>
        </div>
        <Svg name="checkmark" />
      </div>
    </li>
  );
}
