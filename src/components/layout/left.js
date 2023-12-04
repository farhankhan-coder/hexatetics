import { Image } from 'primereact/image';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar({ ...pageProps }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

    return (
        <>
            <div className=''>
                <div className={sidebarOpen ? 'fixed left-0 top-0 bg-[#113699] py-[20px] xl:py-[1.042vw] px-[12px] xl:px-[0.625vw] w-full max-w-[80px] xl:max-w-[4.167vw] h-full z-20 menu-wrap active' : 'fixed left-0 top-0 bg-[#113699] py-[20px] xl:py-[1.042vw] px-[12px] xl:px-[0.625vw] w-full max-w-[80px] xl:max-w-[4.167vw] h-full z-20 menu-wrap'} onMouseEnter={handleSidebarOpen} onMouseLeave={handleSidebarClose}>
                    <ul>
                        <span className='logo' data-aos="fade-right" data-aos-duration="500" data-aos-delay="500">
                            <Link href={"/dashboard"}><Image src={'/assets/images/logo.png'} width={"104"} height={"105"} className='' /></Link>
                        </span>
                        <li className='mt-[50px] xl:mt-[2.604vw]' data-aos="fade-right" data-aos-duration="500" data-aos-delay="500">
                            <Link href={"/dashboard"} className={pageProps.pageProps.activeMenu === "Home" ? "active" : ''} >
                                <i className='gusd-home'></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li data-aos="fade-right" data-aos-duration="900" data-aos-delay="500">
                            <Link href="" className={pageProps.pageProps.activeMenu === "Initiator" ? "active" : ''}>
                                <i className='gusd-document'></i>
                                <span>Initiate Reports</span>
                            </Link>
                        </li>
                        <li data-aos="fade-right" data-aos-duration="1100" data-aos-delay="500">
                            <Link href={"https://drive.google.com/drive/folders/1SWU9XrnkSXyX-WlhdmSoLbqJgtrMNLNs?usp=drive_link"} className={pageProps.pageProps.activeMenu === "Help" ? "active" : ''}>
                                <i className='gusd-help'></i>
                                <span>Help</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
