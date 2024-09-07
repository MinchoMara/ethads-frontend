import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "~/components/atoms/Skeleton/Skeleton";
import { Ads } from "~/components/display/Ad/Ad";
import { useAdManager } from "~/hooks/useAdManager";
import { AdListResponse } from "~/utils/mapper";
import { groupAdListByProtocolName } from "~/utils/mapper";
import { AdDetails } from "./AdDetails/AdDetails";

export const Marketplace = () => {
  const [adsInfo, setAdsInfo] = useState<AdListResponse>({});
  const [selectedId, setSelectedId] = useState<string>("");

  const { getAllAdsInfo } = useAdManager();

  const groupedAdsInfo = useMemo(() => groupAdListByProtocolName(adsInfo), [adsInfo]);

  const handleSelectElement = (adId: string) => {
    setSelectedId(adId);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAdsInfo();
      if (data) {
        setAdsInfo(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex items-start gap-10">
      {/* Ad List */}
      {groupedAdsInfo && (
        <div className="flex flex-col items-start gap-10">
          {Object.keys(groupedAdsInfo).length > 0 ? (
            Object.entries(groupedAdsInfo).map(([publisherName, ads]) => (
              <Ads
                key={publisherName}
                publisherName={publisherName}
                adElementData={ads.map((ad) => ({
                  adId: ad.adId,
                  title: ad.location,
                  maximumExposure: ad.maxDate,
                  occupied: ad.occupied,
                  price: ad.minPrice,
                }))}
                selectedId={selectedId}
                onClickElement={handleSelectElement}
              />
            ))
          ) : (
            <Skeleton className="h-[535px] w-[504px]" />
          )}
        </div>
      )}
      {/* Ad Details */}
      {selectedId !== "" ? (
        <AdDetails
          adId={selectedId}
          location={adsInfo[selectedId]?.location}
          dau={adsInfo[selectedId]?.dau}
          occupied={adsInfo[selectedId]?.occupied}
          minimumExposure={adsInfo[selectedId]?.minDate}
          maximumExposure={adsInfo[selectedId]?.maxDate}
          minPrice={adsInfo[selectedId]?.minPrice}
          imageUrl={adsInfo[selectedId]?.imageUrl}
        />
      ) : (
        <div className="flex h-[535px] w-[504px] items-center justify-center border border-gray-200 text-14/body/m text-gray-600">
          Click Ad to purchase.
        </div>
      )}
    </div>
  );
};
