import clsx from "clsx";
import { UIProps } from "~/components/UIProps";

export const Skeleton = ({ className }: UIProps.Div) => {
  return <div className={clsx("animate-pulse rounded-md bg-gray-200", className)} />;
};
