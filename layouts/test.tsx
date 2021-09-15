import DefHeader from "../components/header/DefHeader";

export default function TestLayout({ children }) {
  return (
    <>
      <DefHeader />
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer bg-pink-300`}>テストフッター</footer>
    </>
  );
}
