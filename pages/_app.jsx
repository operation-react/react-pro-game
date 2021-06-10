import { SWRConfig } from "swr";
import Head from "next/head";
import fetch from "../lib/fetchJson";
import '../styles/index.scss'
import '../styles/room.scss'
import '../styles/rooms.scss'
import '../styles/components/blocks/error.scss'
import '../styles/components/header.scss'
import '../styles/components/roomContainer.scss'
import '../styles/components/voting.scss'

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
      <Head>
        <link rel="icon" href="/img/icon.png" />
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
