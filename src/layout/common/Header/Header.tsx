import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/atoms/Button/Button";
import { Icon20 } from "~/components/atoms/Icon/Icon20";
import { useWeb3AuthContext } from "~/contexts/Web3AuthProvider";
import EthAdsLogo from "~/public/EthAdsLogo.png";
import { formatAddress } from "~/utils/formatter";

export const Header = () => {
  const router = useRouter();
  const { loggedIn, login, logout, getAccounts } = useWeb3AuthContext();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleGetUserInfo = async () => {
      const { address } = await getAccounts();
      setUserName(formatAddress(address));
    };
    if (loggedIn) {
      handleGetUserInfo();
    }
  }, [loggedIn, getAccounts]);

  return (
    <div
      className="sticky top-0 z-40 flex items-center justify-between self-stretch border border-b border-gray-200 bg-gray-0"
      style={{
        padding: "16px 32px",
      }}
    >
      {/* Logo */}
      <div className="flex w-60 items-center gap-10" onClick={() => router.push("/")}>
        <Image src={EthAdsLogo} alt="Logo" height={31} />
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-1">
        <Button
          variant="nonOutlined"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="nonOutlined"
          onClick={() => {
            router.push("/marketplace");
          }}
        >
          Marketplace
        </Button>
        <Button
          variant="nonOutlined"
          onClick={() => {
            router.push("/publisher");
          }}
        >
          Publisher
        </Button>
      </div>
      {/* Connect Wallet Button */}
      <div className="flex w-60 items-center justify-end">
        {!loggedIn ? (
          <Button variant="primary" leadingIcon={<Icon20.Wallet />} onClick={login}>
            Connect Wallet
          </Button>
        ) : (
          <Button variant="secondary" leadingIcon={<Icon20.Avatar />} onClick={logout}>
            {userName}
          </Button>
        )}
      </div>
    </div>
  );
};
