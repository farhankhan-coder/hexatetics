import React, { useState } from "react";
import './base.min.css'
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import './fancy.min.css'
import './main.css'
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from "primereact/inputtextarea";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

        
const PdfForm = (props) => {
    const numberToWords = require('number-to-words');
    const [date, setDate] = useState(null);
    const [dates, setDates] = useState(null);
    const year = props.amount ? props.amount:'';
    let yearInWords='-';
    if(year){
        yearInWords = numberToWords.toWords(year);
    }


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [checked, setChecked] = useState()
    const [value, setValue] = useState('');


    return (
        <>
            <div id="my-html-template" ref={componentRef}>
                <div>
                    <div id="outline">
                    </div>
                </div>
                <div id="page-container" >
                    <div id="pf1" class="pf print:p-2" data-page-no="1">
                        <div className='px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw] pdfFormInput'>
                            <div className='text-center mb-[45px] xl:mb-[2.344vw]'>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                <div className='text-[18px] xl:text-[0.938vw] font-normal'>223 North Jackson Street</div>
                                <div className='text-[18px] xl:text-[0.938vw] font-normal'>Glendale, CA 91206</div>
                                <div className='text-[18px] xl:text-[0.938vw] font-normal mb-[45px] xl:mb-[2.344vw]'>(818) 241-3111</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold border px-2 py-2 border-[#344054]'>PERSONAL SERVICES AGREEMENT</div>
                            </div>
                            <div className='space-y-2 leading-9 mb-[20px] xl:mb-[1.083vw]'>
                            <b>THIS CONTRACT</b> made and entered into this <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                                {/* <InputText placeholder="Enter" />  */}
                                <Calendar value={date} onChange={(e) => setDate(e.value)} />
                                         </b></u> day of <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] "><InputText placeholder="Enter No." /></b></u> , <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter No." /></b></u> by and between <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter No." /></b></u>  hereinafter called the <b>PROVIDER and the GLENDALE UNIFIED SCHOOL DISTRICT,</b> hereinafter called the <b>DISTRICT.</b>
                                <div><b>WITNESSETH;</b>The parties do hereby contract and agree as follows:</div>
                            </div>
                            {/* list  */}   
                            <div className='space-y-3'>
                                <div className='flex gap-2'>
                                    <div>1.</div>
                                    <div className='space-y-2'>The <b>PROVIDER</b> shall furnish the <b>DISTRICT</b> for a total  contract price of:
                                        <div><u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" /></b></u> Dollars <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" /></b></u> the following services:</div>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>2.</div>
                                    <div>The term of this contract shall begin <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" /></b></u> and will terminate on or before <u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" /></b></u>.
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>3.</div>
                                    <div>The Provider shall not commence work under this Contract until the insurance required under Paragraph 17 of the <b>Terms and Conditions</b> and satisfactory proof of such insurance has been submitted to the District and said insurance has been approved by the District.</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>4.</div>
                                    <div>Payment Schedule - Payment for the work shall be made upon submission of monthly statements and the District's written approval of the work (which approval shall not be unreasonably withheld).</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>5.</div>
                                    <div>Approvals for payment shall be authorized by a responsible District administrator.</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>6.</div>
                                    <div>The Contract includes the general terms and conditions as printed and set forth on the reverse side of this page, and the Provider, by executing this Contact, agrees to comply with all such general terms and conditions.</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>7.</div>
                                    <div>The Provider shall guarantee that all professional services rendered in the performance of this Contract are in keeping with current generally accepted practices for an educational institution.</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>8.</div>
                                    <div>The Provider will complete and provide the necessary documentation in order for the District to submit claims under the LEA Medi-Cal Billing Option Program. Provider will be advised by the District's representative responsible for facilitating this billing process.</div>
                                </div>
                                <div className=''>
                                    <span className='inline-block pr-2'>9.</span>
                                    <span>IN WITNESS WHEREOF, the parties hereunto have subscribed to this Contract, including all Contract Documents as listed below:</span>
                                    <div className='pl-4'>
                                        <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2'>
                                            <div className='flex items-center gap-2 gap-y-5'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Scope of Work Statement</div>
                                            </div>
                                            <div className='flex items-center gap-5'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Addendum Containing Specific Terms and Conditions</div>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Purchase Order No.</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Insurance Forms</div>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Attached Addendum No. <InputText className="mt-2" placeholder="Enter No." /></div>
                                            </div>
                                            <div className='flex items-center gap-5 ml-5'>
                                            <InputText placeholder="Enter No." />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-between mt-10 px-4'>
                                <div></div>
                                <div><b>Page 1 of 4</b></div>
                                <div>Revised 12/14/2022</div>
                            </div>
                            <div className='flex justify-between font-semibold border px-2 py-2 border-[#344054] print:mt-[50px]'>
                                <span>Submit Completed form to:<u><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><Calendar value={date} onChange={(e) => setDate(e.value)} className="w-auto" /></b></u></span> <span>Reference #: <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="w-auto"/></b></span>
                            </div>
                        </div>
                    </div>


                    <div id="pf2" class="pf  print:m-3" data-page-no="2">
                        <div className='px-10 py-3 text-[#344054] text-[15px] xl:text-[0.885vw] print:m-2'>
                            <div className='text-[24px] xl:text-[1.250vw] text-center font-semibold border px-2 py-2 border-[#344054] mb-2 print:mb-[5px] '>PERSONAL SERVICES AGREEMENT</div>
                            <div className='font-medium border px-4 py-4 print:py-[10px] border-[#344054]'>NOTE: Federal Regulations (Code Sections 6041 and 6209) require non-corporate recipients of $600.00 or more to furnish their taxpayer identification number to the payer. The regulations also provide that a penalty may be imposed for failure to furnish the taxpayer identification number. In order to comply with these regulations, the District requires your federal tax identification number or Social Security Number, whichever is applicable.
                            </div>
                            <div className="mt-2 print:mt-[5px] print:pt-[5px]">
                                <div className="grid grid-cols-2 lg:grid-cols-2 divide-x-2 divide-[#545454]">
                                    <div className="ml-10">
                                        <div className="space-y-2 print:space-y-0">

                                            <div className='mb-3 font-semibold'>TYPE OF BUSINESS ENTITY</div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Individual</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Sole Partnership</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Partnership</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Corporation</div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                                <div>Other</div>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={2} cols={20} />
                                        </div>

                                    </div>
                                    <div className="pl-10 mt-2 ">
                                        <div className="mb-10 text-center">
                                            <div className='mb-3 font-semibold'>TAX IDENTIFICATION</div>
                                            <div className="w-[200px] mt-8">
                                                <div className="w-[200px]  mt-8"></div>
                                                <u><b className="text-[green] font-bold  w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></u>
                                                <div className='mb-3'>Social Security Number</div>
                                            </div>
                                        </div>
                                        <div className="mb-2 text-center">
                                            <div className="w-[200px] mt-4">
                                                <div className="w-[200px] mt-8"></div>
                                                <u><b className="text-[green] font-bold  w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></u>
                                                <div className='mb-3'>Employer Identification</div>
                                            </div>
                                        </div>
                                        <div className="mt-10 print:mt-[5px]">
                                            <div>  <b>Under penalty of perjury, I certify that the number shown on this form is my correct taxpayer identification number.</b></div>
                                        </div>
                                    </div>
                                    <div className="text-center border border-[#333]">
                                        <div className='py-2 font-semibold'>Provider Name</div>
                                    </div>
                                    <div className="text-center border border-[#333]">
                                        <div className='py-2 font-semibold'>GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                    </div>


                                </div>
                               
                                <div className="grid grid-cols-2 lg:grid-cols-2 divide-x-2 divide-[#545454]">
                                    <div className=" mt-4 px-2">
                                        <div className='space-y-10 mb-2'>
                                            <div className='grid justify-center text-center'>
                                                <div className="w-[200px] mt-6 print:mt-[5px] border-[red]"><b className="flex text-[green] font-bold ml-2 w-[15.625vw] justify-center print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-30 lg:w-W-30 sm:w-30 xs:w-30"/></b></div>
                                                <div className='mb-3 text-[13px] mt-2'>Provide Name</div>
                                            </div>
                                            {/* <div className='text-center'>
                                                <div className="w-[350px] ml-10 border-b border-[#333] mt-4"></div>
                                                <div className='mb-3 text-[13px]'>Signature</div>
                                            </div> */}
                                        </div>
                                        <div className=''>
                                            <div className='flex gap-1 mb-4'>
                                                <div className='w-[100px]'>TITLE:</div>
                                                <div className="text-[green] font-bold w-[15.625vw]  print:w-[20.625vw]">
                                                <InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></div>
                                            </div>
                                            <div className='flex gap-5 mb-4'>
                                                <div className='w-[100px] '>LICENSE NO.:</div>

                                                <div className="w-[350px]"><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] "><InputText placeholder="" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                            </div>
                                            <div className='flex gap-5 mb-4'>
                                                <div className='w-[100px]'>ADDRESS:</div>
                                                <div className="w-[350px] "><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                            </div>
                                            <div className='flex gap-5 mb-4'>
                                                <div className='w-[100px]'>DATE:</div>
                                                <div className="w-[350px]"> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><Calendar value={dates} onChange={(e) => setDates(e.value)}   className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32" /></b></div>
                                            </div>
                                            <div className='flex gap-5 mb-4'>
                                                <div className='w-[100px]'>PHONE:</div>
                                                <div className="w-[350px]"><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter"  className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                            </div>
                                            <div className='flex gap-5 mb-4'>
                                                <div className='w-[100px]'>FAX:</div>
                                                <div className="w-[350px] "><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter"  className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 mt-1 print:mt-[5px]">
                                        <div className=''>
                                            <div className='grid justify-center text-center'>
                                                <div className="w-[350px] ml-10 mt-6"><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-30 lg:w-W-30 sm:w-30 xs:w-30"/></b></div>
                                                <div className='mb-3 text-[13px] mt-2'>Superintendent. Assistant Superintendent or <br/> Chief  IIR & Operations Officer</div>
                                            </div>
                                            {/* <div className='text-center'>
                                                <div className="w-[350px] ml-10 border-b border-[#333] mt-6"></div>
                                                <div className='mb-3 text-[13px]'>Signature</div>
                                            </div> */}
                                            <div className='mt-9'>
                                                <div className='flex gap-5 mb-4'>
                                                    <div className='w-[300px]'>DATE:</div>
                                                    <div className="w-[350px]">
                                                        <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><Calendar value={date} onChange={(e) => setDate(e.value)} className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32" /></b>
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 mb-4'>
                                                    <div className='w-[300px]'>ACCOUNT NO.:</div>
                                                    <div className="w-[350px]"><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                                </div>
                                                <div className='flex gap-5 mb-4'>
                                                    <div className='w-[310px]'>DATE OF BOARD MEETING:</div>
                                                    <div className="w-[350px]"><b className="text-[green]
                                                     font-bold w-[15.625vw]  print:w-[20.625vw]"><Calendar value={date} onChange={(e) => setDate(e.value)} className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                                </div>
                                                <div className='flex gap-5 mb-4'>
                                                    <div className='w-[300px]'>BOARD ITEM:</div>
                                                    <div className="w-[350px] "><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                                </div>
                                                <div className='flex gap-5 mb-4'>
                                                    <div className='w-[300px]'>PAGE/ITEM.:</div>
                                                    <div className="w-[350px] "><b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"><InputText placeholder="Enter" className="xl:w-32 lg:w-W-32 sm:w-32 xs:w-32"/></b></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' font-medium border px-4 py-4 border-[#344054] shadow mt-2'>"I am aware of the provisions of Section 3700 of the Labor Code which require every employer to be insured against liability for Worker's Compensation or to undertake self insurance in accordance with provisions of that code, and I will comply with such provisions before commencing the performance of the work of this Contract."
                            </div>
                            <div className='flex justify-center mt-2 px-4'>
                                <div><b>Page 2 of 4</b></div>
                            </div>
                        </div>
                    </div>


                    <div id="pf3" class="pf print:p-2" data-page-no="3">
                        <div className='px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]'>
                            <div className='text-[24px] text-center xl:text-[1.250vw] font-semibold mb-3'>GENERAL TERMS AND CONDITIONS</div>
                            <div className='space-y-1'>
                                <div>
                                    1. <b>PROPOSAL ACCEPTANCE.</b> Proposals are subject to acceptance by the signing of a contract and issuance of an appropriate purchase order at any time within sixty (60) days after the receipt of quotes unless otherwise stipulated. The District reserves the right to accept or reject any and all quotes and reserves the right to waive any informality in any quote.
                                </div>
                                <div>
                                    2. <b>EQUIPMENT AND LABOR.</b> The Provider shall furnish all tools, equipment, apparatus, facilities, transportation, labor, and material necessary to furnish the professional services herein described, the services to be performed at such time and places as directed by and subject to the approval of the authorized district representative indicated in the work specifications attached hereto.
                                </div>
                                <div>
                                    3. <b>SAFETY AND SECURITY.</b> It shall be the responsibility of the Provider to ascertain from the District the rules and regulations pertaining to safety, security and driving on school grounds, particularly when children are present.
                                </div>
                                <div>
                                    4. <b>TERMINATION.</b> This Contract may be terminated at any time by either party with five (5) business days' advance written notice.
                                </div>
                                <div>
                                    5. <b>DEFAULT BY PROVIDER.</b> When Provider shall fail to deliver any article or service or shall deliver any article or service which does not conform to the work specifications, the District may, upon five (5) business days' prior written notice describing the fault, at its option, annul and set aside the contract entered into with said Provider and make and enter into a new contract in such manner as seems to the Board of Education to be to the best advantage of the District. Any failure for furnishing such articles or services by reason of the failure of the Provider as above stated, shall be a liability against the Provider and his sureties. The Board of Education reserves the right to cancel any articles or services which the Provider may be unable to furnish because of economic conditions, governmental regulations or other similar causes beyond the control of the Provider provided satisfactory proof is furnished to the Board of Education, if requested.
                                </div>
                                <div>
                                    6. <b>CONTRACT CHANGES.</b> No changes or alterations to this contract shall be made without specific prior written approval by the District.
                                </div>
                                <div>
                                    7. <b>SUBSTITUTIONS.</b> No substitutions of materials or service from those specified in the Scope of Work shall be made without the prior written approval of the District.
                                </div>
                                <div>
                                    8. <b>ACCESS TO WORK.</b> District representatives shall at all times have access to work wherever it is in preparation or progress.
                                </div>
                                <div>
                                    9. <b>PROTECTION OF WORK AND PROPERTY.</b> The Provider shall maintain at all times, as required by conditions and progress of work, all necessary safeguards for the protection of employees and the public. In an emergency affecting life and safety of life or of work or of adjoining property, Provider, without special instruction or authorization from District, is permitted to act at his discretion to prevent such threatened loss or injury.
                                </div>
                                <div>
                                    10. <b>ASSIGNMENT OF CONTRACT AND PUCHASE ORDER.</b> The Provider shall not assign or transfer by operation of law or otherwise any or all of its rights, burdens, duties, or obligations under this contract without the prior written consent of the District.
                                </div>
                                <div>
                                    11. <b>FORCE MAJEURE CLAUSE.</b> The parties to the Contract shall be excused from performance thereunder during the time and to the extent that they are prevented from obtaining, delivering, or performing by act of God, fire, strike, loss, or shortage of transportation facilities, lock-out commandeering of materials, products, plants or facilities by the government when satisfactory evidence thereof is presented to the other party(ies), provided that it is satisfactorily established that the non-performance is not due to the fault or neglect of the party not performing.
                                </div>
                                <div>
                                    12. <b>HOLD HARMLESS AGREEMENT.</b> The Provider shall save, defend, hold harmless and indemnify the District from and against any and all losses, damages, liabilities, claims, and costs of whatsoever kind and nature for injury to or death of any person and for loss or damage to any property occurring in connection with or in any way incident to or arising out of the occupancy, use, service, operations, or performance of work on the property under the terms of this contract, resulting in whole or in part from the negligent acts or omissions of the Provider, any subproviders, or any employee, agent or representative of Provider and/or its subproviders.
                                </div>
                                <div>
                                    13. <b>PAYMENT.</b> Unless otherwise specified, the Provider shall render invoices in triplicate for materials delivered or services performed under the Contract/Purchase Order. The District shall make payment for materials, supplies or other services furnished under this Contract as agreed within thirty (30) days after delivery to and approval by the authorized District representative of all invoices and other documentary evidence reasonably required by the District (which approval shall not be unreasonably withheld).
                                </div>
                                <div>
                                    14. <b>PERMITS AND LICENSES.</b> The Provider shall secure and maintain in force, at Provider's sole cost and expense, such licenses and permits as are required by law, in connection with the furnishing of services, materials, or supplies herein listed.
                                </div>
                                <div>
                                    15. <b>PROVIDER NOT OFFICER, EMPLOYEE, OR AGENT OF DISTRICT.</b> While engaged in carrying out other terms and conditions of the purchase order, the Provider is an independent Provider, and not an officer, employee, agent, partner, or joint venture of the District.
                                </div>
                                <div>
                                    16. <b>ANTI-DISCRIMINATION.</b> Pursuant to Board Policy 4030, Glendale Unified School District prohibits discrimination and/or harassment of any person based on race, color, national origin, ancestry, religious creed, age, marital status, pregnancy, physical or mental disability, medical condition, genetic information, veteran status, gender, gender identity, gender expression, sex or sexual orientation. Therefore, the Provider agrees to comply with the applicable Federal and California Laws, including, but not limited to, the California Fair Employment Practice Act, beginning with Labor Code, Section 1410 and Labor Code, Section 1735. In addition, the Provider agrees to require such compliance by all subproviders employed on the Contract by him.
                                </div>
                                <div>
                                    17. <b>PROVIDER'S INSURANCE.</b> The Provider shall not commence work under this Contract until he has obtained the insurance required under this paragraph and satisfactory proof of such insurance has been submitted to District and said insurance has been approved by the District. Except for worker's compensation insurance, the policy shall not be amended or modified and the coverage amounts shall not be reduced without the District's prior written consent, and, the District shall be named as an additional insured and be furnished thirty (30) days written notice prior to cancellation. In the event that the insurance requirements cannot be met, please turn in a signed "Hold Harmless and Indemnification Agreement."
                                </div>
                            </div>
                            <div className='text-center mt-5'>
                                <div><b>Page 3 of 4</b></div>
                            </div>
                        </div>
                    </div>

                    <div id="pf4" class="pf print:p-2" data-page-no="4">
                        <div className='px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]'>
                            <div className='space-y-2 border-b-[2px] border-[#344054] pb-2'>
                                <div>
                                    <span className='pl-2'>a) </span> <b>PROVIDER'S PUBLIC LIABILITY AND PROPERTY DAMAGE INSURANCE.</b> The Provider shall procure and shall maintain during the life of his contract, Provider's Public Liability Insurance in an amount not less than $1,000,000 for injuries, including accidental death to any one person, and subject to the limit for each person, in an amount not less than $1,000,000 on account of one accident, and Provider's Property Damage Insurance in an amount not less than $1,000,000.
                                </div>
                                <div>
                                    18. <b>COMPLIANCE WITH LAWS.</b> Provider shall give all notices and comply with all laws, ordinances, rules and regulations bearing on conduct or work as indicated or specified. If Provider observes that any of the work required by this contract is at variance with any such laws, ordinances, rules or regulations, Provider shall notify the District, in writing, and, at the sole option of the District, any necessary changes to the scope of work shall be made and this Contract shall be appropriately amended in writing, or this Contract shall be terminated effective upon Provider's receipt of a written termination notice from the District. If Provider performs any work knowing it to be in violation of such laws, ordinances, rules or regulations, and without first notifying the District of such violation, Provider shall bear all costs arising there from.
                                </div>
                                <div>
                                    19. <b>TIME IS OF THE ESSENCE.</b> Time is of the essence in the performance of and compliance with each of the provisions and conditions of this contract.
                                </div>
                                <div>
                                    20. <b>GOVERNING LAW.</b> This contract shall be governed by and construed in accordance with the laws of the State of California.
                                </div>
                                <div>
                                    21. <b>ATTORNEYS' FEES.</b> If any action is brought by either party against the other party hereunder, each party shall be responsible for its own expenses, including legal and accounting fees, in connection with the prosecution or defense of such action.
                                </div>
                                <div>
                                    22. <b>NO ORAL MODIFICATION.</b> Any waiver, amendment, modification, consent or acquiescence with respect to this contract or any provision of this contract or with respect to any failure to perform in accordance therewith shall be set forth in writing and duly executed by or on behalf of the party to be bound thereby.
                                </div>
                                <div>
                                    23. <b>PROVISIONS REQUIRED BY LAW DEEMED INSERTED.</b> Each and every provision of law and clause required by law to be inserted in this contract shall be deemed to be inserted herein and this contract shall be read and enforced as though it were included herein. 
                                </div>
                                <div>
                  24. <b>FINGERPRINTING.</b> The Provider shall be fingerprinted before commencing services of this 
                  Contract. The cost shall be covered by the District.
                </div>
                <div>
                  25. <b>TUBERCULOSIS TESTING.</b> Before commencing services, Provider, if working with or near
                  students, shall provide proof of Tuberculosis (TB) testing at their own expense to the Human Resources
                  Department. The TB test must have been conducted within the prior six months to the Contract effective
                  date.
                </div>
                <div>
                  26. <b>COVID-19 VACCINATION STATUS.</b> Before commencing services, Provider, if working with or near
                  students, shall provide proof that they are fully vaccinated for COVID-19 within two weeks prior to
                  starting to provide services at a District school site to the Human Resources Department.
                </div>
                <div>
                  27. <b>IF WORKING WITH STUDENTS.</b> Any Provider working with a student(s) must be supervised by a
                  credentialed person or must hold an Activity Supervisor Clearance Certificate issued through the
                  California Commission on Teacher Credentialing (CTC).
                </div>
                <div>
                  28. <b>TOBACCO/ALCOHOL/DRUG-FREE WORKPLACE.</b> Pursuant to Board Policies 4020 and 4021, Glendale
                  Unified School District is a tobacco, alcohol, and drug-free district. The Provider shall not use or
                  be under the influence of these substances while on District property or during the performance of the
                  services of this Contract. Violation of this policy will result in immediate removal of the Provider
                  from his or her duties and possible immediate termination of this Contract.
                </div>
                <div>
                  29. <b>GOVERNOR'S EXECUTIVE ORDER.</b> California Governor Newsom issued Order N-6-22 requiring
                  compliance with the federal Economic Sanction imposed in response to Russia's action in Ukraine. See
                  attached Certification.
                </div>
                            </div>
                            <div className='text-center mb-3'>
                                <div className='text-[24px] text-center xl:text-[1.250vw] font-semibold mt-3'>SUPPLEMENTAL AGREEMENT</div>
                                <div>Specialized Services for Students and Families</div>
                            </div>
                            <div className='mb-3'><b>The undersigned Agrees as follows:</b></div>
                            <div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
                                <div className='space-y-1'>
                                    <div>
                                        1. To cooperate with school personnel to ensure fair and equitable availability of services to all families.
                                    </div>
                                    <div>2. To support District and school policies and standards.</div>
                                    <div>
                                        3. To work with groups of students and/or parents when possible to ensure that as many families are served as possible. Marital counseling is not an expected use of school-based clinical staff.
                                    </div>
                                    <div>
                                        4. To refer students and families in need of (in-depth, long-term) specialized services to appropriate community agencies whenever possible. It is inappropriate for a clinic to refer its own agency
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <div>
                                        agency unless comparable services are not available elsewhere or the family specifically requests services offered by clinician (which should be documented along with referrals to alternative agencies).
                                    </div>
                                    <div>5. To provide licensed personnel or fully-supervised interns for all</div>
                                    <div>6. To maintain appropriate insurance as required by the District.</div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        {/* <div className='text-center mt-10'>
                                            <div>__________________</div>
                                            <div>Signature</div>
                                        </div> */}
                                        <div className='text-center mt-10'>
                                            <div><Calendar value={date} onChange={(e) => setDate(e.value)} /></div>
                                            <div>Date</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center mt-6 px-4'>
                                <div><b>Page 4 of 4</b></div>
                            </div>
                        </div>
                    </div>

                    <div id="pf5" class="pf print:p-2" data-page-no="5">
                        <div className='px-10 py-5 text-[#344054] text-[16px] xl:text-[0.833vw]'>
                            <div className='text-center mb-5'>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>Glendale Unified School District</div>
                                <div className='text-[15px] xl:text-[0.781vw] font-semibold mb-5'>Glendale, California</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>HOLD HARMLESS AND INDEMNIFICATION AGREEMENT</div>
                            </div>
                            <div>
                                Provider agrees at all times to protect, indemnify, and hold the Glendale Unified School District, its Board of Trustees, officers, employees, members, representatives, agents, guests, invitee, and/or employees free and harmless, and to provide legal defense, from any and all liabilities, claims, losses, judgments, damage, demands or expenses resulting from the services provided by the Provider, Provider's use or occupancy of the District's facilities and premises [including travel to and from said facilities and premises] and/or the active or passive negligence of the Provider or of the District, its Board of Trustees, officers, employees, members, representatives, agents, guests, invitee, and/or employees, specifically including, without limitation, any liability, claim, loss, judgment, damage, demand, or expense, arising by reason of:
                            </div>
                            <div className='space-y-2 px-8 mt-2'>
                                <div className='flex gap-2'>
                                    <div>1.</div>
                                    <div>
                                        the loss of or damage to any of the District's facilities or premises including any building, structure, or improvement thereon, or any equipment to be used therein;
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>2.</div>
                                    <div>
                                        the injury to or death of any person including, but not limited to, the officers, members, employees, representatives, agents, guests, invitee, and/or employees of the Provider or of the District; or
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div>3.</div>
                                    <div>
                                        damage to any property arising from the use, possession, selection, delivery, return, condition or operation of the District's facilities.
                                        <div className='mt-2'>
                                            Provider further agrees to reimburse the District for all liabilities, claims, losses, judgments, damage, demands, expenses, fines, penalties, including reasonable attorneys' fees imposed or incurred by the District because of the Provider's use or occupancy of the District's facilities, access to said facilities and premises, and/or active or passive negligence of the Provider or of the District, its Board of Trustees, officers, members, representatives, agents, guests, invitee, and/or employees.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                THE UNDERSIGNED HAS READ AND VOLUNTARILY SIGNS THE RELEASE AND WAIVER OF LIABILITY AND INDEMNITY AGREEMENT, and further agrees that no oral representation, statements of inducement apart from the foregoing written agreement have been made.
                            </div>
                            <div className='mt-2'>
                                <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
                                    <div className='space-y-10'>
                                        <div></div>
                                        <div>
                                            <div><Calendar value={date} onChange={(e) => setDate(e.value)} /></div>
                                            <div>Date</div>
                                        </div>
                                    </div>
                                    <div className='space-y-10'>
                                        <div>I HAVE READ THIS RELEASE.</div>
                                        {/* <div>
                                            <div>_________________________</div>
                                            <div>Signature of Provider</div>
                                        </div> */}
                                        <div>
                                            <div><InputText placeholder="Enter" /></div>
                                            <div>Print Name</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="pf6" class="pf print:p-2" data-page-no="6">
                        <div className='px-20 py-10 text-[#344054] text-[16px] xl:text-[0.833vw]'>
                            <div className='text-center mb-10'>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>Glendale Unified School District</div>
                                <div className='text-[15px] xl:text-[0.781vw] font-semibold mb-5'>Glendale, California</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold mb-5'>Personal Services Agreement</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>Retirement Status Statement</div>
                            </div>
                            <div className='mb-5'>Are you a State Teachers Retirement System (STRS) retiree?
                                <br />   <Checkbox inputId="cb1" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label ml-2">Yes</label>

                                <Checkbox inputId="cb2" className="ml-4" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb2" className="p-checkbox-label ml-2">No</label>

                            </div>
                            <div className='mb-5'>Are you a California Public Employees Retirement System (CalPERS) retiree?
                                <br />
                                <Checkbox inputId="cb1" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label ml-2">Yes</label>

                                <Checkbox inputId="cb2" className="ml-4" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb2" className="p-checkbox-label ml-2">No</label>


                            </div>
                            <div className='mb-5'>Are you a State Teachers Retirement System (STRS) retiree?
                            <br />
                                <Checkbox inputId="cb1" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label ml-2">Yes</label>

                                <Checkbox inputId="cb2" className="ml-4" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                <label htmlFor="cb2" className="p-checkbox-label ml-2">No</label>
                            
                            </div>


                            <div className='mb-28 print:mb-[10px]'>
                                Note: The District will be reporting your earnings or hours to the appropriate retirement system. You are responsible for monitoring your work hours or earnings to make sure you do not exceed your retirement limit.
                            </div>
                            <div className='space-y-10'>
                                <div>
                                    <div><InputText placeholder="Enter" /></div>
                                    <div>Name (Print)</div>
                                </div>
                                {/* <div>
                                    <div>___________________________________</div>
                                    <div>Signature of Provider</div>
                                </div> */}
                                <div>
                                    <div><Calendar value={date} onChange={(e) => setDate(e.value)} /></div>
                                    <div>Date</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="pf7" class="pf print:p-2" data-page-no="7">
                        <div className='px-10 py-5 text-[#344054] text-[16px] xl:text-[0.833vw]'>
                            <div className='text-center mb-8'>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'>Glendale Unified School District</div>
                                <div className='text-[15px] xl:text-[0.781vw] font-semibold mb-5'>Glendale, California</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold mb-1'>CERTIFICATION REGARDING</div>
                                <div className='text-[24px] xl:text-[1.250vw] font-semibold'><u> GOVERNOR EXECUTIVE ORDER N-6-22</u></div>
                            </div>

                            <div className='mb-2'>
                                On March 4, 2022, California Governor Newsom issued Order N-6-22 requiring state agencies to take steps to ensure any agency and entity under contract with state agencies comply with the Federal Order:
                            </div>
                            <div className='mb-4'>
                                (<u>https://www.gov.ca.gov/wp-content/uploads/2022/03/3.4.22-Russia-Ukraine-Executive-Order.pdf;</u> "State Order").
                            </div>
                            <div className='mb-2'>
                                if you enter into a contract with the District, you must comply with the economic sanctions imposed in response to Russia's actions in Ukraine, including the orders and sanctions identified on the U.S. Department of the Treasury website:
                            </div>
                            <div className='text-center mb-4'>
                                (<u>https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions).</u>
                            </div>
                            <div className='mb-4'>
                                As part of this procurement, <b>if the contract value of this procurement is $5 million or more,</b> please include in your Response the following:
                            </div>
                            <div className='space-y-2 px-8'>
                                <div>
                                    (1) a statement that you are in compliance with the required economic sanctions of the Federal and State Orders;
                                </div>
                                <div>
                                    (2) the steps you have taken in response to Russia's actions in Ukraine, including, but not limited to, desisting from making new investments in, or engaging in financial transactions with, Russian entities, not transferring technology to Russia or Russian entities, and directly providing support to the government and people of Ukraine.
                                </div>
                            </div>
                            <div className='flex gap-20 mt-8'>
                                <div className='space-y-4'>
                                    <div>Print Name:</div>
                                    {/* <div>Signature:</div> */}
                                    <div>Date:</div>
                                </div>
                                <div className='space-y-3'>
                                    <div><InputText placeholder="Enter" /></div>
                                    {/* <div>_________________________________</div> */}
                                    <div> <Calendar value={date} onChange={(e) => setDate(e.value)} /></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* <div id="pf8" class="pf w0 h0" data-page-no="8">
                        <div class="pc pc8 w0 h0"><img class="bi x0 y107 w17 h24" alt="" src={bg8} />
                            <div class="c x7 y108 w18 h25">
                                <div class="t me x2e h26 y109 ff3 fsb fc2 sc0 ls0 ws0">D e <span class="_ _7"></span>part <span
                                    class="_ _8"></span>me<span class="_ _1"></span>nI</div>
                                <div class="t m0 x21 h26 y10a ff3 fsb fc2 sc0 ls0 ws0">S t a t e o f C a I i f o r n i <span
                                    class="_ _4"></span>a</div>
                            </div>
                            <div class="t m1 x37 h27 y10b ff3 fsc fc2 sc0 ls0 ws0">Em <span class="_ _15"></span>pl oym <span
                                class="_ _0"></span>en<span class="_ _1"></span>I</div>
                            <div class="t m5 x37 h28 y10c ff4 fsc fc2 sc0 ls0 ws0">Development</div>
                            <div class="t m0 x3f h29 y10d ff3 fsd fc2 sc0 ls0 ws0">REPORT OF</div>
                            <div class="t m0 x44 h2a y10e ff4 fsd fc2 sc0 ls0 ws0">INDEPENDENT CONTRACTOR(S)</div>
                            <div class="t m0 x45 h2b y10f ff5 fs5 fc2 sc0 ls0 ws0">See detailed instructions on page 2. Please type
                                or print.</div>
                            <div class="t m0 x18 h2c y110 ff3 fs4 fc2 sc0 ls0 ws0">05420101</div>
                            <div class="t m0 x16 h1e y111 ff4 fs6 fc2 sc0 ls0 ws0">SERVICE-RECIPIENT <span class="ff3">(BUSINESS OR
                                GOVERNMENT ENTITY):</span></div>
                            <div class="t m0 x16 h2d y112 ff3 fse fc2 sc0 ls0 ws0">DATE<span class="_ _1b"> </span>FEDERAL ID <span
                                class="_ _1"></span>NO.<span class="_ _1c"> </span>CA EMPLOYER ACCOUNT <span
                                    class="_ _4"></span>NO.</div>
                            <div class="t m0 x46 h2d y113 ff3 fse fc2 sc0 ls0 ws0">SERVICE-RECIPIENT NAME / BUSINESS NAME</div>
                            <div class="t m0 x46 h2d y114 ff3 fse fc0 sc0 ls0 ws0">ADDRESS</div>
                            <div class="t m0 x1e h2d y115 ff3 fse fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                            <div class="t m0 x47 h2d y116 ff3 fse fc2 sc0 ls0 ws0">CONTACT PERSON</div>
                            <div class="t m0 x48 h2d y117 ff3 fse fc2 sc0 ls0 ws0">TELEPHONE NO.</div>
                            <div class="t m0 x46 h2d y118 ff3 fse fc2 sc0 ls0 ws0">CITY</div>
                            <div class="t m5 x2a h1e y119 ff4 fs6 fc2 sc0 ls0 ws0">SERVICE-PROVIDER <span class="ff3">(INDEPENDENT
                                CONTRACTOR):</span></div>
                            <div class="t mf x46 h2e y11a ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                            <div class="t mf x49 h2e y11b ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                            <div class="t mf x4a h2e y11c ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                            <div class="t m5 x4b h2d y11d ff3 fse fc2 sc0 ls0 ws0">STATE</div>
                            <div class="t m0 x4c h2d y118 ff3 fse fc2 sc0 ls0 ws0">ZIP</div>
                            <div class="t m1 x46 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                            <div class="t m1 x46 h2e y11f ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                            <div class="t mf x4d h2e y120 ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                            <div class="t mf x49 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">STREET NAME</div>
                            <div class="t m0 x4e h2e y121 ff3 fsf fc2 sc0 ls0 ws0">STATE</div>
                            <div class="t mf x4f h2e y121 ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                            <div class="t mf x50 h2e y11e ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                            <div class="t mf x46 h2e y122 ff3 fsf fc2 sc0 ls0 ws0">START DATE OF <span class="_ _2"></span>CONTRACT
                            </div>
                            <div class="t m10 x51 h2e y123 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t mf x52 h2e y124 ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                            <div class="t mf x52 h2e y125 ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                            <div class="t m1 x46 h2e y126 ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                            <div class="t m1 x52 h2e y127 ff3 fsf fc2 sc0 ls0 ws0">START DATE OF CONTRACT</div>
                            <div class="t m10 x51 h2e y128 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t mf x52 h2e y129 ff3 fsf fc2 sc0 ls0 ws0">FIRST NAME</div>
                            <div class="t m1 x52 h2e y12a ff3 fsf fc2 sc0 ls0 ws0">SOCIAL SECURITY NO.</div>
                            <div class="t m1 x46 h2e y12b ff3 fsf fc2 sc0 ls0 ws0">CITY</div>
                            <div class="t mf x52 h2e y12c ff3 fsf fc2 sc0 ls0 ws0">START DATE OF <span class="_ _2"></span>CONTRACT
                            </div>
                            <div class="t m10 x51 h2e y12d ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t mf x53 h2e y12e ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                            <div class="t mf x4d h2e y12f ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                            <div class="t mf x53 h2e y130 ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                            <div class="t mf x4d h2e y131 ff3 fsf fc2 sc0 ls0 ws0">STREET NO.</div>
                            <div class="t mf x53 h2e y132 ff3 fsf fc2 sc0 ls0 ws0">AMOUNT OF CONTRACT</div>
                            <div class="t mf x49 h2e y133 ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                            <div class="t mf x4a h2e y134 ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                            <div class="t mf x54 h2e y135 ff3 fsf fc2 sc0 ls0 ws0">STRE ET NAME</div>
                            <div class="t mf x49 h2e y136 ff3 fsf fc2 sc0 ls0 ws0">MI</div>
                            <div class="t mf x4a h2e y137 ff3 fsf fc2 sc0 ls0 ws0">LAST NAME</div>
                            <div class="t mf x54 h2e y138 ff3 fsf fc2 sc0 ls0 ws0">STREET NAME</div>
                            <div class="t m1 x55 h2e y122 ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION DATE</div>
                            <div class="t m11 x56 h2e y139 ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t m0 x4e h2e y13a ff3 fsf fc2 sc0 ls0 ws0">STA<span class="_ _1"></span>TE</div>
                            <div class="t m1 x8 h2e y127 ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION <span class="_ _b">
                            </span>DATE</div>
                            <div class="t m11 x56 h2e y13b ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t m0 x4e h2e y13c ff3 fsf fc2 sc0 ls0 ws0">STA<span class="_ _1"></span>TE</div>
                            <div class="t m1 x8 h2e y12c ff3 fsf fc2 sc0 ls0 ws0">CONTRACT EXPIRATION DATE</div>
                            <div class="t m11 x56 h2e y13d ff3 fsf fc2 sc0 ls0 ws0">MMDDYY</div>
                            <div class="t mf x57 h2e y13e ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                IS ONGOING</div>
                            <div class="t mf x50 h2e y13f ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                            <div class="t m1 x4f h2e y13a ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                            <div class="t mf x57 h2e y140 ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                IS ONGOING</div>
                            <div class="t mf x50 h2e y141 ff3 fsf fc2 sc0 ls0 ws0">UNIT/APT</div>
                            <div class="t mf x4f h2e y13c ff3 fsf fc2 sc0 ls0 ws0">ZIP</div>
                            <div class="t mf x57 h2e y142 ff3 fsf fc2 sc0 ls0 ws0">CHECK HERE <span class="fc3">IF </span>CONTRACT
                                IS ONGOING</div>
                            <div class="t m0 x58 h2f y143 ff3 fs3 fc2 sc0 ls0 ws0">DE 542 Rev. 3 (3-05) <span
                                class="ff4">(INTERNET)</span></div>
                            <div class="t m0 x59 h27 y144 ff3 fsc fc2 sc0 ls0 ws0">MAIL TO: Employment Development Department <span
                                class="fc4">• </span>P.O. Box 997350, MIC 96 <span class="fc4">• </span>Sacramento, CA
                                95899-7350 </div>
                            <div class="t m0 x5a h27 y145 ff3 fsc fc2 sc0 ls0 ws0">or Fax to (916) 319-4410</div>
                            <div class="t m0 x5b h27 y146 ff3 fsc fc2 sc0 ls0 ws0">Page 1 of 2</div>
                        </div>
                        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                    </div>

                    <div id="pf9" class="pf w0 h0" data-page-no="9">
                        <div class="pc pc9 w0 h0"><img class="bi x2d y147 w19 h30" alt="" src={bg9} />
                            <div class="t m12 x2d h31 y148 ff3 fs10 fc0 sc0 ls0 ws0">Fo<span class="_ _1d"> </span>W-9</div>
                            <div class="t m0 x2d h26 y149 ff3 fsb fc0 sc0 ls0 ws0">(Rev. December 2014) </div>
                            <div class="t ma x2d h26 y14a ff3 fsb fc0 sc0 ls0 ws0">Department of the Treasury </div>
                            <div class="t m5 x2d h26 y14b ff3 fsb fc0 sc0 ls0 ws0">Internal Revenue Service</div>
                            <div class="t m0 x5c h32 y14c ff4 fs9 fc0 sc0 ls0 ws0">Request Dr Taxpayer </div>
                            <div class="t m5 x5d h32 y14d ff4 fs9 fc0 sc0 ls0 ws0">Identification Number and Certification</div>
                            <div class="t m1 x5e h1e y14e ff3 fs6 fc0 sc0 ls0 ws0">Give Form to the </div>
                            <div class="t m1 x5e h33 y14f ff4 fs6 fc0 sc0 ls0 ws0">requester. Do not </div>
                            <div class="t m1 x5e h1e y150 ff3 fs6 fc0 sc0 ls0 ws0">send to the IRS.</div>
                            <div class="t m5 x5f h26 y151 ff3 fsb fc0 sc0 ls0 ws0">1</div>
                            <div class="t m0 x37 h26 y151 ff3 fsb fc0 sc0 ls0 ws0">Name (as shown on your income tax return). Name
                                is required on this line; do not leave this line <span class="_ _8"></span>blank.</div>
                            <div class="t m5 x5f h26 y152 ff3 fsb fc0 sc0 ls0 ws0">2</div>
                            <div class="t m0 x37 h26 y152 ff3 fsb fc0 sc0 ls0 ws0">Business name/disregarded entity name, if
                                different from <span class="_ _5"> </span>above</div>
                            <div class="t m5 x5f h26 y153 ff3 fsb fc0 sc0 ls0 ws0">3</div>
                            <div class="t m0 x37 h26 y153 ff3 fsb fc0 sc0 ls0 ws0">Check appropriate box <span
                                class="_ _1"></span>for <span class="_ _1"></span>federal <span class="_ _1"></span>tax
                                classification; <span class="_ _1"></span>check only one <span class="_ _8"></span>of the <span
                                    class="_ _8"></span>following seven boxes:</div>
                            <div class="t m0 x60 h26 y154 ff3 fsb fc0 sc0 ls0 ws0">Individual/sole <span
                                class="_ _8"></span>proprietor <span class="_ _2"></span>or<span class="_ _1e"> </span>C <span
                                    class="_ _1"></span>Corporation<span class="_ _1f"> </span>S <span
                                        class="_ _1"></span>Corporation</div>
                            <div class="t m5 x8 h26 y154 ff3 fsb fc0 sc0 ls0 ws0">Partn<span class="_ _1"></span>ership </div>
                            <div class="t m0 x60 h26 y155 ff3 fsb fc0 sc0 ls0 ws0">single-member <span class="_ _2"></span>LLC</div>
                            <div class="t m5 x61 h26 y156 ff3 fsb fc0 sc0 ls0 ws0">Trust/estate</div>
                            <div class="t m5 x62 h26 y157 ff3 fsb fc0 sc0 ls0 ws0">4</div>
                            <div class="t m0 x10 h26 y157 ff3 fsb fc0 sc0 ls0 ws0">Exemptions (codes apply <span
                                class="_ _8"></span>only to </div>
                            <div class="t m0 x62 h26 y158 ff3 fsb fc0 sc0 ls0 ws0">certain <span class="_ _1"></span>entities, not
                                <span class="_ _1"></span>individuals; see </div>
                            <div class="t m0 x62 h26 y159 ff3 fsb fc0 sc0 ls0 ws0">instructions on page 3):</div>
                            <div class="t m0 x62 h26 y15a ff3 fsb fc0 sc0 ls0 ws0">Exempt payee cDde (if any)</div>
                            <div class="t m0 x60 h26 y15b ff3 fsb fc0 sc0 ls0 ws0">Limited liability company. Enter the tax
                                classification (C=C corporation, S=S corporation, P=partnership) •</div>
                            <div class="t m0 x60 h26 y15c ff3 fsb fc0 sc0 ls0 ws0">Note. <span class="_ _1"></span>For <span
                                class="_ _1"></span>a <span class="_ _1"></span>single-member <span class="_ _2"></span>LLC that
                                is <span class="_ _1"></span>disregarded, <span class="_ _2"></span>do <span class="_ _1"></span>not
                                check LLC; <span class="_ _1"></span>check <span class="_ _1"></span>the appropriate box in <span
                                    class="_ _7"></span>the <span class="_ _1"></span>line above <span class="_ _1"></span>for
                            </div>
                            <div class="t m0 x60 h26 y15d ff3 fsb fc0 sc0 ls0 ws0">the tax classification of the single-member
                                owner.</div>
                            <div class="t m0 x60 h27 y15e ff3 fsc fc0 sc0 ls0 ws0">Other (see instructions) •</div>
                            <div class="t m0 x62 h26 y15f ff3 fsb fc0 sc0 ls0 ws0">Exemption from FATCA reporting </div>
                            <div class="t m0 x62 h26 y160 ff3 fsb fc0 sc0 ls0 ws0">code (if any)</div>
                            <div class="t me x62 h34 y161 ff3 fs11 fc0 sc0 ls0 ws0">sales </div>
                            <div class="t m0 x63 h34 y161 ff3 fs11 fc5 sc0 ls0 ws0">fo <span class="fc0">accmnfs <span
                                class="ff5">main</span>ta<span class="ff5">ined outside <span class="fc6">tin <span
                                    class="fc7">u.<span class="ff3">s.</span></span></span></span></span></div>
                            <div class="t m5 x5f h27 y162 ff3 fsc fc0 sc0 ls0 ws0">5<span class="_ _20"> </span>Address <span
                                class="_ _8"></span>(number, <span class="_ _8"></span>street, <span
                                    class="_ _8"></span>and<span class="_ _2"></span> <span class="_ _7"></span>apt. <span
                                        class="_ _8"></span>or <span class="_ _7"></span>suite <span class="_ _7"></span>no.)</div>
                            <div class="t m0 x64 h26 y162 ff3 fsb fc0 sc0 ls0 ws0">Requester’s name and address <span
                                class="_ _2"></span>(optional)</div>
                            <div class="t m7 x65 h35 y163 ff3 fs5 fc0 sc0 ls0 ws0"> </div>
                            <div class="t m0 x66 h35 y163 ff3 fs5 fc0 sc0 ls0 ws0">LENDALE <span class="ff4 fs6">UNIFIED SCHOOL
                                DISTRICT</span></div>
                            <div class="t m5 x5f h26 y164 ff3 fsb fc0 sc0 ls0 ws0">6</div>
                            <div class="t m0 x37 h26 y164 ff3 fsb fc0 sc0 ls0 ws0">City, state, and ZIP code</div>
                            <div class="t m5 x5f h26 y165 ff3 fsb fc0 sc0 ls0 ws0">7</div>
                            <div class="t m0 x37 h26 y165 ff3 fsb fc0 sc0 ls0 ws0">List <span class="_ _7"></span>account <span
                                class="_ _1"></span>number(s) <span class="_ _8"></span>here <span
                                    class="_ _7"></span>(optional)</div>
                            <div class="t m0 x67 h35 y166 ff3 fs5 fc0 sc0 ls0 ws0">223 <span class="fs6">N. <span
                                class="ff4 fs7">JACKSON <span class="fs6">STREET</span></span></span></div>
                            <div class="t m0 x18 h1e y167 ff3 fs6 fc0 sc0 ls0 ws0">CA 91206</div>
                            <div class="t m1 x68 h35 y168 ff3 fs5 fc0 sc0 ls0 ws0">Taxpayer Identification Number (TIN)</div>
                            <div class="t m0 x2d h2f y169 ff3 fs3 fc0 sc0 ls0 ws0">Enter <span class="_ _1"></span>your <span
                                class="_ _1"></span>TIN <span class="_ _1"></span>in <span class="_ _7"></span>the <span
                                    class="_ _1"></span>appropriate box. <span class="_ _8"></span>The <span class="_ _1"></span>TIN
                                <span class="_ _1"></span>provided <span class="_ _1"></span>must <span class="_ _8"></span>match
                                the <span class="_ _7"></span>name <span class="_ _1"></span>given on <span class="_ _7"></span>line
                                <span class="_ _1"></span>1 <span class="_ _8"></span>to <span class="_ _1"></span>avoid</div>
                            <div class="t m0 x69 h36 y16a ff4 fs3 fc0 sc0 ls0 ws0">Social security <span class="_ _7"></span>number
                            </div>
                            <div class="t m0 x2d h2f y16b ff3 fs3 fc0 sc0 ls0 ws0">backup <span class="_ _8"></span>withholding.
                                <span class="_ _1"></span>For <span class="_ _7"></span>individuals, <span class="_ _1"></span>this
                                <span class="_ _7"></span>is <span class="_ _7"></span>generally <span class="_ _8"></span>your
                                <span class="_ _1"></span>social <span class="_ _8"></span>security <span class="_ _7"></span>number
                                (SSN). <span class="_ _7"></span>However, <span class="_ _1"></span>for <span class="_ _1"></span>a
                            </div>
                            <div class="t m0 x2d h2f y16c ff3 fs3 fc0 sc0 ls0 ws0">resident alien, sole proprietor, or disregarded
                                entity, see the Part I instructions on page 3. For other </div>
                            <div class="t m0 x2d h2f y16d ff3 fs3 fc0 sc0 ls0 ws0">entities, <span class="_ _1"></span>it <span
                                class="_ _8"></span>is <span class="_ _8"></span>your employer identification <span
                                    class="_ _0"></span>number (EIN). <span class="_ _1"></span>If <span class="_ _8"></span>you
                                <span class="_ _1"></span>do <span class="_ _8"></span>not have <span class="_ _8"></span>a <span
                                    class="_ _7"></span>number, see <span class="_ _7"></span><span class="ff5">How <span
                                        class="ff3">to <span class="_ _7"></span><span class="ff5">get <span
                                            class="_ _8"></span>a</span></span></span></div>
                            <div class="t m0 x2d h1e y16e ff5 fs6 fc0 sc0 ls0 ws0">TIN <span class="_ _7"></span><span
                                class="ff3">on <span class="_ _7"></span>page <span class="_ _0"></span>3.<span class="_ _21">
                                </span>or</span></div>
                            <div class="t m0 x2d h2f y16f ff3 fs3 fc0 sc0 ls0 ws0">Under penalties of perjury, I certify that:</div>
                            <div class="t m5 x2d h2f y170 ff3 fs3 fc0 sc0 ls0 ws0">1.</div>
                            <div class="t m0 x12 h2f y170 ff3 fs3 fc0 sc0 ls0 ws0">The <span class="_ _8"></span>number <span
                                class="_ _2"></span>shown <span class="_ _2"></span>on this <span class="_ _1"></span>form is my
                                <span class="_ _1"></span>correct taxpayer identification <span class="_ _1"></span>number (or <span
                                    class="_ _2"></span>I am waiting <span class="_ _1"></span>for <span class="_ _2"></span>a <span
                                        class="_ _8"></span>number <span class="_ _2"></span>to <span class="_ _1"></span>be issued
                                <span class="_ _1"></span>to <span class="_ _1"></span>me); <span class="_ _2"></span>and</div>
                            <div class="t m5 x2d h2f y171 ff3 fs3 fc0 sc0 ls0 ws0">2.</div>
                            <div class="t m0 x12 h2f y171 ff3 fs3 fc0 sc0 ls0 ws0">I <span class="_ _8"></span>am <span
                                class="_ _1"></span>not subject <span class="_ _1"></span>to <span class="_ _7"></span>backup
                                withholding <span class="_ _1"></span>because: <span class="_ _1"></span>(a) <span
                                    class="_ _8"></span>I <span class="_ _1"></span>am <span class="_ _1"></span>exempt from <span
                                        class="_ _8"></span>backup withholding, <span class="_ _1"></span>or (b) <span
                                            class="_ _8"></span>I <span class="_ _8"></span>have <span class="_ _8"></span>not <span
                                                class="_ _1"></span>been <span class="_ _1"></span>notified <span class="_ _8"></span>by <span
                                                    class="_ _8"></span>the <span class="_ _1"></span>Internal <span class="_ _1"></span>Revenue
                            </div>
                            <div class="t m0 x12 h2f y172 ff3 fs3 fc0 sc0 ls0 ws0">Service <span class="_ _1"></span>(IRS) <span
                                class="_ _1"></span>that <span class="_ _1"></span>I <span class="_ _8"></span>am <span
                                    class="_ _1"></span>subject to <span class="_ _7"></span>backup <span
                                        class="_ _1"></span>withholding as <span class="_ _1"></span>a <span class="_ _7"></span>result
                                of <span class="_ _8"></span>a <span class="_ _8"></span>failure <span class="_ _1"></span>to <span
                                    class="_ _7"></span>report all <span class="_ _7"></span>interest or <span
                                        class="_ _1"></span>dividends, or <span class="_ _8"></span>(c) <span class="_ _1"></span>the
                                <span class="_ _8"></span>IRS <span class="_ _8"></span>has <span class="_ _8"></span>notified <span
                                    class="_ _1"></span>me <span class="_ _8"></span>that I <span class="_ _7"></span>am </div>
                            <div class="t m0 x12 h2f y173 ff3 fs3 fc0 sc0 ls0 ws0">no longer subject to backup withholding; <span
                                class="_ _5"> </span>and</div>
                            <div class="t m5 x2d h2f y174 ff3 fs3 fc0 sc0 ls0 ws0">3.</div>
                            <div class="t m0 x12 h2f y174 ff3 fs3 fc0 sc0 ls0 ws0">I am a U.S. citizen or other U.S. person (defined
                                below); and</div>
                            <div class="t m5 x2d h2f y175 ff3 fs3 fc0 sc0 ls0 ws0">4.</div>
                            <div class="t m0 x6a h2f y175 ff3 fs3 fc0 sc0 ls0 ws0">The FATCA code(s) entered on this form (if any)
                                indicating that I am exempt from FATCA reporting is <span class="_ _4"></span>correct.</div>
                            <div class="t m0 x2d h2f y176 ff4 fs3 fc0 sc0 ls0 ws0">Certification <span
                                class="_ _1"></span>instructions. <span class="ff3">You <span class="_ _7"></span>must <span
                                    class="_ _1"></span>cross <span class="_ _1"></span>out <span class="_ _8"></span>item <span
                                        class="_ _1"></span>2 <span class="_ _8"></span>above <span class="_ _8"></span>if <span
                                            class="_ _1"></span>you <span class="_ _1"></span>have <span class="_ _8"></span>been <span
                                                class="_ _1"></span>notified <span class="_ _1"></span>by <span class="_ _7"></span>the
                                    <span class="_ _1"></span>IRS <span class="_ _8"></span>that <span class="_ _1"></span>you <span
                                        class="_ _8"></span>are <span class="_ _1"></span>currently subject <span
                                            class="_ _8"></span>to <span class="_ _7"></span>backup withholding </span></div>
                            <div class="t m0 x2d h2f y177 ff3 fs3 fc0 sc0 ls0 ws0">because you have failed to report all interest
                                and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage
                            </div>
                            <div class="t m0 x2d h2f y178 ff3 fs3 fc0 sc0 ls0 ws0">interest <span class="_ _1"></span>paid, <span
                                class="_ _1"></span>acquisition <span class="_ _1"></span>or <span
                                    class="_ _1"></span>abandonment of <span class="_ _7"></span>secured <span
                                        class="_ _8"></span>property, <span class="_ _1"></span>cancellation <span
                                            class="_ _1"></span>of <span class="_ _8"></span>debt, <span class="_ _1"></span>contributions
                                <span class="_ _1"></span>to <span class="_ _8"></span>an <span class="_ _7"></span>individual <span
                                    class="_ _1"></span>retirement <span class="_ _1"></span>arrangement (IRA), <span
                                        class="_ _8"></span>and </div>
                            <div class="t m0 x2d h2f y179 ff3 fs3 fc0 sc0 ls0 ws0">generally, payments other <span
                                class="_ _8"></span>than <span class="_ _8"></span>interest and <span
                                    class="_ _1"></span>dividends, <span class="_ _1"></span>you <span class="_ _1"></span>are <span
                                        class="_ _8"></span>not required <span class="_ _8"></span>to <span class="_ _1"></span>sign
                                <span class="_ _8"></span>the <span class="_ _1"></span>certification, <span class="_ _1"></span>but
                                <span class="_ _1"></span>you <span class="_ _8"></span>must provide <span class="_ _8"></span>your
                                correct <span class="_ _1"></span>TIN. <span class="_ _1"></span>See <span class="_ _1"></span>the
                            </div>
                            <div class="t m0 x2d h2f y17a ff3 fs3 fc0 sc0 ls0 ws0">instructions on page <span class="_ _0"></span>3.
                            </div>
                            <div class="t m1 x2d h2c y17b ff3 fs4 fc0 sc0 ls0 ws0">General Instructions</div>
                            <div class="t m0 x2d h26 y17c ff3 fsb fc0 sc0 ls0 ws0">Section references are to the Internal Revenue
                                Code unless otherwise noted.</div>
                            <div class="t m0 x2d h26 y17d ff4 fsb fc0 sc0 ls0 ws0">Future <span class="_ _7"></span>developments.
                                <span class="_ _1"></span><span class="ff3">Information <span class="_ _1"></span>about <span
                                    class="_ _1"></span>developments affecting <span class="_ _7"></span>Form <span
                                        class="_ _8"></span>W-9 <span class="_ _1"></span>(such </span></div>
                            <div class="t m0 x2d h26 y17e ff3 fsb fc0 sc0 ls0 ws0">as <span class="_ _8"></span>leg<span
                                class="_ _2"></span>islation enacted after <span class="_ _8"></span>we <span
                                    class="_ _1"></span>release <span class="_ _1"></span>it) <span class="_ _1"></span>IS at <span
                                        class="_ _1"></span>vrWW.fFS.@OV/fw9.</div>
                            <div class="t m0 x2d h2b y17f ff4 fs5 fc0 sc0 ls0 ws0">Purpose of Form</div>
                            <div class="t m0 x2d h26 y180 ff3 fsb fc0 sc0 ls0 ws0">An individual or entity (Form W-9 requested who
                                is required to file an information </div>
                            <div class="t m0 x2d h26 y181 ff3 fsb fc0 sc0 ls0 ws0">return with the IRS must obtain your correct
                                taxpayer identification number (TIN) </div>
                            <div class="t m0 x2d h26 y182 ff3 fsb fc0 sc0 ls0 ws0">which <span class="_ _8"></span>may <span
                                class="_ _1"></span>be <span class="_ _8"></span>your <span class="_ _8"></span>social <span
                                    class="_ _1"></span>security <span class="_ _1"></span>number <span class="_ _1"></span>(SSN),
                                individual taxpayer <span class="_ _1"></span>identification </div>
                            <div class="t m0 x2d h26 y183 ff3 fsb fc0 sc0 ls0 ws0">number (ITIN), adoption taxpayer identification
                                number (ATIN), or employer </div>
                            <div class="t m0 x2d h26 y184 ff3 fsb fc0 sc0 ls0 ws0">identification number (EIN), to report on an
                                information return the amount paid to </div>
                            <div class="t m0 x2d h26 y185 ff3 fsb fc0 sc0 ls0 ws0">you, <span class="_ _8"></span>or other <span
                                class="_ _1"></span>amount reportable <span class="_ _1"></span>on <span class="_ _1"></span>an
                                <span class="_ _8"></span>information return. <span class="_ _7"></span>Examples of <span
                                    class="_ _1"></span>information </div>
                            <div class="t m0 x2d h26 y186 ff3 fsb fc0 sc0 ls0 ws0">returns include, but are not limited to, the
                                following:</div>
                            <div class="t m13 x2d h26 y187 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y187 ff3 fsb fc0 sc0 ls0 ws0">Form 1099-INT (interest earned or <span
                                class="_ _8"></span>paid)</div>
                            <div class="t m13 x2d h26 y188 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y188 ff3 fsb fc0 sc0 ls0 ws0">Form 1099-DIV (dividends, including those from
                                stocks or mutual <span class="_ _7"></span>funds)</div>
                            <div class="t m13 x2d h26 y189 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y189 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="_ _8"></span>1099<span
                                class="_ _2"></span>-MISC (various <span class="_ _8"></span>types of <span
                                    class="_ _1"></span>income, <span class="_ _1"></span>prizes, awards, <span
                                        class="_ _1"></span>or <span class="_ _1"></span>gross <span class="_ _1"></span>proceeds)</div>
                            <div class="t m13 x2d h26 y18a ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y18a ff3 fsb fc0 sc0 ls0 ws0">Form <span class="_ _1"></span><span
                                class="fc6">1<span class="fc0">099-B <span class="_ _2"></span>(stock or <span
                                    class="_ _1"></span>mutual <span class="_ _1"></span>fund <span
                                        class="_ _1"></span>sales and <span class="_ _1"></span>certain other <span
                                            class="_ _8"></span>transactions by </span></span></div>
                            <div class="t m0 x2d h26 y18b ff3 fsb fc0 sc0 ls0 ws0">brokers)</div>
                            <div class="t m13 x2d h26 y18c ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y18c ff3 fsb fc0 sc0 ls0 ws0">Form 1099-S (proceeds from real estate
                                transactions)</div>
                            <div class="t m13 x2d h26 y18d ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6b h26 y18d ff3 fsb fc0 sc0 ls0 ws0">Form 1099-K (merchant card and third party
                                network transactions)</div>
                            <div class="t m1 x32 h26 y18e ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6c h26 y18e ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>098 (home mortgage
                                interest), <span class="fc6">1</span>098-E (student loan interest), <span class="_ _7"></span><span
                                    class="fc6">1<span class="fc0">098-T</span></span></div>
                            <div class="t m0 x32 h27 y18f ff3 fsc fc0 sc0 ls0 ws0">(tuition)</div>
                            <div class="t m1 x32 h26 y190 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6c h26 y190 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>099-C (canceled
                                <span class="_ _b"> </span>debt)</div>
                            <div class="t m1 x32 h26 y191 ff3 fsb fc0 sc0 ls0 ws0">•</div>
                            <div class="t m0 x6c h26 y191 ff3 fsb fc0 sc0 ls0 ws0">Form <span class="fc6">1</span>099-A (acquisition
                                or abandonment of secured <span class="_ _7"></span>property)</div>
                            <div class="t m0 x6d h26 y192 ff3 fsb fc0 sc0 ls0 ws0">Use <span class="_ _8"></span>Form <span
                                class="_ _1"></span>W-9 only <span class="_ _8"></span>if <span class="_ _1"></span>you <span
                                    class="_ _1"></span>are a <span class="_ _0"></span>U.S. <span class="_ _1"></span>person <span
                                        class="_ _1"></span>(including a <span class="_ _1"></span>resident alien), <span
                                            class="_ _8"></span>to </div>
                            <div class="t m0 x32 h26 y193 ff3 fsb fc0 sc0 ls0 ws0">provide your correct <span
                                class="_ _2"></span>TIN.</div>
                            <div class="t m0 x6c h26 y194 ff5 fsb fc0 sc0 ls0 ws0">11for <span class="_ _4"></span>do <span
                                class="_ _8"></span>not <span class="_ _8"></span>return <span class="_ _7"></span>Form <span
                                    class="_ _7"></span>W-9 <span class="_ _1"></span>to <span class="_ _1"></span>the <span
                                        class="_ _8"></span>requester <span class="_ _1"></span>with <span class="_ _8"></span><span
                                            class="fc7">a <span class="_ _8"></span><span class="fc0">TIN, j <span
                                                class="_ _15"></span>o<span class="ff3">Lt <span class="_ _8"></span>f7JfQfif <span
                                                    class="_ _8"></span><span class="ff5">be <span class="_ _7"></span>subject
                                            </span></span></span></span></div>
                            <div class="t m0 x32 h26 y195 ff5 fsb fc0 sc0 ls0 ws0">to backup withholdf <span
                                class="_ _1"></span><span class="ff3">fl<span class="ff5">g. </span>See <span
                                    class="_ _1"></span><span class="ff5">What <span class="ff3">fS <span
                                        class="_ _8"></span><span class="ff5">backup withholding? <span class="_ _b">
                                        </span><span class="ff3">on <span class="_ _1"></span>page <span
                                            class="_ _8"></span>2.</span></span></span></span></span></div>
                            <div class="t m0 x6d h26 y196 ff3 fsb fc0 sc0 ls0 ws0">By signing the filled-out form, you:</div>
                            <div class="t m14 x6d h26 y197 ff3 fsb fc0 sc0 ls0 ws0">1.</div>
                            <div class="t m0 x6e h26 y197 ff3 fsb fc0 sc0 ls0 ws0">Certify <span class="_ _1"></span>that <span
                                class="_ _1"></span>the <span class="_ _8"></span>TIN <span class="_ _1"></span>you <span
                                    class="_ _1"></span>are giving <span class="_ _1"></span>is correct (or <span
                                        class="_ _8"></span>you <span class="_ _1"></span>are waiting <span class="_ _1"></span>for a
                                <span class="_ _8"></span>number </div>
                            <div class="t m0 x32 h26 y198 ff3 fsb fc0 sc0 ls0 ws0">to be issued),</div>
                            <div class="t m14 x6d h26 y199 ff3 fsb fc0 sc0 ls0 ws0">2.</div>
                            <div class="t m0 x6e h26 y199 ff3 fsb fc0 sc0 ls0 ws0">Certify that you are not subject to backup
                                withholding, or</div>
                            <div class="t m14 x6d h26 y19a ff3 fsb fc0 sc0 ls0 ws0">3.</div>
                            <div class="t m0 x6e h26 y19a ff3 fsb fc0 sc0 ls0 ws0">Claim exemption <span class="_ _1"></span>from
                                backup <span class="_ _1"></span>withholding if <span class="_ _8"></span>you <span
                                    class="_ _1"></span>are a <span class="_ _0"></span>U.S. <span class="_ _1"></span>exempt payee.
                                <span class="_ _1"></span>If </div>
                            <div class="t m0 x32 h26 y19b ff3 fsb fc0 sc0 ls0 ws0">applicable, you are also certifying that as a
                                U.S. person, your allocable share of </div>
                            <div class="t m0 x32 h26 y19c ff3 fsb fc0 sc0 ls0 ws0">any partnership income from a U.S. trade or
                                business is not subject to the </div>
                            <div class="t m0 x32 h26 y19d ff3 fsb fc0 sc0 ls0 ws0">withholding tax on <span
                                class="_ _8"></span>foreign partners’ share <span class="_ _1"></span>of effectively <span
                                    class="_ _8"></span>connected income, and</div>
                            <div class="t m14 x6d h26 y19e ff3 fsb fc0 sc0 ls0 ws0">4.</div>
                            <div class="t m0 x6e h26 y19e ff3 fsb fc0 sc0 ls0 ws0">Certify <span class="_ _8"></span>that <span
                                class="_ _8"></span>FATCA code(s) <span class="_ _8"></span>entered on <span
                                    class="_ _7"></span>this <span class="_ _1"></span>form (if <span class="_ _8"></span>any)
                                indicating <span class="_ _8"></span>that <span class="_ _1"></span>you <span
                                    class="_ _8"></span>are </div>
                            <div class="t m0 x32 h26 y19f ff3 fsb fc0 sc0 ls0 ws0">exempt <span class="_ _1"></span>from <span
                                class="_ _8"></span>the <span class="_ _8"></span>FATCA <span class="_ _7"></span>rep<span
                                    class="_ _2"></span>orting, <span class="_ _8"></span>i<span class="_ _2"></span>s <span
                                        class="_ _8"></span>correct. <span class="_ _1"></span>See <span class="_ _7"></span><span
                                            class="ff5">What <span class="_ _1"></span><span class="ff3">fS <span class="_ _7"></span><span
                                                class="ff5">FATCA <span class="_ _1"></span><span class="ff3">fB/DOrtfr/g* on
                                                </span></span></span></span></div>
                            <div class="t m0 x32 h26 y1a0 ff3 fsb fc0 sc0 ls0 ws0">page 2 for further <span
                                class="_ _1"></span>information.</div>
                            <div class="t m0 x6f h26 y1a1 ff3 fsb fc0 sc0 ls0 ws0">Cat. <span class="_ _8"></span>No. <span
                                class="_ _1"></span>10231X</div>
                            <div class="t m0 x70 h26 y1a2 ff3 fsb fc0 sc0 ls0 ws0">Form W-9 (Rev. <span class="_ _8"></span>12-2014)
                            </div>
                            <div class="c x71 y1a3 w1a h37">
                                <div class="t m0 x21 h2f y1a4 ff3 fs3 fc0 sc0 ls0 ws0">Note. <span class="_ _8"></span>If the <span
                                    class="_ _8"></span>account is <span class="_ _1"></span>in <span class="_ _8"></span>more
                                    <span class="_ _8"></span>than <span class="_ _1"></span>one <span class="_ _1"></span>name, see
                                    <span class="_ _8"></span>the instructions for <span class="_ _1"></span>line <span
                                        class="_ _1"></span>1 <span class="_ _1"></span>and <span class="_ _1"></span>the <span
                                            class="_ _1"></span>chart on <span class="_ _1"></span>page <span class="_ _8"></span>4 for
                                </div>
                                <div class="t m0 x21 h2f y1a5 ff3 fs3 fc0 sc0 ls0 ws0">guidelines on whose number to <span
                                    class="_ _b"> </span>enter.</div>
                            </div>
                            <div class="c x72 y1a6 w1b h38">
                                <div class="t mb x21 h36 y1a7 ff4 fs3 fc0 sc0 ls0 ws0">Employer identification number</div>
                            </div>
                            <div class="c x73 y1a8 w1c h39">
                                <div class="t mf x21 h35 y1a9 ff3 fs5 fc0 sc0 ls0 ws0">Certification</div>
                            </div>
                            <div class="c x71 y1aa w1d h3a">
                                <div class="t m0 x21 h28 y1ab ff4 fsc fc0 sc0 ls0 ws0">SigFl</div>
                                <div class="t m0 x16 h28 y1ac ff4 fsc fc0 sc0 ls0 ws0">Signature <span class="_ _7"></span>of</div>
                                <div class="t m0 x21 h36 y1ad ff4 fs3 fc0 sc0 ls0 ws0">Here</div>
                                <div class="t m5 x16 h2f y1ad ff4 fs3 fc0 sc0 ls0 ws0">u.S. person <span class="_ _0"></span><span
                                    class="ff3">•</span></div>
                            </div>
                            <div class="c x74 y1ae w1e h3b">
                                <div class="t m1 x21 h26 y1af ff3 fsb fc0 sc0 ls0 ws0">Date •</div>
                            </div>
                            <div class="c x75 y1b0 w1f h3c">
                                <div class="t m15 x76 h1e y1b1 ff3 fs6 fc0 sc0 ls0 ws0">Pnnt or type</div>
                                <div class="t m16 x19 h1e y1b2 ff3 fs6 fc0 sc0 ls0 ws0">See</div>
                                <div class="t m15 x19 h1e y1b3 ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m17 x19 h1e y1b4 ff3 fs6 fc0 sc0 ls0 ws0">Speci<span class="_ _1"></span>fic</div>
                                <div class="t m18 x19 h1e y1b5 ff3 fs6 fc0 sc0 ls0 ws0">T</div>
                                <div class="t m15 x19 h1e y1b6 ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m19 x19 h1e y1b7 ff3 fs6 fc0 sc0 ls0 ws0">ns</div>
                                <div class="t m1a x19 h1e y1b8 ff3 fs6 fc0 sc0 ls0 ws0">w</div>
                                <div class="t m19 x19 h1e y1b9 ff3 fs6 fc0 sc0 ls0 ws0">t</div>
                                <div class="t m15 x19 h1e y1ba ff3 fs6 fc0 sc0 ls0 ws0"> <span class="_ _2"></span>ctions </div>
                                <div class="t m1b x19 h1e y1bb ff3 fs6 fc0 sc0 ls0 ws0">on</div>
                                <div class="t m15 x19 h1e y1bc ff3 fs6 fc0 sc0 ls0 ws0"> </div>
                                <div class="t m1c x19 h1e y1bd ff3 fs6 fc0 sc0 ls0 ws0">pag</div>
                            </div>
                        </div>
                        <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
                    </div> */}
                </div>
                <div class="loading-indicator">

                </div>
            </div>

            {/* <div className="text-center"><button onClick={() => handlePrint()}>Print</button></div> */}
            <div className="bg-white  blue rp-3 border  col-span-3 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                <span className="mr-3 "></span><span className='printicon "' onClick={handlePrint} >Print</span>
            </div>
        </>

    )
}

export default PdfForm