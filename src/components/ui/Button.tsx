import clsx from "clsx";
import { Button as AntdButton, ButtonProps } from "antd";
import Link from "next/link";

interface IProps extends ButtonProps {
  theme?: "base" | "primary" | "outlined" | "dark" | "light" | "text";
  centered?: boolean;
  wide?: boolean;
}

const variants = {
  base: `
  text-primary border-transparent
  bg-primary/5
  hover:bg-primary/10 active:bg-primary/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/15
  `,

  primary: `
  bg-primary text-white border-transparent
  hover:bg-blue-700 active:bg-blue-900
  `,

  outlined: `
  bg-transparent text-primary border-primary border-2 hover:text-white transition-colors duration-200
  `,

  light: `
  bg-background text-foreground border-transparent
  hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-gray-950
  `,

  dark: `
  bg-foreground text-background border-transparent
  hover:bg-gray-900 active:bg-gray-950 dark:hover:bg-gray-100 dark:active:bg-gray-200
  `,

  text: `
  bg-transparent text-primary border-transparent
  hover:bg-primary/5 hover:text-blue-900 active:text-blue-700 dark:hover:bg-primary/10 dark:hover:text-white dark:active:text-white
  `,
};

export const Button: React.FC<IProps> = ({
  href,
  target,
  theme = "base",
  centered = false,
  wide = false,
  block = false,
  className = "",
  ...props
}) => {
  const baseStyles = clsx(
    "gap-2 font-bold rounded-xl px-7 py-2 h-[56px] text-lg shadow-none transition-all duration-200 outline-none active:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-full",
    variants[theme],
    wide && "px-10",
    className
  );

  const wrapperStyles = clsx(centered && "mx-auto", block && "w-full");

  // Special handling for outlined theme with animation
  if (theme === "outlined") {
    const outlinedButton = (
      <div
        className={clsx(
          "relative rounded-xl group bg-background overflow-hidden",
          wrapperStyles
        )}
      >
        <div className="absolute inset-0 bg-primary transform -translate-x-full transition-transform duration-[400ms] ease-in-out group-hover:translate-x-0 group-active:bg-blue-700" />
        <AntdButton
          {...props}
          className={clsx(baseStyles, "relative z-10 group")}
        />
      </div>
    );

    if (href) {
      return (
        <Link href={href} target={target} className="group inline-block">
          {outlinedButton}
        </Link>
      );
    }

    return <div className="group inline-block">{outlinedButton}</div>;
  }

  if (!href) {
    return (
      <AntdButton {...props} className={clsx(baseStyles, wrapperStyles)} />
    );
  }

  return (
    <Link href={href} target={target} className={wrapperStyles}>
      <AntdButton {...props} className={baseStyles} />
    </Link>
  );
};
