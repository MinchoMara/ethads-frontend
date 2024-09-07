import { AdManager__factory } from "@ethads/contract";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useWeb3AuthContext } from "~/contexts/Web3AuthProvider";
import { CreateAdsInput, SupportedNetwork } from "~/types/create-ads.input";
import { PurchaseAdsInput } from "~/types/purchase-ads.input";
import { AD_MANAGER_ADDRESS, GAS_LIMIT } from "~/utils/constants";
import { mapAdResponseArrayToAdListResponse, mapToAdResponse } from "~/utils/mapper";

export const useAdManager = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { getAccounts } = useWeb3AuthContext();

  const registerAds = async (createAdsInput: CreateAdsInput) => {
    try {
      setIsProcessing(true);

      const { name, location, adExampleImageUrl, dau, minimumExposure, maximumExposure, price } = createAdsInput;
      const { ethersProvider, signer } = await getAccounts();
      if (!ethersProvider || !signer) {
        throw new Error("Wallet not found");
      }
      const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, signer);
      const ethPrice = ethers.utils.parseEther(price.toString());

      const test = await adManager.owner();

      const tx = await adManager.registerAd(
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
      );
      await tx.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getAllAdsInfo = async () => {
    const { ethersProvider } = await getAccounts();
    if (!ethersProvider || Object.keys(ethersProvider).length === 0) {
      return;
    }
    const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, ethersProvider);
    const adInfos = await adManager.getAllAdInfo();
    const parsedAdInfos = await Promise.all(
      adInfos.map(async (adInfo) => {
        const status = await adManager.getAdStatus(adInfo.adId);
        const occupied = status.adId ? true : false;
        return mapToAdResponse(adInfo, occupied);
      }),
    );

    return mapAdResponseArrayToAdListResponse(parsedAdInfos);
  };

  const registerClient = async (adId: string, purchaseAdInput: PurchaseAdsInput, occupied = false) => {
    try {
      setIsProcessing(true);
      const { companyName, adInfo, adImageUrl, price } = purchaseAdInput;
      const value = ethers.utils.parseEther(price.toString());

      const { ethersProvider, signer } = await getAccounts();
      if (!ethersProvider || !signer) {
        throw new Error("Wallet not found");
      }
      const adManager = AdManager__factory.connect(AD_MANAGER_ADDRESS, signer);

      /* 일반 구매 */
      if (!occupied) {
        await (
          await adManager.registerClient(adId, adImageUrl, companyName, adInfo, { value, gasLimit: GAS_LIMIT })
        ).wait();
        return;
      }

      /* 경매 입찰 */
      await (
        await adManager.registerOverClient(adId, adImageUrl, companyName, adInfo, { value, gasLimit: GAS_LIMIT })
      ).wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
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
    await (await adManager.allowAd(adId, clientAddress, { gasLimit: GAS_LIMIT })).wait();
  };

  return { isProcessing, registerAds, getAllAdsInfo, registerClient, getClientInfo, approveAds };
};
