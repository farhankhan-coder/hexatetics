import React, { useRef, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import moment from "moment";
// import handleDateSelect from '/helper/convertDateIntoPSTFormat';


const SubstituteRequestClassifiedHtmlToPdfSix = (props) => {


    let { accountNoArray = [], approvalFinalData = [] } = props.data;


    let rejectedData = approvalFinalData.filter(item => item.status === 'Rejected')

    const [approvedBy, setApprovedBy] = useState("");
    const [payrollBy, setPayrollBy] = useState("");
    const [approverDate, setApproverDate] = useState('');
    const [payrollDate, setPayrollDate] = useState('');
    const [Clicked, setClicked] = useState(false);


    // table configs starts
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const handleClick = () => {
        setClicked(true);
        handlePrint();
    };



    return (
        <div>
            <div ref={componentRef} >
                <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] p-3'>
                    <div id="my-html-template" className='border px-8'>
                        <div className='w-full pt-3 ' >
                            <div className='flex justify-center '>
                                <b className=''>CLASSIFIED </b>

                            </div>
                            <div className='flex justify-end relative top-[-1.4vw] print:top-[-1.6vw]'>
                                <b className=''>FORM 3 </b>
                            </div>

                        </div>

                        <center className='font-semibold' style={{ marginTop: '-10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                            <div>Glendale, California</div>
                            <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>

                            <div className='border border-[#545454] w-2/4 text-[12px] mt-4 p-4 rounded-lg'>
                                DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.
                            </div>
                        </center>
                        <div className='mt-8'>

                            <div className='leading-8 '>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2'>CLASSIFICATION <div className='text-[green] font-bold  print:w-[20.625vw]   border-b border-[#545454]'>{props.data?.classification}</div>
                                    </div>

                                    <div>DATES From: &nbsp;<span className='text-[green] font-bold border-b border-[#545454]'>{moment(props.data?.dateFrom).format("MM/DD/YYYY")}</span> &nbsp; Thru: <span className='text-[green] font-bold border-b border-[#545454]'>{props.data?.dateTo && props.data?.dateTo !== null ? moment(props.data?.dateTo).format("MM/DD/YYYY") : '-'}</span></div></div>
                                <div>Type of Sub Request/Object Code: <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[20.625vw]'>{props.data?.typeofSub}</span></div>
                                <div className='flex gap-2'>Absent Employee's Legal Name (if applicable)<span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[30.625vw]'>{props.data?.employeeName}</span></div>

                                <div className='flex justify-between'>
                                    <div>Total Working Hours <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[20.625vw]'>{props.data?.totalWorkingHours}</span></div>
                                    <div>From <span className='text-[green] font-bold border-b border-[#545454]'>{moment(props.data?.fromTime, 'HH:mm:ss.SSS').format('hh:mm A')}</span> &nbsp; To <span className='text-[green] font-bold border-b border-[#545454]'>{moment(props.data?.endTime, 'HH:mm:ss.SSS').format('hh:mm A')}</span></div>
                                </div>
                                <div className='flex gap-2 mt-1'>
                                    <div>Location</div>
                                    <div className='text-[green] font-bold border-b border-[#545454]'>{props.data?.schoolName}
                                    </div>
                                </div>

                                <div>Reason For Absence/Request <span className='text-[green] font-bold border-b border-[#545454]'>{props.data?.subjectName}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-1'>
                                        If possible, we would like to have
                                        <span className='text-[green] font-bold border-b border-[#545454] w-[10.625vw]  print:w-[20.625vw]'>{props.data?.substituteName ? props.data?.substituteName : "-"}</span><span className='text-[green] font-bold '>
                                        </span>
                                    </div>
                                    <div className=''>
                                        <span>Confirmation status </span>
                                        {/* <span className='text-[green] font-bold w-[1]  print:w-[2.625vw]'>{props.data.confirmationStatus ? props.data.confirmationStatus : "-"}</span> */}
                                        {/* {props.data.confirmationStatus ? props.data.confirmationStatus : "-"} */}
                                        <span className='text-[green] font-bold pl-4'>{props.data.confirmationStatus}</span>

                                        </div>
                                </div>
                            </div>

                            <div className='flex gap-2'>

                                <table style={{ width: "100%", marginTop: "20px" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Account Number(s) To Be Charged</th>
                                            <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Percentage</th>
                                        </tr>
                                    </thead>
                                    {
                                        accountNoArray.map((item) => {
                                            return (
                                                <tr className='text-center'>
                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.accountNumber}</td>
                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.percentage === 'null' || item.percentage === '' || item.percentage === null ? '-' : item.percentage}</td>
                                                </tr>
                                            );
                                        })
                                    }

                                </table>
                            </div>


                            <div className='text-[14px] mt-[2vw] py-3'>Revised 1/17/23</div>
                        </div>



                        {/* {Clicked === true ?  */}

                        <div className='float-right'>
                            {
                                (props.initiatorInfo) ?
                                    <div>
                                        <span className='font font-bold'>{'Submitted by:'}</span><br />
                                        <span className='font'>{props.initiatorInfo.empName ? props.initiatorInfo.empName : null}
                                            {props.initiatorInfo?.date ? handleDateSelect(props.initiatorInfo?.date) : null}
                                            <br />
                                        </span>
                                    </div> : null

                            }


                            <span className='font font-bold'>{'Approved by:'}</span><br />
                            {
                                approvalFinalData.map((data1, index) => {
                                    return (
                                        <>
                                            {data1.status === "Approved" || data1.status === "Close" ?
                                                <span className='font'>{data1.empName ? data1.empName : null}
                                                    {data1?.updatedAt ? data1?.updatedAt : null}
                                                    <br />
                                                </span>
                                                : null}
                                        </>
                                    )
                                })
                            }

                            {
                                rejectedData.length > 0 ? <><span className='float-left mr-3 font font-bold'>{`Rejected by:`}</span><br /></> : ''
                            }

                            {
                                rejectedData.map((data1, index) => {
                                    return (
                                        <>
                                            <span className='font'>{data1.empName ? data1.empName : null}
                                                {data1?.updatedAt ? data1?.updatedAt : null}
                                                <br />
                                            </span>

                                        </>
                                    )
                                })
                            }

                        </div>
                        {/* : null
                      }
                         */}
                    </div>
                </div>

            </div>

            <button className='w-[100%] bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center mt-6' onClick={handleClick}>Print</button>
        </div>
    )
}

export default SubstituteRequestClassifiedHtmlToPdfSix
