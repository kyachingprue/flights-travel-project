import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | flights.com` : "flights.com";
  }, [title]);
}
