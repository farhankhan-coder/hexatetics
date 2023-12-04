

import React, { useState, useEffect, useRef, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { RadioButton } from 'primereact/radiobutton';
// import { ValidateAllRoleExceptSuperadmin, ValidateApproverRole, ValidateInitiatorRole } from "../../../helper/validateRole";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Tag } from "primereact/tag";
// import user1 from "../../../assets/images/user1.svg";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { groupBy, orderBy, range } from "lodash";
import { SelectButton } from 'primereact/selectbutton';
// import {
//   InitiateClassifiedWeeklyAbsenceReport,
//   InitiateClassifiedWeeklyAbsenceReportEmployee,
//   InitiateClassifiedWeeklyAbsenceReportEmployeeDetails,
//   InitiateClassifiedWeeklyAbsenceReportStatus,
//   Employee,
//   Schools,
//   ReportsLog,
//   AbsentCode,
//   PersonalActionForm,

//   TransactionCyclePersonnel,
//   PersonnelActionEmployee
// } from "../../../models";
import moment from "moment";
import Link from 'next/link';
// import { Await, Link, useNavigate } from "react-router-dom";
// import { GetValueFromArray } from "../../../helper/commonfunctions";
import ReactFullscreen from "react-easyfullscreen";
import { reactLocalStorage } from "reactjs-localstorage";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { useReactToPrint } from "react-to-print";
// import "../../../components/printwirformat/main.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from "primereact/toast";
// import NewFormModal from "./NewFormModal";
import EditFormModal from "./EditFormModal";
// import SixperiodAgreement from "../../sixperiod/agreement";
import { Badge } from "primereact/badge";
import { toast } from "react-toastify";
import { Card } from "primereact/card";
import { Timeline } from "primereact/timeline";
// import handleDateSelect from "../../../helper/convertDateIntoPSTFormat";
import { MyAccountTable } from "@/components/service/myaccounttable";
import Editpopup from "@/components/popup/editpopup";
import { USER_TYPES, USER_TYPES_NAMES } from "@/helper/enum";
import { PersonnelActionInitiatorForm } from "@/models";
import Layout from "@/components/layout/layout";
// import { dataURLtoBlob } from "@/components/signature/signatureHelper";
import SignatureDialog from "@/components/signature/SignatureDialog";
import NewFormModal from "./NewFormModal";
// import { handleNotificationsOnStatusChange, handleNotificationsOnStatusChangeforPersonnelAction } from "@/components/actions/notficationActions";


export default function WARInitiator() {
    //SET AWS Configuration
    //   AWS.config.update({
    //     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    //     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    //     region: process.env.REACT_APP_AWS_Region
    //   });

    const [myaccountt, setProducts] = useState([]);
    //   const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState("center");
    const [visibleRight, setVisibleRight] = useState(false);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [personnelActionIsInitiator, setpersonnelActionIsInitiator] = useState(1);
    const [personnelActionIsApprover, setpersonnelActionIsApprover] = useState(0);
    const [personnelActionIsPayroll, setpersonnelActionIsPayroll] = useState(0);
    const [personnelActionIsSuperadmin, setpersonnelActionIsSuperadmin] = useState(0);
    const [weeklyAbsenceReports, setWeeklyAbsenceReports] = useState([]);

    const [financeAnalyst, setFinanceAnalyst] = useState([]);
    const [exicutiveDirector, setExicutiveDirector] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0); // Total number of records
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of records per page
    const [rejectVisible, setRejectVisible] = useState(false);
    const [rejectMsgValue, setRejectValueMsg] = useState("");
    const [sendMsg, setSendMsg] = useState(false);
    const [signatureDialog, setSignatureDialog] = useState(false);
    const [signaturePath, setSignaturePath] = useState(null);
    //   const [signatureFileAwsPath, setSignatureFileAwsPath] = useState(null);
    const [addSignature, setAddSignature] = useState(false);
    // let [events, setEvents] = useState([]);
    const [reportLoading, setReportLoading] = useState(true);
    const [personalActioninitiatorReportList, setPersonalActioninitiatorReportList] = useState();
    const [personalActionReportList, setPersonalActionReportList] = useState();
    const [eduexesecratery, setEduexesecratery] = useState(false);
    //console.log('eduexesecratery --->', eduexesecratery);
    const [selectedhrtech, setSelectedhrtech] = useState(false);
    //console.log('eduexesecratery --->', selectedhrtech);
    const [approvalReportRequestList, setApprovalReportRequest] = useState([]);
    const [payrollRequest, setPayrollRequest] = useState([]);
    const [showStatusPrint, setShowStatusPrint] = useState(false);
    //console.log('payrollRequest: ', personalActionReportList);

    const [weeklyAbsenceReports1, setWeeklyAbsenceReports1] = useState([
        {
            period: "wed Jul 26 -",
            submittedOn: "wed Jul 26",
            Status: "pending",
            remarks: ""
        },
        {
            period: "Thu Jul 27 -",
            submittedOn: "Thu Jul 26",
            Status: "pending",
            remarks: ""
        },
        {
            period: "Thu Jul 27 -",
            submittedOn: "Thu Jul 26",
            Status: "pending",
            remarks: ""
        },
        {
            period: "wed Jul 26 -",
            submittedOn: "wed Jul 26",
            Status: "pending",
            remarks: ""
        },
        {
            period: "wed Jul 26 -",
            submittedOn: "wed Jul 26",
            Status: "pending",
            remarks: ""
        }
    ]);
    const [weeklyAbsenceReportSubmitted, setWeeklyAbsenceReportSubmitted] = useState();
    const [weeklyAbsenceReportApproved, setWeeklyAbsenceReportApproved] = useState();
    const [weeklyAbsenceReportRejected, setWeeklyAbsenceReportRejected] = useState();
    const [weeklyAbsenceReportPending, setWeeklyAbsenceReportPending] = useState();
    const [submitCount, setSubmitCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectCount, setRejectCount] = useState(0);
    const [pendingForApprovalCountForReqReportsCount, setPendingForApprovalCountForReqReports] = useState(0);
    const [approvedCountForReqReportsCount, setApprovedCountForReqReports] = useState(0);
    const [rejectCountForReqReportsCount, setRejectCountForReqReports] = useState(0);
    const [activate, setActivate] = useState("");
    //   const loggedUserId = reactLocalStorage.get("loggedUserId");

    //   console.log('loggedUserId --->', loggedUserId);



    //*state
    const [reportId, setReportId] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState("");
    const [submittedBy, setSubmittedBy] = useState("");
    const [approvedBy, setApprovedBy] = useState("");

    //*List
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeListdetails, setEmployeeListdetails] = useState([]);
    //console.log('employeeListdetails --->', employeeListdetails);
    const [reportEmployeeList, setReportEmployeeList] = useState([]);

    const [users, SetUsersList] = useState([]);
    console.log('users --->', users);
    const [email, setEmail] = useState("");
    const [macthedemail, SetMacthedemail] = useState({});
    //console.log('macthedemail --->', macthedemail);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const genders = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];
    const genderss = [
        { label: 'Elementery', value: 'Elementery' },
        { label: 'Secondary', value: 'Secondary' },
    ];
    const optionsyesorno = ['No', 'Yes'];
    const optionselemorsec = ['Elementery', 'Secondary'];
    const [valueyesno, setValueyesno] = useState();
    const [valueelemsec, setValueelemsec] = useState();
    //console.log('valueelemsec --->', valueelemsec);
    //console.log('valueyesno --->', valueyesno);
    const [reportLogList, SetReportLogList] = useState([]);
    const [printShow, SetPrintShow] = useState(false);
    const [showNewFormModal, SetShowNewFormModal] = useState(false);
    const dt = useRef(null);
    const [filters, setFilters] = useState({
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        pretexts: { value: null, matchMode: FilterMatchMode.EQUALS },
        remark: { value: null, matchMode: FilterMatchMode.CONTAINS },
        personalReportNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formTitle: { value: null, matchMode: FilterMatchMode.CONTAINS },
        location: { value: null, matchMode: FilterMatchMode.CONTAINS },
        actionToBeTaken: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.CONTAINS },
        boardMeetingDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        remark: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });


    const [statuses] = useState(["Pending", 'Pending for Approval Site Admin/ Dept Head', 'Pending for Approval Budget Clerk', 'Pending for Approval Budget Manager', 'Pending for Approval Educational Services Executive Secretary', "Pending for Approval Elementary Education Exe.Secretary", 'Pending for Approval Secondary Education Exe.Secretary', 'Pending for Approval Executive Management', 'Pending for Approval HR Executive Secretary', 'Pending for Approval HR Technician', 'Pending for Approval HR Technician (Payroll)', 'Closed By HR Technician', "Rejected"]);
    const [statusesPayrolls] = useState(['Acknowledged', 'Pending for Acknowledge']);
    const [approverLevelOptions, setApproverLevelOptions] = useState(null);
    //console.log('approverLevelOptions: ', approverLevelOptions);
    const approverLevelTypeDic = { 0: 'Initiator', 1: 'Site Admin/ Dept Head', 2: 'Budget Clerk', 3: 'Budget Manager', 4: 'Educational Services Executive Secretary', 5: 'Executive Management', 6: 'HR Technician' };
    const [approversOptions, setApproversOptions] = useState([]);
    //console.log('approversOptions: ', approversOptions);
    const [fallBackApprover, setFallBackApprover] = useState();
    //console.log('fallBackApprover: ', fallBackApprover);
    const [fallBackApproverLevel, setFallBackApproverLevel] = useState();
    //console.log('fallBackApproverLevel: ', fallBackApproverLevel);

    //   let navigateTo = useNavigate();

    let exedirelemIdemail = "hjayakumar@hexalytics.com"
    let approverHrexectivesecemail = "mfester@gusd.net"
    let payrollemail = "payroll.info@gusd.net"
    let exedirelemeduemail = "breynolds@gusd.net"
    let exedirseceduemail = "ccoulter@gusd.net"
    // let approverHrexectivesecemail = "poojad@hexalytics.com"
    // let payrollemail = "rajiba.tiria@gmail.com"
    // let exedirelemeduemail = "hjayakumar@hexalytics.com"
    // let exedirseceduemail = "bashokkumar@inniveinc.com"

    const [exedirelemIduserId, setexedirelemIduserId] = useState({});
    //console.log('exedirelemIduserId1 --->', exedirelemIduserId);
    const [approverHrexectivesecuserId, setapproverHrexectivesecuserId] = useState({});
    //console.log('exedirelemIduserId2 --->', approverHrexectivesecuserId);
    const [payrolluserId, setpayrolluserId] = useState({});
    const [exedirelemeduuserId, setexedirelemeduuserId] = useState({});
    //console.log('exedirelemeduuserId --->', exedirelemeduuserId);
    const [exedirseceduuserId, setexedirseceduuserId] = useState({});
    //console.log('exedirseceduuserId --->', exedirseceduuserId);
    //console.log('exedirelemIduserId3 --->', payrolluserId);


    const show = position => {
        setPosition(position);
        setVisible(true);
    };
    // "Pending",'Pending for Approval Site Admin/ Dept Head', 'Pending for Approval Budget Clerk', 'Pending for Approval Budget Manager', 'Pending for Approval Educational Services Executive Secretary',"Pending for Approval Elementary Education Exe.Secretary", 'Pending for Approval Secondary Education Exe.Secretary','Pending for Approval Executive Dir of Elementary','Pending for Approval Executive Management ', 'Pending for Approval HR Executive Secretary','Pending for Approval HR Technician (Payroll) ','Closed By HR Technician', "Rejected"
    /* const TaskStatusSL = product => {
      console.log('product: ', product.status);
      switch (product.status) {
        case "Rejected":
          return "danger";
  
        case "Rejected_Editable":
          return "danger";
  
        case "Pending":
          return "warning";
        case "SUBMITTED":
          return "info";
        case "Submitted":
          return "info";
  
        case "Approved":
          return "success";
  
        default:
          return null;
      }
    }; */

    // table configs starts
    const componentRef = useRef();
    const [display, setDisplay] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => setDisplay(false)
    });

    /*  const TaskStatusSLA = product => {
       return <Tag value={product.status} severity={TaskStatusSL(product)}></Tag>;
     }; */

    const statusItemTemplate = option => {
        return <Tag value={option} severity={requestReportStatusOptions(option)} />;
    };
    /********************* sidebar ***************/
    const [InitiateReportssidebar, setinitiateReportssidebar] = useState(false);
    const [ReminderDialog, setreminderDialog] = useState(false);
    const [ReminderData, setreminderData] = useState(null);
    const [editPopup, setEditPopup] = useState(false);
    const [editPopupfromAP, setEditPopupfromAP] = useState(false);
    const [editRowData, setEditRowData] = useState([]);
    const [InitiateReportsfullscreen, setinitiateReportsfullscreen] = useState(false);
    const [requestedreportEdit, setrequestedreportEdit] = useState(false);
    const [payrollreportEditslider, setPayrollreportEditslider] = useState(false);
    const [apprpverdataEdit, setApprpverdataEdit] = useState({});
    const [specificReportDetailsView, setSpecificReportDetailsView] = useState([]);
    const [specificReportDetailsEdit, setSpecificReportDetailsEdit] = useState([]);
    const [checked, setChecked] = useState(false);
    const [checkedSignature, setCheckedSignature] = useState(false);
    const [needMoreApprovals, setNeedMoreApprovals] = useState(false);
    const [signature, setSignature] = useState(true);
    const [showNeedMoreApprovals, setShowNeedMoreApprovals] = useState(false);
    const [requestApprovalConfirmVisible, setRequestApprovalConfirmVisible] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [employeeArray, setEmployeeArray] = useState([]);

    //   useEffect(() => {

    //     if (apprpverdataEdit?.executiveSecretary == loggedUserId) {
    //       setEduexesecratery(true)
    //     }
    //     if (apprpverdataEdit?.hrTechnician == loggedUserId) {
    //       setSelectedhrtech(true)
    //     }
    //   }, [apprpverdataEdit])

    /********************* sidebar ***************/
    //   const fetchAndSetLoggedInUserData = async (userId) => {
    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     var params = {
    //       UserPoolId: awsmobile.aws_user_pools_id,
    //       Limit: 1
    //     };

    // params['Filter'] = "sub ^=\"" + userId + "\""



    const getApproverLevelOptions = async () => {
        //  const approverArray = await getApproverFromPreviousLevels(loggedUserId);
        //console.log('approverArray: ', approverArray);

        const approverOption = [];

        const levelOption = [];

        const fetchPromises = approverArray?.map(async (id, index) => {
            const data = await fetchAndSetLoggedInUserData(id);

            approverOption.push({ value: data.userId, label: data.name });
            levelOption.push({ code: data.name, name: approverLevelTypeDic[index] });
        });

        await Promise.all(fetchPromises);
        setApproversOptions(approverOption);
        setApproverLevelOptions(levelOption.reverse());
        let aprroverLevelName = levelOption?.filter(item => item["name"] == approverLevelTypeDic[approverArray.length - 1])
        setFallBackApproverLevel({ code: aprroverLevelName?.[0]?.code, name: approverLevelTypeDic[approverArray.length - 1] });
        let initialfallBackApprover = approverOption?.filter(item => item["label"] == approverLevelTypeDic[approverArray.length - 1])
        setFallBackApprover(initialfallBackApprover?.[0]?.value);
    }
    const uploadSignature = async (signature) => {

        const fileName = 'profile/' + loggedInUserData?.userId ?? loggedUserId + '/signature.png';

        //console.log("fileName", signature);

        const blob = await dataURLtoBlob(signature);

        try {
            // toast.loading('Uploading please wait...');
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
            console.log('Error uploading file: ', error);
        }
        return fileName;
    }

    const handleSignatureSelection = async (image) => {
        setSignatureDialog(false);
        setSignatureFileAwsPath(null);
        const signatureFilePath = await uploadSignature(image);
        if (signatureFilePath.trim() !== '') {
            setSignaturePath(signatureFilePath);
            // loadSignatureFile(signatureFilePath);
            setSignatureFileAwsPath(image);
        } else {
            signatureFilePath(null);
        }
    }

    const loadSignatureFile = async (filePath) => {
        let file = null;
        try {

            await Storage.get(filePath)
                .then(result => {
                    //console.log(result);
                    file = result;
                });

            //console.log("signature", file);
            if (file) {
                setSignatureFileAwsPath(file);
            }
        } catch (e) {
            setSignatureDialog(true);
        }

    }

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
    const proccessedApproverOptions = useMemo(() => {
        const options = approversOptions?.filter(item => item["label"] == fallBackApproverLevel.code);
        setFallBackApprover(options?.[0]?.value);
        return options;
    }, [approversOptions, fallBackApproverLevel]);

    useEffect(() => {
        if (apprpverdataEdit?.id) {
            getApproverLevelOptions();
        }
    }, [apprpverdataEdit])
    useEffect(() => {
        if (addSignature) {
            handleAddSignature();
        }


    }, [addSignature])
    const onClickRequestedReportEditPopUp = async requestData => {
        //console.log('requestData --->', requestData);

        //fetch user data
        var newRes = [];
        let userRole = "",
            userName = "",
            sub = "",
            userEmail = "",
            userCode = "";
        users.forEach((user, i) => {
            userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
            userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
            sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
            userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
            userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;

            let obj = {
                userId: sub,
                name: userName,
                email: userEmail,
                usercode: userCode,
                role:
                    userRole === USER_TYPES.SUPERADMIN
                        ? USER_TYPES_NAMES.SA
                        : userRole === USER_TYPES.ADMIN
                            ? USER_TYPES_NAMES.A
                            : userRole === USER_TYPES.APPROVER
                                ? USER_TYPES_NAMES.AP
                                : userRole === USER_TYPES.PAYROLL
                                    ? USER_TYPES_NAMES.P
                                    : USER_TYPES_NAMES.I
            };
            newRes.push(obj);
        });

        //if logged user is fifthApprover(HR Director) them show Need More Approval.
        try {
            const particularReportMetaData = await fetchInitiateReport(requestData.id)

            //console.log("particularReportMetaDataparticularReportMetaData:-", particularReportMetaData);
            if (particularReportMetaData) {
                if (particularReportMetaData.executiveManagement === loggedUserId) {
                    setShowNeedMoreApprovals(true);
                }
            }
        } catch (err) {
            console.log("Error when check", err);
        }
        //---Start Approval Status-----
        //get particular report id data from transaction cycle.
        let approvalFinalData = [];
        try {
            const particularReportTransactionCycleResponse = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { report_Id: { eq: requestData.id } },
                { field: "createdAt", direction: "desc" },
                1000,
                'listTransactionCyclePersonnels'
            )


            if (particularReportTransactionCycleResponse) {
                //get name of user from 'to_Employee_Id'
                for (let i = 0; i < particularReportTransactionCycleResponse.length; i++) {
                    let empName = "",
                        empCode = "";

                    for (let j = 0; j < newRes.length; j++) {
                        let currentItem = newRes[j];
                        if (currentItem.userId == particularReportTransactionCycleResponse[i].to_Employee_Id) {
                            empName = currentItem.name;
                            empCode = currentItem.usercode;
                            break;
                        }
                    }

                    let obj = {
                        empName: empName,
                        empCode: empCode,
                        status:
                            particularReportTransactionCycleResponse[i].status === "Open"
                                ? "Pending For Approval"
                                : particularReportTransactionCycleResponse[i].status
                    };

                    approvalFinalData.push(obj);
                }
            }
        } catch (err) {
            console.log("Error in onClickInitiateRequestEditPopUp", err);
        }
        // console.log('approvalFinalData --->', requestData.employeeId);
        // console.log('approvalFinalData --->', approvalFinalData);
        //---End Approval Status-------
        let empData = [];

        for (let i = 0; i < newRes.length; i++) {
            let currentItem = newRes[i];
            if (currentItem?.usercode === requestData.employeeId) {
                //enable acknowledge for approver
                // console.log('currentItem22 --->', currentItem);
                //setEnableAprrover(true)
                empData.push(currentItem);
                break;
            }
        }
        //---------------

        //console.log("APPPempData:-", empData);
        //check logged user equal to first Approver which employee then open teacher acknowledge popup
        try {
            const particularReportResponse = await fetchInitiateReport(requestData.id)


            if (particularReportResponse) {
                if (particularReportResponse.id === loggedUserId) {
                    setrequestedreportEdit(true);
                } else {
                    setrequestedreportEdit(true);
                }
            }
        } catch (err) {
            console.log("Error in onRequestEdit popup Open :-", err);
        }
        //check specific report =>transaction cycle length is greter than 3
        try {
            //check for reviewresubmitted in transaction cycle
            let PersonnelActionTransactionCycleLate = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { report_Id: { eq: requestData.id } },
                { field: "createdAt", direction: "desc" },
                1000,
                'listTransactionCyclePersonnels'
            )

            //1.fetch those request which initiate by logged user
            const PersonnelActionTransactionCycle = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { report_Id: { eq: requestData.id } },
                null,
                1000,
                'listTransactionCyclePersonnels'
            )

            //loop to get last status

            if (PersonnelActionTransactionCycle.length >= 3) {
                let countCycle = false;
                for (let i = 0; i < 3; i++) {
                    if (PersonnelActionTransactionCycleLate[i].status === "ReviewedResubmitted") {
                        if (i === 2) {
                            setNeedMoreApprovals(true);
                            countCycle = true;
                        } else {
                            setNeedMoreApprovals(false);
                            setSignature(false);
                            setCheckedSignature(true);
                        }
                    }
                }

                let reviewList = PersonnelActionTransactionCycleLate.filter(
                    item => item.status === "ReviewedResubmitted"
                );
                if (reviewList.length >= 1) {
                    //setSignature(false)
                    //setCheckedSignature(true)
                }

                if (countCycle) {
                    setSignature(true);
                    setCheckedSignature(false);
                }
            }
        } catch (err) {
            console.log("ERROR in request Edit function");
        }

    }
    const fetchUser = async (userId) => {
        const cognito = new AWS.CognitoIdentityServiceProvider();
        let user;
        if (userId) {
            try {
                user = await cognito
                    .adminGetUser({
                        UserPoolId: awsmobile.aws_user_pools_id,
                        Username: userId
                    })
                    .promise();
            } catch (e) {
                console.log("Error is ", e);
            }
        }
        return user;
    }
    // const RemainderFunction = async (rowData) => {
    //     setreminderDialog(false);
    //     //console.log('rowData --->', rowData);
    //     const result = await API.graphql(
    //         graphqlOperation(queries.getTransactionCyclePersonnel,
    //             { id: rowData.transctionCycleId }
    //         )
    //     );
    //     //console.log('rowDataresult --->', result);
    //     const reportDetails = await buildReportDetails(result?.data?.getTransactionCyclePersonnel, rowData.formTitle, "Open", rowData.initiator, rowData.deptHead, loggedUserId, result?.data?.getTransactionCyclePersonnel?.to_Employee_Id);
    //     // const reportDetails = await buildReportDetails(result?.data?.getTransactionCyclePersonnel, rowData.formTitle, "Approved", rowData.initiator, rowData.deptHead, loggedUserId, rowData?.budgetClerk != null || rowData?.budgetClerk != undefined ? rowData?.budgetClerk : rowData?.executiveSecretary);
    //     //console.log('rowDatareportDetails --->', reportDetails);
    //     await handleNotificationsOnStatusChangeforPersonnelAction("REMINDER", reportDetails, "PERSONNEL_ACTION_FORM");
    //     setreminderDialog(false);
    // }
    const selectedEmployeeDetails = async requestData => {
        try {
            const employeeDetails = await fetchPaginatedRecords(
                queries.listPersonnelActionEmployees,
                { formId: { eq: requestData.id } },
                { field: "updatedAt", direction: "desc" },
                1000,
                'listPersonnelActionEmployees'
            )

            setEmployeeArray(employeeDetails)
            //console.log('employeeDetails --->', employeeDetails);

        } catch (err) {
            console.log("Error when check", err);
        }
        var newRes = [];
        let userRole = "",
            userName = "",
            sub = "",
            userEmail = "",
            userCode = "";
        //console.log("APPP user4:-", users);
        users.forEach((user, i) => {
            userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
            userName = user.Attributes.find(attr => attr.Name === "name")?.Value;
            sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
            userEmail = user.Attributes.find(attr => attr.Name === "email")?.Value;
            userCode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;

            let obj = {
                userId: sub,
                name: userName,
                email: userEmail,
                usercode: userCode,
                role:
                    userRole === USER_TYPES.SUPERADMIN
                        ? USER_TYPES_NAMES.SA
                        : userRole === USER_TYPES.ADMIN
                            ? USER_TYPES_NAMES.A
                            : userRole === USER_TYPES.APPROVER
                                ? USER_TYPES_NAMES.AP
                                : userRole === USER_TYPES.PAYROLL
                                    ? USER_TYPES_NAMES.P
                                    : USER_TYPES_NAMES.I
            };
            newRes.push(obj);
        });

        // console.log("APPP newResnewRes:-", newRes);

        //---Start Approval Status-----
        //get particular report id data from transaction cycle.
        let approvalFinalData = [];
        let formHistoryviewData = [];
        let formHistoryFinalData = [];
        try {
            let particularReportTransactionCycleResponse = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { report_Id: { eq: requestData.id } },
                { field: "createdAt", direction: "desc" },
                1000,
                'listTransactionCyclePersonnels'
            )
            particularReportTransactionCycleResponse = particularReportTransactionCycleResponse.reverse()

            if (particularReportTransactionCycleResponse) {
                //get name of user from 'to_Employee_Id'
                for (let i = 0; i < particularReportTransactionCycleResponse.length; i++) {
                    let empName = "",
                        empCode = "";

                    for (let j = 0; j < newRes.length; j++) {
                        let currentItem = newRes[j];
                        if (currentItem.userId == particularReportTransactionCycleResponse[i].to_Employee_Id) {
                            empName = currentItem.name;
                            empCode = currentItem.usercode;
                            break;
                        } else {
                            let extraUser = await fetchUser(particularReportTransactionCycleResponse[i].to_Employee_Id);
                            empName = extraUser?.UserAttributes?.find(attr => attr.Name === "name")?.Value || "";
                            empCode = extraUser?.UserAttributes?.find(attr => attr.Name === "custom:userCode")?.Value || "";


                        }

                    }
                    // Input date string
                    const inputDateString = particularReportTransactionCycleResponse[i].createdAt;

                    const indianDate = new Date(inputDateString); // Example date and time in Indian Standard Time (IST)


                    // Format the date and time in Pacific Time Zone with the time zone abbreviation
                    const pacificDate = indianDate.toLocaleString("en-US", {
                        timeZone: "America/Los_Angeles",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZoneName: "short",
                    });
                    let secondApprover = requestData.budgetClerk ? requestData.budgetClerk : 0;
                    let thirdApprover = requestData.budgetManager ? requestData.budgetManager : 0;
                    let executivedirelemId = requestData.executivedirelemId ? requestData.executivedirelemId : 0;
                    let elemorsec = requestData.assignelemorsec ? requestData.assignelemorsec : 0;
                    let teacher = requestData.deptHead ? requestData.deptHead : 0;
                    let payroll = payrolluserId?.userId;
                    let psayesorno = requestData.psayesorno ? requestData.psayesorno : 0;
                    let fourthApprover = requestData.executiveSecretary ? requestData.executiveSecretary : 0;
                    let fifthApprover = requestData.executiveManagement;
                    let sixthApprover = requestData.hrTechnician;

                    let exedirelemId = exedirelemIduserId?.userId
                    let approverHrexectivesec = approverHrexectivesecuserId?.userId
                    let toEmployeeId = particularReportTransactionCycleResponse[i].to_Employee_Id

                    let designation = "";
                    switch (toEmployeeId) {
                        case teacher:
                            designation = "Site Admin/ Dept Head";
                            break;
                        //reporting manager.
                        case secondApprover:
                            designation = "Budget Clerk";

                            break;
                        case thirdApprover:
                            designation = "Budget Manager";

                            break;
                        case fourthApprover:
                            designation = "Educational Services Executive Secretary";

                            break;
                        case executivedirelemId:
                            if (elemorsec == "Elementery") {
                                designation = "Elementary Education Exe.Secretary";
                            } else {
                                designation = "Secondary Education Exe.Secretary";
                            }
                            break;
                        case exedirelemId:
                            designation = "Executive Dir of Elementary ";
                            break;
                        case fifthApprover:
                            designation = "Executive Management";
                            break;
                        case sixthApprover:
                            designation = "HR Technician";
                            break;
                        case approverHrexectivesec:
                            designation = "HR Executive Secretary";
                            break;
                        case payroll:
                            designation = "HR Technician (Payroll)";
                            break;
                        // case financial:
                        //   designation = "Financial Analyst";

                        //   break;
                        // case executive:
                        //   designation = "Executive Director";

                        //   break;
                        default:
                            break;
                    }
                    const cognito = new AWS.CognitoIdentityServiceProvider();
                    if (i == 0) {
                        let initiatorUsers;

                        try {
                            //get initiator's data using its id
                            initiatorUsers = await cognito.adminGetUser({
                                UserPoolId: awsmobile.aws_user_pools_id,
                                Username: requestData.initiator,
                            }).promise();
                        } catch (e) {
                            //console.log(e)
                        }
                        //console.log('initiatorUsers --->', initiatorUsers);
                        let userFirstName1 = await GetValueFromArray(initiatorUsers.UserAttributes, "custom:firstName")
                        let userLastName1 = await GetValueFromArray(initiatorUsers.UserAttributes, "custom:lastName")
                        let userCodeEmp1 = await GetValueFromArray(initiatorUsers.UserAttributes, "custom:userCode")
                        let initiatorFullName = userFirstName1 + " " + userLastName1;


                        let obj = {
                            empName: initiatorFullName,
                            designation: 'Initiator',
                            empCode: userCodeEmp1,
                            appStatus: 'Submitted',
                            approvedDate: particularReportTransactionCycleResponse[i].createdAt ? handleDateSelect(particularReportTransactionCycleResponse[i].createdAt) : null
                        }

                        formHistoryviewData.push(obj);
                    }

                    let obj = {
                        empName: empName,
                        empCode: empCode,
                        appStatus: particularReportTransactionCycleResponse[i].status === "Open"
                            ? "Pending For Approval" + designation
                            : particularReportTransactionCycleResponse[i].status,

                        status:
                            particularReportTransactionCycleResponse[i].status === "Open"
                                ? "Pending For Approval"
                                : particularReportTransactionCycleResponse[i].status,
                        // approvedDate: moment(particularReportTransactionCycleResponse[i].createdAt).format("MM/DD/YYYY HH-mm")
                        pretexts: requestData?.pretexts,
                        approvedDate: pacificDate,
                        designation: designation,

                    };
                    //form history remark
                    if (particularReportTransactionCycleResponse[i].status === "Rejected") {
                        let obj = {
                            empName: empName,
                            remarkType: "Rejected",
                            empRemark: particularReportTransactionCycleResponse[i].remark
                        };


                    }
                    // formHistoryFinalData.push(obj);
                    approvalFinalData.push(obj);
                }

            }
        } catch (err) {
            console.log("Error in onClickInitiateRequestViewPopup", err);
        }
        formHistoryFinalData = formHistoryviewData.concat(approvalFinalData)
        //console.log('formHistoryviewData --->', formHistoryviewData);
        //---End Approval Status-------

        let empData = [];

        for (let i = 0; i < newRes.length; i++) {
            const currentItem = newRes[i];

            if (currentItem.userId === requestData.EmployeeId) {
                empData.push(currentItem);
                break;
            }
        }
        //---------------

        //set Data for View Popup
        let obj = {
            formTitle: requestData?.formTitle,
            pretexts: requestData?.pretexts,
            remark: requestData.remark,
            type: requestData.type,
            personalReportNo: requestData.personalReportNo,
            location: requestData.location,
            actionToBeTaken: requestData.actionToBeTaken,
            boardMeetingDate: requestData.boardMeetingDate,
            designation: requestData.designation,
            formHistoryviewData: formHistoryFinalData,
            approvalFinalData: approvalFinalData
        };
        setSpecificReportDetailsView(obj);
    }
    const requestedreportaction = row => {
        //console.log('row: ', row);

        return (
            // <>
            //   <div className="flex gap-2 justify-center">
            //     <div className="cursor-pointer">
            //       <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
            //     </div>
            //     <div className="cursor-pointer" onClick={() => setrequestedreportEdit(true)}>
            //       <i className="gusd-edit text-[#667085] text-[20px] font-meduim"></i>
            //     </div>
            //   </div>
            // </>
            <div className="flex justify-center w-full gap-2">
                {row.status === "Pending for Approval" || row.status === "Rejected_Editable" ? (
                    <Link
                        href=""
                        className="py-2 px-2.5"
                        // onClick={() => { setVisibleRight(true); onClickPopup(row); }}
                        onClick={() => {
                            selectedEmployeeDetails(row)
                            setApprpverdataEdit(row);
                            onClickRequestedReportEditPopUp(row);

                        }}
                    >
                        <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
                    </Link>
                ) : row.status === "Approved" ? (
                    <Link href="" className="py-2 px-2.5"
                        onClick={() => { selectedEmployeeDetails(row); setApprpverdataEdit(row); setinitiateReportssidebar(true); }}
                    >
                        <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                    </Link>
                ) : row.status === "Rejected" ? (
                    <Link href="" className="py-2 px-2.5"
                        onClick={() => { selectedEmployeeDetails(row); setApprpverdataEdit(row); setinitiateReportssidebar(true); }}
                    >
                        <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                    </Link>
                ) : <Link href="" className="py-2 px-2.5"
                    onClick={() => { selectedEmployeeDetails(row); setApprpverdataEdit(row); setinitiateReportssidebar(true); }}
                >
                    <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                </Link>}
            </div>

        );
    };

    const alljobactionContent = row => {
        //console.log('row.status --->', row)
        return (
            <div className="flex justify-center items-center w-full gap-2">
                <div>
                    {/* Other content for the "Action" column here */}
                    {/* {deleteButton(row)} */}
                </div>
                {/* <div className="cursor-pointer" onClick={() => { 
        }}>
          <i className="gusd-close-circle text-[#667085] text-[20px] font-meduim"></i>
        </div> */}

                {/* <div className="flex justify-center w-full gap-2">
                    {row.pstatus === "Submitted" || row.pstatus === "Pending" || row.status === "Rejected_Editable" ? (
                        <Link
                            href="#"
                            className="py-2 px-2.5"
                            onClick={() => {
                                setEditPopupfromAP(false)
                                setEditRowData(row)
                                setEditPopup(true);
                            }}
                        >
                            <i className="gusd-edit text-[#667085] text-[20px] font-meduim"></i>
                        </Link>
                    )
                        :
                        <Link
                            href="#"
                            className="py-2 px-2.5 cursor-pointer"
                            onClick={() => {
                                selectedEmployeeDetails(row)
                                setApprpverdataEdit(row);
                                setinitiateReportssidebar(true);

                            }}
                        >
                            <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                        </Link>

                    }
                    {row.status === "Submitted" && row.pretexts != "Pending for Approval" && row.pstatus != "Closed" || row.status === "Rejected_Editable" ?
                        <Link
                            href="#"
                            className="py-2 px-2.5 pt-2"
                            onClick={() => {
                                setreminderDialog(true)
                                setreminderData(row)
                            }}
                        >
                            <i className="gusd-notification text-[#667085] text-[20px] xl:text-[1.250vw]"></i>
                        </Link> : <Link
                            href="#"
                            className="py-2 px-5"></Link>}
                </div> */}
            </div>
        );
    };

    const payrollReportAction = row => {
        return (
            <div className="flex justify-center w-full gap-2">
                {row.status === "Pending for Acknowledge" ? (
                    <Link href="" className="py-2 px-2.5"
                        onClick={() => {
                            // onClickPayrollReportEditPopUp(row);
                            setApprpverdataEdit(row);
                            // setrequestedreportEdit(true);
                            setPayrollreportEditslider(true)
                            selectedEmployeeDetails(row)

                        }}
                    >
                        <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
                    </Link>
                ) : row.status === "Acknowledged" ? (
                    <Link href="" className="py-2 px-2.5"
                        onClick={() => {
                            // onClickRequestedReportViewPopup(row, "right");
                            selectedEmployeeDetails(row)
                            setApprpverdataEdit(row);
                            setinitiateReportssidebar(true);

                        }}
                    >
                        <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                    </Link>
                ) : // row.status === 'Rejected' ?
                    //     <Link href='' className="py-2 px-2.5" onClick={() => onClickRequestedReportViewPopup(row, 'right')}><i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i></Link> :
                    null}
            </div>
        );
    };
    //* onclick popup
    const onClickPopup = async requestData => {
        setReportId(requestData.id);
        loadReportLogs(requestData.id);
        let fromDate = moment(requestData.from_date, "YYYY-MM-DD").format("MM/DD/YYYY");
        setFromDate(fromDate);
        let toDate = moment(requestData.to_date, "YYYY-MM-DD").format("MM/DD/YYYY");
        setToDate(toDate);
        setSchoolName(requestData.schoolName);
        setStatus(requestData.status);

        if (requestData.user_id !== null) {
            let submittedBy = getUserResponse(requestData.user_id);
            setSubmittedBy(submittedBy);
        }

        if (requestData.approver_by === null && requestData.payroll_by === null) {
            setApprovedBy("-");
        } else if (requestData.status === "Approved") {
            if (requestData.payroll_by !== null) {
                let approvedBy = getUserResponse(requestData.payroll_by);
                setApprovedBy(approvedBy);
            } else if (requestData.approver_by !== null) {
                let approvedBy = getUserResponse(requestData.approver_by);
                setApprovedBy(approvedBy);
            }
        }

        if (requestData.id) {
            let newResponse = [];
            var employeeResponses = await DataStore.query(InitiateClassifiedWeeklyAbsenceReportEmployee, c =>
                c.initiate_classified_weekly_absence_report_id.eq(requestData.id)
            );
            if (employeeResponses.length > 0) {
                for (let index = 0; index < employeeResponses.length; index++) {
                    const item = employeeResponses[index];
                    let employeeName;
                    let substitutedEmployeeName;

                    if (item.employee_id) {
                        let employeeData = await getEmployeeResponse(item.employee_id);
                        if (employeeData) {
                            employeeName = employeeData.employee_name;
                        } else {
                            employeeName = "-";
                        }
                    } else {
                        employeeName = "-";
                    }

                    var employeeDetailsResponses = await DataStore.query(
                        InitiateClassifiedWeeklyAbsenceReportEmployeeDetails,
                        c => c.initiate_classified_weekly_absence_report_employee_id.eq(item.id)
                    );

                    for (let i = 0; i < employeeDetailsResponses.length; i++) {
                        const detailItem = employeeDetailsResponses[i];

                        let substitutedEmployeeName = "";
                        if (detailItem.substitute_emp_id) {
                            let substituteEmployeeData = await getEmployeeResponse(detailItem.substitute_emp_id);
                            if (substituteEmployeeData) {
                                substitutedEmployeeName = substituteEmployeeData.employee_name;
                            } else {
                                substitutedEmployeeName = "-";
                            }
                        } else {
                            substitutedEmployeeName = "-";
                        }

                        let absentCodeName = "";
                        let absentCodeResponses = await DataStore.query(AbsentCode, detailItem.absent_code_id);

                        if (absentCodeResponses) {
                            absentCodeName = absentCodeResponses.code;
                        } else {
                            absentCodeName = "-";
                        }

                        let absent_date = moment(detailItem.absent_date).format("MM/DD/YYYY");

                        newResponse.push({
                            employeeName: employeeName,
                            absent_date: absent_date,
                            absent_code_id: absentCodeName,
                            substitutedEmployeeName: substitutedEmployeeName,
                            partial_hour: detailItem.partial_hour,
                            partial_min: detailItem.partial_min
                        });
                    }
                }

                setReportEmployeeList(newResponse);
            } else {
                setReportEmployeeList([]);
            }
        }
    };

    const toggleActive = () => {
        setActivate(activate === "actives" ? "" : "actives");
    };

    //   async function onLoad() {
    //     try {
    //       await Auth.currentSession();
    //       if (!ValidateAllRoleExceptSuperadmin()) {
    //         userHasAuthenticated(false);
    //       }
    //     } catch (e) {
    //       userHasAuthenticated(false);
    //     }
    //   }

    //*get getEmployeeResponse
    const getEmployeeResponse = id => {
        let _employeeList = [...employeeList];
        var returnRecord = _employeeList.find(o => o.id === String(id));
        if (returnRecord !== null && returnRecord !== undefined) {
            return returnRecord;
        } else {
            return null;
        }
    };
    const getusername = async (request_id) => {
        const cognito = new AWS.CognitoIdentityServiceProvider();
        let user;
        if (request_id) {
            try {
                user = await cognito
                    .adminGetUser({
                        UserPoolId: awsmobile.aws_user_pools_id,
                        Username: request_id
                    })
                    .promise();
            } catch (e) {
                console.log("Error is ", e);
            }
        }
        return user
    }

    const getName = async (id) => {
        let userdetails = await getusername(id)
        // console.log('userdetails --->', userdetails);
        let name = userdetails?.UserAttributes?.find(attr => attr.Name === "custom:firstName")?.Value
        // console.log('name --->', name);

        return name
    }

    // console.log("aaaa", getName(payrolluserId?.userId))
    function parseEmployeeName(employeeName) {
        try {
            return JSON.parse(employeeName);
        } catch (error) {
            return employeeName;
        }
    }

    function parseBudgetCode(budgetCode) {
        try {
            return JSON.parse(budgetCode);
        } catch (error) {
            return [budgetCode];
        }
    }
    function convertBudgetCode(object) {
        if (object.budgetCode) {
            if (typeof object.budgetCode === 'string') {
                // If budgetCode is a string, check if it's a JSON array string
                try {
                    const parsedArray = JSON.parse(object.budgetCode);
                    if (Array.isArray(parsedArray)) {
                        // If it's a valid JSON array, join its elements with commas
                        object.budgetCode = parsedArray.join('-');
                    }
                } catch (error) {
                    // Ignore the error if parsing fails
                }
            } else if (Array.isArray(object.budgetCode)) {
                // If budgetCode is an array, join its elements with commas
                object.budgetCode = object.budgetCode.join('-');
            }
        }
    }
    function convertPositionTo(arr) {
        arr.forEach(obj => {
            if (obj.positionTitleTo) {
                obj.positionTitleTo = obj.positionTitleTo.replace(/\n/g, ' '); // Replace newline with space
            }
            if (obj.positionTitleFrom) {
                obj.positionTitleFrom = obj.positionTitleFrom.replace(/\n/g, ' '); // Replace newline with space
            }
        });

        return arr;
    }
    const exportFilteredDataToCSV = async (fileName) => {
        // dt.current.exportCSV();

        let dataToExport = [];
        if (activeIndex === 0) {
            const Forms = personalActionReportList
            console.log('dataToExport --->', Forms);

            const allEmployees = await DataStore.query(
                PersonnelActionEmployee,
                Predicates.ALL,
                {
                    sort: s => s.updatedAt(SortDirection.ASCENDING)
                }
            );

            dataToExport = allEmployees
                .filter(employee => Forms.some(form => form.id === employee.formId))
                .map(employee => {
                    const form = Forms.find(form => form.id === employee.formId);
                    return { ...form, ...employee };
                });
            dataToExport = dataToExport.flatMap(item => {
                const employeeNames = parseEmployeeName(item.employeeName);
                if (Array.isArray(employeeNames)) {
                    return employeeNames.map((employeeName, index) => ({
                        ...item,
                        employeeName,
                    }));
                } else {
                    return [{ ...item, employeeNames }];
                }
            });
            dataToExport = dataToExport.map((object) => {
                const clonedObject = { ...object }; // Clone the object to avoid modifying the original
                convertBudgetCode(clonedObject);
                return clonedObject;
            });
            dataToExport = convertPositionTo(dataToExport)
            dataToExport = await Promise.all(dataToExport.map(async (obj, i) => {
                const [
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    assignelemorsec,
                    executivedirelemId,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec
                ] = await Promise.all([
                    getName(obj?.budgetClerk),
                    getName(obj?.budgetManager),
                    getName(obj?.executiveManagement),
                    getName(obj?.deptHead),
                    getName(obj?.executiveSecretary),
                    getName(obj?.hrTechnician),
                    getName(obj?.assignelemorsec),
                    getName(obj?.executivedirelemId),
                    getName(obj?.psayesorno),
                    getName(payrolluserId?.userId),
                    getName(exedirelemIduserId?.userId),
                    getName(approverHrexectivesecuserId?.userId)
                ]);

                return {
                    ...obj,
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec: psayesorno == null ? "-" : approverHrexectivesec,
                    siNo: i + 1,
                    psayesno: psayesorno == null ? "NO" : "YES",
                    elemEdu: obj.assignelemorsec == "Elementery" ? executivedirelemId : null,
                    secEdu: obj.assignelemorsec == "Secondary" ? executivedirelemId : null,
                };
            }));
            //console.log('dataToExport --->', dataToExport);
        }
        if (activeIndex === 1) {
            const Forms = approvalReportRequestList

            const allEmployees = await DataStore.query(
                PersonnelActionEmployee,
                Predicates.ALL,
                {
                    sort: s => s.updatedAt(SortDirection.ASCENDING)
                }
            );

            dataToExport = allEmployees
                .filter(employee => Forms.some(form => form.id === employee.formId))
                .map(employee => {
                    const form = Forms.find(form => form.id === employee.formId);
                    return { ...form, ...employee };
                });
            dataToExport = dataToExport.flatMap(item => {
                const employeeNames = parseEmployeeName(item.employeeName);
                if (Array.isArray(employeeNames)) {
                    return employeeNames.map((employeeName, index) => ({
                        ...item,
                        employeeName,
                    }));
                } else {
                    return [{ ...item, employeeNames }];
                }
            });
            dataToExport = dataToExport.map((object) => {
                const clonedObject = { ...object }; // Clone the object to avoid modifying the original
                convertBudgetCode(clonedObject);
                return clonedObject;
            });
            dataToExport = convertPositionTo(dataToExport)
            dataToExport = await Promise.all(dataToExport.map(async (obj, i) => {
                const [
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    assignelemorsec,
                    executivedirelemId,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec
                ] = await Promise.all([
                    getName(obj?.budgetClerk),
                    getName(obj?.budgetManager),
                    getName(obj?.executiveManagement),
                    getName(obj?.deptHead),
                    getName(obj?.executiveSecretary),
                    getName(obj?.hrTechnician),
                    getName(obj?.assignelemorsec),
                    getName(obj?.executivedirelemId),
                    getName(obj?.psayesorno),
                    getName(payrolluserId?.userId),
                    getName(exedirelemIduserId?.userId),
                    getName(approverHrexectivesecuserId?.userId)
                ]);

                return {
                    ...obj,
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec: psayesorno == null ? "-" : approverHrexectivesec,
                    siNo: i + 1,
                    psayesno: psayesorno == null ? "NO" : "YES",
                    elemEdu: obj.assignelemorsec == "Elementery" ? executivedirelemId : null,
                    secEdu: obj.assignelemorsec == "Secondary" ? executivedirelemId : null,
                };
            }));
            //console.log('dataToExport --->', dataToExport);

        }
        if (InitiateReportssidebar == true || InitiateReportsfullscreen == true) {
            const Forms = [apprpverdataEdit]

            const allEmployees = await DataStore.query(
                PersonnelActionEmployee,
                Predicates.ALL,
                {
                    sort: s => s.updatedAt(SortDirection.ASCENDING)
                }
            );
            dataToExport = allEmployees
                .filter(employee => Forms.some(form => form.id === employee.formId))
                .map(employee => {
                    const form = Forms.find(form => form.id === employee.formId);
                    return { ...form, ...employee };
                });
            dataToExport = dataToExport.flatMap(item => JSON.parse(item.employeeName).map(employeeName => ({
                ...item,
                employeeName,  // Set the current employeeName
                budgetCode: JSON.parse(item.budgetCode).join(','),  // Convert budgetCode array to comma-separated string
            })));
            //console.log('allEmployees --->', dataToExport);

            dataToExport = await Promise.all(dataToExport.map(async (obj, i) => {
                const [
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    assignelemorsec,
                    executivedirelemId,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec
                ] = await Promise.all([
                    getName(obj?.budgetClerk),
                    getName(obj?.budgetManager),
                    getName(obj?.executiveManagement),
                    getName(obj?.deptHead),
                    getName(obj?.executiveSecretary),
                    getName(obj?.hrTechnician),
                    getName(obj?.assignelemorsec),
                    getName(obj?.executivedirelemId),
                    getName(obj?.psayesorno),
                    getName(payrolluserId?.userId),
                    getName(exedirelemIduserId?.userId),
                    getName(approverHrexectivesecuserId?.userId)
                ]);

                return {
                    ...obj,
                    budgetClerk,
                    budgetManager,
                    executiveManagement,
                    deptHead,
                    executiveSecretary,
                    hrTechnician,
                    psayesorno,
                    payroll,
                    exedirelemId,
                    approverHrexectivesec: psayesorno == null ? "-" : approverHrexectivesec,
                    siNo: i + 1,
                    psayesno: psayesorno == null ? "NO" : "YES",
                    elemEdu: obj.assignelemorsec == "Elementery" ? executivedirelemId : null,
                    secEdu: obj.assignelemorsec == "Secondary" ? executivedirelemId : null,
                };
            }));
            //console.log('dataToExport --->', dataToExport);
        }
        const columnMappings = [
            { name: "SI#", property: "siNo" },
            { name: "Form Title", property: "formTitle" },
            { name: "Submitted On", property: "createdAt" },
            { name: "Location", property: "location" },
            { name: "Action to be Taken", property: "actionToBeTaken" },
            { name: "Type", property: "type" },
            { name: "Personnel Report No", property: "personalReportNo" },
            { name: "Board Meeting Date", property: "boardMeetingDate" },
            // { name: "Employee ID", property: "employeeId" },
            { name: "Employee Name", property: "employeeName" },
            { name: "Position Title- From", property: "positionTitleFrom" },
            { name: "Position Title- To", property: "positionTitleTo" },
            { name: "From Date", property: "effectiveDatesFrom" },
            { name: "To Date", property: "effectiveDatesTo" },
            { name: "Salary Rate", property: "salaryRate" },
            { name: "not to exceed", property: "rateofPay" },
            // { name: "Reason", property: "reason" },
            // { name: "Funding Source", property: "fundingSource" },
            // { name: "Account Number", property: "accountNo" },
            { name: "Budget Code", property: "budgetCode" },
            { name: "Dept Head", property: "deptHead" },
            { name: "Budget Clerk", property: "budgetClerk" },
            { name: "Budget Manager", property: "budgetManager" },
            { name: "Ed Services Executive Secretary", property: "executiveSecretary" },
            { name: "Elementary Education", property: "elemEdu" },
            { name: "Secendory Education", property: "secEdu" },
            { name: "Executive Director of Elementary Education", property: "exedirelemId" },
            { name: "Executive Management", property: "executiveManagement" },
            { name: "HR Tech", property: "hrTechnician" },
            { name: "Include PSA?", property: "psayesno" },
            { name: "HR Executive Secretary", property: "approverHrexectivesec" },
            { name: "Payroll", property: "payroll" }
        ];

        const csvData = convertArrayOfObjectsToCSV(dataToExport, columnMappings);
        //console.log('csvData --->', csvData);
        downloadCSV(csvData, fileName);
    };

    const downloadCSV = async (data, filename) => {
        let datas = await data
        const blob = new Blob([datas], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    const convertArrayOfObjectsToCSV = async (data, columnMappings) => {
        const csvRows = [columnMappings.map(mapping => mapping.name).join(",")];

        for (const row of data) {
            const values = columnMappings.map(mapping => {
                const value = row[mapping.property];
                return value !== null ? value : "null";
            });
            csvRows.push(values.join(","));
        }

        return csvRows.join("\n");
    };

    //*get getEmployeeResponse
    const getUserResponse = id => {
        let _userList = [...users];
        let getEmployeeResponse = _userList.filter(item => item.Username === id);
        let firstName = GetValueFromArray(getEmployeeResponse[0].Attributes, "custom:firstName");
        let lastName = GetValueFromArray(getEmployeeResponse[0].Attributes, "custom:lastName");
        let fullName = firstName + " " + lastName;
        return fullName;
    };


    //Get Weekly Absence Report-Classified List
    //   const BindList = async () => {
    //     var employeeList = await DataStore.query(Employee, Predicates.ALL, {
    //       sort: s => s.employee_name(SortDirection.ASCENDING)
    //     });
    //     setEmployeeList(employeeList);

    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     var params = {
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
    //   };

    //*loadAbsenceReport
    const loadAbsenceReport = async () => {
        //*Set Weekly Absence Report-Classified List
        var weeklyAbsenceReport = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, Predicates.ALL, {
            sort: s => s.status_date_time(SortDirection.DESCENDING)
        });

        let newResponse = [];
        for (let i = 0; i < weeklyAbsenceReport.length; i++) {
            let schoolName = "";
            let workDuration = "";
            let submittedOn = "";
            let status = "";
            let remark = "";

            //*Work Duration
            if (weeklyAbsenceReport[i].from_date && weeklyAbsenceReport[i].to_date) {
                let fromDate = moment(weeklyAbsenceReport[i].from_date, "YYYY-MM-DD").format("MM/DD/YYYY");
                let toDate = moment(weeklyAbsenceReport[i].to_date, "YYYY-MM-DD").format("MM/DD/YYYY");
                workDuration = fromDate + " - " + toDate;
            } else {
                workDuration = "-";
            }

            //*submitted On
            if (weeklyAbsenceReport[i].status_date_time !== null && weeklyAbsenceReport[i].status_date_time !== undefined) {
                submittedOn =
                    weeklyAbsenceReport[i].status_date_time !== null
                        ? moment(weeklyAbsenceReport[i].status_date_time).format("MM/DD/YYYY")
                        : "-";
            } else {
                submittedOn = "-";
            }

            // //*School Name
            if (weeklyAbsenceReport[i].school_id !== null && weeklyAbsenceReport[i].school_id !== undefined) {
                var schoolResponses = await DataStore.query(Schools, c => c.id.eq(weeklyAbsenceReport[i].school_id));
                if (schoolResponses.length > 0) {
                    schoolName = schoolResponses[0].name;
                } else {
                    schoolName = "";
                }
            } else {
                schoolName = "";
            }

            if (
                weeklyAbsenceReport[i].payroll_status !== null &&
                weeklyAbsenceReport[i].payroll_status === InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED
            ) {
                status = "Approved";
                remark = "-";
            } else if (
                weeklyAbsenceReport[i].payroll_status !== null &&
                weeklyAbsenceReport[i].payroll_status === InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_REJECTED
            ) {
                status = "Rejected";
                remark = weeklyAbsenceReport[i].payroll_remark;
            } else if (
                weeklyAbsenceReport[i].approver_status !== null &&
                weeklyAbsenceReport[i].approver_status === InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED
            ) {
                status = "Approved";
                remark = "-";
            } else if (
                weeklyAbsenceReport[i].approver_status !== null &&
                weeklyAbsenceReport[i].approver_status === InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_REJECTED
            ) {
                status = "Rejected";
                remark = weeklyAbsenceReport[i].approver_remark;
            } else if (
                weeklyAbsenceReport[i].payroll_status === null &&
                weeklyAbsenceReport[i].approver_status === null &&
                weeklyAbsenceReport[i].status === InitiateClassifiedWeeklyAbsenceReportStatus.SUBMITTED
            ) {
                status = "Submitted";
                remark = "-";
            } else if (
                weeklyAbsenceReport[i].payroll_status === null &&
                weeklyAbsenceReport[i].approver_status === null &&
                weeklyAbsenceReport[i].status === InitiateClassifiedWeeklyAbsenceReportStatus.OPEN
            ) {
                status = "Pending";
                remark = "-";
            }

            newResponse.push({
                id: weeklyAbsenceReport[i].id,
                user_id: weeklyAbsenceReport[i].user_id,
                status: status,
                school_id: weeklyAbsenceReport[i].school_id,
                from_date: weeklyAbsenceReport[i].from_date,
                to_date: weeklyAbsenceReport[i].to_date,
                status_date_time: weeklyAbsenceReport[i].status_date_time,
                approver_status: weeklyAbsenceReport[i].approver_status,
                approver_by: weeklyAbsenceReport[i].approver_by,
                approver_remark: weeklyAbsenceReport[i].approver_remark,
                approver_date_time: weeklyAbsenceReport[i].approver_date_time,
                payroll_status: weeklyAbsenceReport[i].payroll_status,
                payroll_by: weeklyAbsenceReport[i].payroll_by,
                payroll_date_time: weeklyAbsenceReport[i].payroll_date_time,
                payroll_remark: weeklyAbsenceReport[i].payroll_remark !== null ? weeklyAbsenceReport[i].payroll_remark : "-",
                schoolName: schoolName,
                workDuration: workDuration,
                submittedOn: submittedOn,
                remark: remark && remark.length > 20 ? remark.substring(0, 20) + "..." : remark,
                createdAt: weeklyAbsenceReport[i].createdAt,
                updatedAt: weeklyAbsenceReport[i].updatedAt
            });

            if (i === weeklyAbsenceReport.length - 1) {
                let weeklyAbsenceReportForInitiator = newResponse.filter(obj => obj.user_id === loggedUserId);
                setReportLoading(false);
                //weeklyAbsenceReportForInitiator = orderBy(weeklyAbsenceReportForInitiator,"createdAt","DESCENDING")
                const sortedData = [...weeklyAbsenceReportForInitiator].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                //console.log(sortedData)
                setWeeklyAbsenceReports(sortedData);

                //SubmittedCount
                const submittedCount = weeklyAbsenceReportForInitiator.filter(obj => obj.status === "Submitted");
                setWeeklyAbsenceReportSubmitted(submittedCount.length);

                //SubmittedCount
                const approvedCount = weeklyAbsenceReportForInitiator.filter(obj => obj.status === "Approved");
                setWeeklyAbsenceReportApproved(approvedCount.length);

                //RejectedCount
                const rejectedCount = weeklyAbsenceReportForInitiator.filter(obj => obj.status === "Rejected");
                setWeeklyAbsenceReportRejected(rejectedCount.length);

                //RejectedCount
                const pendingCount = weeklyAbsenceReportForInitiator.filter(obj => obj.status === "Pending");
                setWeeklyAbsenceReportPending(pendingCount.length);
            }
        }
    };

    const loadReportLogs = async reportId => {
        //*Report Logs Response
        var loadReportLogsResponse = await DataStore.query(ReportsLog, c => c.report_id.eq(reportId));
        if (loadReportLogsResponse.length > 0) {
            let newResponse = [];
            for (let i = 0; i < loadReportLogsResponse.length > 0; i++) {
                let submittedUser;
                let name;
                let ProfilePic;
                let dateTime = moment(loadReportLogsResponse[i].date_and_time).format("HH:mm");
                //*Get user
                let userId = loadReportLogsResponse[i].user_id;
                const cognito = await new AWS.CognitoIdentityServiceProvider();
                if (userId) {
                    try {
                        submittedUser = await cognito
                            .adminGetUser({
                                UserPoolId: awsmobile.aws_user_pools_id,
                                Username: userId
                            })
                            .promise();

                        let exist = submittedUser ? submittedUser : "";
                        let firstName = GetValueFromArray(exist.UserAttributes, "custom:firstName");
                        let lastName = GetValueFromArray(exist.UserAttributes, "custom:lastName");
                        name = firstName + " " + lastName;
                        let profilePath = GetValueFromArray(exist.UserAttributes, "picture");
                        // console.log("profilePath-----" + profilePath)
                        if (profilePath !== undefined) {
                            await Storage.get(profilePath).then(result => {
                                ProfilePic = result;
                            });
                        } else {
                            ProfilePic = user1;
                        }
                    } catch (e) {
                        //console.log(e)
                    }
                } else {
                }
                newResponse.push({
                    id: loadReportLogsResponse[i].id,
                    report_id: loadReportLogsResponse[i].report_id,
                    comment: loadReportLogsResponse[i].comment,
                    date_and_time: loadReportLogsResponse[i].date_and_time,
                    user_id: loadReportLogsResponse[i].user_id,
                    createdAt: loadReportLogsResponse[i].createdAt,
                    dateTime: dateTime,
                    name: name,
                    ProfilePic: ProfilePic,
                    updatedAt: loadReportLogsResponse[i].updatedAt
                });

                if (i === loadReportLogsResponse.length - 1) {
                    SetReportLogList(newResponse);
                }
            }
        } else {
            SetReportLogList([]);
        }
    };
    const checkApplicationAccessibility = async () => {
        //personnel - Action
        let personnelActionIsInitiator = reactLocalStorage.get("personnelIsInitiator");
        //console.log('personnelActionIsInitiator --->', personnelActionIsInitiator);
        let personnelActionIsApprover = reactLocalStorage.get("personnelIsApprover");
        let personnelActionIsPayroll = reactLocalStorage.get("personnelIsPayroll");
        let personnelActionIsSuperadmin = reactLocalStorage.get("personnelActionIsSuperadmin");

        setpersonnelActionIsInitiator(personnelActionIsInitiator);

        setpersonnelActionIsApprover(personnelActionIsApprover);
        setpersonnelActionIsPayroll(personnelActionIsPayroll);
        setpersonnelActionIsSuperadmin(personnelActionIsSuperadmin);

        if (personnelActionIsInitiator === 1) {
            setActiveIndex(0);
        }
        if (personnelActionIsApprover == 1) {
            setActiveIndex(1);
        }
        if (personnelActionIsPayroll == 1) {
            setActiveIndex(1);
        }
        if (personnelActionIsSuperadmin == '1') {
            setActiveIndex(0);
        }
    };
    useEffect(() => {
        checkApplicationAccessibility();
        // BindList();
        // onLoad();
        // loadUsers()
        MyAccountTable.getProductsSmall().then(data => setProducts(data.slice(0, 9)));
        //To set active tab
        if (personnelActionIsInitiator === 1) {
            setActiveIndex(0);
        }
    }, []);

    const initiatorStatusRowFilterTemplate = options => {
        //console.log('options: ', options);
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={e => options.filterApplyCallback(e.value)}
                itemTemplate={statusItemTemplate}
                placeholder="Select"
                className="p-column-filter custDropdown"
                showClear
                style={{ minWidth: "7rem" }}
            />
        );
    };

    const statusRowFilterTemplate = options => {
        //console.log('options: ', options);
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={e => options.filterApplyCallback(e.value)}
                itemTemplate={statusItemTemplate}
                placeholder="Select"
                className="p-column-filter custDropdown"
                showClear
                style={{ minWidth: "7rem" }}
            />
        );
    };

    const statusRowFilterTemplatePayroll = options => {
        //console.log("options--", options)
        //return
        return (
            <Dropdown
                value={options.value}
                options={statusesPayrolls}
                onChange={e => options.filterApplyCallback(e.value)}
                //onChange={e => callbackE(e.value)}
                itemTemplate={statusItemTemplate}
                placeholder="Select"
                className="p-column-filter custDropdown"
                showClear
                style={{ minWidth: "7rem" }}
            />
        );
    };
    const getFullName = (attributes) => {
        if (attributes) {
            const { firstName, lastName } = getFirstAndLastName(attributes);
            return firstName + (lastName ? ' ' : '') + (lastName || '');
        }
    }
    const getFirstAndLastName = (attributes) => {
        if (attributes) {
            const fnameAttribute = attributes.find(attr => attr.Name === 'custom:firstName');
            const lnameAttribute = attributes.find(attr => attr.Name === 'custom:lastName');
            const firstName = fnameAttribute ? fnameAttribute.Value : '';
            const lastName = lnameAttribute ? lnameAttribute.Value : '';
            return { firstName, lastName };
        }
    }
    const getUserRoleName = (userRole) => {
        switch (userRole) {
            case USER_TYPES.SUPERADMIN:
                return USER_TYPES_NAMES.SA;
            case USER_TYPES.ADMIN:
                return USER_TYPES_NAMES.A;
            case USER_TYPES.APPROVER:
                return USER_TYPES_NAMES.AP;
            case USER_TYPES.PAYROLL:
                return USER_TYPES_NAMES.P;
            default:
                return USER_TYPES_NAMES.I;
        }
    };

    function getUserMap(user) {
        const sub = user.Attributes.find(attr => attr.Name === "sub");
        const userNameAttribute = getFullName(user.Attributes);
        const userEmailAttribute = user.Attributes.find(attr => attr.Name === 'email');
        const userCodeAttribute = user.Attributes.find(attr => attr.Name === 'custom:userCode');
        const signatureAttribute = user.Attributes.find(attr => attr.Name === 'custom:userSignature');
        const userRoleAttribute = user.Attributes.find(attr => attr.Name === 'custom:role');
        const userReportingManager = user.Attributes.find(attr => attr.Name === "custom:SPReportingManager")?.Value;
        return ({
            userId: sub?.Value,
            name: userNameAttribute,
            email: userEmailAttribute?.Value,
            userCode: userCodeAttribute?.Value,
            signature: signatureAttribute?.Value,
            role: getUserRoleName(userRoleAttribute?.Value),
            userReportingManager: userReportingManager
        });
    }
    const buildUserDataFromCongntioResponse = (users) => {
        return users.map(getUserMap);
    }
    //   const fetchCognitoUsersByParams = async (params) => {
    //     const cognito = new AWS.CognitoIdentityServiceProvider();
    //     params['UserPoolId'] = awsmobile.aws_user_pools_id;
    //     if (!params.hasOwnProperty('Limit')) { params['Limit'] = 60; }
    //     try {
    //       return (await cognito.listUsers(params).promise());
    //     } catch (e) {
    //       console.info("Error while fetching users from cognito");
    //       return [];
    //     }
    //   }
    //   const fetchUsersByEmail = async (email) => {
    //     const params = { Limit: 1, Filter: `email="${email}"` };
    //     return await fetchCognitoUsersByParams(params);
    //   };
    // let exedirelemIdemail = "hjayakumar@hexalytics.com"
    // let approverHrexectivesecemail = "poojad@hexalytics.com"
    // let payrollemail = "rajiba.tiria@gmail.com"
    //   const UserIdSetting = async () => {
    //     // const exedirelemIdemailData = await fetchUsersByEmail(exedirelemIdemail);
    //     // const exedirelem = buildUserDataFromCongntioResponse(exedirelemIdemailData?.Users);
    //     // setexedirelemIduserId(exedirelem?.[0]);
    //     // const approverHrexectivesecemailData = await fetchUsersByEmail(approverHrexectivesecemail);
    //     // const approverHrexe = buildUserDataFromCongntioResponse(approverHrexectivesecemailData?.Users);
    //     // setapproverHrexectivesecuserId(approverHrexe?.[0]);
    //     // const payrollemailData = await fetchUsersByEmail(payrollemail);
    //     // const payroll = buildUserDataFromCongntioResponse(payrollemailData?.Users);
    //     // setpayrolluserId(payroll?.[0]);
    //     // const exedirelemeduemailData = await fetchUsersByEmail(exedirelemeduemail);
    //     // const exedirelemedu = buildUserDataFromCongntioResponse(exedirelemeduemailData?.Users);
    //     // setexedirelemeduuserId(exedirelemedu?.[0]);
    //     // const exedirseceduemailData = await fetchUsersByEmail(exedirseceduemail);
    //     // const exedirsecedu = buildUserDataFromCongntioResponse(exedirseceduemailData?.Users);
    //     // setexedirseceduuserId(exedirsecedu?.[0]);
    //   }
    useEffect(() => {
        // UserIdSetting()
        initiatorBindList()
    }, []);

    useEffect(() => {
        if (payrolluserId?.userId) {
            initiatorBindList()
        }

    }, [payrolluserId]);
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
    async function fetchPersonnelActionInitiatorReportResponse(isSuperadmin, userId) {
        // const filter = {
        //   _deleted: { eq: false }
        // };
        let filter = {};
        // if (isSuperadmin == '0') { //deliberately using == instead of === to avoid type check
        filter.created_by = { eq: userId };
        // }
        return await fetchPaginatedRecords(
            queries.listPersonnelActionInitiatorForms,
            filter,
            { field: "updatedAt", direction: "desc" },
            1000,
            'listPersonnelActionInitiatorForms'
        )

    }
    const fetchReportTransactionCycles = async (reportId) => {
        return await fetchPaginatedRecords(
            queries.listTransactionCyclePersonnels,
            { report_Id: { eq: reportId } },
            { field: "createdAt", direction: "desc" },
            1000,
            'listTransactionCyclePersonnels'
        )
    };
    const fetchInitiateReport = async (id) => {
        try {
            const result = await API.graphql(
                graphqlOperation(queries.getPersonnelActionInitiatorForm,
                    { id: id }
                )
            );

            return result.data.getPersonnelActionInitiatorForm;
        } catch (error) {
            console.error('Error fetching original item:', error);
            return null;
        }
    }
    const initiatorBindList = async () => {
        // const loggedUserId = reactLocalStorage.get("loggedUserId");
        //fetch all SixthPeriodAssignmentInitiateReport table data
        try {
            let PersonalActionFormResponse = await fetchPersonnelActionInitiatorReportResponse(personnelActionIsSuperadmin, loggedUserId)

            if (PersonalActionFormResponse) {

                let finalInitiateRequestData = [];
                let finalPushInitiator = [];
                let submitCount = 0;
                let approvedCount = 0;
                let rejectCount = 0;
                PersonalActionFormResponse = PersonalActionFormResponse.sort((a, b) => b.updatedAt - a.updatedAt);
                let lent = PersonalActionFormResponse.length;

                setTotalRecords(PersonalActionFormResponse.length)

                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                try {

                    for (let i = 0; i < PersonalActionFormResponse.length; i++) {
                        const currentItem = PersonalActionFormResponse[i];
                        let fromDate = moment(currentItem.effectiveDatesFrom, "YYYY-MM-DD").format("MM/DD/YYYY");
                        let toDate = moment(currentItem.effectiveDatesTo, "YYYY-MM-DD").format("MM/DD/YYYY");

                        const period = `${fromDate} to ${toDate}`;
                        let status = currentItem.submited_by ? "Submitted" : "Pending";
                        let remark = currentItem.remark ? currentItem.remark : "-";

                        //get specific currentItem.id transaction cycle report data
                        const TransactionCyclePersonnelResponse = await fetchReportTransactionCycles(currentItem?.id)

                        for (let i = 0; i < TransactionCyclePersonnelResponse.length; i++) {
                            if (TransactionCyclePersonnelResponse[TransactionCyclePersonnelResponse.length - 1].remark) {
                                if (TransactionCyclePersonnelResponse[TransactionCyclePersonnelResponse.length - 1].approver_level == loggedUserId) {
                                    remark = TransactionCyclePersonnelResponse[TransactionCyclePersonnelResponse.length - 1].remark;
                                    status = "Rejected_Editable";
                                } else {
                                    remark = TransactionCyclePersonnelResponse[TransactionCyclePersonnelResponse.length - 1].remark;
                                    status = "Rejected";
                                }
                            }
                        }

                        for (let i = 0; i < TransactionCyclePersonnelResponse.length; i++) {
                            if (TransactionCyclePersonnelResponse[i].status === "ReviewedResubmitted") {
                                // remark = sixthPeriodReportTransactionCycleResponse[i].remark;
                                status = "Reviewed & resubmitted";
                            }
                        }

                        for (let i = 0; i < TransactionCyclePersonnelResponse.length; i++) {
                            if (TransactionCyclePersonnelResponse[i].status === "Closed") {
                                status = "Closed";
                                break;
                            }
                        }

                        //console.log(sixthPeriodReportTransactionCycleResponse)

                        //---------------------------------------------------------
                        //console.log('currentItem',currentItem.status  === 'Pending' ? currentItem.currentItem :'' )
                        //console.log("currentItem st----",status)
                        //line set designation  for each Report code start here
                        // let secondApprover = currentItem.particular_emp_reporting_manager;
                        let secondApprover = currentItem.budgetClerk ? currentItem.budgetClerk : 0;
                        let thirdApprover = currentItem.budgetManager ? currentItem.budgetManager : 0;
                        let executivedirelemId = currentItem.executivedirelemId ? currentItem.executivedirelemId : 0;
                        let elemorsec = currentItem.assignelemorsec ? currentItem.assignelemorsec : 0;
                        let psayesorno = currentItem.psayesorno ? currentItem.psayesorno : 0;
                        let teacher = currentItem.deptHead ? currentItem.deptHead : 0;
                        let payroll = payrolluserId?.userId;
                        let exedirelemId = exedirelemIduserId?.userId
                        let approverHrexectivesec = approverHrexectivesecuserId?.userId
                        let fourthApprover = currentItem.executiveSecretary ? currentItem.executiveSecretary : 0;
                        let fifthApprover = currentItem?.executiveManagement;
                        let sixthApprover = currentItem?.hrTechnician;
                        let TransactionCyclePersonnelResponseLate = await fetchReportTransactionCycles(currentItem.id);

                        //console.log("sixthPeriodReportTransactionCycleResponseLate ----------" ,sixthPeriodReportTransactionCycleResponseLate)
                        //if(sixthPeriodReportTransactionCycleResponseLate[0] === )
                        let toEmployeeId = TransactionCyclePersonnelResponseLate.length
                            ? TransactionCyclePersonnelResponseLate[0].to_Employee_Id
                            : 0;
                        // let financial = 0;
                        // let executive = 0;

                        // if (TransactionCyclePersonnelResponseLate.length > 2) {
                        //   //check if second last is fifthaprrover HR
                        //   if (TransactionCyclePersonnelResponseLate[1].to_Employee_Id === sixthApprover) {
                        //     financial = TransactionCyclePersonnelResponseLate[0].to_Employee_Id;
                        //     //check if third last is fifthaprrover HR
                        //   } else if (TransactionCyclePersonnelResponseLate[2].to_Employee_Id === sixthApprover) {
                        //     executive = TransactionCyclePersonnelResponseLate[0].to_Employee_Id;
                        //   }
                        // }
                        //console.log("toEmployeeId", toEmployeeId)
                        //console.log("teacher",teacher)

                        let designation = "";
                        let pstatus = status;
                        switch (toEmployeeId) {
                            case teacher:
                                designation = "Site Admin/ Dept Head";
                                break;
                            //reporting manager.
                            case secondApprover:
                                designation = "Budget Clerk";
                                pstatus = "Approved";
                                break;
                            case thirdApprover:
                                designation = "Budget Manager";
                                pstatus = "Approved";
                                break;
                            case fourthApprover:
                                designation = " Educational Services Executive Secretary";
                                pstatus = "Approved";
                                break;
                            case executivedirelemId:
                                if (elemorsec == "Elementery") {
                                    designation = "Elementary Education Exe.Secretary";
                                    pstatus = "Approved";
                                } else {
                                    designation = "Secondary Education Exe.Secretary";
                                    pstatus = "Approved";
                                }
                                break;

                            // case exedirelemId:
                            //   designation = "Executive Dir of Elementary ";
                            //   pstatus = "Approved";
                            //   break;
                            case fifthApprover:
                                designation = "Executive Management"
                                pstatus = "Approved";
                                break;
                            case sixthApprover:
                                designation = "HR Technician"
                                pstatus = "Approved";
                                break;
                            case approverHrexectivesec:
                                designation = "HR Executive Secretary";
                                pstatus = "Approved";
                                break;

                            case payroll:
                                designation = "HR Technician (Payroll)";
                                pstatus = "Approved";
                                break;
                            // case financial:
                            //   designation = "HR Executive Secretary";
                            //   pstatus = "Approved";
                            //   break;
                            // case executive:
                            //   designation = "Executive Director";
                            //   pstatus = "Approved";
                            //   break;

                            default:
                                break;
                        }
                        console.log('designation: ', designation);
                        pstatus = status === "Pending" ? status : pstatus;
                        pstatus = status === "Rejected" ? status : pstatus;
                        let pretexts = designation ? "Pending for Approval " + designation : "Pending for Approval"
                        // if (designation === 'HR Technician (Payroll)') {
                        //   pretexts = "Pending for Acknowledgement";
                        // }
                        if (status === 'Closed') {
                            pstatus = 'Closed'
                            pretexts = "Closed By HR Technician";
                        }
                        if (status === 'Rejected_Editable') {
                            pretexts = "Rejected";
                        }
                        if (['Rejected', 'Pending'].includes(status)) {
                            pretexts = status;
                        }

                        let reminderName = "";
                        try {
                            if (toEmployeeId != null && pstatus != 'Closed') {
                                let employeeResponses = await fetchPaginatedRecords(
                                    queries.listEmployees,
                                    null,
                                    { field: "employee_name", direction: "asc" },
                                    1000,
                                    'listEmployees'
                                );
                                // console.log('employee333xxx --->', employeeResponses);
                                employeeResponses = employeeResponses.filter(item => item.user_Id == toEmployeeId)
                                reminderName = employeeResponses?.[0]?.employee_name
                                // console.log('employee333 --->', employeeResponses);
                            }
                        } catch (e) {
                            console.info(e)
                        }

                        let teacherName = "";
                        try {
                            let x = users.filter(u => u.Username === currentItem.deptHead);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                teacherName = fname[0].Value;
                            }
                            if (lname) {
                                teacherName += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }

                        let initiator = "";
                        try {
                            let x = users.filter(u => u.Username === currentItem.submited_by);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                initiator = fname[0].Value;
                            }
                            if (lname) {
                                initiator += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }


                        //code designation complete here
                        let obj = {
                            "id": currentItem?.id,
                            "formTitle": currentItem?.formTitle || '',
                            "boardMeetingDate": currentItem?.boardMeetingDate,
                            "location": currentItem?.location || '',
                            "actionToBeTaken": currentItem?.actionToBeTaken,
                            "type": currentItem?.type,
                            "personalReportNo": currentItem?.personalReportNo,
                            "deptHead": currentItem?.deptHead,
                            "budgetClerk": currentItem?.budgetClerk,
                            "budgetManager": currentItem?.budgetManager,
                            "executiveSecretary": currentItem?.executiveSecretary,
                            "executiveManagement": currentItem?.executiveManagement,
                            "hrTechnician": currentItem?.hrTechnician,
                            "executivedirelemId": currentItem?.executivedirelemId,
                            "assignelemorsec": currentItem?.assignelemorsec,
                            "psayesorno": currentItem?.psayesorno,
                            "actionDate": currentItem?.actionDate,
                            "actionPage": currentItem?.actionPage,
                            "actionItem": currentItem?.actionItem,
                            status: status,
                            remark: remark,
                            pstatus: pstatus,
                            pretexts: pretexts,
                            designation: designation,
                            //data for pdf
                            teacherName: teacherName,
                            reminderName: reminderName,
                            transctionCycleId: TransactionCyclePersonnelResponseLate[0].id,
                            initiator: currentItem?.submited_by,

                        };

                        //specific report category get approved,submitted and rejected count

                        if (status === "Submitted") {
                            submitCount++;
                        } else if (status === "Approved") {
                            approvedCount++;
                        } else if (status === "Rejected") {
                            rejectCount++;
                        }


                        finalInitiateRequestData.push(obj);
                    }

                } catch (e) { console.log("error", e) }


                setPersonalActionReportList(finalInitiateRequestData);

                // finalPushInitiator.reverse();
                // setInitiatorCSVData(finalPushInitiator);

                setSubmitCount(submitCount);
                setApprovedCount(approvedCount);
                setRejectCount(rejectCount);
            }
            //2.fetch those request which needs approval for logged users.
            let TransactionCyclePersonnelResponse = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { to_Employee_Id: { eq: loggedUserId } },
                { field: "createdAt", direction: "desc" },
                1000,
                'listTransactionCyclePersonnels'
            )

            //console.log("APPPP sixthPeriodReportTransactionCycleResponse nnn:-", sixthPeriodReportTransactionCycleResponse);
            TransactionCyclePersonnelResponse = groupBy(TransactionCyclePersonnelResponse, "report_Id");
            if (TransactionCyclePersonnelResponse) {
                let pendingCount = 0;
                let approvedCount = 0;
                let rejectCount = 0;
                let approvalFinalData = [];
                let i = 0;
                // console.log('TransactionCyclePersonnelResponse512: ', TransactionCyclePersonnelResponse);
                for (let report_Id in TransactionCyclePersonnelResponse) {

                    const currentItem = TransactionCyclePersonnelResponse[report_Id][0];

                    //get Report data using report id
                    const PersonalActionFormResponse = await fetchInitiateReport(report_Id)




                    //check if report exists
                    if (PersonalActionFormResponse && PersonalActionFormResponse.submited_by) {
                        const TransactionCyclePersonnelResponseNew = await fetchReportTransactionCycles(report_Id)


                        let fromDate = moment(PersonalActionFormResponse.effectiveDatesFrom, "YYYY-MM-DD").format("MM/DD/YYYY");
                        let toDate = moment(PersonalActionFormResponse.effectiveDatesTo, "YYYY-MM-DD").format("MM/DD/YYYY");



                        const period = `${fromDate} to ${toDate}`;
                        let status = currentItem.isApproved ? "Approved" : currentItem.remark ? "Rejected" : "Pending for Approval";
                        let remark = currentItem.remark ? currentItem.remark : "-";



                        if (TransactionCyclePersonnelResponseNew.length) {
                            status = TransactionCyclePersonnelResponseNew[0].remark && TransactionCyclePersonnelResponseNew[0].status === 'Rejected' ? TransactionCyclePersonnelResponseNew[0].approver_level == loggedUserId ? "Rejected_Editable" : 'Rejected' : status
                            remark = TransactionCyclePersonnelResponseNew[0].remark && TransactionCyclePersonnelResponseNew[0].status === 'Rejected' ? TransactionCyclePersonnelResponseNew[0].remark : remark
                            if (TransactionCyclePersonnelResponseNew[0].status === 'Closed') {
                                status = 'Closed';
                            }
                        }
                        //line set designation  for each Report code start here
                        let secondApprover = PersonalActionFormResponse.budgetClerk ? PersonalActionFormResponse.budgetClerk : 0;
                        let thirdApprover = PersonalActionFormResponse.budgetManager ? PersonalActionFormResponse.budgetManager : 0;
                        let executivedirelemId = PersonalActionFormResponse.executivedirelemId ? PersonalActionFormResponse.executivedirelemId : 0;
                        let elemorsec = PersonalActionFormResponse.assignelemorsec ? PersonalActionFormResponse.assignelemorsec : 0;
                        let teacher = PersonalActionFormResponse.deptHead ? PersonalActionFormResponse.deptHead : 0;
                        let payroll = payrolluserId?.userId;
                        let psayesorno = PersonalActionFormResponse.psayesorno ? PersonalActionFormResponse.psayesorno : 0;
                        let fourthApprover = PersonalActionFormResponse.executiveSecretary ? PersonalActionFormResponse.executiveSecretary : 0;
                        let fifthApprover = PersonalActionFormResponse.executiveManagement;
                        let sixthApprover = PersonalActionFormResponse.hrTechnician;
                        let exedirelemId = exedirelemIduserId?.userId
                        let approverHrexectivesec = approverHrexectivesecuserId?.userId
                        let TransactionCyclePersonnelResponseLate = await fetchReportTransactionCycles(PersonalActionFormResponse.id)

                        //if(sixthPeriodReportTransactionCycleResponseLate[0] === )
                        let toEmployeeId = TransactionCyclePersonnelResponseLate.length

                            ? TransactionCyclePersonnelResponseLate[0].to_Employee_Id
                            : 0;
                        let financial = 0;
                        let executive = 0;
                        // if (TransactionCyclePersonnelResponseLate.length > 2) {
                        //   //check if second last is fifthaprrover HR
                        //   if (TransactionCyclePersonnelResponseLate[1].to_Employee_Id === sixthApprover) {
                        //     financial = TransactionCyclePersonnelResponseLate[0].to_Employee_Id;
                        //     //check if third last is fifthaprrover HR
                        //   } else if (TransactionCyclePersonnelResponseLate[2].to_Employee_Id === sixthApprover) {
                        //     executive = TransactionCyclePersonnelResponseLate[0].to_Employee_Id;
                        //   }
                        // }

                        //console.log("teacher", teacher);
                        let designation = "";
                        switch (toEmployeeId) {
                            case teacher:
                                designation = "Site Admin/ Dept Head";
                                break;
                            //reporting manager.
                            case secondApprover:
                                designation = "Budget Clerk";

                                break;
                            case thirdApprover:
                                designation = "Budget Manager";

                                break;
                            case fourthApprover:
                                designation = "Educational Services Executive Secretary";

                                break;
                            case executivedirelemId:
                                if (elemorsec == "Elementery") {
                                    designation = "Elementary Education Exe.Secretary";
                                } else {
                                    designation = "Secondary Education Exe.Secretary";
                                }
                                break;
                            // case exedirelemId:
                            //   designation = "Executive Dir of Elementary ";
                            //   break;
                            case fifthApprover:
                                designation = "Executive Management";
                                break;
                            case sixthApprover:
                                designation = "HR Technician";
                                break;
                            case approverHrexectivesec:
                                designation = "HR Executive Secretary";
                                break;
                            case payroll:
                                designation = "HR Technician (Payroll)";
                                break;
                            // case financial:
                            //   designation = "Financial Analyst";

                            //   break;
                            // case executive:
                            //   designation = "Executive Director";

                            //   break;
                            default:
                                break;
                        }

                        let pretexts = designation ? "Pending for Approval " + designation : "Pending for Approval"
                        // if (designation === 'HR Technician (Payroll)') {
                        //   pretexts = "Pending for Acknowledgement";
                        // }

                        if (status === 'Closed') {
                            pretexts = "Closed By HR Technician";
                        }
                        if (status === 'Rejected_Editable') {
                            pretexts = "Rejected";
                        }

                        if (['Rejected', 'Pending'].includes(status)) {
                            pretexts = status;
                        }

                        let teacherName = "";
                        try {
                            let x = users.filter(u => u.Username === PersonalActionFormResponse.deptHead);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                teacherName = fname[0].Value;
                            }
                            if (lname) {
                                teacherName += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }

                        let initiator = "";
                        try {
                            let x = users.filter(u => u.Username === PersonalActionFormResponse.created_by);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                initiator = fname[0].Value;
                            }
                            if (lname) {
                                initiator += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }
                        let obj = {
                            "id": PersonalActionFormResponse?.id,
                            "formTitle": PersonalActionFormResponse?.formTitle || '',
                            "boardMeetingDate": PersonalActionFormResponse?.boardMeetingDate,
                            "location": PersonalActionFormResponse?.location || '',
                            "actionToBeTaken": PersonalActionFormResponse?.actionToBeTaken,
                            "type": PersonalActionFormResponse?.type,
                            "personalReportNo": PersonalActionFormResponse?.personalReportNo,
                            "deptHead": PersonalActionFormResponse?.deptHead,
                            "budgetClerk": PersonalActionFormResponse?.budgetClerk,
                            "budgetManager": PersonalActionFormResponse?.budgetManager,
                            "executiveSecretary": PersonalActionFormResponse?.executiveSecretary,
                            "executiveManagement": PersonalActionFormResponse?.executiveManagement,
                            "executivedirelemId": PersonalActionFormResponse?.executivedirelemId,
                            "assignelemorsec": PersonalActionFormResponse?.assignelemorsec,
                            "psayesorno": PersonalActionFormResponse?.psayesorno,
                            "hrTechnician": PersonalActionFormResponse?.hrTechnician,
                            "actionDate": PersonalActionFormResponse?.actionDate,
                            "actionPage": PersonalActionFormResponse?.actionPage,
                            "actionItem": PersonalActionFormResponse?.actionItem,
                            status: status,
                            remark: remark,
                            pretexts: pretexts,

                            designation: designation,
                            //data for pdf
                            teacherName: teacherName,

                            initiator: PersonalActionFormResponse?.submited_by,

                        };

                        if (status === "Pending For Approval") {
                            pendingCount++;
                        } else if (status === "Approved") {
                            approvedCount++;
                        } else if (status === "Rejected") {
                            rejectCount++;
                        }

                        approvalFinalData.push(obj);
                        i = i + 1;
                    } //condion ends for check report exists
                }

                //approvalFinalData.reverse();
                const approveCount = approvalFinalData.filter(obj => obj.status === "Approved");

                setApprovedCountForReqReports(approveCount.length);

                const rejectedCount = approvalFinalData.filter(obj => obj.status === "Rejected");
                setRejectCountForReqReports(rejectedCount.length);

                const pendingForApproverCount = approvalFinalData.filter(obj => obj.status === "Pending for Approval");
                setPendingForApprovalCountForReqReports(pendingForApproverCount.length);

                setApprovalReportRequest(approvalFinalData);



            }

            //3.fetch those request which needs payroll acknowledge for logged user

            const TransactionCyclePersonnelResponseForPayroll = personnelActionIsSuperadmin
                ? await DataStore.query(
                    TransactionCyclePersonnel,
                    c => c,
                    { sort: s => s.createdAt(SortDirection.DESCENDING) }
                )
                : await DataStore.query(
                    TransactionCyclePersonnel,
                    c => c.to_Employee_Id.eq(loggedUserId),
                    { sort: s => s.createdAt(SortDirection.DESCENDING) }
                );

            if (TransactionCyclePersonnelResponseForPayroll) {
                let payrollFinalData = [];

                for (let i = 0; i < TransactionCyclePersonnelResponseForPayroll.length; i++) {
                    let currentItem = TransactionCyclePersonnelResponseForPayroll[i];
                    const PersonnelActionInitiatorFormReportResponse = await fetchInitiateReport(currentItem.report_Id)

                    //console.log('PersonnelActionInitiatorFormReportResponse: ', PersonnelActionInitiatorFormReportResponse);
                    if (PersonnelActionInitiatorFormReportResponse.length > 0) {

                        let fromDate = moment(PersonnelActionInitiatorFormReportResponse.from_date, "YYYY-MM-DD").format("MM/DD/YYYY");
                        let toDate = moment(PersonnelActionInitiatorFormReportResponse.to_date, "YYYY-MM-DD").format("MM/DD/YYYY");
                        const period = `${fromDate} to ${toDate}`;
                        let status = currentItem.status === "Closed" ? "Acknowledged" : "Pending for Acknowledge";
                        let remark = "-";

                        let teacherName = "";
                        try {
                            let x = users.filter(u => u.Username === PersonnelActionInitiatorFormReportResponse.deptHead);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                teacherName = fname[0].Value;
                            }
                            if (lname) {
                                teacherName += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }

                        let initiator = "";
                        try {
                            let x = users.filter(u => u.Username === PersonnelActionInitiatorFormReportResponse.created_by);
                            let fname = x[0]?.Attributes.filter(u => u?.Name === 'custom:firstName');
                            let lname = x[0]?.Attributes.filter(u => u?.Name === 'custom:lastName');
                            if (fname) {
                                initiator = fname[0].Value;
                            }
                            if (lname) {
                                initiator += " " + lname[0].Value;
                            }
                        } catch (e) {
                            console.info(e)
                        }

                        let obj = {
                            "id": PersonnelActionInitiatorFormReportResponse?.id,
                            "formTitle": PersonnelActionInitiatorFormReportResponse?.formTitle || '',
                            "boardMeetingDate": PersonnelActionInitiatorFormReportResponse?.boardMeetingDate,
                            "location": PersonnelActionInitiatorFormReportResponse?.location || '',
                            "actionToBeTaken": PersonnelActionInitiatorFormReportResponse?.actionToBeTaken,
                            "type": PersonnelActionInitiatorFormReportResponse?.type,
                            "personalReportNo": PersonnelActionInitiatorFormReportResponse?.personalReportNo,
                            "deptHead": PersonnelActionInitiatorFormReportResponse?.deptHead,
                            "budgetClerk": PersonnelActionInitiatorFormReportResponse?.budgetClerk,
                            "budgetManager": PersonnelActionInitiatorFormReportResponse?.budgetManager,
                            "executiveSecretary": PersonnelActionInitiatorFormReportResponse?.executiveSecretary,
                            "executiveManagement": PersonnelActionInitiatorFormReportResponse?.executiveManagement,
                            "hrTechnician": PersonnelActionInitiatorFormReportResponse?.hrTechnician,
                            status: status,
                            remark: remark,

                            //data for pdf
                            teacherName: teacherName,

                            initiator: initiator,
                        };

                        payrollFinalData.push(obj);
                    }
                }

                //console.log("APPP payrollFinalDatapayrollFinalData:-", payrollFinalData);
                setPayrollRequest(payrollFinalData);
            }

        } catch (error) {
            console.log('Error for bindList', error);
        }


        setEmployeeList(employeeList)





    }
    async function fetchAllDetailsAndSetObjects(target_user_id, approver_id, next_approver_id, initiator_id) {
        const targetPromise = fetchAndSetLoggedInUserData(target_user_id);
        const approverPromise = fetchAndSetLoggedInUserData(approver_id);
        const nextApproverPromise = fetchAndSetLoggedInUserData(next_approver_id);
        const initiatorPromise = fetchAndSetLoggedInUserData(initiator_id);

        try {
            const [targetData, approverData, nextApproverData, initiatorData] = await Promise.all([
                targetPromise,
                approverPromise,
                nextApproverPromise,
                initiatorPromise
            ]);

            return {
                targetDetailsObj: targetData,
                approverDetailsObj: approverData,
                nextApproverDetailsObj: nextApproverData,
                initiatorDetailsObj: initiatorData
            };
        } catch (error) {
            console.error('Error fetching and setting user data:', error);
            return null;
        }
    }

    const approvalStatusBody = product => {
        return <Tag value={product.appStatus} severity={approveStatusOptions(product)}></Tag>;
    };

    const approveStatusOptions = product => {
        console.log("product status", product)
        switch (product.status) {
            case "Pending for Approval":
                return "warning";
            case "Pending For ApprovalBudget Manager":
                return "warning";
            case "Pending For ApprovalSecondary Education Exe.Secretary":
                return "warning";
            case "Pending for Approval Teacher":
                return "warning";
            case "Pending for Approval Site Admin/ Dept Head":
                return "warning";
            case "Pending for Approval Budget Clerk":
                return "warning";
            case "Pending for Approval Budget Director":
                return "warning";
            case "Pending For ApprovalBudget Clerk":
                return "warning";
            case "Pending for Approval HR Director":
                return "warning";
            case "Pending for Approval HR Technician (Payroll)":
                return "warning";
            case "Pending For ApprovalSite Admin/ Dept Head":
                return "warning";
            case "Pending for Approval HR Executive Secretary":
                return "warning";
            case "Pending for Approval Executive Director":
                return "warning";
            case "Pending For ApprovalHR Technician":
                return "warning";
            case "Pending For ApprovalBudget Manager":
                return "warning";
            case "Pending For ApprovalEducational Services Executive Secretary":
                return "warning";
            case "Pending For ApprovalElementary Education Exe.Secretary":
                return "warning";
            case "Pending For ApprovalExecutive Dir of Elementary ":
                return "warning";
            case "Pending For ApprovalExecutive Management":
                return "warning";
            case "Pending For ApprovalHR Technician":
                return "warning";
            case "Pending For Approval":
                return "warning";
            case "Rejected":
                return "danger";
            case "Rejected_Editable":
                return "danger";
            case "Pending":
                return "warning";
            case "Submitted":
                return "info";
            case "SUBMITTED":
                return "info";
            case "Approved":
                return "success";
            case "Approved (P)":
                return "success";
            case "Acknowledge":
                return "success";
            case "Acknowledged HR Technician (Payroll)":
                return "success";
            case "Reviewed & resubmitted":
                return "info";
            case "Closed":
                return "success";
            case "Completed":
                return "success";
            default:
                return null;
        }

    };
    const DatatableValue = [
        {
            id: "1",
            reportno: "121",
            title: "xyz",
            location: "Kop",
            action: "abc",
            type: "certificate",
            date: "2023-2-30",
            remark: "-",
            status: "Submitted",
        },
        {
            id: "2",
            reportno: "122",
            title: "xyz",
            location: "Kop",
            action: "abc",
            type: "certificate",
            date: "2023-2-30",
            remark: "-",
            status: "Completed",
        },
        {
            id: "3",
            reportno: "123",
            title: "xyz",
            location: "Kop",
            action: "abc",
            type: "certificate",
            date: "2023-2-30",
            remark: "-",
            status: "Rejected",
        },
        {
            id: "4",
            reportno: "124",
            title: "xyz",
            location: "Kop",
            action: "abc",
            type: "certificate",
            date: "2023-2-30",
            remark: "-",
            status: "Approved",
        },
    ];
    const iconHandler = () => {
        // {console.log('row.status --->', row.pretexts);}
        return (
            <div className="flex justify-center items-center w-full gap-2">
                <div className="flex justify-center items-center w-full gap-2">
                    <i onClick={() => setinitiateReportssidebar(true)} className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
                    {/* <Link href="/NewFormModal"> */}
                        <i   onClick={() => SetShowNewFormModal(true)} className="gusd-edit text-[#667085] text-[20px] font-meduim"></i>
                    {/* </Link> */}
                    <i onClick={() => { setreminderDialog(true) }}   className="gusd-notification text-[#667085] text-[20px] xl:text-[1.250vw]"></i>
                </div>
            </div>
        );
    };
    
    const statusBodyTemplate = (rowData) => {
        return (
            <><Badge value="" severity={getSeverity(rowData.status)}></Badge> &nbsp; {rowData.status}</>
        );
    };
    const buildReportDetails = async (personnelActionTransactionCycle, title, status, initiator_id, target_user_id, approver_id, next_approver_id) => {
        let reportDetails = {};

        try {
            const details = await fetchAllDetailsAndSetObjects(target_user_id, approver_id, next_approver_id, initiator_id);

            if (details !== null) {
                const {
                    targetDetailsObj,
                    approverDetailsObj,
                    nextApproverDetailsObj,
                    initiatorDetailsObj
                } = details;

                reportDetails = {
                    id: personnelActionTransactionCycle.id,
                    initiated_date: personnelActionTransactionCycle.date,
                    previous_status: status,
                    title: title,
                    new_status: personnelActionTransactionCycle.status,
                    approverDetails: {
                        approver_id: approverDetailsObj?.userId,
                        approver_name: approverDetailsObj?.name,
                        approver_email: approverDetailsObj?.email,
                        approver_user_code: approverDetailsObj?.usercode
                    },
                    initiatorDetails: {
                        initiator_id: initiatorDetailsObj?.userId,
                        initiator_name: initiatorDetailsObj?.name,
                        initiator_email: initiatorDetailsObj?.email,
                        initiator_user_code: initiatorDetailsObj?.usercode
                    },
                    targetUserDetails: {
                        target_user_id: targetDetailsObj?.userId,
                        target_user_name: targetDetailsObj?.name,
                        target_user_email: targetDetailsObj?.email,
                        target_user_code: targetDetailsObj?.usercode
                    },
                    nextApproverDetails: {
                        next_approver_id: nextApproverDetailsObj?.userId,
                        next_approver_name: nextApproverDetailsObj?.name,
                        next_approver_email: nextApproverDetailsObj?.email,
                        next_approver_code: nextApproverDetailsObj?.usercode
                    }
                };
            } else {
                console.error('Details fetching failed.');
            }
        } catch (error) {
            console.error('Error building report details:', error);
        }

        return reportDetails;
    };
    const approveSelectedReport = async reportId => {
        const loggedUserId = reactLocalStorage.get("loggedUserId");
        try {

            const PersonalActionFormResponse = await fetchInitiateReport(reportId)
            if (PersonalActionFormResponse) {

                const original = await fetchReportTransactionCycles(reportId);

                if (original.length > 1) {
                    let PersonnelActionFormTransactionCycleResponse = await fetchReportTransactionCycles(reportId);
                    //check for review resubmitted  only once for teacher   shailesh        

                    if (PersonnelActionFormTransactionCycleResponse.length > 1 && PersonnelActionFormTransactionCycleResponse[0].status === "ReviewedResubmitted") {
                        await API.graphql({
                            query: mutations.updateTransactionCyclePersonnel,
                            variables: {
                                input: {
                                    id: PersonnelActionFormTransactionCycleResponse[0]?.id,
                                    isApproved: true,
                                    signature_File_Path: signaturePath || "",
                                    _version: PersonnelActionFormTransactionCycleResponse[0]._version

                                },
                            },
                        }).then(async () => {
                            //after we add another row for save report id for reporting managers approver
                            const addNewRowForRMReasponse = await API.graphql({
                                query: mutations.createTransactionCyclePersonnel,
                                variables: {
                                    input: {
                                        report_Id: reportId,
                                        from_Employee_Id: loggedUserId,
                                        to_Employee_Id: PersonalActionFormResponse?.deptHead,
                                        status: "Open",
                                        isApproved: false,
                                        remark: "",
                                        date: moment().format("YYYY-MM-DD")

                                    },
                                },
                            })

                            //console.log('PersonalActionFormResponse --->', PersonalActionFormResponse);
                            if (addNewRowForRMReasponse) {
                                setRequestApprovalConfirmVisible(true);
                                // setCheckedSignature(false);
                                const reportDetails = await buildReportDetails(addNewRowForRMReasponse?.data?.createTransactionCyclePersonnel, PersonalActionFormResponse.formTitle, "Open", PersonalActionFormResponse.submited_by, PersonalActionFormResponse.deptHead, loggedUserId, PersonalActionFormResponse.budgetClerk);
                                await handleNotificationsOnStatusChangeforPersonnelAction("Approved", reportDetails, "PERSONNEL_ACTION_FORM");
                                // await handleNotificationsOnStatusChangeforPersonnelAction("APPROVEDBY", reportDetails, "PERSONNEL_ACTION_FORM");
                            }
                        });
                    } else {
                        // here is the issue for approver flow
                        let teacher = PersonalActionFormResponse?.deptHead;
                        //console.log('teacher: ', teacher);
                        let secondApprover = PersonalActionFormResponse?.budgetClerk || null;
                        //console.log('secondApprover: ', secondApprover);
                        let thirdApprover = PersonalActionFormResponse?.budgetManager || null;
                        //console.log('thirdApprover: ', thirdApprover);
                        let fourthApprover = PersonalActionFormResponse?.executiveSecretary || null;
                        //console.log('fourthApprover: ', fourthApprover);
                        let elemorseceducationapprover = macthedemail?.userId || PersonalActionFormResponse?.executivedirelemId;
                        //console.log('elemorseceducationapprover --->', elemorseceducationapprover);
                        // let exedirelemId = exedirelemIduserId?.userId
                        // console.log('exedirelemId --->', exedirelemId);
                        let fifthApprover = PersonalActionFormResponse?.executiveManagement;
                        //console.log('fifthApprover: ', fifthApprover);
                        let sixthApprover = PersonalActionFormResponse?.hrTechnician;
                        //console.log('sixthApprover: ', sixthApprover);
                        let approverHrexectivesec = approverHrexectivesecuserId?.userId
                        let afterapproverhrExecutive = PersonalActionFormResponse?.psayesorno;
                        let payrollId = payrolluserId?.userId;
                        let seventhApprover = financeAnalyst?.userId ?? 0;

                        var toEmployeeId = "";
                        switch (loggedUserId) {
                            //reporting manager.
                            case teacher:
                                if (secondApprover == null || secondApprover == '') {
                                    toEmployeeId = fifthApprover;
                                } else {
                                    toEmployeeId = secondApprover;
                                }
                                break;
                            case secondApprover:
                                if (thirdApprover == null || thirdApprover == '') {
                                    toEmployeeId = fifthApprover;
                                } else {
                                    toEmployeeId = thirdApprover;
                                }
                                break;
                            case thirdApprover:
                                if (fourthApprover == null || fourthApprover == '') {
                                    toEmployeeId = fifthApprover;
                                } else {
                                    toEmployeeId = fourthApprover;
                                }
                                break;

                            case fourthApprover:
                                if (elemorseceducationapprover != null) {
                                    toEmployeeId = elemorseceducationapprover
                                    await API.graphql({
                                        query: mutations.updatePersonnelActionInitiatorForm,
                                        variables: {
                                            input: {
                                                id: PersonalActionFormResponse?.id,
                                                executivedirelemId: elemorseceducationapprover,
                                                assignelemorsec: valueelemsec

                                            },
                                        },
                                    })

                                } else {
                                    // toEmployeeId = fifthApprover;
                                    toast.error("Please enter valid mailid");
                                }
                                break;
                            case elemorseceducationapprover:
                                // console.log('exedirelemId --->', exedirelemId);
                                toEmployeeId = fifthApprover;
                                break;
                            // case exedirelemId:
                            //   toEmployeeId = fifthApprover;
                            //   break;
                            case fifthApprover:
                                toEmployeeId = sixthApprover;
                                break;
                            case sixthApprover:
                                //console.log('valueyesno --->', valueyesno);
                                if (valueyesno == "Yes") {
                                    toEmployeeId = approverHrexectivesec;
                                    break;
                                }
                                if (valueyesno == "No") {
                                    toEmployeeId = payrollId

                                    break;
                                }
                            case afterapproverhrExecutive:
                                //console.log('payrollId --->', payrollId);
                                toEmployeeId = payrollId;
                                break;
                            case approverHrexectivesec:
                                afterapproverhrExecutive = sixthApprover
                                //console.log('afterapproverhrExecutive --->', afterapproverhrExecutive);
                                toEmployeeId = afterapproverhrExecutive;
                                await API.graphql({
                                    query: mutations.updatePersonnelActionInitiatorForm,
                                    variables: {
                                        input: {
                                            id: PersonalActionFormResponse?.id,
                                            psayesorno: afterapproverhrExecutive,

                                        },
                                    },
                                })

                                break;

                            // case seventhApprover:
                            //   let sevenId = exicutiveDirector?.userId;

                            //   // Assign a default variable value if the logged user is not an approver
                            //   toEmployeeId = sevenId;
                            //   break;

                            // Add more cases for additional approvers if needed
                            default:

                                // Assign a default variable value if the logged user is not an approver
                                toEmployeeId = PersonalActionFormResponse.payrollId;
                                break;
                        }
                        console.log("toEmployeeId-----", toEmployeeId);

                        if (toEmployeeId !== "") {
                            // console.log('exedirelemId --->', exedirelemId);
                            //console.log("toEmployeeId-----", toEmployeeId);
                            if (toEmployeeId === payrollId) {
                                // when no approval send to payroll
                                const original = await fetchReportTransactionCycles(reportId);

                                if (original.length > 0) {
                                    let lastEntry = original[0];
                                    await API.graphql({
                                        query: mutations.updateTransactionCyclePersonnel,
                                        variables: {
                                            input: {
                                                id: lastEntry?.id,
                                                isApproved: true,
                                                status: "Closed",
                                                _version: lastEntry._version

                                            },
                                        },
                                    }).then(async () => {

                                        setRequestApprovalConfirmVisible(true);
                                        // alert("Payroll")
                                        const reportDetails = await buildReportDetails(lastEntry, PersonalActionFormResponse.formTitle, "Closed", PersonalActionFormResponse.submited_by, PersonalActionFormResponse.deptHead, loggedUserId, payrollId);
                                        await handleNotificationsOnStatusChangeforPersonnelAction("Closed", reportDetails, "PERSONNEL_ACTION_FORM");
                                        // updateRequestedReportList(reportId, "Approved", "Acknowledge", approverDesignations.site_admin)
                                        // await BindList();
                                        toast.success("Report Closed Successfully.");
                                    });
                                }

                            } else {
                                //second,third,fourth approver
                                await API.graphql({
                                    query: mutations.updateTransactionCyclePersonnel,
                                    variables: {
                                        input: {
                                            id: original[0]?.id,
                                            isApproved: true,
                                            status: "Approved",
                                            signature_File_Path: signaturePath || "",
                                            _version: original[0]._version

                                        },
                                    },
                                }).then(async () => {
                                    //after we add another row for save report id for third Approver (Budget Cleark).
                                    const addNewRowForRMReasponse = await API.graphql({
                                        query: mutations.createTransactionCyclePersonnel,
                                        variables: {
                                            input: {
                                                report_Id: reportId,
                                                from_Employee_Id: loggedUserId,
                                                to_Employee_Id: toEmployeeId,
                                                status: "Open",
                                                isApproved: false,
                                                remark: "",
                                                date: moment().format("YYYY-MM-DD")

                                            },
                                        },
                                    })


                                    if (addNewRowForRMReasponse) {
                                        setRequestApprovalConfirmVisible(true);
                                        // setCheckedSignature(false);
                                        const reportDetails = await buildReportDetails(addNewRowForRMReasponse?.data?.createTransactionCyclePersonnel, PersonalActionFormResponse.formTitle, "Approved", PersonalActionFormResponse.submited_by, PersonalActionFormResponse.deptHead, loggedUserId, toEmployeeId);
                                        await handleNotificationsOnStatusChangeforPersonnelAction("Approved", reportDetails, "PERSONNEL_ACTION_FORM");
                                        // await handleNotificationsOnStatusChangeforPersonnelAction("APPROVEDBY", reportDetails, "PERSONNEL_ACTION_FORM");

                                    }
                                });
                            }
                        }
                    }
                } else {
                    //first Approver's Approve.
                    let secondApprover = PersonalActionFormResponse?.budgetClerk;
                    let thirdApprover = PersonalActionFormResponse?.budgetManager;
                    let fourthApprover = PersonalActionFormResponse?.executiveSecretary;
                    let fifthApprover = PersonalActionFormResponse?.executiveManagement;
                    var toEmployeeId = "";

                    if (secondApprover == null || secondApprover == '') {
                        if (thirdApprover == null || thirdApprover == '') {
                            if (fourthApprover == null || fourthApprover == '') {
                                toEmployeeId = fifthApprover;
                            } else {
                                toEmployeeId = fourthApprover;
                            }
                        } else {
                            toEmployeeId = thirdApprover;
                        }
                    } else {
                        toEmployeeId = secondApprover;

                    }

                    console.log('toEmployeeId123: ', toEmployeeId);



                    await API.graphql({
                        query: mutations.updateTransactionCyclePersonnel,
                        variables: {
                            input: {
                                id: original[0]?.id,
                                isApproved: true,
                                status: "Approved",
                                signature_File_Path: signaturePath || "",
                                _version: original[0]._version

                            },
                        },
                    }).then(async () => {

                        //after we add another row for save report id for reporting managers approver
                        const addNewRowForRMReasponse = await API.graphql({
                            query: mutations.createTransactionCyclePersonnel,
                            variables: {
                                input: {
                                    report_Id: reportId,
                                    from_Employee_Id: loggedUserId,
                                    to_Employee_Id: toEmployeeId,
                                    status: "Open",
                                    isApproved: false,
                                    remark: "",
                                    date: moment().format("YYYY-MM-DD")

                                },
                            },
                        })


                        const reportDetails = await buildReportDetails(addNewRowForRMReasponse?.data?.createTransactionCyclePersonnel, PersonalActionFormResponse.formTitle, "Approved", PersonalActionFormResponse.submited_by, PersonalActionFormResponse.deptHead, loggedUserId, toEmployeeId);
                        await handleNotificationsOnStatusChangeforPersonnelAction("Approved", reportDetails, "PERSONNEL_ACTION_FORM");
                        // await handleNotificationsOnStatusChangeforPersonnelAction("APPROVEDBY", reportDetails, "PERSONNEL_ACTION_FORM");


                        if (addNewRowForRMReasponse) {
                            setRequestApprovalConfirmVisible(true);
                            // setCheckedSignature(false);
                        }
                    });
                }
            }
            // setVisibleAgreementPopup(true);

            return false;
        } catch (err) {
            console.log("approveSelectedReport function while fetch report metadata", err);
        }
    }

    const rejectSelectedReport = async reportId => {
        if (rejectMsgValue === "") {
            toast.error("Please Add Reason For Rejection");
            return;
        }

        if (!fallBackApprover) {
            toast.error("Please Select A Fall Back Approver");
            return;
        }

        const reportData = await fetchInitiateReport(reportId)

        // get specific report id transaction table data and add rejected status in specific entry
        try {
            const original = await fetchPaginatedRecords(
                queries.listTransactionCyclePersonnels,
                { report_Id: { eq: reportId } },
                { field: "createdAt", direction: "desc" },
                1000,
                'listTransactionCyclePersonnels'
            )


            let newOriginal = [];


            for (let i = 0; i < original.length; i++) {
                let currentItem = original[i];

                if (currentItem.to_Employee_Id === loggedUserId) {


                    newOriginal.push(currentItem);

                    break;
                }
            }

            await API.graphql({
                query: mutations.updateTransactionCyclePersonnel,
                variables: {
                    input: {
                        id: newOriginal[0]?.id,
                        status: "Rejected",
                        remark: rejectMsgValue,
                        approver_level: fallBackApprover?.Value,
                        _version: newOriginal[0]._version

                    },
                },
            }).then(async () => {
                // setSendMsg(true);
                // if (fallBackApproverLevel > 0) {
                //   console.log('fallBackApprover1: ', fallBackApprover);
                //   const addNewRowForRMReasponse = await DataStore.save(
                //     new TransactionCyclePersonnel({
                //       report_Id: reportId,
                //       from_Employee_Id: loggedUserId,
                //       to_Employee_Id: fallBackApprover?.Value,              
                //       status: "Open",
                //       // approver_level: approverLevelTypeDic[fallBackApproverLevel - 1],
                //       isApproved: false,
                //       remark:rejectMsgValue,
                //       date: moment().format("YYYY-MM-DD")
                //     })
                //   );
                //   if (addNewRowForRMReasponse) {
                //     const reportDetails = await buildReportDetails(addNewRowForRMReasponse, reportData[0].formTitle, "Rejected", reportData[0].submited_by, reportData[0].deptHead, loggedUserId, fallBackApprover);
                //     await handleNotificationsOnStatusChangeforPersonnelAction("Rejected", reportDetails, "PERSONNEL_ACTION_FORM");
                //     // console.log("added a fall back approver " + addNewRowForRMReasponse);
                //   }
                // } else {
                const responseRow = { report_Id: reportId, date: reportData?.createdAt, status: "Rejected" }
                const reportDetails = await buildReportDetails(responseRow, reportData.formTitle, "Rejected", reportData.submited_by, reportData.deptHead, loggedUserId, fallBackApprover);
                await handleNotificationsOnStatusChangeforPersonnelAction("Rejected", reportDetails, "PERSONNEL_ACTION_FORM");
                // }
                setSendMsg(true);
            });
        } catch (err) {
            console.log("Error in reject specific report function");
        }

    };

    const acknowledgeSelectedReport = async reportId => {
        //console.log("APPP approveSelectedReport reportId:-", reportId);

        const loggedUserId = reactLocalStorage.get("loggedUserId");

        const reportData = await DataStore.query(PersonnelActionInitiatorForm, c => c.id.eq(reportId));
        const report = reportData?.[0];

        try {
            const original = await DataStore.query(TransactionCyclePersonnel, c => c.report_Id.eq(reportId), {
                sort: s => s.createdAt(SortDirection.DESCENDING)
            });

            if (original.length > 0) {
                let lastEntry = original[0];

                await DataStore.save(
                    TransactionCyclePersonnel.copyOf(lastEntry, updated => {
                        updated.isApproved = true;
                        updated.status = "Closed";
                    })
                ).then(async () => {

                    setPayrollreportEditslider(false);
                    const reportDetails = await buildReportDetails(lastEntry, report?.formTitle, "Open", report?.created_by, report?.deptHead, loggedUserId, null);
                    await handleNotificationsOnStatusChange("Acknowledge", reportDetails, "PERSONNEL_ACTION_FORM");
                    // updateRequestedReportList(reportId, "Approved", "Acknowledge", approverDesignations.site_admin)
                    // await BindList();
                    toast.success("Report Acknowleged Successfully.");
                });
            }
        } catch (err) {
            console.log("Error in Payroll Acknowledge Report.", err);
        }
    };
    async function fetchActionFormData() {
        var employee = await DataStore.query(PersonnelActionInitiatorForm);
        setPersonalActionReportList(employee);
        return;
    }

    //console.log("employee", personalActionReportList);

    const handleDeleteRow = async employeeId => {
        const toDelete = await DataStore.query(PersonnelActionInitiatorForm, employeeId);
        if (toDelete) {
            DataStore.delete(toDelete);
            //console.log("deleted a row");
        }
        const updatedData = personalActionReportList.filter(item => item.id !== employeeId);

        setPersonalActionReportList(updatedData);
    };

    const deleteButton = rowData => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={() => handleDeleteRow(rowData.id)}
            />
        );
    };

    const cancelButton = (handler) => {
        return (
            <button
                onClick={handler}
                type="button"
                className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
                id="add-family-cancel-btn"
            >
                Cancel
            </button>
        )
    }
    const footerContentForReqReject = () => (
        <div className="text-center">
            {sendMsg ? (
                <>
                    <button
                        className="bg-[#113699] border border-[##113699] text-white px-8
           py-2 rounded"
                        onClick={() => {
                            initiatorBindList();
                            setRejectVisible(false);
                            // setVisibleRequestedReportEdit(false);
                            setSendMsg(false);
                            setAddSignature(false);
                            setrequestedreportEdit(false)
                            // if (visibleAgreementPopup) { setVisibleAgreementPopup(false); }
                        }}
                    >
                        Ok
                    </button>
                    {cancelButton(() => {
                        setFallBackApprover(null);
                        setRejectVisible(false);
                    })}
                </>
            ) : (
                <>
                    <button
                        className="bg-[#113699] border border-[##113699] text-white px-8
           py-2 rounded"
                        onClick={() => {
                            rejectSelectedReport(apprpverdataEdit?.id);
                        }}
                    >
                        Send
                    </button>
                    {cancelButton(() => {
                        setFallBackApprover(null);
                        setRejectVisible(false);
                    })}
                </>
            )}
        </div>
    );
    const footerContentForReqApproval = (
        <div className="text-center">
            <button
                className="border border-[#1E1E1E] text-[#1E3E5A] px-4 py-2 rounded"
                onClick={() => {
                    initiatorBindList();
                    setRequestApprovalConfirmVisible(false);
                    // setVisibleRequestedReportEdit(false);
                    setAddSignature(false);
                    setrequestedreportEdit(false)
                    // if (visibleAgreementPopup) { setVisibleAgreementPopup(false); }
                }}
            >
                Close
            </button>
        </div>
    );
    // status
    const footerContentForReminder = (
        <div className="text-center">
            <div className="d-flex">
                <button
                   onClick={() => { setreminderDialog(false) }} 
                    type="button"
                    className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
                // id="add-family-cancel-btn"
                >
                    Yes
                </button>
                <button
                    onClick={() => { setreminderDialog(false) }} 
                    type="button"
                    className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[14px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
                    id="add-family-cancel-btn"
                >
                    No
                </button>
            </div>
        </div>
    );

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

    const getSeverity = product => {
        // console.log("hiiii",product)
        switch (product) {
            
            case "Completed":
                return "info";
            case "Submitted":
                return "info";
                
            case "Pending for Approval":
                return "warning";
            case "Pending for Approval Teacher":
                return "warning";
            case "Pending for Approval Site Admin/ Dept Head":
                return "warning";
            case "Pending for Approval Budget Clerk":
                return "warning";
            case "Pending for Approval Budget Director":
                return "warning";
            case "Pending for Approval HR Director":
                return "warning";
            case "Pending for Approval HR Technician (Payroll)":
                return "warning";
            case "Pending for Approval HR Executive Secretary":
                return "warning";
            case "Pending for Approval Executive Director":
                return "warning";
            case "Pending for Acknowledgement":
                return "warning";
            case "Rejected":
                return "danger";
            case "Rejected_Editable":
                return "danger";
            case "Pending":
                return "warning";
            case "Submitted":
                return "info";
            case "SUBMITTED":
                return "info";
            case "Approved":
                return "success";
            case "Approved (P)":
                return "success";
                
                case "Approved":
                return "success";
            case "Acknowledge":
                return "success";
            case "Acknowledged HR Technician (Payroll)":
                return "success";
            case "Reviewed & resubmitted":
                return "info";
            default:
                return null;
        }
    };

    const payrollStatusBody = product => {
        return <><Badge value="" severity={payrollStatusOptions(product)}></Badge> {product.status}</>;
    };
    const payrollStatusOptions = product => {
        console.log("pppp",product);
        switch (product.status) {
            case "Pending for Acknowledge":
                return "warning";
            case "SUBMITTED":
                return "info";
            case "Acknowledged":
                return "success";

            // case 'Rejected':
            //     return 'danger';

            // case 'Closed':
            //     return 'info';

            default:
                return null;
        }
    };
    const requestReportStatus = product => {
        let prodStatus = product.status;
        let designation = product.designation;

        return <><Badge value={""} severity={requestReportStatusOptions(product)}></Badge> {product.pretexts}</>;


    };

    const requestReportStatusOptions = product => {
        //console.log('product: ', product.status);
        switch (product.status) {
            case "Rejected":
                return "danger";
            case "Submitted":
                return "danger";
            case "Rejected_Editable":
                return "danger";
            case "Pending for Approval":
                return "warning";
            case "Approved":
                return "success";
            case "Acknowledge":
                return "success";
            case "Submitted":
                return "info";
            case "SUBMITTED":
                return "info";
            default:
                return null;
        }
    };
    //status end
    const validateEmail = (input) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(input);
    };

    useEffect(() => {
        const matchingObject = valueelemsec == 'Elementery' ? exedirelemeduuserId : exedirseceduuserId
        SetMacthedemail(matchingObject);
        setEmail(matchingObject?.email);
        // setIsValidEmail(validateEmail(matchingObject?.email)); 
    }, [valueelemsec])
    return (
        <>
            <ReactFullscreen>
                {({ onToggle }) => (
                    <Layout pageTitle="Report" activeMenu="Initiator" reDirectUrl={"/initiator/initiatereportlist"}
                        appId='PERSONNEL_ACTION_FORM' IsSuperadmin={personnelActionIsSuperadmin}
                    >
                        <div className="report-wrapper pt-24 md:pt-28 xl:pt-[2.083vw]">
                            <div className="flex justify-end visible lg:hidden">
                                <Button
                                    icon="pi pi-bars"
                                    onClick={toggleActive}
                                    style={{
                                        color: "#308B90",
                                        background: "#ffffff00",
                                        border: "1",
                                        borderColor: "#308B90",
                                        width: "38px",
                                        padding: "6px 0",
                                        borderRadius: "4px"
                                    }}
                                ></Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 xl:gap-[1.250vw] pb-5">
                                {/* <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-3">
                  <div>
                    <div id={activate} className="bg-[#FFFFFF] rounded-lg box-shadow-1 radius4 p-4 xl:p-[0.833vw] top-5 lg:sticky fixed -left-96 lg:left-0 lg:overflow-hidden lg:h-auto z-10" data-aos="fade-up" data-aos-duration="800">
                      <div className="flex justify-between text-[#101828] font-medium text-base tracking-[0.02em] xl:text-[0.932vw]">
                        <p>Forms</p>
                        <div className="xl:w-[10.058vw] md:w-[200px] custinput">
                          <span className="w-full p-input-icon-left">
                            <i className="gusd-search text-[#667085] mt-0" />
                            <InputText placeholder="Search" className="w-full" />
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 h-[600px] xl:h-[38vw]  overflow-auto">

                        <div className="bg-[#0F1E4C]  radius4 p-[16px] xl:p-[0.833vw]">
                          <h6 className="font-medium text-[16px] text-[#fff] xl:text-[0.833vw] mb-2">Personal Actions</h6>
                          <div className="flex justify-between gap-2 xl:gap-[0.833vw] xl:mt-[0.833vw]">
                            <div className="flex items-center gap-1">
                              <div className="bg-[#EAEFFF] text-[16px] xl:text-[0.833vw] border border-[#99B2FF] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                {weeklyAbsenceReportSubmitted === 0 ? 0 : weeklyAbsenceReportSubmitted}
                              </div>
                              <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Submitted</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#D1FADF] text-[16px] xl:text-[0.833vw] border border-[#A6F4C5] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                {weeklyAbsenceReportApproved === 0 ? 0 : weeklyAbsenceReportApproved}
                              </div>
                              <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Approved </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="bg-[#FEF3F2] text-[16px] xl:text-[0.833vw] border border-[#FEE4E2] radius4 text-[#0D256D] font-semibold xl:w-[1.927vw] xl:h-[1.250vw] w-[37px] text-center">
                                {weeklyAbsenceReportRejected === 0 ? 0 : weeklyAbsenceReportRejected}
                              </div>
                              <div className="text-[12px] xl:text-[0.625vw] text-[#fff] font-normal">Rejected</div>
                            </div>
                           
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div> */}

                                <div className="relative z-10 col-span-12 lg:col-span-12" data-aos="fade-down" data-aos-duration="800">
                                    <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]">
                                        <div className="flex items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
                                            <div className="flex gap-2">
                                                <p className="text-[22px] xl:text-[0.938vw] text-[#101828] font-medium">Personnel Action</p>
                                                {/* <Tag severity="" value={`${weeklyAbsenceReports.length} Request`} style={{ background: '#EFF8FF', color: '#0487C8', marginTop: "-3px" }} rounded></Tag> */}
                                            </div>

                                            <div className="flex gap-2 xl:gap-[0.990vw] items-center">

                                                <>
                                                    <button
                                                        onClick={() => SetShowNewFormModal(true)}
                                                        className="w-full text-center tableBtn blue radius8"
                                                    >
                                                        <i className="gusd-pluse-circle mx-1.5 "></i> Initiate New Form
                                                    </button>
                                                    <Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            exportFilteredDataToCSV("PersonalActions.csv");
                                                            e.preventDefault()
                                                        }}
                                                        className=" "
                                                    >
                                                        {" "}
                                                        <i className="pi pi-download "></i>
                                                    </Link>
                                                </>



                                                <div className="relative dropcheck"></div>
                                                <Link
                                                    href=""
                                                    onClick={() => {
                                                        onToggle();
                                                    }}
                                                >
                                                    {" "}
                                                    <i className="gusd-expand"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="custom_tabs">
                                            <TabView onTabChange={""}>
                                                <TabPanel header="Initiate Reports">
                                                    <DataTable
                                                           className="custpaginator custIconsTable custmBtnTable custTable"
                                                           scrollable
                                                           filters={""}
                                                           filterDisplay="row"
                                                           value={DatatableValue}
                                                           paginator
                                                           rowsPerPageOptions={[10, 20, 30]}
                                                           responsiveLayout="scroll"
                                                           paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                                           rows={11}
                                                           emptyMessage="No records found."
                                                    >
                                                        <Column
                                                            field="id"
                                                            header="SI#"
                                                            headerStyle={{ width: "1rem" }}
                                                            style={{ minWidth: "4rem", maxWidth: "4rem" }}
                                                        />
                                                        <Column
                                                            field="reportno"
                                                            header="Personnel Report No"
                                                            sortable
                                                            filter
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "12rem" }}
                                                        />
                                                        <Column
                                                            field="title"
                                                            sortable
                                                            header="Form Title"
                                                            filterField="country.name"
                                                            style={{ minWidth: "8rem" }}
                                                            filter
                                                            filterPlaceholder="Search"
                                                        />
                                                        <Column
                                                            field="location"
                                                            sortable
                                                            filter
                                                            header="Location"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "8rem" }}
                                                        />
                                                        <Column
                                                            field="action"
                                                            sortable
                                                            header="Action To Be Taken"
                                                            body={""}
                                                            filter
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "15rem" }}
                                                        />
                                                        <Column
                                                            field="type"
                                                            sortable
                                                            filter
                                                            align="center"
                                                            header="Type"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "16rem" }}
                                                        />
                                                        <Column
                                                            field="date"
                                                            sortable
                                                            filter
                                                            header="Board Meeting Date"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "15rem" }}
                                                        />
                                                        <Column
                                                            field="status"
                                                            header="Status"
                                                            filter
                                                            filterPlaceholder="Search"
                                                            showFilterMenu={false}
                                                            style={{ minWidth: "12rem" }}
                                                            body={statusBodyTemplate}
                                                            filterElement={statusRowFilterTemplatePayroll}
                                                        />
                                                           
                                                           <Column
                                                            field="remark"
                                                            sortable
                                                            filter
                                                            align="center"
                                                            header="Assignee"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field="remark"
                                                            sortable
                                                            filter
                                                            align="center"
                                                            header="Remark"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field=""
                                                            body={iconHandler}
                                                            align="center"
                                                            header="Action"
                                                            alignFrozen="right"
                                                            frozen style={{ width: '250px' }}
                                                        ></Column>
                                                    </DataTable>
                                                </TabPanel>
                                                <TabPanel header="Requested Reports">
                                                    <DataTable
                                                         className="custpaginator custIconsTable custmBtnTable custTable"
                                                         scrollable
                                                         filters={""}
                                                         filterDisplay="row"
                                                         value={DatatableValue}
                                                         paginator
                                                         rowsPerPageOptions={[10, 20, 30]}
                                                         responsiveLayout="scroll"
                                                         paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                                         rows={11}
                                                         emptyMessage="No records found."
                                                    >
                                                        <Column
                                                            field="id"
                                                            header="SI#"
                                                            style={{ minWidth: "4rem", maxWidth: "4rem" }}
                                                        />
                                                        <Column
                                                            field="reportno"
                                                            header="Personnel Report No"
                                                            sortable
                                                            filter
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "12rem" }}
                                                        />
                                                        <Column
                                                            field="title"
                                                            sortable
                                                            header="Form Title"
                                                            filterField="country.name"
                                                            style={{ minWidth: "8rem" }}
                                                            filter
                                                            filterPlaceholder="Search"
                                                        />
                                                        <Column
                                                            field="location"
                                                            sortable
                                                            filter
                                                            header="Location"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "8rem" }}
                                                        />
                                                        <Column
                                                            field="action"
                                                            sortable
                                                            header="Action To Be Taken"
                                                            body={""}
                                                            filter
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "15rem" }}
                                                        />
                                                        <Column
                                                            field="type"
                                                            sortable
                                                            filter
                                                            align="center"
                                                            header="Type"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "16rem" }}
                                                        />
                                                        <Column
                                                            field="date"
                                                            sortable
                                                            filter
                                                            header="Board Meeting Date"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "15rem" }}
                                                        />
                                                        <Column
                                                            field="status"
                                                            header="Status"
                                                            filter
                                                            filterPlaceholder="Search"
                                                            showFilterMenu={false}
                                                            style={{ minWidth: "12rem" }}
                                                            body={statusBodyTemplate}
                                                            filterElement={statusRowFilterTemplatePayroll}
                                                        />

                                                        <Column
                                                            field="remark"
                                                            sortable
                                                            filter
                                                            header="Remark"
                                                            align="center"
                                                            filterPlaceholder="Search"
                                                            style={{ minWidth: "10rem" }}
                                                        />
                                                        <Column
                                                            field=""
                                                            body={iconHandler}
                                                            header="Action"
                                                            align="center"
                                                            alignFrozen="right"
                                                            frozen style={{ width: '250px' }}
                                                        ></Column>
                                                    </DataTable>
                                                </TabPanel>
                                            </TabView>
                                        </div>

                                        {
                                            editPopup ?
                                                editPopupfromAP ?
                                                    <EditFormModal
                                                        personnelActionIsSuperadmin={personnelActionIsSuperadmin}
                                                        initiatorBindList={initiatorBindList}
                                                        requestedData={apprpverdataEdit}
                                                        showNewFormModal={editPopup}
                                                        HideShowNewFormModal={() => setEditPopup(false)}
                                                        setrequestedreportEdit={() => setrequestedreportEdit(false)}
                                                    /> : <EditFormModal
                                                        personnelActionIsSuperadmin={personnelActionIsSuperadmin}
                                                        initiatorBindList={initiatorBindList}
                                                        requestedData={editRowData}
                                                        showNewFormModal={editPopup}
                                                        HideShowNewFormModal={() => setEditPopup(false)}
                                                        setrequestedreportEdit={() => setrequestedreportEdit(false)}
                                                    /> : null
                                        }

                                        <NewFormModal
                                            initiatorBindList={initiatorBindList}
                                            showNewFormModal={showNewFormModal}
                                            HideShowNewFormModal={() => SetShowNewFormModal(false)}
                                        />
                                        <Dialog
                                            className="relative reports-popup"
                                            visible={visible}
                                            position={position}
                                            style={{ width: "50vw" }}
                                            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                                            onHide={() => setVisible(false)}
                                            draggable={false}
                                            resizable={false}
                                        >
                                            <div className="grid grid-cols-1 lg:grid-cols-12">
                                                <div className="col-span-1 lg:col-span-12 bg-[#F5F6F7] h-auto">
                                                    <div className="p-5">
                                                        <Link href="#"
                                                            onClick={() => {
                                                                setVisible(false);
                                                            }}
                                                            className="py-3"
                                                        >
                                                            <img src="/assets/images/sidebarright.svg " alt="user" width="24" height="24" />
                                                        </Link>

                                                        <div className="text-[#113699] text-md lg:text-[0.833vw] font-bold">
                                                            Glendale Unified School District
                                                        </div>
                                                        <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">
                                                            Weekly Absence Report - Classified form
                                                        </div>

                                                        <div className="pt-3">
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                                <div className="font-medium">School or Department </div>
                                                                <div className="font-semibold ">{schoolName}</div>
                                                            </div>
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                                <div className="font-medium">From </div>
                                                                <div className="font-semibold ">{fromDate}</div>
                                                            </div>
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                                <div className="font-medium">To </div>
                                                                <div className="font-semibold ">{toDate}</div>
                                                            </div>
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                                <div className="font-medium">Status </div>
                                                                <Tag
                                                                    severity=""
                                                                    value={status}
                                                                    className=""
                                                                    style={{ background: "#EBFFF3", color: "#003D19" }}
                                                                ></Tag>
                                                                {/* <div >Approved</div> */}
                                                            </div>
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                                                                <div className="font-medium">Approved By </div>
                                                                <div className="font-semibold ">{approvedBy}</div>
                                                            </div>
                                                            <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw]">
                                                                <div className="font-medium">Submitted By </div>
                                                                <div className="font-semibold ">{submittedBy}</div>
                                                            </div>
                                                        </div>

                                                        <div className="py-3 emp-simple-tbl">
                                                            <DataTable value={reportEmployeeList}>
                                                                <Column field="employeeName" header="Name of Employee"></Column>
                                                                <Column field="absent_date" header="Dates Absent"></Column>
                                                                <Column field="absent_code_id" header="Absent Codes"></Column>
                                                                <Column field="substitutedEmployeeName" header="Substitute"></Column>
                                                                <Column
                                                                    field="partial_hour"
                                                                    body={row => {
                                                                        return (
                                                                            <h1>
                                                                                {(row.partial_hour === null ? "0" : row.partial_hour) +
                                                                                    "." +
                                                                                    (row.partial_min === null
                                                                                        ? "0"
                                                                                        : Number((row.partial_min / 60) * 100).toFixed(0)) +
                                                                                    " Hr"}{" "}
                                                                            </h1>
                                                                        );
                                                                    }}
                                                                    header="Total Hours"
                                                                ></Column>
                                                            </DataTable>
                                                        </div>

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
                                                                        <div className="col-span-1 font-semibold text-right">J -</div>
                                                                        <div className="col-span-4 pl-1">Jury Duty</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">S -</div>
                                                                        <div className="col-span-4 pl-1">Suspension</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">V -</div>
                                                                        <div className="col-span-4 pl-1">Vacation</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">W -</div>
                                                                        <div className="col-span-4 pl-1">Witness (District)</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">DC -</div>
                                                                        <div className="col-span-4 pl-1">District Covid</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">PN -</div>
                                                                        <div className="col-span-4 pl-1">Personal Necessity</div>
                                                                    </div>
                                                                    <div className="grid grid-cols-5 pb-0.5">
                                                                        <div className="col-span-1 font-semibold text-right">B -</div>
                                                                        <div className="col-span-4 pl-1">Berevement</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div onClick={handlePrint} className="bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                                                            <i className="mr-3 gusd-print-outline"></i>
                                                            <span className="printicon" >
                                                                Print
                                                            </span>

                                                            <div style={{ display: "none" }}>
                                                                <div ref={componentRef} className="printTable" id="divname">
                                                                    <center className="font-bold text-[20px]">GLENDALE UNIFIED SCHOOL DISTRICT</center>
                                                                    <center className="font-bold">WEEKLY ABSENCE REPORT</center>
                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <p className="float-right">
                                                                            <span className="font-bold">School or Dept. :- </span>
                                                                            {schoolName}{" "}
                                                                        </p>
                                                                        <br />

                                                                        <p className="float-right">
                                                                            <span className="font-bold">Period From :- </span>
                                                                            {fromDate}{" "}
                                                                        </p>
                                                                        <br />

                                                                        <p className="float-right">
                                                                            <span className="font-bold">Period To :- </span>
                                                                            {toDate}{" "}
                                                                        </p>
                                                                    </div>

                                                                    <table style={{ width: "100%", marginTop: "80px" }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    Name of Employee
                                                                                </th>
                                                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Dates Absent</th>
                                                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Absent Code</th>
                                                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Substitute</th>
                                                                                <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Total Hours</th>
                                                                            </tr>
                                                                            {reportEmployeeList.map(item => {
                                                                                return (
                                                                                    <tr className="text-center">
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                            {item.employeeName}
                                                                                        </td>
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                            {item.absent_date}
                                                                                        </td>
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                            {item.absent_code_id}
                                                                                        </td>
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                            {item.substitutedEmployeeName}
                                                                                        </td>
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                            {item.partial_hour}.
                                                                                            {item.partial_min === null
                                                                                                ? "0"
                                                                                                : Number((item.partial_min / 60) * 100).toFixed(0)}{" "}
                                                                                            Hr{" "}
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>

                                                                    <div className="mt-8 font-bold">ABSENCE CODES</div>

                                                                    <table style={{ width: "100%", marginTop: "20px" }}>
                                                                        <tbody>
                                                                            <tr className="text-[12px]">
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>B - Bereavement</td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    NA - Personal (Not Approved)
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>S - Suspension</td>
                                                                            </tr>
                                                                            <tr className="text-[12px]">
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    D - District Approved
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    OU - Other Unpaid
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>V - Vacation</td>
                                                                            </tr>
                                                                            <tr className="text-[12px]">
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>I - Illness</td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    PA - Personal (Approved)
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    W - Witness (District)
                                                                                </td>
                                                                            </tr>
                                                                            <tr className="text-[12px]">
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>J - Jury Duty</td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    WC - Worker's Compensation
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    DC - District Covid
                                                                                </td>
                                                                            </tr>
                                                                            <tr className="text-[12px]">
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    L - Last Day Worked
                                                                                </td>
                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                    PN - Personal Necessity
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">
                          <div className="p-5">
                            <div className="text-[#344054] text-[16px] font-medium py-3">Form History</div>
                            <div>
                              {
                                reportLogList.map((item, index) => {
                                  return (
                                    <div className="flex items-start justify-between gap-2 py-2">
                                      <Image src={item.ProfilePic} alt="user" width="32" height="32" />
                                      <div className="">
                                        <div className="flex justify-between">
                                          <div>
                                            <div className="text-[#344054] font-semibold text-[14px]">{item.name}</div>
                                            <div className="text-[#667085] text-[10px] pb-2 pt-1">
                                              <i className="mr-1 gusd-commented"></i>
                                              <span>Commented on parties Tab</span>
                                            </div>
                                          </div>
                                          <div className="text-[#344054] text-[12px]">{item.dateTime}</div>
                                        </div>
                                        <div className="text-[#344054] text-[12px] font-normal p-[8px] bg-[#F5F6F7] rounded-[8px]">{item.comment}</div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div> */}
                                            </div>
                                        </Dialog>
                                    </div>
                                    {/* <Dialog
                    header="Reminder"
                    visible={ReminderDialog}
                    style={{ width: "30vw" }}
                    onHide={() => {
                      setreminderDialog(false);
                    }}
                    closable={false}
                    footer={footerContentForReminder}
                  >
                    <p className="m-0 text-[#0487C8] text-center">
                      <i className="mr-2 pi pi-check-circle"></i>
                      <span className="font-medium text-[18px]">{`By clicking Yes, a reminder will be sent to the ${ReminderData?.reminderName} to approve the form. Click No to cancel.`}</span>
                    </p>
                  </Dialog> */}
                                    <Sidebar
                                        visible={visibleRight}
                                        position="right"
                                        onHide={() => setVisibleRight(false)}
                                        style={{ width: "35vw" }}
                                        className="customesidebar1 responsivepoup"
                                    >
                                        <Editpopup
                                            popupstate={() => setVisibleRight(false)}
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

                                    {/* /******************* new************************* */}
                                    {/* View Initiate Reports */}
                                    <Sidebar
                                        className="PSAviewPopup"
                                        visible={InitiateReportssidebar}
                                        position="right"
                                        onHide={() => { setinitiateReportssidebar(false); setShowStatusPrint(false) }}
                                        style={{ width: "65vw", minWidth: "40rem", background: "#F5F6F7" }}
                                    >
                                        <div className="grid grid-cols-2 lg:grid-cols-12">
                                            <div className="col-span-1 lg:col-span-8 xl:py-[1.667vw] py-[28px] xl:px-[1.250vw] px-[20px] lg:space-y-[1.250vw] space-y-2 h-full">
                                                <div className="relative h-full">
                                                    {/*col*/}
                                                    <div className="cursor-pointer mb-[15px]" onClick={() => { setinitiateReportssidebar(false); setShowStatusPrint(false) }}>
                                                        <i className="gusd-close-sidebar text-[24px]"></i>
                                                    </div>
                                                    {/*col*/}
                                                    <div>
                                                        <div className="text-[#113699] font-semibold text-sm xl:text-[0.938vw]">
                                                            Glendale Unified School District
                                                        </div>
                                                        <div className="text-[#344054] font-normal text-xs xl:text-[0.677vw]">Personnel Action</div>
                                                    </div>
                                                    <div className="xl:h-[36.250vw] 2xl:h-[38.250vw] lg:h-[28.250vw] overflow-auto">
                                                        <div className="status-list">
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Status</div>
                                                                <div className="text-[#FF7F01] text-[12px] bg-[#FFF2E5] py-[4px] px-[8px] rounded-[18px]">
                                                                    <i className="gusd-dot text-[10px] mr-1"></i> Closed By HR Technician
                                                                    {/* {apprpverdataEdit.pretexts} */}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Type</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">Certificated
                                                                    {/* {apprpverdataEdit.type} */}
                                                                    </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Board Meeting Date</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">11/10/2023
                                                                    {/* {moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")} */}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Personnel Report No</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.personalReportNo}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Location</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.location}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Action to be Taken</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.actionToBeTaken}</div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3">
                                                            <p>Approval Status</p>
                                                            <div className="py-3 emp-simple-tbl">
                                                                <DataTable
                                                                    className="custpaginator custIcons custmBtnTable custTable"
                                                                    value={specificReportDetailsView.approvalFinalData}
                                                                >
                                                                    <Column field="empCode" header="Employee Id"></Column>
                                                                    <Column field="empName" header="Name"></Column>
                                                                    <Column field="appStatus" body={approvalStatusBody} header="Status"></Column>
                                                                    <Column field="approvedDate" header="Time Stamp"></Column>
                                                                </DataTable>
                                                            </div>
                                                        </div>
                                                        <div className=" bg-[#EFF0F1] mt-[24px] rounded-[8px] p-[8px]">
                                                            <div>
                                                                <div className="flex justify-between gap-2 text-[22px] text-[#000] items-center my-3">
                                                                    <div><i className="pi pi-file"></i> Personnel Action.pdf</div>
                                                                    <div className="flex justify-end">
                                                                        <div
                                                                            onClick={() => setinitiateReportsfullscreen(true)}
                                                                            className="text-[#113699] font-medium text-[14px] pb-3 cursor-pointer"
                                                                        >
                                                                            <i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen{" "}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div ref={componentRef} className="text-black bg-white p-3">
                                                                    <div class="text-center mt-5">
                                                                        <div class="text-sm text-black font-semibold"> GLENDALE UNIFIED SCHOOL DISTRICT </div>
                                                                        <div class="text-base text-black font-semibold"> BOARD REPORT PERSONNEL ACTION </div>
                                                                    </div>
                                                                    <div class="flex justify-between my-3 ">
                                                                        <div class="m-2 text-sm">
                                                                            Location  : {apprpverdataEdit.location}<br></br>
                                                                            Action to be Taken  : {apprpverdataEdit.actionToBeTaken}<br></br>
                                                                            Type : {apprpverdataEdit.type}
                                                                            {apprpverdataEdit.actionItem ? <div>Action Item : {apprpverdataEdit.actionItem}<br></br></div> : null}
                                                                        </div>
                                                                        <div class="m-2 text-sm">
                                                                            Board Meeting Date : {moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")} <br></br>
                                                                            Personnel Report No : {apprpverdataEdit.personalReportNo}<br></br>
                                                                            {apprpverdataEdit.actionDate ? <div>Action Date : {apprpverdataEdit.actionDate}<br></br></div> : null}
                                                                            {apprpverdataEdit.actionPage ? <div>Action Page : {apprpverdataEdit.actionPage}<br></br></div> : null}
                                                                        </div>
                                                                    </div>

                                                                    <div className="overflow-x-auto" style={{ display: display ? 'none' : 'block' }}>
                                                                        <table class="table border border-stone-900 text-xs">
                                                                            <thead>
                                                                                <tr class="border ">
                                                                                    {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Emp ID
                                        </th> */}
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Emp Name
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" colSpan={2} scope="col">
                                                                                        Position Title
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Effective Date (From-To)
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Salary Rate or Reason
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Not To Exceed
                                                                                    </th>
                                                                                    {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Reason
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Funding Source
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Account No
                                        </th> */}
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Funding Source(s) and Account Number(s)
                                                                                    </th>
                                                                                </tr>
                                                                                <tr class="border ">
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {employeeArray?.map(item => {
                                                                                    return <tr class="border">
                                                                                        {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                            {item.employeeId}
                                          </th> */}
                                                                                        <td className="border border-[#000] px-2 py-2">
                                                                                            {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                            {/* {item.employeeName} */}
                                                                                            {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy")} - {moment(item.effectiveDatesTo).format("MM/DD/yyyy")}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.salaryRate}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.rateofPay}</td>
                                                                                        {/* <td className="border border-[#000] px-2 py-2">{item.reason}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.fundingSource}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.accountNo}</td> */}
                                                                                        <td className="border border-[#000] px-2 py-2">
                                                                                            {/* {concatenateStringifiedArray(item.budgetCode)} */}
                                                                                            {/* {item.budgetCode} */}
                                                                                            {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>
                                                                                    </tr>
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    {/* for Print screen */}
                                                                    <div class="" style={{ display: display ? 'block' : 'none', width: "100%" }} >
                                                                        <table class="table border border-stone-900 text-xs" style={{ width: "100%" }}>
                                                                            <thead style={{ width: "100%" }}>
                                                                                <tr class="border ">
                                                                                    {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Emp ID
                                        </th> */}
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Emp Name
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" colSpan={2} scope="col">
                                                                                        Position Title
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                        Effective Date, Salary Rate of Reason,<br />Not To Exceed..., Funding Source <br />And Account Number
                                                                                    </th>


                                                                                </tr>
                                                                                <tr class="border ">
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {employeeArray?.map(item => {
                                                                                    return <tr class="border">
                                                                                        {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                            {item.employeeId}
                                          </th> */}
                                                                                        <td className="border border-[#000] px-2 py-2">
                                                                                            {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                            {/* {item.employeeName} */}
                                                                                            {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy") || ""} through {moment(item.effectiveDatesTo).format("MM/DD/yyyy") || ""}<br />
                                                                                            {item.salaryRate || "-"} <br />
                                                                                            {item.rateofPay || "-"} <br />
                                                                                            <br />
                                                                                            <br />
                                                                                            {/* {item.budgetCode} */}
                                                                                            {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>


                                                                                    </tr>
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div style={{ display: display ? 'block' : 'none', width: "100%" }} >
                                                                        <div className='font-bold my-3'>Approval Status </div>
                                                                        <table style={{ width: "100%" }}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style={{ border: "1px solid #d0d0d0", padding: "5px" }} >Name of Employee</th>
                                                                                    <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Status</th>
                                                                                    <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Time Stamp</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    (specificReportDetailsView?.approvalFinalData)?.map((item) => {
                                                                                        return (
                                                                                            <tr className='text-center'>
                                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.empName}</td>
                                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.status}</td>
                                                                                                <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.approvedDate}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0">

                                                    <div style={{ width: '66%' }}>
                                                        <div onClick={() => {
                                                            setDisplay(true);
                                                            setTimeout(() => {
                                                                handlePrint();
                                                            }, 1000);
                                                        }} className="text-[#FFF] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-[#113699] Shadow_xs rounded-lg space-x-2 cursor-pointer">
                                                            <i class="gusd-print-outline"></i>
                                                            <span >Print</span>
                                                        </div>
                                                        {/* <div className="text-white font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-[#113699] Shadow_xs rounded-lg space-x-2 cursor-pointer">
                            <i className="gusd-download"></i>
                            <span onClick={() => {
                              exportFilteredDataToCSV("PersonalActions.csv");
                            }}
                            >Download</span>
                          </div> */}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">

                                                <div className="p-4">
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
                                                    {/* <div className="card custTable">

                            <Timeline value={specificReportDetailsView.formHistoryviewData}
                              opposite={(item) => <Tag
                                severity={approveStatusOptions(item)} className="mr-2 relative top-[-5px]"
                                value={item?.appStatus}></Tag>} content={(item, i) => <div className="relative top-[-10px]">
                                  <div className="text-[#667085] text-[12px] ml-2">Step {i + 1}</div>
                                  <small className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] ml-2">{item?.designation}</small>
                                  <div className="text-color-secondary text-xs ml-2">{item?.empName}</div>
                                  <div className="text-color-secondary text-[9px] ml-2">{item?.approvedDate}</div>
                                </div>} />

                          </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Sidebar>

                                    <Sidebar
                                        className="PSAviewPopup"
                                        visible={InitiateReportsfullscreen}
                                        position="right"
                                        onHide={() => setinitiateReportsfullscreen(false)}

                                        style={{ width: "65vw", background: "#F5F6F7" }}
                                    >
                                        <div className="xl:py-[1.667vw] py-[28px] xl:px-[1.250vw] px-[20px] lg:space-y-[1.250vw] space-y-2 h-full">
                                            <div className="relative h-full">
                                                {/*col*/}
                                                <div >
                                                    <div className="cursor-pointer mb-[15px]" onClick={() => setinitiateReportsfullscreen(false)}>
                                                        <i className="gusd-close-sidebar text-[24px]"></i>
                                                    </div>
                                                    {/*col*/}
                                                    <div>
                                                        <div className="text-[#113699] font-semibold text-sm xl:text-[0.938vw]">
                                                            Glendale Unified School District
                                                        </div>
                                                        <div className="text-[#344054] font-normal text-xs xl:text-[0.677vw]">Personnel Action</div>
                                                    </div>
                                                    <div className="xl:h-[36.250vw] 2xl:h-[38.250vw] lg:h-[28.250vw] overflow-auto">


                                                        <div className=" bg-[#EFF0F1] mt-[24px] rounded-[8px] p-[8px]">
                                                            <div>
                                                                <div className="flex justify-between gap-2 text-[22px] text-[#000] items-center my-3">
                                                                    <div><i className="pi pi-file"></i> Personnel Action.pdf</div>
                                                                    <div className="flex justify-end">
                                                                        <div onClick={() => setinitiateReportsfullscreen(false)}
                                                                            className="text-[#113699] font-medium text-[14px] pb-3 cursor-pointer"
                                                                        >
                                                                            <i className="pi pi-calendar mr-1 mt-2"></i>Close Full Screen{" "}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div ref={componentRef} className="text-black bg-white p-3">
                                                                    <div class="text-center mt-5">
                                                                        <div class="text-sm text-black font-semibold"> GLENDALE UNIFIED SCHOOL DISTRICT </div>
                                                                        <div class="text-base text-black font-semibold"> BOARD REPORT PERSONNEL ACTION </div>
                                                                    </div>
                                                                    <div class="flex justify-between my-3 ">
                                                                        <div class="m-2 text-sm">
                                                                            Location  : {apprpverdataEdit.location}<br></br>
                                                                            Action to be Taken  : {apprpverdataEdit.actionToBeTaken}<br></br>
                                                                            Type : {apprpverdataEdit.type}
                                                                            {apprpverdataEdit.actionItem ? <div>Action Item : {apprpverdataEdit.actionItem}<br></br></div> : null}
                                                                        </div>
                                                                        <div class="m-2 text-sm">
                                                                            Board Meeting Date : {moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")} <br></br>
                                                                            Personnel Report No : {apprpverdataEdit.personalReportNo}<br></br>
                                                                            {apprpverdataEdit.actionDate ? <div>Action Date : {apprpverdataEdit.actionDate}<br></br></div> : null}
                                                                            {apprpverdataEdit.actionPage ? <div>Action Page : {apprpverdataEdit.actionPage}<br></br></div> : null}
                                                                        </div>
                                                                    </div>
                                                                    <div class="overflow-x-auto" >
                                                                        <div style={{ display: display ? 'none' : 'block' }}>
                                                                            <table class="table border border-stone-900 text-xs">
                                                                                <thead>
                                                                                    <tr class="border ">
                                                                                        {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                            Emp ID
                                          </th> */}
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Emp Name
                                                                                        </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" colSpan={2} scope="col">
                                                                                            Position Title
                                                                                        </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Effective Date (From-To)
                                                                                        </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Salary Rate or Reason                                          </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Not To Exceed
                                                                                        </th>
                                                                                        {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                            Reason
                                          </th>
                                          <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                            Funding Source
                                          </th>
                                          <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                            Account No
                                          </th> */}
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                            Funding Source(s) and Account Number(s)                                          </th>
                                                                                    </tr>
                                                                                    <tr class="border ">
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {employeeArray?.map(item => {
                                                                                        return <tr class="border">
                                                                                            {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                              {item.employeeId}
                                            </th> */}
                                                                                            <td className="border border-[#000] px-2 py-2">
                                                                                                {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                                {/* {item.employeeName} */}
                                                                                                {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                            </td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy")} - {moment(item.effectiveDatesTo).format("MM/DD/yyyy")}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.salaryRate}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.rateofPay}</td>
                                                                                            {/* <td className="border border-[#000] px-2 py-2">{item.reason}</td>
                                            <td className="border border-[#000] px-2 py-2">{item.fundingSource}</td>
                                            <td className="border border-[#000] px-2 py-2">{item.accountNo}</td> */}
                                                                                            <td className="border border-[#000] px-2 py-2">
                                                                                                {/* {concatenateStringifiedArray(item.budgetCode)} */}
                                                                                                {/* {item.budgetCode} */}
                                                                                                {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                            </td>
                                                                                        </tr>
                                                                                    })}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        {/* for Print screen */}
                                                                        <div class="" style={{ display: display ? 'block' : 'none', width: "100%" }} >
                                                                            <table class="table border border-stone-900 text-xs" style={{ width: "100%" }}>
                                                                                <thead style={{ width: "100%" }}>
                                                                                    <tr class="border ">
                                                                                        {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Emp ID
                                        </th> */}
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Emp Name
                                                                                        </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" colSpan={2} scope="col">
                                                                                            Position Title
                                                                                        </th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" rowSpan={2} scope="col">
                                                                                            Effective Date, Salary Rate of Reason,<br />Not To Exceed..., Funding Source <br />And Account Number
                                                                                        </th>


                                                                                    </tr>
                                                                                    <tr class="border ">
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {employeeArray?.map(item => {
                                                                                        return <tr class="border">
                                                                                            {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                            {item.employeeId}
                                          </th> */}
                                                                                            <td className="border border-[#000] px-2 py-2">
                                                                                                {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                                {/* {item.employeeName} */}
                                                                                                {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                            </td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                            <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy") || ""} through {moment(item.effectiveDatesTo).format("MM/DD/yyyy") || ""}<br />
                                                                                                {item.salaryRate || "-"} <br />
                                                                                                {item.rateofPay || "-"} <br />
                                                                                                <br />
                                                                                                <br />
                                                                                                {/* {item.budgetCode} */}
                                                                                                {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                            </td>


                                                                                        </tr>
                                                                                    })}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <div style={{ display: display ? 'block' : 'none', width: "100%" }} >
                                                                            <div className='font-bold my-3'>Approval Status </div>
                                                                            <table style={{ width: "100%" }}>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }} >Name of Employee</th>
                                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Status</th>
                                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Time Stamp</th>
                                                                                    </tr>
                                                                                    {
                                                                                        (specificReportDetailsView?.approvalFinalData)?.map((item) => {
                                                                                            return (
                                                                                                <tr className='text-center'>
                                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.empName}</td>
                                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.status}</td>
                                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.approvedDate}</td>
                                                                                                </tr>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0">

                                                    <div className="grid grid-cols-1 gap-2">
                                                        <div onClick={() => {
                                                            setDisplay(true);
                                                            setTimeout(() => {
                                                                handlePrint();
                                                            }, 1000);
                                                        }} className="text-[#FFF] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-[#113699] Shadow_xs rounded-lg space-x-2 cursor-pointer">
                                                            <i class="gusd-print-outline"></i>
                                                            <span >Print</span>
                                                        </div>
                                                        {/* <div className="text-white font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-[#113699] Shadow_xs rounded-lg space-x-2 cursor-pointer">
                              <i className="gusd-download"></i>
                              <span onClick={() => {
                                exportFilteredDataToCSV("PersonalActions.csv");
                              }}>Download</span>
                            </div> */}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Sidebar>
                                    {/* View Initiate Reports end */}


                                    <Sidebar
                                        className="PSAviewPopup"
                                        visible={requestedreportEdit}
                                        position="right"
                                        onHide={() => setrequestedreportEdit(false)}
                                        style={{ width: "65vw", minWidth: "40rem", background: "#F5F6F7" }}
                                    >
                                        <div className="grid grid-cols-2 lg:grid-cols-12">
                                            <div className="col-span-1 lg:col-span-8 xl:py-[1.667vw] py-[28px] xl:px-[1.250vw] px-[20px] lg:space-y-[1.250vw] space-y-2 h-full">
                                                <div className="">
                                                    {/*col*/}
                                                    <div className="cursor-pointer mb-[15px]" onClick={() => setrequestedreportEdit(false)}>
                                                        <i className="gusd-close-sidebar text-[24px]"></i>
                                                    </div>
                                                    {/*col*/}
                                                    <div>
                                                        <div className="text-[#113699] font-semibold text-sm xl:text-[0.938vw]">
                                                            Glendale Unified School District
                                                        </div>
                                                        <div className="text-[#344054] font-normal text-xs xl:text-[0.677vw]">Personnel Action</div>
                                                    </div>
                                                    <div className="xl:h-[36.250vw] 2xl:h-[38.250vw] lg:h-[28.250vw] overflow-auto">
                                                        <div className="status-list">
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Status</div>
                                                                <div className="text-[#FF7F01] text-[12px] bg-[#FFF2E5] py-[4px] px-[8px] rounded-[18px]">
                                                                    <i className="gusd-dot text-[10px] mr-1"></i> {apprpverdataEdit.pretexts}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Type</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.type}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Board Meeting Date</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Personnel Report No</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.personalReportNo}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Location</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.location}</div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <div className="text-[#344054] text-[14px]">Action to be Taken</div>
                                                                <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.actionToBeTaken}</div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3">
                                                            <p>Approval Status</p>
                                                            <div className="py-3 emp-simple-tbl">
                                                                <DataTable
                                                                    className="custpaginator custIcons custmBtnTable custTable"
                                                                    value={specificReportDetailsView.approvalFinalData}
                                                                >
                                                                    <Column field="empCode" header="Employee Id"></Column>
                                                                    <Column field="empName" header="Name"></Column>
                                                                    <Column field="appStatus" body={approvalStatusBody} header="Status"></Column>
                                                                    <Column field="approvedDate" header="Time Stamp"></Column>
                                                                </DataTable>
                                                            </div>
                                                        </div>
                                                        <div className=" bg-[#EFF0F1] mt-[24px] rounded-[8px] p-[8px]">
                                                            <div>
                                                                <div className="flex justify-between gap-2 text-[22px] text-[#000] items-center my-3">
                                                                    <div><i className="pi pi-file"></i> Personnel Action.pdf</div>
                                                                    <div className="flex justify-end">
                                                                        <div
                                                                            onClick={() => setinitiateReportsfullscreen(true)}
                                                                            className="text-[#113699] font-medium text-[14px] pb-3 cursor-pointer"
                                                                        >
                                                                            <i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen{" "}
                                                                        </div>
                                                                        {/* {
                                    personnelActionIsSuperadmin !== '1' && personnelActionIsApprover == 1 ? */}
                                                                        <div
                                                                            style={{ padding: 8 }}
                                                                            onClick={() => { setEditPopupfromAP(true); setEditPopup(true) }}
                                                                            className="text-[#113699] font-medium text-[14px] pb-3 cursor-pointer"
                                                                        >
                                                                            <i className="gusd-edit mr-1 mt-2"></i>Edit{" "}
                                                                        </div>
                                                                        {/* : null
                                  } */}
                                                                    </div>

                                                                </div>
                                                                <div className="text-black bg-white p-3">
                                                                    <div class="text-center mt-5">
                                                                        <div class="text-sm text-black font-semibold"> GLENDALE UNIFIED SCHOOL DISTRICT </div>
                                                                        <div class="text-base text-black font-semibold"> BOARD REPORT PERSONNEL ACTION </div>
                                                                    </div>
                                                                    <div class="flex justify-between my-3 ">
                                                                        <div class="m-2 text-sm">
                                                                            Location  : {apprpverdataEdit.location}<br></br>
                                                                            Action to be Taken  : {apprpverdataEdit.actionToBeTaken}<br></br>
                                                                            Type : {apprpverdataEdit.type}
                                                                            {apprpverdataEdit.actionItem ? <div>Action Item : {apprpverdataEdit.actionItem}<br></br></div> : null}
                                                                        </div>
                                                                        <div class="m-2 text-sm">
                                                                            Board Meeting Date : {moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")} <br></br>
                                                                            Personnel Report No : {apprpverdataEdit.personalReportNo}<br></br>
                                                                            {apprpverdataEdit.actionDate ? <div>Action Date : {apprpverdataEdit.actionDate}<br></br></div> : null}
                                                                            {apprpverdataEdit.actionPage ? <div>Action Page : {apprpverdataEdit.actionPage}<br></br></div> : null}
                                                                        </div>
                                                                    </div>

                                                                    <div class="w-full">
                                                                        <table class="table border border-stone-900 text-xs">
                                                                            <thead>
                                                                                <tr class="border ">
                                                                                    {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Emp ID
                                        </th> */}
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                        Emp Name
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" colSpan={2}>
                                                                                        Position Title
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                        Effective Date (From-To)
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                        Salary Rate or Reason
                                                                                    </th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                        Not To Exceed
                                                                                    </th>
                                                                                    {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Reason
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Funding Source
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Account No
                                        </th> */}
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                        Funding Source(s) and Account Number(s)
                                                                                    </th>
                                                                                </tr>
                                                                                <tr class="border ">
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                    <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {employeeArray?.map(item => {
                                                                                    return <tr class="border">
                                                                                        {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                            {item.employeeId}
                                          </th> */}
                                                                                        <td className="border border-[#000] px-2 py-2">
                                                                                            {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                            {/* {item.employeeName} */}
                                                                                            {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy")} - {moment(item.effectiveDatesTo).format("MM/DD/yyyy")}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.salaryRate}</td>
                                                                                        <td className="border border-[#000] px-2 py-2">{item.rateofPay}</td>
                                                                                        {/* <td className="border border-[#000] px-2 py-2">{item.reason}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.fundingSource}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.accountNo}</td> */}
                                                                                        <td className="border border-[#000] px-2 py-2">
                                                                                            {/* {concatenateStringifiedArray(item.budgetCode)} */}
                                                                                            {/* {item.budgetCode} */}
                                                                                            {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                        </td>
                                                                                    </tr>
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className="flex justify-between dialogpoput card">
                                                    {/* ----------------------------------------------------------------- */}
                                                </div>
                                                <div className="overflow-auto h-[300px]">
                                                    <div className="pl-5 pt-5 text-[#344054] font-medium text-[20px] flex">
                                                        <InputSwitch checked={addSignature} onChange={(e) => setAddSignature(e.value)} />
                                                        <label style={{ marginLeft: "2%" }}>Add Signature<span class="text-[red] pl-0.2">*</span></label>
                                                    </div>

                                                    {(addSignature && signatureFileAwsPath !== null) ?
                                                        <div className="py-3 px-5 rounded-[8px] mt-3">
                                                            <Card>
                                                                <img className={"w-[20%] h-[15%]"}
                                                                    src={signatureFileAwsPath}
                                                                />
                                                            </Card>
                                                        </div> : null}

                                                </div>
                                                <div>
                                                    {eduexesecratery ? <div>
                                                        <div className="flex gap-2" style={{ position: 'relative', bottom: '6rem' }}>
                                                            <div>
                                                                <p style={{ marginTop: "10px" }}>Assign To :</p>
                                                                <div className="p-field-radiobutton" style={{ display: 'flex' }}>
                                                                    {genderss.map((gender, index) => (
                                                                        <div key={index} className="p-col-6 ">
                                                                            <RadioButton
                                                                                inputId={`gender${index}`}
                                                                                name="gender"
                                                                                value={gender.value}
                                                                                onChange={(e) => setValueelemsec(e.value)}
                                                                                checked={valueelemsec === gender.value}
                                                                                style={{ margin: 5 }}
                                                                            />
                                                                            <label htmlFor={`gender${index}`}>{gender.label}</label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            {/* <SelectButton value={valueelemsec} onChange={(e) => setValueelemsec(e.value)} options={optionselemorsec} className="p-invalid elemorsec" /> */}
                                                        </div>
                                                        {/* <InputText
                            value={email}
                            onChange={handleChangemail}
                            placeholder="Enter email"
                            className={isValidEmail ? "" : "p-invalid"}
                            style={{
                              position: 'relative',
                              bottom: '6rem',
                              marginTop: "5px",
                              width: "16rem"
                            }}
                          /> */}
                                                    </div> : selectedhrtech && apprpverdataEdit?.psayesorno == null ? <div className="card flex justify-content-center" style={{
                                                        position: 'relative',
                                                        bottom: '6rem'
                                                    }}>
                                                        {/* <p style={{ marginTop: "10px" }}>Does This form includes PSA</p>
                            <SelectButton value={valueyesno} onChange={(e) => setValueyesno(e.value)} options={optionsyesorno} className="p-invalid elemorsec" /> */}
                                                        <div>
                                                            <p style={{ marginTop: "10px" }}>Does This form includes PSA :</p>
                                                            <div className="p-field-radiobutton" style={{ display: 'flex' }}>
                                                                {genders.map((gender, index) => (
                                                                    <div key={index} className="p-col-6 ">
                                                                        <RadioButton
                                                                            inputId={`gender${index}`}
                                                                            name="gender"
                                                                            value={gender.value}
                                                                            onChange={(e) => setValueyesno(e.value)}
                                                                            checked={valueyesno === gender.value}
                                                                            style={{ margin: 5 }}
                                                                        />
                                                                        <label htmlFor={`gender${index}`}>{gender.label}</label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                        : null}
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0" style={{ width: '66%' }}>

                                                    <div className='grid grid-cols-3 gap-2'>
                                                        <Link
                                                            href="#"
                                                            onClick={() => {
                                                                setrequestedreportEdit(false)
                                                                setAddSignature(false);
                                                            }}
                                                            className='text-[#344054] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                            <i class="pi pi-times"></i><span>Cancel</span></Link>
                                                        <Link
                                                            href=""
                                                            onClick={() => {
                                                                if (signatureFileAwsPath !== null && addSignature) {
                                                                    setRejectVisible(true);
                                                                    setSendMsg(false);
                                                                }

                                                            }}
                                                            className='text-[#D92D20] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'
                                                        //   disabled={signatureFileAwsPath === null || !addSignature}
                                                        >
                                                            <i class="pi pi-times"></i><span>Reject</span></Link>
                                                        <Link
                                                            href="#"
                                                            onClick={() => {
                                                                if (signatureFileAwsPath !== null && addSignature) {
                                                                    // handleClickDisable();
                                                                    approveSelectedReport(apprpverdataEdit?.id);
                                                                }
                                                            }}
                                                            className='text-[#039855] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer z-10'
                                                        //   disabled={signatureFileAwsPath === null || !addSignature}
                                                        >
                                                            <i class="pi pi-check"

                                                            ></i><span>Approve</span></Link>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">

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
                                                    {/* <div className="card custTable">

                                                        <Timeline value={specificReportDetailsView.formHistoryviewData}
                                                            opposite={(item) => <Tag
                                                                severity={approveStatusOptions(item)} className="mr-2 relative top-[-5px]"
                                                                value={item.appStatus}></Tag>} content={(item, i) => <div className="relative top-[-10px]">
                                                                    <div className="text-[#667085] text-[12px] ml-2">Step {i + 1}</div>
                                                                    <small className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] leading-tight ml-2">{item.designation}</small>
                                                                    <div className="text-color-secondary text-xs ml-2">{item.empName}</div>
                                                                    <div className="text-color-secondary text-[9px] ml-2">{item.approvedDate}</div>
                                                                </div>} />

                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Sidebar>

                                    {/* payrolledit slider */}
                                    <Sidebar
                                        className="PSAviewPopup"
                                        visible={payrollreportEditslider}
                                        position="right"
                                        onHide={() => setPayrollreportEditslider(false)}
                                        style={{ width: "45vw", background: "#F5F6F7" }}
                                    >
                                        <div className="xl:py-[1.667vw] py-[28px] xl:px-[1.250vw] px-[20px] lg:space-y-[1.250vw] space-y-2 h-full">
                                            <div className="" style={{ height: 'auto' }}>
                                                {/*col*/}
                                                <div className="cursor-pointer mb-[15px]" onClick={() => setPayrollreportEditslider(false)}>
                                                    <i className="gusd-close-sidebar text-[24px]"></i>
                                                </div>
                                                {/*col*/}
                                                <div>
                                                    <div className="text-[#113699] font-semibold text-sm xl:text-[0.938vw]">
                                                        Glendale Unified School District
                                                    </div>
                                                    <div className="text-[#344054] font-normal text-xs xl:text-[0.677vw]">Personnel Action</div>
                                                </div>
                                                <div className="xl:h-[36.250vw] 2xl:h-[38.250vw] lg:h-[28.250vw] overflow-auto">
                                                    <div className="status-list">
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Status</div>
                                                            <div className="text-[#FF7F01] text-[12px] bg-[#FFF2E5] py-[4px] px-[8px] rounded-[18px]">
                                                                <i className="gusd-dot text-[10px] mr-1"></i> {apprpverdataEdit.status}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Type</div>
                                                            <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.type}</div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Board Meeting Date</div>
                                                            <div className="text-[#344054] text-[14px] font-semibold">{moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")}</div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Personnel Report No</div>
                                                            <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.personalReportNo}</div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Location</div>
                                                            <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.location}</div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="text-[#344054] text-[14px]">Action to be Taken</div>
                                                            <div className="text-[#344054] text-[14px] font-semibold">{apprpverdataEdit.actionToBeTaken}</div>
                                                        </div>
                                                    </div>

                                                    <div className=" bg-[#EFF0F1] mt-[24px] rounded-[8px] p-[8px]">
                                                        <div>
                                                            <div className="flex justify-between gap-2 text-[22px] text-[#000] items-center my-3">
                                                                <div><i className="pi pi-file"></i> Personnel Action.pdf</div>
                                                                <div className="flex justify-end">
                                                                    <div
                                                                        onClick={() => setinitiateReportsfullscreen(true)}
                                                                        className="text-[#113699] font-medium text-[14px] pb-3 cursor-pointer"
                                                                    >
                                                                        <i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen{" "}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="text-black bg-white p-3">
                                                                <div class="text-center mt-5">
                                                                    <div class="text-sm text-black font-semibold"> GLENDALE UNIFIED SCHOOL DISTRICT </div>
                                                                    <div class="text-base text-black font-semibold"> BOARD REPORT PERSONNEL ACTION </div>
                                                                </div>
                                                                <div class="flex justify-between my-3 ">
                                                                    <div class="m-2 text-sm">
                                                                        Location  : {apprpverdataEdit.location}<br></br>
                                                                        Action to be Taken  : {apprpverdataEdit.actionToBeTaken}<br></br>
                                                                        Type : {apprpverdataEdit.type}
                                                                        {apprpverdataEdit.actionItem ? <div>Action Item : {apprpverdataEdit.actionItem}<br></br></div> : null}
                                                                    </div>
                                                                    <div class="m-2 text-sm">
                                                                        Board Meeting Date : {moment(apprpverdataEdit.boardMeetingDate).format("MM/DD/yyyy")} <br></br>
                                                                        Personnel Report No : {apprpverdataEdit.personalReportNo}<br></br>
                                                                        {apprpverdataEdit.actionDate ? <div>Action Date : {apprpverdataEdit.actionDate}<br></br></div> : null}
                                                                        {apprpverdataEdit.actionPage ? <div>Action Page : {apprpverdataEdit.actionPage}<br></br></div> : null}
                                                                    </div>
                                                                </div>

                                                                <div class="">
                                                                    <table class="table border border-stone-900 text-xs">
                                                                        <thead>
                                                                            <tr class="border ">
                                                                                {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Emp ID
                                        </th> */}
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                    Emp Name
                                                                                </th>
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" colSpan={2}>
                                                                                    Position Title
                                                                                </th>
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                    Effective Date (From-To)
                                                                                </th>
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                    Salary Rate or Reason                                        </th>
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                    Not To Exceed
                                                                                </th>
                                                                                {/* <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Reason
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Funding Source
                                        </th>
                                        <th className="border border-[#000] px-2 py-2 text-xs" scope="col">
                                          Account No
                                        </th> */}
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col" rowSpan={2}>
                                                                                    Funding Source(s) and Account Number(s)                                        </th>
                                                                            </tr>
                                                                            <tr class="border ">
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col">To</th>
                                                                                <th className="border border-[#000] px-2 py-2 text-xs" scope="col">From</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {employeeArray?.map(item => {
                                                                                return <tr class="border">
                                                                                    {/* <th className="border border-[#000] px-2 py-2" scope="row">
                                            {item.employeeId}
                                          </th> */}
                                                                                    <td className="border border-[#000] px-2 py-2">
                                                                                        {/* {concatenateStringifiedArray(item.employeeName)} */}
                                                                                        {/* {item.employeeName} */}
                                                                                        {JSON.parse(item.employeeName)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                    </td>
                                                                                    <td className="border border-[#000] px-2 py-2">{item.positionTitleTo}</td>
                                                                                    <td className="border border-[#000] px-2 py-2">{item.positionTitleFrom}</td>
                                                                                    <td className="border border-[#000] px-2 py-2">{moment(item.effectiveDatesFrom).format("MM/DD/yyyy")} - {moment(item.effectiveDatesTo).format("MM/DD/yyyy")}</td>
                                                                                    <td className="border border-[#000] px-2 py-2">{item.salaryRate}</td>
                                                                                    <td className="border border-[#000] px-2 py-2">{item.rateofPay}</td>
                                                                                    {/* <td className="border border-[#000] px-2 py-2">{item.reason}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.fundingSource}</td>
                                          <td className="border border-[#000] px-2 py-2">{item.accountNo}</td> */}
                                                                                    <td className="border border-[#000] px-2 py-2">
                                                                                        {/* {concatenateStringifiedArray(item.budgetCode)} */}
                                                                                        {/* {item.budgetCode} */}
                                                                                        {JSON.parse(item.budgetCode)?.map((item, index) => (<div key={index}>{item}</div>))}
                                                                                    </td>
                                                                                </tr>
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="flex justify-between dialogpoput card">
                                                {/* ----------------------------------------------------------------- */}
                                            </div>
                                            <div className="overflow-auto h-[300px]">
                                                <div className="pl-5 pt-5 text-[#344054] font-medium text-[20px] flex">
                                                    <InputSwitch checked={addSignature} onChange={(e) => setAddSignature(e.value)} />
                                                    <label style={{ marginLeft: "2%" }}>Add Signature<span class="text-[red] pl-0.2">*</span></label>
                                                </div>

                                                {(addSignature && signatureFileAwsPath !== null) ?
                                                    <div className="py-3 px-5 rounded-[8px] mt-3">
                                                        <Card>
                                                            <img className={"w-[20%] h-[15%]"}
                                                                src={signatureFileAwsPath}
                                                            />
                                                        </Card>
                                                    </div> : null}

                                            </div>
                                            {/* <div>
                        {eduexesecratery ? <div>hiiiiiiiiiiiiiiiiiiiiiiii</div> : null}
                      </div> */}
                                            <div className="absolute bottom-0 left-0 right-0">

                                                <div className='grid grid-cols-3 gap-2'>
                                                    <Link
                                                        href=""
                                                        onClick={() => {
                                                            setPayrollreportEditslider(false)
                                                            setAddSignature(false);
                                                        }}
                                                        className='text-[#344054] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                        <i class="pi pi-times"></i><span>Cancel</span></Link>

                                                    <Link
                                                        href=""
                                                        onClick={() => {
                                                            if (signatureFileAwsPath !== null && addSignature) {
                                                                acknowledgeSelectedReport(apprpverdataEdit.id)
                                                            }



                                                        }}
                                                    // className=
                                                    // // {` 
                                                    // // ${(signatureFileAwsPath === null || !addSignature) ? '' : "text-[#039855] "}
                                                    // text-center flex items-center tableBtn bg-white border border-[#D0D5DD] radius8`}
                                                    // disabled={signatureFileAwsPath === null || !addSignature}
                                                    >
                                                        <i class="pi pi-check"

                                                        ></i><span>Acknowledge</span></Link>

                                                </div>

                                            </div>

                                        </div>
                                    </Sidebar>
                                    {/* for reminder notification */}
                                    <Dialog
                                        header="Reminder"
                                        visible={ReminderDialog}
                                        style={{ width: "30vw" }}
                                        onHide={() => {
                                            setreminderDialog(false);
                                        }}
                                        closable={false}
                                        footer={footerContentForReminder}
                                    >
                                        <p className="m-0 text-[#0487C8] text-center">
                                            <i className="mr-2 pi pi-check-circle"></i>
                                            <span className="font-medium text-[18px]">{`By clicking Yes, a reminder will be sent to the ${ReminderData?.reminderName} to approve the form. Click No to cancel.`}</span>
                                        </p>
                                    </Dialog>
                                    {/*  Signature dialog*/}

                                    <SignatureDialog isVisible={signatureDialog}
                                        onClickHandler={(image) => handleSignatureSelection(image)}
                                        onCloseHandler={() => {
                                            setSignatureDialog(false);
                                            setAddSignature(false);
                                        }}
                                        username={loggedInUserData?.name} />
                                    <Dialog
                                        header=""
                                        visible={requestApprovalConfirmVisible}
                                        style={{ width: "30vw" }}
                                        closable={false}
                                        onHide={() => {
                                            setRequestApprovalConfirmVisible(false);
                                            // setVisibleEdit(false);
                                        }}
                                        footer={footerContentForReqApproval}
                                    >
                                        <p className="m-0 text-[#0487C8] text-center">
                                            <i className="mr-2 pi pi-check-circle"></i>
                                            <span className="font-medium text-[18px]">This report is Approved</span>
                                        </p>
                                    </Dialog>
                                    {/* Reject dialog */}
                                    <Dialog
                                        header="Reject Report"
                                        visible={rejectVisible}
                                        style={{ width: "30vw" }}
                                        //                      closable={false}
                                        onHide={() => {
                                            setRejectVisible(false);
                                            // setVisibleEdit(false);
                                        }}
                                        footer={footerContentForReqReject}
                                    >
                                        <div className="m-0">
                                            {sendMsg && <div className="font-medium text-[18px] text-[#249144] mb-6">Message Sent Successfully</div>}

                                            <div className="font-medium text-[18px] mb-3">Select an approver level</div>
                                            <Dropdown
                                                value={fallBackApproverLevel}
                                                options={approverLevelOptions}
                                                showClear
                                                onChange={(e) => setFallBackApproverLevel(e.value)}
                                                optionLabel="name"
                                                placeholder="Select"
                                                className="p-column-filter custDropdown w-full mb-6"
                                            />

                                            <div className="font-medium text-[18px] mb-3">Name</div>

                                            <Dropdown
                                                value={fallBackApprover}
                                                showClear
                                                options={proccessedApproverOptions}
                                                onChange={(e) => setFallBackApprover(e.value)}
                                                optionLabel="label"
                                                placeholder="Select"
                                                className="p-column-filter custDropdown w-full mb-6"
                                            />
                                            <div className="font-medium text-[18px] mb-3">Enter the Reason for Rejection<span className="text-[red] pl-0.2">*</span></div>

                                            <InputText
                                                value={rejectMsgValue}
                                                placeholder="Enter the Reason for Rejection"
                                                onChange={e => setRejectValueMsg(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                    </Dialog>
                                    {/* /******************* new************************* */}

                                </div>
                            </div>
                        </div>
                    </Layout>
                )}
            </ReactFullscreen>
        </>
    );
    //   ) : (
    //     <Login sessionExpired={1} />
    //   );
}
