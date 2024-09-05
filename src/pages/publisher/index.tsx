import { Publisher } from "~/layout/Publisher/Publisher";
import { Header } from "~/layout/common/Header/Header";
import { Title } from "~/layout/common/Title/Title";

export const PublisherPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-start">
      <Header />
      <Title title="Publisher" description="Earn money by showing ads on your website." />
      <div className="flex flex-col items-center justify-center self-stretch py-[40px]">
        <Publisher />
      </div>
    </div>
  );
};

export default PublisherPage;
