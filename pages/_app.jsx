import { SWRConfig } from "swr";
import fetch from "../lib/fetchJson";
import '../styles/index.scss'
import '../styles/room.scss'
import '../styles/components/blocks/error.scss'
import '../styles/components/header.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
