import { Sora } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();
  // About renders its own header inside its scroller on phones so it scrolls with the content.
  const aboutOwnsHeader = pathname === "/about";
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Ahmed Ali | Portfolio</title>
        <meta
          name="description"
          content="Ahmed Ali is a digital marketing specialist with strong experience in the e-commerce field."
        />
        <meta
  name="keywords"
  content="marketing, performance marketing, media buyer, portfolio, ads, meta ads, google ads, growth marketing"
/>
<meta name="author" content="Ahmed Ali" />

        <meta name="theme-color" content="#f13024" />
      </Head>

      <TopLeftImg />
      <Nav />
      <div className={aboutOwnsHeader ? "max-xl:hidden" : "contents"}>
        <Header />
      </div>

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
