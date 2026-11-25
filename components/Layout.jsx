import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Ahmed Ali | Head Media Buyer</title>
        <meta
          name="description"
          content="Ahmed Ali is a head media buyer. Paid campaigns on Meta, Google and Snapchat, tracking with GTM and GA4, and the Tracking From Zero course."
        />
        <meta
  name="keywords"
  content="marketing, performance marketing, media buyer, portfolio, ads, meta ads, google ads, growth marketing"
/>
<meta name="author" content="Ahmed Ali" />

        <meta name="theme-color" content="#131424" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Ahmed Ali | Head Media Buyer" />
        <meta property="og:description" content="Paid campaigns, tracking and training. Tracking From Zero, a course for media buyers." />
        <meta property="og:type" content="website" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
