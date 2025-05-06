import { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export default function Label({
  htmlFor,
  children,
  className = "",
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`w-32 text-sm font-medium text-left ${className}`}
    >
      {children}
    </label>
  );
}
