import clsx from "clsx";
import { Icon20 } from "../Icon/Icon20";

export const ErrorMessageBox = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={clsx("flex items-center gap-2 text-14/body/m text-red-600", className)}>
      <Icon20.Error />
      {children}
    </span>
  );
};
