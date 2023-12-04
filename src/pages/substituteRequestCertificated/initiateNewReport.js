import { useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Sidebar } from "primereact/sidebar";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
// import { Link } from "react-router-dom";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
// import sideBarRight from "../../assets/images/sidebarright.svg";
// import logoImg from "../../assets/images/logo.png";
// import Layout from "../../Component/nav/initiator/nav.component";
import Layout from "@/components/layout/layout";
import Link from "next/link";

import DropdownComponent from "@/components/common/dropdownComponent/dropdownComponent";
import CalenderComponet from "@/components/common/calenderComponent/calenderComponent";
import InputComponent from "@/components/common/inputComponent/inputComponent";
import EmployeePopup from "@/components/common/EmployeePopup";

export default function InitiateNewReports() {
  const [confirmInitiateNewReport, setConfirmInitiateNewReport] =
    useState(false);
  const [openNewEmployee, setOpenNewEmployee] = useState(false);

  const [popup, setPopup] = useState(false);
  const [initiate, setInitiateReport] = useState(false);
  const [date, setDate] = useState(null);
  const calenderConfig1 = {
    value: date,
    placeholder: "End Date",
    className: "w-full h-11",
    dateFormat: "dd/mm/yy",
    selectionMode: "single",
  };
  const eventHandlersofCalender = {
    calenderchangeHandler: (e) => {
      setDate(e.value);
      console.log("Selected Value:", e.value);
    },
  };

  //Dates needed
  const [NeededDate, setNeededDate] = useState(null);
  const DateNeededConfig = {
    value: date,
    placeholder: "End Date",
    className: "w-full h-11",
    dateFormat: "dd/mm/yy",
    selectionMode: "multiple",
  };
  const eventHandlersDateNeeded = {
    calenderchangeHandler: (e) => {
      setDate(e.value);
      console.log("Selected Value:", e.value);
    },
  };

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

  //Second Approval dropdown
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

  //Third Approval dropdown
  const [selectedThirdApproval, setSelectedThirdApproval] = useState(null);
  const ThirdApprovalDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const ThirdApprovalEvent = {
    onChange: (e) => {
      setSelectedThirdApproval(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedThirdApproval,
  };
  //Teacher Name dropdown
  const [selectedTeacherName, setSelectedTeacherName] = useState(null);
  const TeacherNameDropdown = {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const TeacherNameEvent = {
    onChange: (e) => {
      setSelectedTeacherName(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedTeacherName,
  };

  //Indicate Dropdown
  const [selectedIndicate, setSelectedIndicate] = useState(null);
  const IndicateDropdown = {
    options: [
      { label: "AM", value: "option1" },
      { label: "PM", value: "option2" },
      { label: "ALL", value: "option3" },
    ],
    placeholder: "Select",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const IndicateEvent = {
    onChange: (e) => {
      setSelectedIndicate(e.target.value);
      console.log("Selected Value:", e.value);
    },
    selectedValue: selectedIndicate,
  };

  //Indicate Dropdown
  const [selectedFundingAccount, setSelectedFundingAccount] = useState(null);
  const FundingAccountDropdown = {
    options: [
      { label: "option1", value: "option1" },
      { label: "option2", value: "option2" },
    ],
    placeholder: "Select Funding Account",
    className: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const FundingAccountEvent = {
    onChange: (e) => {
      setSelectedFundingAccount(e.target.value);
    },
    selectedValue: selectedFundingAccount,
  };

  // Grade or Subject input filed
  const [selectGradeorSubject, setSelectGradeorSubject] = useState("");
  const GradeorSubjectInput = {
    placeHolders: "Enter Grade or Subject",
    values: selectGradeorSubject,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const GradeorSubjectEvent = {
    handelChange: (e) => {
      setSelectGradeorSubject(e.target.value);
    },
  };
  // Notes input filed
  const [selectNotes, setSelectNotes] = useState("");
  const NotesInput = {
    placeHolders: "Enter Note",
    values: selectNotes,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const NotesEvent = {
    handelChange: (e) => {
      setSelectNotes(e.target.value);
    },
  };
  // Specify Purpose input filed
  const [selectSpecifyPurpose, setSelectSpecifyPurpose] = useState("");
  const SpecifyPurposeInput = {
    placeHolders: "Enter Purpose",
    values: selectSpecifyPurpose,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const SpecifyPurposeEvent = {
    handelChange: (e) => {
      setSelectSpecifyPurpose(e.target.value);
    },
  };

  // Program Account input filed
  const [selectProgramAccount, setSelectProgramAccount] = useState("");
  const ProgramAccountInput = {
    placeHolders: "Enter Account Number",
    values: selectProgramAccount,
    clasname:
      "w-full h-11 rounded-md border border-[#E4E7EC] pl-5 text-[0.875rem]",
  };
  const ProgramAccountEvent = {
    handelChange: (e) => {
      setSelectProgramAccount(e.target.value);
    },
  };

  // Program Account input filed
  const [selectPercentage, setSelectPercentage] = useState("");
  const PercentageInput = {
    placeHolders: "Type here",
    values: selectPercentage,
    clasname: "w-full h-11 rounded-md border border-[#E4E7EC] pl-5",
  };
  const PercentageEvent = {
    handelChange: (e) => {
      setSelectPercentage(e.target.value);
    },
  };

  return (
    <>
      <Layout pageTitle="Report" activeMenu="Initiator">
        <div className="">
          <div className="pt-24 md:pt-28 xl:pt-[2.083vw]">
            <div className="">
              <div className="text-[#113699] font-semibold -tracking-[0.02em] text-xl xl:text-[1.042vw]">
                <h3> Initiate Substitute Request certificated</h3>
              </div>

              <div className="border borer-[red] grid grid-cols-12 gap-4">
                <div className="col-span-4 px-4">
                  <div className="w-full">
                    <label
                      htmlFor="dept"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Assignment Title{" "}
                      <span className="text-[red] pl-0.2">*</span>
                    </label>
                    <div className="relative">
                      <div className="relative">
                        <InputText
                          id="employee"
                          // value={handlePageNoChange}
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
                  </div>

                  <div className="w-full">
                    <div className="">
                      <label
                        htmlFor="username"
                        className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                      >
                        School or Department{" "}
                      </label>{" "}
                    </div>
                    <div className="w-full">
                      <div className="relative custp-calender">
                        {/* </div> */}
                        <div className="relative">
                          <Dropdown
                            //  value={typeOfSubRequest}
                            //   onChange={(e) => {
                            //                                             setTypeOfSubRequest(e.value);

                            //                                         }}
                            optionLabel="name"
                            showClear
                            placeholder="Select here"
                            filter
                            // valueTemplate={selectedCountryTemplate}
                            className="w-full md:w-14rem h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="dept"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Submitted On <span className="text-[red] pl-0.2">*</span>
                    </label>
                    {/* <div className="relative">
                      <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                     
                      <div className="relative custp-calender">
                        <i
                          className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] 
                                                                                            mt-2.5 z-10"
                        ></i>
                      </div>

                        <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                        <div className="card flex justify-content-center">
                          <Calendar
                            // onChange={(e) => {
                            //     setFromDate(e.target.value)
                            //     setToDate('')
                            // }}
                            // value={fromDate}
                            placeholder="From"
                            className="w-full h-11"
                          />
                        </div>
                    </div> */}
                    <div className="relative custp-calender ">
                            {/* <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i> */}
                            <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                            <div className="card justify-content-center">
                              
                              <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                                <i
                                  className="gusd-calendar text-[#667085] text-sm "
                                ></i>
                                {/* <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i> */}
                              </div>
                                
                                <div className="card flex justify-content-center">
                                  <Calendar
                                    // onChange={(e) => {
                                    //     setFromDate(e.target.value)
                                    //     setToDate('')
                                    // }}
                                    // value={fromDate}
                                    placeholder="From"
                                    className="w-full h-10"
                                  />
                                </div>
                            </div>
                          </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="dept"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Site Admin/Dept. Head (First Approver)
                    </label>
                    {/* <div className="relative">
                      <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                      
                      <Dropdown
                        //  value={typeOfSubRequest}
                        //   onChange={(e) => {
                        //                                             setTypeOfSubRequest(e.value);

                        //                                         }}
                        optionLabel="name"
                        showClear
                        placeholder="Select here"
                        filter
                        // valueTemplate={selectedCountryTemplate}
                        className="w-full md:w-14rem h-11 pl-5"
                      />
                    </div> */}
                    <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Select Site Admin/Dept. Head "
                            className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="dept"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Budget Clerk (Second Approver)
                    </label>
                    {/* <div className="relative">
                      <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                      
                      <Dropdown
                        //  value={typeOfSubRequest}
                        //   onChange={(e) => {
                        //                                             setTypeOfSubRequest(e.value);

                        //                                         }}
                        optionLabel="name"
                        showClear
                        placeholder="Select here"
                        filter
                        // valueTemplate={selectedCountryTemplate}
                        className="w-full md:w-14rem h-11 pl-5"
                      />
                    </div> */}
                    <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Select Budget Clerk "
                            className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="dept"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Budget Manager/Director (Third Approver)
                    </label>
                    {/* <div className="relative">
                      <i className="gusd-employee text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                      
                      <Dropdown
                        //  value={typeOfSubRequest}
                        //   onChange={(e) => {
                        //setTypeOfSubRequest(e.value);

                        //      }}
                        optionLabel="name"
                        showClear
                        placeholder="Select here"
                        filter
                        // valueTemplate={selectedCountryTemplate}
                        className="w-full md:w-14rem h-11 pl-5"
                      />
                    </div> */}
                    <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Select Budget Manager/Director"
                            className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                  </div>
                </div>

                <div className="col-span-8">
                  <div className="mt-[13px] mr-[13px]">
                    <div className="border border-[orange]] lg:grid lg:grid-cols-3 md:block gap-4 p-4 mb-4 relative">
                      <div className="absolute top-2 right-5 text-[gray]"></div>

                      <div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Teacher(s) Name{" "}
                          <span className="text-[red] pl-0.2">*</span>
                        </label>
                        <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Select Teacher"
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
                      <EmployeePopup
                        visible={openNewEmployee}
                        onHide={() => {
                          setOpenNewEmployee(false);
                        }}
                      />
                      <div className="w-full">
                        <div className="">
                          <label
                            htmlFor="username"
                            className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                          >
                            Date(s) Needed{" "}
                            <span className="text-[red] pl-0.2">*</span>{" "}
                          </label>{" "}
                        </div>
                        <div className="w-full">
                          <div className="relative custp-calender ">
                            {/* <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i> */}
                            <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                            <div className="card justify-content-center">
                              
                              <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                                <i
                                  className="gusd-calendar text-[#667085] text-sm "
                                ></i>
                                {/* <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i> */}
                              </div>
                                
                                <div className="card flex justify-content-center">
                                  <Calendar
                                    // onChange={(e) => {
                                    //     setFromDate(e.target.value)
                                    //     setToDate('')
                                    // }}
                                    // value={fromDate}
                                    placeholder="From"
                                    className="w-full h-10"
                                  />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>

<div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Indicate If
                          <span className="text-[red] pl-0.2">*</span>
                        </label>
                        <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Indicate If"
                            className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Grade(Elem.) or Subject (Second.){" "}
                        </label>
                        <div className="relative">
                          <div className="relative">
                            <InputText
                              id="employee"
                              // value={handlePageNoChange}
                              // disabled={isEmpDisable}
                              // onChange={(e) => { setPageNo(e.target.value); }}
                              placeholder="Grade(Elem.) or Subject"
                              className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                              style={{
                                fontSize: "0.875rem",
                                color: "#667085",
                                fontWeight: "400",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full col-span-2">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Notes
                        </label>
                        <div className="relative">
                          <div className="relative">
                            <InputText
                              id="employee"
                              // value={handlePageNoChange}
                              // disabled={isEmpDisable}
                              // onChange={(e) => { setPageNo(e.target.value); }}
                              placeholder="Notes"
                              className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                              style={{
                                fontSize: "0.875rem",
                                color: "#667085",
                                fontWeight: "400",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 xl:gap-[0.990vw] items-center justify-end py-4">
                      <Link
                        href="#"
                        className="text-center text-white tableBtn bg-[#1E89EC] radius8"
                      >
                        <i className="gusd-pluse mx-1.5 "></i> Add More
                      </Link>
                    </div>
                  </div>

                  <div className="w-full col-span-3 py-4">
                    <label
                      htmlFor="employee"
                      className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                    >
                      Specify Purpose{" "}
                      <span className="text-[red] pl-0.2">*</span>
                    </label>
                    <div className="relative">
                      <InputText
                        id="employee"
                        // value={specifyPurposeValue}
                        // onChange={(e) => { setSpecifyPurposeValue(e.target.value); }}
                        placeholder="Enter Purpose"
                        className="w-[98%] h-11 rounded-md border border-[#E4E7EC] pl-5"
                        style={{
                          fontSize: "0.875rem",
                          color: "#667085",
                          fontWeight: "400",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mr-[15px]">
                    <div className="lg:grid lg:grid-cols-3 md:block border border-[orange]] gap-4 p-4 mb-4 relative">
                      
                        <div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Select Funding Account
                          <span className="text-[red] pl-0.2">*</span>
                        </label>
                        <div className="relative flex">
                          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                            <i className="gusd-employee text-[#667085] text-sm"></i>
                          </div>
                          <Dropdown
                            id="employee"
                            // value={"selectedEmployee"}
                            // options={"employeeList"}
                            filter
                            optionLabel="name"
                            // onChange={(e) => {
                            //   setSelectedEmployee(e.value);
                            // }}
                            placeholder="Select Funding Account"
                            className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                          
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Program Account No
                          <span className="text-[red] pl-0.2">*</span>
                        </label>
                        <div className="relative">
                          <InputText
                            id="employee"
                            // value={specifyPurposeValue}
                            // onChange={(e) => { setSpecifyPurposeValue(e.target.value); }}
                            placeholder="Enter Purpose"
                            className="w-[98%] h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="employee"
                          className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                        >
                          Percentage
                        </label>
                        <div className="relative">
                          <InputText
                            id="employee"
                            // value={specifyPurposeValue}
                            // onChange={(e) => { setSpecifyPurposeValue(e.target.value); }}
                            placeholder="Enter Purpose"
                            className="w-[98%] h-11 rounded-md border border-[#E4E7EC] pl-5"
                            style={{
                              fontSize: "0.875rem",
                              color: "#667085",
                              fontWeight: "400",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 xl:gap-[0.990vw] items-center justify-end py-4">
                      <Link
                        href="#"
                        className="text-center text-white tableBtn bg-[#1E89EC] radius8"
                      >
                        <i className="gusd-pluse mx-1.5 "></i> Add More
                      </Link>
                    </div>
                  </div>

                  
                  <div className="flex justify-between mr-[13px]">
                    <div className="py-4">
                      <Link
                        href="/substituteRequestCertificated"
                        className="border text-center tableBtn radius8 p-4"
                      >
                        {" "}
                        <i className="mr-1 gusd-arrow-line-right"></i>Previous
                      </Link>
                    </div>

                    <div className="flex gap-2 xl:gap-[0.990vw] items-center py-4">
                      <Link
                        href="#"
                        className="inline-block text-[#2D5BE5] text-xs xl:text-[0.938vw] font-medium  border border-[#D0D5DD] bg-[#EFF8FF] rounded xl:rounded-lg tableBtn"
                      >
                        <i
                          className="pi pi-save mr-1"
                          style={{ fontSize: "1rem" }}
                        ></i>
                        Save
                      </Link>
                      {/* <Link onClick={() => setPreviewShow(true)} className="border text-center tableBtn radius8 p-4"> Preview</Link> */}
                      <Link
                        href="#"
                        onClick={() => setPopup(true)}
                        className="border text-white text-center tableBtn prev radius8 p-3 font-medium border-[#D0D5DD] bg-[#3366FF] rounded-[8px] xl:rounded-[0.417vw] "
                      >
                        {" "}
                        <i className="gusd-eye mr-1"></i>Preview
                      </Link>
                      {/* className="inline-block text-white text-[16px] xl:text-[0.833vw]  tableBtn"> */}

                      <Link
                        href="#"
                        className="text-center text-white tableBtn blue radius8 p-4"
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Initiate New Report confirm Box */}
          <Dialog
            header="Submit Request"
            visible={confirmInitiateNewReport}
            style={{ width: "30vw" }}
            onHide={() => setConfirmInitiateNewReport(false)}
          >
            <p className="m-0 text-[#0487C8]">
              <i className="pi pi-check-circle mr-2"></i>
              <span className="font-medium text-[18px]">
                Your Request has been submitted for review,You will be notified
                of updates.
              </span>
            </p>
            <div className="text-center mt-4">
              <Link
                href="#"
                className="border border-[#1E1E1E] blue px-8 py-1 rounded"
              >
                Ok
              </Link>
            </div>
          </Dialog>

          {/* preview popup start */}
          
          <Dialog
            className="relative reports-popup"
            visible={popup}
            position="right"
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            onHide={() => {
              setPopup(false);
              //   setShowReport(false);
            }}
            draggable={false}
            resizable={false}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-1 lg:col-span-12 bg-[#F5F6F7] h-auto">
                <div className="p-5">
                  <div
                    onClick={() => {
                      setPopup(false);
                      //   setShowReport(false);
                    }}
                    className="py-3"
                  >
                    <Image
                      src={"/assets/images/sidebarright.svg"}
                      alt="user"
                      width="24"
                      height="24"
                    />
                  </div>

                  {/* {!showReport ? ( */}
                  <div>
                    <div className="text-[#113699] text-md lg:text-[0.833vw] font-bold">
                      Glendale Unified School District
                    </div>
                    <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">
                      Substitute Request Certificated
                    </div>

                    <div className="pt-3">
                      <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                        <div className="font-medium">School or Department </div>
                        <div className="font-semibold ">
                          {"selectedSchool?.name"}
                        </div>
                      </div>
                      <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                        <div className="font-medium">Date </div>
                        <div className="font-semibold ">
                          {/* {moment(initiateNewReportDate).format("MM/DD/YYYY")} */}
                          Date
                        </div>
                      </div>

                      <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                        <div className="font-medium">Status </div>
                        <Tag
                          severity=""
                          // value={
                          //   SUB_CERTIFICATED_STATUS.PENDING_FOR_APPROVAL_SITE_ADMIN
                          // }
                          className=""
                          style={{ background: "#EBFFF3", color: "#003D19" }}
                        ></Tag>
                      </div>
                    </div>
                    <Table className="certificatedPrintTable">
                      <TableHead>
                        <TableRow>
                          <TableCell>Teacher(s) Name</TableCell>
                          <TableCell>Date(s) Needed</TableCell>
                          <TableCell>Indicate If</TableCell>
                          <TableCell>
                            Grade(element) or Subject(second)
                          </TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <Fragment>
                          <TableRow>
                            <TableCell className="bg-[#F2F4F7]">
                              Jerom
                            </TableCell>
                            <TableCell className="w-[180px]">
                              <TableRow className="bg-[#F2F4F7]">
                                <TableCell>11/08/2023</TableCell>
                              </TableRow>
                            </TableCell>
                            <TableCell className="bg-[#F2F4F7]">Full</TableCell>
                            <TableCell className="bg-[#F2F4F7]">-</TableCell>
                            <TableCell className="bg-[#F2F4F7]">No</TableCell>
                          </TableRow>
                        </Fragment>
                      </TableBody>
                    </Table>

                    {/* <div className="pt-3">
                        <div className="flex flex-wrap items-center justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                          <div className="font-medium">Purpose</div>
                          <div className="font-semibold ">
                            {"specifyPurposeValue"}
                          </div>
                        </div>
                        <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                          <div className="font-medium">Funding Account</div>
                          {fundingAccounts.map((currentItem, index) => {
                            return (
                              <div key={index} className="border p-2">
                                <div className="flex items-center flex-wrap justify-between">
                                  <div className="font-light py-3">
                                    Department
                                  </div>
                                  <div className="font-semibold ">
                                    {currentItem.fundingAccount?.name}
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="font-light">Remarks</div>
                                  <div className="font-semibold ">
                                    {currentItem.remarks}
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="font-light">
                                    Program Account #
                                  </div>
                                  <div className="font-semibold ">
                                    {currentItem.programAccountNumber}
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="font-light">Percentage</div>
                                  <div className="font-semibold ">
                                    {currentItem.percentageValue}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div> */}
                    <div className="pt-3 mb-[4rem]">
                      <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                        <div className="font-medium">Purpose</div>
                        <div className="font-semibold "></div>
                      </div>
                      <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                        <div className="font-medium">Funding Account</div>

                        <div className="border p-2">
                          <div className="flex justify-between">
                            <div className="font-light py-3">Department</div>
                            <div className="font-semibold py-3">
                              Innovation,Instruction,Assesment & Accountability
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-light">Remarks</div>
                            <div className="font-semibold ">123</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-light">Program Account #</div>
                            <div className="font-semibold "></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ) : (
                    <div>
                      <div className="border m-4">
                        <div className="text-center py-8">
                          <Link to={""}>
                            <Image
                              src={logoImg}
                              width={"104"}
                              height={"105"}
                              imageClassName="m-auto"
                            />
                          </Link>
                          <div>
                            <div className="font-bold text-lg">
                              GLENDALE UNIFIED SCHOOL DISTRICT
                            </div>
                            <div className="font-semibold text-base">
                              Preparing our students for their future
                            </div>
                            <div className="font-light text-sm">
                              <div>
                                Office of the Chief Human Resources & Operations
                                Officer
                              </div>
                              <div>
                                223 North Jackson St. Glendale, California
                                91206-4380
                              </div>
                              <div>
                                Telephone:818-241-3111,Ext.1256 Fax:818-547-3207
                              </div>
                            </div>
                          </div>
                          <div className="my-4 font-bold text-xl">
                            Substitute Request - Certificated
                          </div>
                        </div>

                        <div className="pt-3 mx-8">
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">
                              School or Department{" "}
                            </div>
                            <div className="font-semibold ">
                              {selectedSchool?.name}
                            </div>
                          </div>
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Date </div>
                            <div className="font-semibold ">
                              {moment(initiateNewReportDate).format(
                                "MM/DD/YYYY"
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Status </div>
                            <Tag
                              severity=""
                              value={
                                SUB_CERTIFICATED_STATUS.PENDING_FOR_APPROVAL_SITE_ADMIN
                              }
                              className=""
                              style={{
                                background: "#EBFFF3",
                                color: "#003D19",
                              }}
                            ></Tag>
                          </div>
                        </div>

                        <div>
                          {teachers.length > 0 ? (
                            <Table className="certificatedPrintTable">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Teacher(s) Name</TableCell>
                                  <TableCell>Date(s) Needed</TableCell>
                                  <TableCell>Indicate If</TableCell>
                                  <TableCell>
                                    Grade(element) or Subject(second)
                                  </TableCell>
                                  <TableCell>Notes</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {teachers.map((item, i) => (
                                  <Fragment>
                                    <TableRow>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.teacherName.name}
                                      </TableCell>
                                      <TableCell className="w-[180px]">
                                        {item.datesNeeded.map(
                                          (date, detailIndex) => (
                                            <TableRow className="bg-[#F2F4F7]">
                                              <TableCell>
                                                {moment(date).format(
                                                  "MM/DD/YYYY"
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.indicateIf.name}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.gradeOrSubject}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.note}
                                      </TableCell>
                                    </TableRow>
                                  </Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          ) : null}
                        </div>

                        <div className="pt-3 mx-8">
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Purpose</div>
                            <div className="font-semibold ">
                              {specifyPurposeValue}
                            </div>
                          </div>
                          <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Funding Account</div>

                            {fundingAccounts.map((currentItem, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center flex-wrap justify-between my-3">
                                    <div className="font-light">Department</div>
                                    <div className="font-semibold ">
                                      {currentItem.fundingAccount?.name}
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="font-light">Remarks</div>
                                    <div className="font-semibold ">
                                      {currentItem.remarks}
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="font-light">
                                      Program Account #
                                    </div>
                                    <div className="font-semibold ">
                                      {currentItem.programAccountNumber}
                                    </div>
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="font-light">Percentage</div>
                                    <div className="font-semibold ">
                                      {currentItem.percentageValue}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div className="grid grid-cols-1 gap-4">
                    {/* {showReport ? ( */}
                    <div className="absolute right-[0] bottom-[0] left-[0] bg-[#F5F6F7] "
>
                    <button
                      onClick={() => setInitiateReport(true)}
                      className="bg-[#113699] w-full border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-white flex items-center py-[10px] px-[8px] rounded-[8px] justify-center"
                    >
                      <i className="mr-3 gusd-print-outline"></i>
                      <span>Print / Download</span>
                    </button>
                    </div>
                    {/* ) : (
                      <button
                        onClick={() => setShowReport(true)}
                        className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-white flex items-center py-[10px] px-[8px] rounded-[8px] justify-center"
                      >
                        <i className="mr-3 gusd-document"></i>
                        <span>Show Report</span>
                      </button>
                    )} */}
                  </div>

                  {/* <div style={{ display: "none" }}>
                    <div ref={componentRef}>
                      <div className="border m-4">
                        <div className="text-center py-8">
                          <Link to={""}>
                            <Image
                              src={logoImg}
                              width={"104"}
                              height={"105"}
                              imageClassName="m-auto"
                            />
                          </Link>
                          <div>
                            <div className="font-bold text-lg">
                              GLENDALE UNIFIED SCHOOL DISTRICT
                            </div>
                            <div className="font-semibold text-base">
                              Preparing our students for their future
                            </div>
                            <div className="font-light text-sm">
                              <div>
                                Office of the Chief Human Resources & Operations
                                Officer
                              </div>
                              <div>
                                223 North Jackson St. Glendale, California
                                91206-4380
                              </div>
                              <div>
                                Telephone:818-241-3111,Ext.1256 Fax:818-547-3207
                              </div>
                            </div>
                          </div>
                          <div className="my-4 font-bold text-xl">
                            Substitute Request - Certificated
                          </div>
                        </div>

                        <div className="pt-3 mx-8">
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">
                              School or Department{" "}
                            </div>
                            <div className="font-semibold ">
                              {selectedSchool?.name}
                            </div>
                          </div>
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Date </div>
                            <div className="font-semibold ">
                              {moment(initiateNewReportDate).format(
                                "MM/DD/YYYY"
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Status </div>
                            <Tag
                              severity=""
                              value={
                                SUB_CERTIFICATED_STATUS.PENDING_FOR_APPROVAL_SITE_ADMIN
                              }
                              className=""
                              style={{
                                background: "#EBFFF3",
                                color: "#003D19",
                              }}
                            ></Tag>
                          </div>
                        </div>

                        <div>
                          {teachers.length > 0 ? (
                            <Table className="certificatedPrintTable">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Teacher(s) Name</TableCell>
                                  <TableCell>Date(s) Needed</TableCell>
                                  <TableCell>Indicate If</TableCell>
                                  <TableCell>
                                    Grade(element) or Subject(second)
                                  </TableCell>
                                  <TableCell>Notes</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {teachers.map((item, i) => (
                                  <Fragment>
                                    <TableRow>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.teacherName !== undefined
                                          ? item.teacherName.name
                                          : ""}
                                      </TableCell>
                                      <TableCell className="w-[180px]">
                                        {item.datesNeeded.map(
                                          (date, detailIndex) => (
                                            <TableRow className="bg-[#F2F4F7]">
                                              <TableCell>
                                                {moment(date).format(
                                                  "MM/DD/YYYY"
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.indicateIf !== undefined
                                          ? item.indicateIf.name
                                          : ""}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.gradeOrSubject}
                                      </TableCell>
                                      <TableCell className="bg-[#F2F4F7]">
                                        {item.note}
                                      </TableCell>
                                    </TableRow>
                                  </Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          ) : null}
                        </div>

                        <div className="pt-3 mx-8">
                          <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Purpose</div>
                            <div className="font-semibold ">
                              {specifyPurposeValue}
                            </div>
                          </div>
                          <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                            <div className="font-medium">Funding Account</div>

                            {fundingAccounts.map((currentItem, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center flex-wrap justify-between my-3">
                                    <div className="font-light">Department</div>
                                    <div className="font-semibold ">
                                      {currentItem.fundingAccount?.name}
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="font-light">Remarks</div>
                                    <div className="font-semibold ">
                                      {currentItem.remarks}
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="font-light">
                                      Program Account #
                                    </div>
                                    <div className="font-semibold ">
                                      {currentItem.programAccountNumber}
                                    </div>
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="font-light">Percentage</div>
                                    <div className="font-semibold ">
                                      {currentItem.percentageValue}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Dialog>
          {/* preview popup end */}
        </div>
       

        {/* preview popup start */}
        <Dialog
          className="relative reports-popup"
          visible={initiate}
          position="right"
          style={{ width: "50vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => {
            setInitiateReport(false);
            setShowReport(false);
          }}
          draggable={false}
          resizable={false}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-12 bg-[#F5F6F7] h-auto">
              <div className="p-5">
                <div
                  onClick={() => {
                    setInitiateReport(false);
                    // setShowReport(false);
                  }}
                  className="py-3"
                >
                  <Image
                    src={"/assets/images/sidebarright.svg"}
                    alt="user"
                    width="24"
                    height="24"
                  />
                </div>
                {
                  // (!showReport) ?
                //   <div>
                //     <div className="text-[#113699] text-md lg:text-[0.833vw] font-bold">
                //       Glendale Unified School District
                //     </div>
                //     <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">
                //       Substitute Request Certificated
                //     </div>

                //     <div className="pt-3">
                //       <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                //         <div className="font-medium">School or Department </div>
                //         <div className="font-semibold ">
                //           {"selectedSchool?.name"}
                //         </div>
                //       </div>
                //       <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                //         <div className="font-medium">Date </div>
                //         <div className="font-semibold ">
                //           {"moment(initiateNewReportDate).format('MM/DD/YYYY')"}
                //         </div>
                //       </div>

                //       <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                //         <div className="font-medium">Status </div>
                //         <Tag
                //           severity=""
                //           className=""
                //           style={{ background: "#EBFFF3", color: "#003D19" }}
                //         ></Tag>
                //       </div>
                //     </div>

                   

                //     <Table className="certificatedPrintTable">
                //       <TableHead>
                //         <TableRow>
                //           <TableCell>Teacher(s) Name</TableCell>
                //           <TableCell>Date(s) Needed</TableCell>
                //           <TableCell>Indicate If</TableCell>
                //           <TableCell>
                //             Grade(element) or Subject(second)
                //           </TableCell>
                //           <TableCell>Notes</TableCell>
                //         </TableRow>
                //       </TableHead>
                //       <TableBody>
                //         <Fragment>
                //           <TableRow>
                //             <TableCell className="bg-[#F2F4F7]">
                //               Jerom
                //             </TableCell>
                //             <TableCell className="w-[180px]">
                //               <TableRow className="bg-[#F2F4F7]">
                //                 <TableCell>11/08/2023</TableCell>
                //               </TableRow>
                //             </TableCell>
                //             <TableCell className="bg-[#F2F4F7]">Full</TableCell>
                //             <TableCell className="bg-[#F2F4F7]">-</TableCell>
                //             <TableCell className="bg-[#F2F4F7]">No</TableCell>
                //           </TableRow>
                //         </Fragment>
                //       </TableBody>
                //     </Table>

                //     <div className="pt-3">
                //       <div className="flex flex-wrap items-center justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                //         <div className="font-medium">Purpose</div>
                //         <div className="font-semibold ">
                //           {"specifyPurposeValue"}
                //         </div>
                //       </div>
                //       <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                //         <div className="font-medium">Funding Account</div>
                     
                //         <div className="border p-2">
                //           <div className="flex items-center flex-wrap justify-between">
                //             <div className="font-light py-3">Department</div>
                //             <div className="font-semibold ">
                //               {"currentItem.fundingAccount?.name"}
                //             </div>
                //           </div>
                //           <div className="flex justify-between">
                //             <div className="font-light">Remarks</div>
                //             <div className="font-semibold ">
                //               {"currentItem.remarks"}
                //             </div>
                //           </div>
                //           <div className="flex justify-between">
                //             <div className="font-light">Program Account #</div>
                //             <div className="font-semibold ">
                //               {"currentItem.programAccountNumber"}
                //             </div>
                //           </div>
                //           <div className="flex justify-between">
                //             <div className="font-light">Percentage</div>
                //             <div className="font-semibold ">
                //               {"currentItem.percentageValue"}
                //             </div>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                  // :
                  <div>
                      <div className="border mb-[3rem] mx-0">
                          <div className='text-center py-8'>
                              <Link href="#"><Image src={'/assets/images/logo.png'} width={"104"} height={"105"} imageClassName='m-auto' /></Link>
                              <div>
                                  <div className="font-bold text-lg">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                  <div className="font-semibold text-base">Preparing our students for their future</div>
                                  <div className="font-light text-sm">
                                      <div>Office of the Chief Human Resources & Operations Officer</div>
                                      <div>223 North Jackson St. Glendale, California 91206-4380</div>
                                      <div>Telephone:818-241-3111,Ext.1256 Fax:818-547-3207</div>
                                  </div>
                              </div>
                              <div className="my-4 font-bold text-xl">
                                  Substitute Request - Certificated
                              </div>
                          </div>

                          <div className="pt-3 mx-8">
                              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                  <div className="font-medium">School or Department </div>
                                  <div className="font-semibold ">{"selectedSchool?.name"}</div>
                              </div>
                              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                  <div className="font-medium">Date </div>
                                  <div className="font-semibold ">{"moment(initiateNewReportDate).format('MM/DD/YYYY')"}</div>
                              </div>

                              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                  <div className="font-medium">Status </div>
                                  <Tag severity="" className="" style={{ background: '#EBFFF3', color: '#003D19' }}></Tag>
                              </div>
                          </div>

                          <div className="mx-[24px]">
                          <Table className="certificatedPrintTable">
                  <TableHead >
                    <TableRow className="mx-[25px]">
                      <TableCell>Teacher(s) Name</TableCell>
                      <TableCell>Date(s) Needed</TableCell>
                      <TableCell>Indicate If</TableCell>
                      <TableCell>Grade(element) or Subject(second)</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Fragment>
                      <TableRow>
                        <TableCell className="bg-[#F2F4F7]">Jerom</TableCell>
                        <TableCell className="w-[180px]">
                          <TableRow className="bg-[#F2F4F7]">
                            <TableCell>123</TableCell>
                          </TableRow>
                        </TableCell>
                        <TableCell className="bg-[#F2F4F7]">-</TableCell>
                        <TableCell className="bg-[#F2F4F7]">-</TableCell>
                        <TableCell className="bg-[#F2F4F7]">No</TableCell>
                      </TableRow>
                    </Fragment>
                  </TableBody>
                </Table>

                          </div>

                          <div className="pt-3 mx-8">
                              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                  <div className="font-medium">Purpose</div>
                                  <div className="font-semibold ">{"specifyPurposeValue"}</div>
                              </div>
                              <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                  <div className="font-medium">Funding Account</div>

                                  {/* {
                                      fundingAccounts.map((currentItem, index) => {
                                          return ( */}
                                              <div>
                                                  <div className="flex items-center flex-wrap justify-between my-3">
                                                      <div className="font-light">Department</div>
                                                      <div className="font-semibold ">{"currentItem.fundingAccount?.name"}</div>
                                                  </div>
                                                  <div className="flex justify-between">
                                                      <div className="font-light">Remarks</div>
                                                      <div className="font-semibold ">{"currentItem.remarks"}</div>
                                                  </div>
                                                  <div className="flex justify-between">
                                                      <div className="font-light">Program Account #</div>
                                                      <div className="font-semibold ">{"currentItem.programAccountNumber"}</div>
                                                  </div>

                                                  <div className="flex justify-between">
                                                      <div className="font-light">Percentage</div>
                                                      <div className="font-semibold ">{"currentItem.percentageValue"}</div>
                                                  </div>

                                              </div>
                                

                              </div>
                          </div>
                      </div>
                  </div>
                }

                <div className="grid grid-cols-1 gap-4">
                  {/* // (showReport) ? */}
                  <div  className="absolute right-[0] bottom-[0] left-[0] bg-[#F5F6F7]">

                  <button 
                  className="bg-[#113699] w-full border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-white flex items-center py-[10px] px-[8px] rounded-[8px] justify-center"
                  >
                    <i className="mr-3 gusd-print-outline"></i>
                    <span>Print / Download</span>
                  </button>
                  </div>
                  {/* <button
                                                    onClick={() => setShowReport(true)}
                                                    className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-white flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                                                    <i className="mr-3 gusd-document"></i><span>Show Report</span>
                                                </button> */}
                </div>

                {/* <div style={{ display: "none" }} >
                                        <div ref={componentRef}>
                                            <div className="border m-4">
                                                <div className='text-center py-8'>
                                                    <Link to={""}><Image src={"logoImg"} width={"104"} height={"105"} imageClassName='m-auto' /></Link>
                                                    <div>
                                                        <div className="font-bold text-lg">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                                        <div className="font-semibold text-base">Preparing our students for their future</div>
                                                        <div className="font-light text-sm">
                                                            <div>Office of the Chief Human Resources & Operations Officer</div>
                                                            <div>223 North Jackson St. Glendale, California 91206-4380</div>
                                                            <div>Telephone:818-241-3111,Ext.1256 Fax:818-547-3207</div>
                                                        </div>
                                                    </div>
                                                    <div className="my-4 font-bold text-xl">
                                                        Substitute Request - Certificated
                                                    </div>
                                                </div>

                                                <div className="pt-3 mx-8">
                                                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                        <div className="font-medium">School or Department </div>
                                                        <div className="font-semibold ">{selectedSchool?.name}</div>
                                                    </div>
                                                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                        <div className="font-medium">Date </div>
                                                        <div className="font-semibold ">{moment(initiateNewReportDate).format('MM/DD/YYYY')}</div>
                                                    </div>

                                                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                        <div className="font-medium">Status </div>
                                                        <Tag severity="" value={SUB_CERTIFICATED_STATUS.PENDING_FOR_APPROVAL_SITE_ADMIN} className="" style={{ background: '#EBFFF3', color: '#003D19' }}></Tag>
                                                    </div>
                                                </div>


                                                <div>


                                                    {
                                                        (teachers.length > 0) ?

                                                            <Table className="certificatedPrintTable">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Teacher(s) Name</TableCell>
                                                                        <TableCell>Date(s) Needed</TableCell>
                                                                        <TableCell>Indicate If</TableCell>
                                                                        <TableCell>Grade(element) or Subject(second)</TableCell>
                                                                        <TableCell>Notes</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>

                                                                    {teachers.map((item, i) => (
                                                                        <Fragment>
                                                                            <TableRow>
                                                                                <TableCell className="bg-[#F2F4F7]"
                                                                                >
                                                                                    {item.teacherName !== undefined ? item.teacherName.name : ''}
                                                                                </TableCell>
                                                                                <TableCell className="w-[180px]">
                                                                                    {item.datesNeeded.map((date, detailIndex) => (

                                                                                        <TableRow className="bg-[#F2F4F7]">
                                                                                            <TableCell>{moment(date).format('MM/DD/YYYY')}</TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                                </TableCell>
                                                                                <TableCell className="bg-[#F2F4F7]"
                                                                                >
                                                                                    {item.indicateIf !== undefined ? item.indicateIf.name : ''}
                                                                                </TableCell>
                                                                                <TableCell className="bg-[#F2F4F7]"
                                                                                >
                                                                                    {item.gradeOrSubject}
                                                                                </TableCell>
                                                                                <TableCell className="bg-[#F2F4F7]"
                                                                                >
                                                                                    {item.note}
                                                                                </TableCell>



                                                                            </TableRow>




                                                                        </Fragment>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>

                                                            : null
                                                    }

                                                </div>

                                                <div className="pt-3 mx-8">
                                                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                        <div className="font-medium">Purpose</div>
                                                        <div className="font-semibold ">{specifyPurposeValue}</div>
                                                    </div>
                                                    <div className="text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                        <div className="font-medium">Funding Account</div>


                                                        {
                                                            fundingAccounts.map((currentItem, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <div className="flex items-center flex-wrap justify-between my-3">
                                                                            <div className="font-light">Department</div>
                                                                            <div className="font-semibold ">{currentItem.fundingAccount?.name}</div>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <div className="font-light">Remarks</div>
                                                                            <div className="font-semibold ">{currentItem.remarks}</div>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <div className="font-light">Program Account #</div>
                                                                            <div className="font-semibold ">{currentItem.programAccountNumber}</div>
                                                                        </div>

                                                                        <div className="flex justify-between">
                                                                            <div className="font-light">Percentage</div>
                                                                            <div className="font-semibold ">{currentItem.percentageValue}</div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
              </div>
            </div>
          </div>
        </Dialog>
        {/* preview popup end */}
      </Layout>
    </>
  );
}
