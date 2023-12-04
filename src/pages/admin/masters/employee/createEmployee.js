
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Layout from '@/components/common/nav/admin/navComponent';
import { Dropdown } from 'primereact/dropdown';


// import { designationForAllApps } from '../../../../../helper/enum';
import capitalizeFirst from '@/components/common/capitalizeFirst';
import capitalizeFirstChar from '@/components/common/capitalizeFirstChar';
import ValidateEmail from '@/components/common/ValidateEmail';
import { designationForAllApps, Google_API_KEY, USER_EMPLOYEE_TYPES, USER_TYPE_LABEL, USER_TYPES, USER_TYPES_NAMES  } from '@/components/helper/enum';
import { getCountry, getState, getZipCode } from '@/helper/getAutoCompleteAddress';
import { ValidateAdminRole } from '@/components/helper/validateRole';


export default function createEmployee() {
//     const AWS = require('aws-sdk');
//     AWS.config.update({
//         accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
//         secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
//         region: process.env.REACT_APP_AWS_Region,
//     });

    // const cognito = new AWS.CognitoIdentityServiceProvider();

    // AWS.config.update({
    //     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    //     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    //     region: process.env.REACT_APP_AWS_Region,
    // });

    //Validate User Logged In
    const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [showPleaseWaitButton, setPleaseWaitButton] = useState(false);
    const { editEmployeeId } = useParams();
    const [isEditMode, setEditMode] = useState(false);
    const [employeeIDForEdit, setEmployeeIDForEdit] = useState("");
    // let navigateTo = useNavigate();
    const [userType, setUserType] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userSub, setUserSub] = useState("");

    //Student Info
    const [employeeName, setEmployeeName] = useState("");
    const [employeeFirstName, setEmployeeFirstName] = useState("");
    const [employeeLastName, setEmployeeLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [schoolList, setSchoolList] = useState("");
    const [schoolLists, setSchoolLists] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const [newEmpSelectedDesignation, setNewEmpSelectedDesignation] = useState("");

    const SaveUserToCognito = async () => {
        try {
            const userPoolId = awsmobile.aws_user_pools_id;
            const username = email
            const password = "Gusd@2023"
            const Permanent = true

            let attributes = [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'name',
                    Value: capitalizeFirstChar(employeeLastName) + ', ' + employeeFirstName.toUpperCase(),
                },
                {
                    Name: 'custom:firstName',
                    Value: employeeFirstName,
                },
                {
                    Name: 'custom:lastName',
                    Value: capitalizeFirstChar(employeeLastName)
                },
                {
                    Name: 'custom:city',
                    Value: city ? city : ''
                },
                {
                    Name: 'custom:mobileNumber',
                    Value: phoneNo ? phoneNo : ''
                },
                {
                    Name: 'custom:address',
                    Value: addressOne ? addressOne : ''
                },
                {
                    Name: 'custom:stateId',
                    Value: state ? state : ''
                },
                {
                    Name: 'custom:countryId',
                    Value: country ? country : ''
                },
                {
                    Name: 'custom:userType',
                    Value: userType.label ? userType.label : ''
                },
                {
                    Name: 'custom:role',
                    Value: userRole.value
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

            const createUserResponse = await cognito.adminCreateUser(params).promise();
            const userSub = createUserResponse.User?.Attributes?.find(attr => attr.Name === 'sub')?.Value;
            // setUserSub(userSub)

            // User Confirmation 
            cognito.adminSetUserPassword(params2, (err, data) => {
                if (err) {
                } else {
                }
            });
            return userSub;

        } catch (error) {
            console.error('Error saving Cognito user:', error);
        }
    }

    const UpdateCognito = async (userId, empId, empName) => {
        
        const cognito = new AWS.CognitoIdentityServiceProvider();

        try {

            const params = {
                UserPoolId: awsmobile.aws_user_pools_id,
                Username: userId,
                UserAttributes: [
                    {
                        Name: "name",
                        Value: empName,
                    },
                    {
                        Name: "custom:firstName",
                        Value: (employeeFirstName) ? employeeFirstName : '',
                    },
                    {
                        Name: 'custom:empId',
                        Value: empId ? empId : ''
                    },
                    {
                        Name: "custom:lastName",
                        Value: (employeeLastName) ? capitalizeFirstChar(employeeLastName) : '',
                    },
                    { 
                        Name: "custom:role",
                        Value: (userRole.value) ? userRole.value : '',
                    },

                ],
            };

            try {
                cognito.adminUpdateUserAttributes(params, function (err, data) {
                    if (err){
                        console.log("Errr rr", err, err.stack);
                    }
                    else{
                        console.log(data);
                    }
                });
            } catch (error) {
                console.error('Error updating cognito user attribute:', error);
            }

        } catch (error) {
            console.error('Error saving Cognito user:', error);
        }

    }

    //Create New Employee
    const saveEmployee = async () => {
        if (employeeFirstName === '' || employeeFirstName === undefined) { toast.error('Please enter Employee FirstName.'); return; }
        else if (employeeLastName === '' || employeeLastName === undefined) { toast.error('Please enter Employee LastName.'); return; }
        else if (userRole.value === '' || userRole.value === undefined) { toast.error('Please select Role.'); return; }
        else if (userType.label === '' || userType.label === undefined) { toast.error('Please select User Type.'); return; }
        else if (newEmpSelectedDesignation === '' || newEmpSelectedDesignation === null) { toast.error('Please select Designation.'); return; }

        else if (!ValidateEmail(email)) { toast.error('Invalid email.'); return; }

        setPleaseWaitButton(true);
        //  var employee_name = firstName + ', ' + lastName;
        var updatedEmployeeId;
        if (editEmployeeId) {
            const original = await DataStore.query(Employee, employeeIDForEdit);
            await DataStore.save(
                Employee.copyOf(original, (updated) => {
                    // updated.employee_name = capitalizeFirst(employeeLastName) + ', ' + capitalizeFirst(employeeFirstName);
                    updated.employee_name = capitalizeFirstChar(employeeLastName) + ', ' + employeeFirstName.toUpperCase();
                    // updated.firstName = capitalizeFirst(employeeFirstName);
                    // updated.lastName = capitalizeFirst(employeeLastName);
                    updated.firstName = employeeFirstName.toUpperCase();
                    updated.lastName = capitalizeFirstChar(employeeLastName);
                    updated.address_1 = capitalizeFirst(addressOne);
                    updated.address_2 = addressTwo;
                    updated.city = capitalizeFirst(city);
                    updated.zip_code = zipCode;
                    updated.state = state;
                    updated.country = capitalizeFirst(country);
                    updated.phone_no = phoneNo;
                    updated.email = email;
                    updated.school_id = schoolLists.code;
                    updated.employee_code = employeeId;
                    updated.employeeType = userType.label;
                    updated.role = userRole.value;
                    updated.designation = newEmpSelectedDesignation.code;
                })
            );


            if (original.id !== null && original.user_Id !== null) {
                //update Cognito User
                await UpdateCognito(original.user_Id, original.id, original.employee_name);
            }
            toast.success('Data Added Successfully.');
            goBack()
            updatedEmployeeId = original.id;

        } else {

            //Save Cognito User
            const cognitoSubId = await SaveUserToCognito();
            if (cognitoSubId) {
                //Update in current table
                setEmployeeName(employeeFirstName + ', ' + employeeLastName);
                //Save Employee
                var newEmployeeResponse = await DataStore.save(
                    new Employee({
                        // "employee_name": capitalizeFirst(employeeLastName) + ', ' + capitalizeFirst(employeeFirstName),
                        // "firstName": capitalizeFirst(employeeFirstName),
                        // "lastName": capitalizeFirst(employeeLastName),
                        "employee_name": capitalizeFirstChar(employeeLastName) + ', ' + employeeFirstName.toUpperCase(),
                        "firstName": employeeFirstName.toUpperCase(),
                        "lastName": capitalizeFirstChar(employeeLastName),
                        "phone_no": phoneNo,
                        "email": email,
                        "address_1": capitalizeFirst(addressOne),
                        "address_2": capitalizeFirst(addressTwo),
                        "city": capitalizeFirst(city),
                        "zip_code": zipCode,
                        "state": state,
                        "country": country,
                        "employee_code": employeeId,
                        "school_id": schoolLists.code,
                        "employeeType": userType.label,
                        "role": userRole.value,
                        "user_Id": cognitoSubId,
                        "designation": newEmpSelectedDesignation.code,
                    })
                );

                if (newEmployeeResponse.id !== null && newEmployeeResponse.user_Id !== null) {
                    //update Cognito User
                    await UpdateCognito(newEmployeeResponse.user_Id, newEmployeeResponse.id, newEmployeeResponse.employee_name);
                    toast.success("Employee confirmed and saved successfully")
                }
            }

        }

        { goBack() }
    }

    async function onLoad() {
        try {
            await Auth.currentSession();
            if (!ValidateAdminRole()) { userHasAuthenticated(false); }
        } catch (e) {
            userHasAuthenticated(false);
        }
    }

    async function BindExistingData() {
        //Edit existing record
        if (editEmployeeId !== null) {
            setEmployeeIDForEdit(editEmployeeId);

            // const original = await DataStore.query(Employee, editEmployeeId);


            if (original != null) {

                setEmployeeName(original.firstName + ', ' + original.lastName);

                if (original.firstName && original.firstName) {
                    setEmployeeFirstName(original.firstName);
                    setEmployeeLastName(original.lastName)
                }
                else {
                    if (original.employee_name) {
                        let empName = original.employee_name.split(" ");
                        setEmployeeFirstName(empName[1] || '');
                        setEmployeeLastName(empName[0] || '');
                    }
                }

                setAddressOne(original.address_1);
                setAddressTwo(original.address_2);
                setCity(original.city);
                setZipCode(original.zip_code);
                setState(original.state);
                setCountry(original.country);
                setPhoneNo(original.phone_no);
                setEmail(original.email);
                setEmployeeId(original.employee_code)
                var schoolResponses = await DataStore.query(Schools, original.school_id);
                setSchoolLists({ name: schoolResponses.name, code: schoolResponses.id });
                setUserType({ value: USER_EMPLOYEE_TYPES.value, label: original.employeeType });


                let empDesignation = '';

                if(original.designation === "BUDGET_CLERK"){
                    empDesignation = "Budget Clerk"
                }
                else if (original.designation === "DEPARTMENT_HEAD"){
                    empDesignation = "Department Head"
                }
                else if (original.designation === "PRINCIPAL"){
                    empDesignation = "Principal"
                }
                else if (original.designation === "BUDGET_MANAGER"){
                    empDesignation = "Budget Manager"
                }
                else if (original.designation === "HR_TECH"){
                    empDesignation = "HR Tech"
                }
                else if (original.designation === "Janitor"){
                    empDesignation = "Janitor"
                }
                setNewEmpSelectedDesignation({ code: original.designation ? original.designation : '' , name: empDesignation ? empDesignation : '' })
                setEditMode(true);

                let labelUserRole = original.role;

                if (original.role === USER_TYPES.ADMIN) {
                    labelUserRole = USER_TYPES_NAMES.A;
                } else if (original.role === USER_TYPES.INITIATOR) {
                    labelUserRole = USER_TYPES_NAMES.I;
                } else if (original.role === USER_TYPES.APPROVER) {
                    labelUserRole = USER_TYPES_NAMES.AP;
                } else if (original.role === USER_TYPES.PAYROLL) {
                    labelUserRole = USER_TYPES_NAMES.P;
                }

                setUserRole({ value: original.role, label: labelUserRole })
                setEditMode(true);
            }
            else {
                toast.error('Invalid record.');
                goBack()
            }
        }
    }

    //Get Address
    const onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = getCity(addressArray),
            country = getCountry(addressArray),
            zipCode = getZipCode(addressArray),
            state = getState(addressArray);
        // Set these values in the state.
        setCountry(country)
        setState(state)
        setZipCode(zipCode)
        setCity(city)
        setAddressOne(address)
    };


    //Get Employees List
    async function BindList() {

        try {
            var schoolResponses = await DataStore.query(Schools, Predicates.ALL, {
                sort: s => s.name(SortDirection.ASCENDING)
            });

            if (schoolResponses !== null) {
                let stateData = schoolResponses;

                let school = [];
                stateData.map((item) => {
                    let obj = {
                        name: item.name,
                        code: item.id
                    }
                    school.push(obj);
                })
                setSchoolList(school);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        BindList();
        onLoad();
        BindExistingData();
    }, []);

    // const goBack = () => {
    //     setPleaseWaitButton(false);
    //     navigateTo("/admin/setting/masters/employee");
    // }

    return (
        <>
            <Layout pageTitle="Dashboard">

                <div className="xl:h-full lg:h-full md:h-full 2xl:h-full bg-body-blue">
                    <div className="pl-16 schlDash">
                        <div
                            className="flex grid flex-row flex-wrap justify-center flex-1 gap-4 p-5 pl-5 pr-5 mt-5 align-center 2xl:grid-cols-8 xl:grid-cols-10 lg:grid-cols-8 sm:grid-cols-1 contract-grid-wrapper">
                            <div className="col-span-6 col-start-3 lg:col-start-3 xl:col-start-3 2xl:col-start-2 schoolUpperBlock">
                                <div className="p-3 py-5 bg-white rounded-md shadow dark:bg-[#252423]">
                                    <div className="flex justify-center mt-3 mb-2">
                                        <h2 className="page-title">
                                            {isEditMode ? "Create" : "Edit"} Employee
                                        </h2>
                                    </div>
                                    <div x-data="{tab: 1}"></div>
                                    <div className={"block w-full"}>
                                        <div className="px-4" x-show="tab === 1">
                                            <div className="flex grid flex-row flex-wrap flex-1 mb-6 align-center 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4">

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        First Name <label htmlFor="" className="text-[#FF0000] text-[14px] font-medium ">
                                                            * </label></label>
                                                    <input value={(employeeFirstName)} onChange={e => setEmployeeFirstName(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="First Name" />
                                                </div>
                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Last Name <label htmlFor="" className="text-[#FF0000] text-[14px] font-medium ">
                                                            * </label></label>
                                                    <input value={(employeeLastName)} onChange={e => setEmployeeLastName(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="Last Name" />
                                                </div>


                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        School
                                                    </label>

                                                    <div className="card flex justify-content-center dropdown_emp">
                                                        <Dropdown value={schoolLists} onChange={(e) => setSchoolLists(e.value)} options={schoolList} optionLabel="name"
                                                            placeholder="School" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full  px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" />
                                                    </div>
                                                </div>

                                                {/* <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Employee Name <label htmlFor="" className="text-[#FF0000] text-[14px] font-medium ">
                                                            * </label></label>
                                                    <input value={(employeeName)} onChange={e => setEmployeeName(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="Employee Name" />
                                                </div> */}



                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Employee Id</label>
                                                    <input value={(employeeId)} onChange={e => setEmployeeId(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="Employee Id" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Phone No
                                                    </label>
                                                    <PhoneInput
                                                        enableSearch
                                                        buttonStyle={{ background: 'transparent', borderWidth: 0 }}
                                                        inputStyle={{ borderWidth: 0, fontSize: 16, background: 'transparent' }}
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-1 mt-1 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#8E8E8E]"
                                                        country={'us'}
                                                        value={phoneNo}
                                                        onChange={(phone) => setPhoneNo("+" + phone)}
                                                    />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Email </label>
                                                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="Email" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                                        User Type
                                                        <label className="text-[#FF0000] text-[14px] font-medium">
                                                            *{" "}
                                                        </label>
                                                    </label>
                                                    <Select
                                                        value={userType}
                                                        onChange={(e) => {
                                                            setUserType(e)
                                                        }}
                                                        className="mt-1.5"
                                                        options={USER_EMPLOYEE_TYPES}
                                                        maxMenuHeight={200}
                                                        placeholder="Select User Type"
                                                    />

                                                </div>
                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                                        Role
                                                        <label className="text-[#FF0000] text-[14px] font-medium">
                                                            *{" "}
                                                        </label>
                                                    </label>
                                                    <Select
                                                        value={userRole}
                                                        onChange={(e) => {
                                                            setUserRole(e)
                                                        }}
                                                        className="mt-1.5"
                                                        options={USER_TYPE_LABEL}
                                                        maxMenuHeight={200}
                                                        placeholder="Select User Type"
                                                    />

                                                </div>
                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                                        Designation
                                                        <label className="text-[#FF0000] text-[14px] font-medium">
                                                            *{" "}
                                                        </label>
                                                    </label>
                                                    <Dropdown value={newEmpSelectedDesignation.name} onChange={(e) => setNewEmpSelectedDesignation(e.value)} options={designationForAllApps} optionLabel="name"
                                                        placeholder="Select a Designation" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full  px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                    />
                                                </div>
                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Address 1
                                                    </label>
                                                    <Autocomplete
                                                        defaultValue={addressOne}
                                                        apiKey={Google_API_KEY}
                                                        onPlaceSelected={(place) => onPlaceSelected(place)}
                                                        options={{
                                                            types: ["establishment"],
                                                            componentRestrictions: { country: ["fr", "ch", "be", "us", "in"] },
                                                        }}
                                                        className="text-[16px] rounded-lg   flex-1 appearance-none border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                    />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Address 2
                                                    </label>
                                                    <input
                                                        value={addressTwo}
                                                        onChange={(e) => setAddressTwo(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="Address 2"
                                                    />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#3440   54] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        City
                                                    </label>
                                                    <input
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="City"
                                                    />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Zip Code
                                                    </label>
                                                    <input
                                                        value={zipCode}
                                                        onChange={(e) => setZipCode(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="Zip Code"
                                                    />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Country
                                                    </label>
                                                    <CountryDropdown
                                                        value={country}
                                                        onChange={(val) => setCountry(val)}
                                                        className="rounded-lg border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                    />
                                                </div>


                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        State
                                                    </label>
                                                    <RegionDropdown
                                                        country={country}
                                                        value={state}
                                                        onChange={(val) => setState(val)}
                                                        className="rounded-lg border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                    />
                                                </div>

                                                {/* <div className="mt-2">
                                                <button
                                                    onClick={browseProfilePic}
                                                    className=" py-1 px-3 bg-[#f2f2f2] text-[#000] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md"
                                                >
                                                    {showPleaseWaitButton ? "Please wait..." : "Browse Picture"}
                                                    <input hidden id="fileProfilePic" type="file" onChange={changeProfilePicture} />
                                                </button>
                                                <img className="mt-5" src={localPicturePath ? localPicturePath : profilePicPath ? profilePicPath : require('../../../../assets/images/defaultProfile.jpg')} style={myProfileImageStyle} />
                                            </div> */}

                                            </div>
                                            <div className="grow flex justify-center gap-3 mb-3">
                                                <Link href="/admin/masters/employee/" className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:border-[#333231]  dark:text-[#FFFFFF]">Cancel</Link>
                                                <button onClick={() => saveEmployee()} className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md bg-[#113699]">{showPleaseWaitButton ? 'Please wait...' : 'Submit'}</button>
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

const myProfileImageStyle = {
    borderRadius: "50%",
    width: '100px',
    height: '100px',
    marginLeft: "5px",
    marginTop: "20px"
};
