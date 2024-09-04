import clsx from "clsx";
import { UIProps } from "~/components/UIProps";
import { Icon20 } from "~/components/atoms/Icon/Icon20";

export interface AdElementProps extends UIProps.Button {
  adId: string;
  title: string;
  maximumExposure: string;
  occupied: boolean;
  price: string;
  selected?: boolean;
}

export const AdElement = ({ title, maximumExposure, occupied, price, selected = false, ...props }: AdElementProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex w-[472px] flex-col items-start gap-3 p-6",
        selected
          ? "border border-blue-600 bg-blue-100 hover:bg-blue-100"
          : "border border-gray-100 bg-gray-100 hover:bg-gray-200",
      )}
      {...props}
    >
      {/* Header */}
      <p className="text-18/heading/s text-gray-950">{title}</p>
      {/* Info */}
      <div className="flex items-center justify-between self-stretch">
        {/* Details */}
        <div className="flex w-[259px] flex-col items-start gap-1">
          <div className="flex items-center gap-5 self-stretch">
            <p className="text-14/body/m text-gray-600">Maximum Exposure</p>
            <p className="text-16/body/m text-gray-950">{maximumExposure}</p>
          </div>
          <div className="flex items-center gap-5 self-stretch">
            <p className="text-14/body/m text-gray-600">Ad State</p>
            <p className={clsx("text-16/body/m", occupied ? "text-gray-950" : "text-blue-600")}>
              {occupied ? "Occupied" : "Empty"}
            </p>
          </div>
        </div>
        {/* Price */}
        <div className="flex w-[100px] flex-col items-end justify-center gap-1">
          <p className={clsx("text-14/body/m", occupied ? "text-blue-600" : "text-gray-600")}>
            {occupied ? "Minimum Price" : "Current Price"}
          </p>
          <div className="flex items-start gap-1">
            <p className="text-18/heading/s text-gray-950">{price}</p>
            <Icon20.Ethereum />
          </div>
        </div>
      </div>
    </button>
  );
};
