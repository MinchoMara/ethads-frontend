import { AdManager__factory } from "@ethads/contract";
import { BigNumber, ethers } from "ethers";
import { useWeb3AuthContext } from "~/contexts/Web3AuthProvider";
import { CreateAdsInput, SupportedNetwork } from "~/types/create-ads.input";
import { PurchaseAdsInput } from "~/types/purchase-ads.input";
import { AD_MANAGER_ADDRESS, GAS_LIMIT } from "~/utils/constants";
import { mapToAdListResponse } from "~/utils/mapper";

export const useAdManager = () => {
  const { getAccounts } = useWeb3AuthContext();

  const registerAds = async (createAdsInput: CreateAdsInput) => {
    const { name, location, adExampleImageUrl, dau, minimumExposure, maximumExposure, price } = createAdsInput;
    const { ethersProvider, signer } = await getAccounts();
    if (!ethersProvider || !signer) {
      throw new Error("Wallet not found");
    }
    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, signer);
    console.log(signer);
    const ethPrice = ethers.utils.parseEther(price.toString());

    await (
      await adManager.registerAd(
        adExampleImageUrl,
        name,
        SupportedNetwork.ARBITRUM,
        location,
        720,
        240,
        minimumExposure,
        maximumExposure,
        dau,
        ethPrice,
        { gasLimit: GAS_LIMIT },
      )
    ).wait();
  };

  const getAllAdsInfo = async () => {
    const { ethersProvider } = await getAccounts();
    if (!ethersProvider || Object.keys(ethersProvider).length === 0) {
      return;
    }
    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, ethersProvider);
    const adInfos = await adManager.getAllAdInfo();
    return mapToAdListResponse(adInfos);
  };

  const registerClient = async (adId: string, purchaseAdInput: PurchaseAdsInput, isOver = false) => {
    const { companyName, adInfo, adImageUrl, price } = purchaseAdInput;
    const value = ethers.utils.parseEther(price.toString());

    const { ethersProvider, signer } = await getAccounts();
    if (!ethersProvider || !signer) {
      throw new Error("Wallet not found");
    }
    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, signer);

    /* 일반 구매 */
    if (!isOver) {
      await (
        await adManager.registerClient(adId, adImageUrl, companyName, adInfo, { value, gasLimit: GAS_LIMIT })
      ).wait();
      return;
    }

    /* 경매 입찰 */
    await (
      await adManager.registerOverClient(adId, adImageUrl, companyName, adInfo, { value, gasLimit: GAS_LIMIT })
    ).wait();
  };

  const getClientInfo = async () => {
    const { ethersProvider } = await getAccounts();
    if (!ethersProvider || Object.keys(ethersProvider).length === 0) {
      return;
    }
    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, ethersProvider);
    const clientInfoResponse = await adManager.getClientInfo(BigNumber.from(0));
    const clientInfo = clientInfoResponse.map((response) => {
      return {
        adId: response.adId.toString(),
        approved: false,
        address: response.clientAddress,
        unixTimestamp: Math.floor(new Date().getTime() / 1000).toString(),
        companyName: response.clientProject,
        adInfo: response.clientDescription,
        adImageUrl: response.clientIpfs,
      };
    });

    return clientInfo;
  };

  const approveAds = async (adId: string, clientAddress: string) => {
    const { ethersProvider, signer } = await getAccounts();
    if (!ethersProvider || !signer) {
      throw new Error("Wallet not found");
    }

    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, signer);
    console.log(adManager);
    await (await adManager.allowAd(adId, clientAddress, { gasLimit: GAS_LIMIT })).wait();
  };

  return { registerAds, getAllAdsInfo, registerClient, getClientInfo, approveAds };
};