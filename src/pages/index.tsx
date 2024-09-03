import { useRouter } from "next/router";
import Button from "~/components/atoms/Button/Button";
import { Footer } from "~/layout/common/Footer/Footer";
import { Header } from "~/layout/common/Header/Header";

export const Home = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-start">
        <Header />
        <div className="flex h-[72vh] items-center self-stretch bg-gray-950">
          <div className="flex flex-col items-start gap-10 px-24">
            <div className="flex flex-col items-start gap-5">
              <p className="text-60/landing text-gray-100">Decentralized Ad Marketplace</p>
              <p className="text-36/landing/sub text-gray-100">Monetize your website with Ethereum-based ads.</p>
            </div>
            <div className="flex items-start gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  router.push("/marketplace");
                }}
              >
                Get Started
              </Button>
              <Button variant="assertive" className="bg-gray-100">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
