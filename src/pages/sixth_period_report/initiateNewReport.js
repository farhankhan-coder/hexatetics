import React from "react";
// import ReportLeftNav from "../../Component/report-left/reportleftnav";
import ReportLeftNav from "./leftNav";
import { useState } from "react";
// import BasicInfo from "./basicinfo";
// import PreviewAndEdit from "./previewandedit";
import BasicInfo from "./basicInfo";
import Link from "next/link";
import PreviewAndEdit from "./previewEditButton";

export default function SixperiodInitiateReport() {
  const [date, setDate] = useState(null);

  const data = [
    { no: "1", route: "", name: "Basic info" },

    { no: "2", route: "", name: "Preview & Edit" },
  ];
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto styled-select">
        <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
          <div className="relative overflow-hidden transform transition-all w-full">
            <div className="grid grid-cols-12 custmCols">
              <div className="col-span-3 h-full sideBarLeft openSideDiv">
                <ReportLeftNav
                  title={"GUSD 6th Period Teaching Assignment"}
                  back={"/six-period"}
                  data={data}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </div>
              <div className="col-span-6 xl:col-span-6 mScrollCstm overflow-auto">
                <div
                  className="tab-c tab-active p-lr-110 pt-10 xl:pt-0 h-[40vw]"
                  data-id="tab1"
                >
                  {activeIndex == 1 ? <div>
                    <BasicInfo
                       setActiveIndex={setActiveIndex}
                       activeIndex={activeIndex}
                        />
                  </div> : null}
                  {activeIndex == 2 ?  <div><PreviewAndEdit setActiveIndex={setActiveIndex}
                       activeIndex={activeIndex}/></div> : null}
                </div>
                
              </div>
              <div className="col-span-3 h-full sideBarLeft openSideDiv">
                  <div className="font-semibold text-[18px]">Employee Details</div>
                  <div className="text-[14px] mt-10">
                    <div>Name</div>
                    <div>Pooja Innive</div>
                  </div>
              </div>
            </div>
          </div> 
        </div>
       
      </div>
    </>
  );
}
