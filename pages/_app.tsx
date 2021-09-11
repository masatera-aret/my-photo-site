import "../styles/globals.css";
// import "tailwindcss/tailwind.css";
import DefLayout from "../layouts/layout";
import TestLayout from "../layouts/test";

function MyApp({ Component, pageProps }) {
  switch (pageProps.layout) {
    case "test": {
      return (
        <TestLayout>
          <Component {...pageProps} />
        </TestLayout>
      );
    }
    default: {
      return (
        <DefLayout>
          <Component {...pageProps} />
        </DefLayout>
      );
    }
  }
}

export default MyApp;
