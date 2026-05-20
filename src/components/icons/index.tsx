// Icons — direct ports of the 32 inline SVGs from
// /Users/pratyakshgupta/Downloads/flymeout/project/villas/lib/common.jsx
// into react-native-svg components. Stroke paths inherit colour via the
// `color` prop (replacing CSS `currentColor`); the two filled icons
// (Star and ApplePay) use `fill={color}` instead.

import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../../lib/theme';

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

// --- Navigation & actions -------------------------------------------------

export function Search({ size = 18, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={11} cy={11} r={7} />
      <Path d="m20 20-3.5-3.5" />
    </Svg>
  );
}

export function CalendarIcon({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect x={3.5} y={5} width={17} height={15} rx={2.5} />
      <Path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function Back({ size = 20, color = colors.text, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M15 5l-7 7 7 7" />
    </Svg>
  );
}

export function Chevron({ size = 14, color = colors.text, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9 5l7 7-7 7" />
    </Svg>
  );
}

export function Close({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function Share({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 4v12M7.5 8.5L12 4l4.5 4.5M5 14v5h14v-5" />
    </Svg>
  );
}

// --- People ---------------------------------------------------------------

export function User({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={12} cy={8.5} r={3.8} />
      <Path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
    </Svg>
  );
}

export function Users({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={9} cy={9} r={3.4} />
      <Circle cx={17.5} cy={9.5} r={2.8} />
      <Path d="M3 19c.8-3 3.3-4.6 6-4.6s5.2 1.6 6 4.6M14.2 19c.6-2.2 2.4-3.4 4.3-3.4 1.3 0 2.4.4 3.5 1.4" />
    </Svg>
  );
}

export function Person({ size = 22, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={12} cy={8.5} r={4} />
      <Path d="M4.5 20.5c1.5-3.7 4.4-5.7 7.5-5.7s6 2 7.5 5.7" />
    </Svg>
  );
}

// --- Amenities ------------------------------------------------------------

export function Bed({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 18v-7a3 3 0 013-3h12a3 3 0 013 3v7M3 14h18M7 11h3" />
    </Svg>
  );
}

export function Bath({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4 13h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM6 13V6.5A2.5 2.5 0 018.5 4c1 0 1.7.5 2 1.2" />
    </Svg>
  );
}

export function Pool({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 17c1.3-1 2.7-1 4 0s2.7 1 4 0 2.7-1 4 0 2.7 1 4 0M3 13.5c1.3-1 2.7-1 4 0s2.7 1 4 0 2.7-1 4 0 2.7 1 4 0M8 9V5h8v4" />
    </Svg>
  );
}

export function Wave({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 15c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 6 0M3 10c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 6 0" />
    </Svg>
  );
}

export function Wifi({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5 10a12 12 0 0114 0M8 13.5a7 7 0 018 0" />
      <Circle cx={12} cy={17.5} r={1.2} fill={color} />
    </Svg>
  );
}

export function WifiOff({ size = 16, color = colors.text, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M3 5l18 14M5 11a12 12 0 0110-3M8 14.5a7 7 0 016-1" />
      <Circle cx={12} cy={18} r={1} fill={color} />
    </Svg>
  );
}

export function Bell({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16zM10 20a2 2 0 004 0" />
    </Svg>
  );
}

export function Spa({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 4c2 3 2 5 0 8-2-3-2-5 0-8zM5 12c3-1 5 0 7 4-3 1-5 0-7-4zM19 12c-3-1-5 0-7 4 3 1 5 0 7-4z" />
    </Svg>
  );
}

export function Chef({ size = 18, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M7 10a3.5 3.5 0 011-6.9A4 4 0 0119 6a3.5 3.5 0 01-2 6.5v3H7v-3zM7 15.5h10v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3z" />
    </Svg>
  );
}

export function Diamond({ size = 14, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <Path d="M12 3l4 5-4 13L8 8l4-5zM3 8h18M8 8l4-5 4 5" />
    </Svg>
  );
}

// --- Status / symbols -----------------------------------------------------

export function Check({ size = 16, color = colors.text, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5 12.5L10 17.5 19.5 7" />
    </Svg>
  );
}

export function Minus({ size = 16, color = colors.text, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <Path d="M5 12h14" />
    </Svg>
  );
}

export function Plus({ size = 16, color = colors.text, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function Globe({ size = 14, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    >
      <Circle cx={12} cy={12} r={9} />
      <Path d="M3 12h18M12 3c2.8 3.4 2.8 14.6 0 18M12 3c-2.8 3.4-2.8 14.6 0 18" />
    </Svg>
  );
}

export function Lock({ size = 14, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect x={5} y={10.5} width={14} height={10} rx={2} />
      <Path d="M8 10.5V8a4 4 0 018 0v2.5" />
    </Svg>
  );
}

export function Alert({ size = 16, color = colors.text, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 8v5M12 16.5v.1" />
      <Circle cx={12} cy={12} r={9} />
    </Svg>
  );
}

export function Shield({ size = 14, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <Path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4" />
    </Svg>
  );
}

export function Star({ size = 14, color = colors.text }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <Path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.6 6.6 20.4l1-6.1L3.2 10l6.1-.9L12 3.5z" />
    </Svg>
  );
}

// --- Payment --------------------------------------------------------------

export function Card({ size = 16, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    >
      <Rect x={3} y={6} width={18} height={13} rx={2.5} />
      <Path d="M3 10h18M6 15h4" />
    </Svg>
  );
}

export function ApplePay({ width = 40, color = colors.text }: { width?: number; color?: string }) {
  const height = width * (16 / 40);
  return (
    <Svg viewBox="0 0 40 16" width={width} height={height} fill={color}>
      <Path d="M5.6 1.8c.4-.5.6-1.2.5-1.8-.6 0-1.2.3-1.6.8-.4.4-.7 1-.6 1.7.6 0 1.2-.3 1.7-.7zm.5.8c-.9-.1-1.7.5-2.1.5-.5 0-1.1-.5-1.8-.5-1 0-1.9.6-2.4 1.4-1 1.8-.3 4.4.7 5.9.5.7 1.1 1.4 1.8 1.4s1-.5 1.9-.5 1.1.5 1.9.5c.8 0 1.3-.7 1.8-1.4.5-.8.8-1.6.8-1.6s-1.5-.6-1.5-2.3c0-1.4 1.2-2.1 1.2-2.1-.6-1-1.6-1.3-2.3-1.3zm8.9-1.7H11v12h1.6v-4.1H15c2.1 0 3.6-1.5 3.6-3.9s-1.5-4-3.6-4zm-.4 6.5h-2v-5.1h2c1.5 0 2.3.8 2.3 2.5 0 1.8-.8 2.6-2.3 2.6zm9.1-3c-1.7 0-2.9.9-3 2.4h1.4c.1-.7.7-1.1 1.6-1.1 1 0 1.6.5 1.6 1.4v.6l-2.1.1c-2 .1-3 .9-3 2.4 0 1.4 1.1 2.4 2.7 2.4 1.1 0 2.1-.6 2.6-1.4h.1v1.3h1.5V6.9c0-1.5-1.2-2.5-3.4-2.5zm-.4 7c-.9 0-1.5-.4-1.5-1.1 0-.7.6-1.1 1.6-1.2l1.8-.1v.6c0 1.1-.9 1.8-1.9 1.8zm9.7-7l-1.9 6.1h-.1L29.1 4.5h-1.7l2.7 7.6-.1.5c-.3.8-.7 1.1-1.4 1.1-.1 0-.4 0-.5 0v1.3c.1 0 .5.1.6.1 1.7 0 2.5-.6 3.2-2.6l2.9-7.9H33z" />
    </Svg>
  );
}

// --- Misc -----------------------------------------------------------------

export function Compass({ size = 22, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <Circle cx={12} cy={12} r={9} />
      <Path d="M15 9l-1.5 4.5L9 15l1.5-4.5L15 9z" fill={color} stroke="none" />
    </Svg>
  );
}

export function Suitcase({ size = 22, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <Rect x={3.5} y={7.5} width={17} height={12} rx={2} />
      <Path d="M9 7.5V5a1 1 0 011-1h4a1 1 0 011 1v2.5M3.5 12h17" />
    </Svg>
  );
}

export function Pencil({ size = 14, color = colors.text, strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M14.5 5.5l4 4M4 20l4.5-1 11-11-3-3-11 11L4 20z" />
    </Svg>
  );
}
