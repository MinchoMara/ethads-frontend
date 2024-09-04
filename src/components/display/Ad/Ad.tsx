import { useState } from "react";
import Button from "~/components/atoms/Button/Button";
import { Icon20 } from "~/components/atoms/Icon/Icon20";
import { AdElement, AdElementProps } from "./Ad.element";

export interface AdsProps {
  publisherName: string;
  adElementData: AdElementProps[];
  selectedId: string;
  onClickElement: (adId: string) => void;
}

export const Ads = ({ publisherName, adElementData, selectedId, onClickElement }: AdsProps) => {
  return (
    <div className="flex flex-col items-start gap-5 self-stretch border border-gray-200 p-6">
      {/* Publisher Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px] rounded-[16px] bg-blue-500" />
          <p className="flex text-20/heading/m text-gray-950">{publisherName}</p>
        </div>
        <Button variant="assertive" leadingIcon={<Icon20.Arbitrum />} disabled size="small">
          Arbitrum
        </Button>
      </div>
      {/* Ad List */}
      <div className="flex w-full flex-col items-start gap-3">
        {adElementData.map((ad) => (
          <AdElement
            key={ad.adId}
            adId={ad.adId}
            title={ad.title}
            maximumExposure={ad.maximumExposure}
            occupied={ad.occupied}
            price={ad.price}
            selected={ad.adId === selectedId}
            onClick={() => onClickElement(ad.adId)}
          />
        ))}
      </div>
    </div>
  );
};
