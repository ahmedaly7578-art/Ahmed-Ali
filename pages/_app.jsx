import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";

import Layout from "../components/Layout";
import Transition from "../components/Transition";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Case study pages ship their own dark design, so they stay dark in both themes.
  useEffect(() => {
    const forceDark = /^\/work\/./.test(router.asPath);
    const el = document.documentElement;
    if (forceDark) el.setAttribute("data-force-dark", "");
    else el.removeAttribute("data-force-dark");
  }, [router.asPath]);

  return (
    <>
    <Script id="gtm-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
    </Script>
    <Script
      id="gtm-loader"
      strategy="afterInteractive"
      src="https://www.googletagmanager.com/gtm.js?id=GTM-N2VNQ2K6"
    />
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="min-h-full">
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
    </>
  );
}

export default MyApp;
