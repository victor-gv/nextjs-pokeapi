import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import SearchContextProvider from "../context/searchContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </>
  );
}

export default MyApp;
