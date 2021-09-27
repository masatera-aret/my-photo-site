import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Layout from "@/components/layouts/Layout";
import Test from "@/components/layouts/test";
import { Provider } from "react-redux";
import store from "@/store/index";

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("@/components/NoSSR"), {
    ssr: false,
  });
  switch (pageProps.layout) {
    case "test": {
      return (
        <>
          <Provider store={store}>
            <Test>
              <Component {...pageProps} />
            </Test>
          </Provider>
        </>
      );
    }
    default: {
      return (
        <>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </>
      );
    }
  }
}

export default MyApp;
