import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Droplets,
  Heart,
  MapPin,
  Scissors,
  Sparkles,
  Tag,
  type LucideProps,
} from "lucide-react";

const ICONS = {
  calendar: CalendarDays,
  scissors: Scissors,
  tag: Tag,
  pin: MapPin,
  drops: Droplets,
  sparkles: Sparkles,
  heart: Heart,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden strokeWidth={1.75} {...props} />;
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[13px] font-semibold uppercase tracking-[0.14em] text-primary ${className}`}
    >
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline" | "light";
  children: React.ReactNode;
  className?: string;
};

const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark",
  outline:
    "border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white",
  light: "bg-white text-primary hover:bg-blush-2",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-2 text-[15px] font-semibold text-primary ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        size={18}
        strokeWidth={1.75}
        className="transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </Link>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-6 sm:px-10 xl:px-0 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p
        className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${
          light ? "text-blush-2" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-[40px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[52px] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
