import { Marketplace } from "~/layout/Marketplace/Marketplace";
import { Header } from "~/layout/common/Header/Header";
import { Title } from "~/layout/common/Title/Title";

export const MarketplacePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-start">
      <Header />
      <Title
        title="Marketplace"
        description="Lorem ipsum dolor sit amet consectetur. Sit pellentesque tellus proin id sed in nec. Libero consectetur vitae pretium facilisi felis fermentum."
      />
      <div className="flex flex-col items-center justify-center self-stretch py-[60px]">
        <Marketplace />
      </div>
    </div>
  );
};

export default MarketplacePage;
