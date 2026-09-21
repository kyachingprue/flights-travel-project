import { motion } from "motion/react";

// Fades content in as it scrolls into view. Runs once per element.
export default function Reveal({
  as = "div",
  children,
  delay = 0,
  y = 28,
  x = 0,
  className = "",
  ...rest
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
