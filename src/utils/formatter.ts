export const formatAddress = (rawAddress: string) => {
  return rawAddress.slice(0, 6) + "..." + rawAddress.slice(-4);
};
