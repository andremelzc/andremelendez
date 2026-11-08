import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  /** Si se indica, se renderiza un enlace en lugar de un botón. */
  href?: string;
  /** Abre el enlace en una pestaña nueva (solo con href). */
  newTab?: boolean;
  /** Estado de un botón de alternancia o filtro (aria-pressed). */
  pressed?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export default function Button({
  children,
  href,
  newTab = false,
  pressed,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
  rounded = "lg",
}: ButtonProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };
  const baseClasses = `relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer group overflow-hidden ${roundedClasses[rounded]}`;

  const variantClasses = {
    primary: "bg-gradient-to-r from-foreground via-foreground to-foreground text-background hover:from-foreground/90 hover:via-foreground hover:to-foreground/90 hover:scale-105 hover:shadow-lg hover:shadow-foreground/25 focus:ring-accent transform-gpu",
    secondary: "bg-gradient-to-r from-muted/80 via-muted to-muted/80 backdrop-blur-sm text-foreground hover:from-muted hover:via-muted/90 hover:to-muted hover:scale-105 hover:shadow-lg hover:shadow-muted/25 focus:ring-muted border border-muted/20",
    outline: "border border-border/50 text-foreground hover:bg-gradient-to-r hover:from-muted/20 hover:via-muted/30 hover:to-muted/20 hover:border-border hover:scale-105 hover:shadow-lg hover:shadow-accent/10 focus:ring-accent backdrop-blur-sm",
    ghost: "text-foreground hover:bg-gradient-to-r hover:from-muted/10 hover:via-muted/20 hover:to-muted/10 hover:scale-105 hover:shadow-md focus:ring-muted backdrop-blur-sm",
  };

  // Padding vertical extra si el ícono está en top o bottom
  const verticalPad =
    icon && (iconPosition === "top" || iconPosition === "bottom")
      ? {
          sm: "py-3",
          md: "py-4",
          lg: "py-6",
          xl: "py-10",
        }[size]
      : undefined;
  const sizeClasses = {
    sm: `px-4 ${verticalPad || "py-2"} text-sm`,
    md: `px-6 ${verticalPad || "py-3"} text-base`,
    lg: `px-8 ${verticalPad || "py-4"} text-lg`,
    xl: `px-10 ${verticalPad || "py-6"} text-xl`,
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none transform-none hover:scale-100 hover:shadow-none" : "";

  // Efecto de resplandor para botones primary
  const glowEffect = variant === "primary" && !disabled && !loading ? (
    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-cherry-300/20 to-accent/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
  ) : null;

  // Layout para ícono y contenido
  const isVertical = iconPosition === "top" || iconPosition === "bottom";
  const flexDir = isVertical ? "flex-col" : "flex-row";
  const gap = size === "sm" ? "gap-1" : size === "lg" ? "gap-3" : "gap-2";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const content = (
    <>
      {glowEffect}
      <span
        className={`flex ${flexDir} items-center justify-center ${gap} w-full relative z-10`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {/* Ícono y contenido según posición */}
        {icon && (iconPosition === "left" || iconPosition === "top") && (
          <span>{icon}</span>
        )}
        {children}
        {icon && (iconPosition === "right" || iconPosition === "bottom") && (
          <span>{icon}</span>
        )}
      </span>
    </>
  );

  if (href) {
    // Rutas internas y anclas: next/link. Resto (http, mailto, archivos
    // abiertos en pestaña nueva): <a>.
    if (!newTab && (href.startsWith("/") || href.startsWith("#"))) {
      return (
        <Link href={href} className={classes} onClick={onClick}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
