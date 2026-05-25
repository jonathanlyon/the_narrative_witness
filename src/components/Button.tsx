import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "minimal" | "dark";
  fullWidth?: boolean;
  icon?: ReactNode;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  icon,
  className = "",
  id,
  ...props
}) => {
  const baseStyle = "relative overflow-hidden font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 py-4 px-8 focus:outline-none focus:ring-1 focus:ring-ash border inline-flex items-center justify-center gap-3";
  
  const variants = {
    primary: "bg-ink border-ink text-paper hover:bg-ash hover:border-ash hover:italic",
    secondary: "bg-transparent border-ink text-ink hover:bg-ink hover:text-paper hover:italic",
    minimal: "border-transparent text-ink bg-transparent hover:text-ash hover:border-dust/40 pb-1.5 pt-1.5 px-0 tracking-[0.15em] border-b border-b-dust hover:italic",
    dark: "bg-paper-dark border-paper-dark text-ink hover:bg-ink hover:text-paper hover:border-ink hover:italic",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      id={id}
      className={`${baseStyle} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <span className="text-current transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
    </button>
  );
};
