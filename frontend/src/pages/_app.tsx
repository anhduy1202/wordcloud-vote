import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import NavBar from "@/components/NavBar/NavBar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <AuthProvider session={session}>
        <section className="w-[100vw] h-[100vh] flex flex-col">
          <NavBar />
          <Component {...pageProps} />
        </section>
      </AuthProvider>
    </>
  );
}
