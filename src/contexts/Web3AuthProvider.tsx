import { IProvider, UserInfo } from "@web3auth/base";
import { ethers, providers } from "ethers";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { web3auth } from "~/utils/web3auth-config";

type AccountHelperType = { address: string; ethersProvider: providers.Web3Provider; signer: providers.JsonRpcSigner };

type Web3AuthContextType = {
  loggedIn: boolean;
  login: () => void;
  getAccounts: () => Promise<AccountHelperType>;
  logout: () => void;
};

const Web3AuthContext = createContext<Web3AuthContextType>(undefined as unknown as Web3AuthContextType);

const Web3AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useCallback(async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  }, []);

  const getAccounts = useCallback(async (): Promise<AccountHelperType> => {
    if (!provider)
      return { address: "", ethersProvider: {} as providers.Web3Provider, signer: {} as providers.JsonRpcSigner };

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
    const fetchedAddress = accounts[0];

    const signer = await ethersProvider.getSigner(fetchedAddress);
    const address = await signer.getAddress();

    return { address, ethersProvider, signer };
  }, [provider]);

  const logout = useCallback(async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  }, []);

  useEffect(() => {
    const changeNetwork = async () => {
      if (!provider) return;
      const network = await provider.chainId;
      if (network !== "0x66eee" && network !== "421614") {
        await web3auth.switchChain({ chainId: "0x66eee" });
      }
    };
    changeNetwork();
  }, [provider]);

  useEffect(() => {
    const web3AuthInit = async () => {
      try {
        if (!provider) {
          await web3auth.initModal();
          setProvider(web3auth.provider);

          if (web3auth.connected) {
            setLoggedIn(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    web3AuthInit();
  }, [provider]);

  const providerValue = useMemo(
    () => ({
      loggedIn,
      login,
      getAccounts,
      logout,
    }),
    [loggedIn, login, getAccounts, logout],
  );

  return <Web3AuthContext.Provider value={providerValue}>{children}</Web3AuthContext.Provider>;
};

const useWeb3AuthContext = () => useContext(Web3AuthContext);

export { Web3AuthContext, Web3AuthProvider, useWeb3AuthContext };
