import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
// import empDetailsImg from "../../../assets/images/applicationImg.png";
import { Image } from "primereact/image";
// import BoardsYet from '../../../../src/assets/images/boards_yet.svg';
import { Sidebar } from "primereact/sidebar";
import CalendarIcon from '../../../public/assets/images/icon/calendar.svg';
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import HtmlToPdf from "./HtmlToPdfForPA";
import { AutoComplete } from "primereact/autocomplete";

// import { Employee, PersonnelActionInitiatorForm, PersonnelActionEmployee, TransactionCyclePersonnel } from "../../../models";

import moment from "moment";
// import { reactLocalStorage } from "reactjs-localstorage";
// import { USER_TYPES, USER_TYPES_NAMES } from "../../../helper/enum";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
// import { specialRoutes } from "../../../helper/routeConstants";
// import { SendNotification } from "../../../helper/mail";
// import { handleNotificationsOnStatusChangeforPersonnelAction } from "../../../components/actions/notficationActions";
// import { formatDateToDdMmYyyy } from "../../../helper/commonfunctions";
import { Button } from "primereact/button";
import DatePicker from "react-datepicker";
import { USER_TYPES, USER_TYPES_NAMES } from "@/helper/enum";


const EditFormModal = ({ HideShowNewFormModal, showNewFormModal, initiatorBindList, requestedData, personnelActionIsSuperadmin, setrequestedreportEdit }) => {
  const [AddNewForm, setAddNewForm] = useState(false);
  const [reloadonce, setreloadonce] = useState(false);
  const [editEmployee, seteditEmployee] = useState(false);
  const [editEmployeeArray, seteditEmployeeArray] = useState({});
  const [location, setLocation] = useState(requestedData?.location);
  const [actiontobetaken, setActiontobetaken] = useState(requestedData?.actionToBeTaken);
  const [actionDate, setActionDate] = useState(requestedData?.actionDate);
  const [actionPage, setActionPage] = useState(requestedData?.actionPage);
  const [actionItem, setActionItem] = useState(requestedData?.actionItem);
  const [formTitle, setFormTitle] = useState(requestedData?.formTitle);
  const [personalNo, setPersonalNo] = useState(requestedData?.personalReportNo);
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [EmpType, setEmpType] = useState(requestedData?.type || 'Certificated');
  const [startDate, setStartDate] = useState(requestedData?.boardMeetingDate);
  const [positionTo, setPositionTo] = useState(editEmployee ? editEmployeeArray?.positionTitleTo : "");
  const [positionFrom, setPositionFrom] = useState(editEmployee ? editEmployeeArray?.positionTitleFrom : "");
  const [startEndDate, setStarEndDate] = useState(editEmployee ? editEmployeeArray?.effectiveDatesFrom : null);
  const [salaryRate, setsalaryRate] = useState(editEmployee ? editEmployeeArray?.salaryRate : "");
  const [rateofPay, setrateofPay] = useState(editEmployee ? editEmployeeArray?.rateofPay : "");
  const [reason, setreason] = useState(editEmployee ? editEmployeeArray?.reason : "");
  const [fundingSource, setfundingSource] = useState(editEmployee ? editEmployeeArray?.fundingSource : "");
  const [accountNo, setaccountNo] = useState(editEmployee ? editEmployeeArray?.accountNo : "");
  const [budgetCode, setbudgetCode] = useState(editEmployee ? editEmployeeArray?.budgetCode : "");
  const [endDate, setEndDate] = useState(editEmployee ? editEmployeeArray?.effectiveDatesTo : null);
  const [EmployeeArray, setEmployeeArray] = useState([]);
  const [users, SetUsersList] = useState([]);
  const [empCodeList, setEmpCodeList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  let budgetClerkedit = employeeList?.filter(item => item.code === requestedData?.budgetClerk)?.[0]
  let exeSecreataryMgtedit = employeeList?.filter(item => item.code === requestedData?.executiveManagement)?.[0]
  let hrTechnicianedit = employeeList?.filter(item => item.code === requestedData?.hrTechnician)?.[0]
  let budgetManageredit = employeeList?.filter(item => item.code === requestedData?.budgetManager)?.[0]
  let deptHeadedit = employeeList?.filter(item => item.code === requestedData?.deptHead)?.[0]
  let exeSecreataryedit = employeeList?.filter(item => item.code === requestedData?.executiveSecretary)?.[0]
  // let employee_Idedit = empCodeList?.filter(item => item.code === data?.employeeId)?.[0]
  const [budgetClerk, setBudgetClerk] = useState(budgetClerkedit);
  const [exeSecreataryMgt, setExeSecreateryMgt] = useState(exeSecreataryMgtedit);
  const [hrTechnician, setHrTechnician] = useState(hrTechnicianedit);
  const [budgetManager, setBudgetManager] = useState(budgetManageredit);
  const [deptHead, setDeptHead] = useState(deptHeadedit);
  const [exeSecreatary, setExeSecreatery] = useState(exeSecreataryedit);
  const [employee_Id, setEmployee_Id] = useState(empCodeList?.filter(item => item.code === editEmployeeArray?.employeeId)?.[0]);
  const [employeeName, setemployeeName] = useState(editEmployeeArray?.employeeName);
  const [employeeListdetailes, setEmployeeListdetailes] = useState([]);
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const [visibleNewForm, setVisibleNewForm] = useState(false);
  const [showPreviewPopUp, setShowPreviewPopUp] = useState(0);
  const [showPreviewbasic, setShowPreviewbasic] = useState(false);
  const [showPreviewrouting, setShowPreviewrouting] = useState(false);
  const [Report_sent, setReport_sent] = useState(false);
  const [position, setPosition] = useState('center');
  const [firstApproverOption, setFirstApproverOption] = useState([]);
  const [secondApproverOption, setSecondApproverOption] = useState([]);
  const [thirdApproverOption, setThirdApproverOption] = useState([]);
  const [fourthApproverOption, setFourthApproverOption] = useState([]);
  const [fifthApproverOption, setFifthApproverOption] = useState([]);
  const [sixthApproverOption, setSixthApproverOption] = useState([]);
  const [employeeEditId, setEmployeeEditId] = useState('');
  let EmployeeNameArray = employeeName?.split('\n').map(item => item.trim()) || [];
  let budgerCodeArray = budgetCode?.split('\n').map(item => item.trim()) || [];
  const show = (position) => {
    setPosition(position);
    setReport_sent(true);
  };

  useEffect(() => {
    setVisibleNewForm(showNewFormModal);
  }, [showNewFormModal]);
  const loggedUserId = 1;//reactLocalStorage.get("loggedUserId");
  const handlePaste = (event, field) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text');

    // Split pasted text into rows and append to the existing value
    if (field == 'name') {
      const updatedData = employeeName + '\n' + pastedText;
      setemployeeName(updatedData);
    } else {
      const updatedData = budgetCode + '\n' + pastedText;
      setbudgetCode(updatedData);
    }
    // Prevent default paste behavior
    event.preventDefault();
  };
  const handleApply = async () => {
    show('right')
    // const newFormData = {
    //   employee_Id: employee_Id?.code ,
    //   formId: employee_Id?.userId , // employee id
    //   employeeName: employeeName,
    //   positionTo: positionTo,
    //   positionFrom: positionFrom,
    //   startEndDate: moment(startEndDate).format("YYYY-MM-DD"),
    //   endDate: moment(endDate).format("YYYY-MM-DD"),
    //   salaryRate: salaryRate,
    //   rateofPay: rateofPay,
    //   fundingSource: fundingSource,
    //   accountNo: accountNo,
    //   budgetCode: budgetCode,
    //   reason: reason,
    // };
    let distinctEmployeeName = [...new Set(EmployeeNameArray)];
    var savedemployee = await API.graphql(
      graphqlOperation(mutations.createPersonnelActionEmployee,
        {
          input: {
            "employeeId": employee_Id.code || "",//employee code
            "employeeName": distinctEmployeeName.filter(item => item !== ''),
            "salaryRate": salaryRate || "",
            "rateofPay": rateofPay || "",
            "reason": reason || "",
            "fundingSource": fundingSource || "",
            "accountNo": accountNo || "",
            "budgetCode": budgerCodeArray.filter(item => item !== ''),
            "effectiveDatesTo": moment(endDate).format("YYYY-MM-DD"),
            "effectiveDatesFrom": moment(startEndDate).format("YYYY-MM-DD"),
            "positionTitleTo": positionTo || "",
            "positionTitleFrom": positionFrom || "",
            "formId": requestedData?.id || "",
            created_by: loggedUserId,
          }
        }
      ));
    // setEmployeeArray([...savedemployee].concat(EmployeeArray));

    // Reset the form fields
    // setEmployee_Id('');
    // setemployeeName('');
    // setbudgetCode('');
    // setPositionTo('');
    // setPositionFrom('');
    // setStarEndDate(null);
    // setEndDate(null);
    // setsalaryRate('');
    // setrateofPay('');
    // setfundingSource('');
    // setaccountNo('');

    // setreason('');
    setAddNewForm(false);
    setreloadonce(true);
  };

  const handleApplyEdit = async (rowid) => {
    let distinctEmployeeName = [...new Set(EmployeeNameArray)];
    const original = await API.graphql(
      graphqlOperation(queries.getPersonnelActionEmployee,
        { id: rowid }
      )
    );
    // await fetchInitiateReport(rowid);
    let updateremployeedetails = await API.graphql(
      graphqlOperation(mutations.updatePersonnelActionEmployee, {
        input: {
          id: original?.data?.getPersonnelActionEmployee.id,
          employeeId: employee_Id?.code ? employee_Id?.code : editEmployeeArray?.employeeId,//employee code
          employeeName: employeeName ? JSON.stringify(distinctEmployeeName.filter(item => item !== '')) : editEmployeeArray?.employeeName,
          salaryRate: salaryRate ? salaryRate : editEmployeeArray?.salaryRate,
          rateofPay: rateofPay ? rateofPay : editEmployeeArray?.rateofPay,
          reason: reason ? reason : editEmployeeArray?.reason,
          fundingSource: fundingSource ? fundingSource : editEmployeeArray?.fundingSource,
          accountNo: accountNo ? accountNo : editEmployeeArray?.accountNo,
          budgetCode: budgetCode ? JSON.stringify(budgerCodeArray.filter(item => item !== '')) : editEmployeeArray?.budgetCode,
          effectiveDatesTo: endDate ? moment(endDate).format("YYYY-MM-DD") : editEmployeeArray?.effectiveDatesTo,
          effectiveDatesFrom: startEndDate ? moment(startEndDate).format("YYYY-MM-DD") : editEmployeeArray?.effectiveDatesFrom,
          positionTitleTo: positionTo ? positionTo : editEmployeeArray?.positionTitleTo,
          positionTitleFrom: positionFrom ? positionFrom : editEmployeeArray?.positionTitleFrom,
          _version: original?.data?.getPersonnelActionEmployee._version
        }
      })
    );
    if (updateremployeedetails) {
      let newFormData = [{
        id: updateremployeedetails?.data?.updatePersonnelActionEmployee?.id,
        employeeName: JSON.parse(updateremployeedetails?.data?.updatePersonnelActionEmployee?.employeeName),
        positionTitleTo: updateremployeedetails?.data?.updatePersonnelActionEmployee?.positionTitleTo,
        positionTitleFrom: updateremployeedetails?.data?.updatePersonnelActionEmployee?.positionTitleFrom,
        effectiveDatesFrom: updateremployeedetails?.data?.updatePersonnelActionEmployee?.effectiveDatesFrom,
        effectiveDatesTo: updateremployeedetails?.data?.updatePersonnelActionEmployee?.effectiveDatesTo,
        salaryRate: updateremployeedetails?.data?.updatePersonnelActionEmployee?.salaryRate,
        rateofPay: updateremployeedetails?.data?.updatePersonnelActionEmployee?.rateofPay,
        fundingSource: updateremployeedetails?.data?.updatePersonnelActionEmployee?.fundingSource,
        accountNo: updateremployeedetails?.data?.updatePersonnelActionEmployee?.accountNo,
        budgetCode: JSON.parse(updateremployeedetails?.data?.updatePersonnelActionEmployee?.budgetCode),
        reason: updateremployeedetails?.data?.updatePersonnelActionEmployee?.reason,
      }];
      setEmployeeArray(newFormData);

    }
    setAddNewForm(false);

    // Reset the form fields
    setEmployee_Id('');
    // setemployeeName('');
    // setbudgetCode('');
    // setPositionTo('');
    // setPositionFrom('');
    // setStarEndDate(null);
    // setEndDate(null);
    // setsalaryRate('');
    // setrateofPay('');
    // setfundingSource('');
    // setaccountNo('');

    // setreason('');
    setreloadonce(true);
  }
  const handleDeleteRow = async employeeId => {
    const toDelete = await DataStore.query(PersonnelActionEmployee, employeeId);
    if (toDelete) {
      DataStore.delete(toDelete);
    }
    setreloadonce(true);
  };
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
      }
    }
    return user;
  }
  function getApproverProps(name, code) {
    return {
      name: name ? name : "",
      code: code,

    };
  }
  const actionOptions = [{ name: "Election of Additional Assignment", value: "Election of Additional Assignment" },
  { name: "Election of Additional Compensation", value: "Election of Additional Compensation" },
  { name: "Election of Babysitter", value: "Election of Babysitter" },
  { name: "Election of Corrections to Personnel Actions", value: "Election of Corrections to Personnel Actions" },
  { name: "Election of Hourly/Daily - Administrator", value: "Election of Hourly/Daily - Administrator" },
  { name: "Election of Hourly/Daily - Cafeteria Worker I", value: "Election of Hourly/Daily - Cafeteria Worker I" },
  { name: "Election of Hourly/Daily - Clerk II", value: "Election of Hourly/Daily - Clerk II" },
  { name: "Election of Hourly/Daily - Community Resource Assistant - Bilingual", value: "Election of Hourly/Daily - Community Resource Assistant - Bilingual" },
  { name: "Election of Hourly/Daily - EAII, Armenian, Korean, Spanish", value: "Election of Hourly/Daily - EAII, Armenian, Korean, Spanish" },
  { name: "Election of Hourly/Daily - Education Assistant I", value: "Election of Hourly/Daily - Education Assistant I" },
  { name: "Election of Hourly/Daily - Recreation Leader", value: "Election of Hourly/Daily - Recreation Leader" },
  { name: "Election of Hourly/Daily - Substitute Teacher", value: "Election of Hourly/Daily - Substitute Teacher" },
  { name: "Election of Hourly/Daily - Teacher", value: "Election of Hourly/Daily - Teacher" },
  { name: "Election of Hourly/Daily - Teacher - CDP", value: "Election of Hourly/Daily - Teacher - CDP" },
  { name: "Election of Hourly/Daily - Teacher Specialist", value: "Election of Hourly/Daily - Teacher Specialist" },
  { name: "Election of Hourly/Daily - Typist Clerk I", value: "Election of Hourly/Daily - Typist Clerk I" },
  { name: "Election of Non-Student Stage Crew", value: "Election of Non-Student Stage Crew" },
  { name: "Election of Noon Aide", value: "Election of Noon Aide" },
  { name: "Election of Personal Services Agreement", value: "Election of Personal Services Agreement" },
  { name: "Election of Provisional Assignment", value: "Election of Provisional Assignment" },
  { name: "Election of Recreation Leader II", value: "Election of Recreation Leader II" },
  { name: "Election of Reimbursement Authorization", value: "Election of Reimbursement Authorization" },
  { name: "Election of Stage Crew", value: "Election of Stage Crew" },
  { name: "Election of Stage Manager", value: "Election of Stage Manager" },
  { name: "Election of Student Assistant", value: "Election of Student Assistant" },
  { name: "Election of Substitute - Assistant", value: "Election of Substitute - Assistant" },
  { name: "Election of Substitute - Café Worker", value: "Election of Substitute - Café Worker" },
  { name: "Election of Substitute - Classified", value: "Election of Substitute - Classified" },
  { name: "Election of Substitute - Clerical", value: "Election of Substitute - Clerical" },
  { name: "Election of Substitute - Custodian", value: "Election of Substitute - Custodian" },
  { name: "Election of Substitute Teacher", value: "Election of Substitute Teacher" },
  { name: "Election of Translator", value: "Election of Translator" },
  { name: "Election of Transportation Authorization", value: "Election of Transportation Authorization" }]

  const fetchInitiateReport = async (id) => {
    try {
      const result = await API.graphql(
        graphqlOperation(queries.getPersonnelActionEmployee,
          { id: id }
        )
      );

      return result.data.getPersonnelActionEmployee;
    } catch (error) {
      console.error('Error fetching original item:', error);
      return null;
    }
  }
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
  const fetchReportTransactionCycles = async (reportId) => {
    return await fetchPaginatedRecords(
      queries.listTransactionCyclePersonnels,
      { report_Id: { eq: reportId } },
      { field: "createdAt", direction: "desc" },
      1000,
      'listTransactionCyclePersonnels'
    )
  };
  const loadUsers = async (e, listName) => {
    //------------------------------- load users------------- 
    try {
      var employeeResponses = await fetchPaginatedRecords(
        queries.listEmployees,
        null,
        { field: "employee_name", direction: "asc" },
        1000,
        'listEmployees'
      );
      // DataStore.query(Employee, Predicates.ALL,
      //   {
      //     sort: s => s.employee_name(SortDirection.ASCENDING),
      //   }
      // );
      setEmployeeListdetailes(employeeResponses)
      if (employeeResponses !== null) {
        let employeeData = employeeResponses;

        let finalEmployeeList = [];
        employeeData.map((item) => {
          let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
          let obj={}
          if(item.user_Id!=null){ 
            obj = {
            name: name,
            code: item.user_Id
          }}
          finalEmployeeList.push(obj);

        })
        if (e) {
          // let employeeSearchData = [];
          // employeeSearchData = finalEmployeeList.filter(item => item.employee_code === e.target.value);
          // employeeSearchData = finalEmployeeList.filter(item => item.employee_name === e.target.value);
          switch (listName) {
            case "firstApprover":
              setFirstApproverOption(finalEmployeeList)
              break;
            case "secondApprover":
              setSecondApproverOption(finalEmployeeList)
              break;
            case "thirdApprover":
              setThirdApproverOption(finalEmployeeList)
              break;
            case "fourthApprover":
              setFourthApproverOption(finalEmployeeList)
              break;
            case "fifthApprover":
              setFifthApproverOption(finalEmployeeList)
              break;
            case "sixthApprover":
              setSixthApproverOption(finalEmployeeList)
              break;

            default:
              setEmployeeList(finalEmployeeList);
              break;
          }
        } else {
          setFirstApproverOption(finalEmployeeList)
          setSecondApproverOption(finalEmployeeList)
          setThirdApproverOption(finalEmployeeList)
          setFourthApproverOption(finalEmployeeList)
          setFifthApproverOption(finalEmployeeList)
          setSixthApproverOption(finalEmployeeList)
          setEmployeeList(finalEmployeeList);
        }
      }
    }
    catch (error) {
    }
  };

  useEffect(() => {
    setBudgetClerk(budgetClerkedit);
    setExeSecreateryMgt(exeSecreataryMgtedit);
    setHrTechnician(hrTechnicianedit);
    setBudgetManager(budgetManageredit);
    setDeptHead(deptHeadedit);
    setExeSecreatery(exeSecreataryedit);
  }, [employeeList])


  const Typeoptions = [
    { name: 'Classified', value: 'Classified' },
    { name: 'Certificated', value: 'Certificated' }

  ]
  const fetchAndSetLoggedInUserData = async (userId) => {

    const cognito = new AWS.CognitoIdentityServiceProvider();
    var params = {
      UserPoolId: awsmobile.aws_user_pools_id,
      Limit: 60
    };

    params['Filter'] = "sub ^=\"" + userId + "\""

    try {
      const data = await cognito.listUsers(params).promise();
      if (data.Users.length > 0) {
        const user = data.Users[0];

        const userRoleAttribute = user.Attributes.find(attr => attr.Name === 'custom:role');
        const userNameAttribute = user.Attributes.find(attr => attr.Name === 'name');
        const sub = user.Attributes.find(attr => attr.Name === 'sub');
        const userEmailAttribute = user.Attributes.find(attr => attr.Name === 'email');
        const userCodeAttribute = user.Attributes.find(attr => attr.Name === 'custom:userCode');
        const signatureAttribute = user.Attributes.find(attr => attr.Name === 'custom:userSignature');

        let role;
        switch (userRoleAttribute?.Value) {
          case USER_TYPES.SUPERADMIN:
            role = USER_TYPES_NAMES.SA;
            break;
          case USER_TYPES.ADMIN:
            role = USER_TYPES_NAMES.A;
            break;
          case USER_TYPES.APPROVER:
            role = USER_TYPES_NAMES.AP;
            break;
          case USER_TYPES.PAYROLL:
            role = USER_TYPES_NAMES.P;
            break;
          default:
            role = USER_TYPES_NAMES.I;
        }

        return {
          userId: sub,
          name: userNameAttribute?.Value,
          email: userEmailAttribute?.Value,
          usercode: userCodeAttribute?.Value,
          signature: signatureAttribute?.Value,
          role: role
        };
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    }
    return null;
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
  const buildReportDetails = async (personalActionTransactionCycle, title, status, initiator_id, target_user_id, approver_id, next_approver_id) => {
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
          id: personalActionTransactionCycle.id,
          initiated_date: personalActionTransactionCycle.date,
          previous_status: status,
          title: title,
          new_status: personalActionTransactionCycle.status,
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
  function findEmail(attributes) {
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      if (attribute.Name === "email") {
        return attribute.Value;
      }
    }
    // Return null if no email found
    return null;
  }

  const onSendEmailNotification = async ({ id }) => {
    if (!employee_Id.userId) return;
    const empDetails = users.find(emp => emp.Username === employee_Id.userId);
    if (!empDetails) return;
    const email = findEmail(empDetails.Attributes);

    let defaultLoginURL = window.location.origin + `?${specialRoutes.personal_action_report_approval_request}=${id}`;

    var emailBody =
      "Hello, <br>Your Form for Personal Action Teaching Assignment is Out. <br><br>Please Review By Clicking below Link: <br/>" +
      defaultLoginURL +
      "?isHandbook=true";

    const emailsToSend = [email];
    if (emailsToSend.length > 0) {
      SendNotification({
        to: emailsToSend,
        subject: "Personal Action Teaching Assignment!",
        from: "ganesh@edbrix.com",
        body: emailBody
      });
    }
  };
  const saveBasicEditInfo = async (e, type, currentStatus) => {
    //Save Basic Info
    //   "selectedReportingManagerEmployee---",
    //   propsReportingManagerEmployee ? propsReportingManagerEmployee.code : selectedReportingManagerEmployee.code
    // );
    //check type
    if (type === "submit") {
      let original = await API.graphql(
        graphqlOperation(queries.getPersonnelActionInitiatorForm,
          { id: requestedData?.id }
        )
      );
      // await DataStore.query(PersonnelActionInitiatorForm, requestedData?.id);
      original = original?.data?.getPersonnelActionInitiatorForm
      let to_id = deptHead && deptHead?.code ? deptHead?.code : requestedData?.deptHead;
      if (showNewFormModal == true) {
        let PersonalActionFormTransactionCycleResponseLate = fetchReportTransactionCycles(requestedData?.id)
        //  await DataStore.query(
        //   TransactionCyclePersonnel,
        //   c => c.id.eq(requestedData?.id),
        //   { sort: s => s.createdAt(SortDirection.DESCENDING) }
        // );
        //Get the existing last stage assignee id before editing
        // If this is the first time submit, add the selected employee id as the last assignee
        let latestAssigneeId = PersonalActionFormTransactionCycleResponseLate.length
          ? (PersonalActionFormTransactionCycleResponseLate[0].deptHead || requestedData?.deptHead)
          : 0;

        // Check to which department the last assignee belongs to and assign the report to the particular updated department
        switch (latestAssigneeId) {
          // case original.formId:
          //   to_id = data?.formId;
          //   break;
          case original.deptHead:
            to_id = deptHead.code;
            break;
          case original.budgetClerk:
            to_id = budgetClerk?.code;
            break;
          case original.budgetManager:
            to_id = budgetManager?.code;
            break;
          case original.executiveSecretary:
            to_id = exeSecreatary.code;
            ; break;
          case original.executiveManagement:
            to_id = exeSecreataryMgt.code;
            break;
          case original.hrTechnician:
            to_id = hrTechnician.code;
            break;
          default:
            break;
        }

      }
      await API.graphql(
        graphqlOperation(mutations.updatePersonnelActionInitiatorForm, {
          input: {
            id: original.id,
            formTitle: formTitle ? formTitle : requestedData?.formTitle,
            boardMeetingDate: startDate ? moment(startDate).format("YYYY-MM-DD") : requestedData?.boardMeetingDate,
            location: location ? location : requestedData?.location,
            actionToBeTaken: actiontobetaken ? actiontobetaken : requestedData?.actionToBeTaken,
            type: EmpType ? EmpType : requestedData?.type,
            personalReportNo: personalNo ? personalNo : requestedData?.personalReportNo,
            deptHead: deptHead?.code ? deptHead?.code : requestedData?.deptHead,
            budgetClerk: budgetClerk?.code ? budgetClerk?.code : requestedData?.budgetClerk,
            budgetManager: budgetManager?.code ? budgetManager?.code : requestedData?.budgetManager?.code,
            executiveSecretary: exeSecreatary?.code ? exeSecreatary?.code : requestedData?.executiveSecretary,
            executiveManagement: exeSecreataryMgt?.code ? exeSecreataryMgt?.code : requestedData?.executiveManagement,
            hrTechnician: hrTechnician?.code ? hrTechnician?.code : requestedData?.hrTechnician,
            submited_by: loggedUserId,
            actionDate: moment(actionDate).format("YYYY-MM-DD"),
            actionItem: actionItem,
            actionPage: actionPage,
            _version: original?._version
          }
        })
      );
      // await DataStore.save(
      //   PersonnelActionInitiatorForm.copyOf(original, updated => {
      //     updated.formTitle = formTitle ? formTitle : requestedData?.formTitle;
      //     updated.boardMeetingDate = startDate ? moment(startDate).format("YYYY-MM-DD") : requestedData?.boardMeetingDate;
      //     updated.location = location ? location : requestedData?.location;
      //     updated.actionToBeTaken = actiontobetaken ? actiontobetaken : requestedData?.actionToBeTaken;
      //     updated.type = EmpType ? EmpType : requestedData?.type;
      //     updated.personalReportNo = personalNo ? personalNo : requestedData?.personalReportNo;
      //     updated.deptHead = deptHead?.code ? deptHead?.code : requestedData?.deptHead;
      //     updated.budgetClerk = budgetClerk?.code ? budgetClerk?.code : requestedData?.budgetClerk;
      //     updated.budgetManager = budgetManager?.code ? budgetManager?.code : requestedData?.budgetManager?.code;
      //     updated.executiveSecretary = exeSecreatary?.code ? exeSecreatary?.code : requestedData?.executiveSecretary;
      //     updated.executiveManagement = exeSecreataryMgt?.code ? exeSecreataryMgt?.code : requestedData?.executiveManagement;
      //     updated.hrTechnician = hrTechnician?.code ? hrTechnician?.code : requestedData?.hrTechnician;
      //     updated.submited_by = loggedUserId; 
      //   })
      // );

      if (currentStatus !== 'Submitted') {
        try {
          const originalTranscycle = fetchReportTransactionCycles(requestedData?.id);
          // await DataStore.query(TransactionCyclePersonnel, c => c.report_Id.eq(requestedData.id), {
          //   sort: s => s.createdAt(SortDirection.DESCENDING)
          // });
          var newPersonalActionFormTransactionCycle = await API.graphql({
            query: mutations.updateTransactionCyclePersonnel,
            variables: {
              input: {
                id: originalTranscycle?.[0]?.id,
                // await DataStore.save(
                //   TransactionCyclePersonnel.copyOf(originalTranscycle[0], updated => {
                // updated.report_Id = requestedData.id,
                // updated.from_Employee_Id = loggedUserId,
                // updated.to_Employee_Id = to_id,
                status: (personnelActionIsSuperadmin ? currentStatus : (currentStatus === "Rejected" ? "ReviewedResubmitted" : "Open")),
                // updated.isApproved = false,
                // updated.remark = "", 
                date: moment().format("YYYY-MM-DD"),
                _version: originalTranscycle[0]._version
              }
            }
          })
          // );

          if (newPersonalActionFormTransactionCycle) {
            const reportDetails = await buildReportDetails(newPersonalActionFormTransactionCycle, formTitle ? formTitle : requestedData?.formTitle, "Open", loggedUserId, deptHead && deptHead?.code ? deptHead?.code : requestedData?.deptHead, to_id, to_id);
            await handleNotificationsOnStatusChangeforPersonnelAction(currentStatus, reportDetails, "PERSONNEL_ACTION_FORM");
          }
        } catch (err) {
        }

      }
      // if (personnelActionIsSuperadmin === '1') {
      //   await updateEditable(original, false)
      // }

      toast.success("The report updated successfully for reviewed and resubmit.");

      try {
        await onSendEmailNotification({ id: original?.deptHead });
      } catch (e) {
      }

      await initiatorBindList();
      setrequestedreportEdit()
      HideShowNewFormModal()
    } else {
      // try {

      ////first save report in PersonnelActionInitiatorForm table
      let original = await API.graphql(
        graphqlOperation(queries.getPersonnelActionInitiatorForm,
          { id: requestedData?.id }
        )
      );
      original = original?.data?.getPersonnelActionInitiatorForm
      // await DataStore.query(PersonnelActionInitiatorForm, requestedData?.id);
      await API.graphql(
        graphqlOperation(mutations.updatePersonnelActionInitiatorForm, {
          input: {
            id: original.id,
            formTitle: formTitle ? formTitle : requestedData?.formTitle,
            boardMeetingDate: startDate ? moment(startDate).format("YYYY-MM-DD") : requestedData?.boardMeetingDate,
            location: location ? location : requestedData?.location,
            actionToBeTaken: actiontobetaken ? actiontobetaken : requestedData?.actionToBeTaken,
            type: EmpType ? EmpType : requestedData?.type,
            personalReportNo: personalNo ? personalNo : requestedData?.personalReportNo,
            deptHead: deptHead?.code ? deptHead?.code : requestedData?.deptHead,
            budgetClerk: budgetClerk?.code ? budgetClerk?.code : requestedData?.budgetClerk,
            budgetManager: budgetManager?.code ? budgetManager?.code : requestedData?.budgetManager?.code,
            executiveSecretary: exeSecreatary?.code ? exeSecreatary?.code : requestedData?.executiveSecretary,
            executiveManagement: exeSecreataryMgt?.code ? exeSecreataryMgt?.code : requestedData?.executiveManagement,
            hrTechnician: hrTechnician?.code ? hrTechnician?.code : requestedData?.executiveManagement,
            actionDate: moment(actionDate).format("YYYY-MM-DD"),
            actionItem: actionItem,
            actionPage: actionPage,
            _version: original?._version
          }
        })
      );
      // await DataStore.save(
      //   PersonnelActionInitiatorForm.copyOf(original, updated => { 
      //     updated.formTitle = formTitle ? formTitle : requestedData?.formTitle;
      //     updated.boardMeetingDate = startDate ? moment(startDate).format("YYYY-MM-DD") : requestedData?.boardMeetingDate;
      //     updated.location = location ? location : requestedData?.location;
      //     updated.actionToBeTaken = actiontobetaken ? actiontobetaken : requestedData?.actionToBeTaken;
      //     updated.type = EmpType ? EmpType : requestedData?.type;
      //     updated.personalReportNo = personalNo ? personalNo : requestedData?.personalReportNo;
      //     updated.deptHead = deptHead?.code ? deptHead?.code : requestedData?.deptHead;
      //     updated.budgetClerk = budgetClerk?.code ? budgetClerk?.code : requestedData?.budgetClerk;
      //     updated.budgetManager = budgetManager?.code ? budgetManager?.code : requestedData?.budgetManager?.code;
      //     updated.executiveSecretary = exeSecreatary?.code ? exeSecreatary?.code : requestedData?.executiveSecretary;
      //     updated.executiveManagement = exeSecreataryMgt?.code ? exeSecreataryMgt?.code : requestedData?.executiveManagement;
      //     updated.hrTechnician = hrTechnician?.code ? hrTechnician?.code : requestedData?.executiveManagement;

      //   })
      // );
      toast.warning("Form Saved successfully.");
      try {
        await onSendEmailNotification({ id: original?.deptHead });
      } catch (e) {
      }
      await initiatorBindList();
      setrequestedreportEdit()
      // HideShowNewFormModal();
    }
  };
  function concatenateStringifiedArray(inputString) {
    // Parse the input string into an array  
    const dataArray = JSON?.parse(inputString);
    // Join the array elements with line breaks  
    const concatenatedString = dataArray?.join('\n');
    return concatenatedString;
  }
  const employeeArrayList = async (id) => {
    var employeeArrayResponses = await fetchPaginatedRecords(
      queries.listPersonnelActionEmployees,
      { formId: { eq: id } },
      null,
      1000,
      'listPersonnelActionEmployees'
    )

    // await DataStore.query(PersonnelActionEmployee,

    //   c => c.formId.eq(id)
    // ); 
    if (employeeArrayResponses?.[0]?.id) {
      setPositionTo(employeeArrayResponses?.[0]?.positionTitleTo);
      setPositionFrom(employeeArrayResponses?.[0]?.positionTitleFrom);
      setStarEndDate(employeeArrayResponses?.[0]?.effectiveDatesFrom);
      setEndDate(employeeArrayResponses?.[0]?.effectiveDatesTo);
      setsalaryRate(employeeArrayResponses?.[0]?.salaryRate);
      setrateofPay(employeeArrayResponses?.[0]?.rateofPay);
      setfundingSource(employeeArrayResponses?.[0]?.fundingSource);
      setaccountNo(employeeArrayResponses?.[0]?.accountNo);
      setreason(employeeArrayResponses?.[0]?.reason);
      setbudgetCode(concatenateStringifiedArray(employeeArrayResponses?.[0]?.budgetCode));
      setemployeeName(concatenateStringifiedArray(employeeArrayResponses?.[0]?.employeeName))
      let newFormData = [{
        id: employeeArrayResponses?.[0]?.id,
        employeeName: JSON.parse(employeeArrayResponses?.[0]?.employeeName),
        positionTitleTo: employeeArrayResponses?.[0]?.positionTitleTo,
        positionTitleFrom: employeeArrayResponses?.[0]?.positionTitleFrom,
        effectiveDatesFrom: employeeArrayResponses?.[0]?.effectiveDatesFrom,
        effectiveDatesTo: employeeArrayResponses?.[0]?.effectiveDatesTo,
        salaryRate: employeeArrayResponses?.[0]?.salaryRate,
        rateofPay: employeeArrayResponses?.[0]?.rateofPay,
        fundingSource: employeeArrayResponses?.[0]?.fundingSource,
        accountNo: employeeArrayResponses?.[0]?.accountNo,
        budgetCode: JSON.parse(employeeArrayResponses?.[0]?.budgetCode),
        reason: employeeArrayResponses?.[0]?.reason,
      }];
      setEmployeeArray(newFormData);
      setEmployeeEditId(employeeArrayResponses?.[0]?.id)

    }
  }
  useEffect(() => {
    loadUsers();
  }, [])

  const initiateNewReport = async () => {


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

    //get only those users are without admin
    let usersWithoutAdmin = [];
    const loggedUserId = 1;//reactLocalStorage.get('loggedUserId');

    newRes.map((currentItem) => {
      if (currentItem.role !== 'Admin'
        && currentItem.userId !== loggedUserId) {
        usersWithoutAdmin.push(currentItem);
      }
    })
    //set employee list
    let finalEmpList = [];
    usersWithoutAdmin.map((currentItem) => {
      let obj = { name: currentItem.name, code: currentItem.usercode, userId: currentItem.userId };
      finalEmpList.push(obj);
    })
    setEmpCodeList(finalEmpList);
    setAllEmployeeDetails(usersWithoutAdmin);
    // setVisibleNewForm(false);
  }
  useEffect(() => {
    employeeArrayList(requestedData?.id);
    setreloadonce(false);
  }, [reloadonce])
  useEffect(() => {
    initiateNewReport();
  }, [users])

  const deleteButton = rowData => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-plain"
        onClick={() => handleDeleteRow(rowData.id)}
      />
    );
  };
  const nameTemplate = (fieldName) => (rowData) => (
    <div>
      {rowData?.[fieldName]?.reduce((elements, name, index) => {
        if (index > 0) {
          elements.push(<br key={index} />);
        }
        elements.push(name);
        return elements;
      }, [])}
    </div>
  );
  const requestedreportaction = row => {
    return (
      <div className="flex justify-center w-full gap-2">
        <div>
          {deleteButton(row)}
        </div>
        <div className="cursor-pointer" onClick={() => {
          seteditEmployeeArray(row)
          setEmployee_Id(empCodeList?.filter(item => item.code === row?.employeeId)?.[0]);
          setemployeeName(row?.employeeName);
          setbudgetCode(row?.budgetCode);
          setPositionTo(row?.positionTitleTo);
          setPositionFrom(row?.positionTitleFrom);
          setStarEndDate(row?.effectiveDatesFrom);
          setEndDate(row?.effectiveDatesTo);
          setsalaryRate(row?.salaryRate);
          setrateofPay(row?.rateofPay);
          setfundingSource(row?.fundingSource);
          setaccountNo(row?.accountNo);
          setreason(row?.reason);

          seteditEmployee(true)
          setAddNewForm(true)

        }}>
          <i className="gusd-edit text-[#667085] text-[20px] font-meduim"></i>
        </div>
      </div>

    );
  };
  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Employee Name" rowSpan={2} />
        <Column header="Position" colSpan={2} className="PositionHeaderAlign" />
        <Column header="Effective Date" rowSpan={2} />
        <Column header="Salary Rate or Reason" rowSpan={2} />
        <Column header="Not to Exceed" rowSpan={2} />
        <Column header="Funding Source(s) and Account Number(s)" rowSpan={2} />
      </Row>
      <Row>
        <Column field="positionTitleTo" colSpan={1} header="To" className="PositionHeaderAlign" />
        <Column field="positionTitleFrom" colSpan={1} header="From" className="PositionHeaderAlign" />
      </Row>
    </ColumnGroup>
  );
  const currentYear = new Date().getFullYear();
const startYear = 1990;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const CustomYearMonth =({ date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled})=>(
      <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button className="btn color-secondary border-[2px] w-[15px]" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <select
        className="border-[2px]"
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="border-[2px]"
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) =>
          changeMonth(months.indexOf(value))
        }
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button className="btn color-secondary border-[2px] w-[15px]" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>

  )
  return (
    <>
      <Dialog
        className="relative reports-popup"
        visible={visibleNewForm}
        position="right"
        style={{ width: "100vw" }}
        breakpoints={{ "960px": "100vw", "641px": "100vw" }}
        onHide={() => setVisibleNewForm(false)}
        draggable={false}
        resizable={false}
      >
        <div className="fixed inset-0 z-10 overflow-y-auto styled-select">
          <div className="flex items-start justify-center min-h-full h-full bg-[#FBFDFF]">
            <div className="relative w-full overflow-hidden transition-all transform">
              <div className="grid grid-cols-12 custmCols">
                <div className={`h-full col-span-2 sideBarLeft openSideDiv`}>
                  <button
                    onClick={() => {
                      HideShowNewFormModal();
                    }}
                    type="button"
                    className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[16px] xl:px-[0.833vw] text-[#2D5BE5] text-[10px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
                    id="add-family-cancel-btn"
                  >
                    <i className="gusd-arrow-line-right mr-[10px] xl:mr-[0.729vw]"></i> Back Home
                  </button>
                  <div className=" text-[#101828] text-[12px] mt-[7px] font-normal">BOARD REPORT PERSONNEL ACTION</div>
                  <div className="mt-[32px] xl:[1.667vw]">
                    <ul className="sideTabs">
                      <li>
                        <a
                          href="#"
                          onClick={() => setShowPreviewPopUp(0)}
                          className={`${showPreviewPopUp == 0 ? "tab-b active activeCheck" : showPreviewbasic ? "tab-b active " : ""}`}
                          data-id="tab1"
                        >
                          <i className="gusd-check text-[16px] xl:text-[1.042vw]"></i>
                          Basic Info
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => setShowPreviewPopUp(1)}
                          className={`${showPreviewPopUp == 1 ? "tab-b active activeCheck" : showPreviewrouting ? "tab-b active " : ""}`}
                          data-id="tab3"
                        >
                          <i className="gusd-check text-[16px] xl:text-[1.042vw]"></i>
                          Routing
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() =>
                            setShowPreviewPopUp(2)
                          }
                          className={`${showPreviewPopUp == 2 ? "tab-b active" : ""}`}
                          data-id="tab2"
                        >
                          <i className="gusd-check text-[16px] xl:text-[1.042vw]"></i> Preview & Edit
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
                <div className="h-100-vh col-span-10 overflow-auto xl:col-span-10 mScrollCstm  ">
                  {/* Form code goes here */}
                  <div className="text-[24px] xl:text-[1.250vw] font-medium">{(showPreviewPopUp == 0) ? 'Basic Info' : (showPreviewPopUp == 1) ? 'Routing' : 'Preview & Edit'}</div>
                  {
                    (showPreviewPopUp == 0) ?
                      <div className="border px-8 certificate-six">
                        <div className="font-bold grid justify-end">Form C</div>
                        <center>
                          <b>CERTIFICATE</b>
                        </center>
                        <center style={{ marginTop: "10px" }}>
                          GLENDALE UNIFIED SCHOOL DISTRICT
                          <div>Certificated Personnel Office</div>
                          <div style={{ marginTop: "20px" }}>
                            <b>REQUEST FOR APPROVAL - BOARD REPORT PERSONNEL ACTION</b>
                          </div>
                        </center>
                        <div className="mt-4 border-4 p-4">
                          <div style={{ textAlign: 'center' }} className="font-light text-xs">
                            NOTES: This form must be received by Human Resources with all approvals completed before 5:00 p.m. on Monday,
                            the week prior to the Board meeting, in order to be included in the next Board Report.
                          </div>
                        </div>
                        <div>
                          <div className="mt-2.5 leading-10" style={{ fontSize: "15px" }}>
                            {/* Employee Selection */}
                            <div style={{ justifyContent: 'center' }} className="flex items-center mb-2 flex-wrap space-x-2">
                              <span>It is requested that approval be granted to assign, on a voluntary basis,</span>
                            </div>
                            <div className="text-[24px] xl:text-[1.250vw] font-medium">{(showPreviewPopUp == 0) ? 'Basic Info' : (showPreviewPopUp == 1) ? 'Routing' : 'Preview & Edit'}</div>
                            <div className="bg-[#FFFFFF] rounded-lg">
                              <div className="mt-5 cusdropdown">
                                <div className="px-4 py-4 space-y-3">
                                  <div className="flex xl:col-span-12">
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Form Title <span className="text-[red] pl-0.2">*</span></div>
                                      <InputText
                                        placeholder="Form Title"
                                        onChange={e => setFormTitle(e.target.value)}
                                        value={formTitle}
                                        className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                      />
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Location</div>
                                      <InputText
                                        placeholder="Loaction"
                                        onChange={e => setLocation(e.target.value)}
                                        value={location}
                                        className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                      />
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">
                                        Action To Be Taken
                                      </div>
                                      {/* <InputText
                                        placeholder="Type here Action"
                                        onChange={e => setActiontobetaken(e.target.value)}
                                        value={actiontobetaken}
                                        className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                      /> */}
                                      <Dropdown value={actiontobetaken}
                                        onChange={(e) => {
                                          setActiontobetaken(e.value);
                                        }} options={actionOptions} optionLabel="name" placeholder="Select a Type of Action"
                                        className="w-full placeholder:text-[#667085]  md:h-[2.4vw] h-[40px]" />
                                    </div>
                                  </div>
                                  {
                                    actiontobetaken == "Election of Corrections to Personnel Actions" ?
                                      <div className="flex xl:col-span-12">
                                        <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                          <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Date<span className="text-[red] pl-0.2">*</span></div>
                                          <div className="relative custp-calender">
                                            <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.7rem] top-[0.7rem] z-10"></i>
                                            <div className="card flex justify-content-center">
                                              <DatePicker
                                                onChange={e => {
                                                  setActionDate(e);
                                                }}
                                                renderCustomHeader={CustomYearMonth}

                                                dateFormat="MM/dd/yyyy"
                                                selected={new Date(actionDate)}
                                                placeholderText="Select The Date"
                                                className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[26px] rounded-[6px]"
                                              />
                                              {/* <Calendar
                                            onChange={e => {
                                              setActionDate(e.target.value);
                                            }}
                                            dateFormat="mm/dd/yy"
                                            value={new Date(actionDate)}
                                            placeholder="Date"
                                            className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px] calender-af" /> */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                          <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Page</div>
                                          <InputText
                                            placeholder="Page"
                                            onChange={e => setActionPage(e.target.value)}
                                            value={actionPage}
                                            className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                          />
                                        </div>
                                        <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                          <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">
                                            Item No.
                                          </div>
                                          <InputText
                                            placeholder="Item No."
                                            onChange={e => setActionItem(e.target.value)}
                                            value={actionItem}
                                            className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                          />
                                        </div>
                                      </div> : null
                                  }
                                  <div className="flex xl:col-span-12">
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Type <span className="text-[red] pl-0.2">*</span></div>
                                      <div className='custm_inpute relative'>
                                        <Dropdown value={EmpType}
                                          onChange={(e) => {
                                            setEmpType(e.value);
                                          }} options={Typeoptions} optionLabel="name" placeholder="Select a Type of Form"
                                          className="w-full placeholder:text-[#667085]  md:h-[2.4vw] h-[40px]" />
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div>
                                        <div className="text-sm xl:text-[0.729vw] text-[#344054] font-medium pb-1 ">
                                          Personnel Report No
                                        </div>
                                        {/* <i className="gusd-search text-[#667085] text-sm absolute top-[19.6rem] z-10"></i> */}
                                        <InputText
                                          placeholder="Personnel Report No"
                                          onChange={e => setPersonalNo(e.target.value)}
                                          value={personalNo}
                                          className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                        />
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-sm xl:text-[0.729vw] text-[#344054] font-medium pb-1 ">
                                        Board Meeting Date <span className="text-[red] pl-0.2">*</span>
                                      </div>
                                      <div className="relative custp-calender">
                                        <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.7rem] top-[0.7rem] z-10"></i>
                                        <div className="card flex justify-content-center">
                                          <DatePicker

                                            onChange={e => {
                                              setStartDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}

                                            dateFormat="MM/dd/yyyy"
                                            selected={new Date(startDate)}
                                            placeholderText="Select The Date"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[26px] rounded-[6px]"
                                          />
                                          {/* <Calendar
                                            onChange={e => {
                                              setStartDate(e.target.value);
                                            }}
                                            dateFormat="mm/dd/yy"
                                            value={new Date(startDate)}
                                            placeholder="From"
                                            className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px] calender-af"
                                          /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex xl:col-span-12">
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Position Title</div>
                                      <div className='grid grid-cols-2 gap-3'>
                                        <div className='custm_inpute mt-1 relative'>
                                          <span className=" w-full">
                                            <InputTextarea placeholder="To"
                                              onChange={e => setPositionTo(e.target.value)}
                                              value={positionTo}
                                              className='w-full positionTextarea placeholder:text-[#667085] md:h-[7.292vw] h-[40px]' />
                                          </span>

                                        </div>
                                        <div className='custm_inpute mt-1 relative'>
                                          <span className=" w-full">
                                            <InputTextarea placeholder="From"
                                              onChange={e => setPositionFrom(e.target.value)}
                                              value={positionFrom}
                                              className='w-full positionTextarea placeholder:text-[#667085] md:h-[7.292vw] h-[40px]' />
                                          </span>

                                        </div>
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Effective Dates <span className="text-[red] pl-0.2">*</span></div>
                                      <div className='grid grid-cols-2 gap-3'>
                                        <div className='relative mt-1'>
                                          <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                                          <DatePicker
                                            onChange={e => {
                                              setStarEndDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}

                                            dateFormat="MM/dd/yyyy"
                                            selected={new Date(startEndDate)}
                                            placeholderText="From"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                                          />
                                          {/* <Calendar value={new Date(startEndDate)} onChange={(e) => setStarEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='From' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                                        </div>
                                        <div className='relative mt-1'>
                                          <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                                          <DatePicker
                                            onChange={e => {
                                              setEndDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}

                                            dateFormat="MM/dd/yyyy"
                                            selected={new Date(endDate)}
                                            minDate={new Date(startEndDate)}
                                            placeholderText="To"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                                          />
                                          {/* <Calendar value={new Date(endDate)} onChange={(e) => setEndDate(e.value)} minDate={new Date(startEndDate)} dateFormat="mm/dd/yy" placeholder='To' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:w-[21rem]">
                                        <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Not to Exceed</div>
                                        <div className='mt-1'>
                                          <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Not to Exceed' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Salary Rate or Reason</div>
                                      <div className='mt-1'>
                                        <InputText value={salaryRate} onChange={(e) => setsalaryRate(e.target.value)} placeholder='Enter the Salary' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="flex xl:col-span-12">
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Rate of Pay (Not to Exceed)</div>
                                      <div className='mt-1'>
                                        <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Rate' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Reason</div>
                                      <div className='mt-1'>
                                        <InputText value={reason} onChange={(e) => setreason(e.target.value)} placeholder='Enter the Reason' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div> */}
                                  {/* </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source</div>
                                      <div className='mt-1'>
                                        <InputText value={fundingSource} onChange={(e) => setfundingSource(e.target.value)} placeholder='Enter the Source' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div> */}
                                  {/* </div>
                                  </div> */}
                                  {/* <div className="flex xl:col-span-12"> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Account Number</div>
                                      <div className='mt-1'>
                                        <InputText value={accountNo} onChange={(e) => setaccountNo(e.target.value)} placeholder='Enter the Account Number' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div>
                                    </div> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Budget Name</div>
                                      <div className='custm_inpute mt-1 relative'>
                                        <span className=" w-full">
                                          <InputText placeholder="Type the Code Name"
                                            value={budgetCodeName} onChange={(e) => setbudgetCodeName(e.target.value)}
                                            className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                        </span>
                                      </div> */}
                                  {/* </div> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Budget Code</div>
                                      <div className='custm_inpute mt-1 relative'>
                                        <span className=" w-full">
                                          <InputText placeholder="Type the Code"
                                            value={budgetCode} onChange={(e) => setbudgetCode(e.target.value)}
                                            className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                        </span>
                                      </div> */}
                                  {/* </div> */}
                                  {/* </div> */}
                                  <div className="flex xl:col-span-12">
                                    <div className="xl:col-span-6 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Employee Name</div>
                                      <div className='custm_inpute mt-1 relative'>
                                        <span className=" w-full">
                                          {/* <InputText placeholder="Employee Name"
                                            value={employeeName}
                                            onChange={(e) => { setemployeeName(e.target.value) }}
                                            className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' /> */}
                                          <textarea
                                            value={employeeName}
                                            onPaste={(e) => handlePaste(e, 'name')}
                                            onChange={(e) => setemployeeName(e.target.value)}
                                            rows={5}
                                            cols={40}
                                            className="w-full textareas"
                                            placeholder="Paste or type data here (press Enter for a new line)"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="xl:col-span-6 md:w-[5rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source(s) and Account Number(s)</div>
                                      <div className='custm_inpute mt-1 relative'>
                                        <span className=" w-full">
                                          <textarea
                                            value={budgetCode}
                                            onPaste={(e) => handlePaste(e, 'code')}
                                            onChange={(e) => setbudgetCode(e.target.value)}
                                            rows={5}
                                            cols={40}
                                            className="w-full textareas"
                                            placeholder="Paste or type code here (press Enter for a new line)"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='text-[#FAFBFF] font-medium text-xs xl:text-[0.781vw] bg-[#113699] border border-[#113699] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] flex items-center space-x-2 cursor-pointer'
                                    style={{ width: '8rem', justifyContent: 'center', position: 'relative', margin: '10px auto' }}
                                    onClick={() => {
                                      if (startEndDate === null || startEndDate === "" || startEndDate == "Invalid date") {
                                        toast.error("Please Select Valid From Date");
                                        return;
                                      } else if (endDate === null || endDate === "" || endDate == "Invalid date") {
                                        toast.error("Please Select Valid To Date");
                                        return;
                                      } else {
                                        handleApplyEdit(employeeEditId)

                                      }
                                    }}>
                                    <i className='gusd-check'></i><span>Apply</span></div>
                                  {/* <div className='bg-[#113699] Shadow_xs xl:py-[0.625vw] py-[10px] xl:px-[2.604vw] px-[20px] flex items-center space-x-2 text-white font-semibold text-sm rounded-lg grow cursor-pointer w-[11rem]' 
                                  onClick={() => { 
                                    seteditEmployee(false);
                                    setEmployee_Id('');
                                    setemployeeName('');
                                    setbudgetCode('');
                                     setAddNewForm(true) }}>
                                    <i className='gusd-pluse-circle'></i><span>Add New</span></div> */}
                                  {/* <DataTable scrollable showGridlines size='Small' className="custpaginator custIcons custmBtnTable custTable" value={EmployeeArray}>
                                    <Column field="employee_Id" header="Employee Id" style={{ minWidth: '7rem' }}></Column>
                                    <Column field="employeeName" header="Employee Name" style={{ minWidth: '10rem' }}></Column>
                                    <Column body={(rowData) => `${rowData.positionFrom} - ${rowData.positionTo}`} header="Position" style={{ minWidth: "10rem" }}></Column>
                                    <Column body={(rowData) => `${moment(rowData.startEndDate).format("YYYY-MM-DD")} - ${moment(rowData.endDate).format("YYYY-MM-DD")}`} style={{ minWidth: "15rem" }} header="Effective Date"></Column>
                                    <Column field="salaryRate" header="Salary Rate" style={{ minWidth: '7rem' }}></Column>
                                    <Column field="rateofPay" header="Rate of Pay" style={{ minWidth: '7rem' }}></Column>
                                    <Column field="reason" header="Reason" style={{ minWidth: "10rem" }}></Column>
                                    <Column field="fundingSource" header="Funding Source" style={{ minWidth: '10rem' }}></Column>
                                    <Column field="accountNo" header="Account No." style={{ minWidth: '7rem' }}></Column>
                                    <Column field="budgetCode" header="Budget Code" style={{ minWidth: '7rem' }}></Column>
                                  </DataTable> */}
                                  <DataTable
                                    className="custpaginator custIcons custmBtnTable custTable"
                                    scrollable headerColumnGroup={headerGroup}
                                    value={EmployeeArray}
                                    // data={users}
                                    // filters={filters}
                                    filterDisplay="row"
                                    // ref={dt}
                                    paginator
                                    responsiveLayout="scroll"
                                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                    rows={5}
                                  >
                                    {/* <Column
                                      field="employeeId"
                                      header="Employee ID"
                                      sortable
                                      style={{ minWidth: "8rem" }}
                                    ></Column> */}
                                    <Column
                                      field="employeeName"
                                      header="Employee Name"
                                      body={nameTemplate('employeeName')}
                                      sortable
                                      style={{ minWidth: "12rem" }}
                                    ></Column>
                                    {/* <Column body={(rowData) => `${rowData.positionTitleTo} - ${rowData.positionTitleFrom}`} header="Position Title (To - From)" sortable style={{ minWidth: "15rem" }}>  </Column> */}
                                    <Column className="PositionHeaderAlign" field="positionTitleTo" header="To" style={{ minWidth: '15rem' }}></Column>
                                    <Column className="PositionHeaderAlign" field="positionTitleFrom" header="From" style={{ minWidth: '15rem' }}></Column>
                                    <Column
                                      body={(rowData) => `${moment(rowData.effectiveDatesFrom).format("MM/DD/yyyy")} - ${moment(rowData.effectiveDatesTo).format("MM/DD/yyyy")}`}

                                      header="Effective Dates |(From - To)"
                                      sortable
                                      style={{ minWidth: "14rem" }}
                                    ></Column>
                                    <Column field="salaryRate" header="Salary Rate or Reason" sortable style={{ minWidth: "13rem" }}></Column>
                                    <Column
                                      field="rateofPay"
                                      header="Note to Exceed"
                                      align="center"
                                      sortable

                                      style={{ minWidth: "16rem" }}
                                    ></Column>
                                    {/* <Column
                                      field="reason"
                                      header="Reason"
                                      align="center"
                                      sortable
                                      style={{ minWidth: "10rem" }}
                                    ></Column>
                                    <Column
                                      field="fundingSource"
                                      header="Funding Source"
                                      align="center"
                                      sortable

                                      style={{ minWidth: "14rem" }}
                                    ></Column>
                                    <Column
                                      field="accountNo"
                                      header="Account Number"
                                      align="center"
                                      sortable
                                      style={{ minWidth: "10rem" }}
                                    ></Column> */}
                                    <Column
                                      field="budgetCode"
                                      header="Funding Source(s) and Account Number(s)"
                                      align="center"
                                      body={nameTemplate('budgetCode')}
                                      sortable
                                      style={{ minWidth: "20rem" }}
                                    ></Column>
                                    {/* <Column
                                      field="action"
                                      header="Action"
                                      align="center"
                                      body={requestedreportaction}
                                      style={{ minWidth: "10rem" }}
                                    ></Column> */}
                                  </DataTable>
                                  <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                                    <div>
                                      <a href="#" onClick={() => HideShowNewFormModal()} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                    </div>
                                    <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                      <a
                                        onClick={() => {
                                          // saveBasicInfo('save');
                                          setShowPreviewPopUp(1);
                                          //   setShowNextPopUp(false);
                                        }}
                                        href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                      {
                                        (showPreviewPopUp == 0) ?
                                          <a href="#"
                                            onClick={() => {
                                              setShowPreviewPopUp(1)
                                              // saveBasicInfo();
                                              setShowPreviewbasic(true);
                                              // setShowPreviewPopUp(true)
                                            }}
                                            className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                            <i className='gusd-check mr-1'></i>Next</a> :
                                          (showPreviewPopUp == 1) ?
                                            <a href="#" onClick={() => {
                                              // setShowPreviewPopUp(true)
                                            }} className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                              <i className='gusd-eye mr-1'></i>Preview</a> :
                                            <a href="#" onClick={() => {
                                              //first we check mandatory fields are filled or not

                                              // if (selectedEmployee === null) { toast.error('Please Select Employee Id'); return; }
                                              // else if (schoolSelect === '') { toast.error('Please Select Assignment At'); return; }
                                              // else if (assighnmentTitle === '') { toast.error('Please enter Assighment Title'); return; }
                                              // else if (startDate === null) { toast.error('Please enter From Date'); return; }
                                              // else if (endDate === null) { toast.error('Please enter To Date'); return; }
                                              // else if (subjectCode === null) { toast.error('Please enter To Date'); return; }

                                              // setShowPreviewPopUp(true)
                                            }} className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                              <i className='gusd-eye mr-1'></i>Preview</a>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> : (showPreviewPopUp == 1) ?
                        <div className="border px-8 certificate-six" style={{ paddingBottom: '2rem' }}>
                          <div className="mt-2 grid grid-cols-1 gap-8">
                            <div className='space-y-[20px]'>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>Site Admin/Department Head.<span className="text-[red] pl-0.2">*</span></div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={deptHead}
                                      onChange={e => setDeptHead(e.value)}
                                      options={firstApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an Site Admin/Department Head"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "firstApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>Budget Clerk.</div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={budgetClerk || budgetClerkedit}
                                      onChange={e => setBudgetClerk(e.value)}
                                      options={secondApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an Budget Clerk"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "secondApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>Budget Manager.</div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={budgetManager || budgetManageredit}
                                      onChange={e => setBudgetManager(e.value)}
                                      options={thirdApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an Budget Manager"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "thirdApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>Ed Service Executive Secretary.</div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={exeSecreatary || exeSecreataryedit}
                                      onChange={e => setExeSecreatery(e.value)}
                                      options={fourthApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an Executive Secretary"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "fourthApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>Executive Management..<span className="text-[red] pl-0.2">*</span></div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={exeSecreataryMgt || exeSecreataryMgtedit}
                                      onChange={e => setExeSecreateryMgt(e.value)}
                                      options={fifthApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an Executive Management"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "fifthApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col '>
                                <div className="relative">
                                  <div className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" style={{ paddingTop: "10px" }}>HR Technician.<span className="text-[red] pl-0.2">*</span></div>
                                  <div >
                                    <Dropdown
                                      showClear
                                      value={hrTechnician || hrTechnicianedit}
                                      onChange={e => setHrTechnician(e.value)}
                                      options={sixthApproverOption}
                                      optionLabel="name"
                                      placeholder="Select an HR Technician"
                                      filter
                                      onKeyDown={e => {
                                        loadUsers(e, "sixthApprover");
                                      }}
                                      // valueTemplate={selectedCountryTemplate}
                                      className="w-full text-sm md:w-14rem"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 mt-[40px]  xl:mt-[2.083vw] ">
                                <div>
                                  <a href="#" onClick={() => setShowPreviewPopUp(0)} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                </div>
                                <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                  {requestedData.status === "Pending" ?
                                    <a
                                      onClick={(e) => {
                                        saveBasicEditInfo(e, 'save', requestedData.status);
                                        //   setShowPreviewPopUp(false);
                                        //   setShowNextPopUp(false);
                                      }}
                                      href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                    : null}
                                  <a href="#"
                                    onClick={() => {
                                      // saveBasicInfo();
                                      setShowPreviewrouting(true)
                                      setShowPreviewPopUp(2)
                                      // setShowPreviewPopUp(true)
                                    }}
                                    className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                    <i className='gusd-check mr-1'></i>Preview</a>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                        : <>
                          <HtmlToPdf
                            data={{
                              'employeeName': 'Abc',
                              'EmployeeArray': EmployeeArray,
                              'location': location,
                              'actiontobetaken': actiontobetaken,
                              'boardMeetingDate': startDate,
                              'empType': EmpType,
                              'personalNo': personalNo,
                              'actionDate': actionDate,
                              'actionItem': actionItem,
                              'actionPage': actionPage,
                            }}
                          />
                          <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                            <div>
                              <a href="#" onClick={() => setShowPreviewPopUp(1)} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                            </div>
                            <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                              <a
                                onClick={(e) => {
                                  saveBasicEditInfo(e, 'save', requestedData.status);
                                }}
                                href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                              {
                                (showPreviewPopUp == 0) ?
                                  <a href="#"
                                    // onClick={() => {
                                    //   saveBasicInfo();
                                    //   setConfirmVisible2(true)
                                    //   // setShowPreviewPopUp(true)
                                    // }}
                                    className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                    <i className='gusd-check mr-1'></i>Next</a> : (showPreviewPopUp == 1) ?

                                    <a href="#" onClick={() => {
                                      //first we check mandatory fields are filled or not

                                      // if (selectedEmployee === null) { toast.error('Please Select Employee Id'); return; }
                                      // else if (schoolSelect === '') { toast.error('Please Select Assignment At'); return; }
                                      // else if (assighnmentTitle === '') { toast.error('Please enter Assighment Title'); return; }
                                      // else if (startDate === null) { toast.error('Please enter From Date'); return; }
                                      // else if (endDate === null) { toast.error('Please enter To Date'); return; }
                                      // else if (subjectCode === null) { toast.error('Please enter To Date'); return; }

                                      // setShowPreviewPopUp(true)
                                    }} className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                      <i className='gusd-eye mr-1'></i>Preview</a> :
                                    <a href="#" onClick={(e) => {
                                      // setShowPreviewPopUp(true)
                                      saveBasicEditInfo(e, "submit", requestedData.status);
                                    }} className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                      <i className='gusd-eye mr-1'></i>Submit</a>
                              }
                            </div>
                          </div>
                        </>
                  }
                </div>
                {/* <div className={`h-full col-span-3 openSideDiv sideBarRight`}>
                <div className="relative h-full">
                  <div className="text-[24px] xl:text-[1.250vw] font-medium">Board Report</div>
                  <div className="mt-[15px] lg:mt-[32px] xl:[1.667vw]">
                    <div className="absolute bottom-[20px] left-0 right-0 xl:bottom-[2.083vw] -z-[1]">
                      <img src={empDetailsImg} alt="Employtee Details" class=" mx-auto" />
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </Dialog >
      {
        editEmployee ?
          <Sidebar visible={AddNewForm} position="right" onHide={() => setAddNewForm(false)} className='Add_new_Form' style={{ background: '#F5F6F7' }}>
            <div className='xl:py-[1.667vw] py-7 xl:px-[1.250vw] px-5 xl:space-y-[1.250vw] space-y-2'>
              <div className='cursor-pointer' onClick={() => setAddNewForm(false)}><i className='gusd-close-sidebar'></i></div>
              <div className='text-[#113699] font-semibold text-base xl:text-[0.833vw] -tracking-[0.32px]'>New Form</div>
              <div className='xl:space-y-[0.938vw] space-y-2'>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Employee ID <span className="text-[red] pl-0.2">*</span></div>
                  <div className='custm_inpute mt-1 relative'>
                    {/* <span className=" w-full"><i className="gusd-search" /> */}
                    <Dropdown value={employee_Id}
                      onChange={(e) => {
                        setemployeeName(e.value.name)
                        setEmployee_Id(e.value);
                        //set selected id employee data
                        allEmployeeDetails.map((currentItem) => {
                          if (currentItem.userId === e.value.code) {
                            setSelectedEmployeeDetails(currentItem);
                          }
                        })

                      }} options={empCodeList} optionLabel="code" placeholder="Select a Employee"
                      filter
                      // valueTemplate={selectedCountryTemplate}
                      className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]" />
                    {/* </span> */}
                  </div>
                </div>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Employee Name</div>
                  <div className='custm_inpute mt-1 relative'>
                    <span className=" w-full">
                      <InputText placeholder="Employee Name"
                        value={employeeName}
                        className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                    </span>
                  </div>
                </div>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Position Title</div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='custm_inpute mt-1 relative'>
                      <span className=" w-full">
                        <InputText placeholder="To"
                          onChange={e => setPositionTo(e.target.value)}
                          value={positionTo}
                          className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                      </span>
                    </div>
                    <div className='custm_inpute mt-1 relative'>
                      <span className=" w-full">
                        <InputText placeholder="From"
                          onChange={e => setPositionFrom(e.target.value)}
                          value={positionFrom}
                          className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                      </span>
                    </div>
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Effective Dates</div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='relative mt-1'>
                      <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                      <DatePicker
                        onChange={e => {
                          setStarEndDate(e);
                        }}
                        renderCustomHeader={CustomYearMonth}

                        dateFormat="MM/dd/yyyy"
                        selected={new Date(startEndDate)}
                        placeholderText="From"
                        className="w-full placeholder:text-[#667085] custm_calender md:w-[12rem] md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                      />
                      {/* <Calendar value={new Date(startEndDate)} onChange={(e) => setStarEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='From' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                    </div>
                    <div className='relative mt-1'>
                      <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                      <DatePicker
                        onChange={e => {
                          setEndDate(e);
                        }}
                        renderCustomHeader={CustomYearMonth}

                        dateFormat="MM/dd/yyyy"
                        selected={new Date(endDate)}
                        minDate={new Date(startEndDate)}
                        placeholderText="To"
                        className="w-full placeholder:text-[#667085] custm_calender md:w-[12rem] md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                      />
                      {/* <Calendar value={new Date(endDate)} onChange={(e) => setEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='To' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                    </div>
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Salary Rate or Reason</div>
                  <div className='mt-1'>
                    <InputText value={salaryRate} onChange={(e) => setsalaryRate(e.target.value)} placeholder='Enter the Salary' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Not to Exceed</div>
                  <div className='mt-1'>
                    <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Not to Exceed' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Reason</div>
                  <div className='mt-1'>
                    <InputText value={reason} onChange={(e) => setreason(e.target.value)} placeholder='Enter the Reason' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Souce</div>
                  <div className='mt-1'>
                    <InputText value={fundingSource} onChange={(e) => setfundingSource(e.target.value)} placeholder='Enter the Source' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Account Number</div>
                  <div className='mt-1'>
                    <InputText value={accountNo} onChange={(e) => setaccountNo(e.target.value)} placeholder='Enter the Account Number' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source(s) and Account Number(s)</div>
                  <div className='custm_inpute mt-1 relative'>
                    <span className=" w-full">
                      <InputText placeholder="Type the Code"
                        value={budgetCode} onChange={(e) => setbudgetCode(e.target.value)}
                        className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                    </span>
                  </div>
                </div>
                {/*col*/}

                <div className='flex items-center justify-between mt-5'>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.781vw] bg-white border border-[#D0D5DD] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] cursor-pointer' onClick={() => setAddNewForm(false)}>Clear</div>
                  <div className='text-[#FAFBFF] font-medium text-xs xl:text-[0.781vw] bg-[#113699] border border-[#113699] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] flex items-center
           space-x-2 cursor-pointer' onClick={() => handleApplyEdit(editEmployeeArray?.id)}><i className='gusd-check'></i><span>Apply</span></div>
                </div>
              </div>
            </div>
          </Sidebar> :
          <Sidebar visible={AddNewForm} position="right" onHide={() => setAddNewForm(false)} className='Add_new_Form' style={{ background: '#F5F6F7' }}>
            <div className='xl:py-[1.667vw] py-7 xl:px-[1.250vw] px-5 xl:space-y-[1.250vw] space-y-2'>
              <div className='cursor-pointer' onClick={() => setAddNewForm(false)}><i className='gusd-close-sidebar'></i></div>
              <div className='text-[#113699] font-semibold text-base xl:text-[0.833vw] -tracking-[0.32px]'>New Form</div>
              <div className='xl:space-y-[0.938vw] space-y-2'>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Employee ID</div>
                  <div className='custm_inpute mt-1 relative'>
                    {/* <span className=" w-full"><i className="gusd-search" /> */}
                    <Dropdown value={employee_Id}
                      onChange={(e) => {
                        setemployeeName(e.value.name)
                        setEmployee_Id(e.value);
                        //set selected id employee data
                        allEmployeeDetails.map((currentItem) => {
                          if (currentItem.userId === e.value.code) {
                            setSelectedEmployeeDetails(currentItem);
                          }
                        })

                      }} options={empCodeList} optionLabel="code" placeholder="Select a Employee"
                      filter
                      // valueTemplate={selectedCountryTemplate}
                      className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]" />
                    {/* </span> */}
                  </div>
                </div>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Employee Name</div>
                  <div className='custm_inpute mt-1 relative'>
                    <span className=" w-full">
                      <InputText placeholder="Employee Name"
                        value={employeeName}
                        className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                    </span>
                  </div>
                </div>
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Position Title</div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='custm_inpute mt-1 relative'>
                      <span className=" w-full">
                        <InputText placeholder="To"
                          onChange={e => setPositionTo(e.target.value)}
                          value={positionTo}
                          className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                      </span>
                    </div>
                    <div className='custm_inpute mt-1 relative'>
                      <span className=" w-full">
                        <InputText placeholder="From"
                          onChange={e => setPositionFrom(e.target.value)}
                          value={positionFrom}
                          className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                      </span>
                    </div>
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Effective Dates</div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='relative mt-1'>
                      <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                      <DatePicker
                        onChange={e => {
                          setStarEndDate(e);
                        }}
                        renderCustomHeader={CustomYearMonth}

                        dateFormat="MM/dd/yyyy"
                        selected={new Date(startEndDate)}
                        placeholderText="From"
                        className="w-full placeholder:text-[#667085] custm_calender md:w-[12rem] md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                      />
                      {/* <Calendar value={new Date(startEndDate)} onChange={(e) => setStarEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='From' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                    </div>
                    <div className='relative mt-1'>
                      <div className='gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10'><Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /></div>
                      <DatePicker
                        onChange={e => {
                          setEndDate(e);
                        }}
                        renderCustomHeader={CustomYearMonth}

                        dateFormat="MM/dd/yyyy"
                        selected={new Date(endDate)}
                        minDate={new Date(startEndDate)}
                        placeholderText="To"
                        className="w-full placeholder:text-[#667085] custm_calender md:w-[12rem] md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                      />
                      <Calendar value={new Date(endDate)} onChange={(e) => setEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='To' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' />
                    </div>
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Salary Rate or Reason</div>
                  <div className='mt-1'>
                    <InputText value={salaryRate} onChange={(e) => setsalaryRate(e.target.value)} placeholder='Enter the Salary' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Not to Exceed</div>
                  <div className='mt-1'>
                    <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Not to Exceed' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Reason</div>
                  <div className='mt-1'>
                    <InputText value={reason} onChange={(e) => setreason(e.target.value)} placeholder='Enter the Reason' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Souce</div>
                  <div className='mt-1'>
                    <InputText value={fundingSource} onChange={(e) => setfundingSource(e.target.value)} placeholder='Enter the Source' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Account Number</div>
                  <div className='mt-1'>
                    <InputText value={accountNo} onChange={(e) => setaccountNo(e.target.value)} placeholder='Enter the Account Number' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </div>
                </div>
                {/*col*/}
                {/*col*/}
                <div>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source(s) and Account Number(s)</div>
                  <div className='custm_inpute mt-1 relative'>
                    <span className=" w-full">
                      <InputText placeholder="Type the Code"
                        value={budgetCode} onChange={(e) => setbudgetCode(e.target.value)}
                        className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                    </span>
                  </div>
                </div>
                {/*col*/}

                <div className='flex items-center justify-between mt-5'>
                  <div className='text-[#344054] font-medium text-xs xl:text-[0.781vw] bg-white border border-[#D0D5DD] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] cursor-pointer' onClick={() => setAddNewForm(false)}>Clear</div>
                  <div className='text-[#FAFBFF] font-medium text-xs xl:text-[0.781vw] bg-[#113699] border border-[#113699] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] flex items-center
         space-x-2 cursor-pointer' onClick={() => { handleApply() }}><i className='gusd-check'></i><span>Apply</span></div>
                </div>
              </div>
            </div>
          </Sidebar>
      }
    </>
  );
};

export default EditFormModal;
