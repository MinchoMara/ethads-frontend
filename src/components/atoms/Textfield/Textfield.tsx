import clsx from "clsx";
import React, { forwardRef, useEffect, useId, useState } from "react";
import type { UIProps } from "../../UIProps";
import { Icon20 } from "../Icon/Icon20";
import { Label } from "../Label/Label";

export interface InputProps extends UIProps.Input {
  id?: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "phone" | "search";
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  placeholder?: string;
  theme?: "light" | "dark";
  isClearable?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  error?: string;
  onClear?: () => void;
}

const getDefaultValue = (
  type?: "text" | "number" | "password" | "email" | "tel" | "phone" | "search",
  value?: string | number,
  defaultValue?: string | number,
) => {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  if (type === "number") return 0;
  return "";
};

const fieldCommon =
  "flex h-11 px-3 py-2.5 gap-2.5 items-center justify-between self-stretch rounded-md border-2 border-transparent transition-all duration-300";
const inputCommon = "text-16/body/l peer w-full self-stretch overflow-ellipsis bg-transparent focus:outline-none";

// ------ Theme ------ //

const colors: {
  [theme: string]: {
    [content: string]: string;
  };
} = {
  light: {
    fieldColor: "bg-gray-100 focus-within:border-theme-primary focus-within:bg-gray-0",
    textColor: "text-gray-950 placeholder:text-gray-400 disabled:text-gray-400",
  },
  dark: {
    // dummy data
    fieldColor: "bg-gray-100 focus-within:border-theme-primary",
    textColor: "text-gray-950",
  },
};

export const Textfield = forwardRef<HTMLInputElement, InputProps>(function Textfield(
  {
    id,
    type = "text",
    label,
    leadingIcon,
    trailingIcon,
    placeholder,
    theme = "light",
    isClearable = false,
    value,
    defaultValue,
    children,
    disabled = false,
    required,
    error,
    onChange,
    onClear,
    className,
    ...props
  },
  ref,
) {
  const localId = `mincho-${useId()}`;
  const inputId = id || localId;

  const [internalValue, setInternalValue] = useState(getDefaultValue(type, value, defaultValue));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onClear?.();
  };

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  const { fieldColor, textColor } = colors[theme];

  return (
    <div className={clsx("flex flex-col items-start gap-4", className)}>
      {label && <Label htmlFor={localId} label={label} required={required} error={error} />}
      {!!leadingIcon && leadingIcon}
      <div className={clsx(fieldCommon, fieldColor, disabled && "bg-gray-150")}>
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          type={type}
          value={internalValue}
          onChange={handleChange}
          className={clsx(inputCommon, textColor)}
          {...props}
        />
        {!!isClearable && (
          <Icon20.Close
            className={clsx(
              "text-gray-200 opacity-0 transition-all duration-300 hover:cursor-pointer hover:text-gray-300",
              internalValue.toString().length > 0 && "peer-focus:opacity-100",
            )}
            onClick={handleClear}
          />
        )}
      </div>
      {!!trailingIcon && trailingIcon}
    </div>
  );
});

export default Textfield;
