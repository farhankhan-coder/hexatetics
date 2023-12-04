import React from 'react';
// import './base.min.css'
// import './fancy.min.css'
// import './main.css'
import { useRef } from "react";
import { Checkbox } from "primereact/checkbox";
// import landing_logo from "../../assets/images/landing_logo.png";
import { Image } from "primereact/image";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from "react-to-print";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
// import { Request_Stipend_Status, stipend_Type, Request_Stipend_Status_Name } from '../../helper/enum';
import { Tag } from 'primereact/tag';
import { Request_Stipend_Status, stipend_Type, Request_Stipend_Status_Name } from '../helper/enum';


const StipendFormPdf = (props) => {

    const approvalStatusBody = (product) => {
        return <Tag value={product.status} severity={approveStatusOptions(product)}></Tag>;
    };

    const approveStatusOptions = (product) => {

        switch (product.status) {
            case Request_Stipend_Status.REJECT:
                return 'danger';

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL:
                return 'warning';
            case Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN:
                return 'warning';
            case Request_Stipend_Status.PENDING:
                return 'warning';
            case "Approved":
                return 'success';
            case Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN:
               return 'success';
                case Request_Stipend_Status.SUBMITTED:
                return 'info';
                case 'Completed':
                    return 'success';
                case 'Completed-(step 9)':
                    return 'success';
                case Request_Stipend_Status_Name[8]:
                    return 'success'; 
            default:
                return null;
        }
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const generatePDF = async (fileName) => {
        const input = document.getElementById('my-html-template');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF(
                    {
                        orientation: "landscape",
                        unit: "in",
                        // format: [4, 6]
                    }
                );
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.setDisplayMode('fullwidth', 'continuous');
                pdf.save('Stipend.pdf');
            });
    }

    return (
        <>
            <div>
                <div id="my-html-template" ref={componentRef}>
                    <div>
                        <div id="outline">
                        </div>
                    </div>
                    <div id="page-container">
                        <div className='pt-5'>
                            <div className='marginTop'>
                                <div className='flex gap-4 w-10/12 justify-center m-auto item-center lg:h-[100px]'>
                                    {/* <Image src={landing_logo} width={"150"} height={"150"}
                                        className="rounded-full w-[160px] h-[160px] xl:w-[10.292vw] xl:h-[10.292vw]"
                                    /> */}
                                    <span class="p-image p-component rounded-full w-[160px] h-[160px] xl:w-[10.292vw] xl:h-[10.292vw]">
                                        <img src="/assets/images/landing_logo.png " width="150" height="150" /></span>
                                     {/* <img  width={"50"} height={"50"}
                                        className="rounded-full w-[160px] h-[160px] xl:w-[8.333vw] xl:h-[8.333vw]" /> */}
                                    <div className='pt-2'>
                                        <div style={{ margin: '', textAlign: 'center', fontSize: '14pt',fontFamily:'serif' }}><strong>GLENDALE UNIFIED SCHOOL DISTRICT</strong></div>
                                        <div style={{ margin: '', textAlign: 'center', fontSize: '10pt' }}><strong>“Preparing our students for&nbsp;</strong><strong><em>their&nbsp;</em></strong><strong>future”</strong></div>
                                        <div style={{ margin: '', textAlign: 'center', lineHeight: '108%', fontSize: '10pt' }}>Office of the Chief Human Resources &amp; Operations Officer 223 North Jackson St., Glendale, California 91206-4380 Telephone: 818-241-3111, Ext. 1256 • Fax: 818-547-3207</div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', fontSize: '16pt' }} className='my-[55px]'><strong><u>Official Stipend Form</u></strong></div>

                                {/* <div style={{ marginTop: '4.55pt', marginLeft: '6pt', marginBottom: '0pt' }}><span style={{ letterSpacing: '-0.45pt' }}>&nbsp;</span>:<span style={{ letterSpacing: '0.05pt' }}>&nbsp;</span> </div>
                                <div style={{ marginTop: '0.4pt', marginBottom: '0pt', fontSize: '7pt' }}>&nbsp;</div> */}
                                <div className='px-16 '>
                                <div className='grid grid-cols-2 gap-2 my-2'>
                                    <div className='col-span-2 mt-[25px]'>
                                        <div className='flex'>
                                            <div style={{fontFamily:'serif'}}>SCHOOL NAME:  &nbsp;</div>
                                            <div className='grow'>{props.data?.schoolName}</div>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div style={{fontFamily:'serif'}}>SCHOOL YEAR: &nbsp;</div>
                                        <div className='grow'>{props.data?.schoolYear}</div>
                                    </div>
                                    <div className='flex'>
                                        <div style={{fontFamily:'serif'}}>SEMESTER: &nbsp;</div>
                                        <div className='grow'>{props.data?.schoolSemister}</div>
                                    </div>

                                </div>
                                <div className='flex'>
                                        <div style={{fontFamily:'serif'}}>EMPLOYEE NAME: &nbsp;</div>
                                        <div className='grow'>{props.data?.employeeName}</div>
                                    </div>
                                {/* <div className='flex' style={{ marginTop: '4.6pt', marginLeft: '6pt', marginBottom: '0pt' }}> </div>
                                <div style={{ marginTop: '0.3pt', marginBottom: '0pt', fontSize: '7pt' }}>&nbsp;</div> */}
                                <div style={{ marginTop: '20px', marginLeft: '0pt', marginBottom: '0pt',fontFamily:'serif' }} className='my-3'><strong>STIPEND TYPE: </strong></div>

                                <div style={{ marginTop: '4.55pt', marginBottom: '20pt' }} className='ml-10 my-5'>
                                    {props.data?.stipendTypes.map((title) => {
                                        return (<>
                                            <div className="flex flex-column gap-3 py-2">
                                                <Checkbox disabled inputId={title.key} name="title" value={title} checked={props.data?.selectedConfirmation.some((item) => item.key === title.key)} />
                                                <label className="mt-15 text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" htmlFor={title.key}>
                                                    {title.name}
                                                </label>
                                            </div>
                                        </>
                                        );
                                    })}
                                </div>
                                <div>

                                </div>

                                {
                                    props.data.assignmentArray.length > 0 ? (
                                        <>
                                            {props.data.assignmentArray?.map((item, index) => {
                                                return (
                                                    <React.Fragment key={item.id}>
                                                        <div className='grid grid-cols-2 gap-2 my-4'>

                                                            <div className='flex gap-3'>
                                                                <div style={{fontFamily:'serif'}}> ASSIGNMENT #{index + 1}:   </div>
                                                                <div><u> {item.name}</u>  </div>
                                                            </div>
                                                            <div className='flex gadiv-3 gap-3'>
                                                                <div style={{fontFamily:'serif'}}> AMOUNT:  </div>
                                                                <div><u>  {item.amount ? item.amount:'-'}</u>  </div>
                                                            </div>
                                                            <div className='flex gap-3'>
                                                                <div> <Checkbox disabled checked={item.isSplit} className='mr-1' />  </div>
                                                                <div>Split: <u> {item.splitText ? item.splitText : '-'}</u>  </div>
                                                            </div>
                                                            <div className='flex gap-3'>
                                                                <div> <Checkbox disabled checked={item.isExtraCurricular} className='mr-1' />Extra Curricular  </div>
                                                            </div>

                                                            <div className='flex gadiv-3'>
                                                                <div> <Checkbox disabled checked={item.isDeptChair} className='mr-1' /> Department Chair </div>
                                                            </div>

                                                            <div className='flex gap-3'>
                                                                <div> No. Of Employee: </div>
                                                                <div><u> {item.noOfEmployee ? item.noOfEmployee : '-'}</u>  </div>
                                                            </div>

                                                        </div>

                                                    </React.Fragment>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            <div><br style={{ pageBreakBefore: 'always', clear: 'both', msoBreakType: 'section-break' }} /></div>
                            <div className='px-16'>
                                <h1 style={{ marginTop: '20px', marginLeft: '0pt', marginBottom: '0pt',fontFamily:'serif' }} className='my-3'><strong><u>ELEMENTARY EXTRA-CURRICULAR STIPENDS</u></strong></h1>
                                <div style={{ margin: '1divt 5.75pt 0pt 5.95pt', textAlign: 'justify', lineHeight: '108%' }}>For approved categories, please see the CBA Appendix E, Assignment 12a. <strong>At the elementary level, up to six (6) stipends per semester were approved per school.&nbsp;</strong>This form will designate the employee to which you wish the stipend to be paid. It is also possible to split the stipend equally between two teachers, should you wish to do so for such activities as Math Field Day and/or Spelling Bee, etc. While it is not required that you use the stipend each "semester" (1/2 year), it is available.</div>
                                <div style={{ marginTop: '0.3pt', marginBottom: '0pt', fontSize: '11.5pt' }}>&nbsp;</div>
                                <div style={{ marginTop: '0pt', marginLeft: '5.95pt', marginBottom: '0pt', textAlign: 'justify' }}>In addition, a Choral Director stipend is available per CBA Appendix E, Assignment 2.</div>
                                <div style={{ marginTop: '0pt', marginBottom: '0pt', fontSize: '12pt' }}>&nbsp;</div>
                                <h1 style={{ marginTop: '20px', marginLeft: '0pt', marginBottom: '0pt',fontFamily:'serif' }} className='my-3'><u><strong>MIDDLE SCHOOL EXTRA-CURRICULAR STIPENDS</strong></u></h1>
                                <div style={{ margin: '0.9pt 5.7pt 0pt 5.95pt', textAlign: 'justify', lineHeight: '108%' }}>For approved stipends, please see CBA Appendix E, Assignments 1-14 and Appendix N, Head<span style={{ letterSpacing: '-1.85pt' }}>&nbsp;</span>Counselor. <strong>At the middle school level, up to six (6) stipends per semester were approved per school for Assignment 12b.&nbsp;</strong>This form will designate the employee to which you wish the stipend to be paid. It is also possible to split the stipend equally between two teachers, should you wish to do so. While it is not required that you use the stipend each semester, it is<span style={{ letterSpacing: '-0.25pt' }}>&nbsp;</span>available.</div>
                                <div style={{ marginTop: '0pt', marginBottom: '0pt', fontSize: '12pt' }}>&nbsp;</div>
                                <div style={{ marginTop: '0.3pt', marginBottom: '0pt', fontSize: '11.5pt' }}>&nbsp;</div>
                                <h1 style={{ marginTop: '20px', marginLeft: '0pt', marginBottom: '0pt',fontFamily:'serif' }}><u><strong>HIGH SCHOOL EXTRA-CURRICULAR STIPENDS</strong></u></h1>
                                <div style={{ margin: '0.95pt 5.75pt 0pt 5.95pt', textAlign: 'justify', lineHeight: '108%' }}>For approved stipends, please see CBA Appendix E, Assignments 1-14 and Appendix N, Head<span style={{ letterSpacing: '-1.85pt' }}>&nbsp;</span>Counselor. <strong>At the high school level, up to eight (8) stipends per semester were approved per school for Assignment 12b.&nbsp;</strong>This form will designate the employee to which you wish the stipend to be paid. It is also possible to split the stipend equally between two teachers, should you wish to do so. While it is not required that you use the stipend each semester, it is<span style={{ letterSpacing: '-0.25pt' }}>&nbsp;</span>available.</div>
                                <div style={{ marginTop: '0pt', marginBottom: '0pt', fontSize: '12pt' }}>&nbsp;</div>
                                <div style={{ marginTop: '0.3pt', marginBottom: '0pt', fontSize: '11.5pt' }}>&nbsp;</div>
                                <h1 style={{ marginTop: '20px', marginLeft: '0pt', marginBottom: '0pt',fontFamily:'serif' }}><u><strong>SECONDARY DEPARTMENT CHAIR STIPENDS</strong></u></h1>
                                <div style={{ margin: '0.9pt 5.7pt 0pt 6pt', lineHeight: '108%' }}>For approved Department Chairperson stipends, please see CBA Appendix E, Assignments 15. This form will designate the employee to which you wish the stipend to be paid. It is also possible to split the stipend equally between two teachers, should you wish to do so. While it is not required that you use the stipend each semester, it is available. Department stipends available include:</div>
                            </div>

                            <div className='flex gap-10 my-5 px-16'>
                                <ul style={{ margin: '0pt', paddingLeft: '0pt',listStyleType:'disc' }}>
                                    <li style={{ marginTop: '7.95pt', marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Art</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Business</span><span style={{ fontSize: '11pt', letterSpacing: '-0.05pt' }}>&nbsp;</span><span style={{ fontSize: '11pt' }}>Education</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>English</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>ELD</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Foreign</span><span style={{ fontSize: '11pt', letterSpacing: '-0.25pt' }}>&nbsp;</span><span style={{ fontSize: '11pt' }}>Language</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Health &amp;</span><span style={{ fontSize: '11pt', letterSpacing: '-0.2pt' }}>&nbsp;</span><span style={{ fontSize: '11pt' }}>Guidance</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Home</span><span style={{ fontSize: '11pt', letterSpacing: '-0.05pt' }}>&nbsp;</span><span style={{ fontSize: '11pt' }}>Economics</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.6pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Industrial Arts</span></li>
                                </ul><br style={{ clear: 'both', msoColumnBreakBefore: 'always' }} />
                                <ul style={{ margin: '0pt', paddingLeft: '0pt',listStyleType:'disc' }}>
                                    <li style={{ marginTop: '7.95pt', marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Math</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Music</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>P.E.</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Reading</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Science</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.45pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Social Studies</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.5pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>Special Education</span></li>
                                    <li style={{ marginLeft: '36.41pt', lineHeight: '19.6pt', paddingLeft: '5.59pt', fontSize: '16pt' }}><span style={{ fontSize: '11pt' }}>VAPA</span></li>
                                </ul>
                            </div>
                            <div><br style={{ clear: 'both', msoBreakType: 'section-break' }} /></div>
                            <div className='p-5'>
                                <div style={{ marginTop: '0pt', marginBottom: '0pt', fontSize: '10pt' }}>&nbsp;</div>
                                <div style={{ marginTop: '0.1pt', marginBottom: '0pt', fontSize: '9.5pt' }}>&nbsp;</div>
                                <div style={{ marginTop: '4.6pt', marginLeft: '5.95pt', marginBottom: '0pt', lineHeight: '108%' }}><strong>Sports</strong><strong><span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span></strong><strong>Stipends</strong><strong><span style={{ letterSpacing: '-0.5pt' }}>&nbsp;</span></strong>in<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>CBA<span style={{ letterSpacing: '-0.6pt' }}>&nbsp;</span>Appendix<span style={{ letterSpacing: '-0.6pt' }}>&nbsp;</span>E,<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>Assignments<span style={{ letterSpacing: '-0.5pt' }}>&nbsp;</span>16-19<span style={{ letterSpacing: '-0.4pt' }}>&nbsp;</span>will<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>be<span style={{ letterSpacing: '-0.65pt' }}>&nbsp;</span>submitted<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>on<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>a<span style={{ letterSpacing: '-0.55pt' }}>&nbsp;</span>separate<span style={{ letterSpacing: '-0.5pt' }}>&nbsp;</span>Athletics<span style={{ letterSpacing: '-0.5pt' }}>&nbsp;</span>Stipend form.</div>
                            </div>
                            </div>

                            {
                                (props.data.approvalFinalData) ?
                                    <div>
                                        <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                            <div className="mb-1 absenceCode">
                                                <label className="text-[#344054] text-[18px] xl:text-[0.938vw] font-medium pb-1" htmlFor="username"><strong>Approval Status</strong> </label>
                                                {/* <div className="py-3 emp-simple-tbl"> */}
                                                    <DataTable
                                                        className="custTable  customaddedcss"
                                                        value={props.data.approvalFinalData}
                                                        showGridlines 
                                                    >
                                                        <Column field="empCode" header="Employee Id"></Column>
                                                        <Column field="empName" header="Name"></Column>
                                                        <Column field="status" body={approvalStatusBody} header="Status"></Column>
                                                        <Column field="approvedDate" header="Time Stamp"></Column>

                                                    </DataTable>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div> : null
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white' onClick={handlePrint} >
                <div className={`${(props.data.previewAndEdit === false) ? 'absolute bottom-2 left-4 right-4 z-10' : ''} grid grid-cols-2 gap-4`}>
                    <div className="bg-white  blue rp-3 border  col-span-3 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                        <span className="mr-3 "></span><span className='printicon "' >Print</span>
                    </div>
                    {/* <div className="bg-white border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                            <i className="mr-3 gusd-print-outline"></i><span className='printicon' onClick={handlePrint}
                            >Print</span>
                        </div>

                         <div className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center cursor-pointer" onClick={async () => generatePDF('stipend')} >
                            <i className="mr-3 gusd-print-outline"></i><span>Download</span>
                        </div>  */}
                </div>
            </div>
        </>

    )
}

export default StipendFormPdf
