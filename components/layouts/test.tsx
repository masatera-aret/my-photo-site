import MobileHeader from "@/components/header/MobileHeader";

export default function TestLayout({ children }) {
  return (
    <>
      <MobileHeader />
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer bg-pink-300`}>テストフッター</footer>
    </>
  );
}
