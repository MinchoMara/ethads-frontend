import clsx from "clsx";
import { forwardRef } from "react";
import type { UIProps } from "../../UIProps";

export type ButtonProps = UIProps.Button & {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  theme?: "light" | "dark";
  variant?: "primary" | "secondary" | "assertive" | "nonOutlined";
  iconOnly?: boolean;
  size?: "large" | "small";
  selected?: boolean;
};

const buttonLayoutCommon =
  "group inline-flex items-center justify-center whitespace-nowrap rounded-md disabled:cursor-not-allowed transition-all duration-300";

// ------ Size ------ //

const buttonLayout = {
  large: "text-16/body/l py-2.5 px-4 gap-1.5",
  small: "text-14/button/m, py-1.5 px-2 gap-1",
};

const buttonTypography = {
  large: "text-16/body/l",
  small: "text-14/body/m",
};

// ------ Theme ------ //

const colors: {
  [theme: string]: {
    [content: string]: {
      [key in NonNullable<ButtonProps["variant"]>]: string;
    };
  };
} = {
  light: {
    buttonColor: {
      primary: "bg-theme-primary hover:bg-theme-primaryHover disabled:bg-gray-300",
      secondary:
        "border-solid border border-theme-primary hover:bg-gray-150 disabled:border-gray-200 disabled:bg-transparent",
      assertive:
        "border-solid border border-gray-200 hover:bg-gray-150 disabled:border-gray-200 disabled:bg-transparent",
      nonOutlined: "hover:bg-gray-150 disabled:bg-transparent",
    },
    textColor: {
      primary: "text-gray-100 disabled:text-gray-500",
      secondary: "text-theme-primary disabled:text-gray-500",
      assertive: "text-black disabled:text-gray-500",
      nonOutlined: "text-gray-600 disabled:text-gray-500 active:text-theme-primary",
    },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = "button",
    className,
    children,
    leadingIcon,
    trailingIcon,
    theme = "light",
    variant = "primary",
    iconOnly = false,
    size = "large",
    selected = false,
    ...props
  },
  ref,
) {
  const { buttonColor, textColor } = colors[theme];
  return (
    <button
      ref={ref}
      type={type === "button" ? "button" : "submit"}
      className={clsx(
        buttonLayoutCommon,
        buttonLayout[size],
        buttonTypography[size],
        buttonColor[variant],
        textColor[variant],
        !!leadingIcon && (size === "large" ? "pl-3" : "pl-1"),
        !!trailingIcon && (size === "large" ? "pr-3" : "pr-1"),
        variant === "nonOutlined" && selected && "text-theme-primary",
        iconOnly && "p-4",
        className,
      )}
      {...props}
    >
      {!!leadingIcon && leadingIcon}
      {children}
      {!!trailingIcon && trailingIcon}
    </button>
  );
});

export default Button;
