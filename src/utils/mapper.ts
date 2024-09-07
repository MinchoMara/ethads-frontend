import { BigNumber, ethers } from "ethers";

export const mapTimestampToDifference = (unixTimestamp: string) => {
  const currentTime = parseInt((new Date().getTime() / 1000).toString());
  const requestTime = new Date(parseInt(unixTimestamp)).getTime();

  const difference = currentTime - requestTime;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (difference < minute) {
    return "Just now";
  } else if (difference < hour) {
    return `${Math.floor(difference / minute)} minutes ago`;
  } else if (difference < day) {
    return `${Math.floor(difference / hour)} hours ago`;
  } else {
    return `${Math.floor(difference / day)} days ago`;
  }
};

export type AdResponse = {
  adId: string;
  protocolName: string; // publisherProject
  imageUrl: string; // publisherIpfs
  location: string;
  dau: string;
  occupied: boolean; // false로 고정
  minDate: string;
  maxDate: string;
  minPrice: string;
};

export type AdListResponse = Record<string, AdResponse>;

export const mapToAdListResponse = (
  adInfoArray: {
    adId: BigNumber;
    publisherAddress: string;
    publisherIpfs: string;
    publisherProject: string;
    network: string;
    location: string;
    x_size: BigNumber;
    y_size: BigNumber;
    mindate: BigNumber;
    maxdate: BigNumber;
    dau: BigNumber;
    minprice: BigNumber;
  }[],
): AdListResponse => {
  const adListResponse: AdListResponse = {};

  adInfoArray.forEach((adInfo) => {
    const { adId, publisherProject, publisherIpfs, location, dau, mindate, maxdate, minprice } = adInfo;

    adListResponse[adId.toString()] = {
      adId: adId.toString(),
      protocolName: publisherProject,
      imageUrl: publisherIpfs,
      location,
      dau: dau.toString(),
      occupied: false,
      minDate: mindate.toString(),
      maxDate: maxdate.toString(),
      minPrice: ethers.utils.formatEther(minprice),
    };
  });

  return adListResponse;
};

export const mapToAdResponse = (
  adInfo: {
    adId: BigNumber;
    publisherAddress: string;
    publisherIpfs: string;
    publisherProject: string;
    network: string;
    location: string;
    x_size: BigNumber;
    y_size: BigNumber;
    mindate: BigNumber;
    maxdate: BigNumber;
    dau: BigNumber;
    minprice: BigNumber;
  },
  occupied: boolean,
): AdResponse => {
  const { adId, publisherProject, publisherIpfs, location, dau, mindate, maxdate, minprice } = adInfo;
  return {
    adId: adId.toString(),
    protocolName: publisherProject,
    imageUrl: publisherIpfs,
    location,
    dau: dau.toString(),
    occupied,
    minDate: mindate.toString(),
    maxDate: maxdate.toString(),
    minPrice: ethers.utils.formatEther(minprice),
  };
};

export type AdListResponseByProtocolName = Record<string, AdResponse[]>;

export const groupAdListByProtocolName = (adListResponse: AdListResponse): AdListResponseByProtocolName => {
  return Object.values(adListResponse).reduce<AdListResponseByProtocolName>((acc, adResponse) => {
    const protocolName = adResponse.protocolName;

    if (!acc[protocolName]) {
      acc[protocolName] = [];
    }

    acc[protocolName].push(adResponse);

    return acc;
  }, {});
};

export type AdRequestType = {
  adId: string;
  clientId: string;
  companyName: string;
  adInfo: string;
  adImageUrl: string;
};
