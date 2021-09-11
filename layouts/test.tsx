export default function TestLayout({ children }) {
  return (
    <>
      <header>テストヘッダー</header>
      <main>{children}</main>
      <footer>テストフッター</footer>
    </>
  );
}
