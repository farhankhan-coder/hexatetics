import React from 'react'
import { useState } from "react";
import BasicInfo from '../basicInfo/basicInfo';
import Preview from '../preview/preview';
import ReportLeftNav from '../../../Component/report-left/reportleftnav';


export default function SubstitutePopup() {

  const data = [
    { no: "1", route: "", name: "basic info" },

    { no: "2", route: "", name: "Perview & Edit" },
  ];
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto styled-select">
    <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
      <div className="relative overflow-hidden transform transition-all w-full">
        <div className="grid grid-cols-12   custmCols">
          <div className="col-span-3 h-full sideBarLeft openSideDiv">
            <ReportLeftNav
              title={"Substitute Request - Classified"}
              back={"/initiator/substituteRequestClassified"}
              data={data}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          <div className="xl:col-span-6   md:col-span-6 mScrollCstm overflow-auto">
            <div
              className="tab-c tab-active p-lr-110 pt-10 xl:pt-0 h-[40vw]"
              data-id="tab1"
            >
              {activeIndex == 1 ? <BasicInfo /> : null}
              {activeIndex == 2 ? <Preview /> : null}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  </div>
  )
}
