import Head from "next/head";
import DefLayout from "../layouts/layout";
import Test from "../components/TestComponent";

export const getStaticProps = () => ({
  props: {
    layout: "test",
  },
});

export default function Home() {
  return (
    <>
      <Head>
        <title>タイトルです</title>
      </Head>
      <div className={`bg-blue-300`}>test</div>
      <Test />
    </>
  );
}
