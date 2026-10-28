import Link from "next/link";
import { Container, Icon } from "./ui";
import { QUICK_ACCESS } from "@/lib/data";

// Bordures et arrondis par case : grille 2 × 2 jusqu'à 1280 px, puis 4 colonnes.
// La case mise en avant (violette) n'a pas de bordure, comme sur la maquette.
const CELL = [
  "rounded-tl-[20px] xl:rounded-bl-[20px]",
  "border-y border-r rounded-tr-[20px] xl:rounded-tr-none",
  "border-x border-b rounded-bl-[20px] xl:border-l-0 xl:border-t xl:rounded-bl-none",
  "border-r border-b rounded-br-[20px] xl:border-t xl:rounded-tr-[20px]",
] as const;

export default function QuickAccess() {
  return (
    <div className="relative z-10 -mt-14 lg:-mt-[60px]">
      <Container>
        <ul data-stagger className="grid grid-cols-2 xl:grid-cols-4">
          {QUICK_ACCESS.map((item, i) => (
            <li
              key={item.title}
              className={`overflow-hidden border-line ${CELL[i]} ${
                item.highlight ? "bg-primary text-white" : "bg-white"
              }`}
            >
              <Link
                href={item.href}
                className={`group flex h-full flex-col items-start justify-center gap-3 px-4 py-5 transition-colors duration-300 sm:h-[112px] sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-0 ${
                  item.highlight ? "hover:bg-primary-dark" : "hover:bg-blush"
                }`}
              >
                <span
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                    item.highlight ? "bg-white text-primary" : "bg-blush text-primary"
                  }`}
                >
                  <Icon name={item.icon} size={24} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold leading-tight sm:text-[17px]">
                    {item.title}
                  </span>
                  <span
                    className={`hidden text-[13px] sm:block ${
                      item.highlight ? "text-blush-2" : "text-muted"
                    }`}
                  >
                    {item.text}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
