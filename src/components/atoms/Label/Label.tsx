import clsx from "clsx";
import { ErrorMessageBox } from "./ErrorMessageBox";
import type { UIProps } from "../../UIProps";

export interface LabelProps extends UIProps.Label {
  label: React.ReactNode;
  required?: boolean;
  error?: any;
}

export const Label = ({ label, required = false, error, className, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-14/s/button flex h-[18px] justify-between self-stretch text-gray-600", className)}
      {...props}
    >
      <span className="whitespace-nowrap">
        {label}
        {required && <span className="ml-[2px] text-theme-primary">*</span>}
      </span>
      {error && <ErrorMessageBox>{error}</ErrorMessageBox>}
    </label>
  );
};
