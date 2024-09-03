import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    // Get the connected Chain's ID
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails.chainId.toString();
  } catch (error) {
    return error;
  }
};

export const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    return await address;
  } catch (error) {
    return error;
  }
};

export const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = signer.getAddress();

    // Get user's balance in ether
    const balance = ethers.utils.formatEther(
      await ethersProvider.getBalance(address), // Balance is in wei
    );

    return balance;
  } catch (error) {
    return error as string;
  }
};

export const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();

    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

    const amount = ethers.utils.parseEther("0.001");

    // Submit transaction to the blockchain
    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      maxFeePerGas: "6000000000000", // Max fee per gas
    });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    return error as string;
  }
};

export const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await signer.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error as string;
  }
};

export default { getChainId, getAccounts, getBalance, sendTransaction, signMessage };
