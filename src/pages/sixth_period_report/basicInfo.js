import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
//  import Employeepopup from "@/components/common/Employeepopup";

// import { Link } from 'react-router-dom';
import DropdownComponent from '../../components/common/dropdownComponent/dropdownComponent';
import CalenderComponet from '../../components/common/calenderComponent/calenderComponent';
import InputComponent from '../../components/common/inputComponent/inputComponent'
import EmployeePopup from '@/components/common/EmployeePopup';

export default function BasicInfo({ setActiveIndex, activeIndex }) {
    const { API_STATUS } = require("../../helper/enum");
    const [value, setValue] = useState('');
    const [date, setDate] = useState('')
    const [openNewEmployee, setOpenNewEmployee] = useState(false);
    const calenderConfig = {
        value: date,
        placeholder: 'Start Date',
        className: "w-full h-11 pl-8",
        dateFormat: "dd/mm/yy"
    }
    const calenderConfig1 = {
        value: 'calenderStart',
        placeholder: 'End Date',
        className: "w-full h-11 pl-8",
        dateFormat: "dd/mm/yy"
    }
    const eventHandlersofCalender = {
        calenderchangeHandler: (e) => {
            setDate(e.value)
            console.log('Selected Value:', e.value);
        },
    };
    const [employeeList, setEmployeeList] = useState();
    const [approverList, setApproverList] = useState();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const EmployeeDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:employeeList,
        placeholder: 'Select an Employee',
        className: 'md:w-[21rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] mr-2'
    };
    const EmployeeEvent = {
        onChange: (e) => {
            setSelectedEmployee(e.target.value);
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedEmployee
    };

    //Employeelist Api

   async function getEmployeeListData(e) {
   // let schoolId = e?.code;
    // console.log("schoolId", schoolId)

   // setSelectedSchool(e);
    try {
      let accessToken = window.localStorage.getItem("accessToken");

      //*Request data
      let requestedData = {
        accessToken: accessToken,
        page: 1,
        limit: 100,
        search: "",
       // employeeType: ["Certificated", "Administrator"],
       //  schoolId: schoolId ? parseInt(schoolId) : "",
      };

      const response = await axios.post("/api/common/getEmployeeList", {
        requestedData,
      });
      var employeeResponses = response.data;
      if (employeeResponses !== null) {
        let employee = [{ label: "No Absence", value: "1" }];
        let Approver = [{label: "No Absence", value: "1"}];
        employeeResponses.rows.map((item) => {
          let name = item.employee_code
            ? `${item.employee_name} (${item.employee_code})`
            : item.employee_name;
          let obj = {
            label: name,
            value: item.id,
           // employeeType: item.employeeType,
          };
          let AppObj = {
            label: name,
            value: item.user_Id,
          };
          employee.push(obj);
          Approver.push(AppObj)
        });
        setEmployeeList(employee);
        setApproverList(Approver);
      }
    } catch (error) {
      console.log(error);
      console.log("error", error.response.status);
      if (error.response.status === API_STATUS.UNAUTHORIZED) {
        toast.error("Session Expired");
        router.push("/");
      }
    }
  }
    
    //school dropwown
    const [schoolList, setSchoolList] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const SchoolDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:schoolList,
        placeholder: 'Select School',
        className: 'md:w-[33.3rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085]'
    };
    const SchoolEvent = {
        onChange: (e) => {
            setSelectedSchool(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedSchool
    };
    //School List API
    const getShoolListData = async () => {
        try {
            //*Get userID, Access Token from local storage
            let accessToken = window.localStorage.getItem("accessToken");
            //*Request data
            console.log(accessToken,"accessTokenaccessToken")
            let requestedData = {
                accessToken: accessToken,
                page: 1,
                limit: 100,
            };

            const response = await axios.post("/api/common/getSchoolList", {
                requestedData,
            });
            console.log(response,"responseresponse")
            let getSchoolListDetails = response.data;
            
            let getSchoolListResponse = getSchoolListDetails.rows;
            let finalArray = [];
            getSchoolListResponse.map((item, index) => {
                finalArray.push({ label: item.name, value: item.id });
                setSchoolList(finalArray);
               
            });
        } catch (err) {
            console.log("err----" + err);
            if (err.response.status === API_STATUS.UNAUTHORIZED) {
                toast.error("Session Expired");
                router.push("/");
            }
        }
    };
    useEffect(() => {
        getShoolListData();
        getEmployeeListData();
          
      }, []);

    //Admin Buget clerk
    const [selectedClerk, setSelectedClerk] = useState(null);
    const ClerkDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:approverList,
        placeholder: 'Select a Budget Clerk',
        className: 'w-full md:w-14rem'
    };
    const ClerkEvent = {
        onChange: (e) => {
            setSelectedClerk(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedClerk
    };

    //Admin dept head Dropdown
    const [selectedAdminDept, setSelectedAdminDept] = useState(null);
    const AdmindeptheadDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:approverList,
        placeholder: 'Select an Site Admin/ Dept Head',
        className: 'w-full md:w-14rem'
    };
    const AdmindeptheadEvent = {
        onChange: (e) => {
            setSelectedAdminDept(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedAdminDept
    };
    //Admin Budget Director
    const [selectedBudgetDirector, setSelectedBudgetDirector] = useState(null);
    const BudgetDirectorDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:approverList,
        placeholder: 'Select a Budget Director',
        className: 'w-full md:w-14rem'
    };
    const BudgetDirectorEvent = {
        onChange: (e) => {
            setSelectedBudgetDirector(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedBudgetDirector
    };
    //Admin HR director
    const [selectedHrdireactor, setSelectedHrdireactor] = useState(null);
    const HrdireactorDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:approverList,
        placeholder: 'Select HR Direactor',
        className: 'w-full md:w-14rem'
    };
    const HrdireactorEvent = {
        onChange: (e) => {
            setSelectedHrdireactor(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedHrdireactor
    };

    //Admin dept head Dropdown
    const [selectedHrTechnician, setSelectedHrTechnician] = useState(null);
    const HrTechnicianDropdown = {
        // options: [
        //     { label: 'Option 1', value: 'option1' },
        //     { label: 'Option 2', value: 'option2' },
        // ],
        options:approverList,
        placeholder: 'Select an HR Technician',
        className: 'w-full md:w-14rem'
    };
    const HrTechnicianEvent = {
        onChange: (e) => {
            setSelectedHrTechnician(e.target.value)
            console.log('Selected Value:', e.value);
        },
        selectedValue: selectedHrTechnician
    };

    //ID input filed
    const [selectID, setSelectID] = useState("");
    const IDInput = {
        placeHolders: 'ID',
        values: selectID,
        clasname: 'md:w-[9.5rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] mx-2 pl-2'
    };
    const InputIDEvent = {
        handelChange: (e) => {
            setSelectID(e.target.value)
        },
    };

    //ID input filed
    const [selectSubject, setSelectSubject] = useState("");
    const SubjectInput = {
        placeHolders: 'Subject',
        values: selectSubject,
        clasname: 'md:w-[5.1rem] h-10 pl-1 text-[16px] xl:text-[0.733vw] px-[12px] py-[8px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]'
    };
    const SubjectEvent = {
        handelChange: (e) => {
            setSelectSubject(e.target.value)
        },
    };
    //ID input filed
    const [selectType, setSelectType] = useState("");
    const TypeInput = {
        placeHolders: 'Type here',
        values: selectType,
        clasname: 'md:w-[5.1rem] h-10 pl-1 text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]'
    };
    const TypeEvent = {
        handelChange: (e) => {
            setSelectType(e.target.value)
        },
    };
    //Account input filed
    const [selectAccount, setSelectAccount] = useState("");
    const AccountInput = {
        placeHolders: 'Type here',
        values: selectAccount,
        clasname: 'h-11 md:w-[25rem] text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]'
    };
    const AccountEvent = {
        handelChange: (e) => {
            setSelectAccount(e.target.value)
        },
    };
    //Current FTE input filed
    const [selectCurrentFTE, setSelectCurrentFTE] = useState("");
    const CurrentFTEInput = {
        placeHolders: 'Type here',
        values: selectCurrentFTE,
        clasname: 'h-11  md:w-[24rem] text-[16px] xl:text-[0.833vw] px-[14px] py-[10px] bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:border-[#D0D5DD] focus:ring-[#D0D5DD] block w-full rounded-[8px] xl:rounded-[0.417vw]'
    };
    const CurrentFTEEvent = {
        handelChange: (e) => {
            setSelectCurrentFTE(e.target.value)
        },
    };
    //School input filed
    const [selectSchool, setSelectSchool] = useState("");
    const SchoolInput = {
        placeHolders: 'School',
        values: selectSchool,
        clasname: 'md:w-[23rem] h-11 rounded-md border border-[#E4E7EC] placeholder:text-[#667085] placeholder-y-[0.2rem]'
    };
    const SchoolassinEvent = {
        handelChange: (e) => {
            setSelectSchool(e.target.value)
        },
    };
    //Assigment title input filed
    const [selectAssigmentTitle, setSelectAssigmentTitle] = useState("");
    const AssigmentTitleInput = {
        placeHolders: 'School',
        values: selectAssigmentTitle,
        clasname: 'w-full placeholder:text-[#667085]'
    };
    const AssigmentTitleEvent = {
        handelChange: (e) => {
            setSelectAssigmentTitle(e.target.value)
        },
    };

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
                                                                    <CalenderComponet attribute={calenderConfig} eventHandlersofCalender={eventHandlersofCalender} />
                                                                </div>
                                                            </div>
                                                            <span>To</span>
                                                            <div className="relative md:w-40 mx-3">
                                                                <i className="gusd-calendar text-[#667085] text-sm absolute left-3 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-4 top-1/2 transform -translate-y-1/2 z-10"></i>
                                                                <div className="flex card justify-content-center">
                                                                    <CalenderComponet attribute={calenderConfig1} eventHandlersofCalender={eventHandlersofCalender} />
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
                                                            <CalenderComponet
                                                                attribute={calenderConfig}
                                                                eventHandlersofCalender={eventHandlersofCalender} />
                                                            <span>to</span>
                                                            <CalenderComponet
                                                                attribute={calenderConfig}
                                                                eventHandlersofCalender={eventHandlersofCalender} />
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
                            <Link href="#" class="flex items-center text-white text-[14px] xl:text-[0.833vw] font-medium bg-[#113699] hover:bg-[#0f296e] border border-[#113699] hover:border-[#0f296e] rounded-[8px] xl:rounded-[0.417vw] py-[10px] xl:py-[0.521vw] px-[18px] xl:px-[0.938vw] "><i class="mr-1 gusd-check"></i>Submit</Link>
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
