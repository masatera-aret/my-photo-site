export default function layout({ children }) {
  return (
    <>
      <header className={`t-def-header bg-gray-500`}>ヘッダーです</header>
      <div className={`t-def-main`}>{children}</div>
      <footer className={`t-def-footer bg-green-300`}>フッターです</footer>
    </>
  );
}
