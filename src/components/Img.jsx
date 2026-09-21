import { useState } from "react";

// <img> with a graceful gradient fallback if the photo can't load.
export default function Img({ src, alt = "", className = "", ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`bg-linear-to-br from-brand-400 via-brand-600 to-navy-900 ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
