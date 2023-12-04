import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
// const { API_STATUS } = require("../../helper/enum");
import { useRouter } from "next/router";
//  import Employeepopup from "@/components/common/Employeepopup";
// import { Link } from 'react-router-dom';
import DropdownComponent from '../../components/common/dropdownComponent/dropdownComponent';
import CalenderComponet from '../../components/common/calenderComponent/calenderComponent';
import InputComponent from '../../components/common/inputComponent/inputComponent'
import EmployeePopup from '@/components/common/EmployeePopup';
import { toast } from 'react-toastify';
import { API_STATUS } from '../../helper/enum';

export default function BasicInfo({ setActiveIndex, activeIndex }) {
    const router = useRouter();
    const [requestPayload, setRequestPayload] = useState({
        assignmentTitle: '',
        employeeId: null,
        assighmentAt: null,
        fromDate: null,
        toDate: null,
        subjectArea: null,
        totalStaffingAllocation: null,
        accountCharged: null,
        currentFteUtilized: null,
        submittedBy: '',
        submittedAt: '',
        createdBy: '',
        particularEmpReportingManager: null,
        budgetClerkId: null,
        budgetManagerId: null,
        hrDirectorI: null,
        payrollId: 'bd6e717c-568a-4728-85eb-5d8689a11b88', //Remove this static once we get payroll data and replace 
        editable: true,
        updatedAt: '',
        createdAt: '',
        modifiedFromDate: '',
        modifiedToDate: '',
    })
    const [validateFieldList, setValidateFieldList] = useState(['employeeId', 'assighmentAt','fromDate', 'toDate', 'particularEmpReportingManager', 'hrDirectorI', 'payrollId'])
    const [error, seterror] = useState({
        employeeId: {error: true, message: "Please Select Employee"},
        assighmentAt: {error: true, message: "Please Select Assignment"},
        fromDate: {error: true, message: "Please Enter From Date"},
        toDate: {error: true, message: "Please Enter To Date"},
        particularEmpReportingManager: {error: true, message: "Please Select Site Admin"},
        hrDirectorI: {error: true, message: "Please Select HR Director"},
        payrollId: {error: false, message: "Please Select HR Technician"},

    })

    const [disableFieldData,setDisableFieldData] = useState({pId: '', employeeName: ''})
    const [openNewEmployee, setOpenNewEmployee] = useState(false);
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
        const day = (date.getDate() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${month}/${day}/${year}`;
      }

    const calenderchangeHandler = (e) => {
            const {name, value} = e.target;
            if(name == 'fromDate'){
                const updatedValue = formatDate(value.toISOString().slice(0,10))
                setRequestPayload({...requestPayload, toDate: '',modifiedFromDate: updatedValue, [name]: value})

            }else{
                const updatedValue = formatDate(value.toISOString().slice(0,10))
                setRequestPayload({...requestPayload,modifiedToDate: updatedValue, [name]: value})
            }
            if(value){
                if(name == 'fromDate'){
                    seterror({...error, [name]: {...error[name], error: false}, toDate: {error: true, message: 'Please Enter To Date'}})
                }else{
                    seterror({...error, [name]: {...error[name], error: false}})
                }
            }else{
                seterror({...error, [name]: {...error[name], error: true}})
            }
        }
    
    const [employeeList, setEmployeeList] = useState();
    const [approverList, setApproverList] = useState();

    
    const [schoolList, setSchoolList] = useState([]);

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

    //School List API
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
        if (err?.response?.status === API_STATUS.UNAUTHORIZED) {
          toast.error("Session Expired");
          router.push("/");
        }
      }
    };

    useEffect(() => {
      getShoolListData();
      getEmployeeListData();
    }, []);


    const setDisableFieldsData = (value) => {
        const getEmployee = employeeList.find((item) => {
            return item.id == value
        })

        if(getEmployee){
            const pId = getEmployee.employee_code;
            const employeeName = getEmployee.employee_name

            setDisableFieldData({pId: pId,employeeName: employeeName})
        }else{
            setDisableFieldData({pId: '',employeeName: ''})
        }
    }

    const checkIsNeedToBeDisable = () => {
        const budgetClerkValue = requestPayload['budgetClerkId']
        if(budgetClerkValue && budgetClerkValue.length > 0){
            return false
        }
        return true;
    }
    //Dropdown attriutes
    const commonList = {
        options: employeeList,
        className: 'md:w-[21rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] mr-2',
    }

    const EmployeeDropdown = {
        placeholder: 'Select an Employee',
        name: 'employeeId',
        isClearable: true,
        ...commonList
    };

    const SchoolDropdown = {
        options:schoolList,
        placeholder: 'Select School',
        name: 'assighmentAt',
        isClearable: true,
        className: 'md:w-[33.3rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085]'
    };

    const ClerkDropdown = {
        options:approverList,
        placeholder: 'Select a Budget Clerk',
        className: 'w-full md:w-14rem',
        isClearable: true,
        name: 'budgetClerkId'
    };

    const AdmindeptheadDropdown = {
        options:approverList,
        placeholder: 'Select an Site Admin/ Dept Head',
        className: 'w-full md:w-14rem',
        isClearable: true,
        name: 'particularEmpReportingManager'
    };

    const BudgetDirectorDropdown = {
        options:approverList,
        placeholder: 'Select a Budget Director',
        className: 'w-full md:w-14rem',
        name: 'budgetManagerId',
        isClearable: true,
        isDisable: checkIsNeedToBeDisable()
    };

    const HrdireactorDropdown = {
        options:approverList,
        placeholder: 'Select HR Direactor',
        className: 'w-full md:w-14rem',
        isClearable: true,
        name: 'hrDirectorI'
    };

    const HrTechnicianDropdown = {
        options:approverList,
        placeholder: 'Select an HR Technician',
        className: 'w-full md:w-14rem',
        name: 'payrollId',
        isClearable: true,
        isDisable: true
    };

    //Droopdown eventhandlers
    const commonOnChange = (event) => {
        const {name,value} = event.target;

        if(name == 'employeeId'){
        //   setDisableFieldsData(value);
          const getEmployee = employeeList.find((item) => {
            return item.id == value;
          });
          if (getEmployee) {
            const pId = getEmployee.employee_code;
            const employeeName = getEmployee.employee_name;

            setDisableFieldData({ pId: pId, employeeName: employeeName });
          } else {
            setDisableFieldData({ pId: "", employeeName: "(Employee)" });
          }
        }
        if(name == 'budgetClerkId'){
        setRequestPayload({...requestPayload,[name]: value, budgetManagerId: null})
        }else{
            setRequestPayload({...requestPayload,[name]: value})
        }
        if(validateFieldList.includes(name)){
            if(value && value.length > 0){
                seterror({...error, [name]: {...error[name], error: false}})
            }else{
                seterror({...error, [name]: {...error[name], error: true}})
            }
        }
        
    }

    const EmployeeEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['employeeId']
    }

    const SchoolEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['assighmentAt']
    };

    const ClerkEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['budgetClerkId']
    };

    const AdmindeptheadEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['particularEmpReportingManager']
    };

    const BudgetDirectorEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['budgetManagerId']
    };

    const HrdireactorEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['hrDirectorI']
    };

    const HrTechnicianEvent = {
        onChange: commonOnChange,
        selectedValue: requestPayload['payrollId']
    };


    //Input data option

    const [selectID, setSelectID] = useState("");
    const IDInput = {
        placeHolders: 'ID',
        values: disableFieldData['pId'],
        clasname: 'md:w-[9.5rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] mx-2 pl-2',
        isDisable: true
    };

    const SubjectInput = {
        placeHolders: 'Subject',
        values: requestPayload['subjectArea'],
        clasname: 'md:w-[5.1rem] h-10 pl-1 text-[16px] xl:text-[0.733vw] px-[12px] py-[8px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]',
        name: 'subjectArea'
    };

    const TypeInput = {
        placeHolders: 'Type here',
        values: requestPayload['totalStaffingAllocation'],
        clasname: 'md:w-[5.1rem] h-10 pl-1 text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]',
        name: 'totalStaffingAllocation'
    };

    const AccountInput = {
        placeHolders: 'Type here',
        values: requestPayload['accountCharged'],
        clasname: 'h-11 md:w-[25rem] text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]',
        name: 'accountCharged'
    };

    const CurrentFTEInput = {
        placeHolders: 'Type here',
        values: requestPayload['currentFteUtilized'],
        clasname: 'h-11  md:w-[24rem] text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]',
        name: 'currentFteUtilized'
    };

    const SchoolInput = {
        placeHolders: 'School',
        values: requestPayload['assighmentAt'],
        clasname: 'md:w-[23rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] placeholder-y-[0.2rem]',
        name: 'assighmentAt',
        isDisable: true
    };

    const AssigmentTitleInput = {
        placeHolders: '(Employee) - (Start Date) - (End Date)',
        values: `${disableFieldData['employeeName'] ? disableFieldData['employeeName'] : "(Employee)"} - ${requestPayload['modifiedFromDate'] ? requestPayload['modifiedFromDate'] : "(Start Date)"} - ${requestPayload['modifiedToDate'] ? requestPayload['modifiedToDate'] : "(End Date)"}`,
        clasname: 'w-full placeholder:text-[#667085]',
        name: 'assignment',
        isDisable: true
    };

    const FromDate = {
        placeHolders: 'Start Date',
        values: requestPayload['modifiedFromDate'],
        clasname: 'h-11 pl-8',
        name: 'fromDate',
        isDisable: true
    };

    const ToDate = {
        placeHolders: 'End Date',
        values: requestPayload['modifiedToDate'],
        clasname: 'h-11 pl-8',
        name: 'toDate',
        isDisable: true
    };

    //Input eventhandlers
    const InputIDEvent = {
        handelChange: (e) => {
            setSelectID(e.target.value)
        },
    };

    const SubjectEvent = {
        handelChange: commonOnChange,
    };

    const TypeEvent = {
        handelChange: commonOnChange,
    };

    const AccountEvent = {
        handelChange: commonOnChange
    };
    
    const CurrentFTEEvent = {
        handelChange: commonOnChange
    };

    const SchoolassinEvent = {
        handelChange: commonOnChange
    };

    const AssigmentTitleEvent = {
        handelChange: commonOnChange
    };

    const findFieldWithError = (fields) => {
        for (const fieldName in fields) {
          if (fields[fieldName].error) {
            return fieldName;
          }
        }
        return null; // Return null if no field with error is found
      }
    

    const handleSubmit = async () => {
        const userId = window.localStorage.getItem('loggedUserId')
        const token = window.localStorage.getItem('accessToken')
        
        const fieldWithError = findFieldWithError(error);
        
        if (fieldWithError) {
          toast.error(error[fieldWithError].message);
          return
        } else {
            if(requestPayload.budgetClerkId && !requestPayload.budgetManagerId){
                toast.error("Please Select Budget Director")
                return
            }
        }
        const baseUrl = process.env.API_URL;
        try{
            const payload = {
              assignmentTitle: `${disableFieldData['employeeName'] ? disableFieldData['employeeName'] : "(Employee)"} - ${requestPayload['modifiedFromDate'] ? requestPayload['modifiedFromDate'] : "(Start Date)"} - ${requestPayload['modifiedToDate'] ? requestPayload['modifiedToDate'] : "(End Date)"}`,
              employeeId: requestPayload.employeeId,
              assighmentAt: requestPayload.assighmentAt,
              fromDate: requestPayload.fromDate.toISOString().slice(0,10),
              toDate: requestPayload.toDate.toISOString().slice(0,10),
              subjectArea: requestPayload.subjectArea,
              totalStaffingAllocation: requestPayload.totalStaffingAllocation,
              accountCharged: requestPayload.accountCharged,
              currentFteUtilized: requestPayload.currentFteUtilized,
              submittedBy: userId,
              submittedAt: (new Date()).toISOString().slice(0,10),
              createdBy: userId,
              particularEmpReportingManager: requestPayload.particularEmpReportingManager,
              budgetClerkId: requestPayload.budgetClerkId == undefined ? null : requestPayload.budgetClerkId,
              budgetManagerId: requestPayload.budgetClerkId ? requestPayload.budgetManagerId : null,
              hrDirectorI: requestPayload.hrDirectorI,
              payrollId: requestPayload.payrollId,
              editable: true
            };

            const response = await axios.post(`${baseUrl}sixthperiod`,payload,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.status == 201){
                toast.success("Submited Successfully")
                router.push("/sixth_period_report");
            }else{
                toast.error("Something went wrong!")
            }

        }catch (error){
            toast.error("Something went wrong!")
        }
    }

    return (
        <div>
            <div className="col-span-12  xl:col-span-6 ">
                <div className="pt-10 tab-c tab-active p-lr-110 xl:pt-0" >
                    <div className="text-[24px] xl:text-[1.250vw] font-medium">
                        Basic Info
                    </div>
                    <div className="mCustomScrollbar scroll-w-10 max-h-90 overflow-auto mScrollCstm ">
                        <div className="mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw]">
                            <form>
                                <div className="space-y-[32px] xl:space-y-[1.667vw]">
                                    <div>
                                        <div>
                                            <div className='border px-8 certificate-six'>
                                                <div className='font-bold grid justify-end'>Form C</div>
                                                <center><b>CERTIFICATE</b></center>
                                                <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                    <div>Certificated Personnel Office</div>
                                                    <div style={{ marginTop: '20px' }}><b>REQUEST FOR APPROVAL - SIXTH PERIOD TEACHING ASSIGNMENT</b></div>
                                                </center>
                                                <div className='mt-4 border-4 p-4'>
                                                    <div className='font-light text-xs'>DIRECTIONS: This form should be completed and sent to the offices indicted below for approval. After all necessary approvals, the form should be forwarded to the Human Resources office which will submit the recommendation to the Board of Education for final approval. This form must be received by the Human Resources office prior to commencement of the sixth period assignment.</div>
                                                </div>
                                                <div>
                                                    <div className='mt-2.5 leading-10' style={{ fontSize: "15px" }}>
                                                        {/* Employee Selection */}
                                                        <div className="flex items-center mb-2 flex-wrap space-x-2">
                                                            <span>It is requested that approval be granted to assign, on a voluntary basis,</span>
                                                        </div>
                                                        <div className="flex items-center mb-2 flex-wrap space-x-2">
                                                            <DropdownComponent
                                                                attribute={EmployeeDropdown}
                                                                eventHandlers={EmployeeEvent}
                                                            />
                                                            <Tooltip
                                                                target=".icon-tooltip"
                                                                content="Add Employee"
                                                                position="top"
                                                                className="custom-tooltip-content"
                                                            />
                                                            <i   onClick={(e) => setOpenNewEmployee(true)}
                                                                className="icon-tooltip gusd-pluse-circle"
                                                                style={{
                                                                    color: "lightgray",
                                                                    fontSize: "20px",
                                                                    margin: "3px",
                                                                    position: "relative",
                                                                    bottom: "6px",
                                                                }}
                                                            ></i>
                                                            <EmployeePopup
                                                                visible={openNewEmployee}
                                                                onHide={() => {
                                                                    setOpenNewEmployee(false);
                                                                }}
                                                            />
                                                            <span>EID</span>
                                                            <InputComponent
                                                                datas={IDInput}
                                                                inputEventHandler={InputIDEvent}
                                                            ></InputComponent>

                                                        </div>
                                                        <div className="flex flex-wrap items-start md:items-center mb-2 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span>Assign to a sixth period teaching assignment at</span>
                                                        </div>
                                                        <div className="flex flex-wrap items-start md:items-center mb-2 space-y-4 md:space-y-0 md:space-x-2">
                                                            <DropdownComponent
                                                                attribute={SchoolDropdown}
                                                                eventHandlers={SchoolEvent}
                                                            />
                                                        </div>
                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span>For the period from</span>
                                                            <div className="relative md:w-40 ml-3 mr-5">
                                                                <i className="gusd-calendar text-[#667085] text-sm absolute left-3 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-4 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <div className="flex card justify-content-center">
                                                                <Calendar
                                                                    value={requestPayload['fromDate']}
                                                                    placeholder={'Start Date'}
                                                                    className={'w-full h-11 pl-8'}
                                                                    onChange={calenderchangeHandler}
                                                                    dateFormat={'mm/dd/yy'}
                                                                    selectionMode={'single'}
                                                                    name='fromDate'
                                                                />
                                                                </div>
                                                                
                                                            </div>
                                                            <span>To</span>
                                                            <div className="relative md:w-40 mx-3">
                                                                <i className="gusd-calendar text-[#667085] text-sm absolute left-3 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-4 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <div className="flex card justify-content-center">
                                                                <Calendar
                                                                    value={requestPayload['toDate']}
                                                                    placeholder={'End Date'}
                                                                    className={'w-full h-11 pl-8'}
                                                                    onChange={calenderchangeHandler}
                                                                    dateFormat={'mm/dd/yy'}
                                                                    selectionMode={'single'}
                                                                    name='toDate'
                                                                    minDate={requestPayload['fromDate']}
                                                                />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span className='flex items-center space-x-2'>
                                                                <span>Subject Area Added</span>
                                                                <InputComponent
                                                                    datas={SubjectInput}
                                                                    inputEventHandler={SubjectEvent}
                                                                />

                                                            </span>
                                                            <span className='flex items-center space-x-2'>
                                                                <span>Total Staffing Allocation</span>
                                                                <InputComponent
                                                                    datas={TypeInput}
                                                                    inputEventHandler={TypeEvent}
                                                                />
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span className='flex items-center space-x-2'>
                                                                <span>Account Charged</span>
                                                                <InputComponent
                                                                    datas={AccountInput}
                                                                    inputEventHandler={AccountEvent}
                                                                />
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span className='flex items-center space-x-2'>
                                                                <span>Current FTE Utilized</span>
                                                                <InputComponent
                                                                    datas={CurrentFTEInput}
                                                                    inputEventHandler={CurrentFTEEvent}
                                                                />
                                                            </span>
                                                        </div>

                                                    </div>

                                                    <div className='my-8 border-b-4 border-[black]'></div>

                                                    <div className='mt-2.5 leading-10' style={{ fontSize: "15px" }}>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <span>I accept, on a voluntary basis, a sixth period teaching assignment at</span>
                                                        </div>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            <InputComponent
                                                                datas={SchoolInput}
                                                                inputEventHandler={SchoolassinEvent}
                                                            />
                                                            <span>for the period from</span>
                                                        </div>

                                                        <div className="flex flex-wrap items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-2">
                                                            {/* <CalenderComponet
                                                                attribute={calenderConfig}
                                                                eventHandlersofCalender={eventHandlersofCalender} /> */}
                                                                <InputComponent
                                                                    datas={FromDate}
                                                                    inputEventHandler={() => {}}
                                                                />
                                                            <span>to</span>
                                                            {/* <CalenderComponet
                                                                attribute={calenderConfig}
                                                                eventHandlersofCalender={eventHandlersofCalender} /> */}
                                                                <InputComponent
                                                                    datas={ToDate}
                                                                    inputEventHandler={() => {}}
                                                                />
                                                        </div>
                                                    </div>

                                                    <div className='mt-2.5 leading-10'>
                                                        I understand and accept this assignment under the following provisions:
                                                    </div>
                                                    <ul/* style={{listStyleType:'lower-alpha'}} */ className='list-decimal mt-2.5 leading-10 pl-20'
                                                    >
                                                        <li>Payment for the sixth period teaching assignment shall be at my hourly rate of pay,determined by dividing my daily rate of pay by five (5).</li>
                                                        <li>The sixth period teaching assignment will not interfere with my regularly assigned duties.</li>
                                                        <li>The sixth period teaching assignment replaces my normal preparation/conference period,which will then be scheduled <u>immediately preceding or concluding the normal worksite day</u>.</li>
                                                        <li>This assignment is contingent on funding and enrollment.</li>
                                                    </ul>
                                                    <br />
                                                    <br />
                                                    <br />

                                                    <div className="col">
                                                        <span>Assignment Title<span className="text-[red] pl-0.2">*</span></span>
                                                        <InputComponent
                                                            datas={AssigmentTitleInput}
                                                            inputEventHandler={AssigmentTitleEvent}
                                                        />
                                                    </div>
                                                    <br />

                                                    <div className={"mb-8"}>
                                                        <div style={{ marginTop: '10px' }} className=" border">
                                                            <div>
                                                                <table style={{ width: "100%", fontSize: "14px" }}>
                                                                    <tbody>
                                                                        <tr >
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "10px", width: "50%" }}>Site Admin/ Dept Head (Second App.)<span className="text-[red] pl-0.2">*</span></td>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "5px", width: "50%" }}>
                                                                                <DropdownComponent
                                                                                    attribute={AdmindeptheadDropdown}
                                                                                    eventHandlers={AdmindeptheadEvent}
                                                                                />
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "10px" }}>Budget Clerk (Third App.)</td>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                <DropdownComponent
                                                                                    attribute={ClerkDropdown}
                                                                                    eventHandlers={ClerkEvent}
                                                                                />
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "10px" }}>Budget Director (Fourth App.)</td>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                <DropdownComponent
                                                                                    attribute={BudgetDirectorDropdown}
                                                                                    eventHandlers={BudgetDirectorEvent}
                                                                                />
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "10px" }}>HR Director (Fifth App.)<span className="text-[red] pl-0.2">*</span></td>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                <DropdownComponent
                                                                                    attribute={HrdireactorDropdown}
                                                                                    eventHandlers={HrdireactorEvent}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "10px" }}>HR Technician (Payroll) (Last App.)<span className="text-[red] pl-0.2">*</span></td>
                                                                            <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>
                                                                                <DropdownComponent
                                                                                    attribute={HrTechnicianDropdown}
                                                                                    eventHandlers={HrTechnicianEvent}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-between mt-[40px] xl:mt-[1.083vw]">
                        <div>
                            <Link href="#" className="inline-block text-[#344054] text-[14px] xl:text-[0.833vw] font-medium border border-[#D0D5DD] bg-white rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]">
                                <i className="mr-1 gusd-arrow-line-right"></i>Previous
                            </Link>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Link href="#" onClick={() => setActiveIndex(activeIndex)} className="flex items-center text-[#2D5BE5] text-[14px] xl:text-[0.833vw] font-medium border border-[#D0D5DD] bg-[#EFF8FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw]">
                                <i className="mr-1 pi pi-save" style={{ fontSize: "0.8rem" }}></i>Save
                            </Link>
                            <Link href="#" onClick={handleSubmit} class="flex items-center text-white text-[14px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "><i class="mr-1 gusd-check"></i>Submit</Link>
                            <Link href="#" onClick={() => setActiveIndex(activeIndex + 1)} className="flex items-center text-white text-[14px] xl:text-[0.833vw] font-medium border-[#D0D5DD] bg-[#3366FF] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] ">
                                <i className="mr-1 gusd-eye"></i>
                                Preview
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
