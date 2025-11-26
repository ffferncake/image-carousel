import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center rounded-full transition active:scale-95";
  const variants = {
    default:
      "bg-white/70 hover:bg-white/90 shadow-md backdrop-blur-md text-gray-800",
    ghost: "bg-transparent hover:bg-white/20 text-white",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
