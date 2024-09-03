import type { AppProps } from "next/app";
import { ModalProvider } from "~/contexts/ModalProvider";
import { Web3AuthProvider } from "~/contexts/Web3AuthProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </Web3AuthProvider>
  );
}
