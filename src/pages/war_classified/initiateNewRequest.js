import React, { Fragment, useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
const {
  API_STATUS,
  CertificatedAdminWeeklyAbsenceReportStatus,
} = require("../../helper/enum");
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { getEmployeeById } from "../../helper/actions/employeeByIdActions";
import { getSchoolById } from "../../helper/actions/schoolByIdActions";
import { InputNumber } from "primereact/inputnumber";
import { getAbsenceCodeList } from "../../helper/actions/absenceCodeListActions";
import {
  ConvertResponseForSelectWithRefCode,
  checkDuplicates,
  getResponseFromKeyCertifiedAdmin,
} from "../../helper/commonfunction";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import EmployeePopup from "@/components/common/EmployeePopup";

export default function InitiateNewReportClassified() {
  const router = useRouter();
  const { reportId } = router.query;
  const [value, setValue] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedApprover, setApproverEmployee] = useState(null);
  const [employeeList, setEmployeeList] = useState();
  const [approverList, setApproverList] = useState();
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [SelectperiodExpand, setActivate] = useState("");
  const [openNewEmployee, setOpenNewEmployee] = useState(false);
  const [periodDates, setPeriodDates] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selectedDateRecord, setSelectedDateRecord] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [indexEditMode, setIndexEditMode] = useState(false);
  const [isApply, setApply] = useState(false);
  const [isNoAbsence, setIsNoAbsence] = useState(false);
  const [comment, setComment] = useState("");
  const fullDay = "Full Day";
  const [isShowSelectedDate, setIsShowSelectedDate] = useState(false);
  const [selectedDateFinal, setSelectedDateFinal] = useState([]);
  const [selectedEmpDate, setSelectedEmpDate] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [absentCodeListDropdown, setAbsentCodeListDropdown] = useState([]);
  const [absentCodeList, setAbsenceCodeList] = useState([]);
  const [absentCode, setAbsentCode] = useState([]);
  const [showPleaseWaitButton, setPleaseWaitButton] = useState(false);
  const [skipDisable, setSkipDisable] = useState("");
  const [visible, setVisible] = useState(false);
  const [administratorData, setAdministratorData] = useState([]);
  const [CertificatedDatas, setCertificatedDatas] = useState([]);
  const existingResultsAdministrator = mappedData.filter(
    (item) =>
      item.employeeType === "Administrator" ||
      item.employeeType === "Administratoristrator" ||
      item.employeeType === "Admin"
  );


  var existingResultsCertifiedCertificated = mappedData.filter(
    (item) => item.employeeType === "Certificated"
  );

  const [isDataLoaded, setDataLoaded] = useState(false);
  const [employeeWiseMapp, setEmployeeWiseMapp] = useState("");
  const [mapDataIndex, setMapDataIndex] = useState(0);
  const [selectedDateRecordNew, setSelectedDateRecordNew] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectApprover, setSelectApprover] = useState([]);
  const [isPendingRequest, setIsPendingRequest] = useState(false);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");

  const toggleActiveexpand = () => {
    setActivate(
      SelectperiodExpand === "SelectperiodExpand" ? "" : "SelectperiodExpand"
    );
  };
  const [absentDate, setAbsentDate] = useState([]);

  const CalendarValidation = () => {
    toast.error("Please select Employee.");
  };

  //*get School List
  const getSchoolList = async (searchText) => {
    //*Get userID, Access Token from local storage
    let accessToken = window.localStorage.getItem("accessToken");

    //*Request data
    let requestedData = {
      accessToken: accessToken,
      page: 1,
      limit: 100,
      search: searchText,
    };

    try {
      const response = await axios.post("/api/common/getSchoolList", {
        requestedData,
      });
      let getSchoolListDetails = response.data;

      // if (getSchoolListDetails.responseCode === API_STATUS.SUCCESS) {
      let getSchoolListResponse = getSchoolListDetails.rows;
      let finalArray = [];
      getSchoolListResponse.map((item, index) => {
        finalArray.push({ name: item.name, code: item.id });
        if (index === getSchoolListResponse.length - 1) {
          setSchoolList(finalArray);
        }
      });
      // } else {
      //   setSchoolList([])
      // }
    } catch (err) {
      if (err.response.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  };

  const getResultsOnSearch = async (searchText, searchParameter) => {
    switch (searchParameter) {
      case "Employee":
        try {
          let accessToken = window.localStorage.getItem("accessToken");

          //*Request data
          let requestedData = {
            accessToken: accessToken,
            page: 1,
            limit: 100,
            search: searchText,
            employeeType: ["Certificated", "Administrator"],
            schoolId: selectedSchool ? parseInt(selectedSchool.code) : "",
          };

          const response = await axios.post("/api/common/getEmployeeList", {
            requestedData,
          });
          var employeeResponses = response.data;

          if (employeeResponses !== null) {
            let employee = [{ name: "No Absence", code: "1" }];

            employeeResponses.rows.map((item) => {
              let name = item.employee_code
                ? `${item.employee_name} (${item.employee_code})`
                : item.employee_name;
              let obj = {
                name: name,
                code: item.id,
                employeeType: item.employeeType,
              };
              employee.push(obj);
            });
            setEmployeeList(employee);
          }
        } catch (error) {
          if (error.response.status === API_STATUS.UNAUTHORIZED) {
            toast.error("Session Expired");
            router.push("/");
          }
        }

        break;

      case "School":
        getSchoolList(searchText);
        break;

      case "Approver":
        getApproverList(searchText);
        break;

      default:
        break;
    }
  };

  //*get AbsentCode List
  const getAllAbsentCodeList = async () => {
    //*Get userID, Access Token from local storage
    let accessToken = window.localStorage.getItem("accessToken");
    let absenceCodeList = [];
    absenceCodeList = await getAbsenceCodeList(accessToken);
    setAbsenceCodeList(absenceCodeList?.rows);

    var myArray = [];
    myArray = ConvertResponseForSelectWithRefCode(absenceCodeList?.rows);
    setAbsentCodeListDropdown(myArray);
  };

  async function EmployeeList(e) {
    let schoolId = e?.code;

    setSelectedSchool(e);
    try {
      let accessToken = window.localStorage.getItem("accessToken");

      //*Request data
      let requestedData = {
        accessToken: accessToken,
        page: 1,
        limit: 100,
        search: "",
        employeeType: ["Certificated", "Administrator"],
        schoolId: schoolId ? parseInt(schoolId) : "",
      };

      const response = await axios.post("/api/common/getEmployeeList", {
        requestedData,
      });
      var employeeResponses = response.data;

      if (employeeResponses !== null) {
        let employee = [{ name: "No Absence", code: "1" }];

        employeeResponses.rows.map((item) => {
          let name = item.employee_code
            ? `${item.employee_name} (${item.employee_code})`
            : item.employee_name;
          let obj = {
            name: name,
            code: item.id,
            employeeType: item.employeeType,
          };
          employee.push(obj);
        });
        setEmployeeList(employee);
      }
    } catch (error) {
      if (error.response.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  }

  const submitForm = async () => {

    let accessToken = window.localStorage.getItem("accessToken");
    let loggedUserId = window.localStorage.getItem("loggedUserId");
    let loggedl2authority = window.localStorage.getItem("loggedl2authority");

    if (!selectedSchool) {
      toast.error("Please Select School");
      return;
    } else if (!selectedEmployee) {
      toast.error("Please Select Employee");
      return;
    } else if (!selectedApprover) {
      toast.error("Please Select Approver");
      return;
    } else if (mappedData.length < 0) {
      toast.error("Please Select Employee Data");
      return;
    }

    if (reportId) {
      let requestedData = {
        accessToken: accessToken,
        reportId: reportId,
        fromDate: moment(periodDates[0]).format("YYYY-MM-DD"),
        toDate: moment(periodDates[1]).format("YYYY-MM-DD"),
        // This needs to be dynamic
        status: "PENDING",
        l1Authority: selectedApprover.code,
        l2Authority: loggedl2authority,
        schoolId: selectedSchool ? parseInt(selectedSchool.code) : 0,
        // "approverRemark": "remark",
        comment: comment,
        employeeId: selectedEmployee.code,
        employeeType: selectedEmployee.employeeType,
        employeeResponse: mappedData,
      };

      const response = await axios.post("/api/war_certificated/update", {
        requestedData,
      });

      if (response.status === API_STATUS.SUCCESS) {
        toast.success("Form updated successfully.");
      }

      router.push("/war_certificated");
    } else {
      let requestedData = {
        accessToken: accessToken,
        userId: loggedUserId,
        fromDate: moment(periodDates[0]).format("YYYY-MM-DD"),
        toDate: moment(periodDates[1]).format("YYYY-MM-DD"),
        // This needs to be dynamic
        status: "PENDING",
        l1Authority: selectedApprover.code,
        l2Authority: loggedl2authority,
        schoolId: selectedSchool ? parseInt(selectedSchool.code) : 0,
        // "approverRemark": "remark",
        comment: comment,
        statusDateTime: moment().toISOString(),
        employeeId: selectedEmployee.code,
        employeeType: selectedEmployee.employeeType,
        employeeResponse: mappedData,
      };

      const response = await axios.post("/api/war_certificated/create", {
        requestedData,
      });

      if (response.status === API_STATUS.SUCCESS) {
        toast.success("Form created successfully.");
      }

      router.push("/war_certificated");
    }
  };

  const getApproverList = async (searchText) => {
    try {
      let accessToken = window.localStorage.getItem("accessToken");

      //*Request data
      let requestedData = {
        accessToken: accessToken,
        page: 1,
        limit: 100,
        search: searchText,
        role: "AP",
      };

      const response = await axios.post("/api/common/getEmployeeList", {
        requestedData,
      });
      var employeeResponses = response.data;

      if (employeeResponses !== null) {
        let employee = [{ name: "No Absence", code: "1" }];

        employeeResponses.rows.map((item) => {
          let name = item.employee_code
            ? `${item.employee_name} (${item.employee_code})`
            : item.employee_name;
          let obj = {
            name: name,
            code: item.id,
          };
          employee.push(obj);
        });
        setApproverList(employee);
      }
    } catch (error) {
      if (error.response.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  };

  //*onClick Select Period
  const onClickNameOfSubstitute = (index, event) => {
    // if (reportId) {
    if (0) {
      let nameOfTheSubstitute = event.target.value;
      let data = [...mappedData];

      if (data.hasOwnProperty(mapDataIndex)) {
        let empResponse = data[mapDataIndex].employeeResponse;
        const indexExists =
          data[mapDataIndex].employeeResponse.hasOwnProperty(index);
        if (indexExists) {
          data[mapDataIndex].employeeResponse[index]["nameOfTheSubstitute"] =
            nameOfTheSubstitute;
          data[mapDataIndex].employeeResponse[index]["nameOfTheSubstituteId"] =
            null;
        } else {
          let nameOfTheSubstitute = event.target.value;
          let data = [...selectedDateRecord];
          data[index]["nameOfTheSubstitute"] = nameOfTheSubstitute;
          data[index]["nameOfTheSubstituteId"] = absentCode.code;
          setSelectedDateRecord(data);
        }
      } else {
        let nameOfTheSubstitute = event.target.value;
        let data = [...selectedDateRecord];
        data[index]["nameOfTheSubstitute"] = nameOfTheSubstitute;
        data[index]["nameOfTheSubstituteId"] = absentCode.code;
        setSelectedDateRecord(data);
      }
      setMappedData(data);
    } else {
      let nameOfTheSubstitute = event.target.value;
      let data = [...selectedDateRecord];
      data[index]["nameOfTheSubstitute"] = nameOfTheSubstitute;
      data[index]["nameOfTheSubstituteId"] = absentCode.code;
      setSelectedDateRecord(data);
    }
  };

  //*onClick Select Period
  const onClickDates = async (date) => {
    setIndexEditMode(false);
    setApply(true);

    if (isNoAbsence) {
      setApply(false);
    }

    if (reportId) {
      //
      if (date.length === 0) {
        setApply(false);
        setSelectedDateRecord(selectedDateFinal);
      }
    } else {
      setSelectedDateRecord([]);
    }

    date = date.sort((a, b) => new Date(a) - new Date(b));

    setIsShowSelectedDate(true);
    let newResponse = [];
    let finald = [...selectedDateFinal];
    let selEmpDate = [];
    let selfinaldate = [...selectedEmpDate];
    let selDate = [];
    let checkSelEmp = [];
    //finald = finald.filter(item => item.partialHour !== null)
    //for (let k = 0; k < selectedDateRecord.length; k++) {
    //selDate.push(selectedDateRecord[k].selectedDate);
    // if(seldatefinal[k].partialHour && seldatefinal[k].partialHour !== null){

    // }
    //}

    let finalMapp = [...mappedData];
    for (let k = 0; k < finalMapp.length; k++) {
      checkSelEmp.push(finalMapp[k].employeeId);
      for (let j = 0; j < finalMapp[k].employeeResponse.length; j++) {
        selDate.push(finalMapp[k].employeeResponse[j].selectedDate);
      }
    }

    // let empName = await DataStore.query(Employee, (c) => c.id.eq(selectedEmployee.code));
    let accessToken = window.localStorage.getItem("accessToken");
    let empName = await getEmployeeById(selectedEmployee.code, accessToken);
    if (reportId) {
      for (let i = 0; i < date.length; i++) {
        selEmpDate[i] = date[i];
        if (!selDate.includes(date[i])) {
          let data = {
            employeeName: selectedEmployee?.name,
            selectedDate: date[i],
            displayDate: date[i],
            absentCode: { name: "", code: "" },
            absentId: "",
            employeeType: empName?.employeeType,
            nameOfTheSubstitute: "",
            partialHour: "",
            partialMin: "",
            isFullDay: false,
          };
          newResponse.push(data);
        } //else{ selfinaldate = selectedEmpDate.filter(item => item !== date[i])}

        if (i === date.length - 1) {
          const newdata = [...finald, ...newResponse];

          setSelectedDateRecord(newdata);
        }
      }
      let updatedList = [...selfinaldate, ...selEmpDate];
      setSelectedEmpDate(updatedList);
    } else {
      for (let i = 0; i < date.length; i++) {
        let data = {
          employeeName: selectedEmployee?.name,
          selectedDate: date[i],
          displayDate: date[i],
          absentCode: { name: "", code: "" },
          absentId: "",
          employeeType: empName?.employeeType,
          nameOfTheSubstitute: "",
          partialHour: "",
          partialMin: "",
          isFullDay: false,
        };
        newResponse.push(data);
        selEmpDate[i] = date[i];
        if (i === date.length - 1) {
          setSelectedDateRecord(newResponse);
        }
      }
    }

    if (reportId) {
      const findI = mappedData.findIndex(
        (item) => item.employeeId === selectedEmployee.code
      );
      //allow apply in case of new employee
      let selDataR = [...selectedDateRecord];
      if (findI === -1) {
        setEmployeeWiseMapp(0);
      }
    }
  };

  //All state clear
  const stateClear = () => {
    setAbsentDate([]);
  };

  //Create  Initiate New Report
  const applyReport = async () => {
    setDisabled(true);
    setIndexEditMode(false);
    for (var vl = 0; vl < selectedDateRecord.length; vl++) {
      if (
        selectedDateRecord[vl].absentId === "" ||
        selectedDateRecord[vl].absentId === null
      ) {
        toast.error("Please select Absent code.");
        return;
      }

      if (!selectedDateRecord[vl].isFullDay) {
        if (
          (selectedDateRecord[vl].partialHour === "" ||
            selectedDateRecord[vl].partialHour === 0 ||
            selectedDateRecord[vl].partialHour === null) &&
          (selectedDateRecord[vl].partialMin === "" ||
            selectedDateRecord[vl].partialMin === 0 ||
            selectedDateRecord[vl].partialMin === null)
        ) {
          toast.error("Please select Total hours.");
          return;
        }
      }
    }

    if (
      selectedSchool !== null &&
      selectedEmployee !== null &&
      periodDates.length > 0 &&
      selectedDateRecord[0].partialHour !== null
    ) {
      //*set data to table
      if (mappedData.length > 0) {
        let data = selectedDateRecord;
        let getEmployeeNames = data.map((item) => item.employeeName);
        let removeDuplicateArray = checkDuplicates(getEmployeeNames);

        let getResponse = await getResponseFromKeyCertifiedAdmin(
          data,
          removeDuplicateArray,
          selectedEmployee.code,
          selectedDateRecord[0].employeeType
        );
        let object = getResponse[0];

        let myArray = [...mappedData, object];
        if (reportId) {
          // let updatedData = mappedData.filter(item => item.employeeId !== selectedEmployee.code);
          let updatedData = mappedData;
          let object2 = [];
          let getAll = getResponse.map((item) => item.employeeResponse);

          //sort by dates
          getResponse = getResponse.sort((a, b) => {
            const dateA = new Date(a.employeeResponse[0].selectedDate);
            const dateB = new Date(b.employeeResponse[0].selectedDate);
            return dateA - dateB;
          });

          object2 = getResponse;
          myArray = [...updatedData, ...object2];

          //apply hide
          setApply(false);
        }

        myArray = myArray.sort((a, b) => {
          const dateA = new Date(a.employeeResponse[0].selectedDate);
          const dateB = new Date(b.employeeResponse[0].selectedDate);
          return dateA - dateB;
        });

        const groupedData = myArray.reduce((acc, obj) => {
          const existingObj = acc.find(
            (item) => item.employeeId === obj.employeeId
          );
          if (existingObj) {
            existingObj.employeeResponse.push(...obj.employeeResponse);
          } else {
            acc.push(obj);
          }
          return acc;
        }, []);
        //sort by the employeename
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

        setMappedData(sortedArray);

        //setMappcount
        let innerArrayLength = 0;
        let mapArry = myArray.filter(
          (item) => item.employeeId === selectedEmployee.code
        );
        for (var key in mapArry) {
          innerArrayLength =
            innerArrayLength + mapArry[key].employeeResponse.length;
        }

        setEmployeeWiseMapp(innerArrayLength);

        //setSelectedDateRecord([]);
      } else {
        let data = selectedDateRecord;

        let getEmployeeNames = data.map((item) => item.employeeName);
        let removeDuplicateArray = checkDuplicates(getEmployeeNames);
        const getResponse = await getResponseFromKeyCertifiedAdmin(
          data,
          removeDuplicateArray,
          selectedEmployee.code,
          selectedDateRecord[0].employeeType
        );

        const groupedData = getResponse.reduce((acc, obj) => {
          const existingObj = acc.find(
            (item) => item.employeeId === obj.employeeId
          );
          if (existingObj) {
            existingObj.employeeResponse.push(...obj.employeeResponse);
          } else {
            acc.push(obj);
          }
          return acc;
        }, []);

        //sort by the employeename
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

        setMappedData(sortedArray);
      }

      if (reportId) {
        //
        // setSelectedDateFinal(selectedDateRecord)
      } else {
        setSelectedDateRecord([]);
      }

      let updated1 = [];
      if (skipDisable.length > 0) {
        updated1 = [...skipDisable, selectedEmployee.code];
      } else {
        updated1.push(selectedEmployee.code);
      }

      //disable date
      let datesArray = [];
      let finalDate = [];
      for (let i = 0; i < selectedDateRecord.length; i++) {
        datesArray[i] = selectedDateRecord[i].selectedDate;
      }
      finalDate[selectedEmployee.code] = datesArray;
      setSkipDisable(datesArray);
      //let date
      let updatedList = [];

      if (skipDisable.length > 0) {
        let y = 0;
        for (var key in disabledDates) {
          y = y + 1;
          if (key === selectedEmployee.code) {
            updatedList[key] = [...disabledDates[key], ...finalDate[key]];
          } else {
            updatedList[key] = disabledDates[key];
            updatedList[selectedEmployee.code] = datesArray;
          }
        }
      } else {
        updatedList = finalDate;
      }
      setDisabledDates(updatedList);
      setVisible(true);
      stateClear();
    } else {
      toast.error("Select mandatory fields.");
      if (reportId) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  };

  //*onClick Houre
  const onClickHoure = (index, value) => {
    value = value === null ? 0 : value;
    // if (reportId) {
    if (0) {
      let data = [...mappedData];
      if (data.hasOwnProperty(mapDataIndex)) {
        const indexExists =
          data[mapDataIndex].employeeResponse.hasOwnProperty(index);
        if (indexExists) {
          data[mapDataIndex].employeeResponse[index]["partialHour"] = value;
        } else {
          let data = [...selectedDateRecord];
          data[index]["partialHour"] = value;
          setSelectedDateRecord(data);
        }
        setMappedData(data);
      } else {
        let data = [...selectedDateRecord];
        data[index]["partialHour"] = value;
        setSelectedDateRecord(data);
      }
    } else {
      let data = [...selectedDateRecord];
      data[index]["partialHour"] = value;
      setSelectedDateRecord(data);
    }
  };

  //*onClick Min
  const onClickMin = (index, value) => {
    value = value === null ? 0 : value;
    // if (reportId) {
    if (0) {
      let data = [...mappedData];

      if (data.hasOwnProperty(mapDataIndex)) {
        const indexExists =
          data[mapDataIndex].employeeResponse.hasOwnProperty(index);
        if (indexExists) {
          data[mapDataIndex].employeeResponse[index]["partialMin"] = value;
        } else {
          let data = [...selectedDateRecord];
          data[index]["partialMin"] = value;
          setSelectedDateRecord(data);
        }
        setMappedData(data);
      } else {
        let data = [...selectedDateRecord];
        data[index]["partialMin"] = value;
        setSelectedDateRecord(data);
      }
    } else {
      let data = [...selectedDateRecord];
      data[index]["partialMin"] = value;
      setSelectedDateRecord(data);
    }
  };

  const setFlagToFullDay = (index, e) => {
    let checked = e.target.checked;

    if (reportId) {
      let data = [...mappedData];

      if (data.hasOwnProperty(mapDataIndex)) {
        const indexExists =
          data[mapDataIndex].employeeResponse.hasOwnProperty(index);
        if (indexExists) {
          data[mapDataIndex].employeeResponse[index]["isFullDay"] = checked;
        } else {
          let data = [...selectedDateRecord];
          data[index]["isFullDay"] = checked;
          setSelectedDateRecord(data);
        }
        setMappedData(data);
      } else {
        let data = [...selectedDateRecord];
        data[index]["isFullDay"] = checked;
        setSelectedDateRecord(data);
      }
    } else {
      let data = [...selectedDateRecord];
      data[index]["isFullDay"] = checked;
      setSelectedDateRecord(data);
    }

    if (e.target.checked) {
      onClickHoure(index, 0);
      onClickMin(index, 0);
    }
  };

  //*onClick Select Period
  const onClickAbsentCode = (index, event) => {
    let absentCode = event.target.value;
    // if (reportId) {
    if (0) {
      let data = [...mappedData];
      if (data.hasOwnProperty(mapDataIndex)) {
        const indexExists =
          data[mapDataIndex].employeeResponse.hasOwnProperty(index);
        if (indexExists) {
          data[mapDataIndex].employeeResponse[index].absentCode = absentCode;
          data[mapDataIndex].employeeResponse[index].absentId = absentCode.code;
        } else {
          let data = [...selectedDateRecord];
          data[index]["absentCode"] = absentCode;
          data[index]["absentId"] = absentCode.code;
          setSelectedDateRecord(data);

          // let obj = {
          // "absentCode": absentCode,
          // "absentId": absentCode.code
          // }
          // data[mapDataIndex].employeeResponse.push(obj)
        }
      } else {
        let data = [...selectedDateRecord];
        data[index]["absentCode"] = absentCode;
        data[index]["absentId"] = absentCode.code;
        setSelectedDateRecord(data);
      }

      setMappedData(data);
    } else {
      let data = [...selectedDateRecord];
      data[index]["absentCode"] = absentCode;
      data[index]["absentId"] = absentCode.code;
      setSelectedDateRecord(data);
    }
  };

  //*get Existing Data
  const getData = async () => {
    let accessToken = window.localStorage.getItem("accessToken");
    let requestedData = {
      accessToken: accessToken,
      reportId: reportId,
    };
    try {
      setVisible(true);
      setDisabled(true);

      var getAbsenceReport = await axios.post(
        "/api/war_certificated/getReportById",
        { requestedData }
      );

      if (getAbsenceReport.data) {
        let approverEmployee = await getEmployeeById(
          getAbsenceReport.data.l1Authority,
          accessToken
        );
        let empObj = {
          name: (
            approverEmployee.employee_name.toString() +
            " (" +
            approverEmployee.employee_code +
            ")"
          ).toString(),
          code: approverEmployee.id.toString(),
        };
        setApproverEmployee(empObj);

        if (getAbsenceReport.data.l1Authority) {
          let empName = await getEmployeeById(
            getAbsenceReport.data.l1Authority,
            accessToken
          );

          let name = empName.employee_code
            ? `${empName.employee_name} (${empName.employee_code})`
            : empName.employee_name;

          let objFirst = {
            name: name,
            code: getAbsenceReport.data.l1Authority,
          };
          setSelectApprover(objFirst);
        }

        if (getAbsenceReport.data.status === "OPEN") {
          setIsPendingRequest(true);
        }

        let to_date = new Date(
          moment(getAbsenceReport.data.to_date).format(
            "ddd MMM D YYYY HH:mm:ss [GMT]ZZ (z)"
          )
        );
        let from_date = new Date(
          moment(getAbsenceReport.data.from_date).format(
            "ddd MMM D YYYY HH:mm:ss [GMT]ZZ (z)"
          )
        );

        // setApproverStatus(getAbsenceReport.approver_status)
        let dateArray = [from_date, to_date];
        setPeriodDates(dateArray);

        var getAbsenceReportOfEmployee = await getSchoolById(
          getAbsenceReport.data.schoolId,
          accessToken
        );

        setSelectedSchool({
          name: getAbsenceReportOfEmployee.name,
          code: getAbsenceReportOfEmployee.id,
        });

        let schoolObj = {
          name: getAbsenceReportOfEmployee.name,
          code: getAbsenceReportOfEmployee.id,
        };
        EmployeeList(schoolObj);
      }

      if (getAbsenceReport.data.formEmployeeDetails) {
        var getAbsenceReportOfEmployee =
          getAbsenceReport.data.formEmployeeDetails;

        let newResponse = [];
        let dataRec = [];
        let checkEmployee = [];
        let selectdate = [];
        let newEmp = "";

        let remarkNew = "";
        let statusNew = "";
        if (
          getAbsenceReport.data.payrollStatus !== null &&
          getAbsenceReport.data.payrollStatus ===
            CertificatedAdminWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED
        ) {
          statusNew = "Approved";
          remarkNew = "";
        } else if (
          getAbsenceReport.data.payrollStatus !== null &&
          getAbsenceReport.data.payrollStatus ===
            CertificatedAdminWeeklyAbsenceReportStatus.PAYROLL_REJECTED
        ) {
          statusNew = "Rejected";
          remarkNew = getAbsenceReport.data.payrollRemark;
        } else if (
          getAbsenceReport.data.approverStatus !== null &&
          getAbsenceReport.data.approverStatus ===
            CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED
        ) {
          statusNew = "Approved";
          remarkNew = "";
        } else if (
          getAbsenceReport.data.approverStatus !== null &&
          getAbsenceReport.data.approverStatus ===
            CertificatedAdminWeeklyAbsenceReportStatus.APPROVAL_REJECTED
        ) {
          statusNew = "Rejected";
          remarkNew = getAbsenceReport.data.approverRemark;
        } else if (
          getAbsenceReport.data.payrollStatus === null &&
          getAbsenceReport.data.approverStatus === null &&
          getAbsenceReport.data.status ===
            CertificatedAdminWeeklyAbsenceReportStatus.SUBMITTED
        ) {
          statusNew = "Submitted";
          remarkNew = "";
        } else if (
          getAbsenceReport.data.payrollStatus === null &&
          getAbsenceReport.data.approverStatus === null &&
          getAbsenceReport.data.status ===
            CertificatedAdminWeeklyAbsenceReportStatus.OPEN
        ) {
          statusNew = "Pending";
          remarkNew = "";
        }

        setStatus(statusNew);
        setRemark(remarkNew);
        setComment(getAbsenceReport.comment);

        if (getAbsenceReportOfEmployee.length === 0) {
          setSelectedEmployee({
            name: "No Absence",
            code: "1",
            employeeType: "",
          });
          setIsNoAbsence(true);
        } else {
          setIsNoAbsence(false);
        }

        for (var i = 0; i < getAbsenceReportOfEmployee.length; i++) {
          let employeeResponse =
            getAbsenceReportOfEmployee[i].employeeCalendarDetails;

          // for(var j=0; j<getAbsenceReportOfEmployee[i].employeeCalendarDetails.length; j++){
          // }

          // let employeeResponse = await getEmployeeDetails(getAbsenceReportOfEmployee[i].id, getAbsenceReportOfEmployee[i].employee_id);

          employeeResponse.map(
            (item) =>
              (item.selectedDate = new Date(
                moment(item.selectedDate).format(
                  "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
                )
              ))
          );

          employeeResponse = [...employeeResponse].sort(
            (a, b) => new Date(a.selectedDate) - new Date(b.selectedDate)
          );

          for (let s = 0; s < employeeResponse.length; s++) {
            if (
              employeeResponse[s].partialMin === null ||
              employeeResponse[s].partialMin === "Nan"
            ) {
              employeeResponse[s].partialMin = 0;
            }
          }


          let empName = await getEmployeeById(
            getAbsenceReportOfEmployee[i].employeeId,
            accessToken
          );

          // if (!checkEmployee.includes(empName.id)) {
          //   checkEmployee[i] = getAbsenceReportOfEmployee[i].employee_id
          // }

          let data = [];
          if (empName) {
            let obj1 = {
              name:
                empName.employee_name + " " + "(" + empName.employee_code + ")",
              code: empName.id,
              employeeType: empName.employeeType,
            };

            setSelectedEmployee(obj1);
            newEmp = empName.id;
          }
          data = {
            employeeName: empName.employee_name,
            employeeId: getAbsenceReportOfEmployee[i].employeeId,
            employeeResponse: employeeResponse,
            employeeType: getAbsenceReportOfEmployee[i].employeeType,
          };

          let updatedate = [];
          dataRec = [];

          if (newResponse.length > 0) {
            newResponse = [...newResponse, data];
          } else {
            newResponse.push(data);
          }

          let newdate = [];
          if (i === getAbsenceReportOfEmployee.length - 1) {
            const groupedData = newResponse.reduce((acc, obj) => {
              const existingObj = acc.find(
                (item) => item.employeeId === obj.employeeId
              );
              if (existingObj) {
                existingObj.employeeResponse.push(...obj.employeeResponse);
              } else {
                acc.push(obj);
              }
              return acc;
            }, []);

            // let newR = newResponse.filter(abc => abc.employeeId === getAbsenceReportOfEmployee[i].employeeId)
            let newR = newResponse;
            let countR = 0;
            for (let key in newR) {
              if (newR[key] && newR[key].employeeResponse) {
                for (var k = 0; k < newR[key].employeeResponse.length; k++) {
                  newR[key].employeeResponse[k].partialMin = isNaN(
                    newR[key].employeeResponse[k].partialMin
                  )
                    ? 0
                    : newR[key].employeeResponse[k].partialMin;
                  dataRec[countR] = newR[key].employeeResponse[k];
                  dataRec[countR].nameOfTheSubstitute =
                    dataRec[countR].substituteEmpId;
                  dataRec[countR].absentCode = {
                    name: `${newR[key].employeeResponse[k].absentCodeDetails.n} (${newR[key].employeeResponse[k].absentCodeDetails.c})`,
                    code: newR[key].employeeResponse[k].absentCodeDetails.i,
                  };
                  setSelectedItem(newR[key].employeeResponse[k].selectedDate);
                  selectdate.push(newR[key].employeeResponse[k].selectedDate);
                  updatedate[countR] =
                    newR[key].employeeResponse[k].selectedDate;
                  //updName[countR] = newR[key].employeeResponse[k].employeeName
                  setSelectedName(newR[key].employeeResponse[k].employeeName);
                  countR = countR + 1;
                }
              }
            }

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

            let administratorData = sortedArray.filter(
              (item) => item.employeeType === "Administrator"
            );
            let certificatedData = sortedArray.filter(
              (item) => item.employeeType === "Certificated"
            );


            setAdministratorData(administratorData);
            setCertificatedDatas(certificatedData);
            setMappedData(sortedArray);
            setSelectedDateRecord(dataRec);
            setMapDataIndex(newResponse.length - 1);
            setSelectedDateFinal(dataRec);
            setSelectedDateRecordNew(dataRec);
            if (newEmp) {
              newdate[newEmp] = updatedate;
            }
            setDisabledDates(newdate);
            setVisible(true);
          }
        }

        let updatedList = [...selectedEmpDate, ...selectdate];
        setSelectedEmpDate(updatedList);
      }
    } catch (e) {
    }
  };

  const getMasterData = async () => {
    setDataLoaded(false);
    getSchoolList();
    getApproverList("");
    getAllAbsentCodeList();
    setDataLoaded(true);
  };

  useEffect(() => {
    if (isDataLoaded === true) {
      if (reportId) {
        // getEditData()
        getData();
      }
      // getModuleId(topicId, categoryId, requestReceiveFromList[0].name)
      // }, [topicId, categoryId]);
    }
  }, [isDataLoaded]);

  // const onClickRemove = (index, detailIndex, detail, item) => {

  //   // Function to remove an element by index without modifying the original array
  //   function removeElementByIndex(array, index) {
  //     if (index >= 0 && index < array.length) {
  //       return array.slice(0, index).concat(array.slice(index + 1));
  //     }
  //     return array.slice(); // return a copy if the index is out of bounds
  //   }

  //   // Example: Remove element at index 2 without modifying the original array
  //   let newArray = removeElementByIndex(mappedData, detailIndex);

  //   setMappedData(newArray);


  // }

  //onclick remove container details
  const onClickRemove = (index, detailIndex, detail, item) => {
    let data = [...mappedData];
    let selData = [...selectedDateRecord];
    setIndexEditMode(false);

    setSelectedDateRecordNew([]);
    //set disabledates

    var indexofdate = disabledDates.indexOf(detail.selectedDate);
    let newDates = disabledDates.splice(indexofdate);
    let updateDate = [];
    if (
      disabledDates[item.employeeId] &&
      disabledDates[item.employeeId].length
    ) {
      let newDisabele = disabledDates[item.employeeId].filter(
        (item) => item !== detail.selectedDate
      );
      for (var key in disabledDates) {
        if (key === item.employeeId) {
          //newDisabele = disabledDates[item.employeeId].filter(item => item !== detail.selectedDate)
          newDisabele[key] = disabledDates[item.employeeId].filter(
            (item) => item !== detail.selectedDate
          );
        } else {
          newDisabele[key] = disabledDates[key];
        }
      }

      updateDate = newDisabele;
    }

    setDisabledDates(updateDate);

    if (data[index].employeeResponse.length === 1) {
      data.splice(index, 1);
      setMappedData(data);
      selData.splice(index, 1);
      setSelectedDateRecord(selData);
    } else {
      data[index].employeeResponse.splice(detailIndex, 1);
      setMappedData(data);
      selData.splice(index, 1);
      setSelectedDateRecord(selData);
    }

    //change when employee delete and selected
    if (reportId) {
      if (updateDate.length === 0) {
        //getDataOnChange(selectedEmployee.code)
        setSelectedDateRecord([]);
      }
    }
  };

  useEffect(() => {
    getMasterData();
  }, []);

  return (
    <>
      <Layout pageTitle="Initiate Report">
        <div className="report-wrapper pt-24 md:pt-28 xl:pt-[2.083vw] mb-10">
          <div className="">
            <div className="text-[#113699] font-semibold -tracking-[0.02em] text-xl xl:text-[1.042vw]">
              <h3>Initiate New Report</h3>
            </div>
            <div className="mt-5 xl:mt-[1.250vw]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.833vw] cust-select">
                <div className="w-full">
                  <label
                    htmlFor="dept"
                    className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                  >
                    Name of School or Department{" "}
                    <span className="text-[red] pl-0.2">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                      <i className="gusd-employee text-[#667085] text-sm"></i>
                    </div>
                    <Dropdown
                      id="dept"
                      value={selectedSchool}
                      onChange={(e) => {
                        EmployeeList(e.value);
                      }}
                      onKeyUp={(e) => {
                        getResultsOnSearch(e.target.value, "School");
                      }}
                      filter
                      showClear
                      options={schoolList}
                      optionLabel="name"
                      placeholder="Select"
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
                      showClear
                      optionLabel="name"
                      onChange={(e) => {
                        setSelectedEmployee(e.value);
                      }}
                      onKeyUp={(e) => {
                        getResultsOnSearch(e.target.value, "Employee");
                      }}
                      placeholder="Select"
                      filterPlaceholder="Search"
                      className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                      style={{
                        fontSize: "0.875rem",
                        color: "#667085",
                        fontWeight: "400",
                      }}
                      // filterElement={employeeFilterTemplate}
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
                  setOpenNewEmployee={setOpenNewEmployee}
                  selectedSchool={selectedSchool}
                  setEmployeeList={setEmployeeList}
                  setSelectedEmployee={setSelectedEmployee}
                  onHide={() => {
                    setOpenNewEmployee(false);
                  }}
                />
                <div className="w-full">
                  <label
                    htmlFor="employee"
                    className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                  >
                    Name of the Approver{" "}
                    <span className="text-[red] pl-0.2">*</span>
                  </label>
                  <div className="relative flex">
                    <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                      <i className="gusd-employee text-[#667085] text-sm"></i>
                    </div>
                    <Dropdown
                      id="employee"
                      value={selectedApprover}
                      options={approverList}
                      onChange={(e) => {
                        setApproverEmployee(e.value);
                      }}
                      onKeyUp={(e) => {
                        getResultsOnSearch(e.target.value, "Approver");
                      }}
                      filter
                      showClear
                      optionLabel="name"
                      placeholder="Select"
                      className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                      style={{
                        fontSize: "0.875rem",
                        color: "#667085",
                        fontWeight: "400",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full ">
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
                      <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                        <i className="gusd-calendar text-[#667085] text-sm"></i>
                      </div>
                      <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                      <div className="card justify-content-center">
                        {selectedEmployee === null && !reportId ? (
                          <div onClick={() => CalendarValidation()}>
                            <Calendar
                              disabled={true}
                              placeholder="Date Range"
                              selectionMode="multiple"
                              className="w-full h-11"
                            />
                          </div>
                        ) : (
                          <Calendar
                            onChange={(e) => {
                              setPeriodDates(null);

                              setSelectedDateRecord([]);
                              setAbsentDate([]);
                              //setPeriodDates(e.value)
                              const nextMinDate = new Date(e.value);
                              //const nextMaxDate = new Date(e.value);
                              const timeZone =
                                Intl.DateTimeFormat().resolvedOptions()
                                  .timeZone;
                              let nextMaxDate = nextMinDate;
                              let dayNumber = moment(nextMinDate).day(); //nextMinDate.getDay()
                              // if(timeZone !== 'Asia/Calcutta'){
                              // dayNumber = dayNumber -1
                              // }

                              if (dayNumber === 0 || dayNumber === 6) {
                                setPeriodDates([]);
                                toast.error(
                                  "Please do not select Saturday or Sunday."
                                );
                                return;
                              }

                              let newDate = nextMinDate;
                              let nextDate = nextMinDate.getDate();
                              nextMinDate.setDate(
                                nextMinDate.getDate() - (dayNumber - 2)
                              );
                              let from = new Date(
                                moment(nextMinDate).format("YYYY-MM-DD")
                              );
                              nextMaxDate.setDate(nextMinDate.getDate() + 4);
                              //let from = new Date(moment(nextMinDate).format("YYYY-MM-DD"));
                              let to = new Date(
                                moment(nextMaxDate).format("YYYY-MM-DD")
                              );
                              let dateArray = [from, to];
                              setPeriodDates(dateArray);
                              //setMinDate(newDate);
                              //nextMaxDate.setDate(nextMinDate.getDate() + 4);
                              //setMinDate(nextMinDate);
                              //setMaxDate(nextMaxDate);
                            }}
                            value={periodDates}
                            minDate={minDate}
                            maxDate={maxDate}
                            disabled={disabled}
                            placeholder="Date Range"
                            selectionMode="range"
                            className="w-full h-11"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 xl:mt-[1.094vw] pb-10 ">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-[1.250vw]">
                <div className="col-span-12 lg:col-span-8">
                  <div
                    id={SelectperiodExpand}
                    className="box-shadow-1 bg-white"
                  >
                    <div className="flex justify-between items-center p-4 xl:p-[0.833vw]">
                      <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                        <p>Select Period</p>
                      </div>
                      <div className="">
                        <Button
                          href={"/"}
                          onClick={toggleActiveexpand}
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
                    <div className="custmCalendar p-4 xl:p-[0.833vw]">
                      <Calendar
                        value={absentDate}
                        onChange={(e) => {
                          if (reportId) {
                            if (selectedEmployee === null) {
                              toast.error("Please Select Employee");
                              return;
                            } else {
                              onClickDates(e.value);
                              setAbsentDate(e.value);
                            }
                          } else {
                            onClickDates(e.value);
                            setAbsentDate(e.value);
                          }
                        }}
                        minDate={
                          new Date(moment(periodDates[0]).format("YYYY,M,DD"))
                        }
                        maxDate={
                          new Date(moment(periodDates[1]).format("YYYY,M,DD"))
                        }
                        inline
                        disabledDates={
                          selectedEmployee && selectedEmployee.code
                            ? disabledDates[selectedEmployee.code]
                            : ""
                        }
                        selectionMode="multiple"
                      />
                    </div>
                  </div>
                  <div className="mt-6 xl:mt-[1.250vw]">
                    {administratorData.length !== 0 ||
                    existingResultsAdministrator.length !== 0 ? (
                      <>
                        <div className="p-4 xl:p-[0.833vw] pb-0">
                          <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                            <p>Preview - Administrator</p>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="bg-white box-shadow-1">
                      <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable overflow-auto">
                        <div>
                          {visible && (
                            <Paper>
                              <Table>
                                <TableHead>
                                  {administratorData.length !== 0 ||
                                  existingResultsAdministrator.length !== 0 ? (
                                    <TableRow>
                                      <TableCell>Name of Employee</TableCell>
                                      <TableCell>Dates Absent</TableCell>
                                      <TableCell>Absent Codes</TableCell>
                                      <TableCell>Total Hours</TableCell>
                                      <TableCell>Name of Substitute</TableCell>
                                      <TableCell>Action</TableCell>
                                    </TableRow>
                                  ) : null}
                                </TableHead>

                                <TableBody>
                                  {(administratorData.length !== 0
                                    ? administratorData
                                    : existingResultsAdministrator
                                  ).map((item, i) => (
                                    <Fragment>
                                      {administratorData.length !== 0 ||
                                      existingResultsAdministrator.length !==
                                        0 ? (
                                        <TableRow>
                                          <TableCell
                                            rowSpan={
                                              item.employeeResponse.length + 1
                                            }
                                          >
                                            {/* {(reportId) ?
                                                  <Link className=' show default overflow-hidden truncate w-5 underline text-blue-600 hover:text-blue-800 visited:text-purple-600 ' onClick={() => {
                                                    onClickUpdateFollow(i, item)
                                                  }}> {item.employeeName}</Link> : item.employeeName
                                                } */}
                                            {item.employeeName}
                                          </TableCell>
                                        </TableRow>
                                      ) : null}

                                      {item.employeeResponse.map(
                                        (detail, detailIndex) => (
                                          <TableRow>
                                            <TableCell>
                                              {moment(detail.absentDate).format(
                                                "MM/DD/YYYY"
                                              )}
                                            </TableCell>

                                            <TableCell>
                                              {detail.absentCode.name}
                                            </TableCell>
                                            {detail.isFullDay ? (
                                              <TableCell>{fullDay}</TableCell>
                                            ) : (
                                              <TableCell>
                                                {detail.partialHour ===
                                                  null + "." &&
                                                Number(detail.partialMin / 60)
                                                  .toFixed(2)
                                                  .slice(-2)
                                                  .padStart(2, "0") +
                                                  " hr" ===
                                                  null
                                                  ? "-"
                                                  : detail.partialHour + "." !==
                                                      null &&
                                                    Number(
                                                      detail.partialMin / 60
                                                    )
                                                      .toFixed(2)
                                                      .slice(-2)
                                                      .padStart(2, "0") === null
                                                  ? detail.partialHour
                                                  : detail.partialHour + "." ===
                                                      null &&
                                                    Number(
                                                      detail.partialMin / 60
                                                    )
                                                      .toFixed(2)
                                                      .slice(-2)
                                                      .padStart(2, "0") +
                                                      " hr" !==
                                                      null
                                                  ? Number(
                                                      detail.partialMin / 60
                                                    )
                                                      .toFixed(2)
                                                      .slice(-2)
                                                      .padStart(2, "0") + "min"
                                                  : detail.partialHour +
                                                    "." +
                                                    Number(
                                                      detail.partialMin / 60
                                                    )
                                                      .toFixed(2)
                                                      .slice(-2)
                                                      .padStart(2, "0") +
                                                    " hr"}
                                              </TableCell>
                                            )}

                                            <TableCell>
                                              {detail.nameOfTheSubstitute}
                                            </TableCell>
                                            <TableCell>
                                              <a
                                                className="pi pi-trash ml-3"
                                                onClick={() => {
                                                  onClickRemove(
                                                    i,
                                                    detailIndex,
                                                    detail,
                                                    item
                                                  );
                                                }}
                                              ></a>
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </Fragment>
                                  ))}
                                </TableBody>
                              </Table>
                            </Paper>
                          )}
                        </div>
                      </div>
                    </div>

                    {CertificatedDatas.length !== 0 ||
                    existingResultsCertifiedCertificated.length !== 0 ? (
                      <>
                        <div className="p-4 xl:p-[0.833vw] pb-0">
                          <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                            <p>Preview - Certificated</p>
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="bg-white box-shadow-1">
                      <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable overflow-auto">
                        {visible && (
                          <Paper>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Name of Employee</TableCell>
                                  <TableCell>Dates Absent</TableCell>
                                  <TableCell>Absent Codes</TableCell>
                                  <TableCell>Total Hours</TableCell>
                                  <TableCell>Name of Substitute</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {(CertificatedDatas.length !== 0
                                  ? CertificatedDatas
                                  : existingResultsCertifiedCertificated
                                ).map((item, i) => (
                                  <Fragment>
                                    <TableRow>
                                      <TableCell
                                        rowSpan={
                                          item.employeeResponse.length + 1
                                        }
                                      >
                                        {/* {(reportId) ?
                                          <Link className=' show default overflow-hidden truncate w-5 underline text-blue-600 hover:text-blue-800 visited:text-purple-600 ' onClick={() => {
                                            onClickUpdateFollow(i, item)
                                          }}> {item.employeeName}</Link> : item.employeeName
                                        } */}
                                        {item.employeeName}
                                      </TableCell>
                                    </TableRow>
                                    {item.employeeResponse.map(
                                      (detail, detailIndex) => (
                                        <TableRow>
                                          <TableCell>
                                            {moment(detail.absentDate).format(
                                              "MM/DD/YYYY"
                                            )}
                                          </TableCell>

                                          <TableCell>
                                            {detail.absentCode.name}
                                          </TableCell>

                                          {detail.isFullDay ? (
                                            <TableCell>{fullDay}</TableCell>
                                          ) : (
                                            <TableCell>
                                              {detail.partialHour ===
                                                null + "." &&
                                              Number(detail.partialMin / 60)
                                                .toFixed(2)
                                                .slice(-2)
                                                .padStart(2, "0") +
                                                " hr" ===
                                                null
                                                ? "-"
                                                : detail.partialHour + "." !==
                                                    null &&
                                                  Number(detail.partialMin / 60)
                                                    .toFixed(2)
                                                    .slice(-2)
                                                    .padStart(2, "0") === null
                                                ? detail.partialHour
                                                : detail.partialHour + "." ===
                                                    null &&
                                                  Number(detail.partialMin / 60)
                                                    .toFixed(2)
                                                    .slice(-2)
                                                    .padStart(2, "0") +
                                                    " hr" !==
                                                    null
                                                ? Number(detail.partialMin / 60)
                                                    .toFixed(2)
                                                    .slice(-2)
                                                    .padStart(2, "0") + "min"
                                                : detail.partialHour +
                                                  "." +
                                                  Number(detail.partialMin / 60)
                                                    .toFixed(2)
                                                    .slice(-2)
                                                    .padStart(2, "0") +
                                                  " hr"}
                                            </TableCell>
                                          )}

                                          <TableCell>
                                            {detail.nameOfTheSubstitute}
                                          </TableCell>
                                          <TableCell>
                                            <a
                                              className="pi pi-trash ml-3"
                                              onClick={() => {
                                                onClickRemove(
                                                  i,
                                                  detailIndex,
                                                  detail,
                                                  item
                                                );
                                              }}
                                            ></a>
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          </Paper>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-6 xl:mt-[1.250vw]">
                    <div className="bg-white box-shadow-1">
                      <div className="p-4 xl:p-[0.833vw] pb-0">
                        <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                          <p>Preview</p>
                        </div>
                      </div>
                      <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable">
                        <DataTable tableStyle={{ width: '100%' }}>
                          <Column field="code" header="Name of Employee"></Column>
                          <Column field="name" header="Dates Absent"></Column>
                          <Column field="category" header="Absent Codes"></Column>
                          <Column field="quantity" header="Total Hours"></Column>
                          <Column field="quantity" header="Name of Substitute"></Column>
                          <Column field="quantity" header="Action"></Column>
                        </DataTable>
                      </div>
                    </div>
                  </div> */}

                  <div className=" mt-10  flex flex-wrap xl:flex-nowrap gap-4 mt-5 xl:gap-[0.938vw] xl:mt-[1.250vw] w-full">
                    <h3 className="text-[#113699]  py-4 font-semibold -tracking-[0.02em] text-xl xl:text-[1.042vw]">
                      Comment
                    </h3>

                    <textarea
                      placeholder=""
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="4"
                      cols="50"
                      type="text"
                      className=" text-[#344054] text-[16px] a rounded-lg disabled bg-[#fff] flex-1 appearance-none border border-[#D0D5DD]  py-2 px-4 bg-grey text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#8E8E8E]"
                    ></textarea>
                  </div>
                  <div className="mt-[1.250vw]">
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="">
                        <Link
                          className="text-[#344054] text-xs xl:text-[0.938vw] font-medium bg-white inline-block border border-[#D0D5DD] rounded xl:rounded-lg py-[0.833vw] px-[2.917vw] box-shadow-2"
                          href="/war_certificated"
                        >
                          <i className="mr-1 gusd-arrow-line-right"></i>Back
                        </Link>
                      </div>
                      <div className="space-x-4">
                        <button className="font-medium inline-block text-[#FFFFFF] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#113699] border border-[#F2F4F7]">
                          <i className="mr-3 gusd-print-outline"></i>Print
                        </button>
                        <Link
                          className="font-medium inline-block text-[#2D5BE5] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#EFF8FF] border border-[#D0D5DD]"
                          href="#"
                        ><i className="pi pi-save mr-1" style={{ fontSize: '1rem' }}></i>
                          Save
                        </Link>
                        <Link
                          className="font-medium inline-block text-[#FFFFFF] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#113699] border border-[#F2F4F7]"
                          href="#"
                          onClick={() => {
                            submitForm();
                          }}
                        >
                          Submit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <div className="bg-white box-shadow-1 p-4 rounded-lg xl:p-[0.833vw]">
                    <div className="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                      <p>Selected Dates</p>
                    </div>
                    {indexEditMode && selectedItem
                      ? selectedDateRecordNew.length &&
                        selectedDateRecordNew.map((currentItem, i) => {
                          return (
                            <>
                              <div key={i}>
                                <div className="mt-[24px] xl:mt-[1.250vw]">
                                  <div className="text-[#344054] font-normal text-xs xl:text-[0.625vw] flex flex-wrap items-center justify-between lg:flex-nowrap">
                                    <p className="w-full lg:w-[7.813vw] text-[11px] font-bold">
                                      {moment(currentItem.displayDate).format(
                                        "D MMMM YYYY"
                                      )}
                                    </p>
                                    <span className="w-full h-[1px] bg-[#E4E7EC] inline-block"></span>
                                  </div>
                                </div>
                                <div className="mt-[16px] xl:mt-[0.833vw]">
                                  <div className="bg-[#F2F4F7] rounded p-2 xl:p-[0.417vw] custseledate">
                                    <div className="w-full">
                                      <label
                                        htmlFor="username"
                                        className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                      >
                                        Absent Code{" "}
                                        <span className="text-[red] pl-0.2">
                                          *
                                        </span>
                                      </label>
                                      <Dropdown
                                        value={currentItem.absentCode}
                                        onChange={(e) => {
                                          onClickAbsentCode(i, e);
                                        }}
                                        options={absentCodeListDropdown}
                                        filter
                                        optionLabel="name"
                                        placeholder="Select an Absent Code"
                                        className="w-full h-7 absent"
                                      />
                                    </div>

                                    <div className="w-full">
                                      <label
                                        htmlFor="substitute"
                                        className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                      >
                                        Name of the Substitute1{" "}
                                      </label>

                                      <InputText
                                        id="substitute"
                                        value={
                                          currentItem.nameOfTheSubstitute
                                            ? currentItem.nameOfTheSubstitute
                                            : ""
                                        }
                                        onChange={(e) =>
                                          onClickNameOfSubstitute(i, e)
                                        }
                                        placeholder="Name of Substitute"
                                        className="w-full h-7 rounded-md border border-[#E4E7EC] "
                                        style={{
                                          fontSize: "0.875rem",
                                          color: "#667085",
                                          fontWeight: "400",
                                        }}
                                      />

                                      {/*<Dropdown value={currentItem.nameOfTheSubstitute} onChange={(e) => onClickNameOfSubstitute(i, e)} options={updatedEmpList}
                                                                            filter
																		optionLabel="name" placeholder="Select a Substitute" className="w-full h-7" /> */}
                                    </div>

                                    <div className="p-[8px] mt-[5px] xl:mt-[0.380vw] xl:p-[0.417vw]">
                                      <div className="flex flex-wrap gap-3">
                                        {
                                          <div className="">
                                            <label
                                              htmlFor="username"
                                              className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                            >
                                              Total Hours
                                              <span className="text-[red] ">
                                                *
                                              </span>
                                            </label>
                                            <div className="flex">
                                              <div className="relative custinput-h">
                                                <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC]">
                                                  <p>H</p>
                                                </div>
                                                <InputNumber
                                                  value={
                                                    currentItem.partialHour
                                                  }
                                                  maxLength={1}
                                                  max="8"
                                                  disabled={
                                                    currentItem.isFullDay
                                                      ? true
                                                      : false
                                                  }
                                                  onValueChange={(e) => {
                                                    onClickHoure(
                                                      i,
                                                      e.target.value
                                                    );
                                                  }}
                                                  className="bg-[#ffffff00] h-[1.35rem]"
                                                />
                                              </div>

                                              <div className="relative custinput-m">
                                                <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC] rounded-br-[5px] rounded-tr-[5px]">
                                                  <p>M</p>
                                                </div>
                                                <InputNumber
                                                  value={
                                                    isNaN(
                                                      currentItem.partialMin
                                                    )
                                                      ? 0
                                                      : currentItem.partialMin
                                                  }
                                                  onValueChange={(e) => {
                                                    onClickMin(
                                                      i,
                                                      e.target.value
                                                    );
                                                  }}
                                                  maxLength={2}
                                                  max="59"
                                                  disabled={
                                                    currentItem.partialHour ===
                                                      8 ||
                                                    currentItem.partialHour ===
                                                      "8" ||
                                                    currentItem.isFullDay
                                                      ? true
                                                      : false
                                                  }
                                                  className="bg-[#ffffff00] h-[1.35rem]"
                                                />
                                              </div>

                                              <div className="ml-5 w-full">
                                                <input
                                                  type="checkbox"
                                                  check
                                                  id={i}
                                                  value={currentItem.isFullDay}
                                                  checked={
                                                    currentItem.isFullDay
                                                  }
                                                  onChange={(e) => {
                                                    setFlagToFullDay(i, e);
                                                  }}
                                                  className="checkbox mt-2"
                                                />

                                                <label
                                                  htmlFor="substitute"
                                                  className="text-[#344054] text-xs xl:text-[0.833vw] font-semibold -tracking-[0.02em]"
                                                >
                                                  {" "}
                                                  Full day
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      : selectedDateRecord.map((currentItem, i) => {
                          return (
                            <>
                              <div key={i}>
                                <div className="mt-[24px] xl:mt-[1.250vw]">
                                  <div className="text-[#344054] font-normal text-xs xl:text-[0.625vw] flex flex-wrap items-center justify-between lg:flex-nowrap">
                                    <p className="w-full lg:w-[7.813vw] text-[11px] font-bold">
                                      {moment(currentItem.displayDate).format(
                                        "D MMMM YYYY"
                                      )}
                                    </p>
                                    <span className="w-full h-[1px] bg-[#E4E7EC] inline-block"></span>
                                  </div>
                                </div>
                                <div className="mt-[16px] xl:mt-[0.833vw]">
                                  <div className="bg-[#F2F4F7] rounded p-2 xl:p-[0.417vw] custseledate">
                                    <div className="w-full">
                                      <label
                                        htmlFor="username"
                                        className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                      >
                                        Absent Code{" "}
                                        <span className="text-[red] pl-0.2">
                                          *
                                        </span>
                                      </label>
                                      <Dropdown
                                        value={currentItem.absentCode}
                                        onChange={(e) => {
                                          onClickAbsentCode(i, e);
                                        }}
                                        options={absentCodeListDropdown}
                                        filter
                                        optionLabel="name"
                                        placeholder="Select an Absent Code"
                                        className="w-full h-7 absent"
                                      />
                                    </div>

                                    <div className="w-full">
                                      <label
                                        htmlFor="substitute"
                                        className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                      >
                                        Name of the Substitute{" "}
                                      </label>

                                      <InputText
                                        id="substitute"
                                        value={
                                          currentItem.nameOfTheSubstitute
                                            ? currentItem.nameOfTheSubstitute
                                            : ""
                                        }
                                        onChange={(e) =>
                                          onClickNameOfSubstitute(i, e)
                                        }
                                        placeholder="Name of Substitute"
                                        className="w-full h-7 rounded-md border border-[#E4E7EC] "
                                        style={{
                                          fontSize: "0.875rem",
                                          color: "#667085",
                                          fontWeight: "400",
                                        }}
                                      />

                                      {/*<Dropdown value={currentItem.nameOfTheSubstitute} onChange={(e) => onClickNameOfSubstitute(i, e)} options={updatedEmpList}
                                                                            filter
																		optionLabel="name" placeholder="Select a Substitute" className="w-full h-7" /> */}
                                    </div>

                                    <div className="p-[8px] mt-[5px] xl:mt-[0.380vw] xl:p-[0.417vw]">
                                      <div className="flex flex-wrap gap-3">
                                        {
                                          <div className="">
                                            <label
                                              htmlFor="username"
                                              className="text-[#344054] text-xs xl:text-[0.625vw] font-semibold -tracking-[0.02em]"
                                            >
                                              Total Hours
                                              <span className="text-[red] ">
                                                *
                                              </span>
                                            </label>
                                            <div className="flex">
                                              <div className="relative custinput-h">
                                                <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC]">
                                                  <p>H</p>
                                                </div>
                                                <InputNumber
                                                  value={
                                                    currentItem.partialHour
                                                  }
                                                  maxLength={1}
                                                  max="8"
                                                  disabled={
                                                    currentItem.isFullDay
                                                      ? true
                                                      : false
                                                  }
                                                  onValueChange={(e) => {
                                                    onClickHoure(
                                                      i,
                                                      e.target.value
                                                    );
                                                  }}
                                                  className="bg-[#ffffff00] h-[1.35rem]"
                                                />
                                              </div>

                                              <div className="relative custinput-m">
                                                <div className="bg-[#F2F4F7] flex items-center justify-center absolute right-[0rem] top-[0.1rem] text-[0.75rem] font-normal text-[#818C95] w-[1.563rem] h-[1.35rem] border border-[#E4E7EC] rounded-br-[5px] rounded-tr-[5px]">
                                                  <p>M</p>
                                                </div>
                                                <InputNumber
                                                  value={
                                                    isNaN(
                                                      currentItem.partialMin
                                                    )
                                                      ? 0
                                                      : currentItem.partialMin
                                                  }
                                                  onValueChange={(e) => {
                                                    onClickMin(
                                                      i,
                                                      e.target.value
                                                    );
                                                  }}
                                                  maxLength={2}
                                                  max="59"
                                                  disabled={
                                                    currentItem.partialHour ===
                                                      8 ||
                                                    currentItem.partialHour ===
                                                      "8" ||
                                                    currentItem.isFullDay
                                                      ? true
                                                      : false
                                                  }
                                                  className="bg-[#ffffff00] h-[1.35rem]"
                                                />
                                              </div>

                                              <div className="ml-5 w-full">
                                                <input
                                                  type="checkbox"
                                                  check
                                                  id={i}
                                                  value={currentItem.isFullDay}
                                                  checked={
                                                    currentItem.isFullDay
                                                  }
                                                  onChange={(e) => {
                                                    setFlagToFullDay(i, e);
                                                  }}
                                                  className="checkbox mt-2"
                                                />

                                                <label
                                                  htmlFor="substitute"
                                                  className="text-[#344054] text-xs xl:text-[0.833vw] font-semibold -tracking-[0.02em]"
                                                >
                                                  {" "}
                                                  Full day
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                  </div>
                  {selectedDateRecord >= 0 ? null : isApply ? (
                    <div className="custbutn mt-6 xl:mt-[1.250vw]">
                      <Button
                        className=""
                        label={
                          showPleaseWaitButton ? "Please wait..." : "Apply"
                        }
                        disabled={
                          reportId &&
                          selectedDateRecord.length === employeeWiseMapp
                            ? false
                            : false
                        }
                        onClick={() => {
                          applyReport();
                        }}
                      ></Button>
                    </div>
                  ) : null}

                  <div className="bg-white box-shadow-1 p-4 mt-6 rounded-lg xl:p-[0.833vw] xl:mt-[1.250vw]">
                    <div className="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                      <p>Absence Codes - Legends</p>
                    </div>
                    <div className="flex flex-wrap xl:flex-nowrap gap-4 mt-5 xl:gap-[0.938vw] xl:mt-[1.250vw]">
                      <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                        {absentCodeList?.length > 0 &&
                          absentCodeList.slice(0, 7).map((item, index) => {
                            return (
                              <>
                                <p>
                                  {item.code} -{" "}
                                  <span className="font-normal">
                                    {item.name}
                                  </span>
                                </p>
                              </>
                            );
                          })}
                      </div>

                      <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                        {absentCodeList?.length > 0 &&
                          absentCodeList.slice(7, 14).map((item, index) => {
                            return (
                              <>
                                <p>
                                  {item.code} -{" "}
                                  <span className="font-normal">
                                    {item.name}
                                  </span>
                                </p>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
