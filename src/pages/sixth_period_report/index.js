import { Image } from 'primereact/image';
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { MyAccountTable } from '../../../components/service/myaccounttable';
import { DataTable } from 'primereact/datatable';
// import { ValidateInitiatorRole, } from '../../../helper/validateRole';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Tag } from 'primereact/tag';
// import sideBarRight from "../../../assets/images/sidebarright.svg"
// import user1 from "../../../assets/images/user1.svg"
// import user2 from "../../../assets/images/user2.svg"
// import Editpopup from "../../../components/popup/editpopup";
import { Dialog } from "primereact/dialog";
// import LoginSixPeriod from '../../../setup/auth/login_for_sixth_period.component';
// import Login from '../../../setup/auth/login.component';
// import sidebar from "../../../assets/images/sidebarright.svg"
import { Dropdown } from 'primereact/dropdown';
// import pdfImage from '../../../assets/images/pdfImage.png'
// import pdfImageForEdit from '../../../assets/images/pdfImageForEdit.png';
// import pdfImageReport from '../../../assets/images/pdfImageReport.png';
import { Avatar } from 'primereact/avatar';
// import { ConvertResponseForSelectWithRefCodedropdown, ConvertResponseForSelect } from '../../../helper/commonfunctions';
// import {
//   InitiateClassifiedWeeklyAbsenceReport, InitiateClassifiedWeeklyAbsenceReportEmployee, InitiateClassifiedWeeklyAbsenceReportEmployeeDetails, InitiateClassifiedWeeklyAbsenceReportStatus, Employee, Schools, Subject,
//   SixthPeriodAssignmentInitiateReport,
//   SixthPeriodReportTransactionCycle,
import ReactFullscreen from 'react-easyfullscreen';
// } from "../../../models";

import moment from "moment";
import Link from "next/link";
// import { GetValueFromArray } from "../../../helper/commonfunctions";
import { Calendar } from 'primereact/calendar';

// import empDetailsImg from 'assets/images/applicationImg.png';
// import empDetailsImg from '../../../assets/images/applicationImg.png';
import { toast } from 'react-toastify';
// import { Request_Status } from '../../../helper/enum';
import { reactLocalStorage } from 'reactjs-localstorage';
// import HtmlToPdf from '../../../components/HtmlToPdf';
import { TabPanel, TabView } from 'primereact/tabview';
import { USER_TYPES, USER_TYPES_NAMES } from '@/helper/enum';
import HtmlToPdf from '@/components/HtmlToPdf';
import Layout from '@/components/layout/layout';
import { ValidateInitiatorRole } from '@/components/helper/validateRole';
import Editpopup from '@/components/popup/editpopup';
import { Timeline } from 'primereact/timeline';
import EyePopup from '@/components/popups/eyePopup';
import HtmlToPdfSix from './htmlToPdf';
import BasicInfo from './basicInfo';
import SixPeriodPDF from '@/components/reportpdftemplate/sixPeriodPDF';

export default function SixthPeriodInitiatorReportList() {

  //states start
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [empCodeList, setEmpCodeList] = useState([]);
  const [specificReportDetailsView, setSpecificReportDetailsView] = useState([]);
  const [specificReportDetailsEdit, setSpecificReportDetailsEdit] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);

  const [initiatorReportList, setInitiatorReportList] = useState([]);
  //states end

  const [fullViewEdit, setFullViewEdit] = useState(false);
  const [fullViewForView, setFullViewForView] = useState(false);

  const [visibleCreteReportPopup, setVisibleCreteReportPopup] = useState(false);
  const [showNextPopUp, setShowNextPopUp] = useState(false);
  const [confirmVisible2, setConfirmVisible2] = useState(false);
  const [showPreviewPopUp, setShowPreviewPopUp] = useState(false);
  const [groupName, setGroupName] = useState();
  const [accountCharge, setAccountCharged] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [totalStaffingAllocationectedRole, setTotalStaffingAllocation] = useState('');
  let [userList, setUserList] = useState([]);
  const [subjectCode, setSubjectCodeList] = useState(null);


  console.log('subjectCode:-', subjectCode)

  //------------

  const [value, setValue] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [fteUtilized, setFteUtilized] = useState('');
  const [checked, setChecked] = useState(false);
  const [myaccountt, setProducts] = useState([]);
  const [isAuthenticated, userHasAuthenticated] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [visibleRight, setVisibleRight] = useState(false);

  const [weeklyAbsenceReports, setWeeklyAbsenceReports] = useState();
  const [weeklyAbsenceReportSubmitted, setWeeklyAbsenceReportSubmitted] = useState();
  const [weeklyAbsenceReportApproved, setWeeklyAbsenceReportApproved] = useState();
  const [weeklyAbsenceReportRejected, setWeeklyAbsenceReportRejected] = useState();
  const [weeklyAbsenceReportPending, setWeeklyAbsenceReportPending] = useState();
  const [activate, setActivate] = useState("");

  const footerContent = (
    <div className='text-center'>
      <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible(false); setVisibleEdit(false) }}>Close</button>
    </div>
  );
  const footerContent1 = (
    <div className='text-center'>
      <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible2(false); setShowNextPopUp(false); setVisibleCreteReportPopup(false); setShowPreviewPopUp(false); }}>Close</button>
    </div>
  );
  //_____popup
  const events = [
    {
      status: "Rejected",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "Approved",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
  ];

  const approveStatusOptions = (product) => {
    switch (product.status) {
      case "Rejected":
        return "danger";

      case "APPROVAL_REJECTED":
        return "danger";

      case "Completed":
        return "success";

      case "Pending":
        return "warning";

      case "Closed":
        return "success";
      case "OPEN":
        return "info";
      case "Approved":
        return "success";

      case "APPROVAL_ACCEPTED":
        return "success";

      case "RESUBMITTED":
        return "info";

      case "SUBMITTED":
        return "info";

      case "Submitted":
        return "info";

      case "Reviewed & resubmitted":
        return "info";

      default:
        return null;
    }
  };

  //*state
  const [reportId, setReportId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [schoolList, setSchoolList] = useState('');
  const [schoolSelect, setSelectedSchool] = useState('');

  console.log("schoolSelect:-", schoolSelect)

  //*List
  const [employeeList, setEmployeeList] = useState([]);
  const [reportEmployeeList, setReportEmployeeList] = useState([]);
  const [users, SetUsersList] = useState([]);
  const [absentCodeListDropdown, setSubjectListDropdown] = useState();
//   const loggedUserId = reactLocalStorage.get('loggedUserId');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [assighnmentTitle, setAssighnmentTitle] = useState('');
  const currentDateTime = moment();

  console.log("startDate:-", typeof moment(startDate).format("YYYY-DD-MM"))

  const data = [
    {
      sLNo: "1",
      assignmentTitle: "Test 1 ",
      dates: "2023/08/9",
      submittedOn: "20223/09/09",
      noOfsubstitute: "09",
      status: "pending",
      asignee: "GUSD",
      remark: "-",
      action: "",
    },
    {
      sLNo: "2",
      assignmentTitle: "Test 2",
      dates: "2023/08/9",
      submittedOn: "20223/09/09",
      noOfsubstitute: "90",
      status: "Rejected",
      asignee: "GUSD",
      remark: "-",
      action: "",
    },
  ];
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };
  const superAdminActions = (row) => {
    return [
      <>
        <Link
          href="#"
          className="py-2 px-2.5"
          onClick={() => {
            setVisible(true);
          }}
        >
          <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
        </Link>
        <Link
          href="/sixth_period_report/initiateNewReport"
          className="py-2 px-2.5"
        >
          {/* <BasicInfo/> */}
          <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
        </Link>
      </>,
    ];
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  const tableData = [
    {
        sLNo: "1",
        assignmentTitle: "Test 1 ",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "09",
        inventoryStatus: "Pending",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Rejected",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Submitted",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Reviewed & Resubmitted",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Approved",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Rejected",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Submitted",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Reviewed & Resubmitted",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
    {
        sLNo: "2",
        assignmentTitle: "Test 2",
        dates: "2023/08/9",
        submittedOn: "20223/09/09",
        noOfsubstitute: "90",
        inventoryStatus: "Approved",
        asignee: "GUSD",
        remark: "-",
        action: "",
    },
];
  const statusBodyTemplate = (product) => {
    return <Tag value={product.inventoryStatus} severity={getSeverityy(product)}></Tag>;
};
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "pending",
  ]);
  const getSeverityy = (product) => {
    switch (product.inventoryStatus) {
        case 'Approved':
            return 'success';

        case 'Pending':
            return 'warning';

        case 'Rejected':
            return 'danger';
        
        case 'Submitted':
            return 'Submitted';

        case 'Reviewed & Resubmitted':
            return 'Review';

        default:
            return null;
    }
};
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'Approved':
            return 'success';

        case 'Pending':
            return 'warning';

        case 'Rejected':
            return 'danger';
        
        case 'Submitted':
            return 'Submitted';

        case 'Reviewed & Resubmitted':
            return 'Review';

        default:
            return null;
    }
};
  const TaskStatusSL = (product) => {
    switch (product.status) {
      case 'Reviewed & resubmitted':
        return 'info';

      case 'Rejected':
        return 'danger';

      case 'Pending':
        return 'warning';

      case 'Submitted':
        return 'info';

      case 'Approved':
        return 'success';

      case 'Approved (P)':
        return 'success';

      default:
        return null;
    }
  };

  const approvalStatusBody = product => {
    return <Tag value={product.status} severity={approveStatusOptions(product)}></Tag>
  };

  const TaskStatusSLA = (product) => {
    // console.log("product", product.status);
    return <Tag value={product.status} severity={TaskStatusSL(product)}></Tag>;
  };
  const alljobactionContent = (row) => {
    return (
      <div className="flex justify-center w-full gap-2" >

        {
          row.status === "Submitted" ? <Link href='#' className="py-2 px-2.5" onClick={() => onClickViewPopup(row, 'right')}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
            row.status === "Approved" ? <Link href='#' className="py-2 px-2.5" onClick={() => onClickViewPopup(row, 'right')}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
              row.status === "Reviewed & resubmitted" ? <Link href='#' className="py-2 px-2.5" onClick={() => onClickViewPopup(row, 'right')}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
                <Link href='#' className="py-2 px-2.5"
                  onClick={() =>
                    onClickEditPopUp(row)
                  }><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link>
        }
      </div>
    );
  };

  //* onclick view popup
  const onClickViewPopup = async (requestData, position) => {
    setPosition(position);
    setVisible(true);

    //set Data for View Popup
    let obj = {
      employee_id: requestData.employee_id,
      assighment_at: requestData.assighment_at,
      from_date: requestData.from_date,
      to_date: requestData.to_date,
      subject_area: requestData.subject_area,
      total_staffing_allocation: requestData.total_staffing_allocation,
      account_charged: requestData.account_charged,
      current_fte_utilized: requestData.current_fte_utilized,
    }
    setSpecificReportDetailsView(obj);
  }

  const onClickEditPopUp = async (requestData) => {
    setVisibleEdit(true)

    //set Data for View Popup
    let obj = {
      employee_id: requestData.employee_id,
      assighment_at: requestData.assighment_at,
      from_date: requestData.from_date,
      to_date: requestData.to_date,
      subject_area: requestData.subject_area,
      total_staffing_allocation: requestData.total_staffing_allocation,
      account_charged: requestData.account_charged,
      current_fte_utilized: requestData.current_fte_utilized,
    }
    setSpecificReportDetailsEdit(obj);

  }

  const toggleActive = () => {
    setActivate(activate === "actives" ? "" : "actives");
  };

  async function onLoad() {
    try {
      await Auth.currentSession();
      if (!ValidateInitiatorRole()) { userHasAuthenticated(false); }
    } catch (e) {
      userHasAuthenticated(false);
    }
  }

  const saveBasicInfo = async (type) => {

    if (selectedEmployee === null) { toast.error('Please Select Employee Id'); return; }
    else if (schoolSelect === '') { toast.error('Please Select Assignment At'); return; }
    else if (assighnmentTitle === '') { toast.error('Please enter Assighment Title'); return; }
    else if (startDate === null) { toast.error('Please enter From Date'); return; }
    else if (endDate === null) { toast.error('Please enter To Date'); return; }
    else if (subjectCode === null) { toast.error('Please enter To Date'); return; }

    var updatedSchoolId;

    //Save Basic Info

    //check type
    if (type === 'save') {

      //first save report in SixthPeriodAssignmentInitiateReport table
      var newSixthPeriodAssignmentInitiateReport = await DataStore.save(new SixthPeriodAssignmentInitiateReport({
        "assignment_title": assighnmentTitle,
        "employee_id": selectedEmployee.code,
        "assighment_at": schoolSelect.name,
        "from_date": moment(startDate).format("YYYY-MM-DD"),
        "to_date": moment(endDate).format("YYYY-MM-DD"),
        "subject_area": subjectCode.name,
        "total_staffing_allocation": totalStaffingAllocationectedRole,
        "account_charged": accountCharge,
        "current_fte_utilized": fteUtilized,
        // "status": Request_Status.P,
      })
      );

      //second add first report transaction entry in SixthPeriodReportTransactionCycle table
      if (newSixthPeriodAssignmentInitiateReport) {

        console.log("newSixthPeriodAssignmentInitiateReport:-", newSixthPeriodAssignmentInitiateReport.id)

        toast.success('Data Added Successfully for pending.');
        BindList();
      }


    } else {
      //other wise status submit
      //first save report in SixthPeriodAssignmentInitiateReport table
      var newSixthPeriodAssignmentInitiateReport = await DataStore.save(new SixthPeriodAssignmentInitiateReport({
        "assignment_title": assighnmentTitle,
        "employee_id": selectedEmployee.code,
        "assighment_at": schoolSelect.name,
        "from_date": moment(startDate).format("YYYY-MM-DD"),
        "to_date": moment(endDate).format("YYYY-MM-DD"),
        "subject_area": subjectCode.name,
        "total_staffing_allocation": totalStaffingAllocationectedRole,
        "account_charged": accountCharge,
        "current_fte_utilized": fteUtilized,
        "submited_by":loggedUserId,
        "submited_at":moment().format("YYYY-MM-DD")
        // "status": Request_Status.P,
      })
      );

      //second add first report transaction entry in SixthPeriodReportTransactionCycle table
      if (newSixthPeriodAssignmentInitiateReport) {

        console.log("newSixthPeriodAssignmentInitiateReport:-", newSixthPeriodAssignmentInitiateReport.id)


        var newSixthPeriodReportTransactionCycle = await DataStore.save(new SixthPeriodReportTransactionCycle({
          "report_Id": newSixthPeriodAssignmentInitiateReport.id,
          "from_Employee_Id": loggedUserId,
          "to_Employee_Id": selectedEmployee.code,
          "status": 'Open',
          "isApproved": false,
          "remark": '',
          "date": moment().format("YYYY-MM-DD"),
        }))

        if (newSixthPeriodAssignmentInitiateReport && newSixthPeriodReportTransactionCycle) {
          toast.success('Data Added Successfully for Submitted.');
          BindList();
        }

      }
    }

    // updatedSchoolId = newSixthPeriodAssignmentInitiateReport.id;


  }

//   AWS.config.update({
//     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
//     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
//     region: process.env.REACT_APP_AWS_Region,
//   });




  //*get getEmployeeResponse
  const getEmployeeResponse = (id) => {
    let _employeeList = [...employeeList];
    var returnRecord = _employeeList.find(o => o.id === String(id));
    if (returnRecord !== null && returnRecord !== undefined) { return returnRecord; } else { return null; }
  }


  //Get Weekly Absence Report-Classified List
//   const BindList = async () => {


    //fetch all SixthPeriodAssignmentInitiateReport table data
    // try {
    //   const sixPeriodInitiatorReportResponse = await DataStore.query(SixthPeriodAssignmentInitiateReport, Predicates.ALL, {
    //     sort: s => s.assignment_title(SortDirection.ASCENDING)
    //   });
    //   if (sixPeriodInitiatorReportResponse) {

    //     console.log("data is bbbbbbbbbb:-", sixPeriodInitiatorReportResponse);
    //     //change data format according to UI.
    //     // let submitCount = 0;
    //     // let approvedCount = 0;
    //     // let rejectCount = 0;
    //     let finalData = [];
    //     sixPeriodInitiatorReportResponse.map(async (currentItem, i) => {


    //       //then we call transaction cycle table data
    //       const sixthPeriodReportTransactionCycleResponse = await DataStore.query(SixthPeriodReportTransactionCycle, (c)=>c.report_Id.eq(currentItem.id));
          
    //       let status='';
    //       if(sixthPeriodReportTransactionCycleResponse.length>0){
    //         console.log("sixthPeriodReportTransactionCycleResponse " + i + " ", sixthPeriodReportTransactionCycleResponse);
    //         status="Submitted"
    //       }else{
    //         status="Pending"
    //       }

    //       //change format of period attribute
    //       const startDate = new Date(currentItem.from_date);
    //       const endDate = new Date(currentItem.to_date);
    //       const dateFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    //       const formattedStartDate = dateFormatter.format(startDate);
    //       const formattedEndDate = dateFormatter.format(endDate);
    //       const period = `${formattedStartDate} to ${formattedEndDate}`;

    //       let obj = {
    //         srNo: i + 1,
    //         assignmentTitle: currentItem.assignment_title,
    //         period: period,
    //         submittedOn: currentItem.submited_at,
    //         status: status,
    //         // status: currentItem.status.charAt(0).toUpperCase() + currentItem.status.slice(1).toLowerCase(),
    //         // remark:currentItem.remark

    //         employee_id: currentItem.employee_id,
    //         assighment_at: currentItem.assighment_at,
    //         from_date: currentItem.from_date,
    //         to_date: currentItem.to_date,
    //         subject_area: currentItem.subject_area,
    //         total_staffing_allocation: currentItem.total_staffing_allocation,
    //         account_charged: currentItem.account_charged,
    //         current_fte_utilized: currentItem.current_fte_utilized
    //       }

    //       //specific report category get approved,submitted and rejected count

    //     //   if (currentItem.status === 'SUBMITTED') {
    //     //     submitCount++;
    //     //   } else if (currentItem.status === 'APPROVED') {
    //     //     approvedCount++;
    //     //   } else if (currentItem.status === 'REJECTED') {
    //     //     rejectCount++;
    //     //   }
    //       // setSubmitCount(submitCount);
    //       // setApprovedCount(approvedCount);
    //       // setRejectCount(rejectCount);

    //       finalData.push(obj);
    //     })

    //     setInitiatorReportList(finalData)
    //   }
    // } catch (error) {
    //   console.log('Error for bindList', error);
    // }







    // var SubjectCodeResponses = await DataStore.query(Subject, Predicates.ALL, {
    //   sort: s => s.name(SortDirection.ASCENDING)
    // });
//     setSubjectCodeList(SubjectCodeResponses)
//     var myArray = []; myArray = ConvertResponseForSelectWithRefCodedropdown(SubjectCodeResponses); setSubjectListDropdown(myArray);


//     var SchoolResponses = await DataStore.query(Schools, Predicates.ALL, {
//       sort: s => s.name(SortDirection.ASCENDING)
//     });
//     var schoolArray = []; schoolArray = ConvertResponseForSelect(SchoolResponses); setSchoolList(schoolArray);


//     var employeeList = await DataStore.query(Employee, Predicates.ALL, {
//       sort: s => s.employee_name(SortDirection.ASCENDING)
//     });
//     setEmployeeList(employeeList)

//     const cognito = new AWS.CognitoIdentityServiceProvider();
//     var params =
//     {
//       UserPoolId: awsmobile.aws_user_pools_id,
//       Limit: 60
//     };
//     cognito.listUsers(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(data)
//         SetUsersList(data.Users);
//       }
//     });

//     loadAbsenceReport();
//   }

  //initiate new report
  const initiateNewReport = async () => {

    console.log('usersusersusers:-', users);

    var newRes = []
    let userRole = '', userName = '', userEmail = '', userCode = '',sub='';
    users.forEach((user, i) => {
      userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
      userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
      sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
      userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
      userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;

      let obj = {
        "userId": sub,
        "name": userName,
        "email": userEmail,
        "usercode": userCode,
        "role": userRole === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : userRole === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : userRole === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I,
      }
      newRes.push(obj);
    }
    );

    //get only those users are without admin
    let usersWithoutAdmin = [];
    const loggedUserId = reactLocalStorage.get('loggedUserId');
    console.log("loggedUserIdloggedUserId:-", loggedUserId)

    newRes.map((currentItem) => {
      if (currentItem.role !== 'Admin'
        && currentItem.userId !== loggedUserId) {
        usersWithoutAdmin.push(currentItem);
      }
    })

    console.log("usersWithoutAdminusersWithoutAdmin:-", usersWithoutAdmin)
    //set employee list
    let finalEmpList = [];
    usersWithoutAdmin.map((currentItem) => {
      let obj = { name: currentItem.usercode, code: currentItem.userId };
      finalEmpList.push(obj);
    })
    setEmpCodeList(finalEmpList);
    setAllEmployeeDetails(usersWithoutAdmin);

    setShowNextPopUp(true);


    //fetch employee table data
    // try {

    //   setEmpCodeList(finalEmpList);
    //   setAllEmployeeDetails(employeeResponse);
    //   // then show popup
    //   setShowNextPopUp(true);

    // }
    // } catch (error) {
    // console.log('Error retrieving posts', error);

  }


  //*loadAbsenceReport
  const loadAbsenceReport = async () => {

    //*Set Weekly Absence Report-Classified List
    var weeklyAbsenceReport = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport)
    let newResponse = [];
    for (let i = 0; i < weeklyAbsenceReport.length; i++) {
      let schoolName = "";
      let workDuration = "";
      let submittedOn = "";
      let status = "";
      let remark = "";

      //*Work Duration
      if (weeklyAbsenceReport[i].from_date && weeklyAbsenceReport[i].to_date) {
        let fromDate = moment(weeklyAbsenceReport[i].from_date, 'YYYY-DD-MM').format('Do');
        let toDate = moment(weeklyAbsenceReport[i].to_date, 'YYYY-DD-MM').format("Do MMMM'YY");
        workDuration = fromDate + " - " + toDate
      }
      else { workDuration = "-" }

      //*submitted On
      if (weeklyAbsenceReport[i].status_date_time !== null && weeklyAbsenceReport[i].status_date_time !== undefined) {
        submittedOn = weeklyAbsenceReport[i].status_date_time !== null ? moment(weeklyAbsenceReport[i].status_date_time).format("Do MMMM'YY") : "-";
      } else { submittedOn = "-" }

      // //*School Name
      if (weeklyAbsenceReport[i].school_id !== null && weeklyAbsenceReport[i].school_id !== undefined) {
        var schoolResponses = await DataStore.query(Schools, (c) => c.id.eq(weeklyAbsenceReport[i].school_id));
        if (schoolResponses.length > 0) { schoolName = schoolResponses[0].name; } else { schoolName = ""; }
      } else { schoolName = ""; }

      if (weeklyAbsenceReport[i].payroll_status !== null && weeklyAbsenceReport[i].payroll_status === InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED) {
        status = "Approved (P)"; remark = "-";
      } else if (weeklyAbsenceReport[i].payroll_status !== null && weeklyAbsenceReport[i].payroll_status === InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_REJECTED) {
        status = "Rejected (P)"; remark = weeklyAbsenceReport[i].payroll_remark;
      } else if (weeklyAbsenceReport[i].approver_status !== null && weeklyAbsenceReport[i].approver_status === InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED) {
        status = "Approved (A)"; remark = "-";
      } else if (weeklyAbsenceReport[i].approver_status !== null && weeklyAbsenceReport[i].approver_status === InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_REJECTED) {
        status = "Rejected (A)"; remark = weeklyAbsenceReport[i].approver_remark;
      } else if (weeklyAbsenceReport[i].payroll_status === null && weeklyAbsenceReport[i].approver_status === null && weeklyAbsenceReport[i].status === InitiateClassifiedWeeklyAbsenceReportStatus.SUBMITTED) {
        status = "Submitted"; remark = "-";
      } else if (weeklyAbsenceReport[i].payroll_status === null && weeklyAbsenceReport[i].approver_status === null && weeklyAbsenceReport[i].status === InitiateClassifiedWeeklyAbsenceReportStatus.OPEN) {
        status = "Pending"; remark = "-";
      }

      newResponse.push({
        "id": weeklyAbsenceReport[i].id,
        "user_id": weeklyAbsenceReport[i].user_id, "status": status, "school_id": weeklyAbsenceReport[i].school_id, "from_date": weeklyAbsenceReport[i].from_date,
        "to_date": weeklyAbsenceReport[i].to_date, "status_date_time": weeklyAbsenceReport[i].status_date_time, "approver_remark": weeklyAbsenceReport[i].approver_remark, "payroll_remark": weeklyAbsenceReport[i].payroll_remark !== null ? weeklyAbsenceReport[i].payroll_remark : "-",
        "schoolName": schoolName, "workDuration": workDuration, "submittedOn": submittedOn, "remark": remark, "createdAt": weeklyAbsenceReport[i].createdAt, "updatedAt": weeklyAbsenceReport[i].updatedAt,
      })

      if (i === weeklyAbsenceReport.length - 1) {

        setWeeklyAbsenceReports(newResponse)
        //SubmittedCount
        const submittedCount = newResponse.filter(obj => obj.status === "Submitted")
        setWeeklyAbsenceReportSubmitted(submittedCount.length)

        //SubmittedCount
        const approvedCountP = newResponse.filter((obj) => obj.status === "Approved (P)");
        const approvedCountA = newResponse.filter((obj) => obj.status === "Approved (A)");
        let approvedCount = approvedCountP.length + approvedCountA.length
        setWeeklyAbsenceReportApproved(approvedCount)

        //RejectedCount
        const rejectedCountP = newResponse.filter((obj) => obj.status === "Rejected (P)");
        const rejectedCountA = newResponse.filter((obj) => obj.status === "Rejected (A)");
        const rejectedCount = rejectedCountP.length + rejectedCountA.length
        setWeeklyAbsenceReportRejected(rejectedCount)

        //RejectedCount
        const pendingCount = newResponse.filter((obj) => obj.status === "Pending");
        setWeeklyAbsenceReportPending(pendingCount.length)
      }
    }
  }

  useEffect(() => {
    onLoad();
    // BindList();
  }, []);


  return (
    <>
     <ReactFullscreen>
       {({ onToggle }) => (
      <Layout pageTitle="Report" activeMenu="Initiator">
        <div className="report-wrapper pt-24 md:pt-28 xl:pt-[2.083vw]">
          <div className="flex justify-end visible lg:hidden">
            <Button icon="pi pi-bars" onClick={toggleActive} style={{ color: '#308B90', background: '#ffffff00', border: '1', borderColor: '#308B90', width: '38px', padding: '6px 0', borderRadius: '4px' }}></Button>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 xl:gap-[1.250vw] pb-5">
         

            <div className="relative z-10 col-span-12 lg:col-span-12" data-aos="fade-down" data-aos-duration="800">
              <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]" >
                <div className="flex items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
                  <p className="text-[22px] xl:text-[0.938vw]  text-[#101828] font-medium">6th Period Teaching Assignment</p>

                  <div className="flex gap-2 xl:gap-[0.990vw] items-center">
                    <Link href='/sixth_period_report/initiateNewReport' className="w-full text-center tableBtn blue radius8" onClick={() => initiateNewReport()}>
                      <i className="gusd-pluse-circle mx-1.5 "></i> Initiate New Report</Link>
                    <div className="relative dropcheck">
                      <Menu as="div">
                        <Menu.Button><i className="pi pi-download "></i></Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-50 w-[100px] xl:w-[9.542vw]  origin-top-right bg-white rounded-[5px] xl:rounded-[5px] shadow-[0px_2px_2px_rgba(20, 46, 82, 0.2)]">
                            <div className="px-4 pt-5 pb-3 xl:px-[0.833vw] xl:py-[0.833vw] top-[-10px]">
                              <div className="mb-4 xl:mb-[0.417vw]">

                                <div className="flex items-center mb-2">
                                  <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                  <label htmlFor="ingredient1" className="ml-2 text-[#344054] text-[15px] font-medium xl:text-[0.900vw]">Year</label>
                                </div>
                                <div className="flex items-center mb-3">
                                  <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                  <label htmlFor="ingredient1" className="ml-2 text-[#344054] text-[15px] font-medium xl:text-[0.900vw]">Month</label>

                                </div>

                                <Link href="" className="flex justify-center bg-[#3366FF] text-[14px] text-[#fff] px-5 py-1.5  rounded-md w-full">Select</Link>

                              </div>


                            </div>

                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <Link href="" onClick={onToggle}> <i className="gusd-expand"></i></Link>
                  </div>
                </div>
                <TabView>
              <TabPanel header="Initiate Reports">
                <div className="initiator  arrowshow">
                  <div className="xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]">
                    <DataTable
                      className="custpaginator custIconsTable custmBtnTable custTable"
                      scrollable
                      filters={""}
                      filterDisplay="row"
                      value={tableData}
                      paginator
                      rowsPerPageOptions={[10, 20, 30]}
                      responsiveLayout="scroll"
                      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                      rows={11}
                      emptyMessage="No records found."
                    >
                      
                      <Column
                        header="SL#"
                        field="sLNo"
                        style={{ maxWidth: "3rem" }}
                      ></Column>
                      <Column
                        field="submittedOn"
                        header="Assignment Title"
                        filter
                        filterPlaceholder="Search"
                        sortable
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      {/* <Column field="schoolOrDeptName" header="School or Department Name" filter filterPlaceholder="Search" sortable></Column> */}
                      <Column
                        field="assignmentTitle"
                        header="Period"
                        filter
                        filterPlaceholder="Search"
                        sortable
                      ></Column>
                      <Column
                        field="noOfsubstitute"
                        header="Submitted On"
                        filter
                        filterPlaceholder="Search"
                        sortable
                      ></Column>
                      <Column
                        
                        header="Status"
                        field="status"
                        filter
                        filterElement={statusRowFilterTemplate}
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: "14rem" }}
                      ></Column>
                  
                      <Column
                        field="remark"
                        header="Remarks"
                        align="center"
                        style={{ minWidth: "6rem" }}
                      ></Column>
                      <Column
                        field="action"
                        header="Action"
                        frozen
                        alignFrozen="right"
                        align="center"
                        body={superAdminActions}
                        style={{ minWidth: "6rem" }}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="Requested Reports">
                <div className="initiator  arrowshow">
                  <div className="xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]">
                    <DataTable
                      className="custpaginator custIconsTable custmBtnTable custTable"
                      scrollable
                      filters={""}
                      filterDisplay="row"
                      value={tableData}
                      paginator
                      rowsPerPageOptions={[10, 20, 30]}
                      responsiveLayout="scroll"
                      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                      rows={11}
                      emptyMessage="No records found."
                    >
                      <Column
                        header="SL#"
                        field="sLNo"
                        style={{ maxWidth: "3rem" }}
                      ></Column>
                      <Column
                        field="submittedOn"
                        header="Assignment Title"
                        filter
                        filterPlaceholder="Search"
                        sortable
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      {/* <Column field="schoolOrDeptName" header="School or Department Name" filter filterPlaceholder="Search" sortable></Column> */}
                      <Column
                        field="assignmentTitle"
                        header="Period"
                        filter
                        filterPlaceholder="Search"
                        sortable
                      ></Column>
                      <Column
                        field="noOfsubstitute"
                        header="Submitted On"
                        filter
                        filterPlaceholder="Search"
                        sortable
                      ></Column>
                      <Column
                        header="Status"
                        field="status"
                        filter
                        filterElement={statusRowFilterTemplate}
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: "14rem" }}
                      ></Column>
                    
                      <Column
                        field="remark"
                        header="Remarks"
                        align="center"
                        style={{ minWidth: "6rem" }}
                      ></Column>
                      <Column
                        field="action"
                        header="Action"
                        frozen
                        alignFrozen="right"
                        align="center"
                        body={superAdminActions}
                        style={{ minWidth: "6rem" }}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>
            </TabView>

                {/* <TabView>
                  <TabPanel header="Initiate Reports">
                    <div className="initiator">
                      <DataTable className="custpaginator custIcons custmBtnTable custTable" scrollable
                        value={initiatorReportList}
                        paginator responsiveLayout="scroll" paginatorTemplate="PrevPageLink PageLinks NextPageLink" rows={11}>
                        <Column field="srNo" header="SL#" sortable style={{ minWidth: '3rem' }}></Column>
                        <Column field="assignmentTitle" header="Assignment Title" sortable style={{ minWidth: '5rem' }}></Column>
                        <Column field="period" header="Period" sortable></Column>
                        <Column field="submittedOn" header="Submitted On" sortable style={{ minWidth: '5rem' }}></Column>
                        <Column header="status" body={TaskStatusSLA} sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="remark" header="Remarks" align='center' style={{ minWidth: '6rem' }}></Column>
                        <Column field="action" header="Action" frozen alignFrozen="right" align='center' body={alljobactionContent} style={{ minWidth: '6rem' }}></Column>
                      </DataTable>
                    </div>
                  </TabPanel>
                  <TabPanel header="Requested Reports">
                    <p className="m-0">
                      Display Those request which request this user can approved or reject.
                    </p>
                  </TabPanel>
                </TabView> */}


{/* <Dialog className="relative reports-popup"  position={position}
                  style={{ width: '80vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8 bg-[#F5F6F7] h-auto">
                      <div className="p-5">
                        <div onClick={() => setVisible(false)} className="py-3">
                          <Image src={"sideBarRight"} alt="user" width="24" height="24" /></div>

                        {
                          (!fullViewForView) ?
                            <div>
                              <div className='text-center'>
                                <div className="text-[#000000] text-md lg:text-[0.833vw] font-bold">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Request For Approval - Sixth Period Teaching Assignment</div>
                              </div>

                              <div className='pt-3'>
                                <p>Approval Status</p>
                                <div className="py-3 emp-simple-tbl">
                                  <DataTable
                                    value={[
                                      {
                                        id: '1000',
                                        title: 'Principal',
                                        name: 'Alrick Barwa',
                                        status: 'Approved'
                                      },
                                      {
                                        id: '1001',
                                        title: 'Teacher',
                                        name: 'John Mishra',
                                        status: 'Approved'
                                      },
                                      {
                                        id: '1002',
                                        title: 'EAFE Program Administrator',
                                        name: 'Alrick Barwa',
                                        status: 'Approved'
                                      }

                                    ]}>
                                    <Column field="title" header="Title"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="status" header="Status"></Column>
                                  </DataTable>
                                </div>
                              </div>
                            </div> : null
                        }


                        <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">

                          <div className='flex justify-between'>
                            <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-file-icon"></i>Sixth Period Teaching Assignment.pdf</div>
                            <button onClick={() => { (!fullViewForView) ? setFullViewForView(true) : setFullViewForView(false) }} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>{(!fullViewForView) ? 'View Full Screen' : 'Exit Full Screen'} </button>
                          </div>

                          <div className="grid grid-cols-1">
                            
                            <HtmlToPdf
                              data={{
                                'employeeName': 'Abc',
                                'employeeId': specificReportDetailsView.employee_id,
                                'schoolName': specificReportDetailsView.assighment_at,
                                'dateFrom': specificReportDetailsView.from_date,
                                'dateTo': specificReportDetailsView.to_date,
                                'subjectName': specificReportDetailsView.subject_area,
                                'staffAllocation': specificReportDetailsView.total_staffing_allocation,
                                'accountCharged': specificReportDetailsView.account_charged,
                                'fteUtilized': specificReportDetailsView.current_fte_utilized
                              }}
                            />
                          </div>
                        </div>




                        <div className='grid grid-cols-2 gap-4'>
                          <div className="bg-white border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                            <i className="mr-3 gusd-print-outline"></i><span>Print</span>
                          </div>

                          <div className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                            <i className="mr-3 gusd-print-outline"></i><span>Download</span>
                          </div>
                        </div>


                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">
                      <div className="p-5">
                        <div className="text-[#344054] text-[16px] font-medium py-3">Form History</div>
                        <div>
                          <div className="text-[#000000] text-[12px] font-normal text-center py-2 separator">Yesterday</div>
                          <div className="flex items-start justify-between gap-2 py-2">
                            <Image src={"user1"} alt="user" width="32" height="32" />
                            <div className="">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-[#344054] font-semibold text-[14px]">Jhon Paul</div>
                                  <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                    <i className="mr-1 gusd-commented"></i>
                                    <span>Commented on parties Tab</span>
                                  </div>
                                </div>
                                <div className="text-[#344054] text-[12px]">09:00</div>
                              </div>
                              <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">changed the input name of employee from “Kalvin” to “Samston”.</div>
                            </div>
                          </div>
                          <div className="flex items-start justify-between gap-2 py-2">
                            <Image src={"user2"} alt="user" width="32" height="32" />
                            <div className="">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-[#344054] font-semibold text-[14px]">Jhoana Maria</div>
                                  <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                    <i className="mr-1 gusd-commented"></i>
                                    <span>Commented on parties Tab</span>
                                  </div>
                                </div>
                                <div className="text-[#344054] text-[12px]">09:00</div>
                              </div>
                              <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">changed the input name of employee from “Kalvin” to “Samston”.</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-[#000000] text-[12px] font-normal text-center py-2 separator">April 7h</div>
                          <div className="flex items-start justify-between gap-2 py-2">
                            <Image src="/assets/images/user3.svg" alt="user" width="32" height="32" />
                            <div className="">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-[#344054] font-semibold text-[14px]">Jennifer Lopez</div>
                                  <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                    <i className="mr-1 gusd-commented"></i>
                                    <span>Commented on parties Tab</span>
                                  </div>
                                </div>
                                <div className="text-[#344054] text-[12px]">09:00</div>
                              </div>
                              <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">changed the input name of employee from “Kalvin” to “Samston”.</div>
                            </div>
                          </div>
                          <div className="flex items-start justify-between gap-2 py-2">
                            <Image src="/assets/images/user4.svg" alt="user" width="32" height="32" />
                            <div className="">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-[#344054] font-semibold text-[14px]">Lethicia Jhansen</div>
                                  <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                    <i className="mr-1 gusd-commented"></i>
                                    <span>Commented on parties Tab</span>
                                  </div>
                                </div>
                                <div className="text-[#344054] text-[12px]">09:00</div>
                              </div>
                              <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">changed the input name of employee from “Kalvin” to “Samston”.</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-[#000000] text-[12px] font-normal text-center py-2 separator">April 7h</div>
                          <div className="flex items-start justify-between gap-2 py-2">
                            <Image src="/assets/images/user5.svg" alt="user" width="32" height="32" />
                            <div className="">
                              <div className="flex justify-between">
                                <div>
                                  <div className="text-[#344054] font-semibold text-[14px]">Jhon Doe</div>
                                  <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                    <i className="mr-1 gusd-commented"></i>
                                    <span>Commented on parties Tab</span>
                                  </div>
                                </div>
                                <div className="text-[#344054] text-[12px]">09:00</div>
                              </div>
                              <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">changed the input name of employee from “Kalvin” to “Samston”.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog> */}

              

                {/* edit popup start */}
                < Dialog className="relative reports-popup" visible={visibleEdit} position="right" style={{ width: `${(fullViewEdit) ? '50vw' : '30vw'}` }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisibleEdit(false)} draggable={false} resizable={false} >
                  <div className="">
                    <div className="bg-[#F5F6F7] relative h-screen">
                      <div className="p-5">
                        <a to='' onClick={() => setVisibleEdit(false)} className="py-3">
                            {/* <Image
                          src={sidebar} alt="user" width="24" height="24" /> */}
                          </a>


                        {
                          (!fullViewEdit) ?
                            <div>
                              <div className="text-[#113699] text-md md:text-[0.833vw] font-bold">6th Period Teaching Assignment</div>
                              <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Sixth Period Teaching Assignment - Classified form</div>
                              <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                <div className="mb-1">
                                  <label className="text-[#344054] text-[0.729vw] font-medium pb-1" htmlFor="username">Approval Status</label>
                                  <div className="py-3 emp-simple-tbl">
                                    <DataTable
                                      value={[
                                        {
                                          id: '1000',
                                          title: 'Principal',
                                          name: 'Alrick Barwa',
                                          status: 'Approved'
                                        },
                                        {
                                          id: '1001',
                                          title: 'Teacher',
                                          name: 'John Mishra',
                                          status: 'Approved'
                                        },
                                        {
                                          id: '1002',
                                          title: 'EAFE Program Administrator',
                                          name: 'Alrick Barwa',
                                          status: 'Approved'
                                        }

                                      ]}>
                                      <Column field="title" header="Title"></Column>
                                      <Column field="name" header="Name"></Column>
                                      <Column field="status" header="Status"></Column>
                                    </DataTable>
                                  </div>
                                </div>
                              </div>
                            </div> : null
                        }



                        <div className=" rounded-[8px] p-3 mt-3">

                          {
                            (!fullViewEdit) ?
                              <div className='flex justify-between'>
                                <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Sixth Period.pdf</div>
                                <button onClick={() => setFullViewEdit(true)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen</button>
                              </div> :
                              <div className='flex justify-between'>
                                <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Sixth Period Teaching Assignment.pdf</div>
                                <button onClick={() => setFullViewEdit(false)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>Exit Full Screen</button>
                              </div>
                          }

                          {
                            (!fullViewEdit) ?
                              <div className="grid grid-cols-1 border border-[red] h-80 overflow-hidden">
                                {/* <img src={pdfImageForEdit} alt='myImg' /> */}
                                <HtmlToPdf
                                  data={{
                                    'employeeName': 'Abc',
                                    'employeeId': specificReportDetailsEdit.employee_id,
                                    'schoolName': specificReportDetailsEdit.assighment_at,
                                    'dateFrom': specificReportDetailsEdit.from_date,
                                    'dateTo': specificReportDetailsEdit.to_date,
                                    'subjectName': specificReportDetailsEdit.subject_area,
                                    'staffAllocation': specificReportDetailsEdit.total_staffing_allocation,
                                    'accountCharged': specificReportDetailsEdit.account_charged,
                                    'fteUtilized': specificReportDetailsEdit.current_fte_utilized
                                  }}
                                />
                              </div> :
                              <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] overflow-y-auto' style={{ height: '580px' }}>
                                {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                                <HtmlToPdf
                                  data={{
                                    'employeeName': 'Abc',
                                    'employeeId': specificReportDetailsEdit.employee_id,
                                    'schoolName': specificReportDetailsEdit.assighment_at,
                                    'dateFrom': specificReportDetailsEdit.from_date,
                                    'dateTo': specificReportDetailsEdit.to_date,
                                    'subjectName': specificReportDetailsEdit.subject_area,
                                    'staffAllocation': specificReportDetailsEdit.total_staffing_allocation,
                                    'accountCharged': specificReportDetailsEdit.account_charged,
                                    'fteUtilized': specificReportDetailsEdit.current_fte_utilized
                                  }}
                                />
                              </div>
                          }
                        </div>
                      </div>



                      <div className="absolute  bottom-2 left-2 right-2 grid grid-cols-2 gap-2 ">

                        <Link href='#' className=" bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center"
                          //  onClick={() => setVisibleCreteReportPopup(false)}
                          onClick={() => setConfirmVisible(true)}
                        ><i className="pi pi-save mr-1" style={{ fontSize: '1rem' }}></i>Save</Link>

                        <Link href='' className=" text-center flex items-center tableBtn blue radius8"
                          //  onClick={() => saveGroupInfo()}
                          onClick={() => setConfirmVisible(true)}
                        ><i className="pi pi-check mr-1" style={{ fontSize: '1rem' }}></i>Submit</Link>

                      </div>
                    </div>
                  </div>
                </Dialog >

                {/* confirmation dialog */}

                <Dialog header="" visible={confirmVisible} style={{ width: '30vw' }} onHide={() => { setConfirmVisible(false); setVisibleEdit(false); }} footer={footerContent}>
                  <p className="m-0 text-[#0487C8]">
                    <i className='pi pi-check-circle mr-2'></i>
                    <span className='font-medium text-[18px]'>Your changes has been saved in this report</span>
                  </p>
                </Dialog>
                {/* edit popup end */}

              </div>

              <Sidebar visible={visibleRight} position="right" onHide={() =>
                setVisibleRight(false)} style={{ width: '35vw' }} className="customesidebar1 responsivepoup">
                <Editpopup popupstate={() => setVisibleRight(false)}
                  fromDate={fromDate}
                  toDate={toDate}
                  schoolName={schoolName}
                  reportEmployeeList={reportEmployeeList}
                  status={status}
                  reportId={reportId}
                  bindList={() => loadAbsenceReport()}
                  type={"Initior"}
                />

              </Sidebar>
            </div>
          </div>
        </div >


        {/* popup's */}
        < Dialog className="relative reports-popup" visible={visibleCreteReportPopup} position="right" style={{ width: '30vw' }
        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisibleCreteReportPopup(false)} draggable={false} resizable={false} >
          <div className="">
            <div className="bg-[#F5F6F7] relative h-screen">
              <div className="p-5">
                <a to='' onClick={() => setVisibleCreteReportPopup(false)} className="py-3">
                    {/* <Image src={sidebar} alt="user" width="24" height="24" /> */}
                    </a>
                <div className="text-[#113699] text-md md:text-[0.833vw] font-bold">6th Period Teaching Assignment</div>
                {/* <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Roles</div> */}
                <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                  <div className="mb-1">
                    <label className="text-[#344054] text-[0.729vw] font-medium pb-1" htmlFor="username">Assignment Title</label>
                    <div><InputText
                      value={groupName}
                      onChange={e => setGroupName(e.target.value)}
                      id="username" placeholder="Type Here" className="w-full placeholder:text-[#667085] " aria-describedby="username-help" /></div>
                  </div>
                </div>
              </div>
              <div className="absolute  bottom-2 left-2 right-2 grid grid-cols-2 gap-2 ">

                <Link href='#' className=" bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center" onClick={() => setVisibleCreteReportPopup(false)}><i className="pi pi-times mr-1" style={{ fontSize: '1rem' }}></i>Cancel</Link>

                <Link href='' className=" text-center flex items-center tableBtn blue radius8" onClick={() => {
                  setShowNextPopUp(true);
                  // saveGroupInfo();
                }}><i className="pi pi-arrow-right mr-1" style={{ fontSize: '1rem' }}></i>Next</Link>

              </div>
            </div>
          </div>
        </Dialog >


        {/* next full popup */}
        < Dialog className="relative reports-popup" visible={showNextPopUp} position="right" style={{ width: '100vw' }
        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setShowNextPopUp(false)} draggable={false} resizable={false} >


          {/* <div class="p-10"><a href="#" id="add-family-open-btn"><i class="gusd-edit text-2xl"></i></a></div> */}
          <div className="fixed z-10 inset-0 overflow-y-auto styled-select" >

            <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
              <div className="relative overflow-hidden transform transition-all w-full">
                <div className="grid grid-cols-12 custmCols">
                  <div className="col-span-3 h-full sideBarLeft openSideDiv">
                    <button onClick={() => { setShowPreviewPopUp(false); setShowNextPopUp(false) }} type="button" className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md" id="add-family-cancel-btn"><i className="gusd-arrow-line-right mr-[14px] xl:mr-[0.729vw]"></i> Back Home</button>
                    <div className="mt-[16px] xl:mt-[0.833vw] text-[#101828] text-[14px] xl:text-[0.633vw] font-normal">GUSD 6th Period Teaching Assignment</div>
                    <div className="mt-[10px] xl:mt-[0.533vw] text-[#101828] text-[20px] xl:text-[0.833vw] font-medium">Assignment 10102</div>
                    <div className="mt-[32px] xl:[1.667vw]">
                      <ul className="sideTabs">
                        <li><a href="#" onClick={() => setShowPreviewPopUp(false)} className="tab-b active activeCheck" data-id="tab1">
                          <i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                          Basic Info</a></li>
                        <li><a href="#"
                          // onClick={() => 
                          // setShowPreviewPopUp(true)
                          // }
                          className="tab-b active" data-id="tab2"><i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i> Preview & Edit</a></li>
                        {/* <li><a href="javascript:void(0);" class="tab-b" data-id="tab3"><i class="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i> Report Options</a></li> */}
                      </ul>
                    </div>
                    <div className="fixed top-0 left-0 openBtn xl:hidden">
                      <button type="button" className="sideDivBtn inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-white text-[14px] xl:text-[0.729vw] font-medium bg-[#3366FF] border border-[#EFF8FF] rounded-r-md"><i className="gusd-arrow-line-right"></i></button>
                    </div>
                  </div>

                  <div className="col-span-12 xl:col-span-6 
                  mScrollCstm
                  overflow-auto
                  ">
                    <div className="tab-c tab-active p-lr-110 pt-10 xl:pt-0" data-id="tab1">
                      <div className="text-[24px] xl:text-[1.250vw] font-medium">{(showPreviewPopUp) ? 'Preview & Edit' : 'Basic Info'}</div>
                      <div className="mCustomScrollbar scroll-w-10 max-h-100">
                        {
                          (!showPreviewPopUp) ?
                            <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]">
                              <form>
                                <div className="space-y-[32px] xl:space-y-[1.667vw]">

                                  {/* <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Employee ID<span className='text-[red] pl-0.2'>*</span></label>
                                    <input value={employeeId} onChange={e => setEmployeeId(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Type Emp Id" />
                                  </div> */}

                                  <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Employee ID<span className='text-[red] pl-0.2'>*</span></label>
                                  <Dropdown value={selectedEmployee}
                                    onChange={(e) => {
                                      setSelectedEmployee(e.value);
                                      //set selected id employee data
                                      allEmployeeDetails.map((currentItem) => {
                                        if (currentItem.userId === e.value.code) {
                                          setSelectedEmployeeDetails(currentItem);
                                        }
                                      })

                                    }} options={empCodeList} optionLabel="name" placeholder="Select a Employee"
                                    filter
                                    // valueTemplate={selectedCountryTemplate}
                                    className="w-full md:w-14rem" />

                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Assignment at<span className='text-[red] pl-0.2'>*</span></label>
                                    <Dropdown id="dept" value={schoolSelect}
                                      onChange={(e) => {
                                        setSelectedSchool(e.target.value)
                                      }}
                                      options={schoolList} optionLabel="name" placeholder="Select" className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5" style={{ fontSize: '0.875rem', color: '#667085', fontWeight: '400' }}
                                    />
                                  </div>
                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Assignment Title<span className='text-[red] pl-0.2'>*</span></label>
                                    <input onChange={e => setAssighnmentTitle(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Type here" />
                                  </div>
                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Date<span className='text-[red] pl-0.2'>*</span></label>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="relative custp-calender">
                                        <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                                        <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                        <div className="card flex justify-content-center">
                                          <Calendar
                                            onChange={(e) => {
                                              setStartDate(e.target.value)
                                            }}
                                            value={startDate}
                                            placeholder="Start Date"
                                            className="w-full h-11" />
                                        </div>
                                      </div>
                                      <div className="relative custp-calender">
                                        <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] top-[0.8rem] z-10"></i>
                                        <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                        <div className="card flex justify-content-center">
                                          <Calendar
                                            onChange={(e) => {
                                              setEndDate(e.target.value)
                                            }}
                                            value={endDate}
                                            placeholder="End Date"
                                            className="w-full h-11" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Subject Area<span className='text-[red] pl-0.2'>*</span></label>
                                    <Dropdown
                                      value={subjectCode}
                                      onChange={(e) => { setSubjectCodeList(e.target.value) }}
                                      options={absentCodeListDropdown}
                                      optionLabel="name" placeholder="Select a Subject "
                                      className="w-full h-10" />
                                  </div>

                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Total Staffing Allocation</label>
                                    <input value={totalStaffingAllocationectedRole} onChange={e => setTotalStaffingAllocation(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Type here" />
                                  </div>

                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Account Charged</label>
                                    <input value={accountCharge} onChange={e => setAccountCharged(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Type here" />
                                  </div>

                                  <div className="col">
                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Current FTE Utilized</label>
                                    <input value={fteUtilized} onChange={e => setFteUtilized(e.target.value)} type="number" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Type here" />
                                  </div>
                                </div>
                              </form>
                            </div> :
                            <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]'>
                              {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                              <HtmlToPdf
                                data={{
                                  'employeeName': 'Abc',
                                  'employeeId': selectedEmployee.name,
                                  'schoolName': schoolSelect.name,
                                  'dateFrom': moment(startDate).format("YYYY-DD-MM"),
                                  'dateTo': moment(endDate).format("YYYY-DD-MM"),
                                  'subjectName': subjectCode.name,
                                  'staffAllocation': totalStaffingAllocationectedRole,
                                  'accountCharged': accountCharge,
                                  'fteUtilized': fteUtilized
                                }}
                              />
                            </div>
                        }

                      </div>

                      <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                        <div>
                          <a href="#" onClick={() => (showPreviewPopUp) ? setShowPreviewPopUp(false) : null} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                        </div>
                        <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                          <a
                            onClick={() => {
                              saveBasicInfo('save');
                              setShowPreviewPopUp(false);
                              setShowNextPopUp(false);
                            }}
                            href="javascript:void(0);" className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#26be13] hover:bg-[#23a512] border border-[#26be13] hover:border-[#23a512] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Saves</a>
                          {
                            (showPreviewPopUp) ?
                              <a href="#"
                                onClick={() => {
                                  saveBasicInfo();
                                  setConfirmVisible2(true)
                                  // setShowPreviewPopUp(true)
                                }}
                                className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                <i className='gusd-check mr-1'></i>Submit</a> :

                              <a href="#" onClick={() => {
                                //first we check mandatory fields are filled or not

                                if (selectedEmployee === null) { toast.error('Please Select Employee Id'); return; }
                                else if (schoolSelect === '') { toast.error('Please Select Assignment At'); return; }
                                else if (assighnmentTitle === '') { toast.error('Please enter Assighment Title'); return; }
                                else if (startDate === null) { toast.error('Please enter From Date'); return; }
                                else if (endDate === null) { toast.error('Please enter To Date'); return; }
                                else if (subjectCode === null) { toast.error('Please enter To Date'); return; }

                                setShowPreviewPopUp(true)
                              }} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                <i className='gusd-eye mr-1'></i>Preview</a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* confirmation dialog */}

                  <Dialog header="" visible={confirmVisible2} style={{ width: '30vw' }} onHide={() => { setConfirmVisible2(false); setVisibleEdit(false); }} footer={footerContent1}>
                    <p className="m-0 text-[#0487C8]">
                      <i className='pi pi-check-circle mr-2'></i>
                      <span className='font-medium text-[18px]'>This report Has been Successfully  Created</span>
                    </p>
                  </Dialog>

                  <div className="col-span-3 sideBarRight openSideDiv">
                    <div className="h-full relative">
                      <div className="text-[24px] xl:text-[1.250vw] font-medium">Employee Details</div>
                      <div className="mt-[15px] lg:mt-[32px] xl:[1.667vw]">

                        {
                          (selectedEmployee) ?
                            <div className='bg-[#D8E7FC] border border-[#D8E7FC] grid grid-cols-12 gap-4'>
                              <Avatar className='col-span-3' image="/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
                              <div className='col-span-7'>
                                <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Name</label>
                                <div className="text-[#101828] text-[12px] font-medium">{selectedEmployeeDetails.name}</div>
                              </div>
                              <i className='gusd-edit col-span-2'></i>
                            </div> : null
                        }




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
        </Dialog >

        <Dialog
      className="relative reports-popup"
      visible={visible}
      position="right"
      style={{ width: "60vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    //   onHide={onHide}
      draggable={false}
      resizable={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-8 bg-[#F5F6F7] h-auto">
                      <div className="p-5">
                        <div onClick={() => setVisible(false)} className="py-3">
                          <Image src={"/assets/images/sidebarright.svg"} alt="user" width="24" height="24" /></div>

                        {
                          (!fullViewForView) ?
                            <div>
                              <div className='text-center'>
                                <div className="text-[#000000] text-md lg:text-[0.833vw] font-bold">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Request For Approval - Sixth Period Teaching Assignment</div>
                              </div>

                              <div className='pt-3'>
                                <p>Approval Status</p>
                                <div className="py-3 emp-simple-tbl">
                                  <DataTable
                                   >
                                    <Column field="title" header="Title"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="status" body={approvalStatusBody} header="Status"></Column>
                                  </DataTable>
                                </div>
                              </div>
                            </div> : null
                        }


                        <div className=" rounded-[8px] p-3 mt-3">

                          <div className='flex justify-between'>
                            <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-file-icon"></i>Sixth Period Teaching Assignment.pdf</div>
                            <button onClick={() => { (!fullViewForView) ? setFullViewForView(true) : setFullViewForView(false) }} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>{(!fullViewForView) ? 'View Full Screen' : 'Exit Full Screen'} </button>
                          </div>

                          <div className="grid grid-cols-1">
                            {/* <img src={pdfImage} alt='myImg' /> */}
                            {/* <HtmlToPdf
                              data={{
                                'employeeName': 'Abc',
                                'employeeId': selectedEmployee.name,
                                'schoolName': schoolSelect.name,
                                'dateFrom': moment(startDate).format("YYYY-DD-MM"),
                                'dateTo': moment(endDate).format("YYYY-DD-MM"),
                                'subjectName': subjectCode.name,
                                'staffAllocation': totalStaffingAllocationectedRole,
                                'accountCharged': accountCharge,
                                'fteUtilized': fteUtilized
                              }}
                            /> */}
                            {/* <HtmlToPdf
                              data={{
                                'employeeName': 'Abc',
                                'employeeId': specificReportDetailsView.employee_id,
                                'schoolName': specificReportDetailsView.assighment_at,
                                'dateFrom': specificReportDetailsView.from_date,
                                'dateTo': specificReportDetailsView.to_date,
                                'subjectName': specificReportDetailsView.subject_area,
                                'staffAllocation': specificReportDetailsView.total_staffing_allocation,
                                'accountCharged': specificReportDetailsView.account_charged,
                                'fteUtilized': specificReportDetailsView.current_fte_utilized
                              }}
                            /> */}
                            <div className="grid grid-cols-1 h-80">
                        <SixPeriodPDF
                         
                          data={
                            {
                              approvalFinalData:"Welcome" ,
                              employeeName:"Nilesh Nigade teacher three" , 
                              employeeId: "SP-EMP-05-TC,",
                              schoolName: "Eight days",
                              dateFrom: "07/31/2023",
                              dateTo: "07/31/2023",
                              subjectName: "Eglish ",
                              staffAllocation:"1",
                              accountCharged:"",
                              fteUtilized:"",
                              formName: ""
                            }
                          }
                          print={true}
                        />
                      </div>
                          </div>
                        </div>




                        {/* <div className='grid grid-cols-2 gap-4'>
                          <div className="bg-white border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                            <i className="mr-3 gusd-print-outline"></i><span>Print</span>
                          </div>

                          <div className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                            <i className="mr-3 gusd-print-outline"></i><span>Download</span>
                          </div>
                        </div> */}


                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4 h-auto">
                      <div className="p-5">
                        <div className="text-[#344054] text-[16px] font-medium py-3">Form History</div>
                        <div className="card custTable">
                    <Timeline
                      value={events}
                      opposite={(item) => (
                        <Tag
                          severity={approveStatusOptions(item)}
                          className="mr-2 relative top-[-5px]"
                          value={item.status}
                        ></Tag>
                      )}
                      content={(item, i) => (
                        <div className="relative top-[-10px]">
                          <div className="text-[#667085] text-[12px] ml-2">
                            Step {i + 1}
                          </div>
                          <small className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] leading-tight ml-2">
                            sdfsdf
                          </small>
                          <div className="text-color-secondary text-xs ml-2">
                            sdfsdf
                          </div>
                          <div className="text-color-secondary text-[9px] ml-2">
                            sdfsdf
                          </div>
                        </div>
                      )}
                    />
                  </div>
                      </div>
                    </div>
                  </div>
    </Dialog>

      </Layout >
       )
                }
                
     </ReactFullscreen> 
    </>

  );
}