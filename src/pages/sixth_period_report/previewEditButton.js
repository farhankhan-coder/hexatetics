import React, { useState } from 'react'
// import HtmlToPdfSix from '../../Component/Pop-up/sixPeriodpdf/htmltoPdf';
// import { Link } from 'react-router-dom';
import Link from "next/link";
import SixPeriodPDF from '@/components/reportpdftemplate/sixPeriodPDF';
// import HtmlToPdfSix from './htmlToPdf';
// import HtmlToPdf from '@/components/HtmlToPdf';


export default function PreviewAndEdit({setActiveIndex,activeIndex}) {
    
    return (
        <div>
            <div className="col-span-12 overflow-auto xl:col-span-6 mScrollCstm ">
                <div className="pt-10 tab-c tab-active p-lr-110 xl:pt-0">
                    <div className="text-[24px] xl:text-[1.250vw] font-medium">
                        Basic Info
                    </div>
                    <div className="grid grid-cols-1 h-full">
                        <SixPeriodPDF
                          data={
                            {
                                appName:"Sixth Period Teaching Assignment",
                              approvalFinalData:"Welcome" ,
                              employeeName:"Nilesh Nigade teacher three" , 
                              employeeId: "SP-EMP-05-TC,",
                              schoolName: "Eight days",
                              dateFrom: "07/31/2023",
                              dateTo: "07/31/2023",
                              subjectName: "Eglish ",
                              staffAllocation:"1",
                              accountCharged:"",
                              fteUtilized:"",
                              formName: ""
                            }
                          }
                        />
                      </div>

                      {/* <button class="w-[100%] bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] mt-10 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">Print</button> */}
                      <div className="grid grid-cols-2 justify-between mt-[40px] xl:mt-[1.083vw]">
                        <div>
                            <Link href="#" onClick={()=>setActiveIndex(activeIndex-1)} className="inline-block text-[#344054] text-[14px] xl:text-[0.833vw] font-medium border border-[#D0D5DD] bg-white rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]">
                                <i className="mr-1 gusd-arrow-line-right"></i>Previous
                            </Link>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Link  href="#" className="flex items-center text-[#2D5BE5] text-[14px] xl:text-[0.833vw] font-medium border border-[#EFF8FF] bg-[#EFF8FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]">
                                <i className="mr-1 pi pi-save" style={{ fontSize: "0.8rem" }}></i>Save
                            </Link>
                            
                            <Link href="#" onClick={()=>setActiveIndex(activeIndex)} className="flex items-center text-white text-[14px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                            <i className="mr-1 gusd-check"></i>
                            Submit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
