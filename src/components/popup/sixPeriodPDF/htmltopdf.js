import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from "react-to-print";


const HtmlToPdfSix = (props) => {


    // table configs starts
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    useEffect(() => {
        // getSpecificReportIdApprovalalData(props);
    }, [])

    return (
        <div>
            <div ref={componentRef} >


                <div className='border px-8'>
                    <div className='font-bold grid justify-end'>Form C</div>
                    <center><b>CERTIFICATE</b></center>
                    <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                        <div>Certificated Personnel Office</div>
                        <div style={{ marginTop: '20px' }}><b>REQUEST FOR APPROVAL - {props.data?.appName}</b></div>
                    </center>
                    <div className='mt-4 border-4 p-4'>
                        <div className='font-light text-xs'>DIRECTIONS: This form should be completed and sent to the offices indicted below for approval. After all necessary approvals, the form should be forwarded to the Human Resources office which will submit the recommendation to the Board of Education for final approval. This form must be received by the Human Resources office prior to commencement of the sixth period assignment.</div>
                    </div>
                    <div>
                        <div className='mt-2.5 leading-10'>
                            It is requested that approval be granted to assign, on a voluntary basis, <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.employeeName}</span> EID# <span className='w-16 mx-8 text-[green] font-medium'>{props.data.employeeId},</span> teacher, to a sixth period teaching assignment at <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>{moment(props.data?.dateFrom).format("MM/DD/YYYY")}</span> to <span className='w-16 mx-8 text-[green] font-medium'>{moment(props.data?.dateTo).format("MM/DD/YYYY")}.</span>
                        </div>
                        {
                            props.data?.appName === "Substitute Request Classified" ?
                                <div className='mt-2.5 leading-10'>
                                    Subject Area Added: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.subjectName}</span>
                                    {/* </span> Total Staffing Allocation: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.staffAllocation}</span>
                                    Account Charged: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.accountCharged}</span> Current FTE Utilized: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.fteUtilized}</span> */}
                                </div> :
                                <div className='mt-2.5 leading-10'>
                                    Subject Area Added: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.subjectName}</span> Total Staffing Allocation: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.staffAllocation}</span> <br />
                                    Account Charged: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.accountCharged}</span> Current FTE Utilized: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.fteUtilized}</span>
                                </div>

                        }
                        {/* <div className='mt-2.5 leading-10'>
                            Subject Area Added: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.subjectName}</span> Total Staffing Allocation: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.staffAllocation}</span>
                            Account Charged: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.accountCharged}</span> Current FTE Utilized: <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.fteUtilized}</span>
                        </div> */}

                        <div className='mt-2.5 border-b-4 border-[black]'></div>

                        <div className='mt-2.5 leading-10'>
                            I accept, on voluntary basis, a sixth period teaching assignment at <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>{moment(props.data?.dateFrom).format("MM/DD/YYYY")}</span> to <span className='w-16 mx-8 text-[green] font-medium'>{moment(props.data.dateTo).format("MM/DD/YYYY")}</span>
                        </div>
                        <div className='mt-2.5 leading-10'>
                            I understand and accept this assignment under the following provisions:

                        </div>
                        <ul
                            // style={{listStyleType:'lower-alpha'}}
                            className='list-decimal mt-2.5 leading-10 pl-20'    
                        >
                            <li>Payment for the sixth period teaching assignment shall be at my hourly rate of pay,determined by dividing my daily rate of pay by five (5).</li>
                            <li>The sixth period teaching assignment will not interfere with my regularly assigned duties.</li>
                            <li>The sixth period teaching assignment replaces my normal preparation/conference period,which will then be scheduled <u>immediately preceding or concluding the normal worksite day</u>.</li>
                            <li><u>This assignment is contingent on funding and enrollment.</u></li>
                        </ul>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div>
                            <div  style={{ marginTop: '10px' }} className=" border">

                                {
                                    (props.data.approvalFinalData)?.length > 0 ?
                                        <div className='absenceCode'>
                                            <div className='font-bold my-3'>Approval Status </div>
                                            <table style={{ width: "100%"}}>
                                                <thead>
                                                <tr>
                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }} >Name of Employee</th>
                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Status</th>
                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Time Stamp</th>
                                                    </tr>
                                                    
                                                </thead>
                                                <tbody>
                                                   
                                                    {
                                                        (props.data.approvalFinalData).map((item) => {

                                                            if (item.status !== 'Pending For Approval') {
                                                                return (
                                                                    <tr className='text-center'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.empName}</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.status}</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.approvedDate}</td>
                                                                    </tr>
                                                                )
                                                            }

                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div> : null
                                }

                            </div>
                            Revised 2/3/2022
                        </div>


                        {/* <div className='mt-8'>
                            {isApprove &&
                                <p className='float-right'>
                                    <span>{'Approve by:'}</span>
                                </p>} <br />
                            <p className='float-right'>
                                <span>{(isApprove && firstApproval) ? firstApproval.name : ''}</span>
                                &nbsp;<span>{(isApprove && firstAppDate) ? moment(firstAppDate).format("MM/DD/YYYY HH:mm") : ''}</span>

                            </p> <br />
                            <p className='float-right'>
                                <span>{(isApprove2 && secondApproval) ? secondApproval.name : ''}</span>
                                &nbsp;<span>{(isApprove2 && secondAppDate) ? moment(secondAppDate).format("MM/DD/YYYY HH:mm") : ''}</span>

                            </p>
                        </div> */}

                    </div>
                </div>
            </div>

            <button className='w-[100%] bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] mt-10 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center' onClick={handlePrint} >Print</button>
        </div>
    )
}

export default HtmlToPdfSix
