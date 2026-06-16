import { type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  as?: "div" | "section";
  id?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
  as = "div",
  id,
}: Props) {
  const { ref, isInView } = useInView<HTMLDivElement>(threshold);

  const hiddenTransform =
    direction === "up"
      ? "translate-y-8"
      : direction === "down"
        ? "-translate-y-8"
        : direction === "left"
          ? "translate-x-8"
          : direction === "right"
            ? "-translate-x-8"
            : "";

  const Tag: any = as;
  return (
    <Tag
      ref={ref as any}
      id={id}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
