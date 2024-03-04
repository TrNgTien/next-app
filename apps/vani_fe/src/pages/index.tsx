import React from "react";
import Head from "next/head";
import LoginPage from "@/components/layout/auth-layout/LoginPage";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Vina Hero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginPage />
      </main>
    </React.Fragment>
  );
}
