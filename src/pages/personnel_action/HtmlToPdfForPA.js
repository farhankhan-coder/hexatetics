import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

const HtmlToPdf = props => {

  let componentRef = useRef();
  const [display, setDisplay] = useState(false);
  let handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setDisplay(false)
  });
  let EmployeeArray = props?.data?.EmployeeArray || [];
  const nameTemplate = (fieldName) => (rowData) => (
    <div>
      {rowData[fieldName]?.reduce((elements, name, index) => {
        if (index > 0) {
          elements.push(<br key={index} />);
        }
        elements.push(name);
        return elements;
      }, [])}
    </div>
  );


  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Name</span>}
                style={{ minWidth: "4rem", color: "green" }} rowSpan={2} />
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Position</span>}
                style={{ Width: "12rem", color: "green" }} className="PositionHeaderAlign" colSpan={2} />
        <Column style={{ minWidth: "5rem", color: "green" }}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Effective Date</span>} rowSpan={2} />
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Salary Rate or Reason</span>}
                style={{ minWidth: "3rem", color: "green" }} rowSpan={2} />
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Not to Exceed</span>}
                style={{ minWidth: "3rem", color: "green" }} rowSpan={2} />
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Funding Source(s) and Account Number(s)</span>}
                style={{ minWidth: "3rem", color: "green" }} rowSpan={2} />
      </Row>
      <Row>
        <Column field="positionTo" colSpan={1} header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>To</span>}
              style={{  Width: "6rem", color: "green" }}  className="PositionHeaderAlign" />
        <Column field="positionFrom" colSpan={1} header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>From</span>}
              style={{ Width: "6rem", color: "green" }} className="PositionHeaderAlign" />
      </Row>
    </ColumnGroup>
  );
  const budgetTemplate = (rowData,fieldName) => (
    <div>
      {rowData[fieldName]?.reduce((elements, name, index) => {
        if (index > 0) {
          elements.push(<br key={index} />);
        }
        elements.push(name);
        return elements;
      }, [])}
    </div>
  );
  const headerGroupPrint = (
    <ColumnGroup>
      <Row>
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Name</span>}
                style={{ minWidth: "12rem", color: "green" }} rowSpan={2} />
        <Column header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Position</span>}
                style={{ minWidth: "20rem", color: "green" }} colSpan={2}  className="PositionHeaderAlign" />
        <Column style={{ minWidth: "12rem", color: "green" }}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Effective Date, Salary Rate of Reason,<br/>Not To Exceed..., Funding Source <br/>And Account Number</span>} rowSpan={2} />
        
      </Row>
      <Row>
        <Column field="positionTo" colSpan={1} header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>To</span>}
              style={{ minWidth: "10rem", color: "green" }} className="PositionHeaderAlign" />
        <Column field="positionFrom" colSpan={1} header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>From</span>}
              style={{ minWidth: "10rem", color: "green" }} className="PositionHeaderAlign" />
      </Row>
    </ColumnGroup>
  );
  const detailsColumn=(rowData)=>{

    return <span>{moment(rowData.startEndDate).format("MM/DD/yyyy") ||moment(rowData.effectiveDatesFrom).format("MM/DD/yyyy")  || ""} through {moment(rowData.endDate).format("MM/DD/yyyy") ||moment(rowData.effectiveDatesTo).format("MM/DD/yyyy")|| ""}<br/>
    {rowData.salaryRate||"-"} <br/>
    {rowData.rateofPay||"-"} <br/>
    <br/>
    <br/>
    {budgetTemplate(rowData,'budgetCode')}</span>
  }
  return (
    <>
      <div ref={componentRef}>
        <div id="my-html-template" className="border px-8">
          <center className="relative">
            <b>CERTIFICATE</b>{" "}
            {props.data?.formName ? <span className="absolute right-0">{props.data?.formName}</span> : null}{" "}
          </center>
          <center style={{ marginTop: "10px" }}>
            GLENDALE UNIFIED SCHOOL DISTRICT
            <div>Certificated Personnel Office</div>
            <div style={{ marginTop: "20px" }}>
              <b>REQUEST FOR APPROVAL - BOARD REPORT PERSONNEL ACTION</b>
            </div>
          </center>
          {/* <div className=""> */}
          <center className="mt-4 border-4 p-4">
            NOTES: This form must be received by Human Resources with all approvals completed before 5:00 p.m. on Monday, the week prior to the Board meeting, in order to be included in the next Board Report.
          </center>
          {/* </div> */}
          <div>
            {/* ---------------------------------------------------------------------------------------------------------------- */}

            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div className="flex pdfcolumns">
                <div class="label">Location</div>
                <div class="pdfcolumnValue">{props.data?.location}</div>
              </div>
              <div className="flex pdfcolumns">
                <div class="label">Board Meeting Date</div>
                <div class="pdfcolumnValue">{moment(props.data?.boardMeetingDate).format("MM/DD/yyyy")}</div>
              </div>
            </div>
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div className="flex pdfcolumns">
                <div class="label">Action To Be Taken</div>
                <div class="pdfcolumnValue">{props.data?.actiontobetaken}</div>
              </div>
              {
                props.data?.actiontobetaken == "Election of Corrections to Personnel Actions" ?
                  <div className="flex pdfcolumns">
                    <div class="label">Date</div>
                    <div class="pdfcolumnValue">{moment(props.data?.actionDate).format("MM/DD/yyyy")}</div>
                  </div> : <div className="flex pdfcolumns">
                    <div class="label">Personnel Report No</div>
                    <div class="pdfcolumnValue">{props.data?.personalNo}</div>
                  </div>
              }
            </div>
            {
              props.data?.actiontobetaken == "Election of Corrections to Personnel Actions" ?
              <>
                <div className="flex" style={{ justifyContent: "space-between" }}>
                  <div className="flex pdfcolumns">
                    <div class="label">page</div>
                    <div class="pdfcolumnValue">{props.data?.actionPage}</div>
                  </div>
                  <div className="flex pdfcolumns">
                    <div class="label">Item No.</div>
                    <div class="pdfcolumnValue">{props.data?.actionItem}</div>
                  </div>
                </div>
                <div className="flex pdfcolumns">
                <div class="label">Type</div>
                <div class="pdfcolumnValue">{props.data?.empType}</div>
              </div></> :
                <div className="flex pdfcolumns">
                  <div class="label">Type</div>
                  <div class="pdfcolumnValue">{props.data?.empType}</div>
                </div>
            }
          </div>
          <div className="card pdfcolumns" style={{ display: display ? 'none' : 'block' }}>
            <DataTable
              scrollable
              showGridlines
              size="Small"
              className="custpaginator custIcons custmBtnTable custTable"
              value={EmployeeArray}
              headerColumnGroup={headerGroup}
            >
              {/* <Column
                field={EmployeeArray?.[0]?.employeeId != undefined ? "employeeId" : EmployeeArray?.[0]?.employee_Id != undefined ? "employee_Id" : "employeeId"}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Id</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column> */}
              <Column
                field="employeeName"
                body={nameTemplate('employeeName')}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Name</span>}
                style={{ minWidth: "12rem", color: "green" }}
              ></Column>
              {/* <Column
                body={rowData => `${rowData.positionTo || rowData.positionTitleTo || ""} - ${rowData.positionFrom || rowData.positionTitleFrom || ""}`}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Position<br/>To - From</span>}
                style={{ minWidth: "4rem", color: "green" }}
              ></Column> */}
             <Column 
              // field="positionTitleTo" 
              body={rowData => rowData.positionTo || rowData.positionTitleTo || ""}
              header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>To</span>}
              style={{ width: "15rem", color: "green" }}></Column>
              
              <Column 
              // field="positionFrom"
              body={rowData => rowData.positionFrom || rowData.positionTitleFrom || ""} 
               header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>From</span>}
               style={{ width: "15rem", color: "green" }}></Column>
               
              <Column
                body={rowData => `${moment(rowData.startEndDate).format("MM/DD/yyyy") ||moment(rowData.effectiveDatesFrom).format("MM/DD/yyyy") } - ${moment(rowData.endDate).format("MM/DD/yyyy") ||moment(rowData.effectiveDatesTo).format("MM/DD/yyyy")}`}
                style={{ minWidth: "5rem", color: "green" }}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Effective Date</span>}
              ></Column>
              <Column
                field="salaryRate"
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Salary Rate or Reason</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column>
              <Column
                field="rateofPay"
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Not to Exceed</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column>
              {/* <Column
                field="reason"
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Reason</span>}
                style={{ minWidth: "10rem", color: "green" }}
              ></Column>
              <Column
                field="fundingSource"
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Funding Source</span>}
                style={{ minWidth: "4rem", color: "green" }}
              ></Column>
              <Column
                field="accountNo"
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Account No</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column> */}
              <Column
                field="budgetCode"
                body={nameTemplate('budgetCode')}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Funding Source(s) and Account Number(s)</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column>
            </DataTable>
          </div>
          {/* for print */}
          <div className="card pdfcolumns" style={{ display: display ? 'block' : 'none' }}>
            <DataTable
              scrollable
              showGridlines
              size="Small"
              className="custpaginator custIcons custmBtnTable custTable"
              value={EmployeeArray}
              headerColumnGroup={headerGroupPrint}
            >
              {/* <Column
                field={EmployeeArray?.[0]?.employeeId != undefined ? "employeeId" : EmployeeArray?.[0]?.employee_Id != undefined ? "employee_Id" : "employeeId"}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Id</span>}
                style={{ minWidth: "3rem", color: "green" }}
              ></Column> */}
              <Column
                field="employeeName"
                body={nameTemplate('employeeName')}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Employee Name</span>}
                style={{ maxWidth: "7rem", color: "green" }}
              ></Column>
              {/* <Column
                body={rowData => `${rowData.positionTo || rowData.positionTitleTo || ""} - ${rowData.positionFrom || rowData.positionTitleFrom || ""}`}
                header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Position<br/>To - From</span>}
                style={{ minWidth: "4rem", color: "green" }}
              ></Column> */}
              <Column 
              // field="positionTitleTo" 
              body={rowData => rowData.positionTo || rowData.positionTitleTo || ""}
              header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>To</span>}
              style={{ maxWidth: "7rem", color: "green" }}></Column>
              
              <Column 
              // field="positionFrom"
              body={rowData => rowData.positionFrom || rowData.positionTitleFrom || ""} 
               header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>From</span>}
               style={{ maxWidth: "15rem", color: "green" }}></Column>

              <Column 
               body={detailsColumn} 
               header={<span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>Effective Date, Salary Rate of Reason,<br/>Not To Exceed..., Funding Source <br/>And Account Number</span>}
               style={{ minWidth: "4rem", color: "green" }}></Column>
              
            </DataTable>
          </div>
        </div>
      </div>
      <button
        className="w-[100%] bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center"
        onClick={() => {
          setDisplay(true);
          setTimeout(() => {
            handlePrint();
          },1000);
        }}
      >
        Print
      </button>
    </>
  );
  // }
};

export default HtmlToPdf;
