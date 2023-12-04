import React, { useState } from 'react'
// import { Link, useParams } from 'react-router-dom';
import Link from "next/link";


export default function ReportLeftNav({ data, title, back, activeIndex, setActiveIndex }) {

  return (
    <div>


      <div className="h-full col-span-2 sideBarLeft openSideDiv">
        <Link href="/sixth_period_report">
          <button type="button" className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md" id="add-family-cancel-btn">
            <i className="gusd-arrow-line-right mr-[14px] xl:mr-[0.729vw]"></i> Back Home
          </button>
        </Link>
        <div className="text-[#101828] text-[12px] mt-[7px] font-normal">{title}</div>
        {
          data?.map((elm, i) => {
            return (
              <div className="mt-[32px] xl:[1.667vw]">
                <ul className="sideTabs">
                  <li>
                    <Link href="#" onClick={() => { setActiveIndex(elm.no)}} to={elm.route} className={`${activeIndex == elm.no ? 'active activeCheck' : 'text:black '}`} >
                      <i className="gusd-check text-[20px] xl:text-[1.042vw]"></i> {elm.name}
                    </Link>
                  </li>
                </ul>
              </div>
            )
          })
        }
        {/* <div className="fixed top-0 left-0 openBtn xl:hidden">
          <button type="button" className="sideDivBtn inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-white text-[14px] xl:text-[0.729vw] font-medium bg-[#3366FF] border border-[#EFF8FF] rounded-r-md">
            <i className="gusd-arrow-line-right"></i>
          </button>
        </div> */}
      </div>



    </div>
  )
}
