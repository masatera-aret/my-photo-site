import "../styles/globals.css";
import dynamic from "next/dynamic";
// import "tailwindcss/tailwind.css";
import DefLayout from "../layouts/layout";
import TestLayout from "../layouts/test";

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("../components/NoSSR"), {
    ssr: false,
  });
  switch (pageProps.layout) {
    case "test": {
      return (
        <NoSSR>
          <TestLayout>
            <Component {...pageProps} />
          </TestLayout>
        </NoSSR>
      );
    }
    default: {
      return (
        <NoSSR>
          <DefLayout>
            <Component {...pageProps} />
          </DefLayout>
        </NoSSR>
      );
    }
  }
}

export default MyApp;
