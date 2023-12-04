import Link from "next/link";
import moment from "moment";
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Column } from 'primereact/column';
import ReactFullscreen from 'react-easyfullscreen';
import { DataTable } from 'primereact/datatable';
import { Dialog } from "primereact/dialog";
import { Dropdown } from 'primereact/dropdown';
// import { Image } from 'primereact/image';
import { InputText } from "primereact/inputtext";
import { Sidebar } from 'primereact/sidebar';
import { TabPanel, TabView } from 'primereact/tabview';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, } from 'primereact/api';
import React, { useEffect, useState, useRef, useMemo } from "react";
import { toast } from 'react-toastify';
import { reactLocalStorage } from 'reactjs-localstorage';
// import { default as sideBarRight, default as sidebar } from "../../../assets/images/sidebarright.svg";
// import awsmobile from "../../../aws-exports";
// import Layout from "../../../components/common/nav/initiator/nav.component";
// import Editpopup from "../../../components/popup/editpopup";

// import { ConvertResponseForEmployee, ConvertResponseForSelect, ConvertResponseOfNameCodeForSelect, GetValueFromArray, graphQLGetAllData } from '../../../helper/commonfunctions';
// import { Request_Stipend_Status, stipend_Type, Request_Stipend_Status_Name } from '../../../helper/enum';
// import { ValidateInitiatorAndApproverRole, } from '../../../helper/validateRole';
import { Card } from 'primereact/card';
// import {
//     DepartmentTypeMaster,
//     Employee,
//     Schools, SemisterMaster,
//     StipendAssignments,
//     StipendMaster,
//     YearMaster,
//     StipendTransactionCycle
// } from "../../../models";

// import '../../../components/reportpdftemplate/base.min.css';
// import StipendFormPdf from '../../../components/reportpdftemplate/stipendFormPDF';
// import '../../../components/reportpdftemplate/fancy.min.css';
// import '../../../components/reportpdftemplate/main.css';
import { InputSwitch } from "primereact/inputswitch";
// import landing_logo from "../../../assets/images/landing_logo.png";
import { Badge } from 'primereact/badge';
// import { dataURLtoBlob } from "../../../components/signature/signatureHelper";
// import { handleNotificationsOnStatusChangeforStipendForm } from "../../../components/actions/notficationActions";
import { Tooltip } from 'primereact/tooltip';
import { Timeline } from 'primereact/timeline';
// import capitalizeFirstChar from '../../../components/common/capitalizeFirstChar'
import { API_STATUS, USER_TYPES, USER_TYPES_NAMES } from "@/helper/enum";
import SignatureDialog from "@/components/signature/SignatureDialog";
import { dataURLtoBlob } from "@/components/signature/signatureHelper";
import { handleNotificationsOnStatusChangeforStipendForm } from "@/components/actions/notficationActions";
import StipendFormPdf from "@/components/reportpdftemplate/stipendFormPDF";
import Layout from "@/components/layout/layout";
import Editpopup from "@/components/popup/editpopup";
import { Request_Stipend_Status, stipend_Type, Request_Stipend_Status_Name, designationForAllApps } from "@/components/helper/enum";
import handleDateSelect from "@/components/helper/convertDateIntoPSTFormat";
import capitalizeFirstChar from "@/components/common/capitalizeFirstChar";
import EmployeePopup from "@/components/common/EmployeePopup";
// import { approvalStatus, tableData } from "../Misc";
import ReportTable from "../Components/ReportTable";
import axios from "axios";
import { useRouter } from "next/router";
// import EditPopups from "@/pages/stipend_form/EditPopups";

export default function StipendInitiatorReportList() {


    // let navigateTo = useNavigate();
    const CCEmail = process.env.REACT_APP_CC_Email;
    const HREmail = process.env.REACT_APP_HR_Email;

    const currentDateTime = moment();
    const router = useRouter();
    //*state
    const [allApproverList, setAllApproverList] = useState([]);
    const [approverList, setApproverList] = useState([]);

    const componentRef = useRef();
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [hideEditButton, setHideEditButton] = useState(false);
    const [hideSaveButton, setHideSaveButton] = useState(false);
    const [approveBtnDisabled, setApproveBtnDisabled] = useState(false);

    const [employeeId, setEmployeeId] = useState([]);
    const [email, setEmail] = useState(CCEmail);
    const [employeeCodeOnly, setEmployeeCodeOnly] = useState('');
    const [employeId, setEmployeId] = useState('');
    const [isLoader, setIsLoader] = useState(true);
    const [employeeCode, setEmployeeCode] = useState('');
    const [location, setLocation] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [transactionCycleReportId, setSubstituteReportId] = useState("");
    const [visibleRequestedReportEdit, setVisibleRequestedReportEdit] = useState(false);
    const [visibleApprovalRequestedReportEdit, setVisibleApprovalRequestedReportEdit] = useState(false);
    const [fullApproverEdit, setFullApproverEdit] = useState(false);
    const [addSignature, setAddSignature] = useState(false);
    const [signature, setSignature] = useState(true);
    const [visibleRequestedReportView, setVisibleRequestedReportView] = useState(false);
    const [rejectVisible, setRejectVisible] = useState(false);
    const [sendMsg, setSendMsg] = useState(false);
    const [rejectMsgValue, setRejectValueMsg] = useState('');
    const [schoolYearArray, setSchoolYearArray] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [semisterArray, setSemisterArray] = useState([]);
    const [semisterId, setSemisterId] = useState('');
    const [semister, setSemister] = useState('');
    const [departmentArray, setDepartmentArray] = useState([]);
    const [departmentId, setDepartmentId] = useState('');
    const [departmentPeopleCount, setDepartmentPeopleCount] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedHRTechnician, setSelectedHRTechnician] = useState(null);
    const [selectedHRTechnicianId, setSelectedHRTechnicianId] = useState(null);
    const [selectedExecutiveManager, setSelectedExecutiveManager] = useState(null);
    const [selectedPrincipal, setSelectedPrincipal] = useState(null);
    const [stipendApproveReportListInitiator, setStipendApproveReportListInitiator] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [approvalCompleteData, setApprovalFinalData] = useState([]);
    const [formTitle, setFormTitle] = useState('');
    const [signaturePath, setSignaturePath] = useState(null);
    // const [signatureFileAwsPath, setSignatureFileAwsPath] = useState(null);
    const [principleDepartmentHeadList, setPrincipleDepartmentHeadList] = useState([]);
    const [hrList, setHRList] = useState([]);
    const [executiveList, setExecutiveList] = useState([]);
    const [previousEmployee, setPreviousEmployee] = useState('');
    const [approverListForReject, setApproverListForReject] = useState([]);
    const [employeeCodeList, setEmployeeCodeList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [stipendMasterData, setStipendMasterData] = useState([]);
    const [assignmentArray, setAssignmentArray] = useState([{
        "name": "", "amount": "", "isSplit": false, "splitText": "", "isDeptChair": false, "noOfEmployee": "", "isExtraCurricular": false
    }]);
    const [fullApproverViewForView, setFullApproverViewForView] = useState(false);
    const [visibleCreteReportPopup, setVisibleCreteReportPopup] = useState(false);
    const [showNextPopUp, setShowNextPopUp] = useState(false);
    const [confirmVisible2, setConfirmVisible2] = useState(false);
    const [previewSubmit, setPreviewSubmit] = useState(false);
    const [showPreviewPopUp, setShowPreviewPopUp] = useState(false);
    const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [visibleRight, setVisibleRight] = useState(false);
    const [basicInfoPopUp, SetBasicInfoPopUp] = useState(true);
    const [activate, setActivate] = useState("");
    const [previewAndEdit, SetPreviewAndEdit] = useState(false);
    const [stipendMasterId, setStipendMasterId] = useState('');
    const [btnStatus, setBtnStatus] = useState(Request_Stipend_Status.PENDING);
    const [signatureDialog, setSignatureDialog] = useState(false);
    const [approverLevelForReject, setApproverLevelForReject] = useState([]);
    const [schoolList, setSchoolList] = useState([]);

    //

    const [selectedSchool, setSelectedSchool] = useState("")
    const [newSchoolList, setNewSchoolList] = useState([]);
    const [openNewEmployee, setOpenNewEmployee] = useState(false);
    const [NewEmployeeSchool, setNewEmployeeSchool] = useState(null);
    // const [NewEmployeeName, setNewEmployeeName] = useState('');

    const [newEmpFirstName, setNewEmpFirstName] = useState('');
    const [newEmpLastName, setNewEmpLastName] = useState('');
    const rolesArray = [
        { name: 'Initiator', code: 'I' },
        { name: 'Approver', code: 'AP' },
        { name: 'Payroll', code: 'P' },
    ];
    const [newEmpSelectedRole, setNewEmpSelectedRole] = useState(null);
    const [newEmpSelectedDesignation, setNewEmpSelectedDesignation] = useState(null);
    const [checked, setChecked] = useState(false);
    const [NewEmployeeCode, setNewEmployeeCode] = useState('');
    const [NewEmployeeEmail, setNewEmployeeEmail] = useState('');
    const [userSub, setUserSub] = useState("");
    const [status, setStatus] = useState('');
    const [approverEdit, setApproverEdit] = useState(false);
    const [users, SetUsersList] = useState([]);
    //  const loggedUserId = reactLocalStorage.get('loggedUserId');
    //  const loggedStipendApprover = reactLocalStorage.get('loggedStipendApprover');
    //  const loggedStipendInitiator = reactLocalStorage.get('loggedStipendInitiator');
    const [statuses] = useState(Request_Stipend_Status_Name);
    const confirmed = stipend_Type;
    const [selectedConfirmation, setSelectedConfirmation] = useState([]);
    const [approversOptions, setApproversOptions] = useState([]);
    const [fallBackApprover, setFallBackApprover] = useState();
    const [fallBackApproverId, setFallBackApproverId] = useState();
    const [fallBackApproverLevel, setFallBackApproverLevel] = useState();
    const [isApproveButtonDisable, setIsApproveButtonDisable] = useState(false);

    let [submittedBy, setSubmittedBy] = useState({});

    //states end

    // const setHRManager = async () => {
    //     try {
    //         const cognito = new AWS.CognitoIdentityServiceProvider();

    //         var params =
    //         {
    //             UserPoolId: awsmobile.aws_user_pools_id,
    //             Limit: 60,
    //             "Filter": "email ^= \"" + HREmail + "\""
    //         };

    //         await cognito.listUsers(params, (err, data) => {
    //             if (err) {
    //                 //(err.message);
    //             } else {
    //                 let usersData = []
    //                 //let adminUsers = data.Users
    //                 var name = "";
    //                 var sub = "";


    //                 data.Users.forEach((user, i) => {
    //                     name = user.Attributes.find(attr => attr.Name === "name")?.Value;
    //                     sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;

    //                     let objFirst = { name: name, code: sub }
    //                     setSelectedHRTechnician(name)
    //                     setSelectedHRTechnicianId(sub)

    //                 })
    //             }
    //         });

    //     } catch (e) {
    //         //toast.error(e.message);
    //     }
    // }


    // const handleSignatureSelection = async (image) => {
    //     setSignatureDialog(false);
    //     setSignatureFileAwsPath(null);
    //     const signatureFilePath = await uploadSignature(image);
    //     if (signatureFilePath.trim() !== '') {
    //         setSignaturePath(signatureFilePath);
    //         // loadSignatureFile(signatureFilePath);
    //         setSignatureFileAwsPath(image);
    //     } else {
    //         signatureFilePath(null);
    //     }
    // }
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
    const reportListActions = (row) => {
        return [
            <>
                <Link
                    href="#"
                    className="px-2.5"
                    onClick={() => {
                        // setVisibleRequestedReportView(true);
                        setVisibleApprovalRequestedReportEdit(true);
                        // show('right')
                    }
                    }
                >
                    <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                </Link>
                <Link
                    href="#"
                    className="py-2 px-2.5"
                >
                    <i onClick={() => setShowNextPopUp(true)} className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
                </Link>
            </>,
        ];
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
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
    const uploadSignature = async (signature) => {

        const fileName = 'profile/' + loggedInUserData?.userId ?? loggedUserId + '/signature.png';

        const blob = await dataURLtoBlob(signature);

        try {
            toast.loading('Uploading please wait...');
            await Storage.put(fileName, blob, {
                resumable: true,
                completeCallback: (event) => {
                    toast.dismiss();
                    Auth.currentAuthenticatedUser()
                        .then((user) => {
                            return Auth.updateUserAttributes(user, {
                                'custom:userSignature': fileName,
                            });
                        }).catch((err) => toast.error(err.message));
                },

                errorCallback: (err) => {
                    toast.error(err.message);
                },

            });
            // setSignatureFileAwsPath(signature);
        } catch (error) {
        }
        return fileName;
    }

    async function handleRejectClick() {
        getApproverLevelOptions();
    };

    const footerContent = (
        <div className='text-center'>
            <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible(false); setVisibleEdit(false) }}>Close</button>
        </div>
    );
    const footerContent1 = (
        <div className='text-center'>
            <button className='border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded' onClick={() => { setConfirmVisible2(false); setShowNextPopUp(false); setVisibleCreteReportPopup(false); setShowPreviewPopUp(false); BindList(); }}>Close</button>
        </div>
    );
    //_____popup

    const onConfirmationChange = (e) => {
        let _selectedConfirmation = [...selectedConfirmation];
        if (e.checked)
            _selectedConfirmation.push(e.value);
        else
            _selectedConfirmation = _selectedConfirmation.filter(confirmed => confirmed.key !== e.value.key);

        setSelectedConfirmation(_selectedConfirmation);
    };

    //new Request status
    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={TaskStatusSL(option)} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
        );
    };

    const TaskStatusSLA = (product) => {
        return <><Badge value="" severity={TaskStatusSL(product)}></Badge> {product.status}</>;
    };

    const TaskStatusSL = (product) => {
        switch (product.status) {
            case "Rejected":
                return "danger";

            case "Pending for Budget Approver":
                return "success";

            case "Completed":
                return "info";

            case "SUBMITTED":
                return "success";

            case "Pending for Principal/Department Head":
                return "info";

            case "pending":
                return "warning";

            case "renewal":
                return null;

            default:
                return null;
        }
    };

    const statusRowFilterInitiateTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemInitiateTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
        );
    };


    //new Initiator status
    const TaskStatusSLNewIn = product => {
        switch (product.statusStipend) {

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE:
                return 'info';

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL:
                return 'info';

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN:
                return 'info';

            case Request_Stipend_Status.REJECT:
                return 'danger';

            case Request_Stipend_Status.PENDING:
                return 'info';

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN:
                return 'info';

            case Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN:
                return 'success';

            case Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL:
                return 'info';

            case Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN:
                return 'info';

            default:
                return null;
        }
    };
    const TaskStatusInitiate = product => {
        return <><Badge value="" severity={TaskStatusSLNewIn(product)}></Badge> {product.statusStipend}</>;
    };

    const statusItemInitiateTemplate = (option) => {
        return <Tag value={option} severity={TaskStatusSLNewIn(option)} />;
    };

    // const SaveUserToCognito = async (newEmployeeId) => {
    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     const userPoolId = awsmobile.aws_user_pools_id;
    //     const username = NewEmployeeEmail
    //     const password = "Gusd@2023"
    //     const Permanent = true

    //     let attributes = [
    //         {
    //             Name: 'email',
    //             Value: NewEmployeeEmail
    //         },
    //         {
    //             Name: 'custom:firstName',
    //             Value: newEmpFirstName
    //         },
    //         {
    //             Name: 'custom:lastName',
    //             Value: capitalizeFirstChar(newEmpLastName)
    //         },
    //         {
    //             Name: 'name',
    //             // Value: NewEmployeeName
    //             Value: capitalizeFirstChar(newEmpLastName) + ", " + newEmpFirstName.toUpperCase()
    //         },
    //         {
    //             Name: 'custom:userCode',
    //             Value: NewEmployeeCode
    //         },
    //         // {
    //         //     Name: 'custom:city',
    //         //     Value: city
    //         // },
    //         // {
    //         //     Name: 'custom:mobileNumber',
    //         //     Value: phoneNo
    //         // },
    //         // {
    //         //     Name: 'custom:address',
    //         //     Value: addressOne
    //         // },
    //         // {
    //         //     Name: 'custom:stateId',
    //         //     Value: state
    //         // },
    //         // {
    //         //     Name: 'custom:countryId',
    //         //     Value: country
    //         // },
    //         // {
    //         //     Name: 'custom:userType',
    //         //     Value: userType.label
    //         // },
    //         {
    //             Name: 'custom:empId',
    //             Value: newEmployeeId
    //         },

    //     ];

    //     const params = {
    //         UserPoolId: userPoolId,
    //         Username: username,
    //         UserAttributes: attributes
    //     };

    //     const params2 = {
    //         UserPoolId: userPoolId,
    //         Username: username,
    //         Password: password,
    //         Permanent: Permanent,
    //     };

    //     let userSub;
    //     try {
    //         const createUserResponse = await cognito.adminCreateUser(params).promise();
    //         userSub = createUserResponse.User?.Attributes?.find(attr => attr.Name === 'sub')?.Value;
    //         setUserSub(userSub)
    //         // toast.success("Employee confirmed and saved successfully")

    //         // User Confirmation 
    //         cognito.adminSetUserPassword(params2, (err, data) => {
    //             if (err) {
    //             } else {
    //             }
    //         });

    //     } catch (error) {
    //         console.error('Error saving Cognito user:', error);
    //     }



    //     if (userSub !== null) {
    //         //Update Employee with Cognito UserId
    //         // const original = await DataStore.query(Employee, newEmployeeId);
    //         // await DataStore.save(
    //         //     Employee.copyOf(original, (updated) => {
    //         //         updated.user_Id = userSub
    //         //     })
    //         // );
    //         const original = await API.graphql(
    //             graphqlOperation(queries.getEmployee,
    //                 { id: newEmployeeId }
    //             )
    //         );
    //         await API.graphql(
    //             graphqlOperation(mutations.updateEmployee, {
    //                 input: {
    //                     id: original?.data?.getEmployee?.id,
    //                     user_Id: userSub,
    //                     _version: original?.data?.getEmployee?._version,
    //                 }
    //             }))
    //     }


    // }
    const fetchPaginatedRecords = async (query, filter, sort, limit, resultKey, checkDeleted = true) => {
        let allRecords = [];
        let nextToken = null;
        let variables = checkDeleted ? { _deleted: { eq: null } } : {};
        // Add to query variables that are not null
        filter && (variables.filter = filter);
        limit && (variables.limit = 3000);
        sort && (variables.sort = sort);
        do {
            variables.nextToken = nextToken;
            const result = await API.graphql(graphqlOperation(query, variables));
            const { items, nextToken: newNextToken } = result.data[resultKey];

            allRecords = [...allRecords, ...items];
            nextToken = newNextToken;
        } while (nextToken);
        return allRecords.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    };
    const AddNewEmployee = async () => {
        if (location === "" || location === null) {
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
        // else if (newEmpSelectedRole === null) {
        //     toast.error("Please Select Employee Role");
        //     return;
        // }
        // else if (newEmpSelectedDesignation === null) {
        //     toast.error("Please Select Employee Designation");
        //     return;
        // }

        else if (NewEmployeeCode === "") {
            toast.error("Please Enter Employee Code");
            return;
        } else if (NewEmployeeEmail === null || NewEmployeeEmail === "") {
            toast.error("Please Enter Employee Email");
            return;
        }

        //first check typed email id is already present or not
        const matchedEmailRecord = await graphQLGetAllData("listEmployees", [{ email: { eq: NewEmployeeEmail } }])

        if (matchedEmailRecord.length == 0) {
            var AddedNewEmployee = await API.graphql(
                graphqlOperation(mutations.createEmployee,
                    {
                        input: {
                            "school_id": location?.code,
                            // "employee_name": NewEmployeeName,
                            firstName: newEmpFirstName.toUpperCase(),
                            lastName: capitalizeFirstChar(newEmpLastName),
                            employee_name: capitalizeFirstChar(newEmpLastName) + ", " + newEmpFirstName.toUpperCase(),
                            // role: newEmpSelectedRole?.code,
                            // designation: newEmpSelectedDesignation.code,

                            "employee_code": NewEmployeeCode,
                            "email": NewEmployeeEmail
                        }
                    }
                ))
            // await DataStore.save(new Employee(
            //     {
            //         "school_id": location?.code,
            //         "employee_name": NewEmployeeName,
            //         "employee_code": NewEmployeeCode,
            //         "email": NewEmployeeEmail

            //     }
            // ))
            //Check Validate newly employee created
            if (AddedNewEmployee?.data?.createEmployee?.id !== null) {
                //Save Cognito User
                await SaveUserToCognito(AddedNewEmployee?.data?.createEmployee?.id);
            }

            if (AddedNewEmployee) {
                try {

                    var employeeList = await graphQLGetAllData("listEmployees", [{ school_id: { eq: AddedNewEmployee.data.createEmployee.school_id } }])


                    // var employeeList = await fetchPaginatedRecords(
                    //     queries.listEmployees,
                    //     { school_id: { eq: AddedNewEmployee?.data?.createEmployee?.school_id } },
                    //     { field: "employee_name", direction: "asc" },
                    //     1000,
                    //     'listEmployees'
                    // );
                    // await DataStore.query(Employee, Predicates.ALL, {
                    //     sort: s => s.employee_name(SortDirection.ASCENDING)
                    // });
                    if (employeeList !== null) {
                        let employeeData = employeeList;

                        let employee = [];
                        employeeData.map((item) => {
                            let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
                            let obj = {
                                name: name,
                                code: item.id
                            }
                            employee.push(obj);
                        })

                        setEmployeeCodeList(employee);
                        setAllApproverList(employee);
                    }
                }
                catch (error) {
                }
                // var myArray = []; myArray = ConvertResponseForEmployee(employeeList);
                // setEmployeeCodeList(myArray);
                let obj = { name: AddedNewEmployee?.data?.createEmployee?.employee_name + " (" + AddedNewEmployee?.data?.createEmployee?.employee_code + ")", code: AddedNewEmployee?.data?.createEmployee?.id }

                setEmployeeId(obj);
                setEmployeeCodeOnly(obj.name.match(/\d+/)[0])
                setOpenNewEmployee(false)
                setNewEmployeeSchool(null);
                // setNewEmployeeName("");
                setNewEmpFirstName("");
                setNewEmpLastName("");
                setNewEmpSelectedRole(null);
                setNewEmpSelectedDesignation(null);
                setNewEmployeeCode("");
                setNewEmployeeEmail("");

                toast.success('Data Added Successfully.');
            }
        } else {
            toast.error("Please Use Another Email");
        }
    }

    const onClickApproverEditData = async () => {
        setApproverEdit(true);
        setFullApproverEdit(false);
        setIsUpdate(true);
        setConfirmVisible2(false);
        SetBasicInfoPopUp(true);
        SetPreviewAndEdit(false);
        // setSelectedHRTechnician('');
        setSelectedExecutiveManager('');
        setSelectedPrincipal('');
        setEmployeeId([]);
        setLocation('');
        setSchoolYearId('');
        setSemisterId('');
        setDepartmentId('');
        setDepartmentPeopleCount('');
        setAssignmentArray([{
            "name": "", "amount": "", "isSplit": false, "splitText": "", "isDeptChair": false, "noOfEmployee": "", "isExtraCurricular": false
        }]);
        setSelectedConfirmation([]);
        setShowNextPopUp(true);
        onClickEditPopUp(stipendMasterId);
        setHideSaveButton(true)
    }

    const onClickApproverEditPopUp = async (id) => {
        var requestId = id;
        setApprovalFinalData([]);
        setSubstituteReportId(requestId);
        SetPreviewAndEdit(false);

        const substituteCertificateRequestTransactionCycleResponse = await DataStore.query(StipendTransactionCycle, requestId);

        setStipendMasterId(substituteCertificateRequestTransactionCycleResponse.report_Id);

        if (substituteCertificateRequestTransactionCycleResponse.isApproved === true) {
            setIsApproveButtonDisable(true);
        }

        // setShowNextPopUp(true);
        const stipendRequestResponse = await DataStore.query(StipendMaster, (c) => c.id.eq(substituteCertificateRequestTransactionCycleResponse.report_Id));

        if (stipendRequestResponse[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || stipendRequestResponse[0].rejectedBy === 'H' || substituteCertificateRequestTransactionCycleResponse.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {
            setHideEditButton(true)
        }

        //Get stipend details
        getStipendFormDetails(stipendRequestResponse[0].id)

        //---Start Approval Status-----
        getApprovalData(stipendRequestResponse[0].id);

    }

    const getStipendFormDetails = async (reportId) => {

        const original = await DataStore.query(StipendMaster, reportId);

        let selectedConfirmationType = [];

        if (original.isMiddleStipend === true) {
            selectedConfirmationType.push({ name: 'Middle School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isMiddleStipend' });
        }
        if (original.isElementaryStipend === true) {
            selectedConfirmationType.push({ name: 'Elementary Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isElementaryStipend' });
        }
        if (original.isHighStipend === true) {
            selectedConfirmationType.push({ name: 'High School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isHighStipend' });
        }
        if (original.isDepartmentStipend === true) {
            selectedConfirmationType.push({ name: 'Department Chair Stipend(01.0-00000.0-11303-10000-1170-0005616)(01.0-65000.0-57606-11100-1170-0000600-SPED)', key: 'isDepartmentStipend' });
        }
        if (original.isHeadStipend === true) {
            selectedConfirmationType.push({ name: 'Head Counselor Stipend(01.0-00000.0-00000-31101-1272-0004682)', key: 'isHeadStipend' });
        }
        setSelectedConfirmation(selectedConfirmationType)

        let assignments = await DataStore.query(StipendAssignments, (c) => c.stipendMasterId.eq(original.id));

        var myArray = [];
        if (assignments.length > 0) {
            for (let i = 0; i < assignments.length; i++) {
                myArray.push({ "name": assignments[i].name, "amount": assignments[i].amount, "isSplit": assignments[i].isSplit, "splitText": assignments[i].splitText, "isDeptChair": assignments[i].isDeptChair, "noOfEmployee": assignments[i].noOfEmployee, "isExtraCurricular": assignments[i].isExtraCurricular })
            }
            setAssignmentArray(myArray)
        }

        const employeeCodeResponse = await DataStore.query(Employee, (c) => c.id.eq(original.employeeId));

        setEmployeeCode({ name: employeeCodeResponse[0].employee_name + " (" + employeeCodeResponse[0].employee_code + ")", code: employeeCodeResponse[0].id });

        const employee = await DataStore.query(Employee, original.employeeId);
        const school = await DataStore.query(Schools, original.schoolId);
        const schoolYear = await DataStore.query(YearMaster, original.schoolYearId);
        const semister = await DataStore.query(SemisterMaster, original.semisterId);

        if (employee)
            setEmployeId({ "name": employee.employee_name + " (" + employee.employee_code + ")", "code": employee.id })
        if (school)
            setLocation({ "name": school.name, "code": school.id })
        if (schoolYear)
            setSchoolYear({ "name": schoolYear.name, "code": schoolYear.id })
        if (semister)
            setSemister({ "name": semister.name, "code": semister.id })

        setStatus(original.statusStipend);
    }

    const onClickEditPopUp = async (id) => {
        setConfirmVisible2(false)
        SetBasicInfoPopUp(true)
        SetPreviewAndEdit(false)

        // const cognito = new AWS.CognitoIdentityServiceProvider();

        var requestId = id;
        const original = await DataStore.query(StipendMaster, requestId);

        setStipendMasterId(requestId)
        setPreviousEmployee(original.employeeId);

        if (original) {

            setFormTitle(original.title)
            let employee = await DataStore.query(Employee, original.employeeId);

            const school = await DataStore.query(Schools, original.schoolId);
            const schoolYear = await DataStore.query(YearMaster, original.schoolYearId);
            const semister = await DataStore.query(SemisterMaster, original.semisterId);

            if (original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original.rejectedBy === 'H') {
                setHideEditButton(false)
            }

            setBtnStatus(original.statusStipend)

            if (employee) {
                setEmployeeId({ "name": employee.employee_name + " (" + employee.employee_code + ")", "code": employee.id })
                setEmployeeCodeOnly(employee.employee_code)
            }

            if (school)
                setLocation({ "name": school.name, "code": school.id })

            if (schoolYear)
                setSchoolYearId({ "name": schoolYear.name, "code": schoolYear.id })
            if (semister)
                setSemisterId({ "name": semister.name, "code": semister.id })

            if (original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE || original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL || original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN || original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || original.statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original.statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN || original.statusStipend === Request_Stipend_Status.REJECT) {
                setBtnDisabled(true)
            }

            let selectedConfirmationType = [];

            if (original.isMiddleStipend === true) {
                selectedConfirmationType.push({ name: 'Middle School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isMiddleStipend' });
            }
            if (original.isElementaryStipend === true) {
                selectedConfirmationType.push({ name: 'Elementary Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isElementaryStipend' });
            }
            if (original.isHighStipend === true) {
                selectedConfirmationType.push({ name: 'High School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isHighStipend' });
            }
            if (original.isDepartmentStipend === true) {
                selectedConfirmationType.push({ name: 'Department Chair Stipend(01.0-00000.0-11303-10000-1170-0005616)(01.0-65000.0-57606-11100-1170-0000600-SPED)', key: 'isDepartmentStipend' });
            }
            if (original.isHeadStipend === true) {
                selectedConfirmationType.push({ name: 'Head Counselor Stipend(01.0-00000.0-00000-31101-1272-0004682)', key: 'isHeadStipend' });
            }

            setSelectedConfirmation(selectedConfirmationType)

            let assignments = await DataStore.query(StipendAssignments, (c) => c.stipendMasterId.eq(requestId));

            var myArray = [];
            if (assignments.length > 0) {
                for (let i = 0; i < assignments.length; i++) {
                    myArray.push({ "name": assignments[i].name, "amount": assignments[i].amount, "isSplit": assignments[i].isSplit, "splitText": assignments[i].splitText, "isDeptChair": assignments[i].isDeptChair, "noOfEmployee": assignments[i].noOfEmployee, "isExtraCurricular": assignments[i].isExtraCurricular })
                }
                setAssignmentArray(myArray)
            }

            //get Principle Department Head 
            if (original.principalId) {

                let empName = await DataStore.query(Employee, (c) => c.user_Id.eq(original.principalId));
                let name = empName[0].employee_code ? `${empName[0].employee_name} (${empName[0].employee_code})` : empName[0].employee_name;

                let objFirst = { name: name, code: original.principalId }
                setSelectedPrincipal(objFirst)
            }

            //get HR Technician
            let HRTechnician = '';
            // if (original.hrTechI) {
            //     try {
            //         HRTechnician = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: original.hrTechI }).promise();
            //     } catch (e) {
            //     }

            //     let hRTechnicianApprovalFirstName = await GetValueFromArray(HRTechnician.UserAttributes, "custom:firstName")
            //     let hRTechnicianApprovalLastName = await GetValueFromArray(HRTechnician.UserAttributes, "custom:lastName")
            //     let fullhRTechnicianName = hRTechnicianApprovalFirstName + " " + hRTechnicianApprovalLastName
            //     let objFirst = { name: fullhRTechnicianName, code: original.hrTechI }
            //     setSelectedHRTechnician(fullhRTechnicianName)
            //     setSelectedHRTechnicianId(original.hrTechI)
            //     setHRList([objFirst])
            // }

            //get Executive Management
            if (original.executiveManagerId) {

                let empName = await DataStore.query(Employee, (c) => c.user_Id.eq(original.executiveManagerId));
                let name = empName[0].employee_code ? `${empName[0].employee_name} (${empName[0].employee_code})` : empName[0].employee_name;

                let objFirst = { name: name, code: original.executiveManagerId }
                setSelectedExecutiveManager(objFirst)
            }

            getApprovalData(original.id, requestId);

            setShowNextPopUp(true);
        }
    }



    const getApproverLevelOptions = async () => {
        // const cognito = new AWS.CognitoIdentityServiceProvider();

        const original = await DataStore.query(StipendMaster, c =>
            c.id.eq(stipendMasterId)
        );

        const originalEmployee = await DataStore.query(Employee, c =>
            c.id.eq(original[0].employeeId)
        );

        try {
            if (original.length) {
                const approversArrray = [original[0].createdBy, originalEmployee[0].user_Id, original[0].executiveManagerId, original[0].hrTechI, original[0].principalId];
                const approverOption = [];
                const levelOption = [];
                let employeeData = '';

                //Employee
                if (originalEmployee[0].user_Id) {
                    try {
                        employeeData = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: originalEmployee[0].user_Id }).promise();
                    } catch (e) {
                    }
                    let firstApprovalFirstName = await GetValueFromArray(employeeData.UserAttributes, "custom:firstName")
                    let firstApprovalLastName = await GetValueFromArray(employeeData.UserAttributes, "custom:lastName")
                    let fullFirstName = firstApprovalFirstName + " " + firstApprovalLastName
                    let objFirst = { label: fullFirstName, value: originalEmployee[0].user_Id, type: "Employee", key: "E" }

                    approverOption.push(objFirst);
                }

                let createdByUser = '';

                //Initiator -
                if (original[0].createdBy) {
                    try {
                        createdByUser = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: original[0].createdBy }).promise();
                    } catch (e) {
                    }
                    let firstApprovalFirstName = await GetValueFromArray(createdByUser.UserAttributes, "custom:firstName")
                    let firstApprovalLastName = await GetValueFromArray(createdByUser.UserAttributes, "custom:lastName")
                    let fullFirstName = firstApprovalFirstName + " " + firstApprovalLastName;
                    let objFirst = { label: fullFirstName, value: original[0].createdBy, type: "Initiator", key: "I" }
                    approverOption.push(objFirst);
                }

                let principalUser = '';
                if (original[0].principalId) {
                    try {
                        principalUser = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: original[0].principalId }).promise();
                    } catch (e) {
                    }
                    let firstApprovalFirstName = await GetValueFromArray(principalUser.UserAttributes, "custom:firstName")
                    let firstApprovalLastName = await GetValueFromArray(principalUser.UserAttributes, "custom:lastName")
                    let fullFirstName = firstApprovalFirstName + " " + firstApprovalLastName
                    let objFirst = { label: fullFirstName, value: original[0].principalId, type: "Principal", key: "P" }

                    approverOption.push(objFirst);

                }


                let hrTechUser = '';
                if (original[0].hrTechI) {
                    try {
                        hrTechUser = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: original[0].hrTechI }).promise();
                    } catch (e) {
                    }
                    let firstApprovalFirstName = await GetValueFromArray(hrTechUser.UserAttributes, "custom:firstName")
                    let firstApprovalLastName = await GetValueFromArray(hrTechUser.UserAttributes, "custom:lastName")
                    let fullFirstName = firstApprovalFirstName + " " + firstApprovalLastName
                    let objFirst = { label: fullFirstName, value: original[0].hrTechI, type: "HR", key: "H" }
                    approverOption.push(objFirst);
                }

                let executiveManagerUser = '';

                if (original[0].executiveManagerId) {
                    try {
                        executiveManagerUser = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: original[0].executiveManagerId }).promise();
                    } catch (e) {
                    }
                    let firstApprovalFirstName = await GetValueFromArray(executiveManagerUser.UserAttributes, "custom:firstName")
                    let firstApprovalLastName = await GetValueFromArray(executiveManagerUser.UserAttributes, "custom:lastName")
                    let fullFirstName = firstApprovalFirstName + " " + firstApprovalLastName
                    let objFirst = { label: fullFirstName, value: original[0].executiveManagerId, type: "Executive", key: "EM" }
                    approverOption.push(objFirst);
                }

                let approveFinalArray = [];

                for (let i = 0; i < approverOption.length; i++) {
                    if (approverOption[i].type === "Initiator") {
                        if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN) {
                            approveFinalArray.push(approverOption[i]);
                        }
                    }

                    if (approverOption[i].type === "Employee") {

                        if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN) {

                            approveFinalArray.push(approverOption[i]);
                        }

                    }
                    if (approverOption[i].type === "Principal") {

                        if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN) {

                            approveFinalArray.push(approverOption[i]);
                        }
                    }
                    if (approverOption[i].type === "HR") {
                        if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {
                            approveFinalArray.push(approverOption[i]);
                        }
                    }

                    if (approverOption[i].type === "Executive") {
                        if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN) {
                            approveFinalArray.push(approverOption[i]);

                        }
                    }
                }

                if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE) {
                    levelOption.push({ label: 'Initiator', value: 'I' });
                }

                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL) {
                    levelOption.push({ label: 'Initiator', value: 'I' }); //, { label: 'Employee', value: 'E' }
                }

                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN) {
                    levelOption.push({ label: 'Initiator', value: 'I' },); //{ label: 'Employee', value: 'E' }, { label: 'Principal', value: 'P' }
                }

                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || original[0].statusStipend === Request_Stipend_Status.REJECT) {
                    levelOption.push({ label: 'Initiator', value: 'I' }, { label: 'HR', value: 'H' }); //{ label: 'Employee', value: 'E' }, { label: 'Principal', value: 'P' },
                }
                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN) {
                    levelOption.push({ label: 'Initiator', value: 'I' }, { label: 'Executive Management', value: 'EM' }); //{ label: 'Employee', value: 'E' }, { label: 'Principal', value: 'P' }, 

                }

                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || original[0].statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN) {
                    levelOption.push({ label: 'Initiator', value: 'I' }, { label: 'Executive Management', value: 'EM' }); //{ label: 'Employee', value: 'E' }, { label: 'Principal', value: 'P' },

                }
                else if (original[0].statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL) {
                    levelOption.push({ label: 'Initiator', value: 'I' }, { label: 'Executive Management', value: 'EM' }, { label: 'HR', value: 'H' }); //{ label: 'Employee', value: 'E' },{ label: 'Principal', value: 'P' },
                }
                setApproversOptions(approveFinalArray);
                setApproverLevelForReject(levelOption);
            }
        }
        catch (e) {
        }
    }

    const getApprover = async (e) => {
        setFallBackApproverLevel(e)
        for (let i = 0; i < approversOptions.length; i++) {
            if (e === approversOptions[i].key) {
                setFallBackApprover(approversOptions[i].label);
                setFallBackApproverId(approversOptions[i].value);
            }
        }
    }

    const toggleActive = () => {
        setActivate(activate === "actives" ? "" : "actives");
    };

    async function onLoad() {
        try {
            await Auth.currentSession();
            if (!ValidateInitiatorAndApproverRole()) { userHasAuthenticated(false); }
        } catch (e) {
            userHasAuthenticated(false);
        }
    }

    //*Save Basic info
    const saveBasicInfo = async (status) => {
        setBtnDisabled(true);

        let isElementaryStipend = false;
        let isMiddleStipend = false;
        let isHighStipend = false;
        let isDepartmentStipend = false;
        let isHeadStipend = false;

        // for (let i = 0; i < selectedConfirmation.length; i++) {
        //     if (selectedConfirmation[i].key === 'isElementaryStipend') { isElementaryStipend = true }
        //     if (selectedConfirmation[i].key === 'isMiddleStipend') { isMiddleStipend = true }
        //     if (selectedConfirmation[i].key === 'isHighStipend') { isHighStipend = true }
        //     if (selectedConfirmation[i].key === 'isDepartmentStipend') { isDepartmentStipend = true }
        //     if (selectedConfirmation[i].key === 'isHeadStipend') { isHeadStipend = true }
        // }

         if (!selectedSchool) { toast.error('Please Select School.'); return; }
         else if (!schoolYearId) { toast.error('Please Select School Year.'); return; }
         else if (!semisterId) { toast.error('Please Select Semester.'); return; }

         else if (selectedConfirmation.length === 0){
            toast.error('Please select stipend type.'); return;
         }

        else if (!employeeId) { toast.error('Please Enter Employee Id.'); return; }
        
        // else if (!selectedConfirmation) { toast.error('Please Select Stipend type.'); return; }

        
        
        if (!assignmentArray[0].name) {
            toast.error('Please Enter Assignment #1 Name.'); return;
        }

        for (let i = 0; i < assignmentArray.length; i++) {
            if (!assignmentArray[i].name) { toast.error('Please Enter Assignment #' + [i + 1] + ' Name.'); return; }
            if (!assignmentArray[i].amount) { toast.error('Please Enter Assignment #' + [i + 1] + ' Amount.'); return; }
        }

         if (!selectedPrincipal) { toast.error('Please Select Principal.'); return; }
        else if (!selectedHRTechnicianId) { toast.error('Please Select HR Technician.'); return; }
        else if (!selectedExecutiveManager) { toast.error('Please Select Executive Manager.'); return; }
        else if (!formTitle) { toast.error('Please Enter Form Title.'); return; }

        /*  else if (!departmentId) { toast.error('Please Select Department Type'); return; }
         else if (!departmentPeopleCount) { toast.error('Please Enter no. of people in the Department'); return; } */

        if (isUpdate) {

            const original = await DataStore.query(StipendMaster, stipendMasterId);

            let newStatus = status;
            let rejectedBy = original.rejectedBy;

            if (btnStatus === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || btnStatus === Request_Stipend_Status.REJECT) {
                newStatus = btnStatus;
            } else {
                newStatus = status;
            }

            if (status === Request_Stipend_Status.PENDING) {
                newStatus = status;
            }

            if (original.rejectedBy === 'I') {
                rejectedBy = 'false';
                newStatus = status;
            }

            const save = await DataStore.save(
                StipendMaster.copyOf(original, (updated) => {
                    updated.employeeId = employeeId.code;
                    updated.schoolId = location.code;
                    updated.schoolYearId = schoolYearId.code;
                    updated.semisterId = semisterId.code;
                    updated.selfAssignment = 0; //selfAssign;
                    updated.departmentTypeId = '' + ' '; //departmentId.code;
                    updated.peopleCountInDepartment = ''; //departmentPeopleCount;
                    updated.statusStipend = newStatus;
                    updated.isElementaryStipend = isElementaryStipend;
                    updated.isMiddleStipend = isMiddleStipend;
                    updated.isHighStipend = isHighStipend;
                    updated.isDepartmentStipend = isDepartmentStipend;
                    updated.isHeadStipend = isHeadStipend;
                    updated.principalId = selectedPrincipal.code;
                    updated.hrTechI = selectedHRTechnicianId ? selectedHRTechnicianId : '';
                    updated.executiveManagerId = selectedExecutiveManager ? selectedExecutiveManager.code : '';
                    updated.title = formTitle;
                    updated.rejectedBy = rejectedBy;
                    updated.updatedBy = loggedUserId;

                })
            ).then(async (response) => {
                await DataStore.delete(StipendAssignments, (c) => c.stipendMasterId.eq(response.id)).then(async () => {
                    assignmentArray.map(async (item) => {
                        if (item.name) {
                            await DataStore.save(
                                new StipendAssignments({
                                    "stipendMasterId": response.id,
                                    "name": item.name,
                                    "amount": item.amount,
                                    "isSplit": item.isSplit,
                                    "splitText": item.splitText,
                                    "isDeptChair": item.isDeptChair,
                                    "noOfEmployee": item.noOfEmployee,
                                    "isExtraCurricular": item.isExtraCurricular
                                })
                            )
                        }
                    })
                });

                if (status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE) {

                    let employee = await DataStore.query(Employee, employeeId.code);

                    // if (originalNew[0].status !== Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {

                    if ((employeeId.code !== previousEmployee) && employeeId.code !== '' && previousEmployee !== '') {

                        const employeeData = await DataStore.query(Employee, previousEmployee);

                        const originalNew = await DataStore.query(StipendTransactionCycle, (c) => c.and(c => [
                            c.report_Id.eq(stipendMasterId),
                            c.from_Employee_Id.eq(loggedUserId),
                            c.to_Employee_Id.eq(employeeData.user_Id),
                            c.status.eq(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE)
                        ]));

                        if (originalNew.length > 0) {
                            await DataStore.delete(StipendTransactionCycle, (c) => c.id.eq(originalNew[0].id));
                        }
                    }

                    const original = await DataStore.query(StipendTransactionCycle, (c) => c.and(c => [
                        c.report_Id.eq(response.id),
                        c.from_Employee_Id.eq(loggedUserId),
                        c.to_Employee_Id.eq(employee.user_Id),
                        c.isApproved.eq(false),
                        c.status.eq(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE)
                    ]));

                    if (original.length === 0 || response.rejectedBy === 'I') {
                        //After subitted form sending email and insert entry into transaction table
                        if (approverEdit === false) {
                            let stipendDetails = await DataStore.save(
                                new StipendTransactionCycle({
                                    report_Id: response.id,
                                    from_Employee_Id: loggedUserId,
                                    to_Employee_Id: employee.user_Id,
                                    status: Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE,
                                    isApproved: false,
                                    remark: "",
                                    submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                })
                            );

                            await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_APPROVAL_EMPLOYEE', response.id, "STIPENDS_FORM", employee.user_Id, loggedUserId);
                        }
                    }

                    // }
                    setEmployeeId([])
                    setEmployeeCodeOnly([])
                    setLocation('')
                    setSchoolYearId('')
                    setFormTitle('')
                    setSelectedConfirmation([])
                    setSemisterId('')
                    setPreviousEmployee('')
                    setShowNextPopUp(false);
                    setEmail('')

                }

            })
            // || previewSubmit === true
            if (status === Request_Stipend_Status.PENDING) {
                toast.success("Successfully Saved.");
            }

            if (status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE) {
                setStipendMasterData([])
                setShowPreviewPopUp(false);
                setShowNextPopUp(false)
                BindList();
                toast.success("Successfully Submitted.");
            }
            if (status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {
                setStipendMasterData([])
                setShowPreviewPopUp(false);
                setShowNextPopUp(false)
                BindList();
                toast.success("Successfully Submitted.");
            }
        } else {
            try {
                await DataStore.save(
                    new StipendMaster({
                        "employeeId": employeeId.code,
                        "schoolId": location.code,
                        "schoolYearId": schoolYearId.code,
                        "semisterId": semisterId.code,
                        "selfAssignment": 0, //selfAssign,
                        "departmentTypeId": '', //departmentId.code,
                        "peopleCountInDepartment": '', //departmentPeopleCount,
                        "statusStipend": status,
                        "title": formTitle,
                        "isElementaryStipend": isElementaryStipend,
                        "isMiddleStipend": isMiddleStipend,
                        "isHighStipend": isHighStipend,
                        "isDepartmentStipend": isDepartmentStipend,
                        "isHeadStipend": isHeadStipend,
                        "principalId": selectedPrincipal.code,
                        "hrTechI": selectedHRTechnicianId,
                        "executiveManagerId": selectedExecutiveManager.code,
                        "createdBy": loggedUserId,
                        "rejectedBy": 'false'
                    })
                ).then(async (response) => {
                    assignmentArray.map(async (item, index) => {
                        if (item.name) {
                            await DataStore.save(
                                new StipendAssignments({
                                    "stipendMasterId": response.id,
                                    "name": item.name,
                                    "amount": item.amount,
                                    "isSplit": item.isSplit,
                                    "splitText": item.splitText,
                                    "isDeptChair": item.isDeptChair,
                                    "noOfEmployee": item.noOfEmployee,
                                    "isExtraCurricular": item.isExtraCurricular
                                })
                            )
                        }
                    })

                    let employee = await DataStore.query(Employee, employeeId.code);

                    if (status === Request_Stipend_Status.PENDING) {
                        /*  const original = await DataStore.query(StipendTransactionCycle, (c) => c.and(c => [
                             c.report_Id.eq(response.id),
                             c.from_Employee_Id.eq(loggedUserId),
                             c.to_Employee_Id.eq(employee.user_Id),
                             c.status.eq(Request_Stipend_Status.PENDING)
                         ]));
 
                         if (original.length === 0) {
                             //After subitted form sending email and insert entry into transaction table
                             if (approverEdit === false) {
                                 let stipendDetails = await DataStore.save(
                                     new StipendTransactionCycle({
                                         report_Id: response.id,
                                         from_Employee_Id: loggedUserId,
                                         to_Employee_Id: employee.user_Id,
                                         status: Request_Stipend_Status.PENDING,
                                         isApproved: false,
                                         remark: "",
                                         submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                     })
                                 );
                             }
                         } */

                        toast.success("Successfully Saved.");
                    }

                    if (status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE) {

                        const original = await DataStore.query(StipendTransactionCycle, (c) => c.and(c => [
                            c.report_Id.eq(response.id),
                            c.from_Employee_Id.eq(loggedUserId),
                            c.to_Employee_Id.eq(employee.user_Id),
                            c.status.eq(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE)
                        ]));

                        if (original.length === 0) {
                            //After subitted form sending email and insert entry into transaction table
                            if (approverEdit === false) {
                                let stipendDetails = await DataStore.save(
                                    new StipendTransactionCycle({
                                        report_Id: response.id,
                                        from_Employee_Id: loggedUserId,
                                        to_Employee_Id: employee.user_Id,
                                        status: Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE,
                                        isApproved: false,
                                        remark: "",
                                        submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                    })
                                );

                                await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_APPROVAL_EMPLOYEE', response.id, "STIPENDS_FORM", employee.user_Id, loggedUserId);
                            }
                        }
                        // }
                        setEmployeeId([])
                        setEmployeeCodeOnly([])
                        setLocation('')
                        setSchoolYearId('')
                        setFormTitle('')
                        setSelectedConfirmation([])
                        setSemisterId('')
                        setPreviousEmployee('')
                        setShowNextPopUp(false);
                        // setEmail('')
                        setStipendMasterData([])
                        setShowPreviewPopUp(false);
                        setShowNextPopUp(false)
                        BindList();
                        toast.success("Successfully Submitted.");
                    }
                    setStipendMasterId(response.id)
                    setIsUpdate(true)
                })
            }
            catch (e) {
            }


        }
        setBtnDisabled(false);
        setSelectedSchool(null);
        setSchoolYearId(null);
        setSemisterId(null);
        setSelectedConfirmation([]);
        setEmployeId(null);
        setAssignmentArray([{
            "name": "", "amount": "", "isSplit": false, "splitText": "", "isDeptChair": false, "noOfEmployee": "", "isExtraCurricular": false
        }]);
        setSelectedPrincipal(null)
        setSelectedHRTechnicianId(null)
        setSelectedExecutiveManager(null);
        setEmployeeId([])
        setEmployeeCodeOnly("")

        toast.success('Stipend created successfully...')
    }

    // AWS.config.update({
    //     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    //     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    //     region: process.env.REACT_APP_AWS_Region,
    // });

    const initiateReportAction = (row) => {
        return (
            <div className="flex justify-center w-full gap-2">
                {
                    row.statusStipend === Request_Stipend_Status.PENDING || (row.rejectedBy === 'I') || row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE ?
                        <Link href='#' className="py-2 px-2.5"
                            onClick={() => {
                                setIsUpdate(true);
                                onClickEditPopUp(row.id);
                            }}><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link>
                        :
                        row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL || row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN || row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT || row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN || row.statusStipend === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL || row.statusStipend === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN || row.statusStipend === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN || (row.rejectedBy === 'EM' || row.rejectedBy === 'H' || row.rejectedBy === 'E') ?
                            <Link href='' className="py-2 px-2.5" onClick={() => {
                                onClickInitiateRequestedReportViewPopup(row, 'right')
                            }}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
                            null
                }
            </div >
        );
    };

    const CounterAction = (row, index) => {
        return (
            (index.rowIndex) + 1
        );
    };

    //action layout code start
    const initiateApproverReportAction = (row) => {
        return (
            <div className="flex justify-center w-full gap-2" >

                {
                    //|| (row.isApproved && row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT)
                    row.isApproved || (row.statusCycle === Request_Stipend_Status.REJECT && (row.rejectedBy === 'I' || row.rejectedBy === 'H' || row.rejectedBy === 'false'))
                        || row.status === Request_Stipend_Status.ACKNOWLEDGMENT_HR_TECHNICIAN
                        || row.status === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN
                        || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN
                        || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN
                        || (row.status === Request_Stipend_Status.REJECT && row.statusCycle === Request_Stipend_Status.REJECT)
                        ?
                        <Link href='#' className="py-2 px-2.5"
                            onClick={() => {
                                onClickRequestedReportViewPopup(row, 'right');
                            }}

                        ><i className="gusd-eye text-[18px] text-[#667085] font-meduim"></i></Link> :
                        (row.status === Request_Stipend_Status.REJECT && (row.rejectedBy === 'E' || row.rejectedBy === 'EM'))
                            || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL
                            || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL
                            || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT
                            // || row.statusCycle === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT 
                            || row.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE ? <Link href='#' className="py-2 px-2.5" onClick={() => {
                                setVisibleApprovalRequestedReportEdit(true);
                                onClickApproverEditPopUp(row.id);
                            }}><i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i></Link> : null
                }
            </div>
        );
    };

    const approvalStatusBody = (product) => {
        return <Tag value={product.status} severity={approveStatusOptions(product)}></Tag>;
    };

    const approveStatusOptions = (product) => {
        console.log("datastatus", product)
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

    //approve report function
    const approveSelectedReport = async (reportId, status) => {
        //For PRINCIPAL there is 2times approval and one more is Executive  management
        /* =============================================== */
        //1.PENDING_FOR_APPROVAL_PRINCIPAL
        //2.PENDING_FOR_APPROVAL_FINAL_APPROVAL
        //3.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT
        /* =============================================== */


        //get reporting manager from stipend table
        if (status === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL) {

            try {

                const transactionCycleResponse = await DataStore.query(StipendTransactionCycle, reportId)

                const stipendMasterReport = await DataStore.query(StipendMaster, transactionCycleResponse.report_Id);

                if (!addSignature) {
                    toast.error('Please add the signature.'); return;
                }
                setApproveBtnDisabled(true);

                //PENDING_FOR_APPROVAL_EMPLOYEE
                if (transactionCycleResponse.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE) {
                    const original = await DataStore.query(StipendTransactionCycle, transactionCycleResponse.id);

                    if (original) {

                        await DataStore.save(
                            StipendTransactionCycle.copyOf(original, (updated) => {
                                updated.isApproved = true;
                                updated.ccEmail = email;
                                updated.signature_File_Path = signaturePath;
                                // updated.status = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN;
                                updated.submittedDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                            })
                        ).then(async (response) => {

                            //after we add another row for save report id for reporting managers approver
                            const addNewRowForRMReasponse = await DataStore.save(
                                new StipendTransactionCycle({
                                    report_Id: stipendMasterReport.id,
                                    from_Employee_Id: loggedUserId,
                                    to_Employee_Id: stipendMasterReport.principalId,
                                    status: Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL,
                                    isApproved: false,
                                    remark: "",
                                    submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                })
                            );
                            await DataStore.save(
                                StipendMaster.copyOf(stipendMasterReport, (updated) => {
                                    updated.statusStipend = Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL;
                                    updated.rejectedBy = 'false';
                                    updated.date = moment().format("YYYY-MM-DD");
                                })
                            )
                            await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_APPROVAL_PRINCIPAL', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.principalId, loggedUserId);

                            await handleNotificationsOnStatusChangeforStipendForm('APPROVEDBY', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.createdBy, loggedUserId);
                        })
                    }

                }
                //1.PENDING_FOR_APPROVAL_PRINCIPAL
                else if (transactionCycleResponse.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL) {

                    const original = await DataStore.query(StipendTransactionCycle, transactionCycleResponse.id);

                    await DataStore.save(
                        StipendTransactionCycle.copyOf(original, (updated) => {
                            updated.isApproved = true;
                            updated.signature_File_Path = signaturePath;
                            // updated.ccEmail = email;
                            // updated.status = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN;
                            updated.submittedDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                        })
                    ).then(async (response) => {

                        //after we add another row for save report id for reporting managers approver
                        const addNewRowForRMReasponse = await DataStore.save(
                            new StipendTransactionCycle({
                                report_Id: stipendMasterReport.id,
                                from_Employee_Id: loggedUserId,
                                to_Employee_Id: stipendMasterReport.hrTechI,
                                status: Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN,
                                isApproved: false,
                                remark: "",
                                submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            })
                        );
                        await DataStore.save(
                            StipendMaster.copyOf(stipendMasterReport, (updated) => {
                                updated.statusStipend = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN;
                                updated.rejectedBy = 'false';
                                updated.date = moment().format("YYYY-MM-DD");
                            })
                        )
                        await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_APPROVAL_HR_TECHNICIAN', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.hrTechI, loggedUserId);

                        await handleNotificationsOnStatusChangeforStipendForm('APPROVEDBY', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.createdBy, loggedUserId);

                    })
                }
                //2.PENDING_FOR_APPROVAL_FINAL_APPROVAL
                else if (transactionCycleResponse.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL) {
                    const original = await DataStore.query(StipendTransactionCycle, transactionCycleResponse.id);
                    const stipendMasterReport = await DataStore.query(StipendMaster, transactionCycleResponse.report_Id);

                    await DataStore.save(
                        StipendTransactionCycle.copyOf(original, (updated) => {
                            updated.isApproved = true;
                            updated.signature_File_Path = signaturePath;
                            // updated.ccEmail = email;
                            // updated.status = Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN;
                            updated.submittedDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                        })
                    ).then(async (response) => {
                        //after we add another row for save report id for reporting managers approver
                        const addNewRowForRMReasponse = await DataStore.save(
                            new StipendTransactionCycle({
                                report_Id: stipendMasterReport.id,
                                from_Employee_Id: loggedUserId,
                                to_Employee_Id: stipendMasterReport.hrTechI,
                                status: Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN,
                                isApproved: false,
                                remark: "",
                                submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            })
                        );

                        await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.hrTechI, loggedUserId);

                        await handleNotificationsOnStatusChangeforStipendForm('APPROVEDBY', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.createdBy, loggedUserId);

                        await DataStore.save(
                            StipendMaster.copyOf(stipendMasterReport, (updated) => {
                                updated.statusStipend = Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN;
                                updated.rejectedBy = 'false';
                                updated.date = moment().format("YYYY-MM-DD");
                            })
                        )

                    })

                }
                //2.PENDING_FOR_APPROVAL_FINAL_APPROVAL
                else if (transactionCycleResponse.status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {

                    const original = await DataStore.query(StipendTransactionCycle, transactionCycleResponse.id);
                    const stipendMasterReport = await DataStore.query(StipendMaster, transactionCycleResponse.report_Id);

                    await DataStore.save(
                        StipendTransactionCycle.copyOf(original, (updated) => {
                            updated.isApproved = true;
                            updated.ccEmail = email;
                            updated.signature_File_Path = signaturePath;
                            // updated.status = Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN;
                            updated.submittedDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                        })
                    ).then(async (response) => {

                        //after we add another row for save report id for reporting managers approver
                        const addNewRowForRMReasponse = await DataStore.save(
                            new StipendTransactionCycle({
                                report_Id: stipendMasterReport.id,
                                from_Employee_Id: loggedUserId,
                                to_Employee_Id: stipendMasterReport.hrTechI,
                                status: Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN,
                                isApproved: false,
                                remark: "",
                                submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            })
                        );

                        const cognito = new AWS.CognitoIdentityServiceProvider();
                        let createdByData = [];

                        try {
                            createdByData = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: stipendMasterReport.createdBy }).promise();
                        } catch (e) {
                        }
                        let initiatorEmail = await GetValueFromArray(createdByData.UserAttributes, "email")

                        const emails = [initiatorEmail, email];

                        await handleNotificationsOnStatusChangeforStipendForm('PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.hrTechI, loggedUserId, emails);

                        await handleNotificationsOnStatusChangeforStipendForm('APPROVEDBY', stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.createdBy, loggedUserId);

                        await DataStore.save(
                            StipendMaster.copyOf(stipendMasterReport, (updated) => {
                                updated.statusStipend = Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN;
                                updated.rejectedBy = 'false';
                                updated.date = moment().format("YYYY-MM-DD");
                            })
                        )

                    })
                }
                toast.success('Approved.');
                setStipendApproveReportListInitiator([]);
                BindList();

            }
            catch (err) {
            }

        }
        else if (status === Request_Stipend_Status.REJECT) {
            try {
                setApproveBtnDisabled(false);
                const original = await DataStore.query(StipendTransactionCycle, reportId);

                const latestStipendTransactionCycle = await DataStore.query(StipendTransactionCycle, c =>
                    c.report_Id.eq(original.report_Id), { sort: s => s.createdAt(SortDirection.DESCENDING) }
                );

                let toEmployeeStatus = '';
                let masterStatus = '';

                //Initiator- I , Employee-E, Principal-P,  Executive Management- EM, HR-H

                if (fallBackApproverLevel === 'I') {
                    toEmployeeStatus = Request_Stipend_Status.PENDING;
                    masterStatus = Request_Stipend_Status.REJECT;
                }
                if (fallBackApproverLevel === 'E') {
                    toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE;
                }
                else if (fallBackApproverLevel === 'P') {

                    if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL;
                    } else {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_PRINCIPAL;
                    }

                } else if (fallBackApproverLevel === 'EM') {
                    toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT;
                } else if (fallBackApproverLevel === 'H') {

                    if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN
                    } else if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN
                    } else if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN
                    }
                    else if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN
                    }
                    else if (latestStipendTransactionCycle[0].status === Request_Stipend_Status.PENDING_FOR_APPROVAL_FINAL_APPROVAL) {
                        toEmployeeStatus = Request_Stipend_Status.PENDING_FOR_APPROVAL_HR_TECHNICIAN
                    }
                }

                await DataStore.save(
                    StipendTransactionCycle.copyOf(original, (updated) => {
                        updated.status = Request_Stipend_Status.REJECT;
                        updated.remark = rejectMsgValue;
                        updated.rejectedBy = loggedUserId;
                        updated.submittedDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                    })
                ).then(async (response) => {
                    const stipendMasterReport = await DataStore.query(StipendMaster, original.report_Id);
                    await DataStore.save(
                        StipendMaster.copyOf(stipendMasterReport, (updated) => {
                            updated.statusStipend = Request_Stipend_Status.REJECT;
                            updated.remark = rejectMsgValue;
                            updated.rejectedBy = fallBackApproverLevel;
                            updated.date = moment().format("YYYY-MM-DD");
                        })
                    )

                    let reject = 'false';
                    if (fallBackApproverLevel === 'EM') {
                        reject = 'true'
                    }
                    //after we add another row for save report id for reporting managers approver

                    if (fallBackApproverLevel === 'H' || fallBackApproverLevel === 'EM' || fallBackApproverLevel === 'I') {
                        const addNewRowForRMReasponse = await DataStore.save(
                            new StipendTransactionCycle({
                                report_Id: stipendMasterReport.id,
                                from_Employee_Id: loggedUserId,
                                to_Employee_Id: fallBackApproverId,
                                status: toEmployeeStatus,
                                isApproved: false,
                                remark: rejectMsgValue,
                                rejectedBy: reject,
                                submittedDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            })
                        );
                    }

                    const cognito = new AWS.CognitoIdentityServiceProvider();
                    let createdByData = [];

                    try {
                        createdByData = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: stipendMasterReport.createdBy }).promise();
                    } catch (e) {
                    }
                    let initiatorEmail = await GetValueFromArray(createdByData.UserAttributes, "email")

                    const emails = [initiatorEmail];

                    //For initiator
                    await handleNotificationsOnStatusChangeforStipendForm(Request_Stipend_Status.REJECT, stipendMasterReport.id, "STIPENDS_FORM", stipendMasterReport.createdBy, loggedUserId, emails, rejectMsgValue);

                    //For selected approver - give whitelabel
                    if (fallBackApproverLevel !== 'I') {
                        await handleNotificationsOnStatusChangeforStipendForm(Request_Stipend_Status.REJECT, stipendMasterReport.id, "STIPENDS_FORM", fallBackApproverId, loggedUserId, emails, rejectMsgValue);
                    }

                    setRejectValueMsg("");
                    setStipendApproveReportListInitiator([]);
                    BindList();
                })
            }
            catch (err) {

            }
        }


        setApproveBtnDisabled(false);
    }

    //* onclick view popup -Initiate
    const onClickInitiateRequestedReportViewPopup = async (requestData, position) => {
        try {
            // requestData.id is the report id
            getStipendFormDetails(requestData.id)
            getApprovalData(requestData.id)

        } catch (err) {
        }
        //---------------
        setPosition(position);
        setVisibleRequestedReportView(true);

    }

    //* onclick view popup - Approver
    const onClickRequestedReportViewPopup = async (requestData, position) => {
        try {

            const particularReportTransactionCycleResponse = await DataStore.query(StipendTransactionCycle, requestData.id);

            getStipendFormDetails(particularReportTransactionCycleResponse.report_Id);
            getApprovalData(particularReportTransactionCycleResponse.report_Id);

        } catch (err) {
        }

        //---------------
        setPosition(position);
        setVisibleRequestedReportView(true);

    }

    const getApprovalData = async (reportId, requestId) => {
        setApprovalFinalData([]);
        const particularReportTransactionCycleResponseLatest = await DataStore.query(StipendTransactionCycle, c =>
            c.report_Id.eq(reportId), { sort: s => s.createdAt(SortDirection.ASCENDING) }
        );

        const stipendMasterData = await DataStore.query(StipendMaster, reportId);


        let approvalFinalData = [];
        let formHistoryFinalData = [];
        let fullName;
        let userCodeEmp = '';

        const cognito = new AWS.CognitoIdentityServiceProvider();
        //fetch user data
        var newRes = []
        let userRole = '', userName = '', userEmail = '', userCode = '', sub;
        users.forEach((user, i) => {

            userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
            sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
            userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
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
        let adminUsers;
        // if (particularReportTransactionCycleResponseLatest[0].to_Employee_Id) {
        //     try {
        //         adminUsers = await cognito.adminGetUser({
        //             UserPoolId: awsmobile.aws_user_pools_id,
        //             Username: particularReportTransactionCycleResponseLatest[0].to_Employee_Id,
        //         }).promise();
        //     } catch (e) {
        //     }
        // }

        if (adminUsers) {
            let userFirstName = await GetValueFromArray(adminUsers.UserAttributes, "custom:firstName")
            let userLastName = await GetValueFromArray(adminUsers.UserAttributes, "custom:lastName")
            userCodeEmp = await GetValueFromArray(adminUsers.UserAttributes, "custom:userCode")
            fullName = userFirstName + " " + userLastName;
        }


        if (particularReportTransactionCycleResponseLatest) {
            //get name of user from 'to_Employee_Id'
            for (let i = 0; i < particularReportTransactionCycleResponseLatest.length; i++) {
                let empName = '', empCode = '';
                // if (particularReportTransactionCycleResponseLatest[i].status !== 'Pending.- (step 1)') {
                for (let j = 0; j < newRes.length; j++) {
                    let currentItem = newRes[j];
                    if (currentItem.userId == particularReportTransactionCycleResponseLatest[i].to_Employee_Id) {
                        empName = currentItem.name;
                        empCode = currentItem.usercode;
                        break;
                    }
                }

                let adminUsers;
                if (particularReportTransactionCycleResponseLatest[i].to_Employee_Id) {
                    try {
                        adminUsers = await cognito.adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: particularReportTransactionCycleResponseLatest[i].to_Employee_Id,
                        }).promise();
                    } catch (e) {
                    }
                }


                let userFirstName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:firstName") : ''
                let userLastName = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:lastName") : ''
                let userCodeEmp = adminUsers ? await GetValueFromArray(adminUsers.UserAttributes, "custom:userCode") : ''
                let fullName = userFirstName + " " + userLastName

                let dateTime = particularReportTransactionCycleResponseLatest[i].status === "Completed-(step 9)" ||
                    particularReportTransactionCycleResponseLatest[i].isApproved ||
                    particularReportTransactionCycleResponseLatest[i].status === "Rejected" ?
                    (particularReportTransactionCycleResponseLatest[i].submittedDate ?
                        handleDateSelect(particularReportTransactionCycleResponseLatest[i].submittedDate)
                        : moment(currentDateTime).toISOString()) : null;


                let empTitle = '';

                if (stipendMasterData.employeeId === particularReportTransactionCycleResponseLatest[i].to_Employee_Id &&
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Approval Employee- (step 2)' ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Rejected'
                ) {
                    empTitle = 'Employee';
                }
                else if (stipendMasterData.principalId === particularReportTransactionCycleResponseLatest[i].to_Employee_Id &&
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Prior Approval Principal- (step 3)' ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Final Approval Principal- (step 7)' ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Rejected') {
                    empTitle = 'Principal';
                }
                else if (stipendMasterData.hrTechI === particularReportTransactionCycleResponseLatest[i].to_Employee_Id &&
                    particularReportTransactionCycleResponseLatest[i].status === "Pending for Completion HR Technician- (step 8)" ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Assignment Completion HR Technician- (step 6)' ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Prior Approval HR technician- (step 4)' ||
                    particularReportTransactionCycleResponseLatest[i].status === "Completed-(step 9)" ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Rejected') {
                    empTitle = 'HR technician';
                }
                else if (stipendMasterData.executiveManagerId === particularReportTransactionCycleResponseLatest[i].to_Employee_Id &&
                    particularReportTransactionCycleResponseLatest[i].status === 'Pending for Approval Excecutive Management- (step 5)' ||
                    particularReportTransactionCycleResponseLatest[i].status === 'Rejected') {
                    empTitle = 'Excecutive Management';
                }
                else if (particularReportTransactionCycleResponseLatest[i].status === 'Pending.- (step 1)') {
                    empTitle = 'Initiator'
                }
                else {
                    empTitle = 'Employee';
                }


                let obj = {
                    empName: fullName,
                    empTitle: empTitle,
                    empCode: userCodeEmp,
                    status: particularReportTransactionCycleResponseLatest[i].isApproved ? "Approved" : particularReportTransactionCycleResponseLatest[i].status,
                    approvedDate: dateTime
                }

                if (i == 0) {
                    let initiatorUsers;

                    try {
                        //get initiator's data using its id
                        initiatorUsers = await cognito.adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: particularReportTransactionCycleResponseLatest[i].from_Employee_Id,
                        }).promise();
                    } catch (e) {
                    }


                    let userFirstName1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:firstName") : ''
                    let userLastName1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:lastName") : ''
                    let userCodeEmp1 = adminUsers ? await GetValueFromArray(initiatorUsers.UserAttributes, "custom:userCode") : ''
                    let initiatorFullName = userFirstName1 + " " + userLastName1;

                    let obj = {
                        empName: initiatorFullName,
                        empTitle: 'Initiator',
                        empCode: userCodeEmp1,
                        status: 'Submitted',
                        approvedDate: (particularReportTransactionCycleResponseLatest[i].submittedDate) ? handleDateSelect(particularReportTransactionCycleResponseLatest[i].submittedDate) : handleDateSelect(currentDateTime)

                    }
                    setSubmittedBy(obj);
                    approvalFinalData.push(obj);
                    // approvalFinalData.unshift(obj);
                }

                //form history remark 
                if (particularReportTransactionCycleResponseLatest[i].status === Request_Stipend_Status.REJECT) {

                    let obj = {
                        empName: fullName, //empName,
                        empTitle: empTitle,
                        remarkType: Request_Stipend_Status.REJECT,
                        empRemark: particularReportTransactionCycleResponseLatest[i].remark,
                        status: particularReportTransactionCycleResponseLatest[i].status,
                        approvedDate: dateTime
                    };

                    formHistoryFinalData.push(obj);
                }

                approvalFinalData.push(obj);
                setApprovalFinalData(approvalFinalData)
                // }
                //---End Approval Status-------
            }
        }
    }

    const [filters, setFilters] = useState({
        semesterTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        school: { value: null, matchMode: FilterMatchMode.CONTAINS },
        schoolYear: { value: null, matchMode: FilterMatchMode.CONTAINS },
        statusStipend: { value: null, matchMode: FilterMatchMode.CONTAINS },
        remark: { value: null, matchMode: FilterMatchMode.CONTAINS },
        semister: { value: null, matchMode: FilterMatchMode.EQUALS },
        submittedOn: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Year: { value: null, matchMode: FilterMatchMode.CONTAINS },
        employee: { value: null, matchMode: FilterMatchMode.CONTAINS },

    });

    const [filterRequestedReports, setilterRequestedReports] = useState({
        semesterTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        school: { value: null, matchMode: FilterMatchMode.CONTAINS },
        schoolYear: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.CONTAINS },
        semister: { value: null, matchMode: FilterMatchMode.EQUALS },
        remark: { value: null, matchMode: FilterMatchMode.CONTAINS },
        submittedOn: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Year: { value: null, matchMode: FilterMatchMode.CONTAINS },
        employee: { value: null, matchMode: FilterMatchMode.CONTAINS },

    });


    //Get Weekly Absence Report-Classified List
    //const //BindList = async () => {
    //     var schoolList = await DataStore.query(Schools);
    //     setSchoolList(schoolList);

    //     var schoolYears = await DataStore.query(YearMaster, Predicates.ALL);
    //     var schoolYearArray = []; schoolYearArray = ConvertResponseForSelect(schoolYears); setSchoolYearArray(schoolYearArray); setNewSchoolList(schoolYearArray)

    //     var semisters = await DataStore.query(SemisterMaster, Predicates.ALL, {
    //         sort: s => s.name(SortDirection.ASCENDING)
    //     });
    //     var semisterArray = []; semisterArray = ConvertResponseForSelect(semisters); setSemisterArray(semisterArray);

    //     var departments = await DataStore.query(DepartmentTypeMaster, Predicates.ALL);
    //     var departmentArray = []; departmentArray = ConvertResponseForSelect(departments); setDepartmentArray(departmentArray);

    //     var schoolListResponse = await DataStore.query(Schools, Predicates.ALL, {
    //         sort: s => s.name(SortDirection.ASCENDING)
    //     });
    //     var schoolArray = []; schoolArray = ConvertResponseForSelect(schoolListResponse); setLocationList(schoolArray); setNewSchoolList(schoolArray)

    //     //*load Stipend Request 
    //     loadStipendRequest();
    //     loadStipendApprovalRequest();
    // }

    //initiate new report
    const initiateNewReport = async () => {
        //fetch employee table data
        setConfirmVisible2(false);
        SetBasicInfoPopUp(true);
        SetPreviewAndEdit(false);
        setIsUpdate(false);
        setShowNextPopUp(true);
        setBtnDisabled(false);

        try {

            setHRManager();
            setStipendMasterId('');
            setBtnStatus('')
            setApproverEdit(false);
            // setSelectedHRTechnician('')
            setSelectedPrincipal('')
            setApprovalFinalData([])
            setSelectedExecutiveManager('')
            setFormTitle('')
            setEmployeeId([])
            setEmployeeCodeOnly([])
            setLocation('')
            setSchoolYearId('')
            setSemisterId('')
            // setEmail('')
            setDepartmentId('')
            setDepartmentPeopleCount('')
            setAssignmentArray([{
                "name": "", "amount": "", "isSplit": false, "splitText": "", "isDeptChair": false, "noOfEmployee": "", "isExtraCurricular": false
            }]);
            setSelectedConfirmation([])
            // setShowNextPopUp(true);

        } catch (error) {
        }
    }


    //*loadAbsenceReport
    const loadStipendApprovalRequest = async () => {
        const stipendMasterRequestResponse = await DataStore.query(StipendMaster, Predicates.ALL, {
            sort: s => s.createdAt(SortDirection.DESCENDING)
        }
        );

        let finalArray = [];
        for (let i = 0; i < stipendMasterRequestResponse.length; i++) {

            const substituteCertificateRequestTransactionCycleResponse = await DataStore.query(StipendTransactionCycle, (c) => c.and(c => [
                c.report_Id.eq(stipendMasterRequestResponse[i].id),
                c.to_Employee_Id.eq(loggedUserId),
                c.status.ne(Request_Stipend_Status.PENDING)
            ]), { sort: s => s.submittedDate(SortDirection.DESCENDING) }
            );

            let semisterName = '';

            if (stipendMasterRequestResponse[i].semisterId) {
                const semister = await DataStore.query(SemisterMaster, stipendMasterRequestResponse[i].semisterId);
                semisterName = semister ? semister.name : '';
            }

            const sortedRecords = substituteCertificateRequestTransactionCycleResponse.sort((a, b) => new Date(b.date) - new Date(a.date));
            try {
                if (sortedRecords.length > 0) {
                    // for (let k = 0; k < sortedRecords.length; k++) {

                    let statusTable = stipendMasterRequestResponse[i].statusStipend === "" ? "-" : stipendMasterRequestResponse[i].statusStipend;

                    if (stipendMasterRequestResponse[i].statusStipend === Request_Stipend_Status.REJECT) {
                        statusTable = Request_Stipend_Status.REJECT
                    }

                    /* if (sortedRecords[0].status === Request_Stipend_Status.REJECT) {
                        statusTable = sortedRecords[0].status;
                    } */

                    let employeeDetails = await DataStore.query(Employee, stipendMasterRequestResponse[i].employeeId);
                    let schoolDetails = await DataStore.query(Schools, stipendMasterRequestResponse[i].schoolId);
                    let semisterDetails = await DataStore.query(SemisterMaster, stipendMasterRequestResponse[i].semisterId);
                    let schoolYearDetails = await DataStore.query(YearMaster, stipendMasterRequestResponse[i].schoolYearId);

                    let assignments = await DataStore.query(StipendAssignments, (c) => c.stipendMasterId.eq(stipendMasterRequestResponse[i].id));

                    var myArray = [];
                    var assignmentArr = '';

                    let stipendType = '';
                    if (stipendMasterRequestResponse[i].isMiddleStipend === true) {
                        stipendType = 'Middle School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
                    } else if (stipendMasterRequestResponse[i].isElementaryStipend === true) {
                        stipendType = 'Elementary Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
                    } else if (stipendMasterRequestResponse[i].isHighStipend === true) {
                        stipendType = 'High School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
                    } else if (stipendMasterRequestResponse[i].isDepartmentStipend === true) {
                        stipendType = 'Department Chair Stipend(01.0-00000.0-11303-10000-1170-0005616)(01.0-65000.0-57606-11100-1170-0000600-SPED)';
                    } else if (stipendMasterRequestResponse[i].isHeadStipend === true) {
                        stipendType = 'Head Counselor Stipend(01.0-00000.0-00000-31101-1272-0004682)';
                    }


                    if (assignments.length > 0) {
                        for (let k = 0; k < assignments.length; k++) {
                            myArray.push({ 'Assignment Name': assignments[k].name, "Amount": assignments[k].amount })
                        }
                    }

                    let data = {
                        "id": sortedRecords[0].id,
                        "stipendType": stipendType,
                        "employee": employeeDetails ? employeeDetails.employee_name : '',
                        "employeeCode": employeeDetails ? employeeDetails.employee_code : '',
                        "schoolYear": schoolYearDetails ? schoolYearDetails.name : '',
                        "school": schoolDetails ? schoolDetails.name : '',
                        "semister": semisterDetails ? semisterDetails.name : '',
                        "principalId": stipendMasterRequestResponse[i].principalId ? stipendMasterRequestResponse[i].principalId : '',
                        "hrTechI": stipendMasterRequestResponse[i].hrTechI ? stipendMasterRequestResponse[i].hrTechI : '',
                        "executiveManagerId": stipendMasterRequestResponse[i].executiveManagerId ? stipendMasterRequestResponse[i].executiveManagerId : '',
                        "assignmentArray": myArray,
                        "semesterTitle": semisterName,
                        "title": stipendMasterRequestResponse[i].title ? stipendMasterRequestResponse[i].title : '-',
                        "submittedOn": sortedRecords[0].submittedDate ? moment(sortedRecords[0].submittedDate).format("MM/DD/YYYY") : moment(currentDateTime).toISOString(),
                        "createdAt": stipendMasterRequestResponse[i].createdAt ? moment(stipendMasterRequestResponse[i].createdAt).format("MM/DD/YYYY") : moment(currentDateTime).toISOString(),
                        "status": statusTable,
                        "statusCycle": sortedRecords[0].status,
                        "remark": stipendMasterRequestResponse[i].remark ? stipendMasterRequestResponse[i].remark : '-',
                        "rejectedBy": stipendMasterRequestResponse[i].rejectedBy ? stipendMasterRequestResponse[i].rejectedBy :
                            'false',
                        "rejectedByForEM": sortedRecords[0].rejectedBy ? sortedRecords[0].rejectedBy :
                            'false',
                        "isApproved": sortedRecords[0].isApproved ? sortedRecords[0].isApproved : false,
                        "CC": sortedRecords[0].ccEmail,
                        "sLNo": i + 1
                    }
                    finalArray.push(data)
                    // }

                    const sortedData = [...finalArray].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                    setStipendApproveReportListInitiator(sortedData)
                    setIsLoader(false)
                }
            }
            catch (e) {
            }
        }
    }

    const loadStipendRequest = async () => {
        var stipendMasterRequestResponse = await DataStore.query(StipendMaster, (c) => c.and(c => [
            c.createdBy.eq(loggedUserId)]), {
            sort: s => s.createdAt(SortDirection.DESCENDING)
        });

        let finalArray = [];
        for (let i = 0; i < stipendMasterRequestResponse.length; i++) {

            let employeeDetails = await DataStore.query(Employee, stipendMasterRequestResponse[i].employeeId);
            let schoolDetails = await DataStore.query(Schools, stipendMasterRequestResponse[i].schoolId);
            let semisterDetails = await DataStore.query(SemisterMaster, stipendMasterRequestResponse[i].semisterId);
            let schoolYearDetails = await DataStore.query(YearMaster, stipendMasterRequestResponse[i].schoolYearId);

            let assignments = await DataStore.query(StipendAssignments, (c) => c.stipendMasterId.eq(stipendMasterRequestResponse[i].id));

            var myArray = [];
            var assignmentArr = '';

            let stipendType = '';
            if (stipendMasterRequestResponse[i].isMiddleStipend === true) {
                stipendType = 'Middle School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
            } else if (stipendMasterRequestResponse[i].isElementaryStipend === true) {
                stipendType = 'Elementary Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
            } else if (stipendMasterRequestResponse[i].isHighStipend === true) {
                stipendType = 'High School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)';
            } else if (stipendMasterRequestResponse[i].isDepartmentStipend === true) {
                stipendType = 'Department Chair Stipend(01.0-00000.0-11303-10000-1170-0005616)(01.0-65000.0-57606-11100-1170-0000600-SPED)';
            } else if (stipendMasterRequestResponse[i].isHeadStipend === true) {
                stipendType = 'Head Counselor Stipend(01.0-00000.0-00000-31101-1272-0004682)';
            }

            if (assignments.length > 0) {
                for (let k = 0; k < assignments.length; k++) {
                    myArray.push({ 'Assignment Name': assignments[k].name, "Amount": assignments[k].amount })
                }
            }

            let data = {
                "id": stipendMasterRequestResponse[i].id,
                "srNo": i + 1,
                "assignmentArray": myArray,
                "stipendType": stipendType,
                "title": stipendMasterRequestResponse[i].title ? stipendMasterRequestResponse[i].title : '-',
                "employee": employeeDetails ? employeeDetails.employee_name : '',
                "employeeCode": employeeDetails ? employeeDetails.employee_code : '',
                "schoolYear": schoolYearDetails ? schoolYearDetails.name : '',
                "school": schoolDetails ? schoolDetails.name : '',
                "semister": semisterDetails ? semisterDetails.name : '',
                "principalId": stipendMasterRequestResponse[i].principalId ? stipendMasterRequestResponse[i].principalId : '',
                "hrTechI": stipendMasterRequestResponse[i].hrTechI ? stipendMasterRequestResponse[i].hrTechI : '',
                "executiveManagerId": stipendMasterRequestResponse[i].executiveManagerId ? stipendMasterRequestResponse[i].executiveManagerId : '',
                "submittedOn": stipendMasterRequestResponse[i].createdAt ? stipendMasterRequestResponse[i].createdAt : moment(currentDateTime).toISOString(),
                "statusStipend": stipendMasterRequestResponse[i].statusStipend ? stipendMasterRequestResponse[i].statusStipend : '',
                "createdAt": stipendMasterRequestResponse[i].createdAt === "" ? "-" : moment(stipendMasterRequestResponse[i].createdAt).format("YYYY-DD-MM"),
                "createdBy": stipendMasterRequestResponse[i].createdBy ? stipendMasterRequestResponse[i].createdBy : '',
                "remark": stipendMasterRequestResponse[i].remark ? stipendMasterRequestResponse[i].remark : '-',
                "rejectedBy": stipendMasterRequestResponse[i].rejectedBy ? stipendMasterRequestResponse[i].rejectedBy : 'false'

            }

            finalArray.push(data)
            const sortedData = [...finalArray].sort(
                (a, b) => new Date(b.submittedOn) - new Date(a.submittedOn)
            );

            setStipendMasterData(sortedData)
            setIsLoader(false)

        }

    }

    async function approversList(e) {
        try {
            var employeeResponses = await DataStore.query(Employee, Predicates.ALL, {
                sort: s => s.employee_name(SortDirection.ASCENDING)
            });


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
                    // setApproverList(employee)
                } else {
                    // setApproverList(employee)
                }


            }
        }
        catch (error) {
        }
    }

    async function userList(e) {
        try {
            var employeeResponses = await fetchPaginatedRecords(
                queries.listEmployees,
                null,
                { field: "employee_name", direction: "asc" },
                3000,
                'listEmployees'
            );
            // await DataStore.query(Employee, Predicates.ALL, {
            //     sort: s => s.employee_name(SortDirection.ASCENDING)
            // });


            if (employeeResponses !== null) {
                let employeeData = employeeResponses;

                let employee = [];
                employeeData.map((item) => {
                    let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
                    let obj = {
                        name: name,
                        code: item.id
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

    const loadUsers = () => {
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
        //          //SetUsersList(data.Users);
        //         var newRes = []
        //         let userRole = '', userName = '', userEmail = '', userCode = '', sub, firstName = '', lastName = '';
        //         (data.Users).forEach((user, i) => {
        //             userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
        //             userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
        //             sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
        //             userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
        //             userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;
        //             firstName = user.Attributes.find(attr => attr.Name === "custom:firstName")?.Value;
        //             lastName = user.Attributes.find(attr => attr.Name === "custom:lastName")?.Value;

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
        //         let usersWithoutAdminAndLoggedUser = [];
        //         const loggedUserId = reactLocalStorage.get('loggedUserId');

        //         fetchAndSetLoggedInUserData(loggedUserId).then((data) => {
        //             setLoggedInUserData(data);
        //         });

        //         newRes.map((currentItem) => {
        //             if (currentItem.role !== 'Admin'
        //                 && currentItem.userId !== loggedUserId) {
        //                 usersWithoutAdminAndLoggedUser.push(currentItem);
        //             }
        //         })

        //         //set employee list
        //         let finalEmployeeList = [{ name: "No Approval Needed", code: 'no_approval_needed' }];

        //         usersWithoutAdminAndLoggedUser.map((currentItem) => {
        //             let obj = { name: currentItem.name, code: currentItem.userId };
        //             finalEmployeeList.push(obj);
        //         })

        //         var approverArrayReject = []; approverArrayReject = ConvertResponseOfNameCodeForSelect(finalEmployeeList); setApproverListForReject(approverArrayReject);

        //         /*  setPrincipleDepartmentHeadList(finalEmployeeList);
        //          setHRList(finalEmployeeList);
        //          setExecutiveList(finalEmployeeList); */

        //     }
        // });
    }

    // const fetchAndSetLoggedInUserData = async (userId) => {
    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     var params = {
    //         UserPoolId: awsmobile.aws_user_pools_id,
    //         Limit: 1
    //     };

    //     params['Filter'] = "sub ^=\"" + userId + "\""

    //     try {
    //         const data = await cognito.listUsers(params).promise();
    //         if (data.Users.length > 0) {
    //             const user = data.Users[0];

    //             const userRoleAttribute = user.Attributes.find(attr => attr.Name === 'custom:role');
    //             const userNameAttribute = user.Attributes.find(attr => attr.Name === 'name');
    //             const sub = user.Attributes.find(attr => attr.Name === 'sub');
    //             const userEmailAttribute = user.Attributes.find(attr => attr.Name === 'email');
    //             const userCodeAttribute = user.Attributes.find(attr => attr.Name === 'custom:userCode');
    //             const signatureAttribute = user.Attributes.find(attr => attr.Name === 'custom:userSignature');

    //             let role;
    //             switch (userRoleAttribute?.Value) {
    //                 case USER_TYPES.SUPERADMIN:
    //                     role = USER_TYPES_NAMES.SA;
    //                     break;
    //                 case USER_TYPES.ADMIN:
    //                     role = USER_TYPES_NAMES.A;
    //                     break;
    //                 case USER_TYPES.APPROVER:
    //                     role = USER_TYPES_NAMES.AP;
    //                     break;
    //                 case USER_TYPES.PAYROLL:
    //                     role = USER_TYPES_NAMES.P;
    //                     break;
    //                 default:
    //                     role = USER_TYPES_NAMES.I;
    //             }

    //             return {
    //                 userId: sub?.Value,
    //                 name: userNameAttribute?.Value,
    //                 email: userEmailAttribute?.Value,
    //                 usercode: userCodeAttribute?.Value,
    //                 signature: signatureAttribute?.Value,
    //                 role: role
    //             };
    //         }
    //     } catch (error) {
    //         toast.error(error.message);
    //         return null;
    //     }
    //     return null;
    // }

    //onclick remove inquiry document
    const onClickRemoveAssignment = (index) => {
        let data = [...assignmentArray];
        if (data.length > 1) {
            data.splice(index, 1)
            setAssignmentArray(data)
        }
    }

    const onClickAddAssignment = () => {
        let data = { "name": "", "amount": "", "isSplit": false, "splitText": "", "isDeptChair": false, "noOfEmployee": "", "isExtraCurricular": false }
        let newData = [...assignmentArray, data];
        setAssignmentArray(newData)
    }


    const onChangeAssignment = (index, value, type = 'N') => {
        let data = [...assignmentArray]
        if (type === 'N') {
            data[index]["name"] = value;
        }
        else if (type === 'A') {
            const sanitizedValue = value.replace(/[^$0-9]/g, '');
            data[index]["amount"] = sanitizedValue;

        }
        else if (type === 'S') {
            if (value.checked)
                data[index]["isSplit"] = true;
            else
                data[index]["isSplit"] = false;
        }
        else if (type === 'DC') {
            if (value.checked)
                data[index]["isDeptChair"] = true;
            else
                data[index]["isDeptChair"] = false;
        }
        else if (type === 'E') {
            if (value.checked)
                data[index]["isExtraCurricular"] = true;
            else
                data[index]["isExtraCurricular"] = false;
        } else if (type === 'ST') {
            data[index]["splitText"] = value;
        } else if (type === 'DCT') {
            const sanitizedValue = value.replace(/[^0-9]/g, '');
            data[index]["noOfEmployee"] = sanitizedValue;
        }

        setAssignmentArray(data)
    }

    const footerContentForReqReject = () => (
        <div className='text-center'>

            {
                (sendMsg) ?
                    <button className='bg-[#113699] border border-[##113699] text-white px-8 py-2 rounded' onClick={() => {
                        BindList();
                        setRejectVisible(false);
                        setVisibleRequestedReportEdit(false);
                        setSendMsg(false);
                    }}>Ok</button> :
                    <>
                        <button className='bg-[#113699] border border-[##113699] text-white px-8 py-2 rounded' onClick={() => {
                            if (!fallBackApproverLevel) {
                                toast.error("Please Select An Approval Level");
                                return;
                            }
                            if (!fallBackApproverId) {
                                toast.error("Please Select An Approver");
                                return;
                            }

                            if (rejectMsgValue === "") {
                                toast.error("Please Enter the Reason For Rejection");
                                return;
                            }
                            approveSelectedReport(transactionCycleReportId, Request_Stipend_Status.REJECT);
                            // BindList();
                            setRejectVisible(false);
                            setVisibleRequestedReportEdit(false);
                            setSendMsg(false);
                        }}>Send</button>

                        <button className='bg-[#113699] border border-[##113699] text-white px-8 py-2 rounded' onClick={() => {
                            setRejectVisible(false);
                        }}>Cancel</button>
                    </>
            }

        </div>
    );

    const exportFilteredApproverDataToCSV = async (fileName) => {

        // const cognito = new AWS.CognitoIdentityServiceProvider();
        for (let i = 0; i < stipendApproveReportListInitiator.length; i++) {

            let principal;

            if (stipendApproveReportListInitiator[i].principalId) {
                try {
                    principal = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendApproveReportListInitiator[i].principalId
                        })
                        .promise();
                } catch (e) {
                }
            }
            let principalName = principal ? principal.UserAttributes.find(attr => attr.Name === "name") : "";

            let executiveManager;
            if (stipendApproveReportListInitiator[i].executiveManagerId) {
                try {
                    executiveManager = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendApproveReportListInitiator[i].executiveManagerId
                        })
                        .promise();
                } catch (e) {
                }
            }
            let executiveManagerName = executiveManager ? executiveManager.UserAttributes.find(attr => attr.Name === "name") : "";

            let hrTech;
            if (stipendApproveReportListInitiator[i].hrTechI) {
                try {
                    hrTech = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendApproveReportListInitiator[i].hrTechI
                        })
                        .promise();
                } catch (e) {
                }
            }

            let hrTechName = hrTech ? hrTech.UserAttributes.find(attr => attr.Name === "name") : "";

            stipendApproveReportListInitiator[i] = {
                ...stipendApproveReportListInitiator[i],
                principalData: principalName ? principalName.Value : '',
                executiveManager: executiveManagerName ? executiveManagerName.Value : '',
                hrTech: hrTechName ? hrTechName.Value : '',
                sLNo: i ? i : 0,
            }

        }

        const dataToExport = stipendApproveReportListInitiator.map(({ sLNo, title, stipendType, remark, employee, employeeCode, school, schoolYear, semister, principalData, executiveManager, hrTech, CC, status }) => ({
            "Sl. No": sLNo + 1, "Form Title": title, "Employee Name": employee, "Employee Id": employeeCode, "School Name": school, "School Year": schoolYear, "Semester": semister, "Stipend Type": stipendType, "Remarks": remark, "Principal ": principalData, "Executive Manager": executiveManager, "HR Technician": hrTech, "CC": CC, "Status": status,
        }));

        const csvData = convertArrayOfObjectsToCSV(dataToExport);
        downloadCSV(csvData, fileName);
    };

    const exportFilteredDataToCSV = async (fileName) => {
        // dt.current.exportCSV();
        // const cognito = new AWS.CognitoIdentityServiceProvider();
        for (let i = 0; i < stipendMasterData.length; i++) {

            let principal;

            if (stipendMasterData[i].principalId) {
                try {
                    principal = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendMasterData[i].principalId
                        })
                        .promise();
                } catch (e) {
                }
            }
            let principalName = principal ? principal.UserAttributes.find(attr => attr.Name === "name") : "";

            let executiveManager;
            if (stipendMasterData[i].executiveManagerId) {
                try {
                    executiveManager = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendMasterData[i].executiveManagerId
                        })
                        .promise();
                } catch (e) {
                }
            }
            let executiveManagerName = executiveManager ? executiveManager.UserAttributes.find(attr => attr.Name === "name") : "";

            let hrTech;
            if (stipendMasterData[i].hrTechI) {
                try {
                    hrTech = await cognito
                        .adminGetUser({
                            UserPoolId: awsmobile.aws_user_pools_id,
                            Username: stipendMasterData[i].hrTechI
                        })
                        .promise();
                } catch (e) {
                }
            }

            let hrTechName = hrTech ? hrTech.UserAttributes.find(attr => attr.Name === "name") : "";

            stipendMasterData[i] = {
                ...stipendMasterData[i],
                principalData: principalName ? principalName.Value : '',
                executiveManager: executiveManagerName ? executiveManagerName.Value : '',
                hrTech: hrTechName ? hrTechName.Value : '',
            }

        }

        //remark
        const dataToExport = stipendMasterData.map(({ srNo, title, stipendType, employee, employeeCode, school, schoolYear, semister, principalData, executiveManager, hrTech, statusStipend }) => ({
            "Sl. No": srNo, "Form Title": title, "Employee Name": employee, "Employee Id": employeeCode, "School Name": school, "School Year": schoolYear, "Semester": semister, "Stipend Type": stipendType, "Principal ": principalData, "Executive Manager": executiveManager, "HR Technician": hrTech, "Status": statusStipend,
        })); //"Remarks": remark, "assignmentArray":assignmentArray,

        const csvData = convertArrayOfObjectsToCSV(dataToExport);
        downloadCSV(csvData, fileName);
    };


    //CSV Download
    const convertArrayOfObjectsToCSV = (data) => {
        const csvRows = [];
        const headers = Object.keys(data[0]);

        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map((header) => row[header]);
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

    const handleAddSignature = async () => {
        const cognito = new AWS.CognitoIdentityServiceProvider();

        var params = {
            UserPoolId: awsmobile.aws_user_pools_id,
            Limit: 60
        };

        params['Filter'] = "sub ^=\"" + loggedUserId + "\"";
        await cognito.listUsers(params, (err, data) => {
            if (data) {
                let signature = data.Users[0].Attributes.find(attr => attr.Name === "custom:userSignature")?.Value;
                if (signature != null && signature.trim() !== '') {
                    setSignaturePath(signature);
                    loadSignatureFile(signature)
                } else {
                    setSignatureDialog(true);
                }
            }
        });
    }

    const loadSignatureFile = async (filePath) => {
        let file = null;
        await Storage.get(filePath)
            .then(result => {
                file = result;
            });

        if (file) {
            setSignatureFileAwsPath(file);
        }
    }

    useEffect(() => {
        let formTitle = '';

        if (employeeId) {
            formTitle = formTitle + (employeeId.name ? employeeId?.name : '(Employee Name)');
        }
        if (schoolYearId !== 'undefined') {
            formTitle = formTitle + '- ' + (schoolYearId ? schoolYearId?.name : '(School Year)');
        }
        if (semisterId !== 'undefined') {
            formTitle = formTitle + '- ' + (semisterId ? semisterId?.name : '(Semester)');
        }

        setFormTitle(formTitle)
    }, [schoolYearId, semisterId, employeeId]);

    useEffect(() => {
        // onLoad();
        loadUsers();
        // BindList();
        userList();
        approversList();
    }, []);

    useEffect(() => {
        loadUsers();
    }, [users]);//users

    // useEffect(() => {
        // loadUsers();
        // if (addSignature) { //&& loggedUserId === employeId
        //     handleAddSignature();
        // }

    // }, [addSignature, employeId.name])


    //

    //*get School List
    const getSchoolList = async (searchText) => {

        //*Get userID, Access Token from local storage
        let accessToken = window.localStorage.getItem('accessToken');
        //*Request data
        let requestedData = {
            "accessToken": accessToken,
            "page": 1,
            "limit": 100,
            "search": searchText
        }
        try {
            const response = await axios.post("/api/common/getSchoolList", { requestedData });
            let getSchoolListDetails = response.data

            // if (getSchoolListDetails.responseCode === API_STATUS.SUCCESS) {
            let getSchoolListResponse = getSchoolListDetails.rows
            let finalArray = [];
            getSchoolListResponse.map((item, index) => {
                finalArray.push({ "name": item.name, "code": item.id })
                if (index === getSchoolListResponse.length - 1) {
                    setSchoolList(finalArray)
                }
            })
            // } else {
            //   setSchoolList([])
            // }
        }
        catch (err) {
            if (err.response?.status === API_STATUS.UNAUTHORIZED) {
                toast.error("Session Expired");
                router.push('/')
            }
        }
    }

    useEffect(() => {
        getSchoolList();
    }, [])

    const year = [
        { name: '2023 - 2024', code: '2023 - 2024' },
        { name: '2022 - 2023', code: '2022 - 2023' },
    ];

    const semester = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
    ];

    const approveList2 = [
        { name: 'Alexan Armineh (51393)', code: 'Alexan Armineh (51393)' },
        { name: 'Alexanian Robert (80775)', code: 'Alexanian Robert (80775)' },
        { name: 'Allen Stephanie Diane (80493)', code: 'Allen Stephanie Diane (80493)' },
        { name: 'Almanza, GABRIELA (80250)', code: 'Almanza, GABRIELA (80250)' },
        { name: 'Amador Adriana (14556)', code: 'Amador Adriana (14556)' },
        { name: 'Ankit (545454)', code: 'Ankit (545454)' },
        { name: 'Antezana Sonia F (18240)', code: 'Antezana Sonia F (18240)' },
        { name: 'Apate, RAJARAM (ra123)', code: 'Apate, RAJARAM (ra123)' },
        { name: 'Aquino Alex (82940)', code: 'Aquino Alex (82940)' },
        { name: 'Arbolante Rosemarie Borromeo (80333)', code: 'Arbolante Rosemarie Borromeo (80333)' },
        { name: 'Argueta Catherine Del Carmen (82104)', code: 'Argueta Catherine Del Carmen (82104)' },
        { name: 'Argueta Catherine Del Carmen (82104)', code: 'Argueta Catherine Del Carmen (82104)' },
        { name: 'Aroyan Christine A (39855)', code: 'Aroyan Christine A (39855)' },
    ]


    return (
        <>
            <ReactFullscreen>
                {({ onToggle }) => (
                    <Layout pageTitle="Report" activeMenu="Initiator" appId='STIPENDS_FORM'>
                        <div className="report-wrapper pt-28 md:pt-28 xl:pt-[2.083vw]">
                            {/* <div className="flex justify-end visible lg:hidden">
                                <Button icon="pi pi-bars" onClick={toggleActive} style={{ color: '#308B90', background: '#ffffff00', border: '1', borderColor: '#308B90', width: '38px', padding: '6px 0', borderRadius: '4px' }}></Button>

                            </div> */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 xl:gap-[1.250vw] pb-5">
                                <div className="relative z-10 col-span-12 lg:col-span-12" data-aos="fade-down" data-aos-duration="800">
                                    <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]" >
                                        <div className="sm:flex items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
                                            <p className="text-[18px] xl:text-[0.938vw]  text-[#101828] font-medium">Stipend Forms</p>
                                            <div className="flex gap-2 xl:gap-[0.990vw] items-center">


                                                {/* <Link href='#' className="lg:w-full text-center tableBtn blue radius8" onClick={() => initiateNewReport()}>
                                                    <i className="gusd-pluse-circle mx-1.5"></i> Initiate New Report</Link> */}

                                                <Link href="#" onClick={() => { exportFilteredDataToCSV("StipendInitiatorReport.csv") }} className=" " > <i className="pi pi-download text-black"></i></Link>



                                                <Link href="" onClick={onToggle}> <i className="gusd-expand text-black"></i></Link>
                                            </div>

                                        </div>
                                        <TabView className="">
                                            {/* <TabPanel header="Initiate Reports">
                                                <div className="initiator  arrowshow">
                                                    <div className="xl:h-[28.646vw] h-[500px] overflow-auto"> */}
                                                        {/* <DataTable
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
                                                                header="Title"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                                style={{ minWidth: "5rem" }}
                                                            ></Column> */}
                                                        {/* <Column field="schoolOrDeptName" header="School or Department Name" filter filterPlaceholder="Search" sortable></Column> */}
                                                        {/* <Column
                                                                field="assignmentTitle"
                                                                header="Employee Name"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                            ></Column>
                                                            <Column
                                                                field="noOfsubstitute"
                                                                header="School"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                            ></Column>

                                                            <Column
                                                                field="asignee"
                                                                header="Year"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                            ></Column>
                                                            <Column
                                                                header="Semester"
                                                                field="remark"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                                style={{ minWidth: "14rem" }}
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
                                                                filter
                                                                filterPlaceholder="Search"
                                                            ></Column>
                                                            <Column
                                                                field="action"
                                                                header="Action"
                                                                frozen
                                                                alignFrozen="right"
                                                                align="center"
                                                                body={reportListActions}
                                                                style={{ minWidth: "6rem" }}
                                                            ></Column>
                                                        </DataTable> */}
                                                        {/* <ReportTable isListLoaded={true} view={setShowNextPopUp} edit={setVisibleApprovalRequestedReportEdit} />
                                                    </div>
                                                </div>
                                            </TabPanel> */}

                                            <TabPanel header="Requested Reports">
                                                <div className="initiator  arrowshow">
                                                    <div className="xl:h-[28.646vw] h-[500px] overflow-auto">
                                                        {/* <DataTable
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
                                                                header="Submitted On"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                                style={{ minWidth: "5rem" }}
                                                            ></Column> */}
                                                        {/* <Column field="schoolOrDeptName" header="School or Department Name" filter filterPlaceholder="Search" sortable></Column> */}
                                                        {/* <Column
                                                                field="assignmentTitle"
                                                                header="Assignment title"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                            ></Column>
                                                            <Column
                                                                field="noOfsubstitute"
                                                                header="No of Substitutes"
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
                                                                field="asignee"
                                                                header="Assignee"
                                                                filter
                                                                filterPlaceholder="Search"
                                                                sortable
                                                            ></Column>
                                                            <Column
                                                                field="remark"
                                                                header="Remarks"
                                                                align="center"
                                                                style={{ minWidth: "6rem" }}
                                                                filter
                                                                filterPlaceholder="Search"
                                                            ></Column>
                                                            <Column
                                                                field="action"
                                                                header="Action"
                                                                frozen
                                                                alignFrozen="right"
                                                                align="center"
                                                                body={reportListActions}
                                                                style={{ minWidth: "6rem" }}
                                                            ></Column>
                                                        </DataTable> */}
                                                        <ReportTable isListLoaded={true}view={setVisibleApprovalRequestedReportEdit} edit={setShowNextPopUp}/>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </TabView>
                                        {
                                            // (loggedStipendInitiator === '1' || loggedStipendApprover === '1') ?
                                            // <>
                                            //     <TabView 
                                            //     // activeIndex={loggedStipendInitiator == 1 ? activeIndex : 1}
                                            //      onTabChange={(e) => setActiveIndex(e.index)}>
                                            //         {
                                            //             // (loggedStipendInitiator === '1') ?
                                            //                 <TabPanel header="Initiate Reports">
                                            //                     <div className="initiator arrowshow">
                                            //                         <DataTable
                                            //                             className="custpaginator custIcons custmBtnTable custTable"
                                            //                             scrollable
                                            //                             filter={filters}
                                            //                             filterDisplay="row"
                                            //                             value={stipendMasterData}
                                            //                             paginator rowsPerPageOptions={[10, 20, 30]} responsiveLayout="scroll" paginatorTemplate="PrevPageLink PageLinks NextPageLink" rows={11}
                                            //                             emptyMessage="No records found.">

                                            //                             <Column header="SL#" body={CounterAction} style={{ minWidth: '3rem' }}></Column>
                                            //                             <Column header="Title" field="title" filter filterPlaceholder="Search" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="employee" filter filterPlaceholder='Search' header="Employee Name" sortable style={{ width: '10rem' }}></Column>
                                            //                             <Column field="school" filterPlaceholder='Search' filter header="School" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="schoolYear" filterPlaceholder='Search' filter header="Year" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="semister" filterPlaceholder='Search' filter header="Semester" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="statusStipend" filter filterElement={statusRowFilterInitiateTemplate} body={TaskStatusInitiate} header="Status" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="remark" header="Remarks" filter align='center' filterPlaceholder="Search" style={{ minWidth: '6rem' }}></Column>
                                            //                             <Column field="action" header="Action" frozen alignFrozen="right" align='center' body={initiateReportAction} style={{ minWidth: '6rem' }}></Column>

                                            //                         </DataTable>
                                            //                     </div>
                                            //                 </TabPanel>
                                            //                 // : null
                                            //         }

                                            //         {
                                            //             // (loggedStipendApprover === '1') ?
                                            //                 <TabPanel header="Requested Reports">
                                            //                     <div className={stipendApproveReportListInitiator.length === 0 ? "datatableemptymessage arrowhide" : "initiator  arrowshow"}>
                                            //                         <DataTable
                                            //                             className="custpaginator custIcons custmBtnTable custTable"
                                            //                             scrollable
                                            //                             filters={filterRequestedReports}
                                            //                             filterDisplay="row"
                                            //                             value={stipendApproveReportListInitiator}
                                            //                             paginator rowsPerPageOptions={[10, 20, 30]} responsiveLayout="scroll" paginatorTemplate="PrevPageLink PageLinks NextPageLink" rows={11}
                                            //                             emptyMessage="No records found."
                                            //                         >
                                            //                             <Column header="SL#" body={CounterAction} style={{ minWidth: '3rem' }}></Column>
                                            //                             <Column header="Title" field="title" filter filterPlaceholder="Search" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="employee" filter filterPlaceholder='Search' header="Employee Name" sortable style={{ width: '13rem' }}></Column>
                                            //                             <Column field="school" filterPlaceholder='Search' filter header="School" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="schoolYear" filterPlaceholder='Search' filter header="Year" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             <Column field="semesterTitle" header="Semester" filter filterPlaceholder="Search" sortable style={{ minWidth: '5rem' }}></Column>
                                            //                             {/* <Column field="dates" filter filterPlaceholder="Search" header="Created Date" sortable></Column> */}
                                            //                             <Column field="submittedOn" header="Submitted On" sortable filter filterPlaceholder="Search" style={{ width: '10rem' }}></Column>
                                            //                             <Column header="Status" field="status" filter filterElement={statusRowFilterTemplate} body={TaskStatusSLA} sortable style={{ minWidth: '8rem' }}></Column>
                                            //                             <Column field="remark" header="Remarks" filter align='center' filterPlaceholder="Search" style={{ minWidth: '6rem' }}></Column>
                                            //                             <Column field="action" header="Action" frozen alignFrozen="right" align='center' body={initiateApproverReportAction} style={{ minWidth: '6rem' }}></Column>
                                            //                         </DataTable>
                                            //                     </div>
                                            //                 </TabPanel>
                                            //                 // : null
                                            //         }
                                            //     </TabView>
                                            // </>
                                            // : <div className="text-[#113699] text-md md:text-[0.833vw] font-bold mt-3 text-center p-5">No access found. Please contact with Administrator...</div>
                                        }




                                        {/* edit popup for requested report start */}

                                        < Sidebar className="relative reports-popup" visible={visibleApprovalRequestedReportEdit} position="right"
                                            style={{ width: `${(fullApproverViewForView) ? '72.917vw' : '70rem'}` }} onHide={() =>
                                                setVisibleApprovalRequestedReportEdit(false)
                                            } draggable={false} resizable={false}>
                                            <div className="grid grid-cols-12">
                                                <div className="col-span-12 lg:col-span-8 bg-[#F5F6F7] h-auto">
                                                    <div className="p-5">
                                                        {
                                                            (!fullApproverViewForView) ?
                                                                <div onClick={() => setVisibleApprovalRequestedReportEdit(false)} className="py-3">
                                                                    {/* <Image src={sideBarRight} alt="user" width="24" height="24" /> */}
                                                                    <img src="/assets/images/sidebarright.svg " alt="user" width="24" height="24" />
                                                                </div>
                                                                : <div onClick={() => setFullApproverViewForView(false)} className="py-3">
                                                                    {/* <Image src={sideBarRight} alt="user" width="24" height="24" /> */}
                                                                    <img src="/assets/images/sidebarright.svg " alt="user" width="24" height="24" />
                                                                </div>
                                                        }

                                                        {
                                                            (!fullApproverViewForView) ?
                                                                <div>
                                                                    <div className='text-center'>
                                                                        <div><b>GLENDALE UNIFIED SCHOOL DISTRICT</b></div>
                                                                        <div className="text-[#344054] text-xs lg:text-[0.833vw] font-medium">Request For Approval - Stipend Form</div>
                                                                    </div>
                                                                </div> : null
                                                        }
                                                        {
                                                            (!fullApproverViewForView) ?
                                                                <div>
                                                                    {/* <div className="text-[#113699] text-md md:text-[0.833vw] font-bold mt-3">Substitute Request Classified</div> */}

                                                                    <div className="py-3 bg-white px-5 rounded-[8px] mt-3">
                                                                        <div className="mb-1">
                                                                            <label className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1" htmlFor="username">Approval Status </label>
                                                                            <div className="py-3 emp-simple-tbl">
                                                                                <DataTable
                                                                                    className="custpaginator custIcons custmBtnTable custTable"
                                                                                    value={"test"}
                                                                                >
                                                                                    <Column field="empCode" header="Employee Id"></Column>
                                                                                    <Column field="empName" header="Name"></Column>
                                                                                    <Column field="status" body={approvalStatusBody} header="Status"></Column>
                                                                                    <Column field="approvedDate" header="Time Stamp"></Column>

                                                                                </DataTable>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> : null
                                                        }

                                                        <div className="rounded-[8px] p-3 mt-3"   >

                                                            {
                                                                (!fullApproverViewForView) ?
                                                                    <div className='flex items-center justify-between'>
                                                                        <div className="text-[#344054] font-medium text-xs lg:text-[1.042vw]"><i className="mr-3 gusd-document"></i>Stipends Form...pdf</div>
                                                                        <div className="flex items-center gap-3">
                                                                            <button onClick={() => setFullApproverViewForView(true)} className="text-[#113699] font-medium text-xs lg:text-[0.729vw] flex items-center gap-2"><i className="pi pi-calendar"></i>View Full Screen</button>
                                                                            <button className="text-[#113699] font-medium text-xs lg:text-[0.729vw]">Edit stipend form</button>
                                                                        </div>


                                                                    </div> :
                                                                    <div className='flex items-center justify-between pb-5'>
                                                                        <div className="text-[#344054] font-medium text-xs lg:text-[1.042vw]"><i className="mr-3 gusd-document"></i>Stipends Form.pdf</div>
                                                                        <button onClick={() => setFullApproverViewForView(false)} className="text-[#113699] font-medium text-xs lg:text-[0.729vw] flex items-center gap-2"><i className="pi pi-calendar"></i>Exit Full Screen</button>
                                                                    </div>
                                                            }
                                                            {
                                                                (!fullApproverViewForView) ?
                                                                    <div>
                                                                        <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] print:p-5 h-[30vw] overflow-auto bg-white' >
                                                                            {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                                                                            <div id="my-html-template" >
                                                                                <StipendFormPdf
                                                                                    data={{
                                                                                        'schoolName': location.name,
                                                                                        'schoolYear': schoolYear.name,
                                                                                        'schoolSemister': semister.name,
                                                                                        //pc
                                                                                        // 'employeeName': employeId.name,
                                                                                        'departmentTypeName': departmentId.name,
                                                                                        'departmentCount': departmentPeopleCount,
                                                                                        'assignmentArray': assignmentArray,
                                                                                        'stipendTypes': confirmed,
                                                                                        'previewAndEdit': previewAndEdit,
                                                                                        'approvalFinalData': "test",
                                                                                        'selectedConfirmation': selectedConfirmation,
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                        <div className="py-10">
                                                                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                                                                        </div>
                                                                        <div className='grid grid-cols-3 gap-2  py-5'>
                                                                            <Link
                                                                                href="#"
                                                                                className='text-[#344054] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                                                <i class="pi pi-times"></i><span>Cancel</span></Link>
                                                                            <Link
                                                                                href=""
                                                                                className='text-[#D92D20] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'

                                                                            >
                                                                                <i class="pi pi-times"></i><span>Reject</span></Link>
                                                                            <Link
                                                                                href=""
                                                                                className='text-[#039855] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer '

                                                                            >
                                                                                <i class="pi pi-check"

                                                                                ></i><span>Approve</span></Link>

                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className="grid grid-cols-1 " >
                                                                        {/* <img src={pdfImage} alt='myImg' /> */}
                                                                        <div className='bg-white py-5 px-5'>
                                                                            <StipendFormPdf ref={componentRef}
                                                                                data={{
                                                                                    'schoolName': location.name,
                                                                                    'schoolYear': schoolYear.name,
                                                                                    'schoolSemister': semister.name,
                                                                                    'employeeName': employeId.name,
                                                                                    'departmentTypeName': departmentId.name,
                                                                                    'departmentCount': departmentPeopleCount,
                                                                                    'assignmentArray': assignmentArray,
                                                                                    'stipendTypes': confirmed,
                                                                                    'previewAndEdit': previewAndEdit,
                                                                                    'approvalFinalData': approvalCompleteData,
                                                                                    'selectedConfirmation': selectedConfirmation,
                                                                                }}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-4 bg-[#EFF0F1] h-auto">

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
                                        </Sidebar>

                                        {/* confirmation dialog */}

                                        <Dialog header="" visible={confirmVisible} style={{ width: '30vw' }} onHide={() => { setConfirmVisible(false); setVisibleEdit(false); }} footer={footerContent}>
                                            <p className="m-0 text-[#0487C8]">
                                                <i className='pi pi-check-circle mr-2'></i>
                                                <span className='font-medium text-[18px]'>Your changes has been saved in this report</span>
                                            </p>
                                        </Dialog>
                                        {/* edit popup end */}

                                    </div>

                                    <SignatureDialog isVisible={signatureDialog}
                                        onClickHandler={(image) => handleSignatureSelection(image)}
                                        onCloseHandler={() => {
                                            setSignatureDialog(false);
                                            setAddSignature(false);
                                        }}
                                        username={loggedInUserData?.name}
                                    />

                                </div>
                            </div>
                        </div>

                        {/* next full popup */}
                        < Dialog className="relative reports-popup" visible={showNextPopUp} position="right" style={{ width: '100vw' }
                        } breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setShowNextPopUp(false)} draggable={false} resizable={false} >

                            {/* <div className="p-10"><a href="#" id="add-family-open-btn"><i className="gusd-edit text-2xl"></i></a></div> */}
                            <div className="fixed z-10 inset-0 overflow-y-auto styled-select" >
                                <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
                                    <div className="relative overflow-hidden transform transition-all w-full h-full">
                                        <div className="grid grid-cols-12 custmCols">
                                            <div className="col-span-12 md:col-span-3 h-full sideBarLeft openSideDiv">
                                                <button onClick={() => { setShowPreviewPopUp(false); SetPreviewAndEdit(false); setShowNextPopUp(false); }} type="button" className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md" id="add-family-cancel-btn"><i className="gusd-arrow-line-right mr-[14px] xl:mr-[0.729vw]"></i> Back Home</button>
                                                <div className="mt-[10px] xl:mt-[0.533vw] text-[#101828] text-[20px] xl:text-[0.833vw] font-medium">Stipend Form</div>
                                                {/* <div className="mt-[10px] xl:mt-[0.533vw] text-[#101828] text-[20px] xl:text-[0.833vw] font-medium">Assignment 10102</div> */}
                                                <div className="mt-[32px] xl:[1.667vw]">
                                                    <ul className="sideTabs">
                                                        <li><a href="#"
                                                            onClick={() => { setShowPreviewPopUp(false); SetPreviewAndEdit(false); SetBasicInfoPopUp(true) }} className={`${basicInfoPopUp === true ? "tab-b active activeCheck" : ""}`} data-id="tab1">
                                                            <i className="gusd-guardian-info text-[16px] xl:text-[1.042vw]"></i>
                                                            Basic Info</a></li>

                                                        <li><a href="#"
                                                            onClick={() => { SetBasicInfoPopUp(false); SetPreviewAndEdit(true) }}
                                                            className={`${previewAndEdit === true ? "tab-b active activeCheck" : null}`}
                                                            data-id="tab2"><i className="gusd-guardian-info text-[16px] xl:text-[1.042vw]"></i> Preview & Edit</a></li>

                                                    </ul>
                                                </div>
                                                {/* <div className="fixed top-0 left-0 openBtn xl:hidden">
                                                    <button type="button" className="sideDivBtn inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-white text-[14px] xl:text-[0.729vw] font-medium bg-[#3366FF] border border-[#EFF8FF] rounded-r-md"><i className="gusd-arrow-line-right"></i></button>
                                                </div> */}
                                            </div>

                                            <div className="col-span-12 md:col-span-9 mScrollCstm overflow-auto custm_dropdown">
                                                <div className="tab-c tab-active p-lr-110 pt-10 xl:pt-0 " data-id="tab1">
                                                    {

                                                        basicInfoPopUp === true ?
                                                            <div>
                                                                <div className='flex items-center justify-center'>
                                                                    <div className='flex items-center gap-3'>
                                                                        <div>
                                                                            <img src="/assets/images/landing_logo.png " width={"100"} height={"100"} />
                                                                            {/* <Image src={landing_logo} width={"100"} height={"100"} /> */}
                                                                        </div>
                                                                        <div className='flex flex-col items-center justify-center'>
                                                                            <div><strong>GLENDALE UNIFIED SCHOOL DISTRICT</strong></div>
                                                                            <div><strong>“Preparing our students for their future”</strong></div>
                                                                            <div className='text-center'>
                                                                                <p>Office of the Chief Human Resources & Operations Officer</p>
                                                                                <p>223 North Jackson St., Glendale, California 91206-4380</p>
                                                                                <p>Telephone: 818-241-3111, Ext. 1256 • Fax: 818-547-3207</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mCustomScrollbar scroll-w-10 max-h-100">

                                                                    <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] ">
                                                                        <form>
                                                                            <div className="col mt-2">
                                                                                <div className='flex items-end md:gap-2 mt-5'>
                                                                                    <div className='col w-[180px]'><label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="username">Form Title</label></div>
                                                                                    <div className='grow'>

                                                                                        {/* <InputText disabled
                                                                                            value={formTitle} onChange={e => { setFormTitle(e.target.value) }}
                                                                                            placeholder="Form Title"
                                                                                            className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }}
                                                                                        /> */}

                                                                                        <input value={formTitle} onChange={e => { setFormTitle(e.target.value) }}
                                                                                            disabled name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="Form Title" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col mt-2">
                                                                                <div className='sm:flex items-end sm:block md:gap-2 mt-5'>
                                                                                    <div className='col w-[180px]'><label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block whitespace-nowrap" htmlFor="username">School/Department<span className='text-[red] pl-0.2'>*</span></label></div>
                                                                                    <div className='grow lg:w-[200px] sm:w-[14rem]'>
                                                                                        <Dropdown value={selectedSchool} onChange={(e) => {
                                                                                            setSelectedSchool(e.value);
                                                                                        }} options={schoolList} optionLabel="name" placeholder="Select here"
                                                                                            filter
                                                                                            className="w-full md:w-14rem" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className='sm:flex sm:block items-end md:gap-2 mt-2'>
                                                                                <div className='col w-[180px]'><label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block whitespace-nowrap" htmlFor="username">School Year<span className='text-[red] pl-0.2'>*</span></label></div>
                                                                                <div className='grow lg:w-[200px] sm:w-[14rem]'>

                                                                                    <Dropdown value={schoolYearId} onChange={(e) => {
                                                                                        setSchoolYearId(e.value);

                                                                                    }}
                                                                                        showClear
                                                                                        options={year} optionLabel="name" placeholder="Select here"
                                                                                        filter
                                                                                        className="w-full md:w-14rem" />
                                                                                </div>
                                                                                <div className='col w-[78px]'><label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="username">Semester<span className='text-[red] pl-0.2'>*</span></label></div>
                                                                                <div className='grow lg:w-[200px] sm:w-[14rem]'>

                                                                                    <Dropdown value={semisterId} onChange={(e) => {

                                                                                        setSemisterId(e.value);
                                                                                    }}
                                                                                        showClear
                                                                                        options={semester} optionLabel="name" placeholder="Select here"
                                                                                        filter
                                                                                        className="w-full md:w-14rem" />
                                                                                </div>
                                                                            </div>

                                                                            <div className="col mt-4">

                                                                                <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="username" >Stipend Type:</label>

                                                                                {confirmed.map((title) => {
                                                                                    return (<>
                                                                                        <div className="flex flex-column gap-3">
                                                                                            <Checkbox inputId={title.key} name="title" value={title} onChange={onConfirmationChange} checked={selectedConfirmation.some((item) => item.key === title.key)} />
                                                                                            <label className="mt-15 text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor={title.key}>
                                                                                                {title.name}
                                                                                            </label>
                                                                                        </div>
                                                                                    </>
                                                                                    );
                                                                                })}
                                                                            </div>

                                                                            <div className='grid grid-cols-2 gap-8 mt-2'>
                                                                                <div className='col  '>
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="username">Employee’s Name:<span className='text-[red] pl-0.2'>*</span></label>
                                                                                    <div className='flex  '>
                                                                                        <Dropdown value={employeeId} onChange={(e) => {
                                                                                            setEmployeeId(e.target.value);
                                                                                            setEmployeeCodeOnly(e.target.value?.name.match(/\d+/)[0]);
                                                                                        }}
                                                                                            showClear
                                                                                            options={approveList2} optionLabel="name" placeholder="Select here"
                                                                                            onKeyDown={e => {
                                                                                                userList(e)
                                                                                            }}
                                                                                            filter

                                                                                            className="w-full md:w-14rem" />
                                                                                        <div onClick={(e) => setOpenNewEmployee(true)} className='cursor-pointer text-[30px] '>
                                                                                            {/* <i className='gusd-pluse-circle' style = {{color: "lightgray",fontSize: "20px", margin: "3px",position:"relative", bottom:"6px"}}></i> */}
                                                                                            <Tooltip target=".icon-tooltip" content="Add Employee" position="top" className="custom-tooltip-content" />
                                                                                            <i className='icon-tooltip gusd-pluse-circle' style={{ color: "lightgray", fontSize: "20px", margin: "3px", position: "relative", bottom: "6px" }}></i>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                {/* Add New Employee Popup */}
                                                                                <EmployeePopup
                                                                                    visible={openNewEmployee}
                                                                                    onHide={() => {
                                                                                        setOpenNewEmployee(false);

                                                                                    }}
                                                                                />
                                                                                {/* <Dialog
                                                                                    header="Add New Employee" draggable={false} className='add_New_Employee'
                                                                                    visible={openNewEmployee}
                                                                                    style={{ width: "30vw" }}

                                                                                    onHide={() => {
                                                                                        setOpenNewEmployee(false);

                                                                                    }}
                                                                                // footer={footerContentForReqReject}
                                                                                >
                                                                                    <div className="m-0">

                                                                                        <div className="font-medium text-sm mb-2 mt-3">School/Department <span className="text-[red] pl-0.2">*</span></div>
                                                                                        <Dropdown id="dept" value={location}
                                                                                            showClear
                                                                                            onChange={(e) => { setLocation(e.value); setNewEmployeeSchool(e.value) }}
                                                                                            filter
                                                                                            // disabled={disabled}
                                                                                            options={newSchoolList} optionLabel="name" placeholder="Select School/Department" className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5" style={{ fontSize: '0.875rem', color: '#667085', fontWeight: '400' }}
                                                                                        />
                                                                                       
                                                                                        <div className="font-medium text-sm mb-2 mt-3">First Name <span className="text-[red] pl-0.2">*</span></div>
                                                                                        <InputText
                                                                                            value={newEmpFirstName}
                                                                                            placeholder="Enter First Name"
                                                                                            onChange={e => { setNewEmpFirstName(e.target.value) }}
                                                                                            className="w-full"
                                                                                        />
                                                                                        <div className="font-medium text-sm mb-2 mt-3">Last Name <span className="text-[red] pl-0.2">*</span></div>
                                                                                        <InputText
                                                                                            value={newEmpLastName}
                                                                                            placeholder="Enter Last Name"
                                                                                            onChange={e => { setNewEmpLastName(e.target.value) }}
                                                                                            className="w-full"
                                                                                        />
            
                                                                                        <div className="font-medium text-sm mb-2 mt-3">Employee Code <span className="text-[red] pl-0.2">*</span></div>
                                                                                        <InputText
                                                                                            value={NewEmployeeCode}
                                                                                            placeholder="Enter Employee Code"
                                                                                            onChange={e => { setNewEmployeeCode(e.target.value) }}
                                                                                            className="w-full"
                                                                                        />

                                                                                        <div className="font-medium text-sm mb-2 mt-3 ">Employee Email Address <span className="text-[red] pl-0.2">*</span></div>
                                                                                        <InputText
                                                                                            value={NewEmployeeEmail}
                                                                                            placeholder="Enter Employee Email Address"
                                                                                            onChange={e => { setNewEmployeeEmail(e.target.value) }}
                                                                                            className="w-full"
                                                                                        />
                                                                                    </div>
                                                                                    <div className='flex justify-between gap-2 mt-3'>
                                                                                        <Link href="" onClick={() => { setOpenNewEmployee(false); }}
                                                                                            className='text-[#344054] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                                                            <i class="pi pi-times"></i><span>Cancel</span></Link>

                                                                                        <Link href="" onClick={() => { AddNewEmployee() }}
                                                                                            className='text-[#039855] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                                                            <i class="pi pi-check"></i><span>Add</span></Link>

                                                                                    </div>
                                                                                </Dialog> */}
                                                                                <div className='col '>
                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="username">Employee ID:<span className='text-[red] pl-0.2'>*</span></label>

                                                                                    <input value={employeeCodeOnly} disabled={true} name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="Employee ID" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} />
                                                                                </div>
                                                                            </div>

                                                                            <div className='mt-2'>
                                                                                <div className="grid grid-cols-2 lg:grid-cols-12 items-end">
                                                                                    {
                                                                                        assignmentArray.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <div className='col-span-12'>
                                                                                                        <div className='grid grid-cols-2 gap-8'>
                                                                                                            <div className='items-end'>
                                                                                                                <div className='col'>
                                                                                                                    <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block font-bold whitespace-nowrap" htmlFor="Assign">Assignment #{index + 1}:<span className='text-[red] pl-0.2'>*</span> </label>
                                                                                                                </div>
                                                                                                                <div className='grow w-full'>
                                                                                                                    <input value={item.name} onChange={e => { onChangeAssignment(index, e.target.value, 'N') }} name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Assignment Name" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0', width: '94%' }} />

                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='items-end'>
                                                                                                                <div className=""><label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block whitespace-nowrap" htmlFor="username">Amount:</label></div>
                                                                                                                <div className='grow w-full'>
                                                                                                                    <input value={item.amount} onChange={e => { onChangeAssignment(index, e.target.value, 'A') }} name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]" placeholder="Amount" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="col-span-12 md:col-span-5 h-[50px] flex gap-4 mt-4 items-end">
                                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] flex items-end gap-1" htmlFor="isSplit">
                                                                                                            <Checkbox onChange={e => { onChangeAssignment(index, e, 'S') }} checked={item.isSplit} className='mr-[2px] flex items-end gap-3' />  Split</label>
                                                                                                        {item.isSplit === true ?
                                                                                                            <input value={item.splitText} onChange={e => { onChangeAssignment(index, e.target.value, 'ST') }} name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="Enter your text" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} />
                                                                                                            : null
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                    <div className="col-span-12 md:col-span-2 max-md:mt-5">
                                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block" htmlFor="isDeptChair">
                                                                                                            <Checkbox onChange={e => { onChangeAssignment(index, e, 'DC') }} checked={item.isDeptChair} className='mr-1' /> Department Chair</label>
                                                                                                    </div>
                                                                                                    <div className="col-span-12 md:col-span-4 h-[50px]">
                                                                                                        {item.isDeptChair === true ?
                                                                                                            <input value={item.noOfEmployee} onChange={e => { onChangeAssignment(index, e.target.value, 'DCT') }} name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="No. Of Employee" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} />
                                                                                                            : null
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div className="col-span-12 md:col-span-6 max-md:mt-5 ">
                                                                                                        <label className="text-[#344054] text-[14px] xl:text-[0.829vw] font-medium xl:mb-[0.521vw] inline-block mt-3 md:py-[10px]" htmlFor="isExtraCurricular">
                                                                                                            <Checkbox onChange={e => { onChangeAssignment(index, e, 'E') }} checked={item.isExtraCurricular} className='mr-1' /> Extra Curricular</label>
                                                                                                    </div>
                                                                                                    <div className="col-span-12 md:col-span-6 max-md:mt-5 ">
                                                                                                        {index !== 0 &&
                                                                                                            <div className='flex flex-row-reverse mt-2'>
                                                                                                                <Link href="#" onClick={(e) => { onClickRemoveAssignment(index) }} className='py-2 px-6 bg-red-700 mb-6 text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:border-[#1570EF]'>
                                                                                                                    Remove</Link>
                                                                                                            </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                <a href="#" onClick={() => {
                                                                                    onClickAddAssignment();
                                                                                }} className="inline-block text-white text-[10px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] mt-2">
                                                                                    Add</a>
                                                                            </div>

                                                                            <div className={"mb-8"}>
                                                                                <div style={{ marginTop: '10px' }}>
                                                                                    <div>
                                                                                        <table style={{ width: "100%", fontSize: "14px" }}>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td width={"150px"} style={{ padding: "10px" }} className='text-[#344054] text-[14px] xl:text-[0.829vw] font-medium'>Principal<span className="text-[red] pl-0.2">*</span></td>
                                                                                                    <td style={{ padding: "5px" }}>
                                                                                                        {/*  {!selectedEmployee ? ( 
                                                                                                        <Dropdown
                                                                                                        disabled
                                                                                                        placeholder="Select an Site Admin/ Dept Head"
                                                                                                        className="w-full md:w-14rem"
                                                                                                        />
                                                                                                        ) : ( */}
                                                                                                        <Dropdown
                                                                                                            showClear
                                                                                                            value={selectedPrincipal}
                                                                                                            onChange={e => {
                                                                                                                setSelectedPrincipal(e.value);
                                                                                                            }}

                                                                                                            options={approveList2}
                                                                                                            optionLabel="name"
                                                                                                            placeholder="Select a Principal"
                                                                                                            onKeyDown={e => {
                                                                                                                approversList(e)
                                                                                                            }}
                                                                                                            filter
                                                                                                            className="w-full md:w-14rem"
                                                                                                        />
                                                                                                        {/*  )} */}
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    {/* <td style={{ padding: "10px" }} className='text-[#344054] text-[14px] xl:text-[0.829vw] font-medium'>HR Technician<span className="text-[red] pl-0.2">*</span></td>

                                                                                                    <td style={{ padding: "5px" }}>
                                                                                                        <input value={selectedHRTechnician} onChange={e => { setSelectedHRTechnician(e.target.value) }}
                                                                                                            disabled name="" className="text-[16px] xl:text-[0.833vw] px-[14px] md:py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder-[#101828] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw] mt-2" placeholder="Form Title" style={{ border: '0', background: 'none', borderBottom: '1px', borderColor: '#000', borderStyle: 'solid', borderRadius: '0' }} /> */}

                                                                                                    {/* <InputText disabled
                                                                                                            value={selectedHRTechnician}
                                                                                                            placeholder=""
                                                                                                            onChange={e => { setSelectedHRTechnician(e.target.value) }}
                                                                                                            className="w-full md:w-14rem"
                                                                                                        /> */}

                                                                                                    {/* <Dropdown disabled
                                                                                                            value={selectedHRTechnician}
                                                                                                            onChange={e => setSelectedHRTechnician(e.value)}
                                                                                                            options={hrList}
                                                                                                            optionLabel="name"
                                                                                                            placeholder="Select a HR Technician"
                                                                                                            onKeyDown={e => {
                                                                                                                setEmpList(e, "HR")
                                                                                                            }}
                                                                                                            filter
                                                                                                            className="w-full md:w-14rem"
                                                                                                        /> */}

                                                                                                    <td style={{ padding: "10px" }} className='text-[#344054] text-[14px] xl:text-[0.829vw] font-medium'>HR Technician<span className="text-[red] pl-0.2">*</span></td>
                                                                                                    <td style={{ padding: "5px" }}>
                                                                                                        <Dropdown
                                                                                                            value={selectedHRTechnicianId}
                                                                                                            onChange={e => {
                                                                                                                setSelectedHRTechnicianId(e.value);
                                                                                                            }}
                                                                                                            showClear
                                                                                                            options={approveList2}
                                                                                                            onKeyDown={e => {
                                                                                                                approversList(e)
                                                                                                            }}
                                                                                                            optionLabel="name"
                                                                                                            placeholder="Select a Executive Manager"
                                                                                                            filter
                                                                                                            className="w-full md:w-14rem"
                                                                                                        />
                                                                                                    </td>
                                                                                                
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style={{ padding: "10px" }} className='text-[#344054] text-[14px] xl:text-[0.829vw] font-medium'>Executive Manager<span className="text-[red] pl-0.2">*</span></td>
                                                                                                <td style={{ padding: "5px" }}>
                                                                                                    <Dropdown
                                                                                                        value={selectedExecutiveManager}
                                                                                                        onChange={e => {
                                                                                                            setSelectedExecutiveManager(e.value);
                                                                                                        }}
                                                                                                        showClear
                                                                                                        options={approveList2}
                                                                                                        onKeyDown={e => {
                                                                                                            approversList(e)
                                                                                                        }}
                                                                                                        optionLabel="name"
                                                                                                        placeholder="Select a Executive Manager"
                                                                                                        filter
                                                                                                        className="w-full md:w-14rem"
                                                                                                    />
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                                </div>
                                                <div className="grid xl:grid-cols-2 sm:grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                                                    <div>
                                                        <a href="#" onClick={() => { setShowPreviewPopUp(false); setShowNextPopUp(false); }} className="inline-block text-[#344054] text-[10px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                                    </div>
                                                    <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                                        {
                                                            hideSaveButton === false ?
                                                                <>
                                                                    {btnStatus === !Request_Stipend_Status.PENDING || btnDisabled ? <a
                                                                        href="#" disabled={btnDisabled} className={`${(btnDisabled) ? 'gray ' : '#EFF8FF'} flex items-center text-[#2D5BE5] text-[10px] xl:text-[0.833vw] font-medium border border-[#D0D5DD] bg-[#EFF8FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]`}><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a> : <a
                                                                            onClick={() => {
                                                                                saveBasicInfo(Request_Stipend_Status.PENDING);
                                                                            }}
                                                                            href="#" disabled={btnDisabled} className={`${(btnDisabled) ? 'gray ' : '#EFF8FF'} flex items-center text-[#2D5BE5] text-[10px] xl:text-[0.833vw] font-medium border border-[#D0D5DD] bg-[#EFF8FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]`}><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                                                    }
                                                                </>
                                                                : null
                                                        }
                                                        <a
                                                            onClick={() => {
                                                                saveBasicInfo(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE);
                                                            }}
                                                            href="#" className="inline-block text-white text-[10px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">Submit </a>
                                                        {
                                                            (showPreviewPopUp) ?
                                                                <a href="#" onClick={() => {
                                                                    saveBasicInfo(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE);
                                                                }
                                                                } className="flex text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                                                    <i className='gusd-check mr-1'></i>Submit </a> :

                                                                <a href="#" onClick={() => {
                                                                    SetPreviewAndEdit(true); SetBasicInfoPopUp(false);
                                                                }} className="flex text-white text-[10px] xl:text-[0.833vw] font-medium border border-[#EFF8FF] bg-[#3366FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                                                    <i className='gusd-eye mr-1'></i>Preview</a>
                                                        }
                                                    </div>
                                                </div>
                                            </div> : null
                                                    }

                                            {
                                                previewAndEdit === true ?
                                                    <div>
                                                        <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]'>
                                                            {/* <img src={pdfImageReport} alt='pdfImageReport' /> */}
                                                            <StipendFormPdf ref={componentRef}
                                                                data={{
                                                                    'schoolName': location.name,
                                                                    'schoolYear': schoolYearId.name,
                                                                    'schoolSemister': semisterId.name,
                                                                    'employeeName': employeeId.name,
                                                                    'departmentTypeName': departmentId.name,
                                                                    'departmentCount': departmentPeopleCount,
                                                                    'assignmentArray': assignmentArray,
                                                                    'stipendTypes': confirmed,
                                                                    'previewAndEdit': previewAndEdit,
                                                                    'approvalFinalData': approvalCompleteData,
                                                                    'selectedConfirmation': selectedConfirmation,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                                                            <div>
                                                                <a href="#" onClick={() => { setShowPreviewPopUp(false); SetPreviewAndEdit(false); SetBasicInfoPopUp(true) }} className="inline-block text-[#344054] text-[10px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                                            </div>
                                                            <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                                                {
                                                                    hideSaveButton === false ?
                                                                        <>
                                                                            {btnDisabled ?
                                                                                <a
                                                                                    href="#" disabled={btnDisabled || !Request_Stipend_Status.PENDING} className={`${(btnDisabled || !Request_Stipend_Status.PENDING) ? 'gray ' : '#EFF8FF '} inline-block text-[#2D5BE5] text-[10px] xl:text-[0.833vw] font-medium bg-[#EFF8FF]  border border-[#D0D5DD]  rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]`}

                                                                                ><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a> : <a
                                                                                    onClick={() => {
                                                                                        saveBasicInfo(Request_Stipend_Status.PENDING);
                                                                                    }}
                                                                                    href="#" disabled={btnDisabled || !Request_Stipend_Status.PENDING} className={`${(btnDisabled || !Request_Stipend_Status.PENDING) ? 'gray ' : '#EFF8FF '} inline-block text-[#2D5BE5] text-[10px] xl:text-[0.833vw] font-medium bg-[#EFF8FF]  border border-[#D0D5DD]  rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]`}

                                                                                ><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                                                            }
                                                                        </>
                                                                        : null
                                                                }

                                                                <a href="#" onClick={() => {
                                                                    saveBasicInfo(Request_Stipend_Status.PENDING_FOR_APPROVAL_EMPLOYEE);
                                                                    setPreviewSubmit(true)
                                                                    // setShowPreviewPopUp(true)
                                                                }
                                                                } className="inline-block text-white text-[10px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                                                    <i className='gusd-check mr-1'></i>Submit </a>
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
                                            <span className='font-medium text-[18px]'>This report Has been Successfully Created</span>
                                        </p>
                                    </Dialog>

                                </div>
                            </div>
                        </div>

                    </div>
                        </Dialog>

            {/* Reject dialog */}
            <Dialog
                header="Reject Report"
                visible={rejectVisible}
                style={{ width: "30vw" }}
                //                      closable={false}
                onHide={() => {
                    setRejectVisible(false)
                    setFallBackApproverLevel('')
                    setFallBackApprover('')
                    setFallBackApproverId('');
                    setRejectValueMsg('')

                    // setVisibleEdit(false);
                }}
                footer={footerContentForReqReject}
            >
                <div className="m-0">
                    {sendMsg && <div className="font-medium text-[18px] text-[#249144] mb-6">Message Sent Successfully</div>}

                    <div className="font-medium text-[18px] mb-3">Select an approver level<span className="text-[red] pl-0.2">*</span></div>
                    <Dropdown
                        value={fallBackApproverLevel}
                        options={approverLevelForReject}
                        onChange={(e) => {
                            getApprover(e.value);
                        }}
                        optionLabel="label"
                        placeholder="Select"
                        className="p-column-filter custDropdown  w-full mb-3"
                    />

                    <div className="font-medium text-[18px] mb-3">Approver<span className="text-[red] pl-0.2">*</span></div>

                    <InputText
                        value={fallBackApprover} disabled
                        placeholder="Auto populate by select approver level"
                        onChange={e => { setFallBackApprover(e.value) }}
                        className="p-column-filter w-full mb-6 mt-3"
                    />

                    {/* <Dropdown
                                    value={fallBackApprover}
                                    options={approversOptions}
                                    onChange={(e) => setFallBackApprover(e.value)}
                                    optionLabel="label"
                                    placeholder="Select"
                                    className="p-column-filter custDropdown w-full mb-6"
                                /> */}

                    <div className="font-medium text-[18px] mb-3 mt-3">Enter the Reason for Rejection<span className="text-[red] pl-0.2">*</span></div>

                    <InputText
                        value={rejectMsgValue}
                        placeholder="Information Missing for  'David', Please review and resubmit."
                        onChange={e => setRejectValueMsg(e.target.value)}
                        className="w-full"
                    />
                </div>
            </Dialog>

        </Layout >
                )
}
            </ReactFullscreen >
        </>

    );
}