import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { TabView } from "primereact/tabview";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { TabPanel } from "react-tabs";
import PsaTermsAndConditions from "../personalserivicet&c";
import PsaPdf from "../reportpdftemplate/personalserviceagreementpdf";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { Schools } from "@/models";
import { API_STATUS } from "@/helper/enum";

function Psapopup(props) {
  const router = useRouter();
  const [basicInfoPopUp, SetBasicInfoPopUp] = useState(true);
  const [partyDetailesPopup, setPartyDetailesPopUp] = useState(false);
  const [attchmentAndDetailes, SetAttchmentAndDetailes] = useState(false);
  const [termsAndConditions, SetTermsAndConditions] = useState(false);
  const [eddDetailes, setEddDetailes] = useState(false);
  const [previewAndEdit, SetPreviewAndEdit] = useState(false);
  const [w9Detailes, SetW9Detailes] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPreviewPopUp, setShowPreviewPopUp] = useState(false);

  const [initiatorDocuments, setInitiatorDocuments] = useState([]);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  // Basic Info

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [agreementDate, setAgreementDate] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [amount, setAmount] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [notifyDays, setNotifyDays] = useState("");
  const [dateOfBoardMeeting, setDateOfBoardMeeting] = useState("");
  const [services, setServices] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [boardItem, setBoardItem] = useState("");
  const [psaConsultantName, setPSAConsultantName] = useState("");
  const [pageItem, setPageItem] = useState("");
  const [personnelActionReferenceNo, setPersonnelActionReferenceNo] =
    useState("");
  const [psaConsultantEmail, setPSAConsultantEmail] = useState("");

  // Psa Cunsultant
  const [psaConsultanName1, setPSAConsultanName1] = useState("");
  const [pocName, setPOCName] = useState("");
  const [psaConsultantEmail1, setPSAConsultantEmail1] = useState("");
  const [employerIdentification, setEmployerIdentification] = useState("");
  const [clientID, setClientID] = useState("");
  const [pocContactNumber, setPOCContactNumber] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [typeOfBusinessEntity, setTypeOfBusinessEntity] = useState("");
  const [title, setTitle] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // GENERAL TERMS AND CONDITIONS

  const [termsAndConditionsCheck, SetTermsAndConditionsCheck] = useState(false);

  // Attachments & Notes

  const [notes, setNotes] = useState("");
  const [scopeofwork, setScopeofwork] = useState(false);
  const [insuranceForms, setInsuranceForms] = useState(false);
  const [purchaseOrderNo, setPurchaseOrderNo] = useState(false);
  const [addendumContaining, setAddendumContaining] = useState(false);
  const [attachedAddendumNo, setAttachedAddendumNo] = useState(false);
  const [otherRemarks, setOtherRemarks] = useState("");

  // Dropdown Option
  const [schoolList, setSchoolList] = useState([]);
  const [employeeList, setEmployeeList] = useState();
  const [approverList, setApproverList] = useState();

  async function getEmployeeListData() {
    try {
      let accessToken = window.localStorage.getItem("accessToken");
      let requestedData = {
        accessToken: accessToken,
        page: 1,
        limit: 100,
        search: "",
      };

      const response = await axios.post("/api/common/getEmployeeList", {
        requestedData,
      });
      var employeeResponses = response.data;
      if (employeeResponses !== null) {
        let employee = [];
        let Approver = [];
        employeeResponses.rows.map((item) => {
          let name = item.employee_code
            ? `${item.employee_name} (${item.employee_code})`
            : item.employee_name;
          let obj = {
            ...item,
            label: name,
            value: item.id,
          };
          let AppObj = {
            label: name,
            value: item.user_Id,
          };
          employee.push(obj);
          Approver.push(AppObj);
        });

        setEmployeeList(employee);
        setApproverList(Approver);
      }
    } catch (error) {
      if (error?.response?.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  }

  const getShoolListData = async () => {
    try {
      let accessToken = window.localStorage.getItem("accessToken");
      let requestedData = {
        accessToken: accessToken,
        page: 1,
        limit: 100,
      };

      const response = await axios.post("/api/common/getSchoolList", {
        requestedData,
      });
      let getSchoolListDetails = response.data;

      let getSchoolListResponse = getSchoolListDetails.rows;
      const updatedSchoolList = getSchoolListResponse.map((item, index) => {
        return { label: item.name, value: item.name };
      });
      setSchoolList([...updatedSchoolList]);
    } catch (err) {
      if (err?.response?.status === API_STATUS?.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  };

  useEffect(() => {
    getShoolListData();
    getEmployeeListData();
  }, []);

  // Routing

  const [budgetClerk, setBudgetClerk] = useState("");
  const [budgetmanager, setBudgetmanager] = useState("");
  const [executiveApprover, setExecutiveApprover] = useState("");
  const [hrExecutive, setHRExecutive] = useState("");
  const [submitCompleted, setSubmitCompleted] = useState("");

  const handleNextFirst = () => {
    if (!assignmentTitle) {
      toast.error("Please Enter Assignment Title");
    } else if (!department) {
      toast.error("Please Select Site/Department");
    } else if (!amount) {
      toast.error("Please Enter Ammount");
    } else if (!agreementDate) {
      toast.error("Please Select Agreement Date");
    } else if (!effectiveDate) {
      toast.error("Please Select Effective Date");
    } else if (!expirationDate) {
      toast.error("Please Select Expiration Date");
    } else if (!reviewDate) {
      toast.error("Please Select Review Date");
    } else if (!notifyDays) {
      toast.error("Please Select Notify Days");
    } else if (!dateOfBoardMeeting) {
      toast.error("Please Select Date of board meeting");
    } else if (!services) {
      toast.error("Please Enter Services");
    } else if (!accountNo) {
      toast.error("Please Enter Account No.");
    } else if (!boardItem) {
      toast.error("Please Enter Board Item");
    } else if (!psaConsultantName) {
      toast.error("Please Enter PSA Consultant's Name");
    } else if (!pageItem) {
      toast.error("Please Enter Page/ Item");
    } else if (!personnelActionReferenceNo) {
      toast.error("Please Enter Personnel Action Reference No");
    } else if (!psaConsultantEmail) {
      toast.error("Please Enter PSA Consultant's Email");
    } else {
      setShowPreviewPopUp(false);
      SetBasicInfoPopUp(false);
      // setPartyDetailesPopUp(true);
      SetAttchmentAndDetailes(true);
      SetTermsAndConditions(false);
      SetW9Detailes(false);
      setEddDetailes(false);
    }
  };

  const handleNextSecond = () => {
    if (!psaConsultanName1) {
      toast.error("Please Enter PSA Consultant's Name");
    } else if (!pocName) {
      toast.error("Please Enter POC Name");
    } else if (!psaConsultantEmail1) {
      toast.error("Please Enter PSA Consultant's Email*");
    } else if (!employerIdentification) {
      toast.error("Please Enter Employer Identification");
    } else if (!clientID) {
      toast.error("Please Enter Client ID");
    } else if (!pocContactNumber) {
      toast.error("Please Enter POC Contact Number");
    } else if (!socialSecurityNumber) {
      toast.error("Please Enter Social Security Number");
    } else if (!typeOfBusinessEntity) {
      toast.error("Please Select Type of Business Entity");
    } else if (!title) {
      toast.error("Please Enter Title");
    } else if (!licenceNumber) {
      toast.error("Please Enter Licence Number");
    } else if (!state) {
      toast.error("Please Enter State");
    } else if (!city) {
      toast.error("Please Enter City");
    } else if (!streetAddress) {
      toast.error("Please Enter Street Address");
    } else if (!postalCode) {
      toast.error("Please Enter Postal Code");
    } else {
      setShowPreviewPopUp(false);
      SetBasicInfoPopUp(false);
      setPartyDetailesPopUp(false);
      SetAttchmentAndDetailes(true);
      SetTermsAndConditions(false);
      SetW9Detailes(false);
      setEddDetailes(false);
    }
  };

  const saveBasicInfo = () => {
    saveBasicInfo();
    setConfirmVisible2(true);
    if (!notes) {
      toast.error("Please Enter Notes");
    } else if (!otherRemarks) {
      toast.error("Please Enter Other Remarks");
    } else {
      setShowPreviewPopUp(false);
      SetBasicInfoPopUp(false);
      setPartyDetailesPopUp(false);
      SetAttchmentAndDetailes(false);
      SetTermsAndConditions(true);
      SetW9Detailes(false);
      setEddDetailes(false);
    }
  };

  // Routing

  const handleRouting = () => {
    if (!budgetClerk) {
      toast.error("Please Select Budget Clerk");
    } else if (!budgetmanager) {
      toast.error("Please Select Budget manager");
    } else if (!executiveApprover) {
      toast.error("Please Select Executive Approver");
    } else if (!hrExecutive) {
      toast.error("Please Select HR Executive Secretary");
    } else if (!submitCompleted) {
      toast.error("Please Enter Submit Completed form to");
    } else {
      setShowPreviewPopUp(true);
      SetBasicInfoPopUp(false);
      setPartyDetailesPopUp(false);
      SetAttchmentAndDetailes(false);
      SetTermsAndConditions(false);
      SetW9Detailes(false);
      setEddDetailes(false);
      SetPreviewAndEdit(true);
    }
  };

  const submitFormData = () => {
    const data = {
      //Basic Info

      assignmentTitle: assignmentTitle,
      department: department,
      agreementDate: agreementDate,
      effectiveDate: effectiveDate,
      expirationDate: expirationDate,
      amount: amount,
      reviewDate: reviewDate,
      notifyDays: notifyDays,
      dateOfBoardMeeting: dateOfBoardMeeting,
      services: services,
      accountNo: accountNo,
      boardItem: boardItem,
      psaConsultantName: psaConsultantName,
      pageItem: pageItem,
      personnelActionReferenceNo: personnelActionReferenceNo,
      psaConsultantEmail: psaConsultantEmail,

      // Attachments & Notes

      notes: notes,
      scopeofwork: scopeofwork,
      insuranceForms: insuranceForms,
      purchaseOrderNo: purchaseOrderNo,
      addendumContaining: addendumContaining,
      attachedAddendumNo: attachedAddendumNo,
      otherRemarks: otherRemarks,

      // GENERAL TERMS AND CONDITIONS

      termsAndConditionsCheck: termsAndConditionsCheck,
      // Routing
      budgetClerk: budgetClerk,
      budgetmanager: budgetmanager,
      executiveApprover: executiveApprover,
      hrExecutive: hrExecutive,
      submitCompleted: submitCompleted,
    };
  };
  // Terms and Conditions
  return (
    <>
      <Dialog
        className="relative reports-popup"
        visible={props.visible}
        position="right"
        style={{ width: "100vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => props.onHide(false)}
        draggable={false}
        resizable={false}
      >
        {/* <div class="p-10"><a href="#" id="add-family-open-btn"><i class="gusd-edit text-2xl"></i></a></div> */}
        <div className="fixed z-10 inset-0 overflow-hidden styled-select">
          <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
            <div className="relative overflow-hidden transform transition-all w-full h-full">
              <div className="grid grid-cols-12 custmCols">
                <div className="col-span-12 lg:col-span-3 h-full sideBarLeft openSideDiv">
                  <button
                    onClick={() => props.setShowNextPopUp(false)}
                    type="button"
                    className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
                    id="add-family-cancel-btn"
                  >
                    <i className="gusd-arrow-line-right mr-[14px] xl:mr-[0.729vw]"></i>{" "}
                    Back Home
                  </button>
                  <div className="mt-[16px] xl:mt-[0.833vw] text-[#101828] text-[14px] xl:text-[0.633vw] font-normal">
                    GUSD Personal Service Agreement
                  </div>
                  {/* <div className="mt-[10px] xl:mt-[0.533vw] text-[#101828] text-[20px] xl:text-[0.833vw] font-medium">Assignment 10102</div> */}
                  <div className="mt-[32px] xl:[1.667vw]">
                    <ul className="sideTabs">
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            SetBasicInfoPopUp(true);
                            setPartyDetailesPopUp(false);
                            SetAttchmentAndDetailes(false);
                            SetTermsAndConditions(false);
                            SetW9Detailes(false);
                            setEddDetailes(false);
                            SetPreviewAndEdit(false);
                          }}
                          className={`${
                            basicInfoPopUp === true
                              ? "tab-b active activeCheck"
                              : ""
                          }`}
                          data-id="tab1"
                        >
                          <i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          Basic Info
                        </a>
                      </li>

                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            setPartyDetailesPopUp(false);
                            SetBasicInfoPopUp(false);
                            SetAttchmentAndDetailes(true);
                            SetTermsAndConditions(false);
                            SetW9Detailes(false);
                            setEddDetailes(false);
                            SetPreviewAndEdit(false);
                          }}
                          className={`${
                            attchmentAndDetailes === true
                              ? "tab-b active activeCheck"
                              : null
                          }`}
                          class="tab-b"
                          data-id="tab3"
                        >
                          <i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          Attachments & Notes{" "}
                        </a>
                      </li>

                      {/* <li>
                        <a
                          href="#"
                          onClick={() => {
                            setPartyDetailesPopUp(true);
                            SetBasicInfoPopUp(false);
                            SetAttchmentAndDetailes(false);
                            SetTermsAndConditions(false);
                            SetW9Detailes(false);
                            setEddDetailes(false);
                            SetPreviewAndEdit(false);
                          }}
                          className={`${
                            partyDetailesPopup === true
                              ? "tab-b active activeCheck"
                              : null
                          }`}
                          class="tab-b"
                          data-id="tab3"
                        >
                          <i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          PSA Consultant Details
                        </a>
                      </li> */}

                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            setPartyDetailesPopUp(false);
                            SetBasicInfoPopUp(false);
                            SetAttchmentAndDetailes(false);
                            SetTermsAndConditions(true);
                            SetW9Detailes(false);
                            setEddDetailes(false);
                            SetPreviewAndEdit(false);
                          }}
                          className={`${
                            termsAndConditions === true
                              ? "tab-b active activeCheck"
                              : null
                          }`}
                          class="tab-b"
                          data-id="tab3"
                        >
                          <i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          Terms & Conditions
                        </a>
                      </li>

                      <li>
                        <a
                          href="javascript:void(0);"
                          onClick={() => {
                            setPartyDetailesPopUp(false);
                            SetBasicInfoPopUp(false);
                            SetAttchmentAndDetailes(false);
                            SetTermsAndConditions(false);
                            SetW9Detailes(false);
                            setEddDetailes(true);
                            SetPreviewAndEdit(false);
                          }}
                          className={`${
                            eddDetailes === true
                              ? "tab-b active activeCheck"
                              : null
                          }`}
                          class="tab-b"
                          data-id="tab3"
                        >
                          <i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          Routing
                        </a>
                      </li>

                      {/* <li><a href="javascript:void(0);" onClick={() => { setPartyDetailesPopUp(false); SetBasicInfoPopUp(false); SetAttchmentAndDetailes(false); SetTermsAndConditions(false); SetW9Detailes(true); setEddDetailes(false); SetPreviewAndEdit(false) }} class="tab-b"
                          className={`${props.w9Detailes === true ? "tab-b active activeCheck" : null}`} data-id="tab3"><i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>W9 Details</a></li> */}

                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            setPartyDetailesPopUp(false);
                            SetBasicInfoPopUp(false);
                            SetAttchmentAndDetailes(false);
                            SetTermsAndConditions(false);
                            SetW9Detailes(false);
                            setEddDetailes(false);
                            SetPreviewAndEdit(true);
                          }}
                          className={`${
                            previewAndEdit === true
                              ? "tab-b active activeCheck"
                              : null
                          }`}
                          data-id="tab2"
                        >
                          <i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>{" "}
                          Preview & Edit
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="fixed top-0 left-0 openBtn xl:hidden">
                    <button
                      type="button"
                      className="sideDivBtn inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-white text-[14px] xl:text-[0.729vw] font-medium bg-[#3366FF] border border-[#EFF8FF] rounded-r-md"
                    >
                      <i className="gusd-arrow-line-right"></i>
                    </button>
                  </div>
                </div>

                <div
                  className={`col-span-9 xl:col-span-6 2xl:col-span-6 md:col-span-7
                  mScrollCstm  
                  ${termsAndConditions === true ? "relative" : "overflow-auto"}
                 
                  `}
                >
                  <div
                    className={`tab-c tab-active p-lr-110 pt-10 xl:pt-0  ${
                      termsAndConditions === true ? "overflow-auto" : null
                    }`}
                    data-id="tab1"
                  >
                    {basicInfoPopUp === true ? (
                      <div>
                        <div class="text-[#000000] font-medium xl:text-[1.406vw] text-[24px]">
                          Basic Info
                        </div>
                        <div className="mCustomScrollbar scroll-w-10 max-h-100 ">
                          <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] ">
                            <form>
                              <div className="col mb-7">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Assignment Title
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  value={assignmentTitle}
                                  onChange={(e) =>
                                    setAssignmentTitle(e.target.value)
                                  }
                                  // value={fteUtilized} onChange={e => setFteUtilized(e.target.value)}
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 xl:gap-y-[1.250vw] gap-y-[20px]">
                                <div className="">
                                  <div className="col ">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Site/Department
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <Dropdown
                                      onChange={(e) => setDepartment(e.value)}
                                      value={department}
                                      //  value={selectedEmployee} onChange={(e) => {
                                      //   setSelectedEmployee(e.value);
                                      //   //set selected id employee data
                                      //   allEmployeeDetails.map((currentItem) => {
                                      //     if (currentItem.id === e.value.code) {
                                      //       setSelectedEmployeeDetails(currentItem);
                                      //     }
                                      //   })

                                      // }}
                                      options={schoolList}
                                      optionLabel="label"
                                      placeholder="Select a Employee"
                                      filter
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full md:w-14rem"
                                    />
                                  </div>

                                  <div className="col ">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Amount
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      onChange={(e) =>
                                        setAmount(e.target.value)
                                      }
                                      value={amount}
                                      // onChange={e => setAssighnmentTitle(e.target.value)}
                                      type="text"
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>

                                  <div className="col mt-1.5">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Expiration Date
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <div className="relative custp-calender">
                                      <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                      <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                      <div className="card flex justify-content-center">
                                        <Calendar
                                          onChange={(e) => {
                                            setExpirationDate(e.target.value);
                                          }}
                                          //   onChange={(e) => {
                                          //     setStartDate(e.target.value)
                                          //   }}
                                          //   value={startDate}
                                          placeholder="Start Date"
                                          className="w-full h-11"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Notify Days
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <div className="">
                                      <div className="relative custp-calender">
                                        <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                        <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                        <div className="card flex justify-content-center">
                                          <Calendar
                                            onChange={(e) => {
                                              setNotifyDays(e.target.value);
                                            }}
                                            value={notifyDays}
                                            // onChange={(e) => {
                                            //   setStartDate(e.target.value)
                                            // }}
                                            // value={startDate}
                                            placeholder="Start Date"
                                            className="w-full h-11"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Account No.
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      onChange={(e) =>
                                        setAccountNo(e.target.value)
                                      }
                                      value={accountNo}
                                      type="text"
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>

                                  <div className="col mt-1">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Board Item
                                    </label>
                                    <input
                                      value={boardItem}
                                      onChange={(e) =>
                                        setBoardItem(e.target.value)
                                      }
                                      //  value={totalStaffingAllocationectedRole} onChange={e => setTotalStaffingAllocation(e.target.value)}
                                      type="text"
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      PSA Consultant's Name
                                    </label>
                                    <input
                                      value={psaConsultantName}
                                      onChange={(e) =>
                                        setPSAConsultantName(e.target.value)
                                      }
                                      // value={fteUtilized} onChange={e => setFteUtilized(e.target.value)}
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Personnel Action Reference No
                                    </label>
                                    <input
                                      value={personnelActionReferenceNo}
                                      onChange={(e) =>
                                        setPersonnelActionReferenceNo(
                                          e.target.value
                                        )
                                      }
                                      // value={fteUtilized} onChange={e => setFteUtilized(e.target.value)}
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>
                                </div>

                                <div className="">
                                  <label
                                    className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                    for="username"
                                  >
                                    Agreement Date
                                    <span className="text-[red] pl-0.2">*</span>
                                  </label>
                                  <div className="relative custp-calender">
                                    <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                    <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                    <div className="card flex justify-content-center">
                                      <Calendar
                                        onChange={(e) => {
                                          setAgreementDate(e.target.value);
                                        }}
                                        value={agreementDate}
                                        // onChange={(e) => {
                                        //   setStartDate(e.target.value)
                                        // }}
                                        // value={startDate}
                                        placeholder="Start Date"
                                        className="w-full h-11"
                                      />
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Effective Date
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <div className="relative custp-calender">
                                      <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                      <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                      <div className="card flex justify-content-center">
                                        <Calendar
                                          onChange={(e) => {
                                            setEffectiveDate(e.target.value);
                                          }}
                                          //   onChange={(e) => {
                                          //     setStartDate(e.target.value)
                                          //   }}
                                          //   value={startDate}
                                          placeholder="Start Date"
                                          className="w-full h-11"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Review Date
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <div className="relative custp-calender">
                                      <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                      <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                      <div className="card flex justify-content-center">
                                        <Calendar
                                          onChange={(e) => {
                                            setReviewDate(e.target.value);
                                          }}
                                          value={reviewDate}
                                          //   onChange={(e) => {
                                          //     setStartDate(e.target.value)
                                          //   }}
                                          //   value={startDate}
                                          placeholder="Start Date"
                                          className="w-full h-11"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Services
                                    </label>
                                    <div className="">
                                      <InputTextarea
                                        value={services}
                                        onChange={(e) =>
                                          setServices(e.target.value)
                                        }
                                        rows={5}
                                        placeholder="Type here"
                                        className="h-22 text-[16px] xl:text-[0.833vw] px-[14px] py-[12px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      />
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Date of board meeting
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <div className="relative custp-calender">
                                      <i className="gusd-calendar text-[#667085] text-[14px] absolute left-[0.8rem] top-1/2 -translate-y-1/2 z-10"></i>
                                      <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                      <div className="card flex justify-content-center">
                                        <Calendar
                                          onChange={(e) => {
                                            setDateOfBoardMeeting(
                                              e.target.value
                                            );
                                          }}
                                          value={dateOfBoardMeeting}
                                          //   onChange={(e) => {
                                          //     setStartDate(e.target.value)
                                          //   }}
                                          //   value={startDate}
                                          placeholder="Start Date"
                                          className="w-full h-11"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      Page/ Item
                                    </label>
                                    <input
                                      value={pageItem}
                                      onChange={(e) =>
                                        setPageItem(e.target.value)
                                      }
                                      //  value={fteUtilized} onChange={e => setFteUtilized(e.target.value)}
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>

                                  <div className="col">
                                    <label
                                      className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                      for="username"
                                    >
                                      PSA Consultant's Email
                                      <span className="text-[red] pl-0.2">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      value={psaConsultantEmail}
                                      onChange={(e) =>
                                        setPSAConsultantEmail(e.target.value)
                                      }
                                      //  value={fteUtilized} onChange={e => setFteUtilized(e.target.value)}
                                      name=""
                                      class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                      placeholder="Type here"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 mt-[40px] xl:mt-[2.083vw]">
                          {/* <div>
                                <a href="#" className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                              </div> */}
                          <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                            <a
                              onClick={() => {
                                saveBasicInfo("save");
                                setShowPreviewPopUp(false);
                                setShowNextPopUp(false);
                              }}
                              href="javascript:void(0);"
                              className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF]  border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i
                                className="pi pi-save mr-1"
                                style={{ fontSize: "0.8rem" }}
                              ></i>
                              Save
                            </a>
                            {showPreviewPopUp ? (
                              <a
                                href="#"
                                onClick={() => {
                                  submitFormData;

                                  // setShowPreviewPopUp(true)
                                }}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Submit
                              </a>
                            ) : (
                              <a
                                href="#"
                                onClick={handleNextFirst}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Next
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* {partyDetailesPopup === true ? (
                      <div className="mt-[5px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] ">
                        <div class="text-[#000000] font-medium xl:text-[1.406vw] text-[24px]">
                          PSA Consultant Details
                        </div>
                        <form>
                          <div className=" grid grid-cols-2 gap-8">
                            <div className="">
                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  PSA Consultant's Name
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>

                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  POC Name
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>

                              <div className="col mt-1.5">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  PSA Consultant's Email
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="spore@hexalytics.com"
                                />
                              </div>

                              <div className="col">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Employer Identification
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>
                            </div>

                            <div className="">
                              <label
                                className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                for="username"
                              >
                                Client ID
                                <span className="text-[red] pl-0.2">*</span>
                              </label>
                              <input
                                onChange={(e) =>
                                  setAssighnmentTitle(e.target.value)
                                }
                                type="text"
                                name=""
                                class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                placeholder="Type here"
                              />

                              <div className="col">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  POC Contact Number
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>

                              <div className="col">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Social Security Number
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <input
                                  onChange={(e) =>
                                    setAssighnmentTitle(e.target.value)
                                  }
                                  type="text"
                                  name=""
                                  class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                  placeholder="Type here"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="mt-4">
                          <label
                            className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                            for="username"
                          >
                            Type of Business Entity
                            <span className="text-[red] pl-0.2">*</span>
                          </label>
                          <div className="flex gap-4">
                            <div className="flex">
                              <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                              />
                              <label
                                className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                                for="username"
                              >
                                Individual
                              </label>
                            </div>
                            <div className="flex">
                              <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                              />
                              <label
                                className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                                for="username"
                              >
                                Sole Partnership
                              </label>
                            </div>
                            <div className="flex">
                              <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                              />
                              <label
                                className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                                for="username"
                              >
                                Partnership
                              </label>
                            </div>
                            <div className="flex">
                              <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                              />
                              <label
                                className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                                for="username"
                              >
                                Corporation
                              </label>
                            </div>
                            <div className="flex">
                              <input
                                type="radio"
                                id="html"
                                name="fav_language"
                                value="HTML"
                              />
                              <label
                                className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                                for="username"
                              >
                                Others
                              </label>
                            </div>
                            
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-8">
                          <div className="col">
                            <label
                              className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                              for="username"
                            >
                              Title<span className="text-[red] pl-0.2">*</span>
                            </label>
                            <input
                              type="text"
                              name=""
                              class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                              placeholder="Type here"
                            />
                          </div>

                          <div className="col">
                            <label
                              className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                              for="username"
                            >
                              Licence Number
                              <span className="text-[red] pl-0.2">*</span>
                            </label>
                            <input
                              type="text"
                              name=""
                              class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                              placeholder="Type here"
                            />
                          </div>
                        </div>

                        <label
                          className="text-[#344054] text-[14px] mt-4 xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                          for="username"
                        >
                          Address
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            name=""
                            class="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-full leading-10"
                            placeholder="State"
                          />

                          <input
                            type="text"
                            name=""
                            class="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-full leading-10"
                            placeholder="City"
                          />

                          <input
                            type="text"
                            name=""
                            class="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-full leading-10"
                            placeholder="Street Address"
                          />

                          <input
                            type="text"
                            name=""
                            class="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-full leading-10"
                            placeholder="Postal Code"
                          />
                        </div>

                        <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                          <div>
                            <a
                              href="#"
                              onClick={() => {
                                setShowPreviewPopUp(false);
                                SetBasicInfoPopUp(true);
                                setPartyDetailesPopUp(false);
                                SetAttchmentAndDetailes(false);
                                SetTermsAndConditions(false);
                                SetW9Detailes(false);
                                setEddDetailes(false);
                              }}
                              className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i className="gusd-arrow-line-right mr-1"></i>
                              Previous
                            </a>
                          </div>
                          <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                            <a
                              // onClick={() => {
                              //   setShowNextPopUp(false);
                              // }}
                              href="javascript:void(0);"
                              className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i
                                className="pi pi-save mr-1"
                                style={{ fontSize: "0.8rem" }}
                              ></i>
                              Save
                            </a>
                            {showPreviewPopUp ? (
                              <a
                                href="#"
                                onClick={() => {
                                  // saveBasicInfo();
                                  // setConfirmVisible2(true)
                                  // setShowPreviewPopUp(true)
                                }}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Submit
                              </a>
                            ) : (
                              <a
                                href="#"
                                onClick={() => {
                                  setShowPreviewPopUp(false);
                                  SetBasicInfoPopUp(false);
                                  setPartyDetailesPopUp(false);
                                  SetAttchmentAndDetailes(true);
                                  SetTermsAndConditions(false);
                                  SetW9Detailes(false);
                                  setEddDetailes(false);
                                }}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Next
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null} */}
                    {attchmentAndDetailes === true ? (
                      <div className="h-[41vw] relative">
                        <div className="text-[#000000] font-medium xl:text-[1.406vw] text-[24px]">
                          Attachments & Notes
                        </div>
                        <label
                          className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                          for="username"
                        >
                          Contract Document Lists
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex">
                            <input
                              // type="radio"
                              type="checkbox"
                              id="html"
                              onChange={(e) => setScopeofwork(e.target.checked)}
                              //   defaultChecked={formik.values.businessEntity?.includes("0")}
                              // defaultChecked={Array.isArray(formik?.values?.businessEntity) && formik?.values?.businessEntity?.includes("0")}
                              name="businessEntity"
                              //   onChange={e => {
                              //     if (formik.values.businessEntity) {
                              //       if (formik.values.businessEntity?.includes("0")) {
                              //         const data = formik.values.businessEntity?.filter(res => {
                              //           if (res !== "0") {
                              //             return res;
                              //           }
                              //         });
                              //         formik.setFieldValue("businessEntity", data);
                              //       } else {
                              //         formik.setFieldValue("businessEntity", [...formik.values.businessEntity, "0"]);
                              //       }
                              //     } else {
                              //       formik.setFieldValue("businessEntity", ["0"]);
                              //     }
                              //   }}
                              value="0"
                            />
                            <label
                              className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                              for="username"
                            >
                              Scope of work
                            </label>
                          </div>
                          <div className="flex">
                            <input
                              // type="radio"
                              type="checkbox"
                              //   defaultChecked={formik.values.businessEntity?.includes("1")}
                              id="html"
                              name="businessEntity"
                              onChange={(e) =>
                                setInsuranceForms(e.target.checked)
                              }
                              //   onChange={e => {
                              //     // formik.setFieldValue("businessEntity", e.target.value);
                              //     if (formik.values.businessEntity) {
                              //       if (formik.values.businessEntity?.includes("1")) {
                              //         const data = formik.values.businessEntity?.filter(res => {
                              //           if (res !== "1") {
                              //             return res;
                              //           }
                              //         });
                              //         formik.setFieldValue("businessEntity", data);
                              //       } else {
                              //         formik.setFieldValue("businessEntity", [...formik.values.businessEntity, "1"]);
                              //       }
                              //     } else {
                              //       formik.setFieldValue("businessEntity", ["1"]);
                              //     }
                              //   }}
                              value="1"
                            />
                            <label
                              className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                              for="username"
                            >
                              Insurance Forms
                            </label>
                          </div>
                          <div className="flex">
                            <input
                              // type="radio"
                              type="checkbox"
                              //   defaultChecked={formik.values.businessEntity?.includes("2")}
                              id="html"
                              name="businessEntity"
                              onChange={(e) =>
                                setPurchaseOrderNo(e.target.checked)
                              }
                              //   onChange={e => {
                              //     if (formik.values.businessEntity) {
                              //       if (formik.values.businessEntity?.includes("2")) {
                              //         formik.setFieldValue("purchaseOrderNo", "");
                              //         const data = formik.values.businessEntity?.filter(res => {
                              //           if (res !== "2") {
                              //             return res;
                              //           }
                              //         });
                              //         formik.setFieldValue("businessEntity", data);
                              //       } else {
                              //         formik.setFieldValue("businessEntity", [...formik.values.businessEntity, "2"]);
                              //       }
                              //     } else {
                              //       formik.setFieldValue("businessEntity", ["2"]);
                              //     }
                              //   }}
                              value="2"
                            />
                            <label
                              className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                              for="username"
                            >
                              Purchase Order No.
                            </label>
                          </div>
                          <div>
                            {/* {formik.values.businessEntity?.includes("2") ? (
                              <input
                                type="text"
                                name="name"
                                placeholder="Type here"
                                onChange={e => {
                                  formik.setFieldValue("purchaseOrderNo", e.target.value);
                                }}
                                defaultValue={formData?.purchaseOrderNo}
                                value={formik.values.purchaseOrderNo}
                                className="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-[109px] leading-10"
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                          <div className="flex">
                            <input
                              // type="radio"
                              type="checkbox"
                              id="html"
                              // name="checkboxName"
                              name="businessEntity"
                              onChange={(e) =>
                                setAddendumContaining(e.target.checked)
                              }
                              //   defaultChecked={formik.values.businessEntity?.includes("3")}
                              value="3"
                              //   onChange={e => {
                              //     if (formik.values.businessEntity) {
                              //       if (formik.values.businessEntity?.includes("3")) {
                              //         const data = formik.values.businessEntity?.filter(res => {
                              //           if (res !== "3") {
                              //             return res;
                              //           }
                              //         });
                              //         formik.setFieldValue("businessEntity", data);
                              //       } else {
                              //         formik.setFieldValue("businessEntity", [...formik.values.businessEntity, "3"]);
                              //       }
                              //     } else {
                              //       formik.setFieldValue("businessEntity", ["3"]);
                              //     }
                              //     // formik.setFieldValue("checkboxName", e.target.value);
                              //   }}
                            />
                            <label
                              className="text-[#344054] ml-1  text-[12px] font-medium  flex items-center"
                              for="username"
                            >
                              Addendum Containing Specific Terms and Conditions
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              // type="radio"
                              type="checkbox"
                              //   defaultChecked={formik.values.businessEntity?.includes("4")}
                              id="html"
                              // onChange={e => {
                              //   formik.setFieldValue("businessEntity", e.target.value);
                              // }}
                              // name="checkboxName"
                              onChange={(e) =>
                                setAttachedAddendumNo(e.target.checked)
                              }
                              name="businessEntity"
                              //   onChange={e => {
                              //     // formik.setFieldValue("checkboxName", e.target.checked);
                              //     if (formik.values.businessEntity) {
                              //       if (formik.values.businessEntity?.includes("4")) {
                              //         formik.setFieldValue("addendumNo", "");
                              //         const data = formik.values.businessEntity?.filter(res => {
                              //           if (res !== "4") {
                              //             return res;
                              //           }
                              //         });
                              //         formik.setFieldValue("businessEntity", data);
                              //       } else {
                              //         formik.setFieldValue("businessEntity", [...formik.values.businessEntity, "4"]);
                              //       }
                              //     } else {
                              //       formik.setFieldValue("businessEntity", ["4"]);
                              //     }
                              //   }}
                              value="4"
                            />
                            <div className="flex items-center">
                              <div>
                                <label
                                  className="text-[#344054] ml-1  text-[12px] font-medium  flex items-center"
                                  for="username"
                                >
                                  Attached Addendum No.
                                </label>
                              </div>
                              <div>
                                {/* {formik.values.businessEntity?.includes("4") ? (
                                  <input
                                    type="text"
                                    // name="checkboxName"
                                    onChange={e => {
                                      formik.setFieldValue("addendumNo", e.target.value);
                                      // alert("watch")
                                    }}
                                    defaultValue={formData?.addendumNo}
                                    value={formik.values.addendumNo}
                                    placeholder="Type here"
                                    className="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] p-[10px] placeholder:text-[#667085] placeholder:text-xs w-[109px] leading-10"
                                  />
                                ) : (
                                  ""
                                )} */}
                              </div>
                              {/* {
                                formik.values.businessEntity?.includes("4") ?
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Type here"
                                    onChange={e => {
                                      // formik.setFieldValue("purchaseOrderNo", e.target.value);
                                    }}
                                    defaultValue={formData?.purchaseOrderNo}
                                    // defaultValue={formik.values.businessEntity}
                                    className="bg-white border border-[#E4E7EC] rounded-[5px] xl:h-[2.292vw] h-[40px] xl:p-[0.625vw] ml-2 p-[10px] placeholder:text-[#667085] placeholder:text-xs w-[109px] leading-10"
                                  /> : null

                              } */}
                            </div>
                          </div>
                        </div>

                        <div className="col mt-6">
                          <label
                            className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                            for="username"
                          >
                            Notes<span className=""></span>
                          </label>
                          <input
                            onChange={(e) => {
                              setNotes(e.target.value);
                            }}
                            value={notes}
                            // onChange={e => {
                            //   formik.setFieldValue("notes", e.target.value);
                            // }}
                            type="text"
                            // defaultValue={formik.values.notes}
                            name="notes"
                            class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                            placeholder="Note"
                          />
                        </div>

                        <div className="col mt-6">
                          <label
                            className="text-[#344054] ml-1  text-[12px] font-medium  inline-block"
                            for="username"
                          >
                            Other Remarks<span className=""></span>
                          </label>
                          <input
                            onChange={(e) => {
                              setOtherRemarks(e.target.value);
                            }}
                            value={otherRemarks}
                            // onChange={e => {
                            //   formik.setFieldValue("otherRemark", e.target.value);
                            // }}
                            type="text"
                            name="otherRemark"
                            // defaultValue={formik.values.otherRemark}
                            class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                            placeholder="Other Remarks"
                          />
                        </div>

                        <div className="mt-6">
                          {initiatorDocuments.length > 0
                            ? initiatorDocuments.map((res, index) => {
                                return (
                                  // <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                                  <h5>
                                    <p
                                      className="psa-attachments-notes-remove-btn"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <a
                                        href="#"
                                        onClick={() => {
                                          res?.filepath &&
                                            OpenDocument(res?.filepath);
                                        }}
                                      >
                                        {res?.filename}{" "}
                                      </a>
                                      {
                                        <Button
                                          icon="pi pi-times"
                                          onClick={() => {
                                            onClickRemoveDoc(index);
                                            // setFileName(prev => {
                                            //   return prev.filter(res1 => {
                                            //     if (res1 != res) {
                                            //       return res1;
                                            //     }
                                            //   });
                                            // });
                                          }}
                                          rounded
                                          text
                                          severity="danger"
                                          aria-label="Cancel"
                                        />
                                      }
                                    </p>
                                  </h5>
                                  // </div>
                                );
                              })
                            : null}

                          <div class=" h-auto">
                            <>
                              <div className="border border-dashed border-gray-500 relative">
                                <input
                                  type="file"
                                  name="filename"
                                  //   ref={inputFile}
                                  class="cursor-pointer block opacity-0 w-full h-[100px] relative "
                                  style={{ zIndex: 9999999 }}
                                  multiple
                                  onChange={(e) => {
                                    uploadDocuments(e);
                                  }}
                                />
                                <div class="text-center m-auto my-5 absolute left-0 z-50 right-0 top-[3%]">
                                  <h4>
                                    Drop files anywhere to upload
                                    <br />
                                    or
                                  </h4>
                                  <p class="">Select Files</p>
                                </div>
                              </div>

                              <div className="text-center m-auto mt-[20px] h-[100px] overflow-auto">
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 xl:gap-[0.250vw]">
                                  {/* {fileName.length > 0 &&
                                    fileName.map(res => (
                                      <p className="psa-attachments-notes-remove-btn text-[12px] h-[30px]">
                                        {res}{" "}
                                        {
                                          <Button
                                            icon="pi pi-times"
                                            onClick={() => {
                                              setFileName(prev => {
                                                return prev.filter(res1 => {
                                                  if (res1 != res) {
                                                    return res1;
                                                  }
                                                });
                                              });



                                              setDocList(prev => {
                                                return prev.filter(res1 => {
                                                  if (res1.filename != res) {
                                                    return res1;
                                                  }
                                                });
                                              });


                                            }}
                                            rounded
                                            text
                                            severity="danger"
                                            aria-label="Cancel"
                                          />
                                        }
                                      </p>
                                    ))} */}
                                </div>
                              </div>
                            </>
                          </div>
                        </div>

                        <div className="col mt-6"></div>

                        <div className="bottom-0 right-0 left-0 grid grid-cols-2 mt-[60px] xl:mt-[4.083vw]">
                          <div>
                            <a
                              href="#"
                              onClick={() => {
                                setShowPreviewPopUp(false);
                                SetBasicInfoPopUp(true);
                                setPartyDetailesPopUp(false);
                                SetAttchmentAndDetailes(false);
                                SetTermsAndConditions(false);
                                SetW9Detailes(false);
                                setEddDetailes(false);
                              }}
                              className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i className="gusd-arrow-line-right mr-1"></i>
                              Previous
                            </a>
                          </div>
                          <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                            <button
                              onClick={saveBasicInfo}
                              // href="javascript:void(0);"
                              //   ref={saveBtnRef}
                              //   onClick={() => {
                              // saveBtnRef.current.disabled = true;
                              // formik.handleSubmit();
                              /*  setTimeout(() => {
                                   saveBtnRef.current.disabled = false;
                                 }, 5000); */
                              // saveBasicInfo('save');
                              //   }}
                              className="flex items-center text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i
                                className="pi pi-save mr-1"
                                style={{ fontSize: "0.8rem" }}
                              ></i>
                              Save
                            </button>
                            {/* {showPreviewPopUp ? (
                              <a
                                href="#"
                                onClick={() => {
                                  formik.handleSubmit();
                                  saveBasicInfo();
                                  setConfirmVisible2(true);
                                }}
                                className="flex text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Submit
                              </a>
                            ) : (
                              <a
                                href="#"
                                onClick={() => {
                                  const dummFormData = {
                                    ...formData,
                                    ...formik.values,
                                  };
                                  setFormData(dummFormData);
                                  // formik.handleSubmit()
                                  setShowPreviewPopUp(false);
                                  SetBasicInfoPopUp(false);
                                  setPartyDetailesPopUp(isEdit ? true : false);
                                  SetAttchmentAndDetailes(false);
                                  SetTermsAndConditions(!isEdit ? true : false);
                                  SetW9Detailes(false);
                                  setEddDetailes(false);
                                }}
                                className="flex items-center text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Next
                              </a>
                            )} */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {termsAndConditions === true ? (
                      <div className="relative custHeightTermsAndConditions">
                        <div className="card termsandcondition psascroll">
                          <TabView>
                            <TabPanel header="Terms & Conditions">
                              <PsaTermsAndConditions
                                TandC="true"
                                setShowPreviewPopUp={setShowPreviewPopUp}
                                SetBasicInfoPopUp={SetBasicInfoPopUp}
                                setPartyDetailesPopUp={setPartyDetailesPopUp}
                                SetAttchmentAndDetailes={
                                  SetAttchmentAndDetailes
                                }
                                SetTermsAndConditions={SetTermsAndConditions}
                                SetW9Detailes={SetW9Detailes}
                                setEddDetailes={setEddDetailes}
                                SetTermsAndConditionsCheck={
                                  SetTermsAndConditionsCheck
                                }
                                // handleTermsCondition={handleTermsCondition}

                                // checkbox={checkbox}
                              />
                            </TabPanel>
                            <TabPanel header="Supplemental Agreement">
                              <PsaTermsAndConditions supplimentAndAgreement="true" />
                            </TabPanel>
                            <TabPanel header="Hold Harmless and Indemnification Agreement">
                              <PsaTermsAndConditions HoldHarmlessAndIden="true" />
                            </TabPanel>
                            <TabPanel header="Retirement Status Statement">
                              <PsaTermsAndConditions retiretmentStatus="true" />
                            </TabPanel>
                            <TabPanel header="Certification Regarding Governor  Executive order N-6-22">
                              <PsaTermsAndConditions certificationRegarding="true" />
                            </TabPanel>
                            <TabPanel header="EDD & W9 Details">
                              <PsaTermsAndConditions eddw9="true" />
                            </TabPanel>
                          </TabView>
                        </div>
                      </div>
                    ) : null}
                    {eddDetailes === true ? (
                      <div>
                        <div className="text-[#000000] font-medium xl:text-[1.406vw] text-[24px]">
                          Routing
                        </div>
                        <form>
                          <div className="mt-2 grid grid-cols-1 gap-8 clearicons">
                            <div className="space-y-[20px]">
                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Budget Clerk :
                                </label>
                                <div className="relative">
                                  <div className="absolute left-3 top-2 z-10">
                                    <i className="gusd-user text-[#344054]"></i>
                                  </div>
                                  {/*<input value={selectedItem}  onChange={handleKeyUp} class="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" /> */}
                                  <Dropdown
                                    id="dept"
                                    // value={selectedFirstApprover}
                                    // value={
                                    //   formik.values.budgetClerk ? formik.values.budgetClerk : selectedFirstApprover
                                    // }
                                    // value={{
                                    //   code: "c7eea0c2-9c89-46e7-b297-5e077767585b",
                                    //   email: "aghate@hexalytics.com",
                                    //   name: "Abhishek Ghate (PA0001)",
                                    //   role: "Payroll"
                                    // }}
                                    value={budgetClerk}
                                    onChange={(e) => {
                                      setBudgetClerk(e.value);
                                    }}
                                    // onChange={e => {
                                    //   formik.setFieldValue("budgetClerk", e.value);
                                    //   setSelectedFirstApprover(e.value);
                                    // }}
                                    filter
                                    name="budgetClerk"
                                    // onKeyDown={e => {
                                    //   setApproverList(e);
                                    // }}
                                    // valueTemplate={selectedCountryTemplate}
                                    // valueTemplete={valueTemplate}
                                    // disabled={isEmpDisable ? isEmpDisable : disabled}
                                    placeholder="Type to Search"
                                    // options={allApproverList.length > 0 ? allApproverList : userData}
                                    optionLabel="employee_name"
                                    options={employeeList}
                                    // name="budgetClerk"
                                    className="w-full h-11 rounded-lg border border-[#E4E7EC] pl-5"
                                    style={{
                                      fontSize: "0.875rem",
                                      color: "#667085",
                                      fontWeight: "400",
                                    }}
                                  />

                                  {/* <AutoComplete
                                    value={budgetClerk}
                                    inputClassName={"custom-autocomplete-input"}
                                    className="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none"
                                    type="search"
                                    name="search"
                                    placeholder="Search"
                                    suggestions={items}
                                    completeMethod={handleKeyUp}
                                    onChange={e => setBudgetClerk(e.value)}
                                  />
                                  <div className="absolute right-3 bottom-2">
                                    <i className="gusd-search"></i>
                                  </div> */}
                                </div>
                              </div>
                              {/* add budget manager start */}

                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Budget manager :
                                </label>
                                <div className="relative">
                                  <div className="absolute left-3 top-2 z-10">
                                    <i className="gusd-user text-[#344054]"></i>
                                  </div>
                                  <Dropdown
                                    id="dept"
                                    showClear
                                    value={budgetmanager}
                                    onChange={(e) => {
                                      setBudgetmanager(e.value);
                                    }}
                                    // value={
                                    //   formik.values.budgetManager ? formik.values.budgetManager : selectedBudgetManagerApprover
                                    // }
                                    // onChange={e => {
                                    //   formik.setFieldValue("budgetManager", e.value);
                                    //   setSelectedBudgetManagerApprover(e.value);
                                    // }}
                                    filter
                                    optionLabel="employee_name"
                                    options={employeeList}
                                    name="budgetManager"
                                    // onKeyDown={e => {
                                    //   setApproverList(e);
                                    // }}
                                    // disabled={formik.values.budgetClerk ? false : true}
                                    placeholder="Select Budget Manager"
                                    // options={allApproverList.length > 0 ? allApproverList : userData}
                                    // optionLabel="name"
                                    className="w-full h-11 rounded-lg border border-[#E4E7EC] pl-5"
                                    style={{
                                      fontSize: "0.875rem",
                                      color: "#667085",
                                      fontWeight: "400",
                                    }}
                                  />
                                </div>
                              </div>
                              {/* add budget manager end */}

                              {/* <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  HR Consultant Clearance Verification :<span className="text-[red] pl-0.2">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute left-3 top-2 z-10">
                                    <i className="gusd-user text-[#344054]"></i>
                                  </div>
                                 
                                  <Dropdown
                                    id="dept"
                                    value={
                                      formik.values.hrConsultant ? formik.values.hrConsultant : selectedSecondApprover
                                    }
                                    // showClear
                                    onChange={e => {
                                      formik.setFieldValue("hrConsultant", e.value);
                                      setSelectedSecondApprover(e.value);
                                    }}
                                    filter
                                    onKeyDown={e => {
                                      setApproverList(e);
                                    }}
                                    // disabled={isEmpDisable ? isEmpDisable : disabled}
                                    options={allApproverList.length > 0 ? allApproverList : userData}
                                    optionLabel="name"
                                    placeholder="Type to Search"
                                    name="hrConsultant"
                                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                                    style={{ fontSize: "0.875rem", color: "#667085", fontWeight: "400" }}
                                  />

                                 
                                </div>
</div>*/}

                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Executive Approver (After Board Approval) :
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute left-3 top-2 z-10">
                                    <i className="gusd-user text-[#344054]"></i>
                                  </div>
                                  {/*<input class="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" /> */}
                                  <Dropdown
                                    showClear
                                    id="dept"
                                    name="executive"
                                    optionLabel="employee_name"
                                    options={employeeList}
                                    value={executiveApprover}
                                    onChange={(e) => {
                                      setExecutiveApprover(e.value);
                                    }}
                                    // value={formik.values.executive ? formik.values.executive : selectedThirdApprover}
                                    // onChange={e => {
                                    //   formik.setFieldValue("executive", e.value);
                                    //   setSelectedThirdApprover(e.value);
                                    // }}
                                    filter
                                    // onKeyDown={e => {
                                    //   setApproverList(e);
                                    // }}
                                    // disabled={isEmpDisable ? isEmpDisable : disabled}
                                    // options={allApproverList.length > 0 ? allApproverList : userData}
                                    // showClear
                                    // optionLabel="name"
                                    placeholder="Type to Search"
                                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                                    style={{
                                      fontSize: "0.875rem",
                                      color: "#667085",
                                      fontWeight: "400",
                                    }}
                                  />
                                  {/* <AutoComplete
                                    value={executiveApprover}
                                    inputClassName={"custom-autocomplete-input"}
                                    className="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none"
                                    type="search"
                                    name="search"
                                    placeholder="Search"
                                    suggestions={items}
                                    completeMethod={handleKeyUp}
                                    onChange={e => setExecutiveApprover(e.value)}
                                  />
                                  <div className="absolute right-3 bottom-2">
                                    <i className="gusd-search"></i>
                                  </div> */}
                                </div>
                              </div>

                              <div className="col ">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  HR Executive Secretary :
                                  <span className="text-[red] pl-0.2">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute left-3 top-2 z-10">
                                    <i className="gusd-user text-[#344054]"></i>
                                  </div>
                                  {/* <input class="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" /> */}
                                  <Dropdown
                                    showClear
                                    id="dept"
                                    name="hrexecutive"
                                    optionLabel="employee_name"
                                    options={employeeList}
                                    value={hrExecutive}
                                    onChange={(e) => {
                                      setHRExecutive(e.value);
                                    }}
                                    // value={formik.values.hrexecutive ? formik.values.hrexecutive : selectedPayroll}
                                    // onChange={e => {
                                    //   formik.setFieldValue("hrexecutive", e.value);
                                    //   setSelectedPayroll(e.value);
                                    //   formik.setFieldValue("hrConsultant", e.value);
                                    //   setSelectedSecondApprover(e.value);
                                    // }}
                                    filter
                                    // onKeyDown={e => {
                                    //   setApproverList(e);
                                    // }}
                                    // disabled={isEmpDisable ? isEmpDisable : disabled}
                                    // options={allApproverList.length > 0 ? allApproverList : userData}
                                    // optionLabel="name"
                                    placeholder="Type to Search"
                                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                                    style={{
                                      fontSize: "0.875rem",
                                      color: "#667085",
                                      fontWeight: "400",
                                    }}
                                  />
                                  {/* <AutoComplete
                                    value={hrSecreatary}
                                    inputClassName={"custom-autocomplete-input"}
                                    className="border border-[#E4E7EC] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none"
                                    type="search"
                                    name="search"
                                    placeholder="Search"
                                    suggestions={items}
                                    completeMethod={handleKeyUp}
                                    onChange={e => setHrSecreatary(e.value)}
                                  />
                                  <div className="absolute right-3 bottom-2">
                                    <i className="gusd-search"></i>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col">
                                <label
                                  className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                                  for="username"
                                >
                                  Submit Completed form to :
                                  <span className=""></span>
                                </label>
                                <div className="">
                                  <input
                                    value={submitCompleted}
                                    onChange={(e) => {
                                      setSubmitCompleted(e.target.value);
                                    }}
                                    // value={formik.values.submittedCompletedFormTo}
                                    // onChange={e => {
                                    //   formik.setFieldValue("submittedCompletedFormTo", e.target.value);
                                    // }}
                                    name="submittedCompletedFormTo"
                                    class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]"
                                    placeholder="Type here"
                                  />
                                </div>
                              </div>
                              {/* <div className='col '>
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Submit Completed form to :<span className='text-[red] pl-0.2'>*</span></label>
                                  <div className="relative">
                                  <div className="absolute left-3 top-2 z-10"><i className="gusd-user"></i></div>
                                  <input class="border border-[#E4E7EC text-[#344054]] bg-white h-10 px-5 pl-10 pr-16 w-full rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                                  <div className="absolute right-3 bottom-2"><i className="gusd-search"></i></div>
                                  </div>
                                  </div> */}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 mt-[5vw]  xl:mt-[2.083vw]">
                            <div>
                              <a
                                href="#"
                                // onClick={() => {
                                //   setShowPreviewPopUp(false);
                                //   SetBasicInfoPopUp(false);
                                //   setPartyDetailesPopUp(false);
                                //   SetAttchmentAndDetailes(false);
                                //   SetTermsAndConditions(true);
                                //   SetW9Detailes(false);
                                //   setEddDetailes(false);
                                // }}
                                className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                              >
                                <i className="gusd-arrow-line-right mr-1"></i>
                                Previous
                              </a>
                            </div>
                            <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                              <button
                                // ref={saveBtnRef}
                                type="button"
                                // onClick={() => {
                                //   saveBtnRef.current.disabled = true;
                                //   // formik.handleSubmit();
                                //   // setShowNextPopUp(false);
                                //   const dummFormData = { ...formData, ...formik.values };
                                //   saveBasicInfo("routing", dummFormData);
                                //   // setShowPreviewPopUp(false);
                                //   /*  setTimeout(() => {
                                //      saveBtnRef.current.disabled = false;
                                //    }, 2000); */
                                // }}
                                // href="javascript:void(0);"
                                className="flex items-center text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                              >
                                <i
                                  className="pi pi-save mr-1"
                                  style={{ fontSize: "0.8rem" }}
                                ></i>
                                Save
                              </button>
                              {/* {showPreviewPopUp ? ( */}
                              {/* <a
                                  href="#"
                                //   onClick={() => {
                                //     saveBasicInfo();
                                //     setConfirmVisible2(true);
                                //     // setShowPreviewPopUp(true)
                                //   }}
                                  className="flex items-center text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                                >
                                  <i className="gusd-check mr-1"></i>Submit
                                </a> */}
                              {/* ) : ( */}
                              <a
                                href="#"
                                onClick={handleRouting}
                                //   onClick={() => {
                                //     const dummFormData = { ...formData, ...formik.values };
                                //     setFormData(dummFormData);
                                //     const isRoutingInfoValid = routingValidation(dummFormData);
                                //     if (isRoutingInfoValid) {
                                //       setShowPreviewPopUp(true);
                                //       SetBasicInfoPopUp(false);
                                //       setPartyDetailesPopUp(false);
                                //       SetAttchmentAndDetailes(false);
                                //       SetTermsAndConditions(false);
                                //       SetW9Detailes(false);
                                //       setEddDetailes(false);
                                //       SetPreviewAndEdit(true);
                                //     }
                                //   }}
                                className="flex items-center text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Next
                              </a>
                              {/* )} */}
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : null}
                    {w9Detailes === true ? (
                      <div>
                        <div className="text-[24px] xl:text-[1.250vw] font-medium">
                          W9 Details
                        </div>
                        {/* <Image src={w9DetailesPic} imageClassName='ml-6' alt="user" width="550" height="370" /> */}
                        <div className="w-full flex justify-center text-[#101828] text-[16px] mt-4">
                          Department of the Treasury Internal Revenue Service
                        </div>
                        <div className="grid grid-cols-2 mt-[6vw]">
                          <div>
                            <a
                              href="#"
                              onClick={() => {
                                setShowPreviewPopUp(false);
                                SetBasicInfoPopUp(false);
                                setPartyDetailesPopUp(false);
                                SetAttchmentAndDetailes(false);
                                SetTermsAndConditions(false);
                                SetW9Detailes(false);
                                setEddDetailes(true);
                              }}
                              className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i className="gusd-arrow-line-right mr-1"></i>
                              Previous
                            </a>
                          </div>
                          <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                            <a
                              // onClick={() => {
                              //   setShowNextPopUp(false);
                              // }}
                              href="javascript:void(0);"
                              className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#26be13] hover:bg-[#23a512] border border-[#26be13] hover:border-[#23a512] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                            >
                              <i
                                className="pi pi-save mr-1"
                                style={{ fontSize: "0.8rem" }}
                              ></i>
                              Save
                            </a>
                            {showPreviewPopUp ? (
                              <a
                                href="#"
                                onClick={() => {
                                  // saveBasicInfo();
                                  // setConfirmVisible2(true)
                                  // // setShowPreviewPopUp(true)
                                }}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-check mr-1"></i>Submit
                              </a>
                            ) : (
                              <a
                                href="#"
                                onClick={() => {
                                  setShowPreviewPopUp(true);
                                  SetBasicInfoPopUp(false);
                                  setPartyDetailesPopUp(false);
                                  SetAttchmentAndDetailes(false);
                                  SetTermsAndConditions(false);
                                  SetW9Detailes(false);
                                  setEddDetailes(false);
                                }}
                                className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                              >
                                <i className="gusd-eye mr-1"></i>Preview
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {previewAndEdit === true ? (
                      <div className="">
                        <div class="text-[#000000] font-medium xl:text-[1.406vw] text-[24px]">
                          Preview &amp; Edit
                        </div>
                        <div class="flex  justify-end xl:mt-[1.667vw] mt-[28px]">
                          <div class="bg-[#EFF8FF] border border-[#EFF8FF] rounded-lg text-[#113699] font-medium text-sm py-[6px] px-3 flex items-center space-x-2 cursor-pointer">
                            <i class="Icon01 uploading_blue"></i>
                            <span>Export Pdf</span>
                          </div>
                        </div>
                        <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]">
                          {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                          <PsaPdf
                            agreementDate="26/09/98"
                            partyName="BlueOrbit"
                            amount="2016"
                            services="lunch dinner free"
                            effectiveDate="02/09/1998"
                            expirationDate="06/09/1998"
                            typeOfBusinessEntityAandN="Insaurance Form"
                            submittedTo="30/06/2023"
                            referenceNo="33"
                            // PSA Consultant details
                            typeOfBusinessEntityPartyDetails="Individual"
                            licenseNumber="LE02145"
                            addressPSa="USA"
                            psaDate="03/25/2024"
                            contactNumber="9823456988"
                            fax="66665"
                            //Tax Identification Details
                            socialSecurityNumber="30"
                            employerIdentification="This is Employer Identification"
                            //Gusd Detailes
                            gusdDate="02/12/2023"
                            accountNumber="98745211"
                            dateOfBoardMeeting="26/09/98"
                            BoardItem="Board"
                            pageItem="page"
                            superintendentAssistent="Mahesh"
                          />
                        </div>
                        <div className="">
                          <div className="grid grid-cols-2">
                            <div>
                              <a
                                href="#"
                                onClick={() =>
                                  showPreviewPopUp
                                    ? setShowPreviewPopUp(false)
                                    : null
                                }
                                className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                              >
                                <i className="gusd-arrow-line-right mr-1"></i>
                                Previous
                              </a>
                            </div>
                            <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                              <a
                                // onClick={() => {
                                //   setShowNextPopUp(false);
                                // }}
                                href="javascript:void(0);"
                                className="flex items-center text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"
                              >
                                <i
                                  className="pi pi-save mr-1"
                                  style={{ fontSize: "0.8rem" }}
                                ></i>
                                Save
                              </a>
                              {showPreviewPopUp ? (
                                <a
                                  href="#"
                                  onClick={() => {
                                    submitData;
                                    saveBasicInfo();
                                    setConfirmVisible2(true);
                                    // setShowPreviewPopUp(true)
                                  }}
                                  className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                                >
                                  <i className="gusd-check mr-1"></i>Submit
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  onClick={() => {
                                    //first we check mandatory fields are filled or not

                                    if (selectedEmployee === null) {
                                      toast.error("Please Select Employee Id");
                                      return;
                                    } else if (schoolSelect === "") {
                                      toast.error(
                                        "Please Select Assignment At"
                                      );
                                      return;
                                    } else if (assighnmentTitle === "") {
                                      toast.error(
                                        "Please enter Assighment Title"
                                      );
                                      return;
                                    } else if (startDate === null) {
                                      toast.error("Please enter From Date");
                                      return;
                                    } else if (endDate === null) {
                                      toast.error("Please enter To Date");
                                      return;
                                    } else if (subjectCode === null) {
                                      toast.error("Please enter To Date");
                                      return;
                                    }

                                    // setShowPreviewPopUp(true)
                                  }}
                                  className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "
                                >
                                  <i className="gusd-check mr-1"></i>Next
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {termsAndConditions === true ? (
                    <div className="bg-white py-5 px-2">
                      <div className="absolute bottom-5 right-10 left-10 grid grid-cols-2  ">
                        {/* <div>
                              <a href="#" onClick={() => {
                                setShowPreviewPopUp(false); SetBasicInfoPopUp(false); setPartyDetailesPopUp(false); SetAttchmentAndDetailes(true); SetTermsAndConditions(false); SetW9Detailes(false); setEddDetailes(false)
                              }} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                           
                            </div> */}
                        <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                          {/* <a

                                href="javascript:void(0);" className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#26be13] hover:bg-[#23a512] border border-[#26be13] hover:border-[#23a512] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                              {
                                (showPreviewPopUp) ?
                                  <a href="#" onClick={() => {
                                    saveBasicInfo();
                                    setConfirmVisible2(true)
                                  }
                                  } className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                    <i className='gusd-check mr-1'></i>Submit</a> :

                                  <a href="#" onClick={() => {
                                    setShowPreviewPopUp(false); SetBasicInfoPopUp(false); setPartyDetailesPopUp(false); SetAttchmentAndDetailes(false); SetTermsAndConditions(false); SetW9Detailes(false); setEddDetailes(true)
                                  }} className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                    <i className='gusd-check mr-1'></i>Next</a> */}
                          {/* } */}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* confirmation dialog */}

                {/* <Dialog header="" visible={confirmVisible2} style={{ width: '30vw' }} onHide={() => { setConfirmVisible2(false); setVisibleEdit(false); }} footer={footerContent1}>
                    <p className="m-0 text-[#0487C8]">
                      <i className='pi pi-check-circle mr-2'></i>
                      <span className='font-medium text-[18px]'>This report Has been Successfully  Created</span>
                    </p>
                  </Dialog> */}

                <div className="col-span-12 lg:col-span-3 sideBarRight openSideDiv">
                  <div className="h-full relative">
                    <div className="text-[24px] xl:text-[1.250vw] font-medium">
                      Employee Details
                    </div>
                    <div className="mt-[15px] lg:mt-[32px] xl:[1.667vw]">
                      {selectedEmployee ? (
                        <div className="bg-[#D8E7FC] border border-[#D8E7FC] grid grid-cols-12 gap-4">
                          <Avatar
                            className="col-span-3"
                            image="/images/avatar/amyelsner.png"
                            size="xlarge"
                            shape="circle"
                          />
                          <div className="col-span-7">
                            <label
                              className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block"
                              for="username"
                            >
                              Name
                            </label>
                            <div className="text-[#101828] text-[12px] font-medium">
                              {selectedEmployeeDetails.employee_name}
                            </div>
                          </div>
                          <i className="gusd-edit col-span-2"></i>
                        </div>
                      ) : null}

                      <div className="absolute bottom-[20px] left-0 right-0 xl:bottom-[2.083vw] -z-[1]">
                        {/* <img src={empDetailsImg} class=" mx-auto" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Psapopup;
