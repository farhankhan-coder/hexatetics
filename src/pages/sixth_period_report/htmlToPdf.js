import React, { useEffect, useRef, useState } from 'react'

const HtmlToPdfSix = (props) => {
    const componentRef = useRef();
  const [print, setPrint] = useState(false);
    return (
        <div>
            <div>
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
                            It is requested that approval be granted to assign, on a voluntary basis, <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.employeeName}</span> EID# <span className='w-16 mx-8 text-[green] font-medium'>{props.data.employeeId},</span> teacher, to a sixth period teaching assignment at <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>07/31/2023</span> to <span className='w-16 mx-8 text-[green] font-medium'>07/31/2023.</span>
                        </div>
                       
                        <div className='mt-2.5 border-b-4 border-[black]'></div>

                        <div className='mt-2.5 leading-10'>
                            I accept, on voluntary basis, a sixth period teaching assignment at <span className='w-16 mx-8 text-[green] font-medium'>{props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>07/31/2023</span> to <span className='w-16 mx-8 text-[green] font-medium'>07/31/2023</span>
                        </div>
                        <div className='mt-2.5 leading-10'>
                            I understand and accept this assignment under the following provisions:
                        </div>
                        <ul
                            // style={{listStyleType:'lower-alpha'}}
                            className='list-decimal mt-2.5 leading-10 pl-20'>
                            <li>Payment for the sixth period teaching assignment shall be at my hourly rate of pay,determined by dividing my daily rate of pay by five (5).</li>
                            <li>The sixth period teaching assignment will not interfere with my regularly assigned duties.</li>
                            <li>The sixth period teaching assignment replaces my normal preparation/conference period,which will then be scheduled <u>immediately preceding or concluding the normal worksite day</u>.</li>
                            <li>This assignment is contingent on funding and enrollment.</li>
                        </ul>
                        <br /><br /><br /><br /><br />
                        <div>
                            <div style={{ marginTop: '10px' }} className=" border">
                                <div>
                                    <div className='font-bold my-3'>Approval Status </div>
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }} >Name of Employee</th>
                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Status</th>
                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Time Stamp</th>
                                            </tr>
                                           <tr className='text-center'>
                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Nilesh Nigade teacher three</td>
                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Approved</td>
                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>08-24-2023 16-59</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            Revised 2/3/2022
                        </div>
                    </div>
                </div>
            </div>
                { props.print === true ?
                <button class="w-[100%] bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] mt-10 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">Printt</button>
                    //  <button className=' bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center' >Print</button>
                    : null
                }
           
        </div>
    )
}


export default HtmlToPdfSix


