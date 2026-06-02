import SvgComponents from "../assets/svgs";

export type SvgName = keyof typeof SvgComponents;

export default function Svg({ name }: { name: SvgName }) {
  const SvgComponent = SvgComponents[name];
  if (!SvgComponent) {
    return null; // or some fallback UI
  }
  return <SvgComponent />;
}

export function SvgInput({
  required = false,
  setSelectedIcon,
}: {
  required?: boolean;
  setSelectedIcon: (icon: SvgName) => void;
}) {
  return (
    <div>
      <p>Select Icon</p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(SvgComponents).map((key) => (
          <button
            key={key}
            type="button"
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => {
              // Handle icon selection
              setSelectedIcon(key as SvgName);
            }}
          >
            {SvgComponents[key as SvgName]()}
          </button>
        ))}
      </div>
    </div>
  );
}
