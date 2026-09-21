import { FiShield, FiHeadphones, FiLock } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import Reveal from "../components/Reveal";
import { wrap } from "../lib/ui";

const items = [
  { icon: FiShield, title: "Best price guarantee", text: "Get the lowest fares" },
  { icon: MdFlight, title: "500+ airlines", text: "Global coverage" },
  { icon: FiHeadphones, title: "24/7 support", text: "We're here to help" },
  { icon: FiLock, title: "Secure booking", text: "Your data is safe" },
];

export default function TrustStrip() {
  return (
    <Reveal className={`${wrap} pt-10 sm:pt-12`}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-100 text-lg text-brand-600">
              <Icon />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-navy-950">{title}</span>
              <span className="block text-xs text-mute">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
