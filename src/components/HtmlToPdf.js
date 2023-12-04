import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

class HtmlToPdf extends React.Component {




    generatePDF = () => {
        const input = document.getElementById('my-html-template');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF(
                    // {
                    //     orientation: "landscape",
                    //     unit: "in",
                    //     // format: [4, 2]
                    // }
                );

                pdf.addImage(imgData, 'PNG', 5, 5);
                pdf.setDisplayMode('fullwidth', 'continuous');

                pdf.save('myPDF.pdf');
            });
    }



    render() {
        const formattedFromDate = moment(this.props.data?.dateFrom,"YYYY-DD-MM").format("MM/DD/YYYY");
        const formattedtoDate = moment(this.props.data?.dateTo,"YYYY-DD-MM").format("MM/DD/YYYY");
		
        
        return (

            <>
                <div id="my-html-template" className='border px-8'>
                    <center className="relative"><b>CERTIFICATE</b>  {this.props.data?.formName ? <span className="absolute right-0">{this.props.data?.formName}</span> :null  }  </center> 
                    <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                        <div>Certificated Personnel Office</div>
                        <div style={{ marginTop: '20px' }}><b>REQUEST FOR APPROVAL - {this.props.data?.appName}</b></div>
                    </center>
                    <div className='mt-4 border-4 p-4'>
                        <p className='font-light text-xs'>DIRECTIONS: This form should be completed and sent to the offices indicted below for approval. After all necessary approvals, the form should be forwarded to the Human Resources office which will submit the recommendation to the Board of Education for final approval. This form must be received by the Human Resources office prior to commencement of the sixth period assignment.</p>
                    </div>
                    <div>



                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <p className='mt-2.5 leading-10'>
                            It is requested that approval be granted to assign, on a voluntary basis, <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.employeeName}</span> EID# <span className='w-16 mx-8 text-[green] font-medium'>{(this.props.data.employeeId).substring(0, (this.props.data.employeeId).indexOf("(")).trim()}</span>, teacher, to a {this.props.data?.appName} at <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>
                                {formattedFromDate}</span> to <span className='w-16 mx-8 text-[green] font-medium'>{formattedtoDate}.</span>
                        </p>
                        <p className='mt-2.5 leading-10'>
                            {/* Reason For Absence Request: <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.subjectName}</span>  */}
                            Subject Area Added <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.subjectName}</span>
                            Total Staffing Allocation: <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.staffAllocation}</span>
                            Account Charged: <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.accountCharged}</span> Current FTE Utilized: <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.fteUtilized}</span>
                        </p>

                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px', marginRight: '10px' }}>
                                <div>_________________ <br />
                                    <p style={{ fontSize: '10px' }}>Principal Signature </p>
                                </div>
                                <div style={{ marginLeft: '20px' }}> ____________________<br />
                                    <p style={{ fontSize: '10px' }}>Date</p>
                                </div>
                            </div> */}
                        <div className='mt-2.5 border-b-4 border-[black]'></div>


                        <p className='mt-2.5 leading-10'>
                            I accept, on voluntary basis, a {this.props.data?.appName}  at <span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.schoolName}</span> for the period from <span className='w-16 mx-8 text-[green] font-medium'>{formattedFromDate}</span> to <span className='w-16 mx-8 text-[green] font-medium'>{formattedtoDate}</span>
                        </p>
                        <p className='mt-2.5 leading-10'>
                            I understand and accept this assignment under the following provisions:

                        </p>
                        <ul
                            // style={{listStyleType:'lower-alpha'}}
                            className='list-decimal mt-2.5 leading-10 pl-20'
                        >
                            <li>Payment for the Substitute Request - Classified teaching assignment shall be at my hourly rate of pay,determined by dividing my daily rate of pay by five (5).</li>
                            <li>The Substitute Request - Classified teaching assignment will ot interfere with my regularly assigned duties.</li>
                            <li>The SSubstitute Request - Classified teaching assignment replaces my normal preparation/conference period,which will then be scheduled immediately preceding or concluding the normal worksite day.</li>
                            <li>This assignment i contingent on funding and enrollment.</li>
                        </ul>

                        {/* //------------------------------------------------------------------------------------------------------ */}
                    </div>
                </div>

                {/* //----------------------------------------------------------------------- */}
                {/* <div id="my-html-template" className='border'>
                    <div >
                        <center><b>CERTIFICATE</b></center>
                        <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                            <div>Certificated Personnel Office</div>
                            <div style={{ marginTop: '20px' }}><b>REQUEST FOR APPROVAL - SIXTH PERIOD TEACHING ASSIGHNMENT</b></div>
                        </center>


                        <div style={{ padding: "0px 15px 0px 15px" }}>


                            <div style={{ marginTop: '10px' }}>Its requested that approval be granted to assign, on a voluntary
                                basis,<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.employeeName}</span></span></div>
                            <div style={{ marginTop: '7px' }}>EID teacher,<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data.employeeId}</span></span> to a sixth period teaching assignment at
                                <span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.schoolName}</span></span>
                            </div>
                            <div style={{ marginTop: '7px', marginRight: '240px' }}> for the period from <span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.dateFrom}</span></span> to <span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data.dateTo}</span></span>
                            </div>
                            <div style={{ marginTop: '7px' }}> Subject Area Added:<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.subjectName}</span></span> Total Staffing
                                Allocation:<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.staffAllocation}</span></span></div>
                            <div style={{ marginTop: '7px' }}>Account Charged:<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.accountCharged}</span></span>Current FTE
                                Utilized:<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.fteUtilized}</span></span></div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px', marginRight: '110px' }}>
                                <div>_________________ <br />
                                    <p style={{ fontSize: '10px' }}>Principal Signature </p>
                                </div>
                                <div style={{ marginLeft: '20px' }}> ____________________<br />
                                    <p style={{ fontSize: '10px' }}>Date</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{ borderBottom: '3px solid black', margin: '15px 15px 0px 15px' }}></div>

                    <div style={{ marginTop: '15px', padding: '0px 15px 0px 15px' }}>
                        <div>I accept, on voluntary basis, a sixth period teaching assignment at
                            <span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.schoolName}</span></span>
                        </div>

                        <div style={{ marginTop: '10px', marginRight: '258px' }}>for the period from<span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.dateFrom}</span></span> to <span className='border-b-4 border-black'><span className='w-16 mx-8 text-[green] font-medium'>{this.props.data?.dateTo}</span></span></div>
                        <div>

                            <p style={{ marginTop: '10px', marginRight: '15px' }}>I understand and accept this assignment under the following provisions:
                            </p>

                            <ol type="a" style={{ padding: '0px 15px 0px 15px' }}>
                                <li style={{ marginTop: '10px' }}>Payment for t he sixth period teaching assignment shall be at my hourly rate of pay,
                                    determined by
                                    dividing my daily rate of pay by five (5).</li>

                                <li style={{ marginTop: '10px' }}> The sixth period teaching assignment will ot interfere with my regularly assigned duties.
                                </li>

                                <li style={{ marginTop: '10px' }}> The sixth period teaching assignment replaces my normal preparation/conference period,
                                    which will
                                    then be scheduled immediately preceding or concluding the normal worksite day.
                                </li>

                                <li style={{ marginTop: '10px' }}>
                                    This assignment i contingent on funding and enrollment.
                                </li>
                            </ol>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '40px', marginRight: '90px' }}>
                            <div>_________________ <br />
                                <p style={{ fontSize: '10px' }}>Principal Signature </p>
                            </div>
                            <div style={{ marginLeft: '20px' }}> ____________________<br />
                                <p style={{ fontSize: '10px' }}>Date</p>
                            </div>
                        </div>

                    </div>

                </div> */}


                <button className='bg-[#113699] border w-full mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center' onClick={this.generatePDF}>Print</button>
            </>

            // <div id="my-html-template">
            //     <h1>My HTML Template</h1>
            //     <p>This is my content.</p>
            // </div>
            // </div>
        );
    }
}

export default HtmlToPdf;