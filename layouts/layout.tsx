import Head from "next/head";

type Element = {
  children: JSX.Element | JSX.Element[];
};

export default function layout({ children }: Element) {
  return (
    <>
      <Head>
        <title>デフォルトレイアウト</title>
      </Head>
      <header className={`t-def-header bg-gray-500`}>ヘッダーです</header>
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer bg-green-300`}>フッターです</footer>
    </>
  );
}
