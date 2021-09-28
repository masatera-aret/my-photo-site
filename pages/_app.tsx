import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Layout from "@/components/layouts/Layout";
import CSRLayout from "../components/layouts/CSRLayout";
import { Provider } from "react-redux";
import store from "@/store/index";

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("@/components/NoSSR"), {
    ssr: false,
  });
  switch (pageProps.layout) {
    case "csr": {
      return (
        <NoSSR>
          <Provider store={store}>
            <CSRLayout>
              <Component {...pageProps} />
            </CSRLayout>
          </Provider>
        </NoSSR>
      );
    }
    case "plain": {
      return (
        <>
          <Component {...pageProps} />
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
