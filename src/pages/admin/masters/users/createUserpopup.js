
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Image } from "primereact/image";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { TabPanel, TabView } from "primereact/tabview";
import { Checkbox } from "primereact/checkbox";
import DataTable from "react-data-table-component";
// import { Apps, UserAppsPermission, UserAdditionalSettings, Employee, Schools } from '../../../../../models'; //UserAppPermission
// import { GetValueFromArray } from '../../../../../helper/commonfunctions';
import { USER_TYPES, USER_TYPES_NAMES, USER_EMPLOYEE_TYPES } from "@/helper/enum";
import { ValidateAdminRole } from "@/components/helper/validateRole";
import Layout from '@/components/common/nav/admin/navComponent';
import { USER_TYPE_LABEL } from "@/components/helper/enum";
import OnlyText from "@/components/common/OnlyText";
import ValidateImage from "@/components/common/ValidateImage";
import { DataTableCustomStyles } from "@/components/helper/dataTable.config";
// import { Apps,UserAppsPermission, UserAdditionalSettings, Employee, Schools  } from "@/models";

export default function CreateUser() {


//   const location = useLocation();

  const { userId } = useParams();
  // ------------- permissions ------
  const [ingredients1, setIngredients1] = useState([]);
  const [ingredients2, setIngredients2] = useState([]);
  const [ingredients3, setIngredients3] = useState([]);
  const [ingredients4, setIngredients4] = useState([]);
  const [allApproverList, setAllApproverList] = useState([]);


//   const [AppsData, setAppsData] = useState(Apps);
  const [btnTitle, setBtnTitle] = useState('Create User');
  const [updated, setUpdated] = useState(false);
  const [userPermission, setUserPermission] = useState([]);
  const [userSubId, setUserSubId] = useState('');


  const onSixPeriodPermissionChange = (e) => {
    let _ingredients1 = [...ingredients1];

    if (e.checked)
      _ingredients1.push(e.value);
    else
      _ingredients1.splice(_ingredients1.indexOf(e.value), 1);

    setIngredients1(_ingredients1);
  }

  const onTimeReportPermissionChange = (e) => {
    let _ingredients2 = [...ingredients2];

    if (e.checked)
      _ingredients2.push(e.value);
    else
      _ingredients2.splice(_ingredients2.indexOf(e.value), 1);

    setIngredients2(_ingredients2);
  }

  const onPersonnelActionPermissionChange = (e) => {
    let _ingredients3 = [...ingredients3];

    if (e.checked)
      _ingredients3.push(e.value);
    else
      _ingredients3.splice(_ingredients3.indexOf(e.value), 1);

    setIngredients3(_ingredients3);
  }


  const onSubReqCertificatedPermissionChange = (e) => {
    let _ingredients4 = [...ingredients4];

    if (e.checked)
      _ingredients4.push(e.value);
    else
      _ingredients4.splice(_ingredients4.indexOf(e.value), 1);

    setIngredients4(_ingredients4);
  }
  // --------------------------------

  const [SPUsersWithoutAdmin, setSPUsersWithoutAdmin] = useState([]);
  // const [allReadyReportingManagerId, setAllReadyReportingManagerId] = useState('');
  const [selectedReportingManager, setSelectedReportingManager] = useState('');


  const [withoutAdminUserList, setWithoutAdminUserList] = useState([]);

  const userList = withoutAdminUserList.map((currentItem) => {
    return (
      { value: currentItem.userId, label: currentItem.name }
    )
  })


  const reportingManagerList = SPUsersWithoutAdmin.map((currentItem) => {
    return (
      { code: currentItem.userId, name: currentItem.name }
    )
  })

  const [payrollUser, setPayrollUserList] = useState([]);

  const payrollList = payrollUser.map((currentItem) => {
    return (
      { value: currentItem.userId, label: currentItem.name }
    )
  })

  //Validate User Logged In
  const [isAuthenticated, userHasAuthenticated] = useState(true);
  const [showPleaseWaitButton, setPleaseWaitButton] = useState(false);
  const [email, setEmail] = useState("");
  const [userCode, setUsercode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState('-');
  const [roleId, setRoleId] = useState("-");
  const [userTypeId, setUserTypeId] = useState("");
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState('');

  // school add
  const [schoolList, setSchoolList] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [profilePicPath, setProfilePicPath] = useState("");
  const [localPicturePath, setLocalPicturePath] = useState("");
  const [l1authority, setL1Authority] = useState('');
  const [l2authority, setL2Authority] = useState('');
  const [userType, setUserType] = useState('-');
  const [users, SetUsersList] = useState([]);
  const [checkedStipendReportInitiator, SetCheckedStipendReportInitiator] = useState(false);
  const [checkedStipendReportApprover, SetCheckedStipendReportApprover] = useState(false);
  const [checkedStipendReportPayroll, SetCheckedStipendReportPayroll] = useState(false);

  const [checkedSubReqClassifiedInitiator, SetCheckedSubReqClassifiedInitiator] = useState(false);
  const [checkedSubReqClassifiedApprover, SetCheckedSubReqClassifiedApprover] = useState(false);
  const [checkedSubReqClassifiedPayroll, SetSubReqClassifiedPayroll] = useState(false);

  const [personnelServiceAgreeInitiator, SetCheckedPersonnelServiceAgreeInitiator] = useState(false);
  const [personnelServiceAgreeApprover, SetCheckedPersonnelServiceAgreeApprover] = useState(false);
  const [personnelServiceAgreePayroll, SetPersonnelServiceAgreePayroll] = useState(false);



  const setSelectedRole = async (selectedRole) => {
    setRole(selectedRole);
    setRoleId(selectedRole.value)
  }

  const setSelectedUserType = async (selectedUserType) => {
    setUserType(selectedUserType ? selectedUserType : '-');
    setUserTypeId(selectedUserType.value)
  }

  userList.map((currentItem) => {
    if (currentItem.value === l1authority) {
      setL1Authority(currentItem);
    }
  })

  payrollList.map((currentItem) => {
    if (currentItem.value === l2authority) {
      setL2Authority(currentItem);
    }
  })

  /*   reportingManagerList.map((currentItem) => {
      if (currentItem.code == selectedReportingManager) {
        setSelectedReportingManager(currentItem);
      }
    }) */

  //SET AWS Configuration
//   AWS.config.update({
//     accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
//     secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
//     region: process.env.REACT_APP_AWS_Region,
//   });


  const redirectBack = async () => {
    setPleaseWaitButton(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    navigateTo("/admin/setting/masters/users");
  }

  const genders = [
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' },
  ];

//   let navigateTo = useNavigate();

  const myProfileImageStyle = {
    borderRadius: "50%",
    width: '100px',
    height: '100px',
    marginLeft: "5px",
  };

  //Create Record
  const saveUser = async () => {

    if (email === "") {
      toast.error("Please enter Email.");
      return;
    }
    else if (selectedSchool == null) {
      toast.error("Please select School/Department");
      return;
    }
    // else if (!ValidateEmail(email)) { toast.error('Invalid email.'); return; }
    else if (role === undefined || role === "-" || role === "") {
      toast.error("Please select Role.");
      return;
    }

    else if (roleId === undefined || roleId === "-" || roleId === "") {
      toast.error("Please select Role.");
      return;
    } else if (firstName === undefined || firstName === "-" || firstName === "") {
      toast.error("Please enter First Name.");
      return;
    } else if (lastNames === undefined || lastNames === "-" || lastNames === "") {
      toast.error("Please enter Last Name.");
      return;
    }
    // else if (mobileNumber === undefined || mobileNumber === "-" || mobileNumber === "") {
    //   toast.error("Please enter mobile Number.");
    //   return;
    // }
    else if (userCode === undefined || userCode === "-" || userCode === "") {
      toast.error("Please enter User Code.");
      return;
    }
    // else if (gender === undefined || gender === "-" || gender === "") {
    //   toast.error("Please select Gender.");
    //   return;
    // }
    // else if (userType === undefined || userType === "-" || userType === "") {
    //   toast.error("Please select User Type.");
    //   return;
    // }
    // else if (l1authority === undefined || l1authority === "-" || l1authority === "") {
    //   toast.error("Please select L1 authority.");
    //   return;
    // }
    // else if (l1authority === undefined || l2authority === "-" || l2authority === "") {
    //   toast.error("Please select L2 authority.");
    //   return;
    // }

    //Edit
    if (userId) {
      const cognito = new AWS.CognitoIdentityServiceProvider();

      let fullName = capitalizeFirstChar(lastNames) + ', ' + firstName.toUpperCase();

      const params = {
        UserPoolId: awsmobile.aws_user_pools_id,
        Username: userId,
        UserAttributes: [
          {
            Name: "name",
            Value: (fullName) ? fullName : '',
          },
          {
            Name: "custom:firstName",
            Value: (firstName) ? firstName.toUpperCase() : '',
          },
          {
            Name: "custom:lastName",
            Value: (lastNames) ? capitalizeFirstChar(lastNames) : '',
          },
          {
            Name: "custom:role",
            Value: (roleId) ? roleId : '-',
          },
          {
            Name: "custom:L1_authoritys",
            Value: (l1authority) ? l1authority.value : '',
          },
          {
            Name: "custom:L2_authoritys",
            Value: (l2authority) ? l2authority.value : '',
          },
          {
            Name: "custom:city",
            Value: (city) ? city : ''
          },
          {
            Name: "custom:userCode",
            Value: (userCode) ? userCode : '',
          },
          {
            Name: "custom:countryId",
            Value: (country) ? country : '',
          },
          {
            Name: "custom:address",
            Value: (address) ? address : '',
          },
          {
            Name: "custom:stateId",
            Value: (state) ? state : '',
          },
          {
            Name: "custom:dateOfBirth",
            Value: (dateOfBirth) ? dateOfBirth : '',
          },
          {
            Name: "custom:userType",
            Value: (userTypeId) ? userTypeId : '-',

          },
          {
            Name: "custom:reportingManagerId",
            Value: (selectedReportingManager.code) ? selectedReportingManager.code : '-',
          },
          {
            Name: "custom:schoolId",
            Value: (selectedSchool.code) ? selectedSchool.code : '-',
          },


          //six period access
          {
            Name: "custom:sixPeriodIsInitiator",
            Value: (ingredients1.includes('I')) ? '1' : '0',
          },
          {
            Name: "custom:sixPeriodIsApprover",
            Value: (ingredients1.includes('A')) ? '1' : '0',
          },
          {
            Name: "custom:sixPeriodIsPayroll",
            Value: (ingredients1.includes('P')) ? '1' : '0',
          },
          {
            Name: "custom:isSixPeriodSAdmin",
            Value: (ingredients1.includes('SA')) ? '1' : '0',
          },

          //time report access
          {
            Name: "custom:timeRIsInitiator",
            Value: (ingredients2.includes('I')) ? '1' : '0',
          },
          {
            Name: "custom:timeRIsApprover",
            Value: (ingredients2.includes('A')) ? '1' : '0',
          },
          {
            Name: "custom:timeRIsPayroll",
            Value: (ingredients2.includes('P')) ? '1' : '0',
          },

          //personnel Action access
          {
            Name: "custom:personnelIsInitiator",
            Value: (ingredients3.includes('I')) ? '1' : '0',
          },
          {
            Name: "custom:personnelIsApprover",
            Value: (ingredients3.includes('A')) ? '1' : '0',
          },
          {
            Name: "custom:personnelIsPayroll",
            Value: (ingredients3.includes('P')) ? '1' : '0',
          },
          {
            Name: "custom:ispersonnelIsAdmin",
            Value: (ingredients3.includes('SA')) ? '1' : '0',
          },

          //sub request certificated
          {
            Name: "custom:certiSubRIsInitiator",
            Value: (ingredients4.includes('I')) ? '1' : '0',
          },
          {
            Name: "custom:certiSubReIsApprover",
            Value: (ingredients4.includes('A')) ? '1' : '0',
          },
          {
            Name: "custom:certiSubReqIsPayroll",
            Value: (ingredients4.includes('P')) ? '1' : '0',
          },

        ],
      };

      try {
        let response = [];
        let listUserAdditionalSettingsData = await API.graphql(graphqlOperation(queries.listUserAdditionalSettings, {
          filter: {
          }, limit: 10000
        }));

        response = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item._deleted !== true);
        response = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item.userId == userSubId);

        if (response.length > 0) {
          // Update record
          const originalUpdated = await API.graphql({
            query: mutations.updateUserAdditionalSettings,
            variables: {
              input: {
                id: response[0].id,
                _version: response[0]._version,
                stipendApprover: checkedStipendReportApprover === true ? '1' : '0',
                stipendInitiator: checkedStipendReportInitiator === true ? '1' : '0',
                stipendPayroll: checkedStipendReportPayroll === true ? '1' : '0',

                //sub classified
                subReqClassifiedInitiator: checkedSubReqClassifiedInitiator === true ? '1' : '0',
                subReqClassifiedApprover: checkedSubReqClassifiedApprover === true ? '1' : '0',
                subReqClassifiedPayroll: checkedSubReqClassifiedPayroll === true ? '1' : '0',

                //personnel service agreement
                personnelServiceAgreeInitiator: personnelServiceAgreeInitiator === true ? '1' : '0',
                personnelServiceAgreeApprover: personnelServiceAgreeApprover === true ? '1' : '0',
                personnelServiceAgreePayroll: personnelServiceAgreePayroll === true ? '1' : '0',

              }
            }
          });

        } else {
          // Create record
          let saveData = await API.graphql(
            graphqlOperation(mutations.createUserAdditionalSettings, {
              input: {
                stipendApprover: checkedStipendReportApprover === true ? '1' : '0',
                stipendInitiator: checkedStipendReportInitiator === true ? '1' : '0',
                stipendPayroll: checkedStipendReportPayroll === true ? '1' : '0',
                userId: userSubId
              }
            })
          );
        }

      }
      catch (error) {
        console.error('Error updating user additional:', error);
      }

      //Employee details updated
      try {

        var empDetails = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));

        var original = await DataStore.query(Employee, empDetails[0].id);

        var updatedUserDetails = await DataStore.save(
          Employee.copyOf(original, (updated) => {
            updated.firstName = firstName.toUpperCase();
            updated.lastName = capitalizeFirstChar(lastNames);
            updated.role = roleId;
            updated.employee_name = capitalizeFirstChar(lastNames) + ', ' + firstName.toUpperCase();
            updated.school_id = selectedSchool?.code;
          })
        );
      } catch (error) {
        console.error('Error updating employee:', error);
      }

      try {
        cognito.adminUpdateUserAttributes(params, function (err, data) {
          navigateTo("/admin/setting/masters/users")
          toast.success("User updated successfully")
         
        });
      } catch (error) {
        console.error('Error updating user attribute:', error);
      }

    }

    else {
      if (password === "") {
        toast.error("Please enter Create Password.");
        return;
      } else if (confirmPassword === "") {
        toast.error("Please enter Confirm Password.");
        return;
      } else if (password !== confirmPassword) {
        toast.error("Confirm Password must match with Create Password.");
        return;
      }
      else if (!OnlyText(firstName)) { toast.error('Enter only alphabets to firstname.'); return; }
      else if (!OnlyText(lastNames)) { toast.error('Enter only alphabets to lastname.'); return; }
      setPleaseWaitButton(true);

      try {
        setPleaseWaitButton(true);
        let userCreated = await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            email: email,
            name: capitalizeFirstChar(lastNames) + ', ' + firstName.toUpperCase(),
            "custom:firstName": firstName.toUpperCase(),
            "custom:lastName": capitalizeFirstChar(lastNames),
            "custom:city": city,
            "custom:gender": gender.name,
            "custom:mobileNumber": mobileNumber,
            "custom:role": roleId ? roleId : '-',
            "custom:address": address,
            "custom:userCode": userCode,
            "custom:stateId": state,
            "custom:dateOfBirth": dateOfBirth,
            "custom:countryId": country,
            "custom:L1_authoritys": (l1authority) ? l1authority.value : '',
            "custom:L2_authoritys": (l2authority) ? l2authority.value : '',
            "custom:userType": userTypeId ? userTypeId : '-',
            "custom:SPReportingManager": selectedReportingManager ? selectedReportingManager.code : '-',
            "custom:reportingManagerId": selectedReportingManager ? selectedReportingManager.code : '-',
            "custom:schoolId": selectedSchool ? selectedSchool.code : '',

            // six period permission
            "custom:sixPeriodIsInitiator": (ingredients1.includes('I')) ? '1' : '0',
            "custom:sixPeriodIsApprover": (ingredients1.includes('A')) ? '1' : '0',
            "custom:sixPeriodIsPayroll": (ingredients1.includes('P')) ? '1' : '0',
            "custom:isSixPeriodSAdmin": (ingredients1.includes('SA')) ? '1' : '0',
            // personnel action permission 
            "custom:personnelIsInitiator": (ingredients3.includes('I')) ? '1' : '0',
            "custom:personnelIsApprover": (ingredients3.includes('A')) ? '1' : '0',
            "custom:personnelIsPayroll": (ingredients3.includes('P')) ? '1' : '0',
            "custom:ispersonnelIsAdmin": (ingredients3.includes('SA')) ? '1' : '0',

            // "custom:personnelActionIsInitiator": (ingredients3.includes('I')) ? '1' : '0',
            // "custom:personnelActionIsApprover": (ingredients3.includes('A')) ? '1' : '0',
            // "custom:personnelActionIsPayroll": (ingredients3.includes('P')) ? '1' : '0',
            // "custom:ispersonnelActionIsAdmin": (ingredients3.includes('SA')) ? '1' : '0',
            // time report permission
            "custom:timeRIsInitiator": (ingredients2.includes('I')) ? '1' : '0',
            "custom:timeRIsApprover": (ingredients2.includes('A')) ? '1' : '0',
            "custom:timeRIsPayroll": (ingredients2.includes('P')) ? '1' : '0',
            "custom:timeRIsSAdmin": (ingredients2.includes('SA')) ? '1' : '0',

            //sub request certificated permission
            "custom:certiSubRIsInitiator": (ingredients4.includes('I')) ? '1' : '0',
            "custom:certiSubReIsApprover": (ingredients4.includes('A')) ? '1' : '0',
            "custom:certiSubReqIsPayroll": (ingredients4.includes('P')) ? '1' : '0',
          },
          autoSignIn: {
            // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
        });

        let createdUserId = userCreated.userSub


        //Profile Upload
        if (createdUserId.length !== 0) {
          const fileName = '/profile/' + createdUserId + '/profile.jpeg';
          if (profilePicPath) {
            try {
              await Storage.put(fileName, profilePicPath, {
                resumable: true,
                errorCallback: (err) => {
                  toast.error(err.message)

                }
              })
            } catch (error) {
              // goBack()
              redirectBack()
            }
          }
        }

        // Save user permission
        if (userPermission.length !== 0) {

          userPermission.map(async (item) => {
            // Create record
            let saveData = await API.graphql(
              graphqlOperation(mutations.createUserAppsPermission, {
                input: {
                  UserId: createdUserId,
                  AppId: item.name,
                }
              })
            );
          })
        }

        // Save user additional data
        let saveUserAdditionalData = await API.graphql(
          graphqlOperation(mutations.createUserAdditionalSettings, {
            input: {
              stipendApprover: checkedStipendReportApprover === true ? '1' : '0',
              stipendInitiator: checkedStipendReportInitiator === true ? '1' : '0',
              stipendPayroll: checkedStipendReportPayroll === true ? '1' : '0',

              //sub classified
              subReqClassifiedInitiator: checkedSubReqClassifiedInitiator === true ? '1' : '0',
              subReqClassifiedApprover: checkedSubReqClassifiedApprover === true ? '1' : '0',
              subReqClassifiedPayroll: checkedSubReqClassifiedPayroll === true ? '1' : '0',


              //personnel service agreement
              personnelServiceAgreeInitiator: personnelServiceAgreeInitiator === true ? '1' : '0',
              personnelServiceAgreeApprover: personnelServiceAgreeApprover === true ? '1' : '0',
              personnelServiceAgreePayroll: personnelServiceAgreePayroll === true ? '1' : '0',

              userId: createdUserId
            }
          })
        );

        if (createdUserId) {
          var newEmployeeResponse = await DataStore.save(
            new Employee({
              "employee_name": capitalizeFirstChar(lastNames) + ', ' + firstName.toUpperCase(),
              "firstName": firstName.toUpperCase(),
              "lastName": capitalizeFirstChar(lastNames),
              "phone_no": mobileNumber ? mobileNumber : '',
              "email": email,
              "address_1": address ? address : '',
              "address_2": '',
              "city": city ? city : '',
              "zip_code": '',
              "state": state,
              "country": country,
              "employee_code": userCode,
              "school_id": selectedSchool?.code,
              "employeeType": userTypeId && userTypeId === 'Ad' ? 'Administrator' : userTypeId && userTypeId === 'Ce' ? 'Certificated' : userTypeId && userTypeId === 'Cl' ? 'Classified' : '-',
              "role": roleId ? roleId : '-',
              "user_Id": createdUserId,
            })
          );
        }

        //Here we are going to send welcome email
        setUserPermission([]);
        // SendWelcomeEmailToUser(role, firstName, email, password);
        toast.success("Email verification sent to user.");
        navigateTo("/admin/setting/masters/users");

      } catch (e) {
        setPleaseWaitButton(false);
        switch (e.message) {
          case 'Password did not conform with policy: Password not long enough':
            toast.error(e.message);
            break;
          default:
            toast.error(e.message);
        }
      }
    }
  };

  const browseProfilePic = () => {
    document.getElementById('fileProfilePic').click()
  }

  async function changeProfilePicture(e) {
    let file = e.target.files[0];
    if (file.name) {
      if (!ValidateImage(file.name)) {
        toast.error('select only image.'); return;
      } else {
        setProfilePicPath(file)
        setLocalPicturePath(URL.createObjectURL(file))
      }
    }

  }

  //State
  const [userApps, setUserApps] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  //*Column Name
  const DataTableColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      selector: (row) => row.isGranted,
      name: "Permission",
      cell: (row) => (
        <>
          {
            (updated === true) ?
              <div className="flex gap-8">
                <input type="checkbox" style={{ width: 20 }} defaultChecked={row.isGranted} id={row.name} onClick={() => UpdateUserPermissions(row.name)} className="checkbox" />
              </div> : <div className="flex gap-8">
                <input type="checkbox" style={{ width: 20 }} defaultChecked={row.isGranted} id={row.name} onClick={() => Grant_Revoke_UserPermissions(row.name)} className="checkbox" />
              </div>
          }

        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true
    },
  ];


  const onStipendReportPermissionChangeI = async (userType) => {
    var stipendreportI = document.getElementById('stipendreportI');
    if (stipendreportI.checked && userType === 'I') {
      SetCheckedStipendReportInitiator(false);
    } else {
      SetCheckedStipendReportInitiator(true);
    }
  }

  const onStipendReportPermissionChangeA = async (userType) => {
    var stipendreportA = document.getElementById('stipendreportA');
    if (stipendreportA.checked && userType === 'A') {
      SetCheckedStipendReportApprover(false);
    } else {
      SetCheckedStipendReportApprover(true);
    }
  }

  const onStipendReportPermissionChangeP = async (userType) => {
    var stipendreportP = document.getElementById('stipendreportP');
    if (stipendreportP.checked && userType === 'P') {
      SetCheckedStipendReportPayroll(false);
    } else {
      SetCheckedStipendReportPayroll(true);
    }
  }

  const UpdateUserPermissions = async (appId) => {
    // const userSubId = location.state.userSubId ? location.state.userSubId : userSubId;
    const userSubId =userSubId;
    var checkBox = document.getElementById(appId);

    if (checkBox.checked) {
      // Create record
      let saveData = await API.graphql(
        graphqlOperation(mutations.createUserAppsPermission, {
          input: {
            UserId: userSubId,
            AppId: appId,
          }
        })
      );

    } else {

      let response = [];
      let listUserAppsPermissionsData = await API.graphql(graphqlOperation(queries.listUserAppsPermissions, {
        filter: { AppId: { eq: appId } }, limit: 10000
      }));

      response = listUserAppsPermissionsData.data.listUserAppsPermissions.items.filter(item => item._deleted !== true);
      response = listUserAppsPermissionsData.data.listUserAppsPermissions.items.filter(item => item.UserId == userSubId);

      if (response.length > 0) {
        const originalUpdated = await API.graphql({
          query: mutations.deleteUserAppsPermission,
          variables: {
            input: {
              id: response[0].id,
              _version: response[0]._version,
            }
          }
        });
      }
    }
    BindList(userSubId)
  }

  const Grant_Revoke_UserPermissions = async (appId) => {
    // const userId = location.state.userId ? location.state.userId : userId;
    let appIdArray = [...userPermission];
    appIdArray.push({ 'name': appId })
    setUserPermission(appIdArray)
  }


  //sub req classified 
  const onSubReqClassifiedPermissionChangeI = async (userType) => {
    var subRequestClassifiedI = document.getElementById('subRequestClassifiedI');
    if (subRequestClassifiedI.checked && userType === 'I') {
      SetCheckedSubReqClassifiedInitiator(false);
    } else {
      SetCheckedSubReqClassifiedInitiator(true);
    }
  }

  const onSubReqClassifiedPermissionChangeA = async (userType) => {
    var subRequestClassifiedA = document.getElementById('subRequestClassifiedA');
    if (subRequestClassifiedA.checked && userType === 'A') {
      SetCheckedSubReqClassifiedApprover(false);
    } else {
      SetCheckedSubReqClassifiedApprover(true);
    }
  }

  const onSubReqClassifiedPermissionChangeP = async (userType) => {
    var subRequestClassifiedP = document.getElementById('subRequestClassifiedP');
    if (subRequestClassifiedP.checked && userType === 'P') {
      SetSubReqClassifiedPayroll(false);
    } else {
      SetSubReqClassifiedPayroll(true);
    }
  }


  //Personnel Service Agreement
  const onPersonnelServiceAgreePermissionChangeI = async (userType) => {
    var personnelServiceAgreeI = document.getElementById('personnelServiceAgreeI');
    if (personnelServiceAgreeI.checked && userType === 'I') {
      SetCheckedPersonnelServiceAgreeInitiator(false);
    } else {
      SetCheckedPersonnelServiceAgreeInitiator(true);
    }
  }

  const onPersonnelServiceAgreePermissionChangeA = async (userType) => {
    var personnelServiceAgreeA = document.getElementById('personnelServiceAgreeA');
    if (personnelServiceAgreeA.checked && userType === 'A') {
      SetCheckedPersonnelServiceAgreeApprover(false);
    } else {
      SetCheckedPersonnelServiceAgreeApprover(true);
    }
  }

  const onPersonnelServiceAgreePermissionChangeP = async (userType) => {
    var personnelServiceAgreeP = document.getElementById('personnelServiceAgreeP');
    if (personnelServiceAgreeP.checked && userType === 'P') {
      SetPersonnelServiceAgreePayroll(false);
    } else {
      SetPersonnelServiceAgreePayroll(true);
    }
  }

  async function BindList(userNewId, selectedReportingManagerId) {
    let updatedData = [];
    let appIdArray = [...userPermission];
    const keys = Object.keys(AppsData)

    let getGrantedAppsPermsOfUserResponse = [];
    let nextToken4 = null;
    let hasMoreData = true;
    while (hasMoreData) {
      const result2 = await API.graphql(graphqlOperation(queries.listUserAppsPermissions, { filter: { UserId: { eq: userNewId } }, limit: 1000, nextToken: nextToken4 }));
      const { items, nextToken: newNextToken } = result2.data.listUserAppsPermissions;

      getGrantedAppsPermsOfUserResponse = [...getGrantedAppsPermsOfUserResponse, ...items];
      nextToken4 = newNextToken;
      hasMoreData = nextToken4 !== null && nextToken4 !== undefined ? nextToken4 : false;
    }
    getGrantedAppsPermsOfUserResponse = getGrantedAppsPermsOfUserResponse.filter(item => item._deleted !== true);

    if (getGrantedAppsPermsOfUserResponse.length > 0) {
      for (let i = 0; i < getGrantedAppsPermsOfUserResponse.length; i++) {
        appIdArray.push({ 'name': getGrantedAppsPermsOfUserResponse[i].AppId })
        setUserPermission(appIdArray)
      }

    }

    keys.forEach((key, index) => {
      let exist = getGrantedAppsPermsOfUserResponse?.find((item) => item.AppId === key);
      try {
        if (exist) {
          updatedData.push({ "id": index + 1, 'name': key, 'isGranted': true })
        } else {
          updatedData.push({ "id": index + 1, 'name': key, 'isGranted': false })
        }
      }
      catch (e) {
      }
    })
    setUserApps(updatedData)

    let existingUserAdditionalSettingsDataResults = [];

    let listUserAdditionalSettingsData = await API.graphql(graphqlOperation(queries.listUserAdditionalSettings, {
      filter: {
      }, limit: 10000
    }));


    existingUserAdditionalSettingsDataResults = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item._deleted !== true);
    existingUserAdditionalSettingsDataResults = listUserAdditionalSettingsData.data.listUserAdditionalSettings.items.filter(item => item.userId == userNewId);


    if (existingUserAdditionalSettingsDataResults.length > 0) {
      if (existingUserAdditionalSettingsDataResults[0].stipendApprover === '1') {
        SetCheckedStipendReportApprover(true);
      }
      if (existingUserAdditionalSettingsDataResults[0].stipendInitiator === '1') {
        SetCheckedStipendReportInitiator(true);
      } if (existingUserAdditionalSettingsDataResults[0].stipendPayroll === '1') {
        SetCheckedStipendReportPayroll(true);
      }

      //sub req classfied 
      if (existingUserAdditionalSettingsDataResults[0].subReqClassifiedApprover === '1') {
        SetCheckedSubReqClassifiedApprover(true);
      }
      if (existingUserAdditionalSettingsDataResults[0].subReqClassifiedInitiator === '1') {
        SetCheckedSubReqClassifiedInitiator(true);
      } if (existingUserAdditionalSettingsDataResults[0].subReqClassifiedPayroll === '1') {
        SetSubReqClassifiedPayroll(true);
      }


      //Personnel service Agreement
      if (existingUserAdditionalSettingsDataResults[0].personnelServiceAgreeApprover === '1') {
        SetCheckedPersonnelServiceAgreeApprover(true);
      }
      if (existingUserAdditionalSettingsDataResults[0].personnelServiceAgreeInitiator === '1') {
        SetCheckedPersonnelServiceAgreeInitiator(true);
      } if (existingUserAdditionalSettingsDataResults[0].personnelServiceAgreePayroll === '1') {
        SetPersonnelServiceAgreePayroll(true);
      }
    }

    let empName = await DataStore.query(Employee, (c) => c.user_Id.eq(selectedReportingManagerId));
    let name = empName[0].employee_code ? `${empName[0].employee_name} (${empName[0].employee_code})` : empName[0].employee_name;

    let objFirst = { name: name, code: selectedReportingManagerId }
    setSelectedReportingManager(objFirst)
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      if (!ValidateAdminRole()) { userHasAuthenticated(false); }


    } catch (e) {
      userHasAuthenticated(false);
    }
  }

  async function setUserList(e) {
    try {
      var employeeResponses = await DataStore.query(Employee, (c) => c.role.eq(USER_TYPES.APPROVER),
        {
          sort: s => s.employee_name(SortDirection.ASCENDING),
        }
      );

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
          setAllApproverList(employee)
        } else {
          setAllApproverList(employee)
        }


      }
    }
    catch (error) {
    }
  }


  async function LoadUsers() {

    try {
      const cognito = new AWS.CognitoIdentityServiceProvider();

      var params =
      {
        UserPoolId: awsmobile.aws_user_pools_id,
        Limit: 60
      };

      ///fetch users
      try {
        const data = await cognito.listUsers(params).promise();

        var newRes = []
        let userRole = '', userName = '', userEmail = '', userCode = '', sub = '';
        data.Users.forEach((user, i) => {
          sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
          userRole = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
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

        let usersWithoutAdmin = [];
        newRes.map((currentItem) => {
          if (currentItem.role !== 'Admin') {
            usersWithoutAdmin.push(currentItem);
          }
        })
        setSPUsersWithoutAdmin(usersWithoutAdmin);
      } catch (err) {
      }
      //-------------

      cognito.listUsers(params, (err, data) => {
        if (err) {
          toast.error(err.message);
        } else {

          const roles = [];
          var newRes = []
          var role = "";
          var sub = "";
          var name = "";
          var email = "";
          var usercode = "";
          let withoutAdminUsers = [];
          let payrollUser = []

          data.Users.forEach((user, i) => {
            sub = user.Attributes.find(attr => attr.Name === "sub")?.Value;
            role = user.Attributes.find(attr => attr.Name === "custom:role")?.Value;
            name = user.Attributes.find(attr => attr.Name === "name")?.Value;
            email = user.Attributes.find(attr => attr.Name === "email")?.Value;
            usercode = user.Attributes.find(attr => attr.Name === "custom:userCode")?.Value;
            let newUser = {
              "userId": sub,
              "name": name,
              "email": email,
              "usercode": usercode,
              "role": role === USER_TYPES.ADMIN ? USER_TYPES_NAMES.A : role === USER_TYPES.APPROVER ? USER_TYPES_NAMES.AP : role === USER_TYPES.PAYROLL ? USER_TYPES_NAMES.P : USER_TYPES_NAMES.I,
            }
            newRes.push(newUser);

            if (i === data.Users.length - 1) {

              for (let i = 0; i < newRes.length; i++) {
                const user = newRes[i];
                const roleIndex = roles.findIndex(role => role.role === user.role);


                if (roleIndex === -1) {
                  roles.push({ role: user.role, count: 1, users: [user], email: user.email, name: user.name, usercode: user.usercode });
                } else {
                  roles[roleIndex].count++;
                  roles[roleIndex].users.push(user);
                }
              }
            }

            if (role === USER_TYPES.APPROVER) {
              let userObj = {
                "userId": sub,
                "name": name,
                "email": email,
                "usercode": usercode,
                "role": role
              }
              withoutAdminUsers.push(userObj);
            }

            if (role === USER_TYPES.PAYROLL) {
              let userObjs = {
                "userId": sub,
                "name": name,
                "email": email,
                "usercode": usercode,
                "role": role
              }
              payrollUser.push(userObjs);
            }
          });
          SetUsersList(roles);
          setPayrollUserList(payrollUser);
          setWithoutAdminUserList(withoutAdminUsers);
        }
      });

    } catch (e) {
      toast.error(e.message);
    }

  }

  async function fetchSchool() {
    try {
      var schoolResponses = await DataStore.query(Schools, Predicates.ALL, {
        sort: s => s.name(SortDirection.ASCENDING)
      });
      if (schoolResponses) {
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
    }
  }

  async function fetchSchoolFromId(selectedSchoolId) {
    //then fetch particular employee school start
    var schoolResponses = await DataStore.query(Schools, (c) => c.id.eq(selectedSchoolId));
    if (schoolResponses) {
      let objFirst2 = { name: schoolResponses[0]?.name, code: schoolResponses[0]?.id }
      setSelectedSchool(objFirst2);
    }
  }

  useEffect(() => {
    LoadUsers();
    fetchSchool();
    setUserList();
    // const keys = Object.keys(AppsData)
    // let updatedData = [];
    // keys.forEach((key, index) => {
    //   updatedData.push({ "id": index + 1, 'name': key, 'isGranted': false })
    // })

    // setUserApps(updatedData)

    if (userId) {

      try {
        // const selectedReportingManagerId = location.state.reportingManagerId ? location.state.reportingManagerId : '-';
        // const selectedSchoolId = (location.state.schoolId) ? location.state.schoolId : ""
        fetchSchoolFromId(selectedSchoolId);




        // BindList(location.state.userSubId, selectedReportingManagerId);
        // setUserSubId(location.state.userSubId)

        setUpdated(true);
        // const selectedUserFirstName = location.state.firstName;
        // const selectedUserLastName = location.state.lastName;
        // const selectedUserEmail = location.state.email;
        // const selectedUserCode = location.state.UserCode;
        // const selectedMobileNumber = location.state.mobileNumber;
        // const selectedGender = location.state.gender;
        // const selectedAddress = location.state.address;
        // const selectedCountry = location.state.country;
        // const selectedState = location.state.state;
        // const selectedCity = location.state.city;
        // const selectedBirthDate = location.state.birthDate;
        // const selectedRoleId = location.state.role;
        // const selectedL1Authority = location.state.l1authority;
        // const selectedL2Authority = location.state.l2authority;
        // const selectedUserTypeId = location.state.userType;
        // const selectedSPReportingManager = location.state.SPReportingManager;
        // const selectedSixPeriodIsInitiator = location.state.sixPeriodIsInitiator;
        // const selectedSixPeriodIsApprover = location.state.sixPeriodIsApprover;
        // const selectedSixPeriodIsPayroll = location.state.sixPeriodIsPayroll;
        // const selectedSixPeriodIsSuperadmin = location.state.sixPeriodIsSuperadmin;
        // const selectedpersonnelActionIsInitiator = location.state.personnelActionIsInitiator;
        // const selectedpersonnelActionIsApprover = location.state.personnelActionIsApprover;
        // const selectedpersonnelActionIsPayroll = location.state.personnelActionIsPayroll;
        // const selectedpersonnelActionIsSuperadmin = location.state.personnelActionIsSuperadmin;

        let sixPeriodAccess = [];
        if (selectedSixPeriodIsInitiator == 1) {
          sixPeriodAccess.push('I');
        }
        if (selectedSixPeriodIsApprover == 1) {
          sixPeriodAccess.push('A');
        }
        if (selectedSixPeriodIsPayroll == 1) {
          sixPeriodAccess.push('P');
        }
        if (selectedSixPeriodIsSuperadmin == 1) {
          sixPeriodAccess.push('SA');
        }
        if (sixPeriodAccess.length > 0) {
          setIngredients1(sixPeriodAccess);
        }


        //Time Report
        // const selectedtimeRIsInitiator = location.state.timeRIsInitiator;
        // const selectedtimeRIsApprover = location.state.timeRIsApprover;
        // const selectedtimeRIsPayroll = location.state.timeRIsPayroll;

        let timeReportAccess = [];
        if (selectedtimeRIsInitiator == 1) {
          timeReportAccess.push('I');
        }
        if (selectedtimeRIsApprover == 1) {
          timeReportAccess.push('A');
        }
        if (selectedtimeRIsPayroll == 1) {
          timeReportAccess.push('P');
        }
        if (timeReportAccess.length > 0) {
          setIngredients2(timeReportAccess);
        }

        //personnel action form access 
        // const selectedPersonnelActionFIsInitiator = location.state.personnelIsInitiator;
        // const selectedPersonnelActionFIsApprover = location.state.personnelIsApprover;
        // const selectedPersonnelActionFIsPayroll = location.state.personnelIsPayroll;
        // const selectedpersonnelActionIsSuperadmin = location.state.ispersonnelIsAdmin;

        let personnelActionFormAccess = [];
        if (selectedPersonnelActionFIsInitiator == 1) {
          personnelActionFormAccess.push('I');
        }
        if (selectedPersonnelActionFIsApprover == 1) {
          personnelActionFormAccess.push('A');
        }
        if (selectedPersonnelActionFIsPayroll == 1) {
          personnelActionFormAccess.push('P');
        }
        if (selectedpersonnelActionIsSuperadmin == 1) {
          personnelActionFormAccess.push('SA');
        }
        if (personnelActionFormAccess.length > 0) {
          setIngredients3(personnelActionFormAccess);
        }

        //sub req certificated
        // const selectedSubReqCertificatedIsInitiator = location.state.certiSubRIsInitiator;
        // const selectedSubReqCertificatedIsApprover = location.state.certiSubReIsApprover;
        // const selectedSubReqCertificatedIsPayroll = location.state.certiSubReqIsPayroll;



        let subReqCertificatedAccess = [];
        if (selectedSubReqCertificatedIsInitiator == 1) {
          subReqCertificatedAccess.push('I');
        }
        if (selectedSubReqCertificatedIsApprover == 1) {
          subReqCertificatedAccess.push('A');
        }
        if (selectedSubReqCertificatedIsPayroll == 1) {
          subReqCertificatedAccess.push('P');
        }
        if (subReqCertificatedAccess.length > 0) {
          setIngredients4(subReqCertificatedAccess);
        }

        // let personnelActionAccess = [];
        // if (selectedpersonnelActionIsInitiator == 1) {
        //   sixPeriodAccess.push('I');
        // }
        // if (selectedpersonnelActionIsApprover == 1) {
        //   sixPeriodAccess.push('A');
        // }
        // if (selectedpersonnelActionIsPayroll == 1) {
        //   sixPeriodAccess.push('P');
        // }
        // if (selectedpersonnelActionIsSuperadmin == 1) {
        //   sixPeriodAccess.push('SA');
        // }
        // if (personnelActionAccess.length > 0) {
        //   setIngredients1(personnelActionAccess);
        // }




        //Selected Role
        var findRoleIndex = USER_TYPE_LABEL.findIndex(p => p.value === selectedRoleId);
        var selectedRoleItem = USER_TYPE_LABEL[findRoleIndex];
        setRole(selectedRoleItem)
        setRoleId(selectedRoleId);


        //Selected Type
        var findUserTypeIndex = USER_EMPLOYEE_TYPES.findIndex(p => p.value === selectedUserTypeId);
        var selectedUserTypeItem = USER_EMPLOYEE_TYPES[findUserTypeIndex];
        setUserType(selectedUserTypeItem)
        setUserTypeId(selectedUserTypeId);


        setL1Authority(selectedL1Authority)
        setL2Authority(selectedL2Authority)
        setBtnTitle('Edit User')

        if (selectedGender === "Male") {
          setGender({ name: "Male", code: "Male" })
        } else {
          setGender({ name: "Female", code: "Female" })
        }


        // if (selectedRole == 'A') {
        //   setRole({ value: selectedRole, label: "Admin" });
        // }
        // if (selectedRole == 'U') {
        //   setRole('REQUESTOR');
        // }
        // if (selectedRole == 'I') {
        //   setRole('INTERPRETER');
        // }
        // if (selectedRole == 'P') {
        //   setRole({ value: selectedRole, label: "Admin" });
        // }

        setFirstName(selectedUserFirstName);
        setLastNames(selectedUserLastName);
        setEmail(selectedUserEmail);
        setUsercode(selectedUserCode);
        setMobileNumber(selectedMobileNumber)
        setAddress(selectedAddress)
        setCountry(selectedCountry)
        setState(selectedState)
        setCity(selectedCity)
        setDateOfBirth(selectedBirthDate)

      } catch (err) {
      }
    }
  }, [userId]);



  /*  useEffect(() => {
   })
  */

  return (
    <Layout pageTitle="Dashboard">
      <div>
        <div className="xl:h-full lg:h-full md:h-full 2xl:h-full bg-body-blue">

          <div className="pl-16 pdTopPopup">
            <div className="flex grid flex-row flex-wrap justify-center flex-1 gap-4 p-5 pl-5 pr-5  align-center 2xl:grid-cols-8 xl:grid-cols-10 lg:grid-cols-8 sm:grid-cols-1 contract-grid-wrapper">
              <div className="col-span-6 col-start-3 lg:col-start-3 xl:col-start-3 2xl:col-start-2">
                <div className="p-3 py-5 bg-white rounded-md shadow dark:bg-[#252423]">
                  <div className="flex justify-center mb-2">
                    <h2 className="page-title">
                      {btnTitle}
                    </h2>
                  </div>
                  <div x-data="{tab: 1}"></div>

                  <TabView>
                    <TabPanel header="User Information">
                      <div className={"block w-full"}>
                        <div className="px-4" x-show="tab === 1">
                          <div className="flex grid flex-row flex-wrap flex-1 mb-2 align-center 2xl:grid-cols-2 xl:grid-cols- lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4">
                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                User Code
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              <input
                                value={userCode}
                                onChange={(e) => setUsercode(e.target.value)}
                                type="text"
                                className="text-[16px] rounded-lg   border border-[#D0D5DD] py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 w-full placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter User Code"
                              />
                            </div>

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8] mb-2">
                                Reporting Manager
                              </label>
                              <Dropdown value={selectedReportingManager ? selectedReportingManager : '-'} onChange={(e) => setSelectedReportingManager(e.value)} options={allApproverList} optionLabel="name"
                                onKeyDown={e => {
                                  setUserList(e)
                                }}
                                filter
                                placeholder="Select a Reporting Manager" className="w-full md:w-14rem" />
                            </div>

                            {
                              userId === undefined ? <div className="relative mb-4">
                                <label
                                  className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]"
                                >
                                  Email
                                  <label
                                    className="text-[#FF0000] text-[14px] font-medium"
                                  >
                                    *{" "}
                                  </label>
                                </label>
                                <input
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="text"
                                  className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                  placeholder="Enter Email"
                                />
                              </div> :
                                <div className="relative mb-4">
                                  <label
                                    className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]"
                                  >
                                    Email
                                    <label
                                      className="text-[#FF0000] text-[14px] font-medium"
                                    >
                                      *{" "}
                                    </label>
                                  </label>
                                  <input
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                    placeholder="Enter Email"
                                  />
                                </div>
                            }

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                Role
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              <Select
                                options={USER_TYPE_LABEL}
                                value={role}
                                onChange={(e) => {
                                  setSelectedRole(e);
                                }}
                                className="mt-1.5"
                                maxMenuHeight={200}
                                placeholder="Role"
                              />

                              {/* 
                          <Dropdown value={role} onChange={(e) => setRole(e.value)} options={USER_TYPE_CODE} optionLabel="name"
                            placeholder="Select Role" className="w-full md:w-14rem mt-1.5" /> */}
                            </div>

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                L1 Authority
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              <Select
                                value={l1authority}
                                options={userList}
                                onChange={(e) => {
                                  setL1Authority(e.value);
                                }} className="mt-1.5"
                                maxMenuHeight={200}
                                placeholder="Select L1 Authority"
                              />

                              {/* 
                          <Dropdown value={role} onChange={(e) => setRole(e.value)} options={USER_TYPE_CODE} optionLabel="name"
                            placeholder="Select Role" className="w-full md:w-14rem mt-1.5" /> */}
                            </div>


                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                L2 Authority
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              <Select
                                options={payrollList}
                                value={l2authority}
                                onChange={(e) => {
                                  setL2Authority(e.value);
                                }} className="mt-1.5"
                                maxMenuHeight={200}
                                placeholder="Select L2 Authority"
                              />

                              {/* 
                          <Dropdown value={role} onChange={(e) => setRole(e.value)} options={USER_TYPE_CODE} optionLabel="name"
                            placeholder="Select Role" className="w-full md:w-14rem mt-1.5" /> */}
                            </div>



                          </div>

                          <div className="flex grid flex-row flex-wrap flex-1 mb-2 align-center 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4">
                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                First Name<label className="text-[#FF0000] text-[14px] font-medium">*{" "}</label>
                              </label>
                              <input

                                value={(firstName)}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter First Name"
                              />
                            </div>

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                Last Name
                                <label className="text-[#FF0000] text-[14px] font-medium">*{" "}</label>
                              </label>
                              <input


                                type="text"
                                className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter Last Name"
                                value={(lastNames)}
                                onChange={(e) => setLastNames(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="flex grid flex-row flex-wrap flex-1  align-center 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4">
                            <div className="relative mb-4">
                              <label
                                className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]"
                              >
                                Create Password
                                <label
                                  className="text-[#FF0000] text-[14px] font-medium"
                                >
                                  *{" "}
                                </label>
                              </label>
                              <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter Create Password"
                              />
                            </div>
                            <div className="relative mb-4">
                              <label
                                className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]"
                              >
                                Confirm Password
                                <label
                                  className="text-[#FF0000] text-[14px] font-medium"
                                >
                                  *{" "}
                                </label>
                              </label>
                              <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter Password"
                              />
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
                                  setSelectedUserType(e)
                                }} className="mt-1.5"
                                options={USER_EMPLOYEE_TYPES}
                                maxMenuHeight={200}
                                placeholder="Select User Type"
                              />

                            </div>


                            <div className="relative mb-4">
                              <label
                                className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]"
                              >
                                Mobile Number
                                {/*  <label
                                  className="text-[#FF0000] text-[14px] font-medium"
                                >
                                  *{" "}
                                </label> */}
                              </label>

                              <PhoneInput
                                enableSearch
                                buttonStyle={{ background: 'transparent', borderWidth: 0 }}
                                inputStyle={{ borderWidth: 0, fontSize: 16, background: 'transparent' }}
                                className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-1 mt-1 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#8E8E8E]"
                                country={"us"}
                                value={mobileNumber}
                                onChange={(phone) => setMobileNumber("+" + phone)}
                              />
                            </div>

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                Gender
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              {/* <Select
                            options={genders}
                            onChange={(e) => {
                              setGender(e.value);
                            }} className=""
                            maxMenuHeight={200}
                            placeholder="Role"
                          /> */}
                              <Dropdown
                                value={gender}
                                onChange={(e) => setGender(e.value)}
                                options={genders} optionLabel="name"
                                placeholder="Select Gender" className="w-full md:w-14rem mt-1.5" />
                            </div>

                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                Address
                                <label className="text-[#FF0000] text-[14px] font-medium">*{" "}</label>
                              </label>
                              <input

                                value={(address)}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                className="text-[16px] rounded-lg  flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                placeholder="Enter Address"
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
                                //defaultOptionLabel="Select State"
                                country={country}
                                value={state}
                                onChange={(val) => setState(val)}
                                className="rounded-lg border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                              />
                            </div>


                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
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

                            <div className="relative mb-4 ">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#F8F8F8]">
                                Date Of Birth
                                <label className="text-[#FF0000] text-[14px] font-medium">
                                  *{" "}
                                </label>
                              </label>
                              <InputText type={"date"} value={dateOfBirth} onChange={(e) => {
                                setDateOfBirth(e.target.value)
                              }} placeholder="MM/DD/YYYY" className="w-full py-[8px] px-[16px] mt-[7px] text-[16px]" style={{padding:"8px 16px", marginTop:"7px" , fontSize:"16px"}}/>
                            </div>

                            {/* Add School dropdown */}
                            <div className="relative mb-4">
                              <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                School/Department<label className="text-[#FF0000] text-[14px] font-medium">*{" "}</label>
                              </label>
                              <Dropdown value={selectedSchool} onChange={(e) => setSelectedSchool(e.value)}
                                options={schoolList}
                                optionLabel="name"
                                placeholder="Select a School/Dept." className="w-full md:w-14rem" />
                            </div>

                          </div>

                          <div className="ml-[41%]">
                            <Image
                              src="/assets/images/defaultProfile.jpg" width="100px" height="100px"
                            />
                            <button
                              onClick={browseProfilePic}
                              className=" py-1 px-3 bg-[#f2f2f2] text-[#000] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md mb-6"
                            >
                              {"Browse Picture"}
                              <input hidden id="fileProfilePic" type="file"
                                onChange={changeProfilePicture}
                              />
                            </button>

                          </div>


                          {/* <div className="grow flex justify-center gap-3 mb-3">
                            <Link
                              to="/admin/setting/masters/users"
                              className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:text-[#FFFFFF] dark:border-[#333231]"
                            >
                              Cancel
                            </Link>
                            <button
                              onClick={() => saveUser()}
                              className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md bg-[#113699]"
                            >
                              {showPleaseWaitButton ? "Please wait..." : userId ? "Update" : "Submit"}
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel header="Form Permissions">
                      <div>
                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Sixth Period Form</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient1" name="pizza" value="I" onChange={onSixPeriodPermissionChange} checked={ingredients1.includes('I')} />
                              <label htmlFor="ingredient1" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient2" name="pizza" value="A" onChange={onSixPeriodPermissionChange} checked={ingredients1.includes('A')} />
                              <label htmlFor="ingredient2" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient3" name="pizza" value="P" onChange={onSixPeriodPermissionChange} checked={ingredients1.includes('P')} />
                              <label htmlFor="ingredient3" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Time Report Form</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient1" name="timereport" value="I" onChange={onTimeReportPermissionChange} checked={ingredients2.includes('I')} />
                              <label htmlFor="ingredient1" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient2" name="timereport" value="A" onChange={onTimeReportPermissionChange} checked={ingredients2.includes('A')} />
                              <label htmlFor="ingredient2" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient3" name="timereport" value="P" onChange={onTimeReportPermissionChange} checked={ingredients2.includes('P')} />
                              <label htmlFor="ingredient3" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Stipend Form</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="stipendreportI" name="stipendreportI" value="I"
                                onChange={(e) => onStipendReportPermissionChangeI('I')} checked={checkedStipendReportInitiator} />
                              <label htmlFor="stipendreportI" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="stipendreportA" name="stipendreportA" value="A"
                                onChange={(e) => onStipendReportPermissionChangeA('A')} checked={checkedStipendReportApprover} />
                              <label htmlFor="stipendreportA" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="stipendreportP" name="stipendreportP" value="P"
                                onChange={(e) => onStipendReportPermissionChangeP('P')} checked={checkedStipendReportPayroll} />
                              <label htmlFor="stipendreportP" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>



                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Personal Action Form</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient1" name="personalActionForm" value="I" onChange={onPersonnelActionPermissionChange} checked={ingredients3.includes('I')} />
                              <label htmlFor="ingredient1" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient2" name="personalActionForm" value="A" onChange={onPersonnelActionPermissionChange} checked={ingredients3.includes('A')} />
                              <label htmlFor="ingredient2" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient3" name="personalActionForm" value="P" onChange={onPersonnelActionPermissionChange} checked={ingredients3.includes('P')} />
                              <label htmlFor="ingredient3" className="ml-2">Payroll</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient4" name="personalActionForm" value="SA" onChange={onPersonnelActionPermissionChange} checked={ingredients3.includes('SA')} />
                              <label htmlFor="ingredient4" className="ml-2">Super Admin</label>
                            </div>
                          </div>
                        </div>

                        {/* substitute request certificated */}
                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Substitute Request Certificated</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient1" name="subReqCertificated" value="I" onChange={onSubReqCertificatedPermissionChange} checked={ingredients4.includes('I')} />
                              <label htmlFor="ingredient1" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient2" name="subReqCertificated" value="A" onChange={onSubReqCertificatedPermissionChange} checked={ingredients4.includes('A')} />
                              <label htmlFor="ingredient2" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="ingredient3" name="subReqCertificated" value="P" onChange={onSubReqCertificatedPermissionChange} checked={ingredients4.includes('P')} />
                              <label htmlFor="ingredient3" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>

                        {/* substitute request classified */}
                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Substitute Request Classified</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="subRequestClassifiedI" name="subRequestClassifiedI" value="I"
                                onChange={(e) => onSubReqClassifiedPermissionChangeI('I')} checked={checkedSubReqClassifiedInitiator} />
                              <label htmlFor="subRequestClassifiedI" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="subRequestClassifiedA" name="subRequestClassifiedA" value="A"
                                onChange={(e) => onSubReqClassifiedPermissionChangeA('A')} checked={checkedSubReqClassifiedApprover} />
                              <label htmlFor="subRequestClassifiedA" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="subRequestClassifiedP" name="subRequestClassifiedP" value="P"
                                onChange={(e) => onSubReqClassifiedPermissionChangeP('P')} checked={checkedSubReqClassifiedPayroll} />
                              <label htmlFor="subRequestClassifiedP" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>

                        {/* personnel service agreement*/}
                        <div className="grid grid-cols-2 gap-4 py-2">
                          <p>Personnel Service Agreement</p>
                          <div className="card flex flex-wrap justify-content-center gap-3">
                            <div className="flex align-items-center">
                              <Checkbox inputId="personnelServiceAgreeI" name="personnelServiceAgreeI" value="I"
                                onChange={(e) => onPersonnelServiceAgreePermissionChangeI('I')} checked={personnelServiceAgreeInitiator} />
                              <label htmlFor="personnelServiceAgreeI" className="ml-2">Initiator</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="personnelServiceAgreeA" name="personnelServiceAgreeA" value="A"
                                onChange={(e) => onPersonnelServiceAgreePermissionChangeA('A')} checked={personnelServiceAgreeApprover} />
                              <label htmlFor="personnelServiceAgreeA" className="ml-2">Approver</label>
                            </div>
                            <div className="flex align-items-center">
                              <Checkbox inputId="personnelServiceAgreeP" name="personnelServiceAgreeP" value="P"
                                onChange={(e) => onPersonnelServiceAgreePermissionChangeP('P')} checked={personnelServiceAgreePayroll} />
                              <label htmlFor="personnelServiceAgreeP" className="ml-2">Payroll</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="grow flex justify-center gap-3 mt-3.5">
                          <Link
                            to="/admin/setting/masters/users"
                            className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:text-[#FFFFFF] dark:border-[#333231]"
                          >
                            Cancel
                          </Link>
                          <button
                            onClick={() => saveUser()}
                            className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md bg-[#113699]"
                          >
                            {showPleaseWaitButton ? "Please wait..." : userId ? "Update" : "Submit"}
                          </button>
                        </div> */}
                      {/* </div> */}
                    </TabPanel>
                    <TabPanel header="App Permissions" >
                      <div>
                        {
                          <DataTable
                            columns={DataTableColumns}
                            data={userApps}
                            customStyles={DataTableCustomStyles}
                            pagination
                            highlightOnHover
                          />
                        }

                        <div className="grow flex justify-center gap-3 mt-3.5">
                          <Link
                            href="/admin/masters/users/user"
                            className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:text-[#FFFFFF] dark:border-[#333231]"
                          >
                            Cancel
                          </Link>
                          <button
                            onClick={() => saveUser()}
                            className=" py-2 px-6 bg-btn-blue text-[#fff] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md bg-[#113699]"
                          >
                            {showPleaseWaitButton ? "Please wait..." : userId ? "Update" : "Submit"}
                          </button>
                        </div>
                      </div>
                    </TabPanel>
                  </TabView>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout >
//   ) : (
//     <Login sessionExpired={1} />
  );
}
