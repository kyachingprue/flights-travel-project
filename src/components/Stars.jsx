import { FaStar } from "react-icons/fa6";

export default function Stars({ value = 5, className = "" }) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={i < Math.round(value) ? "text-sun-400" : "text-line"}
        />
      ))}
    </span>
  );
}
