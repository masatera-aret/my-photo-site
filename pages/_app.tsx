import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Layout from "@/layouts/Layout";
import CSRLayout from "../layouts/CSRLayout";
import Plain from "@/layouts/Plain";
import { Provider } from "react-redux";
import store from "@/store/index";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/assets/ts/firebase/firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

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
        <Provider store={store}>
          <Plain>
            <Component {...pageProps} />
          </Plain>
        </Provider>
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
