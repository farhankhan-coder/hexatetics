import Top from "./top";
import Left from "./left";
import Head from "next/head";

export default function Layout({ children, ...pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Welcome to GUSD Forms</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Top pageTitle={pageProps.pageTitle} pageName={pageProps.pageName} />
        <Left pageProps={pageProps} />
        <div className="pl-[95px] xl:pl-[7.292vw] pr-[15px] xl:pr-[3.125vw] xl:pt-[4.792vw]">
          <main>
            {children}
          </main>
        </div>
      </>
    </>
  );
}
