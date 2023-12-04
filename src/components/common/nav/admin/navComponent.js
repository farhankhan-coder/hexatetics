import React, { useEffect, useState } from "react";
// import Top from "../admin/top.component";
import Top from "@/components/layout/top";
// import Bottom from "../admin/bottom.component";
import Bottom from "./bottomComponent";
// import Head from "next/head";
// import noInternet from 'no-internet'
// import NoConnection from "@/pages/noconnection";
// import { Inter } from '@next/font/google'
import Link from "next/link";
import TopComponent from "./topComponent";
// const myinter = Inter({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   subsets: ['latin'],
//   display: 'swap'
// })

export default function Layout({ children, ...pageProps }) {
  const [IsOnline, setOnline] = useState(true);
  // useEffect(() => {
  //   noInternet().then(offline => {
  //     if (offline) {
  //       setOnline(false);
  //     }
  //   })
  // }, []);

  return (
    <>
      {/* <Head> */}
      <title>
        {pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Welcome to
        EMS
      </title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Link rel="icon" href="javascript:void(0)" />
      {/* </Head> */}
      {/* {IsOnline ?  */}
      <>
        {/* <Top /> */}
        <TopComponent />
        <main
        //  className={myinter.className}
        >
          <div
            className="pl-[95px] xl:pl-[7.292vw]
       pr-[15px] xl:pr-[3.125vw] xl:pt-[4.792vw]"
          >
            {children}
          </div>
        </main>{" "}
        <Bottom />
      </>{" "}
      {/* <NoConnection/> */}
    </>
  );
}
