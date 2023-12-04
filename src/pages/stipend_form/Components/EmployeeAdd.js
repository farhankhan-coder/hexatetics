import React, { Fragment, useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import capitalizeFirstChar from "@/components/common/capitalizeFirstChar";
import { getEmployeeById } from "@/helper/actions/employeeByIdActions";
import { API_STATUS } from "@/helper/enum";

// import AWS from "aws-sdk";

function EmployeeAdd(props) {
    const router = useRouter();
    // const [selectedSchool, setSelectedSchool] = useState(props.selectedSchool);
    const [schoolList, setSchoolList] = useState([]);
    const [NewEmployeeSchool, setNewEmployeeSchool] = useState(null);
    const [openNewEmployee, setOpenNewEmployee] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [newEmpFirstName, setNewEmpFirstName] = useState("");
    const [newEmpLastName, setNewEmpLastName] = useState("");
    const [NewEmployeeCode, setNewEmployeeCode] = useState("");
    const [NewEmployeeEmail, setNewEmployeeEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeTypeField, setEmployeeTypeField] = useState("");

    const getMasterData = async () => {
        try {
            //*Get userID, Access Token from local storage
            let accessToken = window.localStorage.getItem("accessToken");
            //*Request data
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
            let finalArray = [];
            getSchoolListResponse.map((item, index) => {
                finalArray.push({ name: item.name, code: item.id });
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

    const AddNewEmployee = async () => {
        if (selectedSchool === "" || selectedSchool === null) {
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
        } else if (newEmpLastName === null || newEmpLastName === "") {
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
        else if (employeeTypeField === null || employeeTypeField === "") {
            toast.error("Please Enter Employee Type");
            return;
        }

        // var AddedNewEmployee = await DataStore.save(new Employee(
        //     {
        //         "school_id": selectedSchool?.code,
        //         "employee_name": NewEmployeeName,
        //         "employee_code": NewEmployeeCode,
        //         "email": NewEmployeeEmail,
        //         "employeeType": employeeTypeField ? employeeTypeField.code : employeeTypeField

        //     }
        // ))
        let accessToken = window.localStorage.getItem("accessToken");

        let requestedData = {
            accessToken: accessToken,
            school_id: props.selectedSchool?.code,
            firstName: newEmpFirstName.toUpperCase(),
            lastName: capitalizeFirstChar(newEmpLastName),
            employee_name:
                capitalizeFirstChar(newEmpLastName) +
                ", " +
                newEmpFirstName.toUpperCase(),
            // role: newEmpSelectedRole?.code,
            // designation: newEmpSelectedDesignation.code,
            // employee_name: NewEmployeeName,
            employee_code: NewEmployeeCode,
            email: NewEmployeeEmail,
            employeeType: employeeTypeField.code,
        };
        console.log("requestedData", requestedData);

        try {
            const response = await axios.post("/api/common/employeeCreate", {
                requestedData,
            });

            if (response.status === API_STATUS.SUCCESS) {
                // await SaveUserToCognito(AddedNewEmployee?.data?.createEmployee?.id);
                toast.success("Employee created successfully.");
                console.log("response.data.user.id", response.data.user.id);
                let empName = await getEmployeeById(response.data.user.id, accessToken);
                console.log("responseempName2", empName);

                if (empName) {
                    let obj1 = {
                        name:
                            empName.employee_name + " " + "(" + empName.employee_code + ")",
                        code: empName.id,
                        employeeType: empName.employeeType,
                    };
                    console.log("empName", empName);
                    console.log("setSelectedEmployee", obj1);
                    props.setSelectedEmployee(obj1);
                }
                
                setEmployeeId(response.data.user.id);
                try {
                    //*Request data
                    let requestedData = {
                        accessToken: accessToken,
                        page: 1,
                        limit: 100,
                        employeeType: ["Certificated", "Administrator"],
                        schoolId: props.selectedSchool
                            ? parseInt(props.selectedSchool.code)
                            : "",
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
                        props.setEmployeeList(employee);
                    }
                    console.log("employeeResponses 45", employeeResponses);
                    console.log("response.data.user.id 2", response.data.user.id);
                    console.log("employeeId", employeeId);

                    
                } catch (error) {
                    console.log(error);
                    console.log("error", error.response.status);
                    if (error.response.status === API_STATUS.UNAUTHORIZED) {
                        toast.error("Session Expired");
                        router.push("/");
                    }
                }
                // getMasterData();
            }
            props.setOpenNewEmployee(false);
        } catch (error) {
            console.log("response.status", error.response);
            if (error?.response?.status === API_STATUS.DUPLICATE_RECORD) {
                toast.error("Employee already exist.");
            } else if (error?.response?.status === API_STATUS.BAD_REQUEST) {
                toast.error("Something went wrong.");
            }
        }

        toast.success("Employee created successfully..");

        // props.setOpenNewEmployee(false);
        setOpenNewEmployee(false);
        setNewEmployeeSchool(null);
        setNewEmpFirstName("");
        setNewEmpLastName("");
        setNewEmployeeCode("");
        setNewEmployeeEmail("");
        setEmployeeTypeField("");
        // setNewEmpSelectedRole(null);
        // setNewEmpSelectedDesignation(null);
        // setNewEmployeeName("");
        // onSetEmployee(obj); setAbsentDate([])
    };

    useEffect(() => {
        getMasterData();
    }, []);

    return (
        <Dialog
            header="Add New Employee"
            draggable={false}
            className="add_New_Employee"
            visible={props.visible}
            style={{ width: "30vw" }}
            onHide={props.onHide}

        // footer={footerContentForReqReject}
        >
            <div className="m-0">
                <div className="font-medium text-sm mb-1 ">
                    School/Department <span className="text-[red] pl-0.2">*</span>
                </div>
                <Dropdown
                    id="dept"
                    value={selectedSchool}
                    showClear
                    // onChange={(e) => { setSelectedSchool(e.value) }} //EmployeeList(e);
                    filter
                    options={schoolList}
                    optionLabel="name"
                    placeholder="Select"
                    className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                    style={{ fontSize: "0.875rem", color: "#667085", fontWeight: "400" }}
                    onChange={(e) => {
                        setSelectedSchool(e.value);
                    }}
                />
                {/* <div className="font-medium text-[18px] mb-2 mt-3">Employee Name <span className="text-[red] pl-0.2">*</span></div>
                   <InputText
                       value={NewEmployeeName}
                       placeholder=""
                       onChange={e => { setNewEmployeeName(e.target.value) }}
                       className="w-full"
                   /> */}
                <div className="font-medium text-sm mb-1 mt-3">
                    First Name <span className="text-[red] pl-0.2">*</span>
                </div>
                <InputText
                    value={newEmpFirstName}
                    placeholder="Enter First Name"
                    onChange={(e) => {
                        setNewEmpFirstName(e.target.value);
                    }}
                    className="w-full"
                />
                <div className="font-medium text-sm mb-1 mt-3">
                    Last Name <span className="text-[red] pl-0.2">*</span>
                </div>
                <InputText
                    value={newEmpLastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                        setNewEmpLastName(e.target.value);
                    }}
                    className="w-full"
                />
                {/*  <div className="font-medium text-[18px] mb-2 mt-3">Select Role 
                   <span className="text-[red] pl-0.2">*</span>
                   </div>
                   <Dropdown value={newEmpSelectedRole} onChange={(e) => setNewEmpSelectedRole(e.value)} options={rolesArray} optionLabel="name"
                       placeholder="Select a Role" className="w-full md:w-14rem" />

                   <div className="font-medium text-[18px] mb-2 mt-3">Designation<span className="text-[red] pl-0.2">*</span></div>
                   <Dropdown value={newEmpSelectedDesignation} onChange={(e) => setNewEmpSelectedDesignation(e.value)} options={designationForAllApps} optionLabel="name"
                       placeholder="Select a Designation" className="w-full md:w-14rem" /> */}
                {/* -------------------------------- */}

                <div className="font-medium text-sm mb-1 mt-3">
                    Employee Code <span className="text-[red] pl-0.2">*</span>
                </div>
                <InputText
                    value={NewEmployeeCode}
                    placeholder="Enter Employee Code"
                    onChange={(e) => {
                        setNewEmployeeCode(e.target.value);
                    }}
                    className="w-full"
                />

                <div className="font-medium text-sm mb-1 mt-3 ">
                    Employee Email Address <span className="text-[red] pl-0.2">*</span>
                </div>
                <InputText
                    value={NewEmployeeEmail}
                    placeholder="Enter Employee Email"
                    onChange={(e) => {
                        setNewEmployeeEmail(e.target.value);
                    }}
                    className="w-full"
                />
            </div>
            <div className="font-medium text-sm mb-1 mt-3">
                Employee Type <span className="text-[red] pl-0.2">*</span>
            </div>
            <Dropdown
                id="employee"
                value={employeeTypeField}
                onChange={(e) => {
                    setEmployeeTypeField(e.value);
                }}
                options={schoolList}
                filter
                optionLabel="name"
                placeholder="Select Employee Type"
                className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5"
                style={{ fontSize: "0.875rem", color: "#667085", fontWeight: "400" }}
            />

            <div className="flex items-center justify-between gap-2 mt-3">
                <Link
                    href=""
                    onClick={() => {
                        props.setOpenNewEmployee(false);
                    }}
                    className="text-[#344054] font-medium text-sm text-center  py-[8px]  px-[14px]  border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer"
                >
                    <i className="pi pi-times"></i>
                    <span>Cancel</span>
                </Link>

                <Link
                    href=""
                    onClick={() => {
                        AddNewEmployee();
                    }}
                    className="text-[#039855] font-medium text-sm text-center  py-[8px]  px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer"
                >
                    <i className="pi pi-check"></i>
                    <span>Add</span>
                </Link>
            </div>
        </Dialog>
    );
}

export default EmployeeAdd;
