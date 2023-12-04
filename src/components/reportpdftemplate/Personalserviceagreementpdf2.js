import React, { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import "./base.min.css";
import { useRef } from "react";
import "./fancy.min.css";
import "./main.css";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import handleDateSelect from "../../helper/convertDateIntoPSTFormat";
import JsPDF from "jspdf";
import AWS from "aws-sdk";
import { Margin } from "react-to-pdf";

const uploadPDF = (pdfFile, filePath) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    region: process.env.REACT_APP_AWS_Region
  });

  const params = {
    Bucket: process.env.REACT_APP_AWS_Bucket,
    Key: filePath,
    Body: pdfFile,
    ContentType: "application/pdf"
  };

  try {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("S3 filesaving Error uploading PDF file:", err);
      } else {
        console.log("S3 filesaving PDF file uploaded successfully:", data);
      }
    });
  } catch (e) {
    console.log("Error when upload pdf:-", e);
  }
};

const PsaPdf2 = forwardRef((props, ref) => {
  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", [500, 950]);
    report.html(document.querySelector("#report")).then(() => {
      // report.save('report.pdf');

      const pdfFile = report.output("blob");
      // const fileName = `report-${Date.now()}.pdf`;
      const filePath = "public/psareport/" + props.psaConsultantId + "/PSAReport.pdf";
      console.log("pdfFile blob:-", pdfFile);
      uploadPDF(pdfFile, filePath);
    });
  };
  useImperativeHandle(ref, () => ({
    generatePDF
  }));

  console.log("propspsaConsultantIdpsaConsultantId--", props.psaConsultantId);
  const numberToWords = require("number-to-words");

  const year = props.amount ? props.amount : "";
  let yearInWords = "-";
  if (year) {
    yearInWords = numberToWords.toWords(year);
  }

  const amount = props.amount; // Assuming props.amount is a string

  const formattedAmount = parseInt(amount, 10).toString();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const [checked, setChecked] = useState();
  const [value, setValue] = useState("");

  function formatAccountNumber(accountNumber) {
    if (!accountNumber) return "-"; // Handle empty or undefined account numbers

    const chunks = []; // Array to store chunks of 10 digits each

    // Split the account number into chunks of 10 digits
    for (let i = 0; i < accountNumber.length; i += 10) {
      const chunk = accountNumber.substring(i, i + 10);
      chunks.push(chunk);
    }

    // Join the chunks with a space separator for better readability
    return chunks.join(" ");
  }

  return (
    <>
      <div
        // id="my-html-template"
        id="report"
        ref={props.refPrint}
      >
        <div>
          <div id="outline"></div>
        </div>
        <div id="page-container">
          <div id="pf1" class="pf print:p-2 no-page-break pageA1" data-page-no="1">
            <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
              <div className="text-center mb-[20px] xl:mb-[1.344vw]">
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                <div className="text-[18px] xl:text-[0.938vw] font-normal">223 North Jackson Street</div>
                <div className="text-[18px] xl:text-[0.938vw] font-normal">Glendale, CA 91206</div>
                <div className="text-[18px] xl:text-[0.938vw] font-normal mb-[10px] xl:mb-[1.344vw]">
                  (818) 241-3111
                </div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold border px-2 py-2 border-[#344054]">
                  PERSONAL SERVICES AGREEMENT
                </div>
              </div>
              <div className="space-y-2 mb-[20px] xl:mb-[1.083vw] leading-tight">
                <b>THIS CONTRACT</b> made and entered into this{" "}
                <>
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] ">
                    {props.agreementDate ? moment(props.agreementDate, "YYYY-MM-DD").format("DD") : "-"}
                  </b>
                </>{" "}
                day of{" "}
                <>
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                    {props.agreementDate ? moment(props.agreementDate, "YYYY-MM-DD").format("MMMM") : "-"}
                  </b>
                </>{" "}
                ,{" "}
                <>
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                    {props.agreementDate ? moment(props.agreementDate, "YYYY-MM-DD").format("YYYY") : "-"}
                  </b>
                </>{" "}
                by and between{" "}
                <>
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                    {props.partyName ? props.partyName : "-"}
                  </b>
                </>{" "}
                hereinafter called the <b>PROVIDER and the GLENDALE UNIFIED SCHOOL DISTRICT,</b> hereinafter called the{" "}
                <b>DISTRICT.</b>
                <div className="leading-tight">
                  <b>WITNESSETH;</b>The parties do hereby contract and agree as follows:
                </div>
              </div>
              {/* list  */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div>1.</div>
                  <div className="space-y-2">
                    The <b>PROVIDER</b> shall furnish the <b>DISTRICT</b> for a total contract price of:
                    {/* <div> */}
                    <>
                      <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">{yearInWords}</b>
                    </>{" "}
                    Dollars{" "}
                    <>
                      <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                        {formattedAmount ? "$" + formattedAmount : "-"}
                      </b>
                    </>{" "}
                    the following services:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                      {props.services ? props.services : ""}
                    </b>
                    {/* </div> */}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>2.</div>
                  <div>
                    The term of this contract shall begin{" "}
                    <>
                      <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                        {props.effectiveDate ? moment(props.effectiveDate, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                      </b>
                    </>{" "}
                    and will terminate on or before{" "}
                    <>
                      <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] ">
                        {props.expirationDate ? moment(props.expirationDate, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                      </b>
                    </>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <div>3.</div> */}
                  <div>
                    3. The Provider shall not commence work under this Contract until the insurance required under
                    Paragraph 17 of the <b>Terms and Conditions</b> and satisfactory proof of such insurance has been
                    submitted to the District and said insurance has been approved by the District.
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <div>4.</div> */}
                  <div>
                    4. Payment Schedule - Payment for the work shall be made upon submission of monthly statements and
                    the District's written approval of the work (which approval shall not be unreasonably withheld).
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>5.</div>
                  <div>Approvals for payment shall be authorized by a responsible District administrator.</div>
                </div>
                <div className="flex gap-2">
                  {/* <div>6.</div> */}
                  <div>
                    6. The Contract includes the general terms and conditions as printed and set forth on the reverse
                    side of this page, and the Provider, by executing this Contact, agrees to comply with all such
                    general terms and conditions.
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <div>7.</div> */}
                  <div>
                    7. The Provider shall guarantee that all professional services rendered in the performance of this
                    Contract are in keeping with current generally accepted practices for an educational institution.
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <div>8.</div> */}
                  <div>
                    8. The Provider will complete and provide the necessary documentation in order for the District to
                    submit claims under the LEA Medi-Cal Billing Option Program. Provider will be advised by the
                    District's representative responsible for facilitating this billing process.
                  </div>
                </div>
                <div className="">
                  <span className="inline-block pr-2">9.</span>
                  <span>
                    IN WITNESS WHEREOF, the parties hereunto have subscribed to this Contract, including all Contract
                    Documents as listed below:
                  </span>
                  <div className="pl-4">
                    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          // onChange={e => setChecked(e.checked)} checked={checked}
                          disabled
                          checked={Array.isArray(props?.businessEntity) && props?.businessEntity?.includes("0")}
                          // checked={Array.isArray([]) && ["0"]?.includes("0") }
                        />
                        <div>Scope of Work Statement</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          disabled
                          checked={Array.isArray(props?.businessEntity) && props?.businessEntity?.includes("3")}
                          // onChange={e => setChecked(e.checked)} checked={checked}
                        />
                        <div>Addendum Containing Specific Terms and Conditions</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          // onChange={e => setChecked(e.checked)} checked={checked}
                          disabled
                          checked={Array.isArray(props?.businessEntity) && props?.businessEntity?.includes("2")}
                        />
                        <div>Purchase Order No.</div>
                        <div className="flex items-center gap-2 text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]  ">
                          {props.purchaseOrderNo ? props.purchaseOrderNo : "-"}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          //  onChange={e => setChecked(e.checked)} checked={checked}
                          disabled
                          checked={Array.isArray(props?.businessEntity) && props?.businessEntity?.includes("1")}
                        />
                        <div>Insurance Forms</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          // onChange={e => setChecked(e.checked)} checked={checked}
                          disabled
                          checked={Array.isArray(props?.businessEntity) && props?.businessEntity?.includes("4")}
                        />
                        <div>
                          Attached Addendum No.
                          <div className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                            {props.addendumNo ? props.addendumNo : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold border px-2 py-2 border-[#344054] print:mt-[0px] mt-5">
                <span>
                  Submit Completed form to:
                  <div>
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                      {props.submittedCompletedFormTo ? props.submittedCompletedFormTo : "-"}
                    </b>
                  </div>
                </span>{" "}
                <span>
                  Personnel Action Reference No:{" "}
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]  ">
                    {props.referenceNo ? props.referenceNo : "-"}
                  </b>
                </span>
              </div>
              {/* <div className="flex justify-between mt-5 px-4"> */}
              <div >
              <div >
                <div className="flex justify-center items-center px-4 gap-6">
                  <div className="ml:[0px] xl:ml-14">
                    <b>Page 1 of 10</b>
                  </div>
                  <div className="text-[10px]">Revised 12/14/2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="pf2" class="pf  print:m-3 mt-0 no-page-break pageA2" data-page-no="2">
            <div className="px-10 py-3 mb-[20px] xl:mb-[0px] text-[#344054] text-[15px] xl:text-[0.885vw] print:m-2">
              <div className="text-[24px] xl:text-[1.250vw] text-center font-semibold border px-2 py-2 border-[#344054] mb-2 print:mb-[5px] ">
                PERSONAL SERVICES AGREEMENT
              </div>
              <div className="font-medium border px-4 py-4 print:py-[10px] border-[#344054]">
                NOTE: Federal Regulations (Code Sections 6041 and 6209)    non-corporate recipients of $600.00 or
                more to furnish their taxpayer identification number to the payer. The regulations also provide that a
                penalty may be imposed for failure to furnish the taxpayer identification number. In order to comply
                with these regulations, the District requires your federal tax identification number or Social Security
                Number, whichever is applicable.
              </div>
              <div className="mt-2 print:mt-[5px] print:pt-[5px]">
                <div className="grid grid-cols-2 lg:grid-cols-2 divide-x-2 divide-[#545454]">
                  <div className="ml-10">
                    <div className="space-y-2 print:space-y-0">
                      <div className="mb-3 font-semibold">TYPE OF BUSINESS ENTITY</div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          disabled
                          checked={props?.typeBE === "Individual"}
                          // onChange={e => setChecked(e.checked)} checked={checked}
                        />
                        <div>Individual</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          // onChange={e => setChecked(e.checked)} checked={checked}
                          disabled
                          checked={props?.typeBE === "Sole Partnership"}
                        />
                        <div>Sole Partnership</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          disabled
                          checked={props?.typeBE === "Partnership"}
                          // onChange={e => setChecked(e.checked)} checked={checked}
                        />
                        <div>Partnership</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          disabled
                          checked={props?.typeBE === "Corporation"}
                          // onChange={e => setChecked(e.checked)} checked={checked}
                        />
                        <div>Corporation</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          disabled
                          checked={
                            props?.typeBE === "Individual" ||
                            props?.typeBE === "Corporation" ||
                            props?.typeBE === "Partnership" ||
                            props?.typeBE === "Sole Partnership" ||
                            props?.typeBE === undefined ||
                            props?.typeBE === null
                              ? false
                              : true
                          }
                        />
                        <div>Other</div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <InputTextarea
                        value={
                          props?.typeBE === "Individual" ||
                          props?.typeBE === "Corporation" ||
                          props?.typeBE === "Partnership" ||
                          props?.typeBE === "Sole Partnership"
                            ? ""
                            : props?.otherTypeBE
                            ? props?.otherTypeBE
                            : props?.typeBE
                          // "" :  props?.typeBE
                        }
                        // value={props?.businessEntity}
                        disabled
                        //    onChange={e => setValue(e.target.value)}
                        rows={2}
                        cols={20}
                      />
                    </div>
                  </div>
                  <div className="pl-0 mt-2 ">
                    <div className="mb-10 text-center">
                      <div className="mb-3 font-semibold">TAX IDENTIFICATION</div>
                      <div className="w-[350px] mt-8">
                        <div className="w-[350px]  mt-8"></div>
                        <>
                          <b className="text-[green] font-bold w-[15.625vw]  print:w-[20.625vw]">
                            {props.socialSecurityNumber ? props.socialSecurityNumber : "-"}
                          </b>
                        </>
                        <div className="mr-5">Social Security Number</div>
                      </div>
                    </div>
                    <div className="mb-2 text-center">
                      <div className="w-[350px] mt-4">
                        <div className="w-[350px] mt-8"></div>
                        <>
                          <b className="text-[green] font-bold w-[15.625vw]  print:mt-[5px]">
                            {props.employerIdentification ? props.employerIdentification : "-"}
                          </b>
                        </>
                        <div className="mr-5">Employer Identification</div>
                      </div>
                    </div>
                    <div className="mt-10 ml-5 print:mt-[5px]">
                      <div>
                        {" "}
                        <b>
                          Under penalty of perjury, I certify that the number shown on this form is my correct taxpayer
                          identification number.
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border border-[#333]">
                    <div className="py-2 font-semibold">Provider Name</div>
                  </div>
                  <div className="text-center border border-[#333]">
                    <div className="py-2 border-r border-[#333] font-semibold">Glendale Unified School District</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-2 divide-x-2 divide-[#545454]">
                  <div className=" mt-4 px-2">
                    <div className="space-y-10 mb-2">
                      <div className="text-center">
                        <div className="ml-6 mt-6 print:mt-[5px]">
                          <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                            {props.partyName ? props.partyName : "-"}
                          </b>
                        </div>
                        <div className="mb-3 text-[13px]">Provide Name</div>
                      </div>
                      <div className="text-center">
                        <div className="ml-6 mt-4"></div>
                        <div className="mb-3 text-[13px]">Signature</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px]">TITLE:</div>
                        <div className="w-[350px] text-[green] font-bold ml-2  print:w-[20.625vw]">
                          {props.title ? props.title : "-"}
                        </div>
                      </div>
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px] ">LICENSE NO:</div>

                        <div className="w-[350px]">
                          <b className="text-[green] font-bold ml-2">
                            {props.licenseNumber ? props.licenseNumber : "-"}
                          </b>
                        </div>
                      </div>
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px]">ADDRESS:</div>
                        <div className="w-[350px]">
                          <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw">
                            {props.addressPSa ? props.addressPSa : "-"}
                          </b>
                        </div>
                      </div>
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px]">DATE:</div>
                        <div className="w-[350px]">
                          {" "}
                          {props.approvelStatusData || props.isApproverEdit ? (
                            <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                              {props.updatedAt ? moment(props.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                            </b>
                          ) : (
                            <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">
                              -
                            </b>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px]">PHONE:</div>
                        <div className="w-[350px]">
                          <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                            {props.pocNumber ? props.pocNumber : "-"}
                          </b>
                        </div>
                      </div>
                      <div className="flex gap-5 mb-4">
                        <div className="w-[100px]">FAX:</div>
                        <div className="w-[350px]">
                          <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                            {props.fax ? props.fax : "-"}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 mt-1 print:mt-[5px]">
                    <div className="">
                      <div className="text-center">
                        <div className="ml-10  mt-6">
                          <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                            {props.superintendentAssistent ? props.superintendentAssistent : "-"}
                          </b>
                        </div>
                        <div className="mb-3 text-[13px]">
                          Superintendent. Assistant Superintendent or Chief IIR & Operations Officer
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="ml-10 mt-6"></div>
                        <div className="mb-2 text-[13px]">Signature</div>
                      </div>
                      <div className="mt-2">
                        <div className="flex gap-5 mb-4">
                          <div className="w-[300px]">DATE:</div>
                          <div className="w-[350px]">
                            {" "}
                            <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                              {props.agreementDate
                                ? moment(props.agreementDate, "YYYY-MM-DD").format("MM/DD/YYYY")
                                : "-"}
                            </b>
                          </div>
                        </div>
                        <div className="flex gap-5 mb-4">
                          <div className="w-[300px]">ACCOUNT NO:</div>
                          {/* <div className="w-[350px">
                            {" "}
                            <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"> */}
                          {/* {props.agreementDate ? moment(props.agreementDate, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"} */}
                          {/* {props.accountNumber ? props.accountNumber : "-"}

                            </b>
                          </div> */}
                          <div className="w-[350px]">
                            <div className="text-[green] font-bold ml-2 overflow-x-auto">
                              {props.accountNumber ? formatAccountNumber(props.accountNumber) : "-"}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5 mb-4">
                          <div className="w-[310px]">DATE OF BOARD MEETING:</div>
                          <div className="w-[350px">
                            <b
                              className="text-[green]
                                                     font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]"
                            >
                              {props.dateOfBoardMeeting
                                ? moment(props.dateOfBoardMeeting, "YYYY-MM-DD").format("MM/DD/YYYY")
                                : "-"}
                            </b>
                          </div>
                        </div>
                        <div className="flex gap-5 mb-4">
                          <div className="w-[300px]">BOARD ITEM:</div>
                          <div className="w-[350px]">
                            <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                              {props.BoardItem ? props.BoardItem : "-"}
                            </b>
                          </div>
                        </div>
                        <div className="flex gap-5 mb-4">
                          <div className="w-[300px]">PAGE/ITEM:</div>
                          <div className="w-[350px]">
                            <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]">
                              {props.pageItem ? props.pageItem : "-"}
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="isMar4">
                <div className="flex justify-center mt-1 px-4">
                  <div>
                    <b>Page 2 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf3" class="pf print:p-2  no-page-break pageA3" data-page-no="3">
            <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
            <div className=" font-medium border px-4 py-3 border-[#344054] shadow mt-2">
                "I am aware of the provisions of Section 3700 of the Labor Code which require every employer to be
                insured against liability for Worker's Compensation or to undertake self insurance in accordance with
                provisions of that code, and I will comply with such provisions before commencing the performance of the
                work of this Contract."
              </div>
              <div className="text-[24px] text-center xl:text-[1.250vw] font-semibold mb-3">
                GENERAL TERMS AND CONDITIONS
              </div>
              <div className="space-y-1">
                <div>
                  1. <b>PROPOSAL ACCEPTANCE.</b> Proposals are subject to acceptance by the signing of a contract and
                  issuance of an appropriate purchase order at any time within sixty (60) days after the receipt of
                  quotes unless otherwise stipulated. The District reserves the right to accept or reject any and all
                  quotes and reserves the right to waive any informality in any quote.
                </div>
                <div>
                  2. <b>EQUIPMENT AND LABOR.</b> The Provider shall furnish all tools, equipment, apparatus, facilities,
                  transportation, labor, and material necessary to furnish the professional services herein described,
                  the services to be performed at such time and places as directed by and subject to the approval of the
                  authorized district representative indicated in the work specifications attached hereto.
                </div>
                <div>
                  3. <b>SAFETY AND SECURITY.</b> It shall be the responsibility of the Provider to ascertain from the
                  District the rules and regulations pertaining to safety, security and driving on school grounds,
                  particularly when children are present.
                </div>
                <div>
                  4. <b>TERMINATION.</b> This Contract may be terminated at any time by either party with five (5)
                  business days' advance written notice.
                </div>
                <div>
                  5. <b>DEFAULT BY PROVIDER.</b> When Provider shall fail to deliver any article or service or shall
                  deliver any article or service which does not conform to the work specifications, the District may,
                  upon five (5) business days' prior written notice describing the fault, at its option, annul and set
                  aside the contract entered into with said Provider and make and enter into a new contract in such
                  manner as seems to the Board of Education to be to the best advantage of the District. Any failure for
                  furnishing such articles or services by reason of the failure of the Provider as above stated, shall
                  be a liability against the Provider and his sureties. The Board of Education reserves the right to
                  cancel any articles or services which the Provider may be unable to furnish because of economic
                  conditions, governmental regulations or other similar causes beyond the control of the Provider
                  provided satisfactory proof is furnished to the Board of Education, if requested.
                </div>
                <div>
                  6. <b>CONTRACT CHANGES.</b> No changes or alterations to this contract shall be made without specific
                  prior written approval by the District.
                </div>
                <div>
                  7. <b>SUBSTITUTIONS.</b> No substitutions of materials or service from those specified in the Scope of
                  Work shall be made without the prior written approval of the District.
                </div>
                <div>
                  8. <b>ACCESS TO WORK.</b> District representatives shall at all times have access to work wherever it
                  is in preparation or progress.
                </div>
                <div>
                  9. <b>PROTECTION OF WORK AND PROPERTY.</b> The Provider shall maintain at all times, as required by
                  conditions and progress of work, all necessary safeguards for the protection of employees and the
                  public. In an emergency affecting life and safety of life or of work or of adjoining property,
                  Provider, without special instruction or authorization from District, is permitted to act at his
                  discretion to prevent such threatened loss or injury.
                </div>
               
               
                <div style={{ position: "absolute", bottom: " 0px", left: "50%", transform: "translateX(-50%)" }}>
                  <div className="text-center mt-5">
                    <div>
                      <b>Page 3 of 10</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="pf3" class="pf print:p-2  no-page-break pageA4" data-page-no="4">
            <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw] mt-1">
            <div>
                  10. <b>ASSIGNMENT OF CONTRACT AND PUCHASE ORDER.</b> The Provider shall not assign or transfer by
                  operation of law or otherwise any or all of its rights, burdens, duties, or obligations under this
                  contract without the prior written consent of the District.
                </div>
            <div>
                  11. <b>FORCE MAJEURE CLAUSE.</b> The parties to the Contract shall be excused from performance
                  thereunder during the time and to the extent that they are prevented from obtaining, delivering, or
                  performing by act of God, fire, strike, loss, or shortage of transportation facilities, lock-out
                  commandeering of materials, products, plants or facilities by the government when satisfactory
                  evidence thereof is presented to the other party(ies), provided that it is satisfactorily established
                  that the non-performance is not due to the fault or neglect of the party not performing.
                </div>
              <div>
                12. <b>HOLD HARMLESS AGREEMENT.</b> The Provider shall save, defend, hold harmless and indemnify the
                District from and against any and all losses, damages, liabilities, claims, and costs of whatsoever kind
                and nature for injury to or death of any person and for loss or damage to any property occurring in
                connection with or in any way incident to or arising out of the occupancy, use, service, operations, or
                performance of work on the property under the terms of this contract, resulting in whole or in part from
                the negligent acts or omissions of the Provider, any subproviders, or any employee, agent or
                representative of Provider and/or its subproviders.
              </div>
              <div>
                13. <b>PAYMENT.</b> Unless otherwise specified, the Provider shall render invoices in triplicate for
                materials delivered or services performed under the Contract/Purchase Order. The District shall make
                payment for materials, supplies or other services furnished under this Contract as agreed within thirty
                (30) days after delivery to and approval by the authorized District representative of all invoices and
                other documentary evidence reasonably required by the District (which approval shall not be unreasonably
                withheld).
              </div>
              <div>
                14. <b>PERMITS AND LICENSES.</b> The Provider shall secure and maintain in force, at Provider's sole
                cost and expense, such licenses and permits as are required by law, in connection with the furnishing of
                services, materials, or supplies herein listed.
              </div>
              <div>
                15. <b>PROVIDER NOT OFFICER, EMPLOYEE, OR AGENT OF DISTRICT.</b> While engaged in carrying out other
                terms and conditions of the purchase order, the Provider is an independent Provider, and not an officer,
                employee, agent, partner, or joint venture of the District.
              </div>
              <div>
                16. <b>ANTI-DISCRIMINATION.</b> Pursuant to Board Policy 4030, Glendale Unified School District
                prohibits discrimination and/or harassment of any person based on race, color, national origin,
                ancestry, religious creed, age, marital status, pregnancy, physical or mental disability, medical
                condition, genetic information, veteran status, gender, gender identity, gender expression, sex or
                sexual orientation. Therefore, the Provider agrees to comply with the applicable Federal and California
                Laws, including, but not limited to, the California Fair Employment Practice Act, beginning with Labor
                Code, Section 1410 and Labor Code, Section 1735. In addition, the Provider agrees to require such
                compliance by all subproviders employed on the Contract by him.
              </div>
             
              
              <div className="isMar2">
                <div className="text-center mt-5">
                  <div>
                    <b>Page 4 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf4" class="pf print:p-2  no-page-break pageA5" data-page-no="5">
            <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw] mt-8">
              <div className="space-y-2 border-b-[2px] border-[#344054] pb-2">
              <div>
                17. <b>PROVIDER'S INSURANCE.</b> The Provider shall not commence work under this Contract until he has
                obtained the insurance required under this paragraph and satisfactory proof of such insurance has been
                submitted to District and said insurance has been approved by the District. Except for worker's
                compensation insurance, the policy shall not be amended or modified and the coverage amounts shall not
                be reduced without the District's prior written consent, and, the District shall be named as an
                additional insured and be furnished thirty (30) days written notice prior to cancellation. In the event
                that the insurance requirements cannot be met, please turn in a signed "Hold Harmless and
                Indemnification Agreement."
              </div>
              <div>
                <span className="pl-2">a) </span> <b>PROVIDER'S PUBLIC LIABILITY AND PROPERTY DAMAGE INSURANCE.</b> The
                Provider shall procure and shall maintain during the life of his contract, Provider's Public Liability
                Insurance in an amount not less than $1,000,000 for injuries, including accidental death to any one
                person, and subject to the limit for each person, in an amount not less than $1,000,000 on account of
                one accident, and Provider's Property Damage Insurance in an amount not less than $1,000,000.
              </div>
              <div>
                18. <b>COMPLIANCE WITH LAWS.</b> Provider shall give all notices and comply with all laws, ordinances,
                rules and regulations bearing on conduct or work as indicated or specified. If Provider observes that
                any of the work required by this contract is at variance with any such laws, ordinances, rules or
                regulations, Provider shall notify the District, in writing, and, at the sole option of the District,
                any necessary changes to the scope of work shall be made and this Contract shall be appropriately
                amended in writing, or this Contract shall be terminated effective upon Provider's receipt of a written
                termination notice from the District. If Provider performs any work knowing it to be in violation of
                such laws, ordinances, rules or regulations, and without first notifying the District of such violation,
                Provider shall bear all costs arising there from.
              </div>
                <div>
                  19. <b>TIME IS OF THE ESSENCE.</b> Time is of the essence in the performance of and compliance with
                  each of the provisions and conditions of this contract.
                </div>
                <div>
                  20. <b>GOVERNING LAW.</b> This contract shall be governed by and construed in accordance with the laws
                  of the State of California.
                </div>
                <div>
                  21. <b>ATTORNEYS' FEES.</b> If any action is brought by either party against the other party
                  hereunder, each party shall be responsible for its own expenses, including legal and accounting fees,
                  in connection with the prosecution or defense of such action.
                </div>
                <div>
                  22. <b>NO ORAL MODIFICATION.</b> Any waiver, amendment, modification, consent or acquiescence with
                  respect to this contract or any provision of this contract or with respect to any failure to perform
                  in accordance therewith shall be set forth in writing and duly executed by or on behalf of the party
                  to be bound thereby.
                </div>
                <div>
                  23. <b>PROVISIONS REQUIRED BY LAW DEEMED INSERTED.</b> Each and every provision of law and clause
                  required by law to be inserted in this contract shall be deemed to be inserted herein and this
                  contract shall be read and enforced as though it were included herein.
                </div>
                
              </div>
              <div className="isMar4">
                <div className="text-center mt-6 px-4">
                  <div>
                    <b>Page 5 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf4" class="pf print:p-2  no-page-break pageA6" data-page-no="6">
            <div className="px-10 py-5 text-[#344054] text-[15px] xl:text-[0.885vw]">
            <div>
                  24. <b>TUBERCULOSIS TESTING.</b> Before commencing services, Provider, if working with or near
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
              
              <div className="isMar7">
                <div className="text-center mt-5">
                  <div>
                    <b>Page 6 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf5" class="pf print:p-2  no-page-break pageA7" data-page-no="7">
            <div className="px-10 py-5 text-[#344054] text-[16px] xl:text-[0.833vw]">
            <div className="text-center mb-3">
                <div className="text-[24px] text-center xl:text-[1.250vw] font-semibold mt-3">
                  SUPPLEMENTAL AGREEMENT
                </div>
                <div>Specialized Services for Students and Families</div>
              </div>
              <div className="mb-3">
                <b>The undersigned Agrees as follows:</b>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <div>
                    1. To cooperate with school personnel to ensure fair and equitable availability of services to all
                    families.
                  </div>
                  <div>2. To support District and school policies and standards.</div>
                  <div>
                    3. To work with groups of students and/or parents when possible to ensure that as many families are
                    served as possible. Marital counseling is not an expected use of school-based clinical staff.
                  </div>
                  <div>
                    4. To refer students and families in need of (in-depth, long-term) specialized services to
                    appropriate community agencies whenever possible. It is inappropriate for a clinic to refer its own
                    agency
                  </div>
                </div>
                <div className="space-y-1">
                  <div>
                    agency unless comparable services are not available elsewhere or the family specifically requests
                    services offered by clinician (which should be documented along with referrals to alternative
                    agencies).
                  </div>
                  <div>5. To provide licensed personnel or fully-supervised interns for all</div>
                  <div>6. To maintain appropriate insurance as required by the District.</div>
                  {/* <div></div> */}
                  {/* <div className="grid grid-cols-2 gap-2 mt-10 ml-10">
                    <div className="text-center mt-10">
                      <div> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">{props?.partyName && props?.partyName } </b></div>
                      <div className="mt-10">Approved By</div>
                    </div>
                    <div className="text-center mt-10">
                      <div><b className="text-[green] font-bold ml-1 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                  </b></div>
                      <div className="mt-10">Date</div>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="grid grid-cols-3 gap-2 mt-10 ml-10">
                  <div></div>
                    <div className="text-center">
                      <div> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">{props?.partyName && props?.partyName } </b></div>
                      <div>Approved By</div>
                    </div>
                    <div className="text-center">
                      <div><b className="text-[green] font-bold ml-1 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                  </b></div>
                      <div >Date</div>
                    </div>
                  </div> */}
              <div className="flex gap-20 mt-8">
                <div className="space-y-4">
                  {/*  <div> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">{props?.partyName && props?.partyName } </b></div> */}

                  <div>
                    Approved By:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] gap-2  border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.partyName && props?.partyName}{" "}
                    </b>
                  </div>
                  {/* <div>Signature:</div> */}
                  <div>
                    {/* <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                  </b> */}
                  </div>
                  <div>
                    Date:
                    {/* <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.dateOfApprove ? moment(props?.dateOfApprove, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}</b> */}
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.dateOfApprove ? moment(props?.dateOfApprove, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                    </b>
                    {/* { props.approvelStatusData ?
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}</b>
                    :
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">-</b>
                  } */}
                  </div>
                </div>
                <div className="space-y-3">
                  {/* <div> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">{props?.partyName && props?.partyName } </b></div>
                  <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">
                  {props.updatedAt ? handleDateSelect(props.updatedAt) : null}
                  </b> */}
                </div>
              </div>
              
              <div className="isMar8">
                <div className="text-center mt-5">
                  <div>
                    <b>Page 7 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf5" class="pf print:p-2  no-page-break pageA8" data-page-no="8">
            <div className="px-20 text-[#344054] text-[16px] xl:text-[0.833vw]">

            <div className="text-center mb-1">
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">Glendale Unified School District</div>
                <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">Glendale, California</div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                  HOLD HARMLESS AND INDEMNIFICATION AGREEMENT
                </div>
              </div>
              <div>
                Provider agrees at all times to protect, indemnify, and hold the Glendale Unified School District, its
                Board of Trustees, officers, employees, members, representatives, agents, guests, invitee, and/or
                employees free and harmless, and to provide legal defense, from any and all liabilities, claims, losses,
                judgments, damage, demands or expenses resulting from the services provided by the Provider, Provider's
                use or occupancy of the District's facilities and premises [including travel to and from said facilities
                and premises] and/or the active or passive negligence of the Provider or of the District, its Board of
                Trustees, officers, employees, members, representatives, agents, guests, invitee, and/or employees,
                specifically including, without limitation, any liability, claim, loss, judgment, damage, demand, or
                expense, arising by reason of:
              </div>
              <div className="space-y-2 px-8 mt-2">
                <div className="flex gap-2">
                  <div>1.</div>
                  <div>
                    the loss of or damage to any of the District's facilities or premises including any building,
                    structure, or improvement thereon, or any equipment to be used therein;
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>2.</div>
                  <div>
                    the injury to or death of any person including, but not limited to, the officers, members,
                    employees, representatives, agents, guests, invitee, and/or employees of the Provider or of the
                    District; or
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>3.</div>
                  <div>
                    damage to any property arising from the use, possession, selection, delivery, return, condition or
                    operation of the District's facilities.
                    <div className="mt-2">
                      Provider further agrees to reimburse the District for all liabilities, claims, losses, judgments,
                      damage, demands, expenses, fines, penalties, including reasonable attorneys' fees imposed or
                      incurred by the District because of the Provider's use or occupancy of the District's facilities,
                      access to said facilities and premises, and/or active or passive negligence of the Provider or of
                      the District, its Board of Trustees, officers, members, representatives, agents, guests, invitee,
                      and/or employees.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                THE UNDERSIGNED HAS READ AND VOLUNTARILY SIGNS THE RELEASE AND WAIVER OF LIABILITY AND INDEMNITY
                AGREEMENT, and further agrees that no oral representation, statements of inducement apart from the
                foregoing written agreement have been made.
              </div>
              <div className="mt-5">I HAVE READ THIS RELEASE.</div>
              <div className="flex gap-20 ">
                <div className="space-y-4">

                  <div>
                    Approved By:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] gap-2  border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.partyName && props?.partyName}{" "}
                    </b>
                  </div>
                  <div>
                  </div>
                  <div>
                    Date:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.dateOfApprove ? moment(props?.dateOfApprove, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                    </b>
                  </div>
                </div>
                <div className="space-y-3">
                </div>
              </div>
              <div className="">
                <div className="text-center mt-5">
                  <div>
                    <b>Page 8 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="pf7" class="pf print:p-2  no-page-break pageA9" data-page-no="9">
            <div className="px-10 py-5 text-[#344054] text-[16px] xl:text-[0.833vw]">

            <div className="text-center mb-10">
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">Glendale Unified School District</div>
                <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">Glendale, California</div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold mb-5">Personal Services Agreement</div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">Retirement Status Statement</div>
              </div>
              <div className="mb-5">
                Are you a State Teachers Retirement System (STRS) retiree?
                <br />
                <Checkbox inputId="cb1" onChange={e => setChecked(true)} checked={props.strs} disabled></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label ml-2 mt-3">
                  Yes
                </label>
                <Checkbox
                  inputId="cb2"
                  className="ml-4"
                  onChange={e => setChecked(false)}
                  // checked={props.strs !== undefined && props.strs !== null && props.strs}
                  checked={props.strs === false ? !props.strs : ""}
                  disabled
                ></Checkbox>
                <label htmlFor="cb2" className="p-checkbox-label ml-2 mt-3">
                  No
                </label>
              </div>
              <div className="mb-5">
                Are you a California Public Employees Retirement System (CalPERS) retiree?
                <br />
                <Checkbox inputId="cb1" onChange={e => setChecked(true)} checked={props.calpers} disabled></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label ml-2 mt-3">
                  Yes
                </label>
                <Checkbox
                  inputId="cb2"
                  className="ml-4"
                  onChange={e => setChecked(false)}
                  // checked={props.calpers !== undefined && props.calpers !== null && props.calpers}
                  checked={props.calpers === false ? !props.calpers : ""}
                  disabled
                ></Checkbox>
                <label htmlFor="cb2" className="p-checkbox-label ml-2 mt-3">
                  No
                </label>
              </div>

              <div className="mb-28 print:mb-[10px]">
                Note: The District will be reporting your earnings or hours to the appropriate retirement system. You
                are responsible for monitoring your work hours or earnings to make sure you do not exceed your
                retirement limit.
              </div>
              <div className="flex gap-20 mt-8">
                <div className="space-y-4">
                  <div>
                    Approved By:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] gap-2  border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.partyName && props?.partyName}{" "}
                    </b>
                  </div>
                  <div>
                  </div>
                  <div>
                    Date:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.dateOfApprove ? moment(props?.dateOfApprove, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                    </b>
                  </div>
                </div>
              </div>


              
              <div className="isMar8">
                <div className="text-center mt-[120px] print:mt-[120px]">
                  <div>
                    <b>Page 9 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="pf7" class="pf print:p-2  no-page-break pageA9" data-page-no="9">
            <div className="px-10 py-5 text-[#344054] text-[16px] xl:text-[0.833vw]">

            <div className="text-center mb-8">
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">Glendale Unified School District</div>
                <div className="text-[15px] xl:text-[0.781vw] font-semibold mb-5">Glendale, California</div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold mb-1">CERTIFICATION REGARDING</div>
                <div className="text-[24px] xl:text-[1.250vw] font-semibold">
                  <u> GOVERNOR EXECUTIVE ORDER N-6-22</u>
                </div>
              </div>

              <div className="mb-2">
                On March 4, 2022, California Governor Newsom issued Order N-6-22 requiring state agencies to take steps
                to ensure any agency and entity under contract with state agencies comply with the Federal Order:
              </div>
              <div className="mb-4">
                (<u>https://www.gov.ca.gov/wp-content/uploads/2022/03/3.4.22-Russia-Ukraine-Executive-Order.pdf;</u>{" "}
                "State Order").
              </div>
              <div className="mb-2">
                if you enter into a contract with the District, you must comply with the economic sanctions imposed in
                response to Russia's actions in Ukraine, including the orders and sanctions identified on the U.S.
                Department of the Treasury website:
              </div>
              <div className="text-center mb-4">
                (
                <u>
                  https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/ukraine-russia-related-sanctions).
                </u>
              </div>
              <div className="mb-4">
                As part of this procurement, <b>if the contract value of this procurement is $5 million or more,</b>{" "}
                please include in your Response the following:
              </div>
              <div className="space-y-2 px-8">
                <div>
                  (1) a statement that you are in compliance with the required economic sanctions of the Federal and
                  State Orders;
                </div>
                <div>
                  (2) the steps you have taken in response to Russia's actions in Ukraine, including, but not limited
                  to, desisting from making new investments in, or engaging in financial transactions with, Russian
                  entities, not transferring technology to Russia or Russian entities, and directly providing support to
                  the government and people of Ukraine.
                </div>
              </div>
              <div className="flex gap-20 mt-8">
                <div className="space-y-4">
                  {/*  <div> <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">{props?.partyName && props?.partyName } </b></div> */}
                  <div>
                    Approved By:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw] gap-2  border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.partyName && props?.partyName}{" "}
                    </b>
                  </div>
                  {/* <div>Signature:</div> */}
                  <div>
                    {/* <b className="text-[green] font-bold ml-2 w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                  </b> */}
                  </div>
                  <div>
                    Date:
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]" style={{padding:"5px"}}>
                      {props?.dateOfApprove ? moment(props?.dateOfApprove, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
                    </b>
                    {/* { props.approvelStatusData ?
                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">
                    {props?.updatedAt ? moment(props?.updatedAt, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}</b> :

                    <b className="text-[green] font-bold ml-2 w-[15.625vw] gap-2 print:w-[20.625vw]   border-b border-[#545454]">-</b>

                    } */}
                  </div>
                </div>
              </div>
              {props.approvelStatusData ? (
                <div className="float-right mb-[20px] xl:mb-[0px]">
                  <span className="float-right mr-3 font">{"Approved and Rejected by :"}</span>
                  <br />
                  {props.approvelStatusData &&
                    props.approvelStatusData.map((data, index) => {
                      return (
                        <>
                          {/* {data.status === "Approved" ?
                                  <span className='float-right mr-3 font'>{data.teacherName ? data.teacherName : null} 
                                  {data.updatedAT ? moment(data.updatedAT, 'YYYY-MM-DD HH:mm:ss').format("MM/DD/YYYY, hh:mm A"): null}
                                  </span>
                                  <br/>
                                : 
                                null} */}

                          {/* it shows all status */}
                          {data.isApproved || data.status == "Rejected" ? (
                            <span className="font">
                              {data.name ? data.name : null}
                              &nbsp;{data.updatedAt}&nbsp;{data.status}
                              <br />
                            </span>
                          ) : null}
                          {/* {data.isApproved ?
                                  <span className='font'>{data.name ? data.name : null} 
                                  &nbsp;{(data.updatedAt)}
                                    <br/>
                                  </span>
                                    : null } */}
                        </>
                      );
                    })}
                </div>
              ) : null}
              <div className="isMar2" style={{ position: "absolute", bottom: "0px", left: "50%",width: "100%" }}>
                <div className="">
                  <div>
                    <b>Page 10 of 10</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-indicator"></div>
      </div>
      {/* <button onClick={generatePDF} type="button">Export PDF</button> */}

      {/* <div className="text-center"><button onClick={() => handlePrint()}>Print</button></div> */}
      {/* <div className="bg-white  blue rp-3 border  col-span-3 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                <span className="mr-3 "></span><span className='printicon "' onClick={handlePrint} >Print</span>
            </div> */}
    </>
  );
});

export default PsaPdf2;
