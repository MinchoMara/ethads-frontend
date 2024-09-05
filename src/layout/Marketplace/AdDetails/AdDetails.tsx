import Image from "next/image";
import Button from "~/components/atoms/Button/Button";
import { PurchaseAdModal } from "~/components/popup/Modal/PurchaseAdModal/PurchaseAdModal";
import { useModalContext } from "~/contexts/ModalProvider";
import { Skeleton } from "../../../components/atoms/Skeleton/Skeleton";

export interface AdDetailsProps {
  adId: string;
  location: string;
  dau: string;
  occupied: boolean;
  minimumExposure: string;
  maximumExposure: string;
  minPrice: string;
  imageUrl?: string;
}

export const AdDetailElement = ({
  label,
  content,
  icon,
}: {
  label: string;
  content: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex w-[140px] flex-col items-start justify-center gap-2">
      <p className="text-14/body/m text-gray-600">{label}</p>
      <p className="text-16/body/m text-gray-950">{content}</p>
    </div>
  );
};

export const AdDetails = ({
  adId,
  imageUrl,
  location,
  dau,
  occupied,
  minimumExposure,
  maximumExposure,
  minPrice,
}: AdDetailsProps) => {
  const { openModal } = useModalContext();
  return (
    <div className="custom-shadow sticky top-[278px] z-30 flex w-[504px] flex-col items-start gap-5 p-6">
      {/* Header */}
      <p className="text-18/heading/s text-gray-950">Details</p>
      {/* Ad Example Image */}
      {!!imageUrl ? (
        <Image src={imageUrl} width={456} height={240} alt="Ad Example Image" />
      ) : (
        <Skeleton className="h-[240px] w-full" />
      )}
      {/* Contents */}
      <div className="flex items-start justify-between self-stretch">
        <AdDetailElement label="Location" content={location} />
        <AdDetailElement label="DAU" content={dau} />
        <AdDetailElement label="State" content={occupied ? "Occupied" : "Empty"} />
      </div>
      <div className="flex items-start justify-between self-stretch">
        <AdDetailElement label="Minimum Exposure" content={minimumExposure} />
        <AdDetailElement label="Maximum Exposure" content={maximumExposure} />
        <AdDetailElement label="Price (per week)" content={minPrice} />
      </div>
      <Button
        variant="primary"
        className="w-full"
        onClick={() => {
          openModal(<PurchaseAdModal adId={adId} occupied={occupied} minPrice={minPrice} />);
        }}
      >
        Purchase
      </Button>
    </div>
  );
};
