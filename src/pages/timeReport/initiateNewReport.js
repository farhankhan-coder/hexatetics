import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import Link from "next/link";
import Layout from "@/components/layout/layout";
import DropdownComponent from "@/components/common/dropdownComponent/dropdownComponent";
import CalenderComponet from "@/components/common/calenderComponent/calenderComponent";
import InputComponent from "@/components/common/inputComponent/inputComponent";
import WarEmployeepopup from "@/components/common/warEmployeepopup";
// import Layout from "../../Component/nav/initiator/nav.component";
// import DropdownComponent from "../../Component/common/DropdownComponent";
// import InputComponent from "../../Component/common/InputComponent/InputComponent";
// import CalenderComponet from "../../Component/common/CalenderComponet";

export default function TimeIinitatorReport() {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const departments = [
    { name: "planning dev. & facilities", code: "NY" },
    { name: "Balboa elem", code: "RM" },
    { name: "Binns elementery school", code: "LDN" },
    { name: "Business & financial services", code: "IST" },
    { name: "Business operations", code: "PRS" },
  ];
  const type = [
    { name: "Certificated", code: "NY" },
    { name: "Classified", code: "RM" },
  ];

  //School department name
  const [selectedSchoolDeptname, setSelectedSchoolDeptName] = useState(null);
  const SchoolDeptNameDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const SchoolDeptNameEvent = {
    onChange: (e) => {
      setSelectedSchoolDeptName(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedSchoolDeptname,
  };

  //Type dropdown
  const [selectedType, setSelectedType] = useState(null);
  const TypeDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const TypeEvent = {
    onChange: (e) => {
      setSelectedType(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedType,
  };

  //Rate Type dropdown
  const [selectedRateType, setSelectedRateType] = useState(null);
  const RateTypeDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const RateTypeEvent = {
    onChange: (e) => {
      setSelectedRateType(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedRateType,
  };
  //First Approval dropdown
  const [selectedFirstApproval, setSelectedFirstApproval] = useState(null);
  const FirstApprovalDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const FirstApprovalEvent = {
    onChange: (e) => {
      setSelectedFirstApproval(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedFirstApproval,
  };

  //First Approval dropdown
  const [selectedSecondApproval, setSelectedSecondApproval] = useState(null);
  const SecondApprovalDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const SecondApprovalEvent = {
    onChange: (e) => {
      setSelectedSecondApproval(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedSecondApproval,
  };

  //Payroll dropdown
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const PayrollDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const PayrollEvent = {
    onChange: (e) => {
      setSelectedPayroll(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedPayroll,
  };

  //Employee Name dropdown
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const EmployeeDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const EmployeeEvent = {
    onChange: (e) => {
      setSelectedEmployee(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedEmployee,
  };

  //Account input filed
  const [selectAccount, setSelectAccount] = useState("");
  const AccountInput = {
    placeHolders: "Account",
    values: selectAccount,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const AccountEvent = {
    handelChange: (e) => {
      setSelectAccount(e.target.value);
    },
  };

  //Daily rate input filed
  const [selectDailyRate, setSelectDailyRate] = useState("");
  const DailyRateInput = {
    placeHolders: "Account",
    values: selectDailyRate,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const DailyRateEvent = {
    handelChange: (e) => {
      setSelectDailyRate(e.target.value);
    },
  };

  //Page No input filed
  const [selectPageNo, setSelectPageNo] = useState("");
  const PageNoInput = {
    placeHolders: "Account",
    values: selectPageNo,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const PageNoEvent = {
    handelChange: (e) => {
      setSelectPageNo(e.target.value);
    },
  };

  const calenderConfig1 = {
    value: "calenderStart",
    placeholder: "End Date",
    className: "w-full h-11",
    dateFormat: "dd/mm/yy",
  };
  const eventHandlersofCalender = {
    calenderchangeHandler: (e) => {
      setDate(e.value);
      console.log("Selected Value:", e.value);
    },
  };

  const employeeList = [
    // Define your employee list here
  ];

  const tableData = [
    { code: "John Doe", quantity: 40 },
    { code: "Jane Smith", quantity: 35 },
    // Add more data as needed
  ];

  const superAdminActions = (row) => {
    return [
      <>
        <Link
          href="#"
          className="py-2 px-2.5"
          //   onClick={() => {
          //     setVisible(true);
          //   }}
        >
          <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
        </Link>
        <Link href={`#`} className="py-2 px-2.5">
          <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
        </Link>
      </>,
    ];
  };
  const handlePageNoChange = (e) => {
    // setPageNo(e.target.value);
  };

  const handleDropdownChange = (selectedValue) => {
    // Handle dropdown value change
    // Add your logic here
  };

  const handleSubmit = () => {
    // Handle form submission
    // Add your logic here
  };
  const [account, setAccount] = useState("");

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  return (
    <>
      <Layout>
        <div className=" pt-24 md:pt-28 xl:pt-[2.083vw]">
          <div className="">
            <div className="text-[#113699] font-semibold -tracking-[0.02em] text-xl xl:text-[1.042vw]">
              <h3>Initiate New Report</h3>
            </div>
          </div>
          <div className="mt-5 xl:mt-[1.250vw]">
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-[0.833vw] px-[10px] xl:px-[0.521vw] cust-select">
              <div className="col w-full">
                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                  Name of School or Department{" "}
                  <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={SchoolDeptNameDropdown}
                    eventHandlers={SchoolDeptNameEvent}
                  />
                </div>
              </div>
              <div className="col w-full">
                <div className="">
                  <label
                    htmlFor="username"
                    className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                  >
                    Period <span className="text-[red] pl-0.2">*</span>
                  </label>{" "}
                </div>
                <div className="w-full">
                  <div className="relative custp-calender">
                    <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                    <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                    <div className="card justify-content-center">
                      <div>
                        <CalenderComponet
                          attribute={calenderConfig1}
                          eventHandlersofCalender={eventHandlersofCalender}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Type <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={TypeDropdown}
                    eventHandlers={TypeEvent}
                  />
                </div>
              </div>
              {/* <div className="col w-full">
                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                  Account<span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <InputComponent
                    datas={AccountInput}
                    inputEventHandler={AccountEvent}
                  ></InputComponent>
                </div>
              </div> */}
              <div className="w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Account # <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <InputText
                    id="employee"
                    value={account}
                    // disabled={isEmpDisable}
                    // onChange={(e) => { setAccount(e.target.value); }}
                    placeholder="Account"
                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                    style={{
                      fontSize: "0.875rem",
                      color: "#667085",
                      fontWeight: "400",
                    }}
                  />
                </div>
              </div>

              <div className="col w-full">
                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                  Rate Type<span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={RateTypeDropdown}
                    eventHandlers={RateTypeEvent}
                  />
                </div>
              </div>
              {/* <div className="col w-full">
                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                  Daily Rate<span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <InputComponent
                    datas={DailyRateInput}
                    inputEventHandler={DailyRateEvent}
                  ></InputComponent>
                </div>
              </div> */}
              <div className="w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Daily Rate <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <InputText
                    id="employee"
                    // value={"dailyRate"}
                    // disabled={"isEmpDisable"}
                    // onChange={(e) => { setDailyRate(e.target.value); }}
                    placeholder="Daily Rate"
                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                    style={{
                      fontSize: "0.875rem",
                      color: "#667085",
                      fontWeight: "400",
                    }}
                  />
                </div>
              </div>
              <div className="col w-full">
                <div className="">
                  <label
                    htmlFor="username"
                    className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                  >
                    Authorizing Board Report Date *{" "}
                    <span className="text-[red] pl-0.2">*</span>
                  </label>{" "}
                </div>
                <div className="w-full">
                  <div className="relative custp-calender">
                    <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                    <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                    <div className="card justify-content-center">
                      <div>
                        <CalenderComponet
                          attribute={calenderConfig1}
                          eventHandlersofCalender={eventHandlersofCalender}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col w-full">
                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                  Page No #<span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <InputComponent
                    datas={PageNoInput}
                    inputEventHandler={PageNoEvent}
                  ></InputComponent>
                </div>
              </div> */}
              <div className="w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Page No # <span className="text-[red] pl-0.2">*</span>{" "}
                </label>
                <div className="relative">
                  <InputText
                    id="employee"
                    value={handlePageNoChange}
                    // disabled={isEmpDisable}
                    // onChange={(e) => { setPageNo(e.target.value); }}
                    placeholder="Page No."
                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                    style={{
                      fontSize: "0.875rem",
                      color: "#667085",
                      fontWeight: "400",
                    }}
                  />
                </div>
              </div>
              <div className="col w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  First Approval <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={FirstApprovalDropdown}
                    eventHandlers={FirstApprovalEvent}
                  />
                </div>
              </div>
              <div className="col w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Second Approval <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={SecondApprovalDropdown}
                    eventHandlers={SecondApprovalEvent}
                  />
                </div>
              </div>
              <div className="col w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Payroll <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative">
                  <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                  <DropdownComponent
                    attribute={PayrollDropdown}
                    eventHandlers={PayrollEvent}
                  />
                </div>
              </div>
              <div className="col w-full"></div>
              {/* <div className="col w-full">
                                <label htmlFor="employee" className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">Name of the Employee <span className='text-[red] pl-0.2'>*</span></label>
                                <div className="relative">
                                    <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                                    <DropdownComponent
                                        attribute={EmployeeDropdown}
                                        eventHandlers={EmployeeEvent}
                                    />
                                </div>
                            </div> */}
              <div className="w-full">
                <label
                  htmlFor="employee"
                  className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                >
                  Name of the Employee{" "}
                  <span className="text-[red] pl-0.2">*</span>
                </label>
                <div className="relative flex">
                  <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                    <i className="gusd-employee text-[#667085] text-sm"></i>
                  </div>
                  <Dropdown
                    id="employee"
                    value={selectedEmployee}
                    options={employeeList}
                    filter
                    optionLabel="name"
                    onChange={(e) => {
                      setSelectedEmployee(e.value);
                    }}
                    placeholder="Select"
                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                    style={{
                      fontSize: "0.875rem",
                      color: "#667085",
                      fontWeight: "400",
                    }}
                  />
                  <div
                    onClick={(e) => setOpenNewEmployee(true)}
                    className="cursor-pointer text-[30px] col-span-2 "
                  >
                    {/* <i className='gusd-pluse-circle' style = {{color: "lightgray",fontSize: "20px", margin: "3px",position:"relative", bottom:"6px"}}></i> */}
                    <Tooltip
                      target=".icon-tooltip"
                      content="Add Employee"
                      position="top"
                      className="custom-tooltip-content"
                    />
                    <i
                      className="icon-tooltip gusd-pluse-circle"
                      style={{
                        color: "lightgray",
                        fontSize: "20px",
                        margin: "3px",
                        position: "relative",
                        bottom: "6px",
                      }}
                    ></i>
                  </div>
                </div>
              </div>
              <WarEmployeepopup
                visible={openNewEmployee}
                onHide={() => {
                  setOpenNewEmployee(false);
                }}
              />
            </div>
            <div className="mt-5 xl:mt-[1.094vw]  ">
              <div className="grid lg:grid-cols-12 md:grid-cols-1 gap-5 xl:gap-[1.250vw]">
                <div className="col-span-8 xl:col-span-8 2xl:col-span-8 lg:col-span-8">
                  <div className="box-shadow-1 bg-white">
                    <div className="flex justify-between items-center p-4 xl:p-[0.833vw]">
                      <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                        <p>Select Period</p>
                      </div>
                      <div className="">
                        <Button
                          href={"/"}
                          style={{
                            background: "#ffffff00",
                            border: "0",
                            padding: "0",
                            width: "24px",
                            height: "24px",
                          }}
                        >
                          <i className="gusd-expand text-base text-[#101828]"></i>
                        </Button>
                      </div>
                    </div>
                    <div className="grid custmCalendar p-4 xl:p-[0.833vw]">
                      <Calendar
                        minDate={new Date("YYYY,M,DD")}
                        maxDate={new Date("YYYY,M,DD")}
                        inline
                        selectionMode="multiple"
                      />
                    </div>
                  </div>
                  {/* <div className="mt-6 xl:mt-[1.250vw]">
                                        <div className="bg-white box-shadow-1">
                                            <div className="p-4 xl:p-[0.833vw] pb-0">
                                                <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                                                    <p>Preview</p></div></div>
                                            <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable">
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="mt-6 xl:mt-[1.250vw]">
                    <div className="bg-white box-shadow-1">
                      <div className="p-4 xl:p-[0.833vw] pb-0">
                        <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                          <p>Preview</p>
                        </div>
                      </div>
                      <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable Tr-popupTable initiatorperiodtable">
                        <DataTable
                          tableStyle={{ width: "100%" }}
                          value={tableData}
                          scrollable
                          className="custpaginator custIcons custmBtnTable custTable"
                        >
                          <Column
                            field="code"
                            header="Name of Employee"
                          ></Column>
                          <Column
                            field="quantity"
                            header="Total Hours"
                            sortable 
                          ></Column>
                          <Column
                            field="action"
                            header="Actions"
                            align="center"
                            body={superAdminActions}
                            style={{ minWidth: "12rem" }}
                            exportable={false}
                          ></Column>
                        </DataTable>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-[1.250vw] mb-[2.250vw]">
                    <Link href="/timeReport">
                      <div className="text-[#344054] text-xs xl:text-[0.938vw] font-medium bg-white inline-block border border-[#D0D5DD] rounded xl:rounded-lg py-[0.833vw] px-[2.917vw] box-shadow-2">
                      <i className="mr-1 gusd-arrow-line-right"></i> Back
                      </div>
                    </Link>
                    
                    <div className="pt-2 flex pb-[-2px] justify-center gap-2">
                    <button
                     className="font-medium inline-block text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] text-[#FFF]"><i className="mr-1 gusd-eye"></i>
                     Preview</button>
                      <Link
                        href="#"
                        className="inline-block text-[#2D5BE5] text-xs xl:text-[0.938vw] font-medium border border-[#D0D5DD] bg-[#EFF8FF] rounded xl:rounded-lg py-[0.833vw] px-[2.448vw]"
                      >
                        <i
                          className="pi pi-save mr-1"
                          style={{ fontSize: "1rem" }}
                        ></i>
                        Save
                      </Link>
                      <Link
                        href="/timeReport"
                        className="font-medium inline-block text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#113699] hover:bg-[#0f296e] text-white border border-[#F2F4F7]"
                      ><i className="mr-1 gusd-check"></i>
                        {" "}
                        Submit
                      </Link>
                      {/* <Link href={''} onClick={() => setVisible(true)} className="custmBtn3 rounded-lg text-[#FFFFFF] text-center bg-[#113699]"
                                            >Submit
                                            </Link> */}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 xl:col-span-4 2xl:col-span-4 lg:col-span-4">
                  <div className="bg-white box-shadow-1 p-4 rounded-lg xl:p-[0.833vw]">
                    <div className="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                      <p>Selected Dates</p>
                    </div>
                    <div className="mt-[24px] xl:mt-[1.250vw]">
                      <div className="text-[#344054] font-normal text-xs xl:text-[0.625vw] flex flex-wrap items-center justify-between lg:flex-nowrap">
                        <p className="w-full lg:w-[7.813vw] text-[11px] font-bold">
                          9 August 2023
                        </p>
                        <span className="w-full h-[1px] bg-[#E4E7EC] inline-block"></span>
                      </div>
                      <div className="mt-[16px] xl:mt-[0.833vw]">
                        <div className="bg-[#F2F4F7] rounded p-2 xl:p-[0.417vw] custseledate">
                          <div className="p-[8px] flex gap-5 mt-[5px] xl:mt-[0.380vw] xl:p-[0.417vw]">
                            <div className="flex flex-wrap gap-3">
                              <div className="">
                                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                                  Hours
                                </label>
                                <div className="flex">
                                  <div className="relative custinput-h">
                                    <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC]">
                                      <p>H</p>
                                    </div>
                                    <span className="p-inputnumber p-component p-inputwrapper p-inputwrapper-filled bg-[#ffffff00] h-[1.35rem]">
                                      <InputText
                                        role="spinbutton"
                                        className="p-inputtext p-component p-filled p-inputnumber-input"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <div className="">
                                <label className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]">
                                  Minutes
                                </label>
                                <div className="flex">
                                  <div className="relative custinput-h">
                                    <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC]">
                                      <p>M</p>
                                    </div>
                                    <span className="p-inputnumber p-component p-inputwrapper bg-[#ffffff00] h-[1.35rem]">
                                      <InputText
                                        role="spinbutton"
                                        className="p-inputtext p-component p-filled p-inputnumber-input"
                                        type="text"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-white box-shadow-1 p-4 mt-6 rounded-lg xl:p-[0.833vw] xl:mt-[1.250vw]">
                    <div className="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                      <p>Absence Codes - Legends</p>
                    </div>
                    <div className="flex flex-wrap xl:flex-nowrap gap-4 mt-5 xl:gap-[0.938vw] xl:mt-[1.250vw]">
                      <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                        <p>
                          <span className="font-normal"></span>
                        </p>
                      </div>
                      <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                        <p>
                          {" "}
                          <span className="font-normal"></span>
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">
                          <div className="text-[#344054] font-medium text-[14px] pb-3">Absence Codes - Legends</div>
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="text-[#344054] text-[12px]">
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">L -</div>
                                <div className="col-span-4 pl-1">Last Day Worked</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">NA -</div>
                                <div className="col-span-4 pl-1">Personal (Not Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">OU -</div>
                                <div className="col-span-4 pl-1">Other Unpaid</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">PA -</div>
                                <div className="col-span-4 pl-1">Personal (Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">WC -</div>
                                <div className="col-span-4 pl-1">Personal (Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">D -</div>
                                <div className="col-span-4 pl-1">District Approved</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">I -</div>
                                <div className="col-span-4 pl-1">Illness</div>
                              </div>
                            </div>
                            <div className="text-[#344054] text-[12px]">
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">L -</div>
                                <div className="col-span-4 pl-1">Last Day Worked</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">NA -</div>
                                <div className="col-span-4 pl-1">Personal (Not Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">OU -</div>
                                <div className="col-span-4 pl-1">Other Unpaid</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">PA -</div>
                                <div className="col-span-4 pl-1">Personal (Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">WC -</div>
                                <div className="col-span-4 pl-1">Personal (Approved)</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">D -</div>
                                <div className="col-span-4 pl-1">District Approved</div>
                              </div>
                              <div className="grid grid-cols-5 pb-0.5">
                                <div className="col-span-1 font-semibold text-right">I -</div>
                                <div className="col-span-4 pl-1">Illness</div>
                              </div>
                            </div>
                          </div>
                        </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dialogpoput flex justify-content-center ">
            <Dialog
              position="center"
              visible={visible}
              onHide={() => setVisible(false)}
              style={{ width: "30vw" }}
              className="dialogpoput dialogres submit_popup"
            >
              <div className="text-[#101828] text-lg py-2 pt-5 font-bold text-center">
                Submit Report
              </div>
              <div className="text-[#344054] text-xs pb-2 font-medium">
                Your report will be sent for review, you will be notified of
                updates.
              </div>

              <div className="pt-2 flex pb-[-2px] justify-center gap-2">
                <Link
                  href={""}
                  onClick={() => setVisible(false)}
                  className="custmBtn3 rounded-lg text-[black] text-center bg-[White]"
                >
                  {" "}
                  Cancel
                </Link>
                <Link
                  href={""}
                  onClick={() => setVisible(false)}
                  className="custmBtn3 rounded-lg text-[#FFFFFF] text-center bg-[#113699]"
                >
                  Send
                </Link>
              </div>
            </Dialog>
          </div>
        </div>
      </Layout>
    </>
  );
}
