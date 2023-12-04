import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/layout';
import WARCertificatedReports from '@/pages/war_certificated/reports';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Link from 'next/link';
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import EyePopup from '@/components/popups/eyePopup';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { CertificatedAdminWeeklyAbsenceReportStatus } from '../../../helper/enum'
import moment from "moment";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import { API_STATUS, Apps } from '../../../helper/enum'
import { getEmployeeById } from "../../../helper/actions/employeeByIdActions";
import { getSchoolById } from "../../../helper/actions/schoolByIdActions";
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel, TabView } from 'primereact/tabview';
// import { employeeByCognitoIdActions } from '../../helper/actions/employeeByCognitoIdActions'
import { employeeByCognitoIdActions } from '../../../helper/actions/employeeByCognitoIdActions'
import { AllStatusData } from '@/components/helper/enum';
import { getTimeline } from '../../../helper/actions/getTimeline'



export default function Index() {
  const router = useRouter();
  const handle = useFullScreenHandle();
  const [visible, setVisible] = useState(false);
  const [isMasterDataLoaded, setIsMasterDataLoaded] = useState(false);
  const [weeklyAbsenceReports, setWeeklyAbsenceReports] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [count, setCount] = useState(0);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });
  const [onPageNumber, setOnPageNumber] = useState();
  const [rows, setRows] = useState(10)
  const [schoolFilterValue, setSchoolFilter] = useState('');
  const [weekFilterValue, setWeekFilter] = useState('');
  const [submittedFilterVlaue, setSubmittedFilter] = useState('');
  const [statusFilterValue, setStatusFilter] = useState('')
  const [activeIndex, setActiveIndex] = useState(0);

  //State's for EYEPOPUP
  const [schoolName, setSchoolName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [comment, setComment] = useState("");
  const [employeeReports, setEmployeeReports] = useState([]);
  const [administratorData, setAdministratorData] = useState([]);
  const [CertificatedDatas, setCertificatedDatas] = useState([]);
  const [events, setEvents] = useState([])
  const [isEdit, setIsEdit] = useState(true);
  const [camundaProcessId, setCamundaProcessId] = useState('');
  const [reportId, setReportId] = useState('');

  const populatePopup = async (rowData) => {
    if (rowData.status === AllStatusData.PENDING_FOR_APPROVAL) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setReportId(rowData.id);
    setCamundaProcessId(rowData.camundaProcessTaskId)
    setStatus(rowData.status)

    let accessToken = window.localStorage.getItem('accessToken');
    let requestedData = {
      "accessToken": accessToken,
      "reportId": rowData.id
    }
    let eventsData = [];
    let initiateDateTime;
    let approverDateTime;
    let payrollDateTime;

    try {

      var getAbsenceReport = await axios.post("/api/war_certificated/getReportById", { requestedData });

      console.log('getAbsenceReport', getAbsenceReport);


      initiateDateTime = moment(getAbsenceReport.data.createdAt).format('MM/DD/YYYY HH:mm ');
      approverDateTime = moment(getAbsenceReport.data.approverDateTime).format('MM/DD/YYYY HH:mm ');
      payrollDateTime = moment(getAbsenceReport.data.payrollDateTime).format('MM/DD/YYYY HH:mm ');


      if (getAbsenceReport.data) {

        if (getAbsenceReport.data.userId) {
          let empName = await employeeByCognitoIdActions(getAbsenceReport.data.userId, accessToken);


          let name = empName.employee_code ? `${empName.employee_name} (${empName.employee_code})` : empName.employee_name;
          console.log('name', name);


          setSubmittedBy(name)
          let eventsTimeline = await getTimeline(getAbsenceReport.data.camundaProcessInstanceId, accessToken)
          eventsTimeline = eventsTimeline.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log('eventsTimeline', eventsTimeline);
          for (var i = 0; i < eventsTimeline.length; i++) {
            let obj = {};

            obj.date = moment(eventsTimeline[i].date).format('MM/DD/YYYY HH:mm')
            obj.name = eventsTimeline[i].assignee
            obj.empTitle = eventsTimeline[i].role
            obj.status = eventsTimeline[i].status

            eventsData.push(obj);

          }

          setEvents(eventsData);


        }

        if (getAbsenceReport.data.l1Authority) {

          let empName = await employeeByCognitoIdActions(getAbsenceReport.data.l1Authority, accessToken);

          let name = empName.employee_code ? `${empName.employee_name} (${empName.employee_code})` : empName.employee_name;
          console.log("empName", name);

          setApprovedBy(name)

        }

        if (getAbsenceReport.data.l2Authority) {

          let empName = await employeeByCognitoIdActions(getAbsenceReport.data.l1Authority, accessToken);

          let payrollname = empName.employee_code ? `${empName.employee_name} (${empName.employee_code})` : empName.employee_name;

   
        }




        let to_date = moment(getAbsenceReport.data.toDate).format("YYYY-MM-DD");
        setToDate(to_date)
        let from_date = moment(getAbsenceReport.data.fromDate).format("YYYY-MM-DD");
        setFromDate(from_date)

        var getAbsenceReportOfEmployee = await getSchoolById(getAbsenceReport.data.schoolId, accessToken);

        setSchoolName(getAbsenceReportOfEmployee.name)
      }

      if (getAbsenceReport.data.formEmployeeDetails) {


        var getAbsenceReportOfEmployee = getAbsenceReport.data.formEmployeeDetails;
        console.log("getAbsenceReportOfEmployee", getAbsenceReportOfEmployee);

        let newResponse = [];
        let dataRec = [];
        let selectdate = []
        let newEmp = '';


        setComment(getAbsenceReport.data.comment)

        for (var i = 0; i < getAbsenceReportOfEmployee.length; i++) {

          let employeeResponse = getAbsenceReportOfEmployee[i].employeeCalendarDetails;

          console.log("employeeResponse", employeeResponse)
          employeeResponse.map((item) => item.selectedDate = new Date(moment(item.selectedDate).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")))


          employeeResponse = [...employeeResponse].sort((a, b) => new Date(a.selectedDate) - new Date(b.selectedDate));

          for (let s = 0; s < employeeResponse.length; s++) {
            if (employeeResponse[s].partialMin === null || employeeResponse[s].partialMin === "Nan") {
              employeeResponse[s].partialMin = 0
            }
          }

          console.log("employeeResponse", employeeResponse);

          let empName = await employeeByCognitoIdActions(getAbsenceReportOfEmployee[i].employeeId, accessToken);

          let data = []
          if (empName) {
            let obj1 = {
              "name": (empName.employee_name + ' ' + '(' + empName.employee_code + ')'),
              "code": empName.id,
              "employeeType": empName.employeeType
            }


            console.log("empName", empName)
            console.log("setSelectedEmployee", obj1)
            // setSelectedEmployee(obj1);
            newEmp = empName.id;

          }
          data = {
            "employeeName": empName.employee_name,
            "employeeId": getAbsenceReportOfEmployee[i].employeeId,
            "employeeResponse": employeeResponse,
            "employeeType": getAbsenceReportOfEmployee[i].employeeType,
          }

          let updatedate = [];
          dataRec = []

          if (newResponse.length > 0) {
            newResponse = [...newResponse, data];
          } else {
            newResponse.push(data)
          }

          let newdate = [];
          if (i === getAbsenceReportOfEmployee.length - 1) {
            console.log("newResponse", newResponse)
            const groupedData = newResponse.reduce((acc, obj) => {
              const existingObj = acc.find(item => item.employeeId === obj.employeeId);
              if (existingObj) { existingObj.employeeResponse.push(...obj.employeeResponse); }
              else { acc.push(obj); }
              return acc;
            }, []);


            let newR = newResponse;
            console.log("gettttting", getAbsenceReportOfEmployee[i].employeeId);
            console.log("newR", newR);
            let countR = 0
            for (let key in newR) {
              if (newR[key] && newR[key].employeeResponse) {
                for (var k = 0; k < newR[key].employeeResponse.length; k++) {
                  newR[key].employeeResponse[k].partialMin = isNaN(newR[key].employeeResponse[k].partialMin) ? 0 : newR[key].employeeResponse[k].partialMin;
                  dataRec[countR] = newR[key].employeeResponse[k]
                  dataRec[countR].nameOfTheSubstitute = dataRec[countR].substituteEmpId
                  dataRec[countR].absentCode = { name: `${newR[key].employeeResponse[k].absentCodeDetails.n} (${newR[key].employeeResponse[k].absentCodeDetails.t})`, "code": newR[key].employeeResponse[k].absentCodeDetails.i }
                  selectdate.push(newR[key].employeeResponse[k].selectedDate)
                  updatedate[countR] = newR[key].employeeResponse[k].selectedDate
                  countR = countR + 1
                }
              }
            }

            console.log("groupedData", groupedData);
            const sortedArray = groupedData.slice().sort((a, b) => {
              const nameA = a.employeeName.toLowerCase();
              const nameB = b.employeeName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });



            let administratorData = sortedArray.filter(item => item.employeeType === 'Administrator');
            let certificatedData = sortedArray.filter(item => item.employeeType === 'Certificated');



            setAdministratorData(administratorData)
            setCertificatedDatas(certificatedData)
          }
        }
      }
    } catch (e) {
      console.log("error", e)
    }

    setVisible(true);
  }

  const superAdminActions = (rowData) => {
    console.log('rowData.status', rowData.status)
    return (
      <>
        <div className="flex justify-center w-full gap-2">
          {
            rowData.status === AllStatusData.PENDING_FOR_APPROVAL ?
              <Link
                href="#"
                className="py-2 px-2.5"
                // onClick={() => { setVisible(true) }}
                onClick={() => { populatePopup(rowData) }}
              >
                <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
              </Link> :
              <Link
                href="#"
                className="py-2 px-2.5"
                // onClick={() => { setVisible(true) }}
                onClick={() => { populatePopup(rowData) }}
              >
                <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
              </Link>
          }
        </div>
      </>
    );
  };


  const getSeverity = (status) => {
    switch (status) {
      case AllStatusData.PENDING:
        return 'warning';

      case AllStatusData.SUBMITTED:
        return 'info';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.REVIEWED_AND_RESUBMITTED:
        return 'warning';

      case AllStatusData.APPROVED:
        return 'warning';

      case AllStatusData.REJECTED:
        return 'danger';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.PENDING_FOR_APPROVAL:
        return 'warning'

      case AllStatusData.PENDING_FOR_ACKNOWLEDGEMENT:
        return 'warning'

      default:
        return null;
    }
  };

  const [statuses] = useState([AllStatusData.APPROVED, AllStatusData.PENDING, AllStatusData.REJECTED, AllStatusData.SUBMITTED, AllStatusData.REVIEWED_AND_RESUBMITTED]);


  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={statusFilterValue} options={statuses}
        // onChange={(e) => {options.filterApplyCallback(e.value)}}
        onChange={(e) => { setStatusFilter(e.value) }}
        itemTemplate={statusItemTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
    );

  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };



  const loadAbsenceReport = async (pageNumber, row) => {

    console.log('calling load absense report')
    const accessToken = reactLocalStorage.get('accessToken');
    const loggedUserId = reactLocalStorage.get('loggedUserId');

    let formResponses = [];
    var weeklyAbsenceReport = formResponses;
    // weeklyAbsenceReport = weeklyAbsenceReport.sort((b, a) => a.statusDateTime.localeCompare(b.statusDateTime));

    let requestedData = {
      "accessToken": accessToken,
      "page": pageNumber,
      "limit": row,
      "userType": "AP",
      "searchStatus": statusFilterValue,
      "searchWeekDuration": weekFilterValue,
      "searchSchool": schoolFilterValue,
      "searchSubmittedOn": submittedFilterVlaue,
      "loggedUserId": loggedUserId,
    }
    try {
      const response = await axios.post("/api/war_certificated/war_certificated_listing", { requestedData });
      weeklyAbsenceReport = response.data.rows;
      console.log('weeklyAbsenceReport', weeklyAbsenceReport);
      const weeklyAbsenceReportCount = response.data.count
      setCount(weeklyAbsenceReportCount)
      // console.log('weeklyAbsenceReportCount', weeklyAbsenceReportCount);
    }
    catch (err) {
      console.log("err----" + err.response.status)
    }

    let newResponse = [];
    if (weeklyAbsenceReport.length > 0) {
      for (let i = 0; i < weeklyAbsenceReport.length; i++) {
        let schoolName = "";
        let workDuration = "";
        let submittedOn = "";
        let status = "";
        let remark = "";

        //*Work Duration
        if (weeklyAbsenceReport[i].fromDate && weeklyAbsenceReport[i].toDate) {
          let fromDate = moment(weeklyAbsenceReport[i].fromDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
          let toDate = moment(weeklyAbsenceReport[i].toDate, 'YYYY-MM-DD').format("MM/DD/YYYY");
          workDuration = fromDate + " - " + toDate
        }
        else { workDuration = "-" }

        //*submitted On
        if (weeklyAbsenceReport[i].statusDateTime !== null && weeklyAbsenceReport[i].statusDateTime !== undefined) {
          // submittedOn = weeklyAbsenceReport[i].statusDateTime !== null ? moment(weeklyAbsenceReport[i].statusDateTime).format("MM/DD/YYYY") : "-";

          submittedOn = weeklyAbsenceReport[i].statusDateTime;
        } else { submittedOn = "-" }


        // //*School Name
        if (weeklyAbsenceReport[i].schoolId !== null && weeklyAbsenceReport[i].schoolId !== undefined) {
          // var schoolResponses = await DataStore.query(Schools, (c) => c.id.eq(weeklyAbsenceReport[i].schoolId));
          var schoolResponses = schoolList.find(o => o.code === weeklyAbsenceReport[i].schoolId)
          if (schoolResponses) { schoolName = schoolResponses.name; } else { schoolName = ""; }
          // if (schoolResponses) { schoolName = schoolResponses.name; } else { schoolName = ""; }
        } else { schoolName = ""; }


        if (weeklyAbsenceReport[i].status === AllStatusData.APPROVED) {
          status = AllStatusData.APPROVED; remark = "-";
        }
        else if (weeklyAbsenceReport[i].status === AllStatusData.REJECTED) {
          status = AllStatusData.REJECTED; remark = "-";
        }
        else if (weeklyAbsenceReport[i].status === AllStatusData.CLOSED) {
          status = AllStatusData.CLOSED; remark = "-";
        }
        else if (weeklyAbsenceReport[i].status === AllStatusData.SUBMITTED) {
          status = AllStatusData.PENDING_FOR_APPROVAL; remark = "-";
        }
        else if (weeklyAbsenceReport[i].status === AllStatusData.REVIEWED_AND_RESUBMITTED) {
          status = AllStatusData.PENDING_FOR_APPROVAL; remark = "-";
        }


        newResponse.push({
          "id": weeklyAbsenceReport[i].id,
          "userId": weeklyAbsenceReport[i].userId, "status": status, "schoolId": weeklyAbsenceReport[i].schoolId, "fromDate": weeklyAbsenceReport[i].fromDate,
          "toDate": weeklyAbsenceReport[i].toDate, "statusDateTime": weeklyAbsenceReport[i].statusDateTime, "approverStatus": weeklyAbsenceReport[i].approverStatus, "approver_by": weeklyAbsenceReport[i].approver_by, "approver_remark": weeklyAbsenceReport[i].approver_remark, "approver_date_time": weeklyAbsenceReport[i].approver_date_time,
          "payrollStatus": weeklyAbsenceReport[i].payrollStatus, "payroll_by": weeklyAbsenceReport[i].payroll_by, "payroll_date_time": weeklyAbsenceReport[i].payroll_date_time, "payroll_remark": weeklyAbsenceReport[i].payroll_remark !== null ? weeklyAbsenceReport[i].payroll_remark : "-",
          "schoolName": schoolName, "workDuration": workDuration, "submittedOn": submittedOn, "remark": remark && remark.length > 20 ? remark.substring(0, 20) + "..." : remark, "createdAt": weeklyAbsenceReport[i].createdAt, "updatedAt": weeklyAbsenceReport[i].updatedAt,
          "comment": weeklyAbsenceReport[i].comment,
          "customUpdatedAt": weeklyAbsenceReport[i].customUpdatedAt,
          "camundaProcessTaskId": weeklyAbsenceReport[i].camundaProcessTaskId

        })

        if (i === weeklyAbsenceReport.length - 1) {
          console.log("mmmm");
          let weeklyAbsenceReportForInitiator = newResponse;

          const sortedData = [...weeklyAbsenceReportForInitiator].sort((a, b) => new Date(b.statusDateTime) - new Date(a.statusDateTime));

          setWeeklyAbsenceReports(sortedData)
          console.log('sortedData', sortedData)

        }

      }

    } else {
      setWeeklyAbsenceReports([])
    }

    setIsListLoaded(true)
  }

  const [pageNo, setPageNo] = useState(1);
  const onPage = (event) => {
    setPageNo(event.page + 1)
    setlazyState(event)
    loadAbsenceReport(event.page + 1, event.rows);
    setRows(event.rows)
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    // console.log("value",value)
  };

  const BindList = async () => {
    loadAbsenceReport(1, rows);
  }

  const getMasterData = async () => {

    setIsMasterDataLoaded(false);
    const accessToken = reactLocalStorage.get('accessToken');
    const loggedUserId = reactLocalStorage.get('loggedUserId');

    var requestedData = {
      "accessToken": accessToken,
      "page": 1,
      "limit": 100
    }

    try {
      const response = await axios.post("/api/common/getSchoolList", { requestedData });
      let getSchoolListDetails = response.data

      let getSchoolListResponse = getSchoolListDetails.rows
      let finalArray = [];
      getSchoolListResponse.map((item, index) => {
        finalArray.push({ "name": item.name, "code": item.id })
        if (index === getSchoolListResponse.length - 1) {
          setSchoolList(finalArray)
        }
      })
    }
    catch (err) {
      console.log("err----" + err)
      if (err.response.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push('/')
      }
    }

    setIsMasterDataLoaded(true)
  }

  useEffect(() => {
    // onLoad();
    getMasterData();
    // MyAccountTable.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
  }, []);

  useEffect(() => {
    if (isMasterDataLoaded === true) {
      BindList();
    }
  }, [isMasterDataLoaded]);

  useEffect(() => {
    try {
      loadAbsenceReport(pageNo, rows);
    } catch (error) {
      console.log('error', error);
    }
  }, [schoolFilterValue, weekFilterValue, submittedFilterVlaue, statusFilterValue]);


  return (
    <>
      <Layout pageTitle="WAR Certificated-Admin" activeMenu="Initiator">
        <div className='report-wrapper pt-24 md:pt-28 xl:pt-[2.083vw] mb-10'>
          <FullScreen handle={handle}>
            <WARCertificatedReports weeklyAbsenceReports={weeklyAbsenceReports} isListLoaded={isListLoaded} onPage={onPage} count={count} weekFilterValue={weekFilterValue} schoolFilterValue={schoolFilterValue} submittedFilterVlaue={submittedFilterVlaue} statusFilterValue={statusFilterValue} setWeekFilter={setWeekFilter} setSchoolFilter={setSchoolFilter} setSubmittedFilter={setSubmittedFilter} setStatusFilter={setStatusFilter} reportType='Requested Reports' lazyState={lazyState} rows={rows} activeIndex={1} superAdminActions={superAdminActions}></WARCertificatedReports>
          </FullScreen>
        </div>
        <EyePopup
          visible={visible}
          onHide={() => { setVisible(false) }}
          schoolName={schoolName}
          fromDate={fromDate}
          toDate={toDate}
          status={status}
          approvedBy={approvedBy}
          submittedBy={submittedBy}
          comment={comment}
          administratorData={administratorData}
          CertificatedDatas={CertificatedDatas}
          events={events}
          adminReportLoading={true}
          taskId={camundaProcessId}
          reportId={reportId}
          edit={isEdit}
          userRole={'AP'}
          bindList={BindList}
        />
      </Layout>

    </>

  );
}
