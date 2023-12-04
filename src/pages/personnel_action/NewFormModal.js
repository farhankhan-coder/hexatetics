import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import DatePicker from "react-datepicker";
// import empDetailsImg from "../../../assets/images/applicationImg.png";
// import { Image } from "primereact/image";
// import BoardsYet from '../../../../src/assets/images/boards_yet.svg';
import { Sidebar } from "primereact/sidebar";
// import CalendarIcon from '../../../../src/assets/images/icon/calendar.svg';
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import HtmlToPdf from "./HtmlToPdfForPA";
import { AutoComplete } from "primereact/autocomplete";
//import { Employee, PersonalActionForm, PersonnelActionEmployee, PersonnelActionFormTransactionCycle, PersonnelActionInitiatorForm, SixthPeriodReportTransactionCycle, TransactionCyclePersonnel } from "../../../models";
import moment from "moment";
import { reactLocalStorage } from "reactjs-localstorage";
USER_TYPES
// import { USER_TYPES, USER_TYPES_NAMES } from "../../../helper/enum";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
// import { specialRoutes } from "../../../helper/routeConstants";
// import { SendNotification } from "../../../helper/mail";
// import { handleNotificationsOnStatusChangeforPersonnelAction } from "../../../components/actions/notficationActions";
// import { formatDateToDdMmYyyy } from "../../../helper/commonfunctions";
import { Button } from "primereact/button";
// import { range } from "lodash";
import { USER_TYPES,USER_TYPES_NAMES } from "@/helper/enum";

const NewFormModal = ({ HideShowNewFormModal, showNewFormModal, initiatorBindList }) => {
  const [AddNewForm, setAddNewForm] = useState(false);
  const [budgetClerk, setBudgetClerk] = useState(null);
  const [exeSecreataryMgt, setExeSecreateryMgt] = useState(null);
  const [hrTechnician, setHrTechnician] = useState(null);
  const [budgetManager, setBudgetManager] = useState(null);
  const [deptHead, setDeptHead] = useState(null);
  const [empCodeList, setEmpCodeList] = useState([]);
  const [editEmployee, seteditEmployee] = useState(false);
  const [editEmployeeArray, seteditEmployeeArray] = useState({});
  console.log('editEmployeeArray --->', editEmployeeArray);
  const [exeSecreatary, setExeSecreatery] = useState(null);
  const [employee_Id, setEmployee_Id] = useState("");
  console.log('employee_Id: ', employee_Id.userId);
  const [location, setLocation] = useState("");
  const [actiontobetaken, setActiontobetaken] = useState("");
  const [actionDate, setActionDate] = useState("");
  const [actionPage, setActionPage] = useState("");
  const [actionItem, setActionItem] = useState("");
  console.log('actiontobetaken --->', actiontobetaken);
  const [formTitle, setFormTitle] = useState("");
  const [employeeName, setemployeeName] = useState();
  console.log('employeeName --->', employeeName);
  const [personalNo, setPersonalNo] = useState("");
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [EmpType, setEmpType] = useState('Certificated');
  const [startDate, setStartDate] = useState(null);
  console.log('startDate: ', startDate);
  const [positionTo, setPositionTo] = useState("");
  const [positionFrom, setPositionFrom] = useState("");
  const [startEndDate, setStarEndDate] = useState(null);
  console.log('startEndDate: ', startEndDate);
  const [salaryRate, setsalaryRate] = useState("");
  const [rateofPay, setrateofPay] = useState("");
  const [reason, setreason] = useState("");
  const [fundingSource, setfundingSource] = useState("");
  const [accountNo, setaccountNo] = useState("");
  const [budgetCode, setbudgetCode] = useState("");
  const [budgetCodeName, setbudgetCodeName] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [EmployeeArray, setEmployeeArray] = useState([]);
  console.log('EmployeeArray: ', JSON.stringify(EmployeeArray[0]?.employeeName));
  const [users, SetUsersList] = useState([]);
  const [items, setItems] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
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

  let EmployeeNameArray = employeeName?.split('\n').map(item => item.trim()) || [];
  let budgerCodeArray = budgetCode?.split('\n').map(item => item.trim()) || [];
  console.log('EmployeeNameArray --->', EmployeeNameArray);

  const show = (position) => {
    setPosition(position);
    setReport_sent(true);
  };

  let routingData = {
    deptHead: deptHead,
    budgetClerk: budgetClerk,
    budgetManager: budgetManager,
    exeSecreatary: exeSecreatary,
    exeSecreataryMgt: exeSecreataryMgt,
    hrTechnician: hrTechnician,
  };
  console.log("routingData", routingData);
  useEffect(() => {
    setVisibleNewForm(showNewFormModal);
  }, [showNewFormModal]);


  const handleApply = () => {
    // show('right')
    setEmployeeArray([]);
    let distinctEmployeeName = [...new Set(EmployeeNameArray)];
    // distinctEmployeeName.filter(item => item !== '').map((item, i) => {
    let newFormData = {
      // employee_Id: employee_Id.code,
      // formId: employee_Id?.userId,
      employeeName: distinctEmployeeName.filter(item => item !== ''),
      positionTo: positionTo,
      positionFrom: positionFrom,
      startEndDate: moment(startEndDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      salaryRate: salaryRate,
      rateofPay: rateofPay,
      fundingSource: fundingSource,
      accountNo: accountNo,
      budgetCode: budgerCodeArray.filter(item => item !== ''),
      reason: reason,
    };
    setEmployeeArray((prevArray) => [...prevArray, newFormData]);
    // })
    // setAddNewForm(false);
  };

  const handleEdit = () => {
    const indexToEdit = EmployeeArray.findIndex(obj =>
      Object.keys(editEmployeeArray).every(key => obj[key] === editEmployeeArray[key])
    );

    if (indexToEdit !== -1) {
      // Modify the object's properties
      const updatedValues = {
        employee_Id: employee_Id.code,
        formId: employee_Id?.userId,
        employeeName: employeeName,
        positionTo: positionTo,
        positionFrom: positionFrom,
        startEndDate: moment(startEndDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        salaryRate: salaryRate,
        rateofPay: rateofPay,
        fundingSource: fundingSource,
        accountNo: accountNo,
        budgetCode: budgetCode,
        reason: reason,
      }; // Change values as needed
      EmployeeArray[indexToEdit] = { ...EmployeeArray[indexToEdit], ...updatedValues };
      setAddNewForm(false);

    } else {
      console.log("Object not found.");
      setAddNewForm(false);
    }
  }
  const handleDeleteRow = employeeId => {
    console.log('rowData --->', employeeId);
    let newArray = EmployeeArray.filter(obj => obj.employee_Id !== employeeId);
    setEmployeeArray(newArray)
  };
  const deleteButton = rowData => {
    console.log('rowData --->', rowData);
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-plain"
        onClick={() => handleDeleteRow(rowData.employee_Id)}
      />
    );
  };
  const requestedreportaction = row => {
    console.log('rowdataa --->', row);
    return (
      <div className="flex justify-center w-full gap-2">
        <div>
          {deleteButton(row)}
        </div>
        <div className="cursor-pointer" onClick={() => {
          seteditEmployee(true);
          setAddNewForm(true);
          seteditEmployeeArray(row);
          setEmployee_Id(empCodeList?.filter(item => item.code === row?.employee_Id)?.[0] || '');
          setemployeeName(row?.employeeName || '');
          setPositionTo(row?.positionTo || '');
          setPositionFrom(row?.positionFrom || null);
          setStarEndDate(moment(row?.startEndDate, "YYYY-MM-DD").toDate() || null);
          setEndDate(moment(row?.endDate, "YYYY-MM-DD").toDate() || null);
          setsalaryRate(row?.salaryRate || '');
          setrateofPay(row?.rateofPay || '');
          setfundingSource(row?.fundingSource || '');
          setaccountNo(row?.accountNo || '');
          setbudgetCode(row?.budgetCode || '');
          setreason(row?.reason || '');
        }}>
          <i className="gusd-edit text-[#667085] text-[20px] font-meduim"></i>
        </div>
      </div>

    );
  };
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

  const handleClear = () => {
    setEmployee_Id('');
    setemployeeName('');
    setbudgetCode('');
    setPositionTo('');
    setPositionFrom('');
    setStarEndDate(null);
    setEndDate(null);
    setsalaryRate('');
    setrateofPay('');
    setfundingSource('');
    setaccountNo('');

    setreason('');
  }
//   const loggedUserId = reactLocalStorage.get("loggedUserId");
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
  const loadUsers = async (e, listName) => {
    //------------------------------- load users------------- 
    try {
      var employeeResponses = await fetchPaginatedRecords(
        queries.listEmployees,
        { role: { eq: USER_TYPES.APPROVER } },
        { field: "employee_name", direction: "asc" },
        1000,
        'listEmployees'
      );
      console.log('employeeResponses --->', employeeResponses);
      // DataStore.query(Employee, (c) => c.role.eq(USER_TYPES.APPROVER),
      //   {
      //     sort: s => s.employee_name(SortDirection.ASCENDING),
      //   }
      // );
      if (employeeResponses !== null) {
        let employeeData = employeeResponses;

        let finalEmployeeList = [];
        employeeData.map((item) => {
          let name = item.employee_code ? `${item.employee_name} (${item.employee_code})` : item.employee_name;
          let obj = {
            name: name,
            code: item.user_Id
          }
          finalEmployeeList.push(obj);

        })
        if (e) {
          let employeeSearchData = [];
          employeeSearchData = finalEmployeeList.filter(item => item.employee_code === e.target.value);
          employeeSearchData = finalEmployeeList.filter(item => item.employee_name === e.target.value);
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
        console.log('finalEmployeeList', finalEmployeeList)
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  const Typeoptions = [
    { name: 'Classified', value: 'Classified' },
    { name: 'Certificated', value: 'Certificated' }

  ]

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
    console.log('approver_id --->', approver_id);
    const targetPromise = fetchAndSetLoggedInUserData(target_user_id);
    console.log('targetPromise --->', targetPromise);
    const approverPromise = fetchAndSetLoggedInUserData(approver_id);
    console.log('approverPromise --->', approverPromise);
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
    console.log('personalActionTransactionCycle: ', personalActionTransactionCycle);
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
          id: personalActionTransactionCycle?.id,
          initiated_date: personalActionTransactionCycle?.date,
          previous_status: status,
          title: title,
          new_status: personalActionTransactionCycle?.status,
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
    console.log('reportDetails --->', reportDetails);
    return reportDetails;
  };
  let [originalPersonnelActionInitiatorForm, setoriginalPersonnelActionInitiatorForm] = useState(null);
  console.log('originalPersonnelActionInitiatorForm --->', originalPersonnelActionInitiatorForm);
  let [originalPersonnelActionEmployee, setoriginalPersonnelActionEmployee] = useState(null);
  console.log('originalPersonnelActionEmployee --->', originalPersonnelActionEmployee);
  let [originalPersonnelActionTransactionCycle, setoriginalPersonnelActionTransactionCycle] = useState(null);
  console.log('originalPersonnelActionTransactionCycle --->', originalPersonnelActionTransactionCycle);

  const saveBasicInfo = async (type, formTitleName) => {
    const loggedUserId = reactLocalStorage.get("loggedUserId");

    // if (formTitle === ""||formTitle === null) {
    //   toast.error("Please enter Form Title Title");
    //   return;
    // } else if (EmpType === null || EmpType === "") {
    //   toast.error("Please Select Employee Type");
    //   return;
    // } else if (personalNo === "") {
    //   toast.error("Please Select Personnel Report Number");
    //   return;
    // } else if (employee_Id === null || employee_Id === "") {
    //   toast.error("Please enter Employee ID");
    //   return;
    // } else 
    // if (deptHead === null || deptHead === "") {
    //   toast.error("Please enter Dept HEAD.");
    //   return;
    // }
    // else if (exeSecreataryMgt === null || exeSecreataryMgt === "") {
    //   toast.error("Please enter Executive Management.");
    //   return;
    // }
    // else if (hrTechnician === null || hrTechnician === "") {
    //   toast.error("Please enter Executive Management.");
    //   return;
    // }
    // else if (budgetClerk != null && budgetManager === null) {
    //   toast.error("Please enter Budget Manager..");
    //   return;
    // }

    //Save Basic Info
    //check type

    if (type === 'save') {
      if (originalPersonnelActionInitiatorForm && originalPersonnelActionEmployee && originalPersonnelActionTransactionCycle) {
        console.log('original --->', "111111111111");
        var newPersonalActionInitiatorFormReport = await API.graphql(
          graphqlOperation(mutations.updatePersonnelActionInitiatorForm,
            {
              input: {
                id: originalPersonnelActionInitiatorForm?.data?.getPersonnelActionInitiatorForm?.id,
                "created_by": loggedUserId || "",
                "formTitle": formTitle || '',
                "boardMeetingDate": moment(startDate).format("YYYY-MM-DD"),
                "location": location || '',
                "actionToBeTaken": actiontobetaken || "",
                "type": EmpType || "",
                "personalReportNo": personalNo || "",
                "deptHead": deptHead?.code,
                "budgetClerk": budgetClerk?.code,
                "budgetManager": budgetManager?.code,
                "executiveSecretary": exeSecreatary?.code,
                "executiveManagement": exeSecreataryMgt?.code,
                "hrTechnician": hrTechnician?.code,
                "actionDate": moment(actionDate).format("YYYY-MM-DD") || "",
                "actionItem": actionItem || "",
                "actionPage": actionPage || "",
                _version: originalPersonnelActionInitiatorForm?.data?.getPersonnelActionInitiatorForm?._version
              }
            })
        );
        console.log('newPersonalActionInitiatorFormReport --->', newPersonalActionInitiatorFormReport);
        var newPersonalActionEmployeeReport = await Promise.all(EmployeeArray?.map(item => API.graphql(
          graphqlOperation(mutations.updatePersonnelActionEmployee,
            {
              input: {
                id: originalPersonnelActionEmployee?.data?.getPersonnelActionEmployee?.id,
                "employeeId": item?.employee_Id || "",//employee code
                "employeeName": JSON.stringify(item?.employeeName) || "",
                "salaryRate": item?.salaryRate || "",
                "rateofPay": item?.rateofPay || "",
                "reason": item?.reason || "",
                "fundingSource": item?.fundingSource || "",
                "accountNo": item?.accountNo || "",
                "budgetCode": JSON.stringify(item?.budgetCode) || "",
                "effectiveDatesTo": moment(item?.endDate).format("YYYY-MM-DD"),
                "effectiveDatesFrom": moment(item?.startEndDate).format("YYYY-MM-DD"),
                "positionTitleTo": item?.positionTo || "",
                "positionTitleFrom": item?.positionFrom || "",
                "formId": newPersonalActionInitiatorFormReport?.data?.updatePersonnelActionInitiatorForm?.id || "",
                created_by: loggedUserId,
                _version: originalPersonnelActionEmployee?.data?.getPersonnelActionEmployee?._version
              }
            })
        )
        ));

        //second add first report transaction entry in PersonnelActionFormTransactionCycle table
        if (newPersonalActionInitiatorFormReport && newPersonalActionEmployeeReport) {
          toast.success('Data updated Successfully for pending.');
          initiatorBindList();
          var newSixthPeriodReportTransactionCycle = await API.graphql(
            graphqlOperation(mutations.updateTransactionCyclePersonnel,
              {
                input: {
                  id: originalPersonnelActionTransactionCycle?.data?.getTransactionCyclePersonnel?.id,
                  report_Id: newPersonalActionInitiatorFormReport?.data?.updatePersonnelActionInitiatorForm?.id,
                  from_Employee_Id: loggedUserId,
                  to_Employee_Id: null,
                  status: "Pending",
                  isApproved: false,
                  remark: "",
                  date: moment().format("YYYY-MM-DD"),
                  _version: originalPersonnelActionTransactionCycle?.data?.getTransactionCyclePersonnel?._version
                }
              })
          );

          onSendEmailNotification({
            id: newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id
          });
        }

      } else {
        var newPersonalActionInitiatorFormReport = await API.graphql(
          graphqlOperation(mutations.createPersonnelActionInitiatorForm,
            {
              input: {
                "created_by": loggedUserId || "",
                "formTitle": formTitle || '',
                "boardMeetingDate": moment(startDate).format("YYYY-MM-DD"),
                "location": location || '',
                "actionToBeTaken": actiontobetaken || "",
                "type": EmpType || "",
                "personalReportNo": personalNo || "",
                "deptHead": deptHead?.code,
                "budgetClerk": budgetClerk?.code,
                "budgetManager": budgetManager?.code,
                "executiveSecretary": exeSecreatary?.code,
                "executiveManagement": exeSecreataryMgt?.code,
                "hrTechnician": hrTechnician?.code,
                "actionDate": moment(actionDate).format("YYYY-MM-DD") || "",
                "actionItem": actionItem || "",
                "actionPage": actionPage || "",
              }
            })
        );
        setoriginalPersonnelActionInitiatorForm(await API.graphql(
          graphqlOperation(queries.getPersonnelActionInitiatorForm,
            { id: newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id }
          )
        ));
        var newPersonalActionEmployeeReport = await Promise.all(EmployeeArray?.map(item => API.graphql(
          graphqlOperation(mutations.createPersonnelActionEmployee,
            {
              input: {
                "employeeId": item?.employee_Id || "",//employee code
                "employeeName": JSON.stringify(item?.employeeName) || "",
                "salaryRate": item?.salaryRate || "",
                "rateofPay": item?.rateofPay || "",
                "reason": item?.reason || "",
                "fundingSource": item?.fundingSource || "",
                "accountNo": item?.accountNo || "",
                "budgetCode": JSON.stringify(item?.budgetCode) || "",
                "effectiveDatesTo": moment(item?.endDate).format("YYYY-MM-DD"),
                "effectiveDatesFrom": moment(item?.startEndDate).format("YYYY-MM-DD"),
                "positionTitleTo": item?.positionTo || "",
                "positionTitleFrom": item?.positionFrom || "",
                "formId": newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id || "",
                created_by: loggedUserId,
              }
            })
        )
        ));
        setoriginalPersonnelActionEmployee(await API.graphql(
          graphqlOperation(queries.getPersonnelActionEmployee,
            { id: newPersonalActionEmployeeReport?.[0]?.data?.createPersonnelActionEmployee?.id }
          )
        ));

        if (newPersonalActionInitiatorFormReport && newPersonalActionEmployeeReport) {

          toast.success('Data Added Successfully for pending.');
          initiatorBindList();
          // HideShowNewFormModal(); 
          // setEditRequestID(newSixthPeriodAssignmentInitiateReport.id);
          // setShowPreviewPopUp(false);
          // setConfirmVisible2(false);

          const newSixthPeriodReportTransactionCycle = await API.graphql(
            graphqlOperation(mutations.createTransactionCyclePersonnel,
              {
                input: {
                  report_Id: newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id,
                  from_Employee_Id: loggedUserId,
                  to_Employee_Id: null,
                  status: "Pending",
                  isApproved: false,
                  remark: "",
                  date: moment().format("YYYY-MM-DD")
                }
              })
          );
          console.log('newSixthPeriodReportTransactionCycle --->', newSixthPeriodReportTransactionCycle);
          setoriginalPersonnelActionTransactionCycle(await API.graphql(
            graphqlOperation(queries.getTransactionCyclePersonnel,
              { id: newSixthPeriodReportTransactionCycle?.data?.createTransactionCyclePersonnel?.id }
            )
          ));
          // initiatorBindList();
          onSendEmailNotification({
            id: newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id
          });
        }
      }
    } else {
      //other wise status submit
      //first save report in PersonnelActionInitiatorForm table
      console.log('original --->', originalPersonnelActionInitiatorForm);
      console.log('original --->', originalPersonnelActionEmployee);

      if (originalPersonnelActionInitiatorForm && originalPersonnelActionEmployee && originalPersonnelActionTransactionCycle) {
        console.log('original --->', "22222222222");
        var newPersonalActionInitiatorFormReport = await API.graphql(
          graphqlOperation(mutations.updatePersonnelActionInitiatorForm,
            {
              input: {
                id: originalPersonnelActionInitiatorForm?.data?.getPersonnelActionInitiatorForm?.id,
                "created_by": loggedUserId || "",
                "submited_by": loggedUserId,
                "formTitle": formTitle || '',
                "boardMeetingDate": moment(startDate).format("YYYY-MM-DD"),
                "location": location || '',
                "actionToBeTaken": actiontobetaken || "",
                "type": EmpType || "",
                "personalReportNo": personalNo || "",
                "deptHead": deptHead?.code ,
                "budgetClerk": budgetClerk?.code,
                "budgetManager": budgetManager?.code,
                "executiveSecretary": exeSecreatary?.code,
                "executiveManagement": exeSecreataryMgt?.code ,
                "hrTechnician": hrTechnician?.code ,
                "actionDate": moment(actionDate).format("YYYY-MM-DD") || "",
                "actionItem": actionItem || "",
                "actionPage": actionPage || "",
                _version: originalPersonnelActionInitiatorForm?.data?.getPersonnelActionInitiatorForm?._version
              }
            })
        );
        console.log('newPersonalActionInitiatorFormReport --->', newPersonalActionInitiatorFormReport);
        var newPersonalActionEmployeeReport = await Promise.all(EmployeeArray?.map(item => API.graphql(
          graphqlOperation(mutations.updatePersonnelActionEmployee,
            {
              input: {
                id: originalPersonnelActionEmployee?.data?.getPersonnelActionEmployee?.id,
                "employeeId": item?.employee_Id || "",//employee code
                "employeeName": JSON.stringify(item?.employeeName) || "",
                "salaryRate": item?.salaryRate || "",
                "rateofPay": item?.rateofPay || "",
                "reason": item?.reason || "",
                "fundingSource": item?.fundingSource || "",
                "accountNo": item?.accountNo || "",
                "budgetCode": JSON.stringify(item?.budgetCode) || "",
                "effectiveDatesTo": moment(item?.endDate).format("YYYY-MM-DD"),
                "effectiveDatesFrom": moment(item?.startEndDate).format("YYYY-MM-DD"),
                "positionTitleTo": item?.positionTo || "",
                "positionTitleFrom": item?.positionFrom || "",
                "formId": newPersonalActionInitiatorFormReport?.data?.updatePersonnelActionInitiatorForm?.id || "",
                created_by: loggedUserId,
                "submited_by": loggedUserId,
                _version: originalPersonnelActionEmployee?.data?.getPersonnelActionEmployee?._version
              }
            })
        )
        ));

        //second add first report transaction entry in PersonnelActionFormTransactionCycle table
        if (newPersonalActionInitiatorFormReport) {

          var newPersonnelActionFormTransactionCycle = await API.graphql(
            graphqlOperation(mutations.updateTransactionCyclePersonnel,
              {
                input: {
                  id: originalPersonnelActionTransactionCycle?.data?.getTransactionCyclePersonnel?.id,
                  "report_Id": newPersonalActionInitiatorFormReport?.data?.updatePersonnelActionInitiatorForm?.id,
                  "from_Employee_Id": loggedUserId,
                  "to_Employee_Id": deptHead?.code,
                  "status": 'Open',
                  "isApproved": false,
                  "remark": '',
                  "date": moment().format("YYYY-MM-DD"),
                  _version: originalPersonnelActionTransactionCycle?.data?.getTransactionCyclePersonnel?._version
                }
              })
          );


          if (newPersonalActionInitiatorFormReport && newPersonnelActionFormTransactionCycle && newPersonalActionEmployeeReport) {
            toast.success('Data Added Successfully for updated.');
            try {

              onSendEmailNotification({
                id: newPersonalActionInitiatorFormReport?.data?.updatePersonnelActionInitiatorForm?.id

              })

            } catch (err) {
              console.log("Error in onSendEmailNotification", err);
            }
            const reportDetails = await buildReportDetails(newPersonnelActionFormTransactionCycle?.data.updateTransactionCyclePersonnel, formTitle, "Open", loggedUserId, deptHead?.code, loggedUserId, deptHead?.code);
            handleNotificationsOnStatusChangeforPersonnelAction("Open", reportDetails, "PERSONNEL_ACTION_FORM");
            initiatorBindList();
            HideShowNewFormModal();
          }
        }

      } else {
        var newPersonalActionInitiatorFormReport = await API.graphql(
          graphqlOperation(mutations.createPersonnelActionInitiatorForm,
            {
              input: {
                "created_by": loggedUserId,
                "submited_by": loggedUserId,
                "formTitle": formTitle || '',
                "boardMeetingDate": moment(startDate).format("YYYY-MM-DD"),
                "location": location || '',
                "actionToBeTaken": actiontobetaken || "",
                "type": EmpType || "",
                "personalReportNo": personalNo || "",
                "deptHead": deptHead?.code,
                "budgetClerk": budgetClerk?.code,
                "budgetManager": budgetManager?.code,
                "executiveSecretary": exeSecreatary?.code,
                "executiveManagement": exeSecreataryMgt?.code,
                "hrTechnician": hrTechnician?.code || "",
                "actionDate": moment(actionDate).format("YYYY-MM-DD") || "",
                "actionItem": actionItem || "",
                "actionPage": actionPage || "",
              }
            })
        );

        var newPersonalActionEmployeeReport = await Promise.all(EmployeeArray?.map(item => API.graphql(
          graphqlOperation(mutations.createPersonnelActionEmployee,
            {
              input: {
                "employeeId": item?.employee_Id || "",//employee code
                "employeeName": JSON.stringify(item?.employeeName) || "",
                "salaryRate": item?.salaryRate || "",
                "rateofPay": item?.rateofPay || "",
                "reason": item?.reason || "",
                "fundingSource": item?.fundingSource || "",
                "accountNo": item?.accountNo || "",
                "budgetCode": JSON.stringify(item?.budgetCode) || "",
                "effectiveDatesTo": moment(item?.endDate).format("YYYY-MM-DD"),
                "effectiveDatesFrom": moment(item?.startEndDate).format("YYYY-MM-DD"),
                "positionTitleTo": item?.positionTo || "",
                "positionTitleFrom": item?.positionFrom || "",
                "formId": newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id || "",
                created_by: loggedUserId,
                "submited_by": loggedUserId,
              }
            })
        )
        ));

        //second add first report transaction entry in PersonnelActionFormTransactionCycle table
        if (newPersonalActionInitiatorFormReport) {

          var newPersonnelActionFormTransactionCycle = await API.graphql(
            graphqlOperation(mutations.createTransactionCyclePersonnel,
              {
                input: {
                  "report_Id": newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id,
                  "from_Employee_Id": loggedUserId,
                  "to_Employee_Id": deptHead?.code,
                  "status": 'Open',
                  "isApproved": false,
                  "remark": '',
                  "date": moment().format("YYYY-MM-DD"),
                }
              })
          );


          if (newPersonalActionInitiatorFormReport && newPersonnelActionFormTransactionCycle && newPersonalActionEmployeeReport) {
            toast.success('Data Added Successfully for Submitted.');
            try {

              onSendEmailNotification({
                id: newPersonalActionInitiatorFormReport?.data?.createPersonnelActionInitiatorForm?.id

              })

            } catch (err) {
              console.log("Error in onSendEmailNotification", err);
            }
            const reportDetails = await buildReportDetails(newPersonnelActionFormTransactionCycle?.data.createTransactionCyclePersonnel, formTitle, "Open", loggedUserId, deptHead?.code, loggedUserId, deptHead?.code);
            handleNotificationsOnStatusChangeforPersonnelAction("Open", reportDetails, "PERSONNEL_ACTION_FORM");
            initiatorBindList();
            HideShowNewFormModal();
          }
        }
      }
    }
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
      console.log(users);
      if (!deptHead?.code) return;
      const empDetails = users.find(emp => emp.Username === deptHead?.code);
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
    // updatedSchoolId = newPersonnelActionInitiatorFormReport.id;


  }
  useEffect(() => {
    // const employeeListreport = async () => {
    //   var employeeList = await fetchPaginatedRecords(
    //     queries.listEmployees,
    //     null,
    //     { field: "employee_name", direction: "asc" },
    //     1000,
    //     'listEmployees'
    //   );
    //   // DataStore.query(Employee, Predicates.ALL, {
    //   //   sort: s => s.employee_name(SortDirection.ASCENDING)
    //   // });
    //   setEmployeeListdetailes(employeeList)
    // }
    // employeeListreport();
    loadUsers();
  }, [])

  const initiateNewReport = async () => {

    console.log('usersusersusers:-', users);

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
    const loggedUserId = reactLocalStorage.get('loggedUserId');
    console.log("loggedUserIdloggedUserId:-", loggedUserId)

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
    console.log("empCodeList:-", usersWithoutAdmin)
    setAllEmployeeDetails(usersWithoutAdmin);
    // setVisibleNewForm(false);
  }
  useEffect(() => {
    initiateNewReport();
  }, [users])
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
        <Column field="positionTo" colSpan={1} header="To" className="PositionHeaderAlign" />
        <Column field="positionFrom" colSpan={1} header="From" className="PositionHeaderAlign" />
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
                    className="inline-flex justify-center py-[12px] xl:py-[0.625vw] px-[10px] xl:px-[0.833vw] text-[#2D5BE5] text-[10px] xl:text-[0.729vw] font-medium bg-[#EFF8FF] border border-[#EFF8FF] rounded-md"
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
                <div className="h-100-vh col-span-10 overflow-auto xl:col-span-10 mScrollCstm">
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
                                        placeholder="Enter the Form Title"
                                        onChange={e => setFormTitle(e.target.value)}
                                        value={formTitle}
                                        className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]"
                                      />
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Location</div>
                                      <InputText
                                        placeholder="Enter the Location"
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
                                      showClear
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
                                              <i className="gusd-calendar text-[#667085] text-sm absolute left-[0.7rem] top-[0.7rem] "></i>
                                              <div className="card flex justify-content-center">
                                              <DatePicker
                                                onChange={e => {
                                                  setActionDate(e);
                                                }}
                                                renderCustomHeader={CustomYearMonth}

                                                dateFormat="MM/dd/yyyy"
                                                selected={actionDate}
                                                placeholderText="Select The Date"
                                                className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[26px] rounded-[6px]"
                                              />
                                              {/* <Calendar
                                                onChange={e => {
                                                  setActionDate(e.target.value);
                                                }}
                                                dateFormat="mm/dd/yy"
                                                value={actionDate}
                                                placeholder="Select the Date"
                                                className="w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px] calender-af"
                                              /> */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                          <div className="text-[#344054] text-sm xl:text-[0.729vw] font-medium pb-1">Page</div>
                                          <InputText
                                            placeholder="Enter the Page"
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
                                            placeholder="Enter the Item No."
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
                                          showClear
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
                                          placeholder="Enter the Personnel Report No"
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
                                        <i className="gusd-calendar text-[#667085] absolute left-[10px] top-1/2 -translate-y-1/2 z-10"></i>
                                        <div className="card flex justify-content-center">
                                          {/* <InputMask
                                            mask="99/99/9999"
                                            placeholder="MM/DD/YYYY"
                                            onChange={e => {
                                              setStartDate(e.target.value);
                                            }}
                                            value={startDate}
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]"
                                            /> */}
                                          <DatePicker

                                            onChange={e => {
                                              setStartDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}
                                            dateFormat="MM/dd/yyyy"
                                            selected={startDate}
                                            placeholderText="Select The Date"
                                            className="w-full placeholder:text-[#667085] custm_calender  md:h-[2.292vw] h-[40px] border-[2px] pl-[26px] rounded-[6px]"
                                          />
                                          {/* <Calendar
                                            onChange={e => {
                                              setStartDate(e.target.value);
                                            }}
                                            dateFormat="mm/dd/yy"
                                            value={startDate}
                                            placeholder="Select The Date"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]"
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
                                              spellCheck="false"
                                              className='w-full positionTextarea placeholder:text-[#667085] md:h-[7.292vw] h-[40px]' />
                                          </span>
                                        </div>
                                        <div className='custm_inpute mt-1 relative'>
                                          <span className=" w-full">
                                            <InputTextarea placeholder="From"
                                              onChange={e => setPositionFrom(e.target.value)}
                                              value={positionFrom}
                                              spellCheck="false"
                                              className='w-full positionTextarea placeholder:text-[#667085] md:h-[7.292vw] h-[40px]' />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Effective Dates <span className="text-[red] pl-0.2">*</span></div>
                                      <div className='grid grid-cols-2 gap-3'>
                                        <div className='relative mt-1'>
                                          <div className='absolute z-10 top-3 left-3'>
                                            {/* <Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /> */}
                                            </div>
                                          <DatePicker
                                            onChange={e => {
                                              setStarEndDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}

                                            dateFormat="MM/dd/yyyy"
                                            selected={startEndDate}
                                            placeholderText="From"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                                          />
                                          {/* <Calendar value={startEndDate} onChange={(e) => setStarEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='From' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                                        </div>
                                        <div className='relative mt-1'>
                                          <div className='absolute z-10 top-3 left-3'>
                                            {/* <Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /> */}
                                            </div>
                                          <DatePicker
                                            onChange={e => {
                                              setEndDate(e);
                                            }}
                                            renderCustomHeader={CustomYearMonth}

                                            dateFormat="MM/dd/yyyy"
                                            selected={endDate}
                                            minDate={startEndDate}
                                            placeholderText="To"
                                            className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                                          />
                                          {/* <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} minDate={startEndDate} dateFormat="mm/dd/yy" placeholder='To' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:w-[21rem] ">
                                        <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Not to Exceed</div>
                                        <div className='mt-1'>
                                          <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Not to Exceed' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Salary Rate or Reason</div>
                                      <div className='mt-1'>
                                        <InputText value={salaryRate} onChange={(e) => setsalaryRate(e.target.value)} placeholder='Enter the Salary Rate or Reason' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="flex xl:col-span-12"> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview">
                                      <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Rate of Pay (Not to Exceed)</div>
                                      <div className='mt-1'>
                                        <InputText value={rateofPay} onChange={(e) => setrateofPay(e.target.value)} placeholder='Enter the Rate' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div>
                                    </div> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Reason</div>
                                      <div className='mt-1'>
                                        <InputText value={reason} onChange={(e) => setreason(e.target.value)} placeholder='Enter the Reason' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div> */}
                                  {/* </div> */}
                                  {/* <div className="xl:col-span-4 md:w-[21rem] flexboxview"> */}
                                  {/* <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source</div>
                                      <div className='mt-1'>
                                        <InputText value={fundingSource} onChange={(e) => setfundingSource(e.target.value)} placeholder='Enter the Source' className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                                      </div> */}
                                  {/* </div> */}
                                  {/* </div> */}
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
                                            placeholder="Paste or type Employee Name here (press Enter for a new line)"
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
                                            placeholder="Paste or type Funding Source(s) and Account Number(s) here (press Enter for a new line)"
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
                                        editEmployee ? handleEdit() : handleApply()
                                      }
                                    }}>
                                    <i className='gusd-check'></i><span>Apply</span></div>
                                  {
                                    EmployeeArray && EmployeeArray.length != 0 ?
                                      <div className='card'>
                                        {/* <div className='bg-[#113699] Shadow_xs xl:py-[0.625vw] py-[10px] xl:px-[2.604vw] px-[20px] flex items-center space-x-2 text-white font-semibold text-sm rounded-lg grow cursor-pointer w-[11rem]'
                                          onClick={() => {
                                            setAddNewForm(true);
                                            setEmployee_Id('');
                                            setemployeeName('');
                                            setbudgetCode('');
                                            seteditEmployee(false)
                                          }}>
                                          <i className='gusd-pluse-circle'></i><span>Add New</span></div> */}
                                        <DataTable showGridlines headerColumnGroup={headerGroup} scrollable size='Small' className="custpaginator custIcons custmBtnTable custTable" value={EmployeeArray.reverse()}
                                          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                          paginator
                                          rows={5}>
                                          {/* <Column field="employee_Id" header="Employee Id" style={{ minWidth: '7rem' }}></Column> */}
                                          <Column field="employeeName" header="Employee Name" body={nameTemplate('employeeName')} style={{ minWidth: '12rem' }}></Column>
                                          {/* <Column body={(rowData) => `${rowData.positionTo} - ${rowData.positionFrom}`} header="Position" style={{ minWidth: "10rem" }}></Column> */}
                                          <Column className="PositionHeaderAlign" field="positionTo" header="To" style={{ minWidth: '15rem' }}></Column>
                                          <Column className="PositionHeaderAlign" field="positionFrom" header="From" style={{ minWidth: '15rem' }}></Column>
                                          <Column body={(rowData) => `${moment(rowData.startEndDate).format("MM/DD/yyyy")} - ${moment(rowData.endDate).format("MM/DD/YYYY")}`} style={{ minWidth: "15rem" }} header="Effective Date"></Column>
                                          <Column field="salaryRate" header="Salary Rate or Reason" style={{ minWidth: '12rem' }}></Column>
                                          <Column field="rateofPay" header="Not to Exceed" style={{ minWidth: '13rem' }}></Column>
                                          {/* <Column field="reason" header="Reason" style={{ minWidth: "10rem" }}></Column>
                                          <Column field="fundingSource" header="Funding Source" style={{ minWidth: '10rem' }}></Column>
                                          <Column field="accountNo" header="Account No." style={{ minWidth: '7rem' }}></Column> */}
                                          <Column field="budgetCode" header="Funding Source(s) and Account Number(s)" body={nameTemplate('budgetCode')} style={{ minWidth: '20rem' }}></Column>
                                          {/* <Column
                                            field="action"
                                            header="Action"
                                            align="center"
                                            body={requestedreportaction}
                                            style={{ minWidth: "5rem" }}
                                          ></Column> */}
                                        </DataTable>
                                        <div className="grid grid-cols-2 mt-[40px] xl:mt-[2.083vw]">
                                          <div>
                                            <a href="#" onClick={() => HideShowNewFormModal()} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                          </div>
                                          <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                            <a
                                              onClick={() => {
                                                if (formTitle === "" || formTitle === null) {
                                                  toast.error("Please enter Form Title Title");
                                                  return;
                                                } else if (EmpType === null || EmpType === "") {
                                                  toast.error("Please Select Employee Type");
                                                  return;
                                                } else if (startDate === null || startDate === "" || startDate === "Invalid date ") {
                                                  toast.error("Please Select Valid Date");
                                                  return;
                                                }
                                                else {
                                                  saveBasicInfo('save');
                                                  // setShowPreviewPopUp(1)                                                  ;
                                                  // setShowPreviewbasic(true)
                                                  // setShowPreviewPopUp(true)
                                                }

                                              }}
                                              href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                            {
                                              (showPreviewPopUp == 0) ?
                                                <a href="#"
                                                  onClick={() => {
                                                    if (formTitle === "" || formTitle === null) {
                                                      toast.error("Please enter Form Title Title");
                                                      return;
                                                    } else if (EmpType === null || EmpType === "") {
                                                      toast.error("Please Select Employee Type");
                                                      return;
                                                    } else if (startDate === null || startDate === "" || startDate === "Invalid date ") {
                                                      toast.error("Please Select Valid Date");
                                                      return;
                                                    }
                                                    else {
                                                      setShowPreviewPopUp(1)
                                                      // saveBasicInfo();
                                                      setShowPreviewbasic(true)
                                                      // setShowPreviewPopUp(true)
                                                    }

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
                                      :
                                      // <div className='w-full h-full flex items-center justify-center mt-10'>
                                      //   <div className='flex flex-col items-center justify-between xl:gap-[2.083vw] gap-[40px]'>
                                      //     <div><Image src={BoardsYet} width={"320"} height={"299"} alt='CalendarIcon' className='xl:w-[16.667vw] xl:h-[15.573vw]' /></div>
                                      //     <div className='xl:text-[1.354vw] font-bold -tracking-[0.48px] text-[#344054]'>You haven't added any boards yet</div>
                                      //     <div className='bg-[#113699] Shadow_xs xl:py-[0.625vw] py-[10px] xl:px-[2.604vw] px-[20px] flex items-center space-x-2 text-white font-semibold text-sm rounded-lg grow cursor-pointer' onClick={() => { setAddNewForm(true); handleClear(); seteditEmployee(false) }}><i className='gusd-pluse-circle'></i><span>Add New </span></div>
                                      //   </div>
                                      // </div>
                                      null
                                  }
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
                                      value={budgetClerk}
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
                                      value={budgetManager}
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
                                      value={exeSecreatary}
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
                                      value={exeSecreataryMgt}
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
                                      value={hrTechnician}
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
                                  <a href="#" onClick={() => HideShowNewFormModal()} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                                </div>
                                <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                                  <a
                                    onClick={() => {
                                      if (deptHead === null || deptHead === "") {
                                        toast.error("Please enter Dept HEAD.");
                                        return;
                                      }
                                      else if (exeSecreataryMgt === null || exeSecreataryMgt === "") {
                                        toast.error("Please enter Executive Management.");
                                        return;
                                      }
                                      else if (hrTechnician === null || hrTechnician === "") {
                                        toast.error("Please enter Executive Management.");
                                        return;
                                      }
                                      else if (budgetClerk != null && budgetManager === null) {
                                        toast.error("Please enter Budget Manager..");
                                        return;
                                      } else {
                                        saveBasicInfo('save');
                                        // setShowPreviewrouting(true)
                                        // setShowPreviewPopUp(2)
                                        // setShowPreviewPopUp(true)

                                      }
                                    }}
                                    href="javascript:void(0);" className="inline-block text-[#2D5BE5] text-[16px] xl:text-[0.833vw] font-medium bg-[#EFF8FF] hover:bg-[#EFF8FF] border border-[#D0D5DD] hover:border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='pi pi-save mr-1' style={{ fontSize: '0.8rem' }}></i>Save</a>
                                  <a href="#"
                                    onClick={() => {
                                      if (deptHead === null || deptHead === "") {
                                        toast.error("Please enter Dept HEAD.");
                                        return;
                                      }
                                      else if (exeSecreataryMgt === null || exeSecreataryMgt === "") {
                                        toast.error("Please enter Executive Management.");
                                        return;
                                      }
                                      else if (hrTechnician === null || hrTechnician === "") {
                                        toast.error("Please enter Executive Management.");
                                        return;
                                      }
                                      else if (budgetClerk != null && budgetManager === null) {
                                        toast.error("Please enter Budget Manager..");
                                        return;
                                      } else {
                                        // saveBasicInfo();
                                        setShowPreviewrouting(true)
                                        setShowPreviewPopUp(2)
                                        // setShowPreviewPopUp(true)

                                      }

                                    }}
                                    className="inline-block text-[#FFF] text-[16px] xl:text-[0.833vw] font-medium bg-[#3366FF] hover:bg-[#3366FF] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                    <i className='gusd-eye mr-1'></i>Preview</a>
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
                              <a href="#" onClick={() => HideShowNewFormModal()} className="inline-block text-[#344054] text-[16px] xl:text-[0.833vw] font-medium bg-white hover:bg-[#f5f5f5] border border-[#D0D5DD] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]"><i className='gusd-arrow-line-right mr-1'></i>Previous</a>
                            </div>
                            <div className="flex justify-end space-x-[20px] xl:space-x-[1.042vw]">
                              <a
                                onClick={() => {
                                  saveBasicInfo('save');
                                  //   setShowPreviewPopUp(false);
                                  //   setShowNextPopUp(false);
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
                                    <a href="#" onClick={() => {
                                      // setShowPreviewPopUp(true)
                                      saveBasicInfo('saveAs', formTitle);
                                    }} className="inline-block text-white text-[16px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                      <i className='gusd-check mr-1'></i>Submit</a>
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
                    setEmployee_Id(e.value);
                    // setemployeeName(e.value.name)
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
                    <InputText placeholder="From"
                      onChange={e => setPositionFrom(e.target.value)}
                      value={positionFrom}
                      className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </span>
                </div>
                <div className='custm_inpute mt-1 relative'>
                  <span className=" w-full">
                    <InputText placeholder="To"
                      onChange={e => setPositionTo(e.target.value)}
                      value={positionTo}
                      className='w-full placeholder:text-[#667085] md:h-[2.292vw] h-[40px]' />
                  </span>
                </div>
              </div>
            </div>
            {/*col*/}
            {/*col*/}
            <div>
              <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Effective Dates <span className="text-[red] pl-0.2">*</span></div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='relative mt-1'>
                  <div className='absolute z-10 top-3 left-3'>
                   {/* <Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /> */}
                    </div>
                  <DatePicker
                    onChange={e => {
                      setStarEndDate(e);
                    }}
                    renderCustomHeader={CustomYearMonth}

                    dateFormat="MM/dd/yyyy"
                    selected={startEndDate}
                    placeholderText="From"
                    className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                  />
                  {/* <Calendar value={startEndDate} onChange={(e) => setStarEndDate(e.value)} dateFormat="mm/dd/yy" placeholder='From' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
                </div>
                <div className='relative mt-1'>
                  <div className='absolute z-10 top-3 left-3'>
                    {/* <Image src={CalendarIcon} width={"16"} height={"16"} alt='CalendarIcon' /> */}
                    </div>
                  <DatePicker
                    onChange={e => {
                      setEndDate(e);
                    }}
                    renderCustomHeader={CustomYearMonth}

                    dateFormat="MM/dd/yyyy"
                    selected={endDate}
                    minDate={startEndDate}
                    placeholderText="To"
                    className="w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px] border-[2px] pl-[27px] rounded-[6px]"
                  />
                  {/* <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} minDate={startEndDate} dateFormat="mm/dd/yy" placeholder='To' className='w-full placeholder:text-[#667085] custm_calender md:h-[2.292vw] h-[40px]' /> */}
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
              <div className='text-[#344054] font-medium text-xs xl:text-[0.729vw]'>Funding Source</div>
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
              <div className='text-[#344054] font-medium text-xs xl:text-[0.781vw] bg-white border border-[#D0D5DD] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] cursor-pointer' onClick={() => handleClear()}>Clear</div>
              <div className='text-[#FAFBFF] font-medium text-xs xl:text-[0.781vw] bg-[#113699] border border-[#113699] rounded-lg xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[13px] flex items-center
           space-x-2 cursor-pointer'
                onClick={() => {
                  if (employee_Id === null || employee_Id === "") {
                    toast.error("Please enter Employee ID");
                    return;
                  } else if (startEndDate === null || startEndDate === "" || startEndDate == "Invalid date") {
                    toast.error("Please Select Valid From Date");
                    return;
                  } else if (endDate === null || endDate === "" || endDate == "Invalid date") {
                    toast.error("Please Select Valid To Date");
                    return;
                  } else {
                    handleEdit() //editEmployee ?// : null //handleApply()

                  }
                }}>
                <i className='gusd-check'></i><span>Apply</span></div>
            </div>
          </div>
        </div>
      </Sidebar>

    </>
  );
};

export default NewFormModal;
