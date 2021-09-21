import "../styles/globals.css";
import dynamic from "next/dynamic";
// import "tailwindcss/tailwind.css";
import DefLayout from "../layouts/layout";
import TestLayout from "../layouts/test";
import { Provider } from "react-redux";
import store from "../store/index";

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("../components/NoSSR"), {
    ssr: false,
  });
  switch (pageProps.layout) {
    case "test": {
      return (
        <>
          <Provider store={store}>
            <TestLayout>
              <Component {...pageProps} />
            </TestLayout>
          </Provider>
        </>
      );
    }
    default: {
      return (
        <>
          <Provider store={store}>
            <DefLayout>
              <Component {...pageProps} />
            </DefLayout>
          </Provider>
        </>
      );
    }
  }
}

export default MyApp;
