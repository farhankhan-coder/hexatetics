import { Image } from 'primereact/image';
import React, { useState, useEffect, useRef, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import Layout from '@/components/layout/layout';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

import ReactFullscreen from "react-easyfullscreen";
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Tag } from 'primereact/tag';
// import sideBarRight from "../../../assets/images/sidebarright.svg"
// import Editpopup from "../../../components/popup/editpopup";

import { Dialog } from "primereact/dialog";
// import Login from '../../../setup/auth/login.component';
// import sidebar from "../../../assets/images/sidebarright.svg"
import { Timeline } from 'primereact/timeline';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputNumber } from 'primereact/inputnumber';
// import { ConvertResponseForSelect, ConvertResponseForEmployeeSelect, GetValueFromArray, graphQLGetAllData, graphQLFindRecordById } from '../../../helper/commonfunctions';
// import {
//     Employee,
//     Schools,
//     SubstituteCertificateRequest,
//     SubstituteCertificateRequestAccountNoIDs,
//     SubstituteCertificateRequestTransactionCycle,
//     CertificatedAdminWeeklyAbsenceReportStatus,
//     TypeOfSubRequestOrObjectCode,
// } from "../../../models";

import moment from "moment";
import Link from 'next/link';

import { Calendar } from 'primereact/calendar';
// import empDetailsImg from '../../../assets/images/applicationImg.png';
import { toast } from 'react-toastify';
import { FilterMatchMode, } from 'primereact/api';
import { reactLocalStorage } from 'reactjs-localstorage';

import { RadioButton } from 'primereact/radiobutton';
import { useReactToPrint } from "react-to-print";
import { Badge } from 'primereact/badge';
//import { handleNotificationsOnStatusChangeforClassifiedSubRequest } from '../../../components/actions/notficationActions';
import { Tooltip } from 'primereact/tooltip';

// import { designationForAllApps } from '../../../helper/enum';

// import capitalizeFirstChar from '../../../components/common/capitalizeFirstChar'
import HtmlToPdf from '@/components/HtmlToPdf';
import { USER_TYPES, USER_TYPES_NAMES } from '@/helper/enum';
import SubstituteRequestClassifiedHtmlToPdfSix from '@/components/popup/sixPeriodPDF/substituteRequestClassified';
import Editpopup from '@/components/popup/editpopup';

// import Substitutereqpopup from '@/components/common/Substitutereqpopup';
import EmployeePopup from '@/components/common/EmployeePopup';
export default function SubstituteRequestClassifiedReportList() {

    const componentRef = useRef();

    //*state
    //  let sixPeriodIsSuperadminRole = reactLocalStorage.get("sixPeriodIsSuperadmin");
    const [allApproverList, setAllApproverList] = useState([]);
    const [allEmployeeList, setAllEmployeeList] = useState([]);
    //  const [sixPeriodIsSuperadmin, setSixPeriodIsSuperadmin] = useState(sixPeriodIsSuperadminRole);
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [classification, setClassification] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    var [toDate, setToDate] = useState('');
    const [typeOfSubRequest, setTypeOfSubRequest] = useState('');
    const [location, setLocation] = useState('');
    const [latestInitiatorId, setLatestInitiatorId] = useState('');
    const [reasonForAbsenceRequest, setReasonForAbsenceRequest] = useState('');
    const [totalWorkingHours, setTotalWorkingHours] = useState('');
    const [substituteName, setSubstituteName] = useState('');
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [principalAndDepartmentHead, setPrincipalAndDepartmentHead] = useState('');
    const [budgetApprover, setBudgetApprover] = useState('');
    const [payrollHR, setPayrollHR] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [substituteReportId, setSubstituteReportId] = useState("");
    const [rejectReportId, setRejectReportId] = useState("");
    const [visibleRequestedReportEdit, setVisibleRequestedReportEdit] = useState(false);
    const [signature, setSignature] = useState(true);
    const [needMoreApprovals, setNeedMoreApprovals] = useState(false);
    const [checkedSignature, setCheckedSignature] = useState(false);
    const [selectedEmployeeForApprovals, setSelectedEmployeeForApprovals] = useState(null);
    const [showNeedMoreApprovals, setShowNeedMoreApprovals] = useState(false);
    const [rejectVisible, setRejectVisible] = useState(false);
    const [popUpToEmployeeID, setPopUpToEmployeeID] = useState("");
    const [popUpFromEmployeeID, setPopUpFromEmployeeID] = useState("");
    const [sendMsg, setSendMsg] = useState(false);
    const [rejectMsgValue, setRejectValueMsg] = useState('');
    const [confirmedValue, seConfirmedValue] = useState('');
    const [assignmentNameDisplay, seAssignmentNameDisplay] = useState('');
    const [employeeDetailsName, setEmployeeDetailsName] = useState('');
    const [isApproveButtonDisable, setIsApproveButtonDisable] = useState(false);
    const [isCheckFromEmployeeId, setIsCheckFromEmployeeId] = useState(false);
    const [secondApprovalFromEmployeeId, setSecondApprovalFromEmployeeId] = useState("");
    const [secondApprovalToEmployeeId, setSecondApprovalToEmployeeId] = useState("");
    const [isSubmittedCount1, setIsSubmittedCount1] = useState("");
    const [isApproveCount1, setIsApproveCount1] = useState("");
    const [isRejectCount1, setIsRejectCount1] = useState("");
    const [isSubmittedCount2, setIsSubmittedCount2] = useState("");
    const [isApproveCount2, setIsApproveCount2] = useState("");
    const [isRejectCount2, setIsRejectCount2] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoader, setIsLoader] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [confirmVisibleApprove, setConfirmVisibleApprove] = useState(false);
    const [initiatorId, setInitiatorId] = useState('');
    const [formHistoryFinalData, setFormHistoryFinalData] = useState([]);
    const [approvalFinalData, setApprovalFinalData] = useState([]);
    const [finalArray, setFinalArray] = useState([]);
    let [submittedBy, setSubmittedBy] = useState({});

    const [statuses] = useState(['Completed', "Pending", 'Pending for Acknowledgement', 'Pending for Budget Approver', "Pending for Principal/Department Head", "Rejected"])
    const [statusesApprover] = useState(['Completed', 'Pending for Acknowledgement', 'Pending for Budget Approver', "Pending for Principal/Department Head", "Rejected"])
    const [statusesPayrolls] = useState(['Completed', 'Pending for Acknowledgement', 'Pending for Budget Approver', "Pending for Principal/Department Head", "Rejected"]);
    //*list
    const [principleDepartmentHeadList, setPrincipleDepartmentHeadList] = useState([]);
    const [budgetApproverList, setBudgetApproverList] = useState([]);
    const [payrollListHR, setPayrollListHR] = useState([]);
    const [employeeCodeList, setEmployeeCodeList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [substituteRequestClassifiedReportListInitiator, setSubstituteRequestClassifiedReportListInitiator] = useState([]);
    const [substituteRequestClassifiedReportListApproval, setSubstituteRequestClassifiedReportListApproval] = useState([]);
    const [accountNoArray, setAccountNoArray] = useState([{
        "accountNo": "", "Percentage": ""
    }]);

    //states start
    const [selectedEmployee, setSelectedEmployee] = useState(false);
    const [specificReportDetailsView, setSpecificReportDetailsView] = useState([]);
    // const [events, setEvents] = useState([]);
    const [specificReportDetailsEdit, setSpecificReportDetailsEdit] = useState([]);

    //states end
    const [fullViewEdit, setFullViewEdit] = useState(false);
    const [fullViewForView, setFullViewForView] = useState(false);
    const [visibleCreteReportPopup, setVisibleCreteReportPopup] = useState(false);
    const [showNextPopUp, setShowNextPopUp] = useState(false);
    const [confirmVisible2, setConfirmVisible2] = useState(false);
    const [showPreviewPopUp, setShowPreviewPopUp] = useState(false);
    const [groupName, setGroupName] = useState();
    const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [visibleRight, setVisibleRight] = useState(false);
    const [basicInfoPopUp, SetBasicInfoPopUp] = useState(true);
    const [activate, setActivate] = useState("");
    const [previewAndEdit, SetPreviewAndEdit] = useState(false);

    const [initiatorInfo, setInitiatorInfo] = useState(null);

    //set static payroll haghajani@gusd.net
    const payrollEmail = process.env.REACT_APP_Classified_Email;
    const [searchPayroll, setSearchPayroll] = useState(payrollEmail);

    const [budgetClerkList, setBudgetClerkList] = useState([]);

    const [filters, setFilters] = useState({
        assignmentTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dates: { value: null, matchMode: FilterMatchMode.CONTAINS },
        schoolName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        submittedOn: { value: null, matchMode: FilterMatchMode.CONTAINS },
        designation: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    // const objectCodeArray = [
    //     { name: 'Code 1', code: TypeOfSubRequestOrObjectCode.CODE1 },
    //     { name: 'Code 2', code: TypeOfSubRequestOrObjectCode.CODE2 },
    //     { name: 'Code 3', code: TypeOfSubRequestOrObjectCode.CODE3 }
    // ];
    const events = [
        {
            status: "Pending",
            date: "15/10/2020 10:30",
            icon: "pi pi-shopping-cart",
            background: "#9C27B0",
            image: "game-controller.jpg",
        },
        {
            status: "Rejected",
            date: "15/10/2020 14:00",
            icon: "pi pi-cog",
            background: "#673AB7",
        },
        {
            status: "SUBMITTED",
            date: "15/10/2020 16:15",
            icon: "pi pi-shopping-cart",
            background: "#FF9800",
        },
        {
            status: "Completed",
            date: "16/10/2020 10:00",
            icon: "pi pi-check",
            background: "#607D8B",
        },
    ];
    const getSeverity = (status) => {
        switch (status) {


            case "Rejected":
                return "danger";

            case "Pending for Budget Approver":
                return "warning";

            case "Pending for Principal/Department Head":
                return "warning";

            case "pending":
                return "warning";
            case 'pending':
                return 'warning';
            case "renewal":
                return null;

        }
    };

    const data = [
        {
            sLNo: "1",
            assignmentTitle: "Substitute Request Classified testing",
            dates: "2023/08/9",
            submittedOn: "20223/09/09",
            status: "pending",
            remark: "-",
            action: ""
        },
        {
            sLNo: "2",
            assignmentTitle: "Substitute Request Classified testing",
            dates: "2023/08/9",
            submittedOn: "20223/09/09",
            status: "Rejected",
            remark: "-",
            action: ""
        }
    ]
    const statusBodyTemplate = (rowData) => {
        return (
            <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
        );
    };
    const handleClickDisable = () => {
        // Set the state to indicate that the button has been clicked
        if (assignmentTitle === null || assignmentTitle === "") { return; }
        else if (employeeCode === null || employeeCode === "") { return; }
        else if (classification === '' || classification === null) { return; }
        else if (fromDate === "" || fromDate === null) { return; }
        else if (typeOfSubRequest === null || typeOfSubRequest === "") { return; }
        else if (location === null || location === "") { return; }
        else if (reasonForAbsenceRequest === "" || reasonForAbsenceRequest === null) { return; }
        else if (principalAndDepartmentHead === null || principalAndDepartmentHead === "") { return; }
        //else if (payrollHR === null || payrollHR === "") { toast.error('Please Select Human Resource'); return; }
        else if (startTime === null || startTime === "" || startTime === 'Invalid date') { return; }
        else if (endTime === null || endTime === "" || endTime === 'Invalid date') { return; }
        const allAccountNumbersEmpty = accountNoArray.every(item => item.accountNo === '');
        if (allAccountNumbersEmpty) {
            return;
        }

        setButtonClicked(true);
    };

    const footerContent = (
        <div className='text-center'>
            <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible(false); setVisibleEdit(false); setConfirmVisibleApprove(false) }}>Close</button>
        </div>
    );
    const footerContent1 = (
        <div className='text-center'>
            <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible2(false); setShowNextPopUp(false); setVisibleCreteReportPopup(false); setShowPreviewPopUp(false); }}>Close</button>
        </div>
    );
    //_____popup

    //*state
    const [reportId, setReportId] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [status, setStatus] = useState('');
    const [userloggedRole, setUserRole] = useState("");

    //*List
    const [employeeList, setEmployeeList] = useState([]);
    const [reportEmployeeList, setReportEmployeeList] = useState([]);
    const [users, SetUsersList] = useState([]);
    //  const loggedUserId = reactLocalStorage.get('loggedUserId');
    const [assighnmentTitle, setClassificationTitle] = useState('');
    const [schoolList, setSchoolList] = useState([]);
    const [initiatorLoader, setInitiatorLoader] = useState(true);
    const [newSchoolList, setNewSchoolList] = useState([]);
    const [openNewEmployee, setOpenNewEmployee] = useState(false);
    const [NewEmployeeSchool, setNewEmployeeSchool] = useState(null);
    const [newEmpFirstName, setNewEmpFirstName] = useState('');
    const [newEmpLastName, setNewEmpLastName] = useState('');
    const rolesArray = [
        { name: 'Initiator', code: 'I' },
        { name: 'Approver', code: 'AP' },
        { name: 'Payroll', code: 'P' },
    ];
    const [newEmpSelectedRole, setNewEmpSelectedRole] = useState(null);
    const [newEmpSelectedDesignation, setNewEmpSelectedDesignation] = useState(null);
    const [isdisabled, setIsdisabled] = useState(false);

    const [NewEmployeeCode, setNewEmployeeCode] = useState('');
    const [NewEmployeeEmail, setNewEmployeeEmail] = useState('');

    // const objectCodeArray = [
    //     { name: 'Code 1', code: TypeOfSubRequestOrObjectCode.CODE1 },
    //     { name: 'Code 2', code: TypeOfSubRequestOrObjectCode.CODE2 },
    //     { name: 'Code 3', code: TypeOfSubRequestOrObjectCode.CODE3 }
    // ];

    const confirmed = [
        { name: 'Yes', key: 'Yes' },
        { name: 'No', key: 'No' }
    ];

    const TaskStatusSL = (product) => {
        switch (product.designation) {
            case 'Reviewed & resubmitted':
                return 'info';

            case 'Rejected':
                return 'danger';

            case 'pending':
                return 'warning';

            case 'Pending for Principal/Department Head':
                return 'warning';

            case 'Pending for Budget Approver':
                return 'warning';

            case 'Pending for Acknowledgement':
                return 'warning';

            case 'Submitted':
                return 'info';

            case 'Completed':
                return 'success';

            case 'Approved':
                return 'success';

            case 'Approved (P)':
                return 'success';

            default:
                return null;
        }
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={TaskStatusSL(option)} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
        );
    };

    const statusRowFilterTemplateApprover = (options) => {
        return (
            <Dropdown value={options.value} options={statusesApprover} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
        );
    };

    //search cognitousers
    /* const setEmpList = async (e, listName) => {
        try {
            const cognito = new AWS.CognitoIdentityServiceProvider();

            var params =
            {
                UserPoolId: awsmobile.aws_user_pools_id,
                Limit: 60,
                "Filter": "name ^= \"" + e.target.value + "\""
            };

            await cognito.listUsers(params, (err, data) => {
                if (err) {
                    //(err.message);
                } else {
                    let usersData = []
                    //let adminUsers = data.Users
                    var role = "";
                    var name = "";
                    var sub = "";
                    var email = "";
                    var usercode = "";

                    data.Users.forEach((user, i) => {
                        role = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
                        name = user.Attributes.find(attr => attr.Name === "name")?.Value;
                        sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
                        email = user.Attributes.find(attr => attr.Name === "email")?.Value;
                        usercode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;
                        name = usercode ? `${name} (${usercode})` : name;
                        let newUser = {
                            "name": name,
                            "email": email,
                            "code": sub,
                            "role": role === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : role === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : role === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I,
                        }

                        usersData.push(newUser)

                        if (i === data.Users.length - 1) {

                            switch (listName) {
                                case 'Principal':
                                    usersData = usersData.filter(item => item.role !== "ADMIN" && item.code !== loggedUserId);
                                    setPrincipleDepartmentHeadList(usersData);
                                    break;
                                case 'BudgetApprover':
                                    usersData = usersData.filter(item => item.role !== "ADMIN" && item.code !== loggedUserId);
                                    setBudgetApproverList(usersData);
                                    break;
                                case 'payroll':
                                    usersData = usersData.filter(item => item.role !== "ADMIN" && item.code !== loggedUserId);
                                    // setPayrollListHR(usersData);
                                    break;
                                default:
                                    usersData = usersData.filter(item => item.role !== "ADMIN" && item.code !== loggedUserId);
                                    //  setPayrollListHR(usersData);
                                    break;

                            }
                            // if(listName === 'approvalOneList'){
                            // usersData = usersData.filter(item => item.role !== "ADMIN" && item.code !== loggedUserId);
                            // setApprovalOneList(usersData);
                            // }else if(listName === 'approvalOneList'){
                            // let approverRoleList = usersData.filter(item => item.role === USER_TYPES_NAMES.AP);
                            // setAllUsersList(approverRoleList)
                            // }
                        }
                        //usersData.push({ firstName: userFirstName, lastName: userLastName, label: userFirstName + " " + userLastName, value: adminUsers[i].Username });
                    })
                }
            });


        } catch (e) {
            //toast.error(e.message);
        }
    } */

    const statusRowFilterTemplatePayroll = options => {

        return (
            <Dropdown
                value={options.value}
                options={statusesPayrolls}
                onChange={e => options.filterApplyCallback(e.value)}
                //onChange={e => callbackE(e.value)}
                itemTemplate={statusItemTemplate}
                showClear
                placeholder="Select"
                className="p-column-filter custDropdown"
                style={{ minWidth: "7rem" }}
            />
        );
    };

    const TaskStatusSLA = (product) => {
        return <><Badge value="" severity={TaskStatusSL(product)}></Badge> {product.designation}</>;
    };

    // const getLoggRole = async () => {
    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     //get logged user role
    //     let adminUsers;
    //     if (loggedUserId) {
    //         try {
    //             adminUsers = await cognito.adminGetUser({
    //                 UserPoolId: awsmobile.aws_user_pools_id,
    //                 Username: loggedUserId,
    //             }).promise();
    //         } catch (e) {
    //         }
    //     }
    //     let loggedUserRole = adminUsers.UserAttributes.find(attr => attr.Name === "custom:role")?.Value;
    //     let role = loggedUserRole === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : loggedUserRole === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : loggedUserRole === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I
    //     setUserRole(role)
    // }


    const SaveUserToCognito = async (newEmployeeId) => {


        // const cognito = new AWS.CognitoIdentityServiceProvider();
        // const userPoolId = awsmobile.aws_user_pools_id;
        // const username = NewEmployeeEmail
        // const password = "Gusd@2023"
        // const Permanent = true

        let attributes = [
            {
                Name: 'email',
                Value: NewEmployeeEmail
            },
            {
                Name: 'custom:firstName',
                Value: newEmpFirstName
            },
            {
                Name: 'custom:lastName',
                Value: newEmpLastName
            },
            {
                Name: 'name',
                // Value: NewEmployeeName
                // Value: newEmpLastName.toLowerCase() + ", " + newEmpFirstName.toUpperCase()
                Value: capitalizeFirstChar(newEmpLastName) + ", " + newEmpFirstName.toUpperCase()
            },
            {
                Name: 'custom:userCode',
                Value: NewEmployeeCode
            },
            // {
            //     Name: 'custom:city',
            //     Value: city
            // },
            // {
            //     Name: 'custom:mobileNumber',
            //     Value: phoneNo
            // },
            // {
            //     Name: 'custom:address',
            //     Value: addressOne
            // },
            // {
            //     Name: 'custom:stateId',
            //     Value: state
            // },
            // {
            //     Name: 'custom:countryId',
            //     Value: country
            // },
            // {
            //     Name: 'custom:userType',
            //     Value: userType.label
            // },
            {
                Name: 'custom:empId',
                Value: newEmployeeId
            },

        ];

        const params = {
            UserPoolId: userPoolId,
            Username: username,
            UserAttributes: attributes
        };

        const params2 = {
            UserPoolId: userPoolId,
            Username: username,
            Password: password,
            Permanent: Permanent,
        };

        let userSub;
        try {
            const createUserResponse = await cognito.adminCreateUser(params).promise();
            userSub = createUserResponse.User?.Attributes?.find(attr => attr.Name === 'sub')?.Value;
            // setUserSub(userSub);
            // toast.success("Employee confirmed and saved successfully")

            // User Confirmation 
            cognito.adminSetUserPassword(params2, (err, data) => {
                if (err) {
                } else {
                }
            });

        } catch (error) {

            toast.error("Employee already exist.")
            setOpenNewEmployee(false)
            setNewEmployeeSchool(null);
            // setNewEmployeeName("");
            setNewEmpFirstName("");
            setNewEmpLastName("");
            setNewEmpSelectedRole(null);
            setNewEmpSelectedDesignation(null);
            setNewEmployeeCode("");
            setNewEmployeeEmail("");
            console.error('Error saving Cognito user:', error);
        }

        if (userSub !== null) {
            //Update Employee with Cognito UserId
            // const original = await API.graphql(
            //     graphqlOperation(queries.getEmployee,
            //         { id: newEmployeeId }
            //     )
            // );
            // const original = await DataStore.query(Employee, newEmployeeId);

            var original = await graphQLFindRecordById("getEmployee", newEmployeeId)

            // const updatedPost = await DataStore.save(
            //     Employee.copyOf(original, updated => {
            //         // updated.id= original.id,

            //         updated.user_Id = userSub
            //     })
            // );

            var AddedNewEmployee = await API.graphql(
                graphqlOperation(mutations.updateEmployee, {
                    input: {
                        user_Id: userSub,
                        id: original.id,
                        _version: original._version,
                    }
                })
            );

            // await DataStore.query(Employee, newEmployeeId);
            // await API.graphql(
            //     graphqlOperation(mutations.updateEmployee, {
            //         input: {
            //             id: original?.data?.getEmployee?.id,
            //             user_Id: userSub,
            //             _version: original?.data?.getEmployee?._version,
            //         }
            //     }))
            // await DataStore.save(
            //     Employee.copyOf(original, (updated) => {
            //         updated.user_Id = userSub
            //     })
            // );
            // const original = await DataStore.query(Employee, newEmployeeId);
            // const original = await graphQLFindRecordById("getEmployee", newEmployeeId)

            // // Update record
            // await API.graphql({
            //     query: mutations.updateEmployee,
            //     variables: {
            //         input: {
            //             id: original.id,
            //             _version: original._version,
            //             user_Id: userSub
            //         }
            //     }
            // });

            /* await DataStore.save(
                Employee.copyOf(original, (updated) => {
                    updated.user_Id = userSub
                })
            ); */

        }


    }
    const AddNewEmployee = async () => {
        if (NewEmployeeSchool === "" || NewEmployeeSchool === null) {
            toast.error("Please Select School/Department");
            return;
        }
        // else if (NewEmployeeName === null || NewEmployeeName === "") {
        //     toast.error("Please Enter Employee Name");
        //     return;
        // }
        else if (newEmpFirstName === null || newEmpFirstName === "") {
            toast.error("Please Enter Employee First Name");
            return;
        }
        else if (newEmpLastName === null || newEmpLastName === "") {
            toast.error("Please Enter Employee Last Name");
            return;
        }
        /*  else if (newEmpSelectedRole === null) {
             toast.error("Please Select Employee Role");
             return;
         }
         else if (newEmpSelectedDesignation === null) {
             toast.error("Please Select Employee Designation");
             return;
         } */

        else if (NewEmployeeCode === "") {
            toast.error("Please Enter Employee Code");
            return;
        } else if (NewEmployeeEmail === null || NewEmployeeEmail === "") {
            toast.error("Please Enter Employee Email");
            return;
        }

        //first check typed email id is already present or not

        // const matchedEmailRecord = await DataStore.query(Employee, (c) =>
        //     c.email.eq(NewEmployeeEmail));

        // const matchedEmailRecord = await DataStore.query(Employee, (c) =>
        // c.email.eq(NewEmployeeEmail));

        const matchedEmailRecord = allEmployeeList.filter(o => o.email === NewEmployeeEmail)

        if (matchedEmailRecord.length == 0) {
            // var AddedNewEmployee = await DataStore.save(new Employee(
            //     {
            //         "school_id": NewEmployeeSchool?.code,
            //         // "employee_name": NewEmployeeName,
            //         firstName: newEmpFirstName.toUpperCase(),
            //         lastName: capitalizeFirstChar(newEmpLastName),
            //         employee_name: capitalizeFirstChar(newEmpLastName) + ", " + newEmpFirstName.toUpperCase(),
            //         // lastName: newEmpLastName.toLowerCase(),
            //         // employee_name: newEmpLastName.toLowerCase() + ", " + newEmpFirstName.toUpperCase(),
            //         /* role: newEmpSelectedRole?.code,
            //         designation: newEmpSelectedDesignation.code, */

            //         "employee_code": NewEmployeeCode,
            //         "email": NewEmployeeEmail

            //     }
            // ))

            var AddedNewEmployee = await API.graphql(
                graphqlOperation(mutations.createEmployee, {
                    input: {
                        school_id: NewEmployeeSchool?.code,
                        firstName: newEmpFirstName.toUpperCase(),
                        lastName: capitalizeFirstChar(newEmpLastName),
                        employee_name: capitalizeFirstChar(newEmpLastName) + ", " + newEmpFirstName.toUpperCase(),
                        employee_code: NewEmployeeCode,
                        email: NewEmployeeEmail,
                    }
                })
            );

            if (AddedNewEmployee.data.createEmployee.
                id !== null) {
                //Save Cognito User
                await SaveUserToCognito(AddedNewEmployee.data.createEmployee.
                    id);
            }

            if (AddedNewEmployee.data.createEmployee.
                id !== null) {
                toast.success('Data Added Successfully.');
                // var employeeList = await DataStore.query(Employee, Predicates.ALL, {
                //     sort: s => s.employee_name(SortDirection.ASCENDING)
                // });
                var myArray = []; myArray = ConvertResponseForEmployeeSelect(allEmployeeList); setEmployeeCodeList(myArray);
                let obj = {
                    name: AddedNewEmployee.data.createEmployee.employee_name + " (" + AddedNewEmployee.data.createEmployee.employee_code + ")",
                    code: AddedNewEmployee.data.createEmployee.
                        id,
                    schoolId: AddedNewEmployee.data.createEmployee.school_id
                }
                setEmployeeCode(obj)
                setOpenNewEmployee(false)
                setNewEmployeeSchool(null);
                // setNewEmployeeName("");
                setNewEmpFirstName("");
                setNewEmpLastName("");
                setNewEmpSelectedRole(null);
                setNewEmpSelectedDesignation(null);
                setNewEmployeeCode("");
                setNewEmployeeEmail("");
            }
        } else {
            toast.error("Please Use Another Email");
        }
    }
    // initiateReportAction called
    const onClickEditPopUp = async (data) => {
        var requestId = data.id; setSubstituteReportId(requestId);
        SetPreviewAndEdit(false);
        SetBasicInfoPopUp(true);

        // const cognito = new AWS.CognitoIdentityServiceProvider();

        const substituteCertificateRequestTransactionCycleResponse = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: requestId } }])

        // const substituteCertificateRequestTransactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(requestId));

        //check for pending status 
        if (substituteCertificateRequestTransactionCycleResponse.length) {
            if (substituteCertificateRequestTransactionCycleResponse[0].status === "APPROVAL_REJECTED") { setRejectReportId("Rejected"); }
            else if (substituteCertificateRequestTransactionCycleResponse[0].status === "SUBMITTED") { setRejectReportId("Submitted"); }
            else if (substituteCertificateRequestTransactionCycleResponse[0].status === "RESUBMITTED") { setRejectReportId("Reviewed & resubmitted"); }
        }

        setShowNextPopUp(true);

        const substituteCertificateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", requestId)

        // const substituteCertificateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(requestId));

        const employeeCodeResponse = allEmployeeList.find(o => o.id === substituteCertificateRequestResponse.employeeCodeId)

        // const employeeCodeResponse = await DataStore.query(Employee, (c) => c.id.eq(substituteCertificateRequestResponse.employeeCodeId));

        setEmployeeDetailsName(employeeCodeResponse.employee_name)
        setEmployeeCode({
            name: employeeCodeResponse.employee_name + " (" + employeeCodeResponse.employee_code + ")", code: employeeCodeResponse.id, schoolId: employeeCodeResponse.school_id
        });

        if (substituteCertificateRequestResponse.substitudeName.length > 0) {
            if (substituteCertificateRequestResponse.isConfirmed === true) { seConfirmedValue("Yes") } else
                if (substituteCertificateRequestResponse.isConfirmed === false) { seConfirmedValue("No") }
        }
        else { seConfirmedValue("") }


        setAssignmentTitle(substituteCertificateRequestResponse.assignmentTitle); setClassification(substituteCertificateRequestResponse.classification);
        let fromDate = new Date(moment(substituteCertificateRequestResponse.fromDate).format("YYYY-MM-DD")); setFromDate(fromDate);
        let toDate = substituteCertificateRequestResponse.toDate && substituteCertificateRequestResponse.toDate !== null ? new Date(moment(substituteCertificateRequestResponse.toDate).format("YYYY-MM-DD")) : ''; setToDate(toDate);
        if (substituteCertificateRequestResponse.endTime) {
            const formattedDate = new Date(moment(`2023/07/12 ${substituteCertificateRequestResponse.endTime}`).format("YYYY-MM-DD HH:mm:ss.SSS"));
            //setEndTime(formattedDate)
            setEndTime(substituteCertificateRequestResponse.endTime)
        }

        if (substituteCertificateRequestResponse.fromTime) {
            const formattedDate = new Date(moment(`2023/07/12 ${substituteCertificateRequestResponse.fromTime}`).format("YYYY-MM-DD HH:mm:ss.SSS"));
            //setStartTime(formattedDate)
            setStartTime(substituteCertificateRequestResponse.fromTime)
        }

        setReasonForAbsenceRequest(substituteCertificateRequestResponse.reasonForAbsenceRequest);
        setSubstituteName(substituteCertificateRequestResponse.substitudeName);
        setTotalWorkingHours(substituteCertificateRequestResponse.totalWorkingHours)

        const locationResponse = schoolList.find(o => o.id === substituteCertificateRequestResponse.locationId)
        setLocation({ name: locationResponse.name, code: locationResponse.id });

        // const locationResponse = await DataStore.query(Schools, (c) => c.id.eq(substituteCertificateRequestResponse[0].locationId)); 
        // setLocation({ name: locationResponse[0].name, code: locationResponse[0].id });

        if (substituteCertificateRequestResponse.typeOfSub === "CODE1") { setTypeOfSubRequest({ name: "Code 1", code: substituteCertificateRequestResponse.typeOfSub }) }
        else if (substituteCertificateRequestResponse.typeOfSub === "CODE2") { setTypeOfSubRequest({ name: "Code 2", code: substituteCertificateRequestResponse.typeOfSub }) }
        else if (substituteCertificateRequestResponse.typeOfSub === "CODE3") { setTypeOfSubRequest({ name: "Code 3", code: substituteCertificateRequestResponse.typeOfSub }) }

        //get Principle Department Head 
        if (substituteCertificateRequestResponse.principleDepartmentHeadString) {

            let empName = allEmployeeList.find(o => o.user_Id === substituteCertificateRequestResponse.principleDepartmentHeadString)

            // let empName = await DataStore.query(Employee, (c) => c.user_Id.eq(substituteCertificateRequestResponse[0].principleDepartmentHeadString));

            let name = empName.employee_code ? `${empName.employee_name} (${empName.employee_code})` : empName.employee_name;

            let objFirst = { name: name, code: substituteCertificateRequestResponse.principleDepartmentHeadString }
            setPrincipalAndDepartmentHead(objFirst)

        }

        //get Budget Approver
        if (substituteCertificateRequestResponse.budgetApprover) {

            let empName = allEmployeeList.find(o => o.user_Id === substituteCertificateRequestResponse.budgetApprover)
            // let empName = await DataStore.query(Employee, (c) => c.user_Id.eq(substituteCertificateRequestResponse.budgetApprover));

            let name = empName.employee_code ? `${empName.employee_name} (${empName.employee_code})` : empName.employee_name;

            let objFirst = { name: name, code: substituteCertificateRequestResponse.budgetApprover }
            setBudgetApprover(objFirst)
        }

        //get Payroll Approver
        let payrollHrSet;
        // if (substituteCertificateRequestResponse.payrollHr) {
        //     try {
        //         payrollHrSet = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: substituteCertificateRequestResponse.payrollHr, }).promise();
        //     } catch (e) {
        //     }
    }
    // let thirdApproverFirstName = await GetValueFromArray(payrollHrSet.UserAttributes, "custom:firstName")
    // let thirdApproverLastName = await GetValueFromArray(payrollHrSet.UserAttributes, "custom:lastName")
    // let fullThirdName = thirdApproverFirstName + " " + thirdApproverLastName
    // let objThird = { name: fullThirdName, code: substituteCertificateRequestResponse.payrollHr }
    // setPayrollHR(objThird)
    // setPayrollListHR([objThird])

    //*get Account Numbers
    // const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: requestId } }])

    // const accountNumberResponse = await DataStore.query(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(requestId));

    //     let finalAccountNoArray = [];
    //     accountNumberResponse.map((item, index) => {
    //         let data = { "accountNo": item.accountNumber, "Percentage": item.percentage }; finalAccountNoArray.push(data);
    //         if (index === accountNumberResponse.length - 1) { setAccountNoArray(finalAccountNoArray); }
    //     })
    // }

    const toggleActive = () => {
        setActivate(activate === "actives" ? "" : "actives");
    };

    //*Clear All State
    const clearStates = async () => {

        setAssignmentTitle("");
        setEmployeeCode(null);
        setRejectReportId('')
        SetPreviewAndEdit(false);
        SetBasicInfoPopUp(true);
        // setPayrollHR('');
        setClassification("");
        setFromDate("");
        setToDate("");
        setStartTime('')
        setEndTime('');
        setTypeOfSubRequest(null);
        setLocation(null);
        setReasonForAbsenceRequest("");
        setTotalWorkingHours("");
        setSubstituteName("");
        setPrincipalAndDepartmentHead(null);
        setAccountNoArray([{
            "accountNo": "",
            "Percentage": ""
        }]);
        setEmployeeDetailsName("")
        seConfirmedValue('')
        setBudgetApprover(null)

    }

    //*Save Basic info
    const saveBasicInfo = async (status) => {
        let Percentage;
        accountNoArray.map((data, i) => {
            Percentage = data.Percentage;
        })

        //* get empty acc no
        if (assignmentTitle === null || assignmentTitle === "") { toast.error('Please Enter Assignment Title'); return; }
        else if (employeeCode === null || employeeCode === "") { toast.error('Please Select Employee Name'); return; }
        else if (classification === '' || classification === null) { toast.error('Please Enter Classification'); return; }
        else if (fromDate === "" || fromDate === null) { toast.error('Please Select From Date'); return; }
        else if (typeOfSubRequest === null || typeOfSubRequest === "") { toast.error('Please Select Type of Sub Request/Object Code'); return; }
        else if (location === null || location === "") { toast.error('Please Select Location'); return; }
        else if (reasonForAbsenceRequest === "" || reasonForAbsenceRequest === null) { toast.error('Please Enter Reason For Absence Request'); return; }
        else if (principalAndDepartmentHead === null || principalAndDepartmentHead === "") { toast.error('Please Select Principal And Department Head'); return; }
        //else if (payrollHR === null || payrollHR === "") { toast.error('Please Select Human Resource'); return; }
        else if (startTime === null || startTime === "" || startTime === 'Invalid date') { toast.error('Please Select Start Time'); return; }
        else if (endTime === null || endTime === "" || endTime === 'Invalid date') { toast.error('Please Select End Time'); return; }
        else if (Percentage > 100) { toast.error('Percentage cannot be greater than 100'); return; }
        const allAccountNumbersEmpty = accountNoArray.every(item => item.accountNo === '');
        if (allAccountNumbersEmpty) {
            toast.error('Please Enter Account Number');
            return;
        }

        //if substituteName enter then confirmed radio button mandatory start
        if (substituteName != '') {
            if (confirmedValue == '') {
                toast.error('Please Select Confirmation'); return;
            }
        }
        //if substituteName enter then confirmed radio button mandatory end


        // if (toDate === "" || toDate === null) {
        //     setToDate(new Date())
        //     toDate = new Date()
        // }

        if (status === 'OPEN') {

            if (isUpdate) {

                //update basic info pending case

                if (isUpdate) {
                    var original = await graphQLFindRecordById("getSubstituteCertificateRequest", substituteReportId)

                    // const original = await DataStore.query(SubstituteCertificateRequest, substituteReportId);

                    await API.graphql({
                        query: mutations.updateSubstituteCertificateRequest,
                        variables: {
                            input: {
                                id: original.id,
                                _version: original._version,
                                assignmentTitle: assignmentTitle,
                                classification: classification,
                                employeeCodeId: employeeCode.code,
                                fromDate: moment(fromDate).format("YYYY-MM-DD"),
                                toDate: toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                                typeOfSub: typeOfSubRequest.code,
                                locationId: location.code,
                                reasonForAbsenceRequest: reasonForAbsenceRequest,
                                substitudeName: substituteName,
                                isConfirmed: confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                                principleDepartmentHeadString: principalAndDepartmentHead.code,
                                createdBy: loggedUserId,
                                CreatedByDateTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                fromTime: startTime, //moment(startTime).format('HH:mm:ss.SSS');
                                endTime: endTime, // moment(endTime).format('HH:mm:ss.SSS');
                                payrollHr: payrollHR.code,
                                totalWorkingHours: totalWorkingHours,
                                budgetApprover: budgetApprover?.code
                            }
                        }
                    });

                    const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: substituteReportId } }])

                    for (let i = 0; i < accountNumberResponse.length; i++) {
                        for (let i = 0; i < accountNumberResponse.length; i++) {
                            //Delete Record
                            const originalUpdated = await API.graphql({
                                query: mutations.deleteSubstituteCertificateRequestAccountNoIDs,
                                variables: {
                                    input: {
                                        id: accountNumberResponse[i].id,
                                        _version: accountNumberResponse[i]._version,
                                    }
                                }
                            });
                        }
                    }

                    accountNoArray.map(async (item, index) => {

                        // Create record
                        await API.graphql(
                            graphqlOperation(mutations.createSubstituteCertificateRequestAccountNoIDs, {
                                input: {
                                    substituteCertificateRequestId: original.id,
                                    accountNumber: item.accountNo,
                                    percentage: item.Percentage,
                                }
                            })
                        );

                        if (index === accountNoArray.length - 1) {

                            let transactionCyclesResponse = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteReportId } }])

                            for (let i = 0; i < transactionCyclesResponse.length; i++) {
                                //Delete Record
                                const originalUpdated = await API.graphql({
                                    query: mutations.deleteSubstituteCertificateRequestTransactionCycle,
                                    variables: {
                                        input: {
                                            id: transactionCyclesResponse[i].id,
                                            _version: transactionCyclesResponse[i]._version,
                                        }
                                    }
                                });
                            }

                            // Create record
                            var substituteCertificateRequestTransactionCycle = await API.graphql(
                                graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                                    input: {
                                        reportId: substituteReportId,
                                        fromEmployeeId: loggedUserId,
                                        toEmployeeId: principalAndDepartmentHead.code,
                                        status: status,
                                        isApproved: false,
                                        remark: "",
                                        date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                    }
                                })
                            );

                            toast.success('Data Updated Successfully.');
                            //setShowNextPopUp(false);
                            BindList();
                            //clearStates();
                            //setIsUpdate(false);
                            // handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', substituteCertificateRequestTransactionCycle.data.createSubstituteCertificateRequestTransactionCycle.reportId, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);

                        }
                    })

                    // .then(async (response) => {
                    //     await DataStore.delete(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(substituteReportId)).then(async (accountNoResponse) => {
                    //         accountNoArray.map(async (item, index) => {
                    //             await DataStore.save(
                    //                 new SubstituteCertificateRequestAccountNoIDs({
                    //                     "substituteCertificateRequestId": response.id,
                    //                     "accountNumber": item.accountNo,
                    //                     "percentage": item.Percentage,
                    //                 })
                    //             )

                    //             if (index === accountNoArray.length - 1) {

                    //                 var transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                    //                     c.reportId.eq(substituteReportId),
                    //                     c.toEmployeeId.eq(principalAndDepartmentHead.code),
                    //                     c.fromEmployeeId.eq(loggedUserId),
                    //                     c.isApproved.eq(false),
                    //                 ]));

                    //                 if (transactionCycleResponse.length > 0) {
                    //                     await DataStore.delete(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                    //                         c.reportId.eq(substituteReportId),
                    //                         c.toEmployeeId.eq(principalAndDepartmentHead.code),
                    //                         c.fromEmployeeId.eq(loggedUserId),
                    //                         c.isApproved.eq(false),
                    //                     ]));
                    //                 }

                    //                 // await DataStore.delete(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(substituteReportId)).then(async (transactionCycleResponse) => {
                    //                 await DataStore.save(
                    //                     new SubstituteCertificateRequestTransactionCycle({
                    //                         "reportId": substituteReportId,
                    //                         "fromEmployeeId": loggedUserId,
                    //                         "toEmployeeId": principalAndDepartmentHead.code,
                    //                         "status": status,
                    //                         "isApproved": false,
                    //                         "remark": "",
                    //                         "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    //                     })
                    //                 ).then((afterTanscationResponse) => {
                    //                     toast.success('Data Updated Successfully.');
                    //                     //setShowNextPopUp(false);
                    //                     BindList();
                    //                     //clearStates();
                    //                     //setIsUpdate(false);
                    //                     handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', afterTanscationResponse.reportId, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);
                    //                 })
                    //                 // });
                    //             }
                    //         })
                    //     });
                    // })
                }
            } else {

                var createSubstituteCertificateRequest = await API.graphql(
                    graphqlOperation(mutations.createSubstituteCertificateRequest, {
                        input: {
                            assignmentTitle: assignmentTitle,
                            classification: classification,
                            employeeCodeId: employeeCode.code,
                            fromDate: moment(fromDate).format("YYYY-MM-DD"),
                            toDate: toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                            typeOfSub: typeOfSubRequest.code,
                            locationId: location.code,
                            reasonForAbsenceRequest: reasonForAbsenceRequest,
                            substitudeName: substituteName,
                            isConfirmed: confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                            fromTime: startTime, //moment(startTime).format('HH:mm:ss.SSS'),
                            endTime: endTime, // moment(endTime).format('HH:mm:ss.SSS'),
                            payrollHr: payrollHR.code,
                            totalWorkingHours: totalWorkingHours,
                            budgetApprover: budgetApprover?.code,
                            principleDepartmentHeadString: principalAndDepartmentHead.code,
                            createdBy: loggedUserId,
                            CreatedByDateTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                        }
                    })
                );

                if (createSubstituteCertificateRequest) {

                    accountNoArray.map(async (item, index) => {

                        // Create record
                        await API.graphql(
                            graphqlOperation(mutations.createSubstituteCertificateRequestAccountNoIDs, {
                                input: {
                                    substituteCertificateRequestId: createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id,
                                    accountNumber: item.accountNo,
                                    percentage: item.Percentage,
                                }
                            })
                        );

                        if (index === accountNoArray.length - 1) {

                            // Create record
                            var substituteCertificateRequestTransactionCycle = await API.graphql(
                                graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                                    input: {
                                        reportId: createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id,
                                        fromEmployeeId: loggedUserId,
                                        toEmployeeId: "-",
                                        status: status,
                                        isApproved: false,
                                        remark: "",
                                        date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                    }
                                })
                            );

                            toast.success('Data Added Successfully.');
                            //setShowNextPopUp(false);
                            setIsUpdate(true)
                            setSubstituteReportId(createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id)
                            BindList();
                            return
                            // clearStates();
                        }
                    })
                }

                //Save Basic Info
                // await DataStore.save(
                //     new SubstituteCertificateRequest({
                //         "assignmentTitle": assignmentTitle,
                //         "classification": classification,
                //         "employeeCodeId": employeeCode.code,
                //         "fromDate": moment(fromDate).format("YYYY-MM-DD"),
                //         "toDate": toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                //         "typeOfSub": typeOfSubRequest.code,
                //         "locationId": location.code,
                //         "reasonForAbsenceRequest": reasonForAbsenceRequest,
                //         "substitudeName": substituteName,
                //         "isConfirmed": confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                //         "fromTime": startTime, //moment(startTime).format('HH:mm:ss.SSS'),
                //         "endTime": endTime, // moment(endTime).format('HH:mm:ss.SSS'),
                //         "payrollHr": payrollHR?.code,
                //         "totalWorkingHours": totalWorkingHours,
                //         "budgetApprover": budgetApprover?.code,
                //         "principleDepartmentHeadString": principalAndDepartmentHead.code,
                //         "createdBy": loggedUserId,
                //         "CreatedByDateTime": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                //     })
                // )  .then(async (response) => {

                //     accountNoArray.map(async (item, index) => {
                //         await DataStore.save(
                //             new SubstituteCertificateRequestAccountNoIDs({
                //                 "substituteCertificateRequestId": response.id,
                //                 "accountNumber": item.accountNo,
                //                 "percentage": item.Percentage,
                //             })
                //         )

                //         if (index === accountNoArray.length - 1) {
                //             /*  await DataStore.save(
                //                  new SubstituteCertificateRequestTransactionCycle({
                //                      "reportId": response.id,
                //                      "fromEmployeeId": loggedUserId,
                //                      "toEmployeeId": "-",
                //                      "status": status,
                //                      "isApproved": false,
                //                      "remark": "",
                //                      "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                //                  })
                //              ).then(() => { */
                //             toast.success('Data Added Successfully.');
                //             //setShowNextPopUp(false);
                //             setIsUpdate(true)
                //             setSubstituteReportId(response.id)
                //             BindList();
                //             return
                //             // clearStates();
                //             // })
                //         }
                //     })
                // })
            }

        } else {
            if (isUpdate) {

                var original = await graphQLFindRecordById("getSubstituteCertificateRequest", substituteReportId)

                // const original = await DataStore.query(SubstituteCertificateRequest, substituteReportId);

                await API.graphql({
                    query: mutations.updateSubstituteCertificateRequest,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            assignmentTitle: assignmentTitle,
                            classification: classification,
                            employeeCodeId: employeeCode.code,
                            fromDate: moment(fromDate).format("YYYY-MM-DD"),
                            toDate: toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                            typeOfSub: typeOfSubRequest.code,
                            locationId: location.code,
                            reasonForAbsenceRequest: reasonForAbsenceRequest,
                            substitudeName: substituteName,
                            isConfirmed: confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                            principleDepartmentHeadString: principalAndDepartmentHead.code,
                            createdBy: loggedUserId,
                            CreatedByDateTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                            fromTime: startTime, //moment(startTime).format('HH:mm:ss.SSS');
                            endTime: endTime, // moment(endTime).format('HH:mm:ss.SSS');
                            payrollHr: payrollHR.code,
                            totalWorkingHours: totalWorkingHours,
                            budgetApprover: budgetApprover?.code
                        }
                    }
                });

                const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: substituteReportId } }])

                for (let i = 0; i < accountNumberResponse.length; i++) {
                    //Delete Record
                    const originalUpdated = await API.graphql({
                        query: mutations.deleteSubstituteCertificateRequestAccountNoIDs,
                        variables: {
                            input: {
                                id: accountNumberResponse[i].id,
                                _version: accountNumberResponse[i]._version,
                            }
                        }
                    });
                }

                accountNoArray.map(async (item, index) => {
                    // Create record
                    var SubstituteCertificateRequestAccountNoIDs = await API.graphql(
                        graphqlOperation(mutations.createSubstituteCertificateRequestAccountNoIDs, {
                            input: {
                                substituteCertificateRequestId: original.id,
                                accountNumber: item.accountNo,
                                percentage: item.Percentage,
                            }
                        })
                    );

                    if (index === accountNoArray.length - 1) {

                        const substituteCertificateRequestTransactionCycles = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteReportId } }])

                        let transactionCycleResponse = substituteCertificateRequestTransactionCycles.sort((b, a) => (a.createdAt).localeCompare(b.createdAt));

                        // for (let i = 0; i < substituteCertificateRequestTransactionCycles.length; i++) {
                        //// Delete Record
                        // const originalUpdated = await API.graphql({
                        // query: mutations.deleteSubstituteCertificateRequestTransactionCycle,
                        // variables: {
                        // input: {
                        // id: substituteCertificateRequestTransactionCycles[i].id,
                        // _version: substituteCertificateRequestTransactionCycles[i]._version,
                        // }
                        // }
                        // });
                        // }

                        //when resubmitted report after reject
                        if (status === CertificatedAdminWeeklyAbsenceReportStatus.RESUBMITTED) {
                            // Create record
                            var substituteCertificateRequestTransactionCycle = await API.graphql(
                                graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                                    input: {
                                        reportId: substituteReportId,
                                        fromEmployeeId: loggedUserId,
                                        toEmployeeId: principalAndDepartmentHead.code,
                                        status: status,
                                        isApproved: false,
                                        remark: "",
                                        date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                    }
                                })
                            );
                        }
                        else {

                            if (transactionCycleResponse.length > 0) {
                                // Create record
                                var substituteCertificateRequestTransactionCycle = await API.graphql(
                                    graphqlOperation(mutations.updateSubstituteCertificateRequestTransactionCycle, {
                                        input: {
                                            id: transactionCycleResponse[0].id,
                                            _version: transactionCycleResponse[0]._version,
                                            reportId: substituteReportId,
                                            fromEmployeeId: loggedUserId,
                                            toEmployeeId: principalAndDepartmentHead.code,
                                            status: status,
                                            isApproved: false,
                                            remark: "",
                                            date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                        }
                                    })
                                );
                            }
                        }

                        toast.success('Data Updated Successfully.');
                        setShowNextPopUp(false);
                        BindList();
                        clearStates();
                        setIsUpdate(false);
                        handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', substituteReportId, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);
                    }
                }
                );

                // await DataStore.save(
                //     SubstituteCertificateRequest.copyOf(original, (updated) => {
                //         updated.assignmentTitle = assignmentTitle;
                //         updated.classification = classification;
                //         updated.employeeCodeId = employeeCode.code;
                //         updated.fromDate = moment(fromDate).format("YYYY-MM-DD");
                //         updated.toDate = toDate ? moment(toDate).format("YYYY-MM-DD") : null;
                //         updated.typeOfSub = typeOfSubRequest.code;
                //         updated.locationId = location.code;
                //         updated.reasonForAbsenceRequest = reasonForAbsenceRequest;
                //         updated.substitudeName = substituteName;
                //         updated.isConfirmed = confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null;
                //         updated.principleDepartmentHeadString = principalAndDepartmentHead.code;
                //         updated.createdBy = loggedUserId;
                //         updated.CreatedByDateTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                //         updated.fromTime = startTime; //moment(startTime).format('HH:mm:ss.SSS');
                //         updated.endTime = endTime; //moment(endTime).format('HH:mm:ss.SSS');
                //         updated.payrollHr = payrollHR?.code;
                //         updated.totalWorkingHours = totalWorkingHours;
                //         updated.budgetApprover = budgetApprover?.code;
                //     })
                // ).then(async (response) => {
                //     await DataStore.delete(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(substituteReportId)).then(async (accountNoResponse) => {
                //         accountNoArray.map(async (item, index) => {
                //             await DataStore.save(
                //                 new SubstituteCertificateRequestAccountNoIDs({
                //                     "substituteCertificateRequestId": response.id,
                //                     "accountNumber": item.accountNo,
                //                     "percentage": item.Percentage,
                //                 })
                //             )

                //             if (index === accountNoArray.length - 1) {

                //                 //when resubmitted report after reject
                //                 if (status === CertificatedAdminWeeklyAbsenceReportStatus.RESUBMITTED) {

                //                     await DataStore.save(
                //                         new SubstituteCertificateRequestTransactionCycle({
                //                             "reportId": substituteReportId,
                //                             "fromEmployeeId": loggedUserId,
                //                             "toEmployeeId": principalAndDepartmentHead.code,
                //                             "status": status,
                //                             "isApproved": false,
                //                             "remark": "",
                //                             "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                //                         })
                //                     ).then((afterTanscationResponse) => {
                //                         toast.success('Data Updated Successfully.');
                //                         setShowNextPopUp(false);
                //                         BindList();
                //                         clearStates();
                //                         setIsUpdate(false);

                //                         handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', afterTanscationResponse.reportId, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);
                //                     })

                //                 } else {
                //                     /*  var transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                //                          c.reportId.eq(substituteReportId),
                //                          c.toEmployeeId.eq(principalAndDepartmentHead.code),
                //                          c.fromEmployeeId.eq(loggedUserId),
                //                          c.isApproved.eq(false),
                //                      ]));

                //                      if (transactionCycleResponse.length > 0) {
                //                          await DataStore.delete(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                //                              c.reportId.eq(substituteReportId),
                //                              c.toEmployeeId.eq(principalAndDepartmentHead.code),
                //                              c.fromEmployeeId.eq(loggedUserId),
                //                              c.isApproved.eq(false),
                //                          ]));
                //                      } */

                //                     // await DataStore.delete(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(substituteReportId)).then(async (transactionCycleResponse) => {
                //                     await DataStore.save(
                //                         new SubstituteCertificateRequestTransactionCycle({
                //                             "reportId": substituteReportId,
                //                             "fromEmployeeId": loggedUserId,
                //                             "toEmployeeId": principalAndDepartmentHead.code,
                //                             "status": status,
                //                             "isApproved": false,
                //                             "remark": "",
                //                             "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                //                         })
                //                     ).then((afterTanscationResponse) => {
                //                         toast.success('Data Updated Successfully.');
                //                         setShowNextPopUp(false);
                //                         BindList();
                //                         clearStates();
                //                         setIsUpdate(false);

                //                         handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', afterTanscationResponse.reportId, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);
                //                     })
                //                     // });
                //                 }
                //             }
                //         })
                //     });
                // })

            } else {
                //Save Basic Info

                var createSubstituteCertificateRequest = await API.graphql(
                    graphqlOperation(mutations.createSubstituteCertificateRequest, {
                        input: {
                            assignmentTitle: assignmentTitle,
                            classification: classification,
                            employeeCodeId: employeeCode.code,
                            fromDate: moment(fromDate).format("YYYY-MM-DD"),
                            toDate: toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                            typeOfSub: typeOfSubRequest.code,
                            locationId: location.code,
                            reasonForAbsenceRequest: reasonForAbsenceRequest,
                            substitudeName: substituteName,
                            isConfirmed: confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                            fromTime: startTime, //moment(startTime).format('HH:mm:ss.SSS'),
                            endTime: endTime, // moment(endTime).format('HH:mm:ss.SSS'),
                            payrollHr: payrollHR.code,
                            totalWorkingHours: totalWorkingHours,
                            budgetApprover: budgetApprover?.code,
                            principleDepartmentHeadString: principalAndDepartmentHead.code,
                            createdBy: loggedUserId,
                            CreatedByDateTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                        }
                    })
                );

                if (createSubstituteCertificateRequest) {

                    accountNoArray.map(async (item, index) => {

                        // Create record
                        await API.graphql(
                            graphqlOperation(mutations.createSubstituteCertificateRequestAccountNoIDs, {
                                input: {
                                    substituteCertificateRequestId: createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id,
                                    accountNumber: item.accountNo,
                                    percentage: item.Percentage,
                                }
                            })
                        );

                        if (index === accountNoArray.length - 1) {

                            // Create record
                            var substituteCertificateRequestTransactionCycle = await API.graphql(
                                graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                                    input: {
                                        reportId: createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id,
                                        fromEmployeeId: loggedUserId,
                                        toEmployeeId: principalAndDepartmentHead.code,
                                        status: status,
                                        isApproved: false,
                                        remark: "",
                                        date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                    }
                                })
                            );

                            handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', createSubstituteCertificateRequest.data.createSubstituteCertificateRequest.id, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);

                            toast.success('Data Added Successfully.');
                            setShowNextPopUp(false);
                            BindList();
                            clearStates();
                            // clearStates();
                        }
                    })
                }

                // await DataStore.save(
                //     new SubstituteCertificateRequest({
                //         "assignmentTitle": assignmentTitle,
                //         "classification": classification,
                //         "employeeCodeId": employeeCode.code,
                //         "fromDate": moment(fromDate).format("YYYY-MM-DD"),
                //         "toDate": toDate ? moment(toDate).format("YYYY-MM-DD") : null,
                //         "typeOfSub": typeOfSubRequest.code,
                //         "locationId": location.code,
                //         "reasonForAbsenceRequest": reasonForAbsenceRequest,
                //         "substitudeName": substituteName,
                //         "isConfirmed": confirmedValue === "Yes" ? true : confirmedValue === "No" ? false : null,
                //         "fromTime": startTime, //moment(startTime).format('HH:mm:ss.SSS'),
                //         "endTime": endTime, //moment(endTime).format('HH:mm:ss.SSS'),
                //         "payrollHr": payrollHR?.code,
                //         "totalWorkingHours": totalWorkingHours,
                //         "budgetApprover": budgetApprover?.code,
                //         "principleDepartmentHeadString": principalAndDepartmentHead.code,
                //         "createdBy": loggedUserId,
                //         "CreatedByDateTime": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                //     })
                // ).then(async (response) => {

                //     accountNoArray.map(async (item, index) => {
                //         await DataStore.save(
                //             new SubstituteCertificateRequestAccountNoIDs({
                //                 "substituteCertificateRequestId": response.id,
                //                 "accountNumber": item.accountNo,
                //                 "percentage": item.Percentage,
                //             })
                //         )

                //         if (index === accountNoArray.length - 1) {
                //             await DataStore.save(
                //                 new SubstituteCertificateRequestTransactionCycle({
                //                     "reportId": response.id,
                //                     "fromEmployeeId": loggedUserId,
                //                     "toEmployeeId": principalAndDepartmentHead.code,
                //                     "status": status,
                //                     "isApproved": false,
                //                     "remark": "",
                //                     "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                //                 })
                //             ).then((afterTanscationResponse) => {
                //                 handleNotificationsOnStatusChangeforClassifiedSubRequest('OPEN', response.id, "CLASSIFIED_SUB_REQUEST", principalAndDepartmentHead.code, loggedUserId);
                //                 toast.success('Data Added Successfully.');
                //                 setShowNextPopUp(false);
                //                 BindList();
                //                 clearStates();
                //             })
                //         }
                //     })
                // })
            }
        }
    }

    // AWS.config.update({
    //     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    //     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    //     //region: process.env.REACT_APP_AWS_Region,
    // });

    const requestedReportAction = (row) => {


        return (
            <div className="flex justify-center w-full gap-2">
                {
                    row.isApproved === true ?
                        <Link href='' className="py-2 px-2.5" onClick={() => {
                            onClickRequestedReportViewPopup(row, 'right')
                        }}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :

                        row.status === 'Pending for Approval' || row.status === 'Pending for approval' ?
                            <Link href='' className="py-2 px-2.5"
                                // onClick={() => { setVisibleRight(true); onClickPopup(row); }}
                                onClick={() => {
                                    onClickRequestedReportEditPopUp(row)
                                }}
                            ><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link> :
                            row.status === 'Approved' || row.designation === 'Completed' || row.isApproved === true ?
                                <Link href='' className="py-2 px-2.5" onClick={() => {
                                    onClickRequestedReportViewPopup(row, 'right')
                                }}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
                                row.designation === 'Rejected' ?
                                    <Link href='' className="py-2 px-2.5" onClick={() => {
                                        onClickRequestedReportViewPopup(row, 'right')
                                    }}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
                                    null
                }
            </div >
        );
    };

    //action layout code start
    const initiateReportAction = (row) => {
        return (
            <div className="flex justify-center w-full gap-2" >

                {
                    row.status === "Approved" || row.designation === 'Completed' || row.designation === "Pending for Budget Approver" ||
                        row.designation === "Pending for Acknowledgement"
                        ? <Link href='#' className="py-2 px-2.5" onClick={() => {
                            onClickRequestedReportViewPopup(row, 'right');
                        }}>
                            <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link>
                        :
                        row.status === "Submitted" ? <Link href='#' className="py-2 px-2.5" onClick={() => {
                            setIsUpdate(true);
                            onClickEditPopUp(row);
                        }}><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link> :
                            row.status === "Reviewed & resubmitted" ? <Link href='#' className="py-2 px-2.5" onClick={() => {
                                setIsUpdate(true);
                                onClickEditPopUp(row);
                            }}><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link> :
                                row.status === "Rejected" ? <Link href='#' className="py-2 px-2.5"
                                    onClick={() => {
                                        setIsUpdate(true);
                                        onClickEditPopUp(row);
                                    }}
                                ><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link> :
                                    <Link href='#' className="py-2 px-2.5"
                                        // onClick={() => {
                                        //     setIsUpdate(true);
                                        //     onClickEditPopUp(row);
                                        // }}
                                        onClick={() => { initiateNewReport(); clearStates() }}
                                    ><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link>
                }
            </div>
        );
    };

    const requestReportStatusOptions = (product) => {

        switch (product.designation) {
            case 'Reviewed & resubmitted':
                return 'info';

            case 'Rejected':
                return 'danger';

            case 'Pending for Principal/Department Head':
                return 'warning';

            case 'Pending for Budget Approver':
                return 'warning';

            case 'Pending for Acknowledgement':
                return 'warning';

            case 'Submitted':
                return 'info';

            case 'Approved':
                return 'success';

            case 'Completed':
                return 'success';

            case 'Approved (P)':
                return 'success';

            default:
                return null;
        }
    };


    const payrollStatusOptions = product => {
        switch (product.status) {
            case "Pending for Acknowledge":
                return "warning";

            case "Completed":
                return "success";


            case 'Rejected':
                return 'danger';

            case 'Closed':
                return 'success';

            default:
                return null;
        }
    };

    const requestReportStatus = (product) => {
        return <><Badge value="" severity={requestReportStatusOptions(product)}></Badge>{product.designation}</>;
    };

    const payrollStatusBody = product => {
        return <><Badge value="" severity={requestReportStatusOptions(product)}></Badge> {product.designation}</>;
    };

    const approvalStatusBody = (product) => {
        let pstatus = product.status === 'APPROVAL_ACCEPTED' ? "Approved" :
            product.status === 'Pending For Approval' ? "Pending For Approval" : product.status
        return <Tag value={pstatus} severity={approveStatusOptions(product)}></Tag>;
    };

    const approveStatusOptions = (product) => {
        switch (product.status) {
            case 'Rejected':
                return 'danger';

            case 'APPROVAL_REJECTED':
                return 'danger';

            case 'Completed':
                return 'success';

            case 'Pending For Approval':
                return 'warning';

            case 'Close':
                return 'success';
            case 'Approved':
                return 'success';

            case 'APPROVAL_ACCEPTED':
                return 'success';

            case 'RESUBMITTED':
                return 'info';

            case 'SUBMITTED':
                return 'info';

            case 'Submitted':
                return 'info';

            case 'Reviewed & resubmitted':
                return 'info';
            case 'OPEN':
                return 'info';
            default:
                return null;
        }
    };

    //approve report function
    const approveSelectedReport = async (reportId, status) => {
        //get reporting manager from SixthPeriodAssignmentInitiateReport table
        if (status === "APPROVAL_ACCEPTED") {
            try {


                setIsdisabled(true);

                //get particular report id metadata from CertificatedSubInitiateRequest table
                // const CertificatedSubInitiateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(reportId));

                var CertificatedSubInitiateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", reportId)

                // first update CertificatedSubRequestTransactionCycle particular report id entry.
                // const original = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(reportId), {
                //     sort: (s) => s.date(SortDirection.DESCENDING)
                // });

                var originalSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: reportId } }])

                let original = originalSort.sort((b, a) => (a.date).localeCompare(b.date));

                if (original) {

                    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

                    // const updatedPost = await DataStore.save(
                    //     SubstituteCertificateRequestTransactionCycle.copyOf(original[0], updated => {
                    //         updated.status = status;
                    //         updated.isApproved = true;
                    //         updated.date = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    //         updated.customUpdatedAt = currentDateTime;

                    //     })
                    // );

                    const updatedPost = await API.graphql({
                        query: mutations.updateSubstituteCertificateRequestTransactionCycle,
                        variables: {
                            input: {
                                id: original[0].id,
                                _version: original[0]._version,
                                status: status,
                                isApproved: true,
                                date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                customUpdatedAt: currentDateTime
                            }
                        }
                    });

                    if (updatedPost.data.updateSubstituteCertificateRequestTransactionCycle.id) {
                        if (CertificatedSubInitiateRequestResponse) {

                            let firstApprover = CertificatedSubInitiateRequestResponse.principleDepartmentHeadString;
                            let secondApprover = CertificatedSubInitiateRequestResponse.budgetApprover;
                            let payroll = CertificatedSubInitiateRequestResponse.payrollHr;

                            //check if logger user is first or second or third approver
                            var toEmployee;
                            var isPayroll = 0;

                            switch (loggedUserId) {
                                case firstApprover:
                                    if (secondApprover) {
                                        toEmployee = secondApprover;
                                    } else {
                                        toEmployee = payroll;
                                        isPayroll = 1;
                                    }
                                    break;
                                case secondApprover:
                                    toEmployee = payroll;
                                    isPayroll = 1;
                                    break;
                                default:
                                    //means logged in user is Payroll
                                    toEmployee = 'no further';
                                    break;
                            }


                            try {
                                //after we add entry in CertificatedSubRequestTransactionCycle table
                                const currentDateTime2 = moment().format("YYYY-MM-DD HH:mm:ss");

                                // const CertificatedSubRequestTransactionCycleResponse = await DataStore.save(new SubstituteCertificateRequestTransactionCycle(
                                //     {
                                //         reportId: reportId,
                                //         fromEmployeeId: loggedUserId,
                                //         toEmployeeId: toEmployee,
                                //         status: CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED,
                                //         isApproved: false,
                                //         date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                //         customUpdatedAt: currentDateTime2,
                                //     }
                                // ));

                                var CertificatedSubRequestTransactionCycleResponse = await API.graphql(
                                    graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                                        input: {
                                            reportId: reportId,
                                            fromEmployeeId: loggedUserId,
                                            toEmployeeId: toEmployee,
                                            status: CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED,
                                            isApproved: false,
                                            remark: "",
                                            date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                            customUpdatedAt: currentDateTime2,
                                        }
                                    })
                                );

                                handleNotificationsOnStatusChangeforClassifiedSubRequest('PENDING_FOR_APPROVE', reportId, "CLASSIFIED_SUB_REQUEST", toEmployee, CertificatedSubInitiateRequestResponse.createdBy);

                                handleNotificationsOnStatusChangeforClassifiedSubRequest('APPROVEDBY', reportId, "CLASSIFIED_SUB_REQUEST", CertificatedSubInitiateRequestResponse.createdBy, loggedUserId);
                            }
                            catch (err) {
                            }
                        }

                    } else {
                        toast.error('Something Went Wrong...');
                    }
                    setIsLoader(true)
                    setConfirmVisibleApprove(true)
                    setIsdisabled(false);
                    setVisibleRequestedReportEdit(false);
                }
            }
            catch (err) {

            }
            setSubstituteRequestClassifiedReportListApproval([]);
            BindList();
        }

        else if (status === "APPROVAL_REJECTED") {
            try {





                /* const transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(reportId)); */

                // let transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle,
                //     (c) => c.reportId.eq(reportId), { sort: (s) => s.createdAt(SortDirection.ASCENDING) });

                const transactionCycleResponseSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: reportId } }])


                let transactionCycleResponse = transactionCycleResponseSort.sort((a, b) => (a.createdAt).localeCompare(b.createdAt));

                // const original = await DataStore.query(SubstituteCertificateRequestTransactionCycle, transactionCycleResponse[transactionCycleResponse.length - 1].id);

                var original = await graphQLFindRecordById("getSubstituteCertificateRequestTransactionCycle", transactionCycleResponse[transactionCycleResponse.length - 1].id)

                // const CertificatedSubInitiateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(reportId));

                var CertificatedSubInitiateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", reportId)


                const currentDateTime4 = moment().format("YYYY-MM-DD HH:mm:ss");

                // Update record
                await API.graphql({
                    query: mutations.updateSubstituteCertificateRequestTransactionCycle,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            status: status,
                            remark: rejectMsgValue,
                            date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                            customUpdatedAt: currentDateTime4,
                        }
                    }
                });

                setRejectValueMsg("");
                handleNotificationsOnStatusChangeforClassifiedSubRequest('REJECTED', reportId, "CLASSIFIED_SUB_REQUEST", CertificatedSubInitiateRequestResponse.createdBy, loggedUserId, rejectMsgValue);
                BindList();

                // await DataStore.save(
                //     SubstituteCertificateRequestTransactionCycle.copyOf(original, (updated) => {
                //         updated.status = status;
                //         updated.remark = rejectMsgValue;
                //         // updated.isApproved = false;
                //         updated.date = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                //         updated.customUpdatedAt = currentDateTime4;
                //     })
                // ).then(async (response) => {
                //     setRejectValueMsg("");
                //     handleNotificationsOnStatusChangeforClassifiedSubRequest('REJECTED', reportId, "CLASSIFIED_SUB_REQUEST", CertificatedSubInitiateRequestResponse[0].createdBy, loggedUserId, rejectMsgValue);
                //     BindList();
                // })
            }
            catch (err) {
            }
        }
        setSelectedEmployeeForApprovals(null)
        setIsApproveButtonDisable(false);
    }

    const approveSelectedReportFrom = async (reportId, status, toEmployeeId, fromEmployeeId, initiatorUser) => {
        const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        try {
            // var transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
            // c.reportId.eq(reportId),
            // c.toEmployeeId.eq(toEmployeeId),
            // c.fromEmployeeId.eq(fromEmployeeId),
            // ]));

            // var transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
            //     c.reportId.eq(reportId),
            //     c.toEmployeeId.eq(toEmployeeId),
            //     c.fromEmployeeId.eq(fromEmployeeId),

            // ]), { sort: (s) => s.date(SortDirection.DESCENDING) });

            const transactionCycleResponseSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: reportId }, toEmployeeId: { eq: toEmployeeId }, fromEmployeeId: { eq: fromEmployeeId } }])
            let transactionCycleResponse = transactionCycleResponseSort.sort((b, a) => (a.date).localeCompare(b.date));


            var original = await graphQLFindRecordById("getSubstituteCertificateRequestTransactionCycle", transactionCycleResponse[0].id)

            // const original = await DataStore.query(SubstituteCertificateRequestTransactionCycle, transactionCycleResponse[0].id);

            await API.graphql({
                query: mutations.updateSubstituteCertificateRequestTransactionCycle,
                variables: {
                    input: {
                        id: original.id,
                        _version: original._version,
                        status: status,
                        date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                        customUpdatedAt: currentDateTime,
                    }
                }
            });
            setSubstituteRequestClassifiedReportListApproval([]);
            BindList();
            await handleNotificationsOnStatusChangeforClassifiedSubRequest('ACKNOWLEDGE', reportId, "CLASSIFIED_SUB_REQUEST", latestInitiatorId, loggedUserId);

            // await DataStore.save(
            //     SubstituteCertificateRequestTransactionCycle.copyOf(original, (updated) => {
            //         updated.status = status;
            //         updated.date = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            //         updated.customUpdatedAt = currentDateTime;
            //     })
            // ).then(async (response) => {
            //     BindList();
            //     await handleNotificationsOnStatusChangeforClassifiedSubRequest('ACKNOWLEDGE', reportId, "CLASSIFIED_SUB_REQUEST", initiatorUser, loggedUserId);

            // })
        }
        catch (err) {
        }
        setVisibleRequestedReportEdit(false);
        setSelectedEmployeeForApprovals(null)
        setIsApproveButtonDisable(false);


    }

    // const rejectSelectedReportFrom = async (reportId, status, toEmployeeId, fromEmployeeId) => {
    //     try {
    //         /*  var transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
    //              c.reportId.eq(reportId),
    //              c.toEmployeeId.eq(toEmployeeId),
    //              c.fromEmployeeId.eq(fromEmployeeId),
    //          ])); */

    //         let transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle,
    //             (c) => c.reportId.eq(reportId), { sort: (s) => s.createdAt(SortDirection.DESCENDING) });

    //         // const transactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(reportId));
    //         const original = await DataStore.query(SubstituteCertificateRequestTransactionCycle, transactionCycleResponse[0].id);
    //         await DataStore.save(
    //             SubstituteCertificateRequestTransactionCycle.copyOf(original, (updated) => {
    //                 updated.status = status;
    //                 updated.remark = rejectMsgValue;
    //                 updated.date = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    //             })
    //         ).then(async (response) => {
    //             setRejectValueMsg("");
    //             BindList();
    //         })
    //     }
    //     catch (err) {
    //     }
    //     // setVisibleRequestedReportEdit(false);
    //     setSelectedEmployeeForApprovals(null)
    //     setIsApproveButtonDisable(false);
    // }

    const needMoreApproveSelectedReport = async (status, reportId, fromEmployeeId, toEmployeeId) => {

        // Create record
        var CertificatedSubRequestTransactionCycleResponse = await API.graphql(
            graphqlOperation(mutations.createSubstituteCertificateRequestTransactionCycle, {
                input: {
                    reportId: reportId,
                    fromEmployeeId: fromEmployeeId,
                    toEmployeeId: toEmployeeId,
                    status: status,
                    isApproved: false,
                    remark: "",
                    date: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                }
            })
        );

        BindList();
        setVisibleRequestedReportEdit(false);
        setSelectedEmployeeForApprovals(null)
        setIsApproveButtonDisable(false);

        /* await DataStore.save(
            new SubstituteCertificateRequestTransactionCycle({
                "reportId": reportId,
                "fromEmployeeId": fromEmployeeId,
                "toEmployeeId": toEmployeeId,
                "status": status,
                "isApproved": false,
                "remark": "",
                "date": moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            })
        ).then(() => {
            BindList();
            setVisibleRequestedReportEdit(false);
            setSelectedEmployeeForApprovals(null)
            setIsApproveButtonDisable(false);
        }) */
    }

    const visibleRequestedReportEditPopup = () => {
        setVisibleRequestedReportEdit(true);
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }
    //* requestedRportAction called
    const onClickRequestedReportEditPopUp = async (requestData) => {
        // const cognito = new AWS.CognitoIdentityServiceProvider();
        SetPreviewAndEdit(false);
        SetBasicInfoPopUp(true);
        setIsCheckFromEmployeeId(requestData.isCheckFromEmployeeId);
        //updated id for issue on acknowledgement
        setSecondApprovalFromEmployeeId(requestData.fromEmployeeIdValue);
        setSecondApprovalToEmployeeId(requestData.toEmployeeIdValue)

        setInitiatorId(requestData.initiator)

        //fetch user data
        var newRes = []
        let userRole = '', userName = '', userEmail = '', userCode = '', sub = '';
        let fullName;
        let userCodeEmp;
        let locationName;
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

        //*get substitute request data

        //    const substituteCertificateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", requestData.id)

        // setLatestInitiatorId(substituteCertificateRequestResponse.createdBy)


        // let confirmationStatus = "";
        // if (substituteCertificateRequestResponse.substitudeName.length > 0) {
        //     if (substituteCertificateRequestResponse.isConfirmed === true) { confirmationStatus = "Yes" } else
        //         if (substituteCertificateRequestResponse.isConfirmed === false) { confirmationStatus = "No" }
        // }
        // else { confirmationStatus = "" }

        // const substituteCertificateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(requestData.id));

        // let toEmployeeID = substituteCertificateRequestResponse.createdBy; setPopUpToEmployeeID(toEmployeeID); setPopUpFromEmployeeID(loggedUserId);

        var locationResponse = schoolList.find(o => o.id === substituteCertificateRequestResponse.locationId)

        // const locationResponse = await DataStore.query(Schools, (c) => c.id.eq(substituteCertificateRequestResponse[0].locationId));
        // locationName = locationResponse[0].name
        locationName = locationResponse?.name

        var finalArray = [];
        // const accountNumberResponse = await DataStore.query(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(requestData.id));

        // const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: requestData.id } }])

        // accountNumberResponse.map((item, index) => {
        //     let data = {
        //         "accountNumber": item.accountNumber,
        //         "percentage": item.percentage,
        //     }
        //     finalArray.push(data)
        // })

        //---Start Approval Status-----
        //get particular report id data from transaction cycle.
        // let approvalFinalData = [];
        // try {


        //     /* let adminUsers;
        //     if (particularReportTransactionCycleResponse[0].toEmployeeId) {
        //         try {
        //             adminUsers = await cognito.adminGetUser({
        //                 UserPoolId: awsmobile.aws_user_pools_id,
        //                 Username: particularReportTransactionCycleResponse[0].toEmployeeId,
        //             }).promise();
        //         } catch (e) {
        //         }
        //     }
        //     let userFirstName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:firstName") : ''
        //     let userLastName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:lastName") : ''
        //     userCodeEmp = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:userCode") : ''
        //     fullName = userFirstName + " " + userLastName */

        //     formHistoryData(requestData.id, substituteCertificateRequestResponse.createdBy)

        // } catch (err) {
        // }
        //---End Approval Status-------

        let empData = [];

        for (let i = 0; i < newRes.length; i++) {
            const currentItem = newRes[i];

            if (currentItem.userId === requestData.employeeCode) {
                empData.push(currentItem);
                break;
            }
        }
        //---------------

        // setVisibleRequestedReportEdit(true);
        visibleRequestedReportEditPopup();
        // const employeeCodeResponse = await DataStore.query(Employee, (c) => c.id.eq(substituteCertificateRequestResponse[0].employeeCodeId));

        const employeeCodeResponse = allEmployeeList.find(o => o.id === substituteCertificateRequestResponse.employeeCodeId)

        //set Data for View Popup
        let obj = {
            id: requestData.id,
            employeeName: employeeCodeResponse.employee_name + " (" + employeeCodeResponse.employee_code + ")",
            employee_id: userCodeEmp,
            assighment_at: locationName,
            from_date: substituteCertificateRequestResponse.fromDate,
            to_date: substituteCertificateRequestResponse.toDate,
            subject_area: substituteCertificateRequestResponse.reasonForAbsenceRequest,
            totalWorkingHours: substituteCertificateRequestResponse.totalWorkingHours,
            fromTime: substituteCertificateRequestResponse.fromTime,
            endTime: substituteCertificateRequestResponse.endTime,
            confirmationStatus: confirmationStatus,
            typeofSub: substituteCertificateRequestResponse.typeOfSub,
            substituteName: substituteCertificateRequestResponse.substitudeName,
            location: locationName,
            classification: substituteCertificateRequestResponse.classification,
            total_staffing_allocation: requestData.totalStaffAllocation,
            account_charged: requestData.accountCharged,
            current_fte_utilized: requestData.currentFTEUtilized,
            approvalFinalData: approvalFinalData,
            accountNoArray: finalArray,
        }

        setSpecificReportDetailsEdit(obj);


        //check specific report =>transaction cycle length is greter than 3
        try {
            let sixthPeriodReportTransactionCycleResponseLateSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: requestData.id } }])

            let sixthPeriodReportTransactionCycleResponseLate = sixthPeriodReportTransactionCycleResponseLateSort.sort((b, a) => (a.createdAt).localeCompare(b.createdAt));

            // let sixthPeriodReportTransactionCycleResponseLate = await DataStore.query(SubstituteCertificateRequestTransactionCycle,
            //     (c) => c.reportId.eq(requestData.id), { sort: (s) => s.createdAt(SortDirection.DESCENDING) });

            let sixthPeriodReportTransactionCycleResponse = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: requestData.id } }])

            // const sixthPeriodReportTransactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle,
            //     (c) => c.reportId.eq(requestData.id));


            if (sixthPeriodReportTransactionCycleResponse.length >= 3) {
                setNeedMoreApprovals(true);
            }
            //loop to get last status

            if (sixthPeriodReportTransactionCycleResponse.length >= 3) {
                let countCycle = false;
                for (let i = 0; i < 3; i++) {
                    if (sixthPeriodReportTransactionCycleResponseLate[i].status === "ReviewedResubmitted") {
                        if (i === 2) {
                            setNeedMoreApprovals(true)
                            countCycle = true
                        } else {
                            setNeedMoreApprovals(false)
                            setSignature(false)
                            setCheckedSignature(true)
                        }
                    }

                }

                let reviewList = sixthPeriodReportTransactionCycleResponseLate.filter(item => item.status === "ReviewedResubmitted");
                if (reviewList.length >= 1) {
                    //setSignature(false)
                    //setCheckedSignature(true)
                }
                if (countCycle) {
                    setSignature(true)
                    setCheckedSignature(false)
                }
            }
        } catch (err) {
        }
    }

    const showSidebar = () => {
        setVisible(true);

        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }
    //* onclick view popup (requestedRportAction called)
    const onClickRequestedReportViewPopup = async (requestData, position) => {

        // const cognito = new AWS.CognitoIdentityServiceProvider();
        // const substituteCertificateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(requestData.id));

        //var substituteCertificateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", requestData.id)

        //fetch user data
        var newRes = []
        let userRole = '', userName = '', userEmail = '', userCode = '', sub = '';
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

        //---Start Approval Status-----

        let userCodeEmp;
        let locationName;
        try {
            const locationResponse = schoolList.find(o => o.id === substituteCertificateRequestResponse.locationId)

            // const locationResponse = await DataStore.query(Schools, (c) => c.id.eq(substituteCertificateRequestResponse[0].locationId));

            locationName = locationResponse.name

            /*let adminUsers;
             if (particularReportTransactionCycleResponse[0].toEmployeeId) {
                try {
                    adminUsers = await cognito.adminGetUser({
                        UserPoolId: awsmobile.aws_user_pools_id,
                        Username: particularReportTransactionCycleResponse[0].toEmployeeId,
                    }).promise();
                } catch (e) {
                }
            }
            let userFirstName = await GetValueFromArray(adminUsers.UserAttributes, "custom:firstName")
            let userLastName = await GetValueFromArray(adminUsers.UserAttributes, "custom:lastName")
            userCodeEmp = await GetValueFromArray(adminUsers.UserAttributes, "custom:userCode")
            fullName = userFirstName + " " + userLastName
            let obj = { name: fullName, code: particularReportTransactionCycleResponse[0].toEmployeeId } */


            formHistoryData(requestData.id, substituteCertificateRequestResponse.createdBy)

        } catch (err) {
        }
        //---End Approval Status-------


        let empData = [];

        for (let i = 0; i < newRes.length; i++) {
            const currentItem = newRes[i];

            if (currentItem.userId === requestData.employeeCode) {
                empData.push(currentItem);
                break;
            }
        }
        //---------------


        setPosition(position);
        // setVisible(true);
        showSidebar();
        var finalArray = [];

        // const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: requestData.id } }])

        // const accountNumberResponse = await DataStore.query(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(requestData.id));

        // accountNumberResponse.map((item, index) => {
        //     let data = {
        //         "accountNumber": item.accountNumber,
        //         "percentage": item.percentage,
        //     }
        //     finalArray.push(data)
        // })


        //set Data for View Popup
        // let obj = {
        // employeeName: fullName,
        // employee_id: userCodeEmp,
        // assighment_at: locationName,
        // from_date: substituteCertificateRequestResponse[0].fromDate,
        // to_date: substituteCertificateRequestResponse[0].toDate,
        // subject_area: substituteCertificateRequestResponse[0].reasonForAbsenceRequest,
        // total_staffing_allocation: substituteCertificateRequestResponse[0].substitudeName,
        // account_charged: substituteCertificateRequestResponse[0].isConfirmed,
        // current_fte_utilized: substituteCertificateRequestResponse[0].typeOfSub,
        // classification: substituteCertificateRequestResponse[0].classification,
        // accountNoArray: finalArray,
        // approvalFinalData: approvalFinalData,
        // formHistoryFinalData: formHistoryFinalData

        // }

        // let confirmationStatus = "";
        // if (substituteCertificateRequestResponse.substitudeName.length > 0) {
        //     if (substituteCertificateRequestResponse.isConfirmed === true) { confirmationStatus = "Yes" } else
        //         if (substituteCertificateRequestResponse.isConfirmed === false) { confirmationStatus = "No" }
        // }
        // else { confirmationStatus = "" }

        const employeeCodeResponse = allEmployeeList.find(o => o.id === substituteCertificateRequestResponse.employeeCodeId)

        // const employeeCodeResponse = await DataStore.query(Employee, (c) => c.id.eq(substituteCertificateRequestResponse[0].employeeCodeId));

        let obj = {
            id: requestData.id,
            //   employeeName: employeeCodeResponse.employee_name + " (" + employeeCodeResponse.employee_code + ")",
            employee_id: userCodeEmp,
            assighment_at: locationName,
            //      from_date: substituteCertificateRequestResponse.fromDate,
            // to_date: substituteCertificateRequestResponse.toDate && substituteCertificateRequestResponse.toDate !== null ? substituteCertificateRequestResponse.toDate : '',
            // subject_area: substituteCertificateRequestResponse.reasonForAbsenceRequest,
            // totalWorkingHours: substituteCertificateRequestResponse.totalWorkingHours,
            // fromTime: substituteCertificateRequestResponse.fromTime,
            // endTime: substituteCertificateRequestResponse.endTime,
            // confirmationStatus: confirmationStatus,
            // typeofSub: substituteCertificateRequestResponse.typeOfSub,
            // substituteName: substituteCertificateRequestResponse.substitudeName,
            // location: locationName,
            // classification: substituteCertificateRequestResponse.classification,
            // total_staffing_allocation: requestData.totalStaffAllocation,
            // account_charged: requestData.accountCharged,
            // current_fte_utilized: requestData.currentFTEUtilized,
            // approvalFinalData: approvalFinalData,
            // accountNoArray: finalArray,
            // formHistoryFinalData: formHistoryFinalData,
            // updatedAt: substituteCertificateRequestResponse.updatedAt,
        }
        setSpecificReportDetailsView(obj);
    }

    const formHistoryData = async (reportFormId, submittedBy) => {
        //get particular report id data from transaction cycle.
        let approvalFinalData = [];
        let formHistoryFinalData = [];
        let fullName;
        // const cognito = new AWS.CognitoIdentityServiceProvider();

        const particularReportTransactionCycleResponseSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: reportFormId } }])

        let particularReportTransactionCycleResponse = particularReportTransactionCycleResponseSort.sort((a, b) => (a.createdAt).localeCompare(b.createdAt));


        // const particularReportTransactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle,
        //     (c) => c.reportId.eq(reportFormId),
        //     { sort: s => s.createdAt(SortDirection.ASCENDING) }
        // );


        var substituteCertificateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", reportFormId)

        // const substituteCertificateRequestResponse = await DataStore.query(SubstituteCertificateRequest, reportFormId);

        let currentDateTime = moment();
        currentDateTime = moment(currentDateTime).format("YYYY-MM-DD HH:mm:ss");

        if (particularReportTransactionCycleResponse) {

            //get name of user from 'to_Employee_Id'
            for (let i = 0; i < particularReportTransactionCycleResponse.length; i++) {
                let empName = '', empCode = '';

                // for (let j = 0; j < newRes.length; j++) {
                // let currentItem = newRes[j];
                // if (currentItem.userId == particularReportTransactionCycleResponse[i].toEmployeeId) {
                // empName = currentItem.name;
                // empCode = currentItem.usercode;
                // break;
                // }
                // }

                if (i == (particularReportTransactionCycleResponse.length - 1)) {
                    let initiatorUser;
                    if (particularReportTransactionCycleResponse[i].fromEmployeeId) {
                        try {
                            initiatorUser = await cognito.adminGetUser({
                                // UserPoolId: awsmobile.aws_user_pools_id,
                                // Username: particularReportTransactionCycleResponse[i].fromEmployeeId,
                                Username: submittedBy,
                            }).promise();
                        } catch (e) {
                        }
                    }
                    let userFirstName = await GetValueFromArray(initiatorUser.UserAttributes, "custom:firstName")
                    let userLastName = await GetValueFromArray(initiatorUser.UserAttributes, "custom:lastName")
                    let userCodeEmp = await GetValueFromArray(initiatorUser.UserAttributes, "custom:userCode")
                    let fullName = userFirstName + " " + userLastName
                    let initiatorInfo = {
                        empName: fullName,
                        date: particularReportTransactionCycleResponse[i].createdAt
                    }
                    setInitiatorInfo(initiatorInfo);
                }

                let adminUsers;
                // if (particularReportTransactionCycleResponse[i].toEmployeeId) {
                //     try {
                //         adminUsers = await cognito.adminGetUser({
                //             UserPoolId: awsmobile.aws_user_pools_id,
                //             Username: particularReportTransactionCycleResponse[i].toEmployeeId,
                //         }).promise();
                //     } catch (e) {
                //     }
                // }

                if (i == 0) {
                    let initiatorUsers;

                    // try {
                    //     //get initiator's data using its id
                    //     initiatorUsers = await cognito.adminGetUser({
                    //         UserPoolId: awsmobile.aws_user_pools_id,
                    //         Username: submittedBy,
                    //     }).promise();
                    // } catch (e) {
                    // }

                    let userFirstName1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:firstName") : ''
                    let userLastName1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:lastName") : ''
                    let userCodeEmp1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:userCode") : ''
                    let initiatorFullName = userFirstName1 + " " + userLastName1;

                    let obj = {
                        empName: initiatorFullName,
                        empTitle: 'Initiator',
                        empCode: userCodeEmp1,
                        status: 'Submitted',
                        // date: (particularReportTransactionCycleResponse[i].createdAt) ? handleDateSelect(particularReportTransactionCycleResponse[i].createdAt) : handleDateSelect(currentDateTime)
                        updatedAt: (particularReportTransactionCycleResponse[i].createdAt) ? handleDateSelect(particularReportTransactionCycleResponse[i].createdAt) : "-"

                    }
                    setSubmittedBy(obj);
                    approvalFinalData.push(obj);
                    // approvalFinalData.unshift(obj);
                }

                let userFirstName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:firstName") : ''
                let userLastName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:lastName") : ''
                let userCodeEmp = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:userCode") : ''
                let fullName = userFirstName + " " + userLastName

                let status = "";


                let empTitle = 'Initiator';
                if (substituteCertificateRequestResponse?.principleDepartmentHeadString === particularReportTransactionCycleResponse[i].toEmployeeId) {
                    empTitle = 'Site Admin/Dept Head';
                } else if (substituteCertificateRequestResponse?.budgetApprover === particularReportTransactionCycleResponse[i].toEmployeeId) {
                    empTitle = 'Budget Clerk';
                } else if (substituteCertificateRequestResponse?.payrollHr === particularReportTransactionCycleResponse[i].toEmployeeId) {
                    empTitle = 'Sub Desk';
                }

                const needToApprovalTransactionCycleResponse = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: reportFormId }, fromEmployeeId: { eq: particularReportTransactionCycleResponse[i].toEmployeeId } }])

                //*check Need to approval
                // var needToApprovalTransactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                //     c.reportId.eq(reportFormId),
                //     c.fromEmployeeId.eq(particularReportTransactionCycleResponse[i].toEmployeeId)
                // ]));

                var finalArray = [];

                const accountNumberResponse = await graphQLGetAllData("listSubstituteCertificateRequestAccountNoIDs", [{ substituteCertificateRequestId: { eq: reportFormId } }])

                // const accountNumberResponse = await DataStore.query(SubstituteCertificateRequestAccountNoIDs, (c) => c.substituteCertificateRequestId.eq(reportFormId));

                accountNumberResponse.map((item, index) => {
                    let data = {
                        "accountNumber": item.accountNumber,
                        "percentage": item.percentage,
                    }
                    finalArray.push(data)
                })

                // if (needToApprovalTransactionCycleResponse.length > 0) {
                //     status = particularReportTransactionCycleResponse[i].isApproved === true ? "Approved" : 'Pending For Approval';
                // } else {
                status = particularReportTransactionCycleResponse[i].status === "APPROVAL_ACCEPTED" ? "Approved" :
                    particularReportTransactionCycleResponse[i].status === "APPROVAL_REJECTED" ? "Rejected" :
                        (userloggedRole === USER_TYPES_NAMES.P && particularReportTransactionCycleResponse[i].status === "RESUBMITTED") ? "Pending For Approval" : (userloggedRole === USER_TYPES_NAMES.AP && particularReportTransactionCycleResponse[i].status === "RESUBMITTED") ? "Pending For Approval" : particularReportTransactionCycleResponse[i].status === "RESUBMITTED" ? "Reviewed & resubmitted" :
                            particularReportTransactionCycleResponse[i].status === "SUBMITTED" ? "Pending For Approval" :
                                particularReportTransactionCycleResponse[i].status === "Acknowledge" ? "Close" : particularReportTransactionCycleResponse[i].status
                // }

                // let appDate = particularReportTransactionCycleResponse[i].customUpdatedAt ? moment(particularReportTransactionCycleResponse[i].customUpdatedAt, 'YYYY-MM-DD HH:mm:ss').format("MM/DD/YYYY, hh:mm A") : moment(particularReportTransactionCycleResponse[i].updatedAt, 'YYYY-MM-DD HH:mm:ss').format("MM/DD/YYYY, hh:mm A")
                let appDate = null;
                appDate = particularReportTransactionCycleResponse[i].status === "APPROVAL_ACCEPTED" ||
                    particularReportTransactionCycleResponse[i].status === "APPROVAL_REJECTED" ||
                    particularReportTransactionCycleResponse[i].status === "Acknowledge" ?
                    (particularReportTransactionCycleResponse[i].customUpdatedAt ?
                        moment(particularReportTransactionCycleResponse[i].customUpdatedAt, 'YYYY-MM-DD HH:mm:ss').format("MM/DD/YYYY, hh:mm A")
                        : null)
                    : null;

                let obj = {
                    empName: fullName,
                    empTitle: empTitle,
                    empCode: userCodeEmp,
                    status: status,
                    updatedAt: (appDate) ? handleDateSelect(appDate) : "",
                }


                //form history remark 
                if (particularReportTransactionCycleResponse[i].status === "APPROVAL_REJECTED" || particularReportTransactionCycleResponse[i].status === 'Rejected') {
                    let obj = {
                        empName: empName,
                        empTitle: empTitle,
                        remarkType: 'Rejected',
                        empRemark: particularReportTransactionCycleResponse[i].remark
                    };

                    formHistoryFinalData.push(obj);
                }
                approvalFinalData.push(obj);
            }
            setApprovalFinalData(approvalFinalData.reverse())
            setFormHistoryFinalData(approvalFinalData.reverse())
            setEvents(approvalFinalData);
        }
    }

    const BindList = async () => {

        // var schoolList = await DataStore.query(Schools);
        let schoolList = await graphQLGetAllData("listSchools")
        setSchoolList(schoolList);

        let employeeListSort = await graphQLGetAllData("listEmployees");
        let employeeList = employeeListSort.sort((a, b) => (a.employee_name?.toLowerCase() ?? "").localeCompare(b.employee_name?.toLowerCase() ?? ""));

        // var employeeList = await DataStore.query(Employee, Predicates.ALL, {
        //     sort: s => s.employee_name(SortDirection.ASCENDING)
        // });

        let schoolListResponse = schoolList.sort((a, b) => (a.name?.toLowerCase() ?? "").localeCompare(b.name?.toLowerCase() ?? ""));

        var myArray = []; myArray = ConvertResponseForEmployeeSelect(employeeList); setEmployeeCodeList(myArray);
        //updating employee list for next
        setAllEmployeeList(employeeList)

        // var schoolListResponse = await DataStore.query(Schools, Predicates.ALL, {
        //     sort: s => s.name(SortDirection.ASCENDING)
        // });

        var schoolArray = []; schoolArray = ConvertResponseForSelect(schoolListResponse); setLocationList(schoolArray); setNewSchoolList(schoolArray)

        //*load Substitute Certificate Request 
        loadSubstituteCertificateRequest(employeeList, schoolList);
        loadSubstituteCertificateRequestApproval(employeeList, schoolList);
        setIsLoader(false)
        setButtonClicked(false)
    }

    //initiate new report
    const initiateNewReport = async () => {
        //fetch employee table data
        try {
            setShowNextPopUp(true);
        } catch (error) {
        }
    }

    //*loadAbsenceReport
    const loadSubstituteCertificateRequest = async (employees, schoolList) => {

        const substituteCertificateRequestResponseData = sixPeriodIsSuperadmin === "1" || sixPeriodIsSuperadmin === 1
            ? await graphQLGetAllData("listSubstituteCertificateRequests")
            : await graphQLGetAllData("listSubstituteCertificateRequests", [{ createdBy: { eq: loggedUserId } }])

        // const substituteCertificateRequestResponse = sixPeriodIsSuperadmin === "1" || sixPeriodIsSuperadmin === 1
        //     ? await DataStore.query(SubstituteCertificateRequest, (c) => c, { sort: s => s.CreatedByDateTime(SortDirection.DESCENDING) })
        //     : await DataStore.query(SubstituteCertificateRequest, (c) => c.createdBy.eq(loggedUserId), { sort: s => s.CreatedByDateTime(SortDirection.DESCENDING) })

        let substituteCertificateRequestResponse = substituteCertificateRequestResponseData.sort((b, a) => a.CreatedByDateTime.localeCompare(b.CreatedByDateTime));

        let finalArray = [];
        if (substituteCertificateRequestResponse.length > 0) {
            for (let i = 0; i < substituteCertificateRequestResponse.length; i++) {
                let principalAndDepartmentHead = substituteCertificateRequestResponse[i].principleDepartmentHeadString;
                let budgetApprover = substituteCertificateRequestResponse[i].budgetApprover;
                let payrollHr = substituteCertificateRequestResponse[i].payrollHr;

                let date = moment(substituteCertificateRequestResponse[i].fromDate).format('MM/DD/YYYY') + " to " + (substituteCertificateRequestResponse[i].toDate && substituteCertificateRequestResponse[i].toDate !== null ? moment(substituteCertificateRequestResponse[i].toDate).format('MM/DD/YYYY') : '-')

                // const substituteCertificateRequestTransactionCycleResponse = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(substituteCertificateRequestResponse[i].id), { sort: s => s.createdAt(SortDirection.ASCENDING) });

                const substituteCertificateRequestTransactionCycleResponseData = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteCertificateRequestResponse[i].id } }])

                // let sixthPeriodReportTransactionCycleResponseLate = await DataStore.query(
                //     SubstituteCertificateRequestTransactionCycle,
                //     c => c.reportId.eq(substituteCertificateRequestResponse[i].id),
                //     { sort: s => s.date(SortDirection.DESCENDING) }
                // );

                let substituteCertificateRequestTransactionCycleResponse = substituteCertificateRequestTransactionCycleResponseData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

                const sixthPeriodReportTransactionCycleResponseLateData = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteCertificateRequestResponse[i].id } }])

                let sixthPeriodReportTransactionCycleResponseLate = sixthPeriodReportTransactionCycleResponseLateData.sort((b, a) => (a.createdAt).localeCompare(b.createdAt));

                let toEmployeeId = sixthPeriodReportTransactionCycleResponseLate.length
                    ? sixthPeriodReportTransactionCycleResponseLate[0].toEmployeeId
                    : 0;

                let designation = "";
                switch (toEmployeeId) {
                    case principalAndDepartmentHead:
                        designation = "Pending for Principal/Department Head";
                        break;
                    //reporting manager.
                    case budgetApprover:
                        designation = "Pending for Budget Approver";
                        break;
                    case payrollHr:
                        designation = "Pending for Acknowledgement";
                        break;
                }

                const sortedRecords = substituteCertificateRequestTransactionCycleResponse.sort((a, b) => new Date(b.date) - new Date(a.date));

                var status = ""; var remark = ""; var index = 1;

                if (sortedRecords.length > 0) {

                    if (sortedRecords[0].status === "OPEN") { designation = "Pending"; remark = "-"; }
                    else if (sortedRecords[0].status === "SUBMITTED") { status = "Submitted"; remark = "-"; }
                    else if (sortedRecords[0].status === "Acknowledge") { designation = "Completed"; remark = "-"; }
                    else if (sortedRecords[0].status === "APPROVAL_REJECTED") { designation = "Rejected"; remark = sortedRecords[0].remark; }
                    else if (sortedRecords[0].status === "RESUBMITTED") { status = "Reviewed & resubmitted"; remark = sortedRecords[0].remark; }
                    index = index + i

                    let teacherName = "";
                    let school = "";
                    try {
                        let x = employees.filter(u => u.id === substituteCertificateRequestResponse[i].employeeCodeId);
                        teacherName = x[0]?.employee_name;

                        let y = schoolList.filter(s => s.id === substituteCertificateRequestResponse[i]?.locationId);
                        school = y[0]?.name;

                        // if (x[0] && x[0].school_id) {
                        //     let y = schoolList.filter(s => s.id === x[0].school_id);
                        //     // school = y[0] && y[0].name ? y[0].name : '';

                        //     school = y[0]?.name;
                        // }
                    } catch (e) {
                        console.info(e)
                    }

                    let initiator = "";
                    try {
                        let x = employees.filter(u => u.user_Id === substituteCertificateRequestResponse[i].createdBy);
                        let fname = x[0]?.firstName;
                        let lname = x[0]?.lastName;
                        if (fname) {
                            initiator = fname;
                        }
                        if (lname) {
                            initiator += " " + lname;
                        }
                    } catch (e) {
                        console.info(e)
                    }

                    let assigneeName = "";
                    try {
                        let x = employees.filter(u => u.user_Id === toEmployeeId);
                        let fname = x[0]?.firstName;
                        let lname = x[0]?.lastName;
                        if (fname) {
                            assigneeName = fname;
                        }
                        if (lname) {
                            assigneeName += " " + lname;
                        }
                    } catch (e) {
                        console.info(e)
                    }

                    let data = {
                        "id": substituteCertificateRequestResponse[i].id,
                        "assignmentTitle": substituteCertificateRequestResponse[i].assignmentTitle,
                        "dates": date,
                        "submittedOn": substituteCertificateRequestResponse[i].CreatedByDateTime === "" ? "-" : moment(substituteCertificateRequestResponse[i].CreatedByDateTime).format("MM/DD/YYYY"),
                        "status": status,
                        "designation": designation,
                        "remark": remark,
                        "sLNo": index,
                        "initiator": initiator,
                        "teacherName": teacherName,
                        "assigneeName": assigneeName,
                        "school": school,
                    }
                    finalArray.push(data)
                } else {
                    //for pending status when no data in transaction cycle

                    designation = "Pending"; remark = "-";
                    index = index + i

                    let teacherName = "";
                    let school = "";
                    try {

                        let x = employees.filter(u => u.id === substituteCertificateRequestResponse[i].employeeCodeId);
                        teacherName = x[0]?.employee_name;

                        let y = schoolList.filter(s => s.id === substituteCertificateRequestResponse[i]?.locationId);
                        school = y[0]?.name;
                        // if (x[0] && x[0].school_id) {
                        //     let y = schoolList.filter(s => s.id === x[0].school_id);
                        //     // school = y[0] && y[0].name ? y[0].name : '';
                        //     school = y[0]?.name;
                        // }
                    } catch (e) {
                        console.info(e)
                    }

                    let initiator = "";
                    try {
                        let x = employees.filter(u => u.user_Id === substituteCertificateRequestResponse[i].createdBy);
                        let fname = x[0]?.firstName;
                        let lname = x[0]?.lastName;
                        if (fname) {
                            initiator = fname;
                        }
                        if (lname) {
                            initiator += " " + lname;
                        }
                    } catch (e) {
                        console.info(e)
                    }

                    let assigneeName = "";
                    try {
                        let x = employees.filter(u => u.user_Id === toEmployeeId);
                        let fname = x[0]?.firstName;
                        let lname = x[0]?.lastName;
                        if (fname) {
                            assigneeName = fname;
                        }
                        if (lname) {
                            assigneeName += " " + lname;
                        }
                    } catch (e) {
                        console.info(e)
                    }

                    let data = {
                        "id": substituteCertificateRequestResponse[i].id,
                        "assignmentTitle": substituteCertificateRequestResponse[i].assignmentTitle,
                        "dates": date,
                        "submittedOn": substituteCertificateRequestResponse[i].CreatedByDateTime === "" ? "-" : moment(substituteCertificateRequestResponse[i].CreatedByDateTime).format("MM/DD/YYYY"),
                        "status": status,
                        "designation": designation,
                        "remark": remark,
                        "sLNo": index,
                        "initiator": initiator,
                        "teacherName": teacherName,
                        "assigneeName": assigneeName,
                        "school": school,
                    }
                    finalArray.push(data)
                }

                if (i === substituteCertificateRequestResponse.length - 1) {
                    const sortedArray = finalArray.sort((a, b) => new Date(b.submittedOn) - new Date(a.submittedOn));
                    let submittedCount = finalArray.filter((item) => item.status === "Submitted"); setIsSubmittedCount1(submittedCount.length);
                    let approvalCount = finalArray.filter((item) => item.status === "Approved"); setIsApproveCount1(approvalCount.length)
                    let rejectedCount = finalArray.filter((item) => item.status === "Rejected"); setIsRejectCount1(rejectedCount.length)
                    // sortedArray.reverse()
                    setSubstituteRequestClassifiedReportListInitiator(sortedArray)
                    setInitiatorLoader(false)
                }
            }

        }
        else {
            setSubstituteRequestClassifiedReportListInitiator([])
            setInitiatorLoader(false)
        }



    }

    const loadSubstituteCertificateRequestApproval = async (employees, schoolList) => {

        const particularReportTransactionCycleResponse = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles");

        let particularReportTransactionCycleResponseSort = particularReportTransactionCycleResponse.sort((b, a) => a.createdAt.localeCompare(b.createdAt));

        const particularReportTransactionCycleResponseCreatedBy = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ toEmployeeId: { eq: loggedUserId } }])

        let particularReportTransactionCycleResponseCreatedBySort = particularReportTransactionCycleResponseCreatedBy.sort((b, a) => a.createdAt.localeCompare(b.createdAt));


        const substituteCertificateRequestTransactionCycleResponse1 = sixPeriodIsSuperadmin === "1" || sixPeriodIsSuperadmin === 1
            ? particularReportTransactionCycleResponseSort
            // await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c, { sort: s => s.createdAt(SortDirection.DESCENDING) })
            : particularReportTransactionCycleResponseCreatedBySort
        // await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.toEmployeeId.eq(loggedUserId), { sort: s => s.createdAt(SortDirection.DESCENDING) });

        // const substituteCertificateRequestTransactionCycleResponse1 = sixPeriodIsSuperadmin === "1" || sixPeriodIsSuperadmin === 1
        //     ? await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c, { sort: s => s.createdAt(SortDirection.DESCENDING) })
        //     : await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.toEmployeeId.eq(loggedUserId), { sort: s => s.createdAt(SortDirection.DESCENDING) });

        let finalArray = [];

        const substituteCertificateRequestTransactionCycleResponse = Object.values(substituteCertificateRequestTransactionCycleResponse1.reduce((acc, entry) => {
            if (!acc[entry.reportId]) {
                acc[entry.reportId] = entry;
            }
            return acc;
        }, {}));

        ;


        if (substituteCertificateRequestTransactionCycleResponse.length > 0) {
            for (let i = 0; i < substituteCertificateRequestTransactionCycleResponse.length; i++) {

                if (substituteCertificateRequestTransactionCycleResponse[i].status === "OPEN") {
                    continue
                }

                // const substituteCertificateRequestResponse = await DataStore.query(SubstituteCertificateRequest, (c) => c.id.eq(substituteCertificateRequestTransactionCycleResponse[i].reportId));

                const substituteCertificateRequestResponse = await graphQLFindRecordById("getSubstituteCertificateRequest", substituteCertificateRequestTransactionCycleResponse[i].reportId)

                let principalAndDepartmentHead = substituteCertificateRequestResponse.principleDepartmentHeadString;
                let budgetApprover = substituteCertificateRequestResponse.budgetApprover;
                let payrollHr = substituteCertificateRequestResponse.payrollHr;

                const sixthPeriodReportTransactionCycleResponseLateSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteCertificateRequestResponse.id } }])


                let sixthPeriodReportTransactionCycleResponseLate = sixthPeriodReportTransactionCycleResponseLateSort.sort((a, b) => (a.createdAt).localeCompare(b.createdAt));

                // let sixthPeriodReportTransactionCycleResponseLate = await DataStore.query(
                //     SubstituteCertificateRequestTransactionCycle,
                //     c => c.reportId.eq(substituteCertificateRequestResponse[0].id),
                //     { sort: s => s.createdAt(SortDirection.ASCENDING) }                 
                // );

                let toEmployeeId = sixthPeriodReportTransactionCycleResponseLate.length
                    ? sixthPeriodReportTransactionCycleResponseLate[sixthPeriodReportTransactionCycleResponseLate.length - 1].toEmployeeId
                    : 0;

                let designation = "";
                switch (toEmployeeId) {
                    case principalAndDepartmentHead:
                        designation = "Pending for Principal/Department Head";
                        break;
                    //reporting manager.
                    case budgetApprover:
                        designation = "Pending for Budget Approver";
                        break;
                    case payrollHr:
                        designation = "Pending for Acknowledgement";
                        break;
                }

                var status = ""; var remark = ""; var index = 1; var isCheckFromEmployeeId = false;
                let createdByValue = substituteCertificateRequestResponse.createdBy;

                if (createdByValue === substituteCertificateRequestTransactionCycleResponse[i].fromEmployeeId) {
                    isCheckFromEmployeeId = true;
                } else {
                    isCheckFromEmployeeId = false;
                }

                const sortedRecordsSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ reportId: { eq: substituteCertificateRequestTransactionCycleResponse[i].reportId } }])

                let sortedRecords = sortedRecordsSort.sort((a, b) => (a.createdAt).localeCompare(b.createdAt));

                // const sortedRecords = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.reportId.eq(substituteCertificateRequestTransactionCycleResponse[i].reportId), { sort: s => s.createdAt(SortDirection.ASCENDING) });
                //substituteCertificateRequestTransactionCycleResponse[i].status
                //if (substituteCertificateRequestTransactionCycleResponse[i].status === "SUBMITTED") {

                if (sortedRecords[sortedRecords.length - 1].status === "SUBMITTED") {
                    // status = "Pending for Approval";

                    var substituteCertificateRequestTransactionCycleResponseTwoSort = await graphQLGetAllData("listSubstituteCertificateRequestTransactionCycles", [{ fromEmployeeId: { eq: loggedUserId }, reportId: { eq: substituteCertificateRequestTransactionCycleResponse[i].reportId } }])

                    let substituteCertificateRequestTransactionCycleResponseTwo = substituteCertificateRequestTransactionCycleResponseTwoSort.sort((a, b) => (a.createdAt).localeCompare(b.createdAt));

                    // var substituteCertificateRequestTransactionCycleResponseTwo = await DataStore.query(SubstituteCertificateRequestTransactionCycle, (c) => c.and(c => [
                    //     c.toEmployeeId.eq(loggedUserId),
                    //     c.reportId.eq(substituteCertificateRequestTransactionCycleResponse[i].reportId)
                    // ]), { sort: s => s.createdAt(SortDirection.ASCENDING) });


                    if (substituteCertificateRequestTransactionCycleResponseTwo.length > 0) {
                        status = substituteCertificateRequestTransactionCycleResponseTwo[substituteCertificateRequestTransactionCycleResponseTwo.length - 1].isApproved ? "Approved" : "Pending for Approval";
                        remark = "-";
                    } else {
                        status = "Pending for Approval"; remark = "-";
                    }
                }
                else if (sortedRecords[sortedRecords.length - 1].status === "APPROVAL_ACCEPTED") { status = "Approved"; remark = "-"; }

                else if (sortedRecords[sortedRecords.length - 1].status === "Acknowledge") { designation = "Completed"; remark = "-"; }

                else if (sortedRecords[sortedRecords.length - 1].status === "APPROVAL_REJECTED") {
                    designation = "Rejected";
                    remark = substituteCertificateRequestTransactionCycleResponse[i].remark ? substituteCertificateRequestTransactionCycleResponse[i].remark : sortedRecords[sortedRecords.length - 1].remark ? sortedRecords[sortedRecords.length - 1].remark : '-';
                }
                else if (sortedRecords[sortedRecords.length - 1].status === "RESUBMITTED") { status = "Pending for Approval"; remark = "-"; }

                let date = moment(substituteCertificateRequestResponse.fromDate).format("MM/DD/YYYY") + " to " + (substituteCertificateRequestResponse.toDate && substituteCertificateRequestResponse.toDate !== null ? moment(substituteCertificateRequestResponse.toDate).format("MM/DD/YYYY") : '-')
                // remark = substituteCertificateRequestTransactionCycleResponse[i].remark === "" ? "-" : substituteCertificateRequestTransactionCycleResponse[i].remark

                let teacherName = "";
                let school = "";
                try {

                    var SubstituteCertificateRequestData = await graphQLFindRecordById("getSubstituteCertificateRequest", substituteCertificateRequestTransactionCycleResponse[i].reportId)
                    // const SubstituteCertificateRequestData = await DataStore.query(SubstituteCertificateRequest, (c) => c.and(c => [
                    //     c.id.eq(substituteCertificateRequestTransactionCycleResponse[i].reportId)
                    // ]));

                    let x = employees.filter(u => u.id === SubstituteCertificateRequestData.employeeCodeId);
                    teacherName = x[0]?.employee_name;

                    let y = schoolList.filter(s => s.id === SubstituteCertificateRequestData?.locationId);
                    school = y[0]?.name;

                    // let y = schoolList.filter(s => s.id === x[0].school_id);
                    // school = y[0]?.name;


                } catch (e) {
                    console.info(e)
                }

                let initiator = "";
                try {
                    let x = employees.filter(u => u.user_Id === SubstituteCertificateRequestData.createdBy);
                    let fname = x[0]?.firstName
                    let lname = x[0]?.lastName
                    if (fname) {
                        initiator = fname;
                    }
                    if (lname) {
                        initiator += " " + lname;
                    }
                } catch (e) {
                    console.info(e)
                }

                let assigneeName = "";
                try {
                    let x = employees.filter(u => u.user_Id === substituteCertificateRequestTransactionCycleResponse[i].toEmployeeId);
                    let fname = x[0]?.firstName;
                    let lname = x[0]?.lastName;
                    if (fname) {
                        assigneeName = fname;
                    }
                    if (lname) {
                        assigneeName += " " + lname;
                    }
                } catch (e) {
                    console.info(e)
                }

                let fromEmployee = "";
                let toEmployee = "";
                try {

                    let x = employees.filter(u => u.user_Id === substituteCertificateRequestTransactionCycleResponse[i].fromEmployeeId);
                    let x1 = employees.filter(u => u.user_Id === substituteCertificateRequestTransactionCycleResponse[i].toEmployeeId);
                    let fname = x[0]?.firstName;
                    let lname = x[0]?.lastName;
                    let fname1 = x1[0]?.firstName;
                    let lname1 = x1[0]?.lastName;

                    if (fname && fname1 && lname && lname1) {
                        fromEmployee = fname + " " + lname;
                        toEmployee = fname1 + " " + lname1;
                    }

                } catch (e) {
                    console.info(e)
                }



                const currentDateTime = moment();

                let data = {
                    "id": substituteCertificateRequestResponse.id,
                    "assignmentTitle": substituteCertificateRequestResponse.assignmentTitle,
                    "dates": date,
                    "submittedOn": substituteCertificateRequestResponse.CreatedByDateTime === "" ? "-" : moment(substituteCertificateRequestResponse.CreatedByDateTime).format("MM/DD/YYYY"),
                    "status": status,
                    "designation": designation,
                    "submittedOnTime": substituteCertificateRequestTransactionCycleResponse[i].createdAt ? moment(substituteCertificateRequestTransactionCycleResponse[i].createdAt).format("MM/DD/YYYY HH:mm") : '-',
                    "remark": remark,
                    "sLNo": i + 1,
                    "isCheckFromEmployeeId": isCheckFromEmployeeId,
                    "fromEmployeeId": fromEmployee,
                    "toEmployeeId": toEmployee,
                    "fromEmployeeIdValue": substituteCertificateRequestTransactionCycleResponse[i].fromEmployeeId,
                    "toEmployeeIdValue": substituteCertificateRequestTransactionCycleResponse[i].toEmployeeId,
                    "initiator": initiator,
                    "teacherName": teacherName,
                    "isApproved": substituteCertificateRequestTransactionCycleResponse[i].isApproved,
                    "assigneeName": assigneeName,
                    "school": school,
                }
                finalArray.push(data);
                if (i === substituteCertificateRequestTransactionCycleResponse.length - 1) {
                    let sortedArray = finalArray.sort((a, b) => new Date(b.submittedOnTime) - new Date(a.submittedOnTime));
                    //sortedArray = [ ...new Set(sortedArray.map(item => item.sLNo)) ];
                    let submittedCount = finalArray.filter((item) => item.status === "Submitted"); setIsSubmittedCount2(submittedCount.length);
                    let approvalCount = finalArray.filter((item) => item.status === "Approved"); setIsApproveCount2(approvalCount.length);
                    let rejectedCount = finalArray.filter((item) => item.status === "Rejected"); setIsRejectCount2(rejectedCount.length);
                    //sortedArray.reverse()
                    setSubstituteRequestClassifiedReportListApproval(sortedArray);

                    setIsLoader(false)
                }
            }
        } else {
            setSubstituteRequestClassifiedReportListApproval([]);
            setIsLoader(false)
        }
    }

    const dtApp = useRef(null);

    const convertArrayOfObjectsToCSV = (data) => {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map((header) => {
                let value = row[header];
                if (String(value).includes(',')) {
                    value = `"${value}"`;
                }
                return value;
            });
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    };


    const downloadCSV = (data, filename) => {
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };


    const exportFilteredDataToCSV = async (fileName) => {
        // dt.current.exportCSV();
        //setLoading(true)
        // const cognito = new AWS.CognitoIdentityServiceProvider();

        const dataToExport = substituteRequestClassifiedReportListInitiator.map(({ sLNo, assignmentTitle, dates, submittedOn, designation, remark, teacherName, initiator, school, assigneeName }) => (
            {
                "SI No": sLNo,
                "Assignment Title": assignmentTitle,
                "Period": dates,
                "Submitted On": submittedOn,
                // "Status": status,
                "Status": designation,
                // "Designation": designation,
                "Remark": remark,
                "Teacher": teacherName,
                "Initiator": initiator,
                "School": school,
                "Assignee Name": assigneeName
            }));


        const csvData = convertArrayOfObjectsToCSV(dataToExport);
        downloadCSV(csvData, fileName);
    };

    const exportFilteredDataToCSVApprover = (fileName) => {
        const dataToExport = substituteRequestClassifiedReportListApproval.map(({ sLNo, assignmentTitle, dates, designation, submittedOn, submittedOnTime, status, remark, teacherName, initiator, school, toEmployeeId, fromEmployeeId, isCheckFromEmployeeId, id, assigneeName }) => ({
            "SI No": sLNo,
            "Assignment Title": assignmentTitle,
            "Period": dates,
            "Submitted On": submittedOn,
            "Status": designation,
            // "Submitted On": submittedOnTime,
            // "Status": status,
            "Remark": remark,
            "Teacher": teacherName,
            "Initiator": initiator,
            // "Designation": designation,
            "School": school,
            "Assignee Name": assigneeName
            // "From Employee ID": fromEmployeeId,
            // "To Employee ID": toEmployeeId,
            // "Is Checked Employee ID": isCheckFromEmployeeId,
            // "Employee ID": id
        }));

        const csvData = convertArrayOfObjectsToCSV(dataToExport);
        downloadCSV(csvData, fileName);
    };

    async function setUserList(e) {
        try {

            // var employeeResponses = await DataStore.query(Employee, Predicates.ALL, {
            //     sort: s => s.employee_name(SortDirection.ASCENDING)
            // });

            var employeeResponses = allEmployeeList;

            if (employeeResponses !== null) {
                let employeeData = employeeResponses;

                let employee = [];
                employeeData.map((item) => {
                    let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
                    let obj = {
                        name: name,
                        code: item.user_Id

                    }
                    employee.push(obj);

                })
                if (e) {
                    let employeeSearchData = [];
                    employeeSearchData = employee.filter(item => item.employee_code === e.target.value);
                    employeeSearchData = employee.filter(item => item.employee_name === e.target.value);
                    setAllApproverList(employee)
                } else {
                    setAllApproverList(employee)
                }
            }
        }
        catch (error) {
        }
    }

    //budget clerk
    async function setUserListByClerk(e) {
        try {

            var employeeResponses = []
            if (allEmployeeList.length === 0) {
                // employeeResponses = await DataStore.query(Employee, Predicates.ALL, {
                //     sort: s => s.employee_name(SortDirection.ASCENDING)
                // });


                var employeeResponsesSort = allEmployeeList;

                let employeeResponses = employeeResponsesSort.sort((a, b) => (a.employee_name).localeCompare(b.employee_name));


                //setAllEmployeeList(employeeResponses);
            } else {
                employeeResponses = allEmployeeList;
            }

            let clerkList = employeeResponses.filter(item => item.designation === "BUDGET_CLERK")

            if (clerkList.length) {
                let employee = [];
                clerkList.map((item) => {
                    let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
                    let obj = {
                        name: name,
                        code: item.user_Id
                    }
                    employee.push(obj);

                })
                if (e) {
                    let employeeSearchData = [];
                    employeeSearchData = employee.filter(item => item.code === e.target.value);
                    employeeSearchData = employee.filter(item => item.name === e.target.value);

                    setBudgetClerkList(employee)
                } else {
                    setBudgetClerkList(employee)
                }
            }
        }
        catch (error) {
        }
    }


    const loadUsers = async () => {
        //------------------------------- load users-------------
        // const cognito = new AWS.CognitoIdentityServiceProvider();
        // var params =
        // {
        //     UserPoolId: awsmobile.aws_user_pools_id,
        //     Limit: 60
        // };
        // cognito.listUsers(params, (err, data) => {
        //     if (err) {
        //     } else {
        //         SetUsersList(data.Users);

        //         var newRes = []
        //         let userRole = '', userName = '', userEmail = '', userCode = '', sub = '';
        //         (data.Users).forEach((user, i) => {
        //             userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
        //             userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
        //             sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
        //             userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
        //             userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;
        //             let obj = {
        //                 "userId": sub,
        //                 "name": userName,
        //                 "email": userEmail,
        //                 "usercode": userCode,
        //                 "role": userRole === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : userRole === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : userRole === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I,
        //             }
        //             newRes.push(obj);
        //         }
        //         );

        //         //get only those users are without admin
        let usersWithoutAdminAndLoggedUser = [];
        const loggedUserId = reactLocalStorage.get('loggedUserId');


        //         newRes.map((currentItem) => {
        //             if (currentItem.role !== 'Admin' && currentItem.role !== 'Payroll'
        //                 && currentItem.userId !== loggedUserId) {
        //                 usersWithoutAdminAndLoggedUser.push(currentItem);
        //             }
        //         })

        //         //set employee list
        //         let finalEmployeeList = [];

        //         usersWithoutAdminAndLoggedUser.map((currentItem) => {
        //             let name = currentItem.usercode ? `${currentItem.name} (${currentItem.usercode})` : currentItem.name;
        //             let obj = { name: name, code: currentItem.userId };
        //             finalEmployeeList.push(obj);
        //         })

        //         //set Budget approver list
        //         let finalbudgetApproverList = [];

        //         usersWithoutAdminAndLoggedUser.map((currentItem) => {
        //             let name = currentItem.usercode ? `${currentItem.name} (${currentItem.usercode})` : currentItem.name;
        //             let obj = { name: name, code: currentItem.userId };
        //             finalbudgetApproverList.push(obj);
        //         })


        //         //set Payroll list
        //         //let finalPayrollList = [];

        //         // const payrollers = newRes.filter(user => user.role === 'Payroll');
        //         // payrollers.map((currentItem) => {
        //         // let name = currentItem.usercode ? `${currentItem.name} (${currentItem.usercode})` : currentItem.name;
        //         // let objPayroll = { name: name, code: currentItem.userId };
        //         // finalPayrollList.push(objPayroll);
        //         // })

        //         //setPayrollListHR(finalPayrollList)
        //         setUserList();
        //         // setPrincipleDepartmentHeadList(finalEmployeeList);
        //         // setBudgetApproverList(finalbudgetApproverList);
        //         setEmployeeList(finalEmployeeList)
        //         loadPayrollUsers();
        //         getLoggRole();

        //     }
        // });
    }


    async function loadPayrollUsers() {

        // try {
        //     const cognito = new AWS.CognitoIdentityServiceProvider();
        //     var params =
        //     {
        //         UserPoolId: awsmobile.aws_user_pools_id,
        //         Limit: 60,
        //         "Filter": "email ^= \"" + searchPayroll + "\"",
        //     };


        // cognito.listUsers(params, (err, data) => {
        //     if (err) {
        //         toast.error(err.message);
        //     } else {
        //         var newRes = []
        //         let userRole = '', userName = '', userEmail = '', userCode = '', sub = '';
        //         (data.Users).forEach((user, i) => {
        //             userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
        //             userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
        //             sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
        //             userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
        //             userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;
        //             let obj = {
        //                 "userId": sub,
        //                 "code": sub,
        //                 "name": userName,
        //                 "email": userEmail,
        //                 "usercode": userCode,
        //                 "role": userRole === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : userRole === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : userRole === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I,
        //             }
        //             newRes.push(obj);
        //         }
        //         );
        //         setPayrollListHR(newRes);
        //         const finalPayroll = newRes.length ? newRes[0] : newRes[0];
        //         setPayrollHR(finalPayroll)

        //     }
        // });


        // } catch (e) {
        //     toast.error(e.message);
        // }
    }

    //*Add Multiple acc no.
    const onClickAdd = () => {
        let Percentage;
        accountNoArray.map((data, i) => {
            Percentage = data.Percentage;
        })
        if (Percentage > 100) {
            toast.error('Percentage cannot be greater than 100');
            return;
        }
        let data = { "accountNo": "", "Percentage": "" }
        let newData = [...accountNoArray, data];
        setAccountNoArray(newData)
    }

    //*onChange acc no.
    const onChangeAccNo = (index, value) => {
        let data = [...accountNoArray]
        data[index]["accountNo"] = value;
        setAccountNoArray(data)
    }

    //*onChange acc no.
    const onChangePercentage = (index, value) => {
        // let data = [...accountNoArray]
        // data[index]["Percentage"] = value;
        // setAccountNoArray(data)
        let data = [...accountNoArray]
        data[index]["Percentage"] = value;
        const maindata = data.map((elm) => ({
            Percentage: String(elm.Percentage),
            accountNo: String(elm.accountNo),
        }))
        setAccountNoArray(maindata)
    }


    //onclick remove account number
    const onClickRemove = (index) => {
        let data = [...accountNoArray];
        if (data.length > 1) {
            data.splice(index, 1)
            setAccountNoArray(data)
        }
    }

    //onclick employee details
    const onClickEmployeeDetails = async (value) => {
        let employeeDetailsValue = value
        // const employeeResponse = await DataStore.query(Employee, (c) => c.id.eq(employeeDetailsValue.code));
        var employeeResponsesSort = await graphQLFindRecordById("getEmployee", employeeDetailsValue.code)

        // let employeeResponse = employeeResponsesSort.sort((a, b) => (a.employee_name).localeCompare(b.employee_name));

        setEmployeeDetailsName(employeeResponsesSort.employee_name)
        setSelectedEmployee(true);
    }


    const footerContentForReqReject = () => (
        <div className='text-center'>
            <div className="mb-10 px-5 py-3 flex gap-2 justify-center">
                {
                    (sendMsg)
                        ? <button
                            className='bg-[#113699] border border-[##113699] text-white px-8 py-2 rounded'
                            onClick={() => {
                                BindList();
                                setRejectVisible(false);
                                setVisibleRequestedReportEdit(false);
                                setSendMsg(false);
                            }}>
                            Ok
                        </button>
                        : <button
                            className='bg-[#113699] border border-[##113699] text-white px-8 py-2 rounded'
                            onClick={() => {
                                if (rejectMsgValue === "") {
                                    toast.error('Please Enter Rejection Reason'); return;
                                } else {
                                    setIsLoader(true);
                                    approveSelectedReport(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED);
                                    BindList();
                                    setRejectVisible(false);
                                    setSendMsg(false);
                                    setVisibleRequestedReportEdit(false);
                                }
                            }}>
                            Send
                        </button>
                }
                <button
                    onClick={() => setRejectVisible(false)}
                    className=" bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center"
                >
                    <i className="gusd-close-circle mr-1" style={{ fontSize: '1rem' }}></i>
                    Cancel
                </button>
            </div>
        </div>
    );



    useEffect(() => {
        if (users.length > 1) {
            BindList();
            // getMasterData();
        } else {
            loadUsers();
        }

        setUserList();
        setUserListByClerk();
    }, [assignmentNameDisplay, employeeCode, users])

    const reportListActions = row => {
        return [
            <Link href="#" className="py-2 px-2.5" onClick={() => onClickRequestedReportViewPopup(row, 'right')}>
                <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
            </Link>,
            <Link href="#" className="py-2 px-2.5"
                // onClick={() => onClickRequestedReportEditPopUp(row, "Rejected")}
                onClick={() => { initiateNewReport(); clearStates() }}
            >
                <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
            </Link>
        ]
    }

    const sideDrawerClosedHandler = () => {
        setVisible(false);
        setVisibleRequestedReportEdit(false);
        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        document.body.style.overflow = 'unset';
    }


    return (
        <>
            <ReactFullscreen>
                {({ onToggle }) => (
                    <Layout pageTitle="Report" activeMenu="Initiator" appId={'CLASSIFIED_SUB_REQUEST'}>
                        <div className="report-wrapper pt-24 md:pt-28 xl:pt-[2.083vw]">
                            <div className="flex justify-end visible lg:hidden">
                                <Button icon="pi pi-bars" onClick={toggleActive} style={{ color: '#308B90', background: '#ffffff00', border: '1', borderColor: '#308B90', width: '38px', padding: '6px 0', borderRadius: '4px' }}></Button>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 xl:gap-[1.250vw] pb-5">
                                {/* <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-3">
                                    <div>
                                        <div id={activate} className="bg-[#FFFFFF] rounded-lg box-shadow-1 radius4 p-4 xl:p-[0.833vw] top-5 lg:sticky fixed -left-96 lg:left-0 lg:overflow-hidden lg:h-auto z-10" data-aos="fade-up" data-aos-duration="800">
                                            <div className="flex justify-between text-[#101828] font-medium text-base tracking-[0.02em] xl:text-[0.932vw]">
                                                <p>Forms</p>
                                               
                                            </div>

                                            <div className="mt-4 h-[600px] xl:h-[38vw]  overflow-auto">

                                                <div className="bg-[#0F1E4C]  radius4 p-[16px] xl:p-[0.833vw]">
                                                    <h6 className="font-medium text-[16px] text-[#fff] xl:text-[0.833vw] mb-2">Substitute Request Classified</h6>

                                                    {
                                                        userloggedRole === USER_TYPES_NAMES.P ?
                                                            <div className="flex justify-between gap-2 xl:gap-[0.833vw] xl:mt-[0.833vw]">
                                                                <div className="flex items-center gap-1">
                                                                    <div className="bg-[#EAEFFF] text-[16px] xl:text-[0.833vw] border border-[#99B2FF] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                                                     
                                                                    </div>
                                                                    <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Open</div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="bg-[#D1FADF] text-[16px] xl:text-[0.833vw] border border-[#A6F4C5] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                                                       
                                                                    </div>
                                                                    <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Closed</div>
                                                                </div>
                                                                <div></div>
                                                            </div> :
                                                            <div className="flex justify-between gap-2 xl:gap-[0.833vw] xl:mt-[0.833vw]">

                                                                <div className="flex items-center gap-1">
                                                                    <div className="bg-[#EAEFFF] text-[16px] xl:text-[0.833vw] border border-[#99B2FF] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                                                        {activeIndex === 0 ? isSubmittedCount1 : isSubmittedCount2}
                                                                    </div>
                                                                    <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Submitted</div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="bg-[#D1FADF] text-[16px] xl:text-[0.833vw] border border-[#A6F4C5] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                                                        {activeIndex === 0 ? isApproveCount1 : isApproveCount2}
                                                                    </div>
                                                                    <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Approved </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="bg-[#FEF3F2] text-[16px] xl:text-[0.833vw] border border-[#FEE4E2] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                                                        {activeIndex === 0 ? isRejectCount1 : isRejectCount2}
                                                                    </div>
                                                                    <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Rejected</div>
                                                                </div>
                                                            </div>

                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="relative z-10 col-span-12 lg:col-span-12" data-aos="fade-down" data-aos-duration="800">
                                    <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]" >
                                        <div className="flex flex-col md:flex-row items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
                                            <p className="text-[22px] xl:text-[0.938vw]  text-[#101828] font-medium mb-[15px] md:mb-[0px]">Substitute Request - Classified</p>

                                            {
                                                // activeIndex === 0 && userloggedRole !== USER_TYPES_NAMES.P ?
                                                <div className="flex gap-2 xl:gap-[0.990vw] items-center ">

                                                    <Link href='#' className="w-full text-center tableBtn blue radius8" onClick={() => { initiateNewReport(); clearStates() }}>
                                                        <i className="gusd-pluse-circle mx-1.5 "></i> Initiate New Report</Link>

                                                    <Link href="#" onClick={() => { exportFilteredDataToCSV("Initiator.csv") }} className=" " > <i className="pi pi-download "></i></Link>

                                                    <Link onClick={() => {
                                                        onToggle();
                                                    }} href=""> <i className="gusd-expand"></i></Link>
                                                </div>
                                                // : <>
                                                //     <span className="w-3/4 ">&nbsp;</span>
                                                //     <Link href="#" onClick={() => { exportFilteredDataToCSVApprover(`${userloggedRole === USER_TYPES_NAMES.P ? "Payroll.csv" : "Approver.csv"}`) }} className=" "  > <i className="pi pi-download"></i></Link>
                                                // </>
                                            }

                                        </div>


                                        <TabView>
                                            <TabPanel header="Initiate Reports">
                                                <div className="initiator  arrowshow">
                                                    <div className='xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]'>
                                                        <DataTable
                                                               className="custpaginator custIconsTable custmBtnTable custTable"
                                                               scrollable
                                                               filters={""}
                                                               filterDisplay="row"
                                                               value={data}
                                                               paginator
                                                               rowsPerPageOptions={[10, 20, 30]}
                                                               responsiveLayout="scroll"
                                                               paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                                               rows={11}
                                                               emptyMessage="No records found."
                                                        >
                                                            <Column field="sLNo" header="SL#" style={{ maxWidth: '1rem' }}></Column>
                                                            <Column field="assignmentTitle" header="Assignment Title" filter filterPlaceholder="Search" sortable style={{ minWidth: '15rem' }}></Column>
                                                            <Column field="dates" filter filterPlaceholder="Search" header="Period" sortable ></Column>
                                                            <Column field="submittedOn" header="Submitted On" sortable filter filterPlaceholder="Search" style={{ minWidth: '10rem' }}></Column>
                                                            <Column field="designation" header="Status" filter filterElement={statusRowFilterTemplate} body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                                                            <Column field="remark" header="Remarks" align='center' filterPlaceholder="Search by Assignment Remarks" style={{ minWidth: '6rem' }}></Column>
                                                            <Column
                                                                field="action"
                                                                header="Actions"
                                                                align="center"
                                                                body={reportListActions}
                                                                style={{ minWidth: "6rem" }}
                                                                exportable={false}
                                                            ></Column>
                                                        </DataTable>
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel header="Requested Reports">
                                                <div className="initiator  arrowshow">
                                                    <div className='xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]'>
                                                        <DataTable
                                                            className="custpaginator custIconsTable custmBtnTable custTable"
                                                            scrollable
                                                            filters={""}
                                                            filterDisplay="row"
                                                            value={data}
                                                            paginator
                                                            rowsPerPageOptions={[10, 20, 30]}
                                                            responsiveLayout="scroll"
                                                            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                                            rows={11}
                                                            emptyMessage="No records found."
                                                        >
                                                            <Column field="sLNo" header="SL#" style={{ maxWidth: '1rem' }}></Column>
                                                            <Column field="assignmentTitle" header="Assignment Title" filter filterPlaceholder="Search" sortable style={{ minWidth: '15rem' }}></Column>
                                                            <Column field="dates" filter filterPlaceholder="Search" header="Period" sortable></Column>
                                                            <Column field="submittedOn" header="Submitted On" sortable filter filterPlaceholder="Search" style={{ minWidth: '10rem' }}></Column>
                                                            <Column header="Status" field="designation" filter filterElement={""} body={""} sortable style={{ minWidth: '8rem' }}></Column>
                                                            <Column field="remark" header="Remarks" align='center' filterPlaceholder="Search by Assignment Remarks" style={{ maxWidth: '6rem' }}></Column>
                                                            <Column
                                                                field="action"
                                                                header="Actions"
                                                                align="center"
                                                                body={reportListActions}
                                                                style={{ minWidth: "6rem" }}
                                                                exportable={false}
                                                            ></Column>
                                                        </DataTable>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </TabView>

                                        {/* edit popup for requested report start */}
                                        < Dialog className="relative reports-popup" visible={visibleRequestedReportEdit} position="right" style={{ width: `${(fullViewEdit) ? '80vw' : '80vw'}` }
                                        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisibleRequestedReportEdit(false)} draggable={false} resizable={false} >
                                            <div className="grid grid-cols-3">
                                                <div className="col-span-2 bg-[#F5F6F7] h-auto">
                                                    <div className="p-5">
                                                        {/* <a to='' onClick={() => {setVisibleRequestedReportEdit(false); setFullViewForView(false);}} className="py-3"><Image
                                                            src={sidebar} alt="user" width="24" height="24" /></a> */}
                                                        <div onClick={() => {

                                                            setFullViewEdit(false); sideDrawerClosedHandler();
                                                        }} className="py-3">
                                                            <img src="/assets/images/sidebarright.svg " alt="user" width="24" height="24" />
                                                            {/* <Image src={sideBarRight} alt="user" width="24" height="24" /> */}
                                                        </div>
                                                        <div className="col-span-2  bg-[#EFF0F1] h-auto">

                                                            {
                                                                (!fullViewEdit) ?
                                                                    <div>
                                                                        <div className="text-[#113699] text-md md:text-[0.833vw] font-bold">Substitute Request - Classified</div>

                                                                        <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                                                            <div className="mb-1">
                                                                                <label className="text-[#344054] text-[0.729vw] font-medium pb-1" htmlFor="username">Approval Status</label>
                                                                                <div className="py-3 emp-simple-tbl">
                                                                                    <DataTable
                                                                                        className="custpaginator custIcons custmBtnTable custTable"
                                                                                        value={approvalFinalData}
                                                                                    >
                                                                                        <Column field="empTitle" header="Title"></Column>
                                                                                        <Column field="empName" header="Name"></Column>
                                                                                        <Column field="status" body={approvalStatusBody} header="Status"></Column>
                                                                                    </DataTable>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> : null
                                                            }



                                                            <div className="bg-[#FFF] rounded-[8px] p-3 mt-3">

                                                                {
                                                                    (!fullViewEdit) ?
                                                                        <div className="grid grid-cols-12">
                                                                            <div className="col-span-8">
                                                                                <div className='flex justify-between'>
                                                                                    <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Substitute Req.pdf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-span-4 text-end">

                                                                                <button onClick={() => setFullViewEdit(true)} className="text-[#113699] font-medium text-[10px] pb-3 text-end"><i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen</button>
                                                                            </div>

                                                                        </div>

                                                                        :
                                                                        <div className="grid grid-cols-12">
                                                                            <div className="col-span-8 ">
                                                                                <div className='flex justify-between'>
                                                                                    <div className="text-[#344054] font-medium text-[20px] pb-3"><i className=" gusd-document"></i>Substitute Request - Classified</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-span-4 text-end">

                                                                                <button onClick={() => setFullViewEdit(false)} className="text-[#113699] font-medium text-[10px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>Exit Full Screen</button>
                                                                            </div>

                                                                        </div>

                                                                }


                                                                {
                                                                    (!fullViewEdit) ?
                                                                        <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] h-10 border border-[black] overflow-y-auto' style={{ height: '286px' }}>
                                                                            <SubstituteRequestClassifiedHtmlToPdfSix
                                                                                data={{
                                                                                    'employeeName': specificReportDetailsEdit.employeeName,
                                                                                    'employeeId': specificReportDetailsEdit.employee_id,
                                                                                    'schoolName': specificReportDetailsEdit.assighment_at,
                                                                                    'dateFrom': specificReportDetailsEdit.from_date,
                                                                                    'dateTo': specificReportDetailsEdit.to_date,
                                                                                    'subjectName': specificReportDetailsEdit.subject_area,
                                                                                    'staffAllocation': specificReportDetailsEdit.total_staffing_allocation,
                                                                                    'accountCharged': specificReportDetailsEdit.account_charged,
                                                                                    'fteUtilized': specificReportDetailsEdit.current_fte_utilized,
                                                                                    "classification": specificReportDetailsEdit.classification,
                                                                                    "accountNoArray": specificReportDetailsEdit.accountNoArray,
                                                                                    'totalWorkingHours': specificReportDetailsEdit.totalWorkingHours,
                                                                                    'appName': "Substitute Request - Classified",
                                                                                    'fromTime': specificReportDetailsEdit.fromTime,
                                                                                    'endTime': specificReportDetailsEdit.endTime,
                                                                                    'substituteName': specificReportDetailsEdit.substituteName,
                                                                                    'confirmationStatus': specificReportDetailsEdit.confirmationStatus,
                                                                                    'typeofSub': specificReportDetailsEdit.typeofSub,
                                                                                    'approvalFinalData': approvalFinalData,
                                                                                    'updatedAt': specificReportDetailsEdit.updatedAt,
                                                                                }}
                                                                                initiatorInfo={initiatorInfo}
                                                                            />


                                                                        </div> :
                                                                        <div ref={componentRef} >
                                                                            <div className='mt-[24px]  xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] overflow-y-auto' style={{ height: '580px' }}>
                                                                                {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}

                                                                                <div id="my-html-template" className='border p-3'>
                                                                                    <div className='w-full pt-3 ' >
                                                                                        <div className='flex justify-center '>
                                                                                            <b className=''>CLASSIFIED </b>

                                                                                        </div>
                                                                                        <div className='flex justify-end relative top-[-1.4vw] print:top-[-1.6vw]'>
                                                                                            <b className=''>FORM 3 </b>
                                                                                        </div>

                                                                                    </div>

                                                                                    <center className='font-semibold' style={{ marginTop: '-10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                                                        <div>Glendale, California</div>
                                                                                        <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>

                                                                                        <div className='border border-[#545454] w-2/4 text-[12px] mt-4 p-4 rounded-lg'>
                                                                                            DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.
                                                                                        </div>
                                                                                    </center>

                                                                                    <div className='mt-8'>

                                                                                        <div className='leading-10'>
                                                                                            <div className='flex justify-between'>
                                                                                                <div className='flex gap-2'>CLASSIFICATION<div className='text-[green] font-bold  print:w-[20.625vw]   border-b border-[#545454]'>{specificReportDetailsEdit.classification}</div></div>

                                                                                                <p>Dates From: <span className='text-[green] font-bold text-[green] font-bold border-b border-[#545454]'>{moment(specificReportDetailsEdit.from_date).format("MM/DD/YYYY")}</span> Thru: <span className='text-[green] font-bold text-[green] font-bold border-b border-[#545454]'>{specificReportDetailsEdit.to_date && specificReportDetailsEdit.to_date !== null ? moment(specificReportDetailsEdit.to_date).format("MM/DD/YYYY") : '-'}</span></p></div>


                                                                                            <p>Type of Sub Request/Object Code: <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[30.625vw]'>{specificReportDetailsEdit.typeofSub}</span></p>
                                                                                            <p>Absent Employee's Legal Name (if applicable) <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[30.625vw]'>{specificReportDetailsEdit.employeeName}</span></p>

                                                                                            <div className='flex justify-between'>
                                                                                                <p>Total Working Hours <span className='text-[green] font-bold border-b border-[#545454] w-[10.625vw]  print:w-[10.625vw]'>{specificReportDetailsEdit.totalWorkingHours}</span></p>
                                                                                                <p>From <span className='text-[green] font-bold border-b border-[#545454]'>{moment(specificReportDetailsEdit.fromTime, 'HH:mm:ss.SSS').format('hh:mm A')}</span> To <span className='text-[green] font-bold border-b border-[#545454]'>{moment(specificReportDetailsEdit.endTime, 'HH:mm:ss.SSS').format('hh:mm A')}</span></p>
                                                                                            </div>
                                                                                            <p>Location <span className='text-[green] font-bold'>{specificReportDetailsEdit.location}</span></p>
                                                                                            <p>Reason For Absence/Request <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[30.625vw]'>{specificReportDetailsEdit.subject_area}</span></p>
                                                                                            <p>If possible, we would like to have  <span className='text-[green] font-bold border-b border-[#545454] w-[10.625vw]  print:w-[30.625vw]'>{specificReportDetailsEdit.substituteName}</span>
                                                                                                <p className='pl-4'>Confirmation status</p>
                                                                                                <span className='text-[green] font-bold pl-4'>{specificReportDetailsEdit.confirmationStatus}</span> </p>

                                                                                            {/* <span className='text-[green] font-bold pl-4'>{specificReportDetailsEdit.confirmationStatus === false ? "No" : specificReportDetailsEdit.confirmationStatus === true ? "Yes" : "-"}</span> </p> */}
                                                                                        </div>
                                                                                        <div className='flex'>
                                                                                            <div className='mt-8 w-2/4 text-left'>
                                                                                                <p className='font-bold text-center'>Account Number(s) To Be Charged
                                                                                                </p>
                                                                                                <center>                                                                                    {
                                                                                                    specificReportDetailsEdit.accountNoArray.map((item, index) => {
                                                                                                        return (
                                                                                                            <div>
                                                                                                                <p className=' top-0 left-32 border-b border-[#545454] w-[22.625vw]  print:w-[30.625vw]'>{item.accountNumber}</p>

                                                                                                            </div>
                                                                                                        )
                                                                                                    })

                                                                                                }
                                                                                                </center>
                                                                                            </div>

                                                                                            <div className='mt-8 w-2/4 text-left'>
                                                                                                <p className='font-bold text-center'>Percentage
                                                                                                </p>
                                                                                                <center>                                                                                    {
                                                                                                    specificReportDetailsEdit.accountNoArray.map((item, index) => {
                                                                                                        return (
                                                                                                            <div>
                                                                                                                <p className=' top-0 left-32 border-b border-[#545454] w-[22.625vw]  print:w-[30.625vw]'>{item.percentage !== 'null' && item.percentage !== "" ? item.percentage : '-'}</p>

                                                                                                            </div>
                                                                                                        )
                                                                                                    })

                                                                                                }
                                                                                                </center>
                                                                                            </div>


                                                                                        </div>



                                                                                        <div className='text-[7px] mt-[2vw]'>Revised 1/17/23</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1  bg-[#EFF0F1] h-auto">
                                                            <div className="p-5">
                                                                <div className="text-[#344054] text-[16px] font-medium py-3">Approval Status</div>
                                                                <div className="custTimelines">
                                                                    <Timeline
                                                                        className='custTable'
                                                                        value={specificReportDetailsEdit.approvalFinalData}
                                                                        opposite={(item) =>
                                                                            <Tag severity={approveStatusOptions(item)} value={item.status}></Tag>
                                                                        }
                                                                        content={(item) => <small className="text-color-secondary">{item.empName}<br />{item.updatedAt}</small>} />
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>



                                                    {
                                                        // userloggedRole === USER_TYPES_NAMES.P ?
                                                        <div className="mb-10 px-5 py-3 grid grid-cols-3 gap-2 ">
                                                            <Link href='#' onClick={() => setVisibleRequestedReportEdit(false)} className=" bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center"

                                                            ><i className="gusd-close-circle mr-1" style={{ fontSize: '1rem' }}></i>Cancel</Link>


                                                            < Link href='' className="bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center text-[#D92D20]"
                                                                //  onClick={() => saveGroupInfo()}
                                                                onClick={() => {
                                                                    setRejectVisible(true);
                                                                    // if (isCheckFromEmployeeId === false) {
                                                                    // rejectSelectedReportFrom(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED, secondApprovalToEmployeeId, secondApprovalFromEmployeeId)

                                                                    // } else {
                                                                    // approveSelectedReport(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED)
                                                                    // }
                                                                }
                                                                }
                                                            ><i className="gusd-close mr-1" style={{ fontSize: '1rem' }}></i>Reject</Link>
                                                            <div className="bg-white  blue rp-3 border  col-span-1 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-10 rounded-[8px] justify-center">

                                                                <span className="mr-3 "></span><span className='printicon'
                                                                    onClick={() => {
                                                                        setIsLoader(true);
                                                                        approveSelectedReportFrom(specificReportDetailsEdit.id, "Acknowledge", secondApprovalToEmployeeId, secondApprovalFromEmployeeId, initiatorId)
                                                                    }}>Acknowledge Report</span>
                                                            </div>
                                                        </div>

                                                        /*<div className='px-6 mb-5'>
                                                            <div className="bg-white  blue rp-3 border  col-span-3 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-10 rounded-[8px] justify-center">

                                                                <span className="mr-3 "></span><span className='printicon'
                                                                    onClick={() => { approveSelectedReportFrom(specificReportDetailsEdit.id, "Acknowledge", secondApprovalToEmployeeId, secondApprovalFromEmployeeId, initiatorId) }}>Acknowledge Report</span>
                                                            </div>
                                                </div>*/


                                                        // :

                                                        // <div className="mb-10 px-5 py-3 grid grid-cols-3 gap-2 ">

                                                        //     <Link href='#' onClick={() => setVisibleRequestedReportEdit(false)} className=" bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center"
                                                        //     //  onClick={() => setVisibleCreteReportPopup(false)}
                                                        //     // onClick={() => setConfirmVisible(true)}
                                                        //     ><i className="gusd-close-circle mr-1" style={{ fontSize: '1rem' }}></i>Cancel</Link>

                                                        //     {
                                                        //         isApproveButtonDisable === true ?
                                                        //             < Link href='' className="bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center text-[#D92D20]"
                                                        //             ><i className="gusd-close mr-1" style={{ fontSize: '1rem' }}></i>Reject</Link>
                                                        //             // :
                                                        //             // <button disabled className=" text-center flex items-center tableBtn bg-[#E4E7EC] border border-[#D0D5DD] radius8"
                                                        //             // ><i className="pi gusd-close mr-1" style={{ fontSize: '1rem' }}></i>Reject</button>
                                                        //             :

                                                        //             < Link href='' className="bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center text-[#D92D20]"
                                                        //                 //  onClick={() => saveGroupInfo()}
                                                        //                 onClick={() => {
                                                        //                     setRejectVisible(true);
                                                        //                     // if (isCheckFromEmployeeId === false) {
                                                        //                     // rejectSelectedReportFrom(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED, secondApprovalToEmployeeId, secondApprovalFromEmployeeId)

                                                        //                     // } else {
                                                        //                     // approveSelectedReport(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED)
                                                        //                     // }
                                                        //                 }
                                                        //                 }
                                                        //             ><i className="gusd-close mr-1" style={{ fontSize: '1rem' }}></i>Reject</Link>

                                                        //     }

                                                        //     {
                                                        //         <button onClick={() => {
                                                        //             if (isApproveButtonDisable === true) {

                                                        //                 needMoreApproveSelectedReport(CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED, specificReportDetailsEdit.id, loggedUserId, selectedEmployeeForApprovals.code)
                                                        //             } else {
                                                        //                 // if (isCheckFromEmployeeId === false) {
                                                        //                 //     approveSelectedReportFrom(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED, secondApprovalToEmployeeId, secondApprovalFromEmployeeId)
                                                        //                 // } else {
                                                        //                 //     approveSelectedReport(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED)
                                                        //                 // }
                                                        //                 setIsLoader(true);
                                                        //                 approveSelectedReport(specificReportDetailsEdit.id, CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED)
                                                        //                 //setConfirmVisibleApprove(true)
                                                        //             }
                                                        //         }}
                                                        //             className="text-center flex items-center tableBtn bg-white text-[#039855] border border-[#D0D5DD] radius8"
                                                        //             disabled={isdisabled}
                                                        //         ><i className="pi pi-check mr-1" style={{ fontSize: '1rem' }}></i>
                                                        //             {isdisabled === true ? "Please Wait" : "Approve"}</button>
                                                        //     }
                                                        // </div>


                                                    }


                                                </div>

                                                <div className="col-span-1  bg-[#EFF0F1] h-auto">

                                                    <div className="p-5">
                                                        <div className="text-[#344054] text-[16px] font-medium py-3 mb-5">Form History</div>

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
                                                                            {item.date}
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
                                        </Dialog >



                                        <Dialog className="relative reports-popup" visible={visible} position={position}
                                            style={{ width: `${(fullViewForView) ? '83vw' : '83vw'}` }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                                            onHide={() => sideDrawerClosedHandler} draggable={false} resizable={false}>
                                            <div className="grid grid-cols-3">
                                                <div className="col-span-2 bg-[#F5F6F7] h-auto">
                                                    <div className="p-5">
                                                        <div onClick={() => { setVisible(false); setFullViewForView(false); sideDrawerClosedHandler(); }} className="py-3">
                                                            <img src="/assets/images/sidebarright.svg " alt="user" width="24" height="24" />
                                                            {/* <Image src={sideBarRight} alt="user" width="24" height="24" /> */}
                                                        </div>

                                                        {
                                                            (!fullViewForView) ?
                                                                <div>
                                                                    <div className='text-center'>
                                                                        <div className="text-[#000000] text-md lg:text-[0.833vw] font-bold">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                                                        <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Request For Approval - Substitute Request - Classified</div>
                                                                    </div>
                                                                    <div className='pt-3'>
                                                                        <p>Approval Status</p>
                                                                        <div className="py-3 emp-simple-tbl">
                                                                            <DataTable
                                                                                className="custpaginator custIcons custmBtnTable custTable"
                                                                                value={approvalFinalData}

                                                                            >
                                                                                <Column field="empTitle" header="Title"></Column>
                                                                                <Column field="empName" header="Name"></Column>
                                                                                <Column field="status" body={approvalStatusBody} header="Status"></Column>
                                                                            </DataTable>
                                                                        </div>
                                                                    </div>
                                                                </div> : null
                                                        }




                                                        <div className="bg-[#fff] rounded-[8px] p-3 mt-3">

                                                            {/* <div className='flex justify-between'>
                                                                <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-file-icon"></i>Substitute Request Classified Assignment.pdf</div>
                                                                <button onClick={() => { (!fullViewForView) ? setFullViewForView(true) : setFullViewForView(false) }} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>{(!fullViewForView) ? 'View Full Screen' : 'Exit Full Screen'} </button>
                                                            </div> */}

                                                            {
                                                                (!fullViewForView) ?
                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-8 flex justify-between">
                                                                            <div className='flex justify-between'>
                                                                                <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Substitute Req.pdf</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-4 text-end">
                                                                            <button onClick={() => setFullViewForView(true)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen</button>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-8 flex justify-between">
                                                                            <div className='flex justify-between'>
                                                                                <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Substitute Request - Classified </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-4 text-end">
                                                                            <button onClick={() => setFullViewForView(false)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>Exit Full Screen</button>
                                                                        </div>
                                                                    </div>



                                                            }

                                                            {
                                                                (!fullViewForView) ?
                                                                    // <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] h-10 border-[red]' style={{ height: '286px' }}>

                                                                    //     <div id="my-html-template" className='border px-8'>
                                                                    //         <div className='flex gap-10 justify-end' >
                                                                    //             <b>CLASSIFIED</b>
                                                                    //             <b >FORM 3</b>
                                                                    //         </div>
                                                                    //         <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                                    //             <div>Glendale, California</div>
                                                                    //             <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>

                                                                    //             <div className='border w-full border-4 text-[12px] mt-4'>
                                                                    //                 DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.
                                                                    //             </div>
                                                                    //         </center>


                                                                    //     </div>
                                                                    // </div> 
                                                                    <div style={{ height: '400px', overflow: 'auto' }}>
                                                                        <SubstituteRequestClassifiedHtmlToPdfSix
                                                                            data={{
                                                                                'employeeName': specificReportDetailsView.employeeName,
                                                                                'employeeId': specificReportDetailsView.employee_id,
                                                                                'schoolName': specificReportDetailsView.assighment_at,
                                                                                'dateFrom': specificReportDetailsView.from_date,
                                                                                'dateTo': specificReportDetailsView.to_date,
                                                                                'subjectName': specificReportDetailsView.subject_area,
                                                                                'staffAllocation': specificReportDetailsView.total_staffing_allocation,
                                                                                'accountCharged': specificReportDetailsView.account_charged,
                                                                                'fteUtilized': specificReportDetailsView.current_fte_utilized,
                                                                                "classification": specificReportDetailsView.classification,
                                                                                "accountNoArray": specificReportDetailsView.accountNoArray,
                                                                                'totalWorkingHours': specificReportDetailsView.totalWorkingHours,
                                                                                'appName': "Substitute Request - Classified",
                                                                                'fromTime': specificReportDetailsView.fromTime,
                                                                                'endTime': specificReportDetailsView.endTime,
                                                                                'substituteName': specificReportDetailsView.substituteName,
                                                                                'confirmationStatus': specificReportDetailsView.confirmationStatus,
                                                                                'typeofSub': specificReportDetailsView.typeofSub,
                                                                                'approvalFinalData': approvalFinalData,
                                                                                'updatedAt': specificReportDetailsView.updatedAt,
                                                                            }}
                                                                            initiatorInfo={initiatorInfo}
                                                                        />
                                                                    </div>
                                                                    :
                                                                    <div className="grid grid-cols-1">
                                                                        {/* <img src={pdfImage} alt='myImg' /> */}

                                                                        <SubstituteRequestClassifiedHtmlToPdfSix
                                                                            data={{
                                                                                'employeeName': specificReportDetailsView.employeeName,
                                                                                'employeeId': specificReportDetailsView.employee_id,
                                                                                'schoolName': specificReportDetailsView.assighment_at,
                                                                                'dateFrom': specificReportDetailsView.from_date,
                                                                                'dateTo': specificReportDetailsView.to_date,
                                                                                'subjectName': specificReportDetailsView.subject_area,
                                                                                'staffAllocation': specificReportDetailsView.total_staffing_allocation,
                                                                                'accountCharged': specificReportDetailsView.account_charged,
                                                                                'fteUtilized': specificReportDetailsView.current_fte_utilized,
                                                                                "classification": specificReportDetailsView.classification,
                                                                                "accountNoArray": specificReportDetailsView.accountNoArray,
                                                                                'totalWorkingHours': specificReportDetailsView.totalWorkingHours,
                                                                                'appName': "Substitute Request - Classified",
                                                                                'fromTime': specificReportDetailsView.fromTime,
                                                                                'endTime': specificReportDetailsView.endTime,
                                                                                'substituteName': specificReportDetailsView.substituteName,
                                                                                'confirmationStatus': specificReportDetailsView.confirmationStatus,
                                                                                'typeofSub': specificReportDetailsView.typeofSub,
                                                                                'approvalFinalData': approvalFinalData,
                                                                                'updatedAt': specificReportDetailsView.updatedAt,
                                                                            }}
                                                                            initiatorInfo={initiatorInfo}
                                                                        />
                                                                    </div>


                                                            }

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

                                                <div className="col-span-1  bg-[#EFF0F1] h-auto">

                                                    <div className="p-5">
                                                        <div className="text-[#344054] text-[16px] font-medium py-3 mb-5">Form History</div>

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
                                                                            {item.date}
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



                                        <Dialog header="Approve" visible={confirmVisibleApprove} style={{ width: '30vw' }} onHide={() => { setConfirmVisibleApprove(false); setVisibleRequestedReportEdit(false); }} footer={footerContent}  >
                                            <p className="m-0 text-[#0487C8] text-center">
                                                <i className='pi pi-check-circle mr-2'></i>
                                                <span className='font-medium text-[18px]'>This report is Approved</span>
                                            </p>
                                        </Dialog>

                                        {/* edit popup start */}
                                        < Dialog className="relative reports-popup" visible={visibleEdit} position="right" style={{ width: `${(fullViewEdit) ? '50vw' : '30vw'}` }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisibleEdit(false)} draggable={false} resizable={false} >
                                            <div className="">
                                                <div className="bg-[#F5F6F7] relative h-screen">
                                                    <div className="p-5">
                                                        <a to='' onClick={() => setVisibleEdit(false)} className="py-3"><Image
                                                        // src={sidebar} alt="user" width="24" height="24" 
                                                        />
                                                        </a>


                                                        {
                                                            (!fullViewEdit) ?
                                                                <div>
                                                                    <div className="text-[#113699] text-md md:text-[0.833vw] font-bold">Substitute Request - Classified</div>
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



                                                        <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">

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
                                                                    <div className="grid grid-cols-1  h-80 overflow-hidden">
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

                                                        <Link href='#' className=" bg-[#EFF8FF] border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#2D5BE5] flex items-center text-xs py-[6px] px-[10px] rounded-[8px] justify-center"
                                                            //  onClick={() => setVisibleCreteReportPopup(false)}
                                                            onClick={() => setConfirmVisible(true)}
                                                        ><i className="pi pi-save mr-1" style={{ fontSize: '1rem' }}></i>Save</Link>

                                                        <Link href='' className=" text-center flex items-center tableBtn blue radius8"
                                                            //  onClick={() => saveGroupInfo()}
                                                            disabled={buttonClicked}
                                                            onClick={() => { setConfirmVisible(true); handleClickDisable(); }}
                                                        >
                                                            <i className="pi pi-check mr-1" style={{ fontSize: '1rem' }}></i>
                                                            Submit</Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog>

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
                                            // bindList={() => loadAbsenceReport()}
                                            type={"Initior"}
                                        />

                                    </Sidebar>
                                </div>
                            </div >
                        </div >


                        {/* popup's */}
                        < Dialog className="relative reports-popup" visible={visibleCreteReportPopup} position="right" style={{ width: '30vw' }
                        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setVisibleCreteReportPopup(false)} draggable={false} resizable={false} >
                            <div className="">
                                <div className="bg-[#F5F6F7] relative h-screen">
                                    <div className="p-5">
                                        <a to='' onClick={() => setVisibleCreteReportPopup(false)} className="py-3"><Image
                                        // src={sidebar} alt="user" width="24" height="24" 
                                        />
                                        </a>
                                        <div className="text-[#113699] text-md md:text-[0.833vw] font-bold">Substitute Request - Classified</div>
                                        {/* <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Roles</div> */}
                                        <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                            <div className="mb-1">
                                                <label className="text-[#344054] text-[0.729vw] font-medium pb-1" htmlFor="username">Assignment Title</label>
                                                <div><InputText
                                                    value={assighnmentTitle}
                                                    onChange={e => {
                                                        setGroupName(e.target.value)
                                                        seAssignmentNameDisplay(e.target.value)
                                                    }}
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
                        < Dialog blockScroll={true} className="relative reports-popup" visible={showNextPopUp} position="right" style={{ width: '100vw' }
                        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setShowNextPopUp(false)} draggable={false} resizable={false} >


                            {/* <div class="p-10"><a href="#" id="add-family-open-btn"><i class="gusd-edit text-2xl"></i></a></div> */}
                            <div className="fixed z-10 inset-0 styled-select" >

                                <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
                                    <div className="relative transform transition-all w-full">
                                        <div className="grid xl:grid-cols-12 md:grid-cols-1 custmCols">
                                            <div className="col-span-3 h-full sideBarLeft openSideDiv">
                                                <button onClick={() => { setShowPreviewPopUp(false); setShowNextPopUp(false) }} type="button" className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md" id="add-family-cancel-btn"><i className="gusd-arrow-line-right mr-[14px] xl:mr-[0.729vw]"></i> Back Home</button>
                                                <div className="mt-[16px] xl:mt-[0.833vw] text-[#101828] text-[24px] xl:text-[0.933vw] font-normal">Substitute Request - Classified</div>
                                                <div className="mt-[10px] xl:mt-[0.533vw] text-[#101828] text-[20px] xl:text-[0.833vw] font-medium">{assignmentNameDisplay}</div>
                                                <div className="mt-[32px] xl:[1.667vw]">
                                                    <ul className="sideTabs">
                                                        <li><a href="#"
                                                            onClick={() => { setShowPreviewPopUp(false); SetPreviewAndEdit(false); SetBasicInfoPopUp(true) }} className={`${basicInfoPopUp === true ? "tab-b active activeCheck" : ""}`} data-id="tab1">
                                                            <i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i>
                                                            Basic Info</a></li>

                                                        <li><a href="#"
                                                            onClick={() => { SetBasicInfoPopUp(false); SetPreviewAndEdit(true) }}
                                                            className={`${previewAndEdit === true ? "tab-b active activeCheck" : null}`}
                                                            data-id="tab2"><i className="gusd-guardian-info text-[20px] xl:text-[1.042vw]"></i> Preview & Edit</a></li>

                                                    </ul>
                                                </div>
                                                <div className="fixed top-0 left-0 openBtn xl:hidden">
                                                    <button type="button" className="sideDivBtn inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-white text-[14px] xl:text-[0.729vw] font-medium bg-[#3366FF] border border-[#EFF8FF] rounded-r-md"><i className="gusd-arrow-line-right"></i></button>
                                                </div>
                                            </div>

                                            <div className="col-span-12 xl:col-span-6 mScrollCstm overflow-auto">
                                                <div className="tab-c tab-active p-lr-110 pt-10 xl:pt-0 h-[40vw]" data-id="tab1">
                                                    {

                                                        basicInfoPopUp === true ?
                                                            <div>
                                                                <div className="text-[24px] xl:text-[1.250vw] font-medium">Basic Info</div>
                                                                <div className="mCustomScrollbar scroll-w-10 max-h-100">

                                                                    <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] ">
                                                                        <form>

                                                                            <div className=''>

                                                                                <div className="col ">
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Assignment Title<span className='text-[red] pl-0.2'>*</span></label>
                                                                                    <input onChange={e => setAssignmentTitle(e.target.value)} value={assignmentTitle} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Enter Assignment Title" />
                                                                                </div>

                                                                                <div className='grid grid-cols-2 gap-8 mt-2 sub_classified_emp'>
                                                                                    <div className='col '>
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Employee Name<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <div className='flex'>
                                                                                            <Dropdown
                                                                                                value={employeeCode} onChange={(e) => {
                                                                                                    setEmployeeCode(e.value);
                                                                                                    onClickEmployeeDetails(e.value)
                                                                                                }}
                                                                                                showClear
                                                                                                options={employeeCodeList} optionLabel="name" placeholder="Select here"
                                                                                                filter
                                                                                                // valueTemplate={selectedCountryTemplate}
                                                                                                className="w-full md:w-14rem h-10"
                                                                                            />
                                                                                            <div onClick={(e) => setOpenNewEmployee(true)} className='cursor-pointer text-[30px] '>
                                                                                                {/* <i className='gusd-pluse-circle' style = {{color: "lightgray",fontSize: "20px", margin: "3px",position:"relative", bottom:"6px"}}></i> */}
                                                                                                <Tooltip target=".icon-tooltip" content="Add Employee" position="top" className="custom-tooltip-content" />
                                                                                                <i className='icon-tooltip gusd-pluse-circle' style={{ color: "lightgray", fontSize: "20px", margin: "3px", position: "relative", bottom: "6px" }}></i>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* Add New Employee Popup */}
                                                                                    {/* <Substitutereqpopup
                                                                                     visible={openNewEmployee}
                                                                                     onHide={() => {setOpenNewEmployee(false)}}
                                                                                    /> */}
                                                                                    <EmployeePopup
                                                                                        visible={openNewEmployee}
                                                                                        onHide={() => { setOpenNewEmployee(false) }}
                                                                                    />

                                                                                    <div className="col ">
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Classification<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <input onChange={e => setClassification(e.target.value)} value={classification} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#18263d] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Enter Classification" />
                                                                                    </div>
                                                                                </div>

                                                                                <div className='grid grid-cols-2 gap-8 mt-2'>
                                                                                    <div className="col ">
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Dates<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <div className="relative custp-calender">
                                                                                            <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] 
                                                                                            mt-2.5 z-10"></i>
                                                                                            <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                                                                                            <div className="card flex justify-content-center">
                                                                                                <Calendar
                                                                                                    onChange={(e) => {
                                                                                                        setFromDate(e.target.value)
                                                                                                        setToDate('')
                                                                                                    }}
                                                                                                    value={fromDate}
                                                                                                    placeholder="From"
                                                                                                    className="w-full h-10" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col">
                                                                                        <label className=" text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username"><span className='text-[red] pl-0.2'></span></label>
                                                                                        <div className="">
                                                                                            <div className="relative custp-calender mt-[5px]">
                                                                                                <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.8rem] mt-2.5 z-10"></i>
                                                                                                <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem]  mt-2.5 z-10"></i>
                                                                                                <div className="card flex justify-content-center classThruu">
                                                                                                    {
                                                                                                        fromDate.length === 0 ?
                                                                                                            <Calendar
                                                                                                                value={toDate}
                                                                                                                placeholder="Thru"
                                                                                                                onClick={() => {
                                                                                                                    toast.error("Select From Date")
                                                                                                                }
                                                                                                                }
                                                                                                                disabled
                                                                                                                className="w-full h-10 thruClass" /> :
                                                                                                            <Calendar
                                                                                                                onChange={(e) => {
                                                                                                                    setToDate(e.target.value)
                                                                                                                }}
                                                                                                                value={toDate}
                                                                                                                minDate={fromDate}
                                                                                                                placeholder="Thru"
                                                                                                                className="w-full h-10" />

                                                                                                    }

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className='col mt-2 sub_classified_emp'>
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Type of Sub Request/Object Code<span className='text-[red] pl-0.2'>*</span></label>
                                                                                    <Dropdown value={typeOfSubRequest} onChange={(e) => {
                                                                                        setTypeOfSubRequest(e.value);

                                                                                    }} optionLabel="name" showClear placeholder="Select here"
                                                                                        filter
                                                                                        // valueTemplate={selectedCountryTemplate}
                                                                                        className="w-full md:w-14rem h-10" />
                                                                                </div>

                                                                                <div className="col mt-2">
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Total Working Hours</label>
                                                                                    <input value={totalWorkingHours} onChange={e => setTotalWorkingHours(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Enter Total Working Hours" />
                                                                                </div>


                                                                                <div className='gusd-clock grid grid-cols-2 gap-8 mt-2 sub_classified_emp'>
                                                                                    <div className="col">
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Time<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <div className="relative ">

                                                                                            {/*<i className="pi pi-clock text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>*/}
                                                                                            <div className="card flex justify-content-center text-[12px]">
                                                                                                <input placeholder="Start time" className="w-full h-10  bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] pl-4 rounded-sm" type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} />
                                                                                                {/*<Calendar
                                                                                                    onChange={(e) => {
                                                                                                        setStartTime(e.value)
                                                                                                    }}
                                                                                                    value={startTime}
                                                                                                    placeholder="Start time"
                                                                                                    timeOnly
																									showTime
													                                                className="w-full h-10" /> */}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col sub_classified_emp">
                                                                                        <label className=" text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username"><span className='text-[red] pl-0.2'></span></label>
                                                                                        <div className="">
                                                                                            <div className="relative  mt-[5px] text-[12px]">

                                                                                                {/*<i className="pi pi-clock text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>*/}
                                                                                                <div className="card flex justify-content-center ">

                                                                                                    {
                                                                                                        startTime ?

                                                                                                            <input placeholder="End time" className="w-full h-10 py-[10px] px-[14px]  bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] pl-4" type="time" value={endTime} onChange={(e) => {
                                                                                                                if (e.target.value === startTime) {
                                                                                                                    toast.error("End time should not be similar to start time")
                                                                                                                } else {
                                                                                                                    setEndTime(e.target.value)
                                                                                                                }
                                                                                                            }} />

                                                                                                            :

                                                                                                            <Calendar
                                                                                                                disabled
                                                                                                                timeOnly
                                                                                                                value={endTime}
                                                                                                                placeholder="End time"

                                                                                                                onClick={() => {
                                                                                                                    toast.error("Please select start time")

                                                                                                                }

                                                                                                                }


                                                                                                                className="w-full h-10" />






                                                                                                    }

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="col mt-2 sub_classified_emp">
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Location<span className='text-[red] pl-0.2'>*</span></label>
                                                                                    <Dropdown value={location} onChange={(e) => {
                                                                                        setLocation(e.value);
                                                                                    }} options={locationList} optionLabel="name" placeholder="Select here"
                                                                                        showClear
                                                                                        filter
                                                                                        // valueTemplate={selectedCountryTemplate}
                                                                                        className="w-full md:w-14rem h-10" />
                                                                                </div>

                                                                                <div className="col mt-2">
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Reason for Absence/Requesttt<span className='text-[red] pl-0.2'>*</span></label>
                                                                                    <input value={reasonForAbsenceRequest} onChange={e => setReasonForAbsenceRequest(e.target.value)} type="text" name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Enter Reason for Absence/Request" />
                                                                                </div>


                                                                                <div className="col mt-2">
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Substitute Name</label>
                                                                                    <input value={substituteName} onChange={e => setSubstituteName(e.target.value)} name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Enter Substitute Name" />
                                                                                </div>

                                                                                {/* <div className="col mt-2">

                                                                            <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username" >Confirmed<span className='text-[red] pl-0.2'>*</span></label>
                                                                            <div className="flex flex-column gap-3">

                                                                                {confirmed.map((title) => {
                                                                                    return (<>
                                                                                        <label className="mt-15 text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username" htmlFor={title.key}>
                                                                                            {title.name}
                                                                                        </label>
                                                                                        <Checkbox inputId={title.key} name="title" value={title} onChange={onConfirmationChange} checked={selectedConfirmation.some((item) => item.key === title.key)} />

                                                                                    </>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div> */}
                                                                                {
                                                                                    substituteName ? <div className="col mt-2">
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Confirmed<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <div className="card flex justify-content-center">
                                                                                            <div className="">
                                                                                                <div className="flex align-items-center">
                                                                                                    <RadioButton inputId="confirmValue1" name="confirmed" value="Yes" onChange={(e) => { seConfirmedValue(e.value); setIsConfirmation(true); }}

                                                                                                        checked={
                                                                                                            confirmedValue === 'Yes'
                                                                                                        }

                                                                                                    />
                                                                                                    <label htmlFor="confirmValue1" className="ml-2 text-sm">Yes</label>
                                                                                                </div>
                                                                                                <div className="flex align-items-center">
                                                                                                    <RadioButton inputId="confirmValue2" name="confirmed" value="No" onChange={(e) => { seConfirmedValue(e.value); setIsConfirmation(false); }} checked={confirmedValue === 'No'} />
                                                                                                    <label htmlFor="confirmValue2" className="ml-2 text-sm">No</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> : null
                                                                                }

                                                                                <div className='grid grid-cols-2 mt-2 gap-2 mt-2 '>
                                                                                    <div className="col">
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Account Number(s) To Be Charged<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        {
                                                                                            accountNoArray.map((item, index) => {
                                                                                                return (
                                                                                                    <div className='relative'>
                                                                                                        <input value={item.accountNo} onChange={e => { onChangeAccNo(index, e.target.value) }} name="" class="text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="Type here" />
                                                                                                    </div>

                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                    <div className='col'>
                                                                                        <div className="col">
                                                                                            <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Percentage</label>
                                                                                            {
                                                                                                accountNoArray.map((item, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <div className='grid grid-cols-12'>
                                                                                                                <div className='relative col-span-11 mt-2'>
                                                                                                                    <InputNumber value={item.Percentage > 0 ? item.Percentage : null}
                                                                                                                        minFractionDigits={2} maxFractionDigits={2} mode="decimal" step={0.25} min={0}
                                                                                                                        //  minFractionDigits={2} maxFractionDigits={2} mode="decimal" step={0.25} min={0} max={100} suffix="%
                                                                                                                        onValueChange={(e) => {
                                                                                                                            onChangePercentage(index, e.value);
                                                                                                                        }}
                                                                                                                        name="" className="text-[16px] xl:text-[0.833vw] mt-3s placeholder-[#101828]  block rounded-[8px] xl:rounded-[0.417vw] w-full custom-input" placeholder="Type here" />

                                                                                                                </div>
                                                                                                                <div className='col-span-1 '>
                                                                                                                    <Link href='#' className=" pi pi-trash py-2 mt-2.5 px-2.5 text-[18px] text-[#667085] font-meduim"
                                                                                                                        onClick={() => {
                                                                                                                            onClickRemove(index);
                                                                                                                        }}
                                                                                                                    >
                                                                                                                    </Link>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <a href="#" onClick={() => {
                                                                                    onClickAdd();
                                                                                }} className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] mt-2">
                                                                                    Add</a>


                                                                                <div className='flex justify-between  gap-4 sub_classified mt-2' >
                                                                                    <div className='col flex flex-col'>
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Principal/Dept Head<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <Dropdown value={principalAndDepartmentHead} onChange={(e) => {
                                                                                            setPrincipalAndDepartmentHead(e.value);
                                                                                        }} options={allApproverList}
                                                                                            onKeyDown={e => {
                                                                                                setUserList(e)
                                                                                            }}
                                                                                            optionLabel="name" showClear placeholder="Select here"

                                                                                            filter
                                                                                        // valueTemplate={selectedCountryTemplate}
                                                                                        />
                                                                                    </div>

                                                                                    <div className='col flex flex-col'>
                                                                                        <label className="text-[#344054] text-[14px] mr-[10px] xl:mr[0.629vw] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Budget Clerk</label>
                                                                                        <Dropdown value={budgetApprover} onChange={(e) => {
                                                                                            setBudgetApprover(e.value);
                                                                                        }} options={budgetClerkList}
                                                                                            onKeyDown={e => {
                                                                                                setUserListByClerk(e)
                                                                                            }}
                                                                                            optionLabel="name" showClear placeholder="Select here"
                                                                                            filter
                                                                                        // valueTemplate={selectedCountryTemplate}
                                                                                        />
                                                                                    </div>


                                                                                    {/*<div className='col '>
                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Human Resource<span className='text-[red] pl-0.2'>*</span></label>
                                                                                        <Dropdown value={payrollHR} onChange={(e) => {
                                                                                            setPayrollHR(e.value);
                                                                                        }} options={payrollListHR} optionLabel="name"
                                                                                            placeholder="Select here"
                                                                                            filter
                                                                                            onKeyDown={e => {
                                                                                                setEmpList(e, "payroll")
                                                                                            }}
                                                                                        // valueTemplate={selectedCountryTemplate}
                                                                                        />
													</div>  */}

                                                                                </div>

                                                                            </div>

                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="pb-6 pt-2 ">
                                                                    {/* <div>
                                                                        <a href="#" className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                                                    </div> */}
                                                                    <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                                                        {
                                                                            rejectReportId !== "Rejected" && rejectReportId !== "Submitted" && rejectReportId !== "Reviewed & resubmitted" ?
                                                                                <a
                                                                                    onClick={() => {
                                                                                        saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.OPEN);
                                                                                    }}
                                                                                    href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a> : null
                                                                        }
                                                                        <a
                                                                            onClick={() => {
                                                                                if (rejectReportId === "Rejected") {
                                                                                    saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.RESUBMITTED);
                                                                                } else {
                                                                                    saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED);
                                                                                }
                                                                                handleClickDisable();
                                                                            }}
                                                                            disabled={buttonClicked} className={`${(buttonClicked) ? 'gray ' : 'blue '} inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] printicon`}>
                                                                            {/* <i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i> */}
                                                                            Submit</a>
                                                                        {
                                                                            (showPreviewPopUp) ?
                                                                                <a href="#" onClick={() => {
                                                                                    // saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED);
                                                                                }
                                                                                } disabled={buttonClicked} className={`${(buttonClicked) ? 'gray ' : 'blue '} inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#26be13] hover:bg-[#23a512] border border-[#26be13] hover:border-[#23a512] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]`}>
                                                                                    <i className='gusd-check mr-1'></i>Submit</a> :

                                                                                <a href="#" onClick={() => {
                                                                                    SetPreviewAndEdit(true); SetBasicInfoPopUp(false);
                                                                                }} className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]">
                                                                                    <i className='gusd-eye mr-1'></i>Preview</a>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : null
                                                    }

                                                    {
                                                        previewAndEdit === true ?
                                                            <div>
                                                                <div className='mt-[24px] xl:mt-[1.250vw] '>
                                                                    {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                                                                    {/* <ClassifiedRequestPdf
                                                                submittedOn={moment().format('MM/DD/YYYY')}
                                                                employeeName={employeeDetailsName}
                                                                fromDate = {moment(fromDate).format("MM/DD/YYYY")}
                                                                toDate = {moment(toDate).format("MM/DD/YYYY")}
                                                                peroid={moment(fromDate).format("MM/DD/YYYY") + " to " + moment(toDate).format("MM/DD/YYYY")}
                                                                location={location.name}


                                                            /> */}
                                                                    <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]'>
                                                                        <div id="my-html-template" className='border px-8'>
                                                                            <div className='w-full py-3 ' >
                                                                                <div className='flex justify-center '>
                                                                                    <div className='w-full pt-3 ' >
                                                                                        <div className='flex justify-center '>
                                                                                            <b className=''>CLASSIFIED </b>
                                                                                        </div>
                                                                                        <div className='flex justify-end relative top-[-1.5vw]'>
                                                                                            <b className=''>FORM 3 </b>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <center className="font-semibold" style={{ marginTop: '-10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                                                <div>Glendale, California</div>
                                                                                <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>

                                                                                <div class="border border-[#545454] w-2/4 text-[12px] mt-4 p-4 rounded-lg"> DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.</div>
                                                                            </center>
                                                                            <div className='mt-8'>

                                                                                <div className='leading-10'>
                                                                                    <div className='flex justify-between'>

                                                                                        <div class="flex gap-2">CLASSIFICATION <div class="text-[green] font-bold print:w-[20.625vw]  border-b border-[#545454]">{classification}</div></div>
                                                                                        <p>Dates From:
                                                                                            {
                                                                                                fromDate ?
                                                                                                    <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>
                                                                                                        {moment(fromDate).format("MM/DD/YYYY")}
                                                                                                    </span> : "-"

                                                                                            }
                                                                                            Thru:
                                                                                            {
                                                                                                toDate && toDate !== null && moment(toDate).format("MM/DD/YYYY") !== 'Invalid Date' ?
                                                                                                    <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>{moment(toDate).format("MM/DD/YYYY")}</span>

                                                                                                    : "-"
                                                                                            }

                                                                                        </p></div>


                                                                                    <p>Type of Sub Request/Object Code: <span className='text-[green] font-bold w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454]'>{typeOfSubRequest?.name}</span></p>
                                                                                    <p>Absent Employee's Legal Name (if applicable) <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>{employeeDetailsName}</span></p>

                                                                                    <div className='flex justify-between'>
                                                                                        <p>Total Working Hours <span className='text-[green] font-bold w-[15.625vw]  print:w-[20.625vw]   border-b border-[#545454] '>{totalWorkingHours}</span></p>
                                                                                        <p>From :

                                                                                            {
                                                                                                startTime ?
                                                                                                    <span className='text-[green] font-bold w-[6.625vw]  print:w-[5.625vw]   border-b border-[#545454] '>{moment(startTime, 'HH:mm:ss.SSS').format("hh:mm A")}</span> : "-"
                                                                                            }

                                                                                            To :
                                                                                            {
                                                                                                endTime ?
                                                                                                    <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>{moment(endTime, 'HH:mm:ss.SSS').format("hh:mm A")}</span> : "-"
                                                                                            }
                                                                                        </p>


                                                                                    </div>
                                                                                    <p>Location <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>{location?.name ? location?.name : '-'}</span></p>
                                                                                    <p>Reason For Absence/Request <span className='text-[green] font-bold w-[6.625vw]  print:w-[6.625vw]   border-b border-[#545454]'>{reasonForAbsenceRequest}</span></p>
                                                                                    <p>If possible, we would like to have  <span className='text-[green] font-bold'>{substituteName}</span>
                                                                                        <span className='pl-4'>Confirmation status</span>
                                                                                        <span className='text-[green] font-bold pl-4 w-[6.625vw]  print:w-[6.625vw]'>{confirmedValue.length > 0 ? confirmedValue : "-"}</span> </p>
                                                                                </div>

                                                                                <div className='flex gap-2'>
                                                                                    <div className='mt-8 w-2/4 text-left'>
                                                                                        <p className='font-bold text-center'>Account Number(s) To Be Charged
                                                                                        </p>

                                                                                        <center>                                                                                    {
                                                                                            accountNoArray.map((item) => {
                                                                                                return (
                                                                                                    <div>
                                                                                                        <p className=' top-0 left-32 border-b border-[#545454] w-[18.625vw]  print:w-[30.625vw]'>{item.accountNo}</p>

                                                                                                    </div>
                                                                                                )
                                                                                            })

                                                                                        }
                                                                                        </center>


                                                                                    </div>

                                                                                    <div className='mt-8 w-2/4 text-left'>
                                                                                        <p className='font-bold text-center'>Percentage
                                                                                        </p>

                                                                                        <center>                                                                                    {
                                                                                            accountNoArray.map((item) => {
                                                                                                return (
                                                                                                    <div>
                                                                                                        <p className=' top-0 left-32 border-b border-[#545454] w-[18.625vw] print:w-[30.625vw]'>{item.Percentage === 'null' || item.Percentage === null || item.Percentage === "" ? '-' : item.Percentage}</p>
                                                                                                    </div>
                                                                                                )
                                                                                            })

                                                                                        }
                                                                                        </center>


                                                                                    </div>
                                                                                </div>

                                                                                {/* <div className='mt-10 text-center '>Approval Signature(s)</div>

                                                                                <div className='mt-2 mb-2 bg-[gray] text-[10px] text-[black] '>

                                                                                    <div className='flex justify-center gap-5 p-5'>
                                                                                        <div>
                                                                                            <div className='text-center'>________________________________________________________________</div>
                                                                                            <div className='text-center'>Principal/Department Administrator</div>

                                                                                        </div>

                                                                                        <div>
                                                                                            <div className='text-center'>______________</div>
                                                                                            <div className='text-center'>Date</div>

                                                                                        </div>


                                                                                        <div>


                                                                                        </div>

                                                                                    </div>

                                                                                    <div className='flex justify-center  gap-5 p-5'>
                                                                                        <div>
                                                                                            <div className='text-center'>________________________________________________________________</div>
                                                                                            <div className='text-center'>Categorical Program Administrator (if otherthan Principal)</div>

                                                                                        </div>

                                                                                        <div>
                                                                                            <div className='text-center'>______________</div>
                                                                                            <div className='text-center'>Date</div>

                                                                                        </div>
                                                                                        <div>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className='flex justify-center  gap-5 p-5'>
                                                                                        <div>
                                                                                            <div className='text-center'>________________________________________________________________</div>
                                                                                            <div className='text-center'>Sub Desk</div>

                                                                                        </div>

                                                                                        <div>
                                                                                            <div className='text-center'>______________</div>
                                                                                            <div className='text-center'>Date</div>

                                                                                        </div>
                                                                                        <div>
                                                                                        </div>

                                                                                    </div>
                                                                                    
                                                                                </div> */}
                                                                                <div className='text-[10px] mt-[2vw] py-2'>Revised 1/17/23</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <BasicInfo/> */}
                                                                </div>
                                                                <div className="flex justify-between  2xl:mb-[20px] xl:mt-[1.083vw]">
                                                                    <div>
                                                                        <a href="#" onClick={() => { setShowPreviewPopUp(false); SetPreviewAndEdit(false); SetBasicInfoPopUp(true) }} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                                                    </div>
                                                                    <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                                                        <a
                                                                            onClick={() => {
                                                                                saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.OPEN);
                                                                            }}
                                                                            href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>

                                                                        <a href="#" onClick={() => {
                                                                            if (rejectReportId === "Rejected") {
                                                                                saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.RESUBMITTED);
                                                                            } else {
                                                                                saveBasicInfo(CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED);
                                                                                handleClickDisable();
                                                                            }
                                                                        }
                                                                        } disabled={buttonClicked} className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                                                            <i className='gusd-check mr-1'></i>Submit</a>
                                                                    </div>
                                                                </div>
                                                            </div> : null
                                                    }

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
                                                <div className="relative">
                                                    <div className="text-[24px] xl:text-[1.250vw] font-medium">Employee Details</div>
                                                    <div className="mt-[15px] lg:mt-[32px] xl:[1.667vw]">

                                                        {
                                                            (selectedEmployee) ?
                                                                <div className='bg-[#D8E7FC] border border-[#D8E7FC] grid grid-cols-12 gap-4'>
                                                                    {/* <Avatar className='col-span-3' src={profileImage} size="xlarge" shape="circle" /> */}
                                                                    <div className='col-span-7'>
                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Name</label>
                                                                        <div className="text-[#101828] text-[12px] font-medium">{employeeDetailsName}</div>
                                                                    </div>
                                                                    {/* <i className='gusd-edit col-span-2'></i> */}
                                                                </div> : null
                                                        }




                                                        <div className="absolute bottom-[20px] left-0 right-0 xl:bottom-[2.083vw] -z-[1]">
                                                            <img src={""} class=" mx-auto" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div >
                        </Dialog >

                        {/* Reject dialog */}
                        < Dialog header="Reject Report"
                            visible={rejectVisible}
                            style={{ width: '30vw' }}
                            onHide={() => setRejectVisible(false)}
                            footer={footerContentForReqReject}
                        >
                            <div className="m-0">
                                {
                                    (!sendMsg) ?
                                        <div className='font-medium text-[18px] mb-6'>Enter the Reason for Rejection<span className="text-[red] pl-0.2">*</span></div>
                                        :
                                        <div className='font-medium text-[18px] text-[#249144] mb-6'>Message Sent Successfully</div>
                                }
                                <InputText value={rejectMsgValue} placeholder="Enter the Reason for Rejection" onChange={(e) => setRejectValueMsg(e.target.value)} className="w-full" />
                            </div>
                        </Dialog >



                    </Layout >
                )}
            </ReactFullscreen>
        </>

        // ) : (
        //     <Login sessionExpired={1} />
        // );
    );
}