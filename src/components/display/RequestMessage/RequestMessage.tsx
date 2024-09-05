import Button from "~/components/atoms/Button/Button";
import { Icon40 } from "~/components/atoms/Icon/Icon40";
import { useAdManager } from "~/hooks/useAdManager";
import { formatAddress } from "~/utils/formatter";
import { mapTimestampToDifference } from "~/utils/mapper";

export interface RequestMessageProps {
  adId: string;
  approved: boolean;
  address: string;
  unixTimestamp: string;
  companyName: string;
  adInfo: string;
  handleApprove: () => void;
}

export const RequestMessage = ({
  adId,
  approved,
  address,
  unixTimestamp,
  companyName,
  adInfo,
  handleApprove,
}: RequestMessageProps) => {
  const { approveAds } = useAdManager();
  const differenceText = mapTimestampToDifference(unixTimestamp);

  return (
    <div className="flex items-start gap-5 self-stretch">
      {/* Profile */}
      <div className="flex items-start">
        {!approved && <div className="h-2 w-2 rounded bg-etc-positive" />}
        <Icon40.AvartarLarge className={approved ? "ml-2 opacity-60" : ""} />
      </div>
      {/* Message */}
      <div className="flex w-full flex-col items-start gap-3">
        {/* Request */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 self-stretch">
            <span className="text-16/body/l/emp text-gray-950">{formatAddress(address)}</span>
            <span className="text-16/body/l text-gray-600">requested to purchase your ads.</span>
          </div>
          <span className="text-14/body/m text-gray-600">{differenceText}</span>
        </div>
        {/* Ad */}
        <div className="flex flex-col items-start justify-center gap-5 self-stretch rounded-md border border-gray-200 px-5 py-4">
          <div className="flex flex-col items-start gap-3">
            <span className="text-18/heading/s text-gray-950">{companyName}</span>
            <span className="text-16/body/l text-gray-600">{adInfo}</span>
          </div>
          <div className="flex items-start gap-3">
            <Button variant="secondary" className="w-[150px]">
              Check Image
            </Button>
            <Button
              variant="primary"
              className="w-[150px]"
              disabled={approved}
              onClick={() => approveAds(adId, address)}
            >
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
