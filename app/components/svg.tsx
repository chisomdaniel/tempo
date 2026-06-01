import SvgComponents from "../assets/svgs";

export type SvgName = keyof typeof SvgComponents;

export default function Svg({ name }: { name: SvgName }) {
  const SvgComponent = SvgComponents[name];
  if (!SvgComponent) {
    return null; // or some fallback UI
  }
  return <SvgComponent />;
}
