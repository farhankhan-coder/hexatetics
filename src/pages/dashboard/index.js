import AccountSettings from "@/components/AccountSettings";
import React, { useState, useEffect, useRef } from "react";
import { getUserPermissions } from "../../helper/actions/userActions";
import PageHeader from '@/components/common/nav/admin/PageHeaderComponent';
import { useRouter } from "next/router";
import {API_STATUS} from '../../helper/enum'
import { toast } from 'react-toastify';

const AllApplicationDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, userHasAuthenticated] = useState(true);
  let REACT_APP_Show_To_User = process.env.REACT_APP_Show_To_User;
  const [userAppPermissionList, setUserAppsPermissionList] = useState([]);
  const [weeklyAbsenceReportRoute, setWeeklyAbsenceReportRoute] = useState("");
  const [stipendReportRoute, setStipendReportRoute] = useState("");
  const [weeklyAbsenceCertifiedAdminRoute, setWeeklyAbsenceCertifiedAdminRoute] = useState("");
  const [employeeHandbookRoute, setEmployeeRoute] = useState("");
  const [sixPeriodIsSuperadmin, setSixPeriodIsSuperadmin] = useState(0);
  const [psaServiceARoute, setPsaServiceARoute] = useState("");
  const [loggedUserId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loggedUserRole, setLoggedUserRole] = useState("");

  const checkApplicationAccessibility = async (loggedUserRole) => {
    //validate weekly absence report validation
    let weeklyAbsenceRoute = "";
    let stipendRoute = "";

    let employeeHandbookRoute = "/employee-agreement-handbook";
    let psaServiceRoute = "/personalserviceagreement";

    if (loggedUserRole === "I") {
      weeklyAbsenceRoute = '/war_classified'; //"/initiator/weekly_absence_report";
      employeeHandbookRoute = "/employee-handbook";
      stipendRoute = "/stipend_form/initiator";

    } else if (loggedUserRole === "AP") {
      weeklyAbsenceRoute = '/war_classified'; //"/approver/weekly_absence_report";
      //psaServiceRoute = "/approver/personalserviceagreement";
      stipendRoute = "/stipend_form/approver";
    } else if (loggedUserRole === "P") {
      weeklyAbsenceRoute = '/war_classified'; //"/payroll/weekly_absence_report";
      stipendRoute = "/stipend_form/payroll";
      //psaServiceRoute = "/payroll/personalserviceagreement";
    }

    setStipendReportRoute(stipendRoute);
    setWeeklyAbsenceReportRoute(weeklyAbsenceRoute);
    setEmployeeRoute(employeeHandbookRoute);
    setPsaServiceARoute(psaServiceRoute)

    //validate weekly absence report validation
    let weeklyAbsenceCertifiedAdminRoute = "";

    if (loggedUserRole === "I") {
      weeklyAbsenceCertifiedAdminRoute = "/war_certificated";//"/initiator/weekly_absent_report_certificated_admin";
    } else if (loggedUserRole === "AP") {
      weeklyAbsenceCertifiedAdminRoute = "/war_certificated";//"/approver/weekly_absent_report_certificated_admin";
    } else if (loggedUserRole === "P") {
      weeklyAbsenceCertifiedAdminRoute = "/war_certificated";//"/payroll/weekly_absent_report_certificated_admin";
    }
    setWeeklyAbsenceCertifiedAdminRoute(weeklyAbsenceCertifiedAdminRoute);
    setSixPeriodIsSuperadmin(sixPeriodIsSuperadmin);
  };

  const appIds = ["WEEKLY_ABSENCE_REPORT",
    "WEEKLY_ABSENCE_REPORT_ADMIN",
    "TIME_REPORT",
    "SIX_PERIOD",
    "EMPLOYEE_HAND_BOOK",
    "CLASSIFIED_SUB_REQUEST",
    "SUBSTITUTE_REQUEST_CERTIFICATED",
    "STIPENDS_FORM",
    "PERSONAL_SERVICE_AGREEMENT",
    "PERSONNEL_ACTION_FORM"]

  const [notificationData, setNotificationData] = useState({
    "WEEKLY_ABSENCE_REPORT": { read: 0, unread: 0 },
    "WEEKLY_ABSENCE_REPORT_ADMIN": { read: 0, unread: 0 },
    "TIME_REPORT": { read: 0, unread: 0 },
    "SIX_PERIOD": { read: 0, unread: 0 },
    "EMPLOYEE_HAND_BOOK": { read: 0, unread: 0 },
    "CLASSIFIED_SUB_REQUEST": { read: 0, unread: 0 },
    "SUBSTITUTE_REQUEST_CERTIFICATED": { read: 0, unread: 0 },
    "STIPENDS_FORM": { read: 0, unread: 0 },
    "PERSONAL_SERVICE_AGREEMENT": { read: 0, unread: 0 },
    "PERSONNEL_ACTION_FORM": { read: 0, unread: 0 }
  });

  const permissionsTileInfoDic = {
    WEEKLY_ABSENCE_REPORT: { link: weeklyAbsenceReportRoute, title: 'Weekly Absence Report-Classified' },
    WEEKLY_ABSENCE_REPORT_ADMIN: { link: weeklyAbsenceCertifiedAdminRoute, title: 'Weekly Absence Report Certificated Admin' },
    TIME_REPORT: { link: '#', title: 'Time Report' },
    SIX_PERIOD: { link: '#', title: '6th Period Teaching Assignment' },
    EMPLOYEE_HAND_BOOK: { link: '#', title: 'Employee Handbook 2022-23' },
    CLASSIFIED_SUB_REQUEST: { link: '#', title: 'Substitute Request - Classified' },
    SUBSTITUTE_REQUEST_CERTIFICATED: { link: '#', title: 'Substitute Request Certificated' },
    PERSONNEL_ACTION_FORM: { link: '#', title: 'Personnel Action' },
    PERSONAL_SERVICE_AGREEMENT: { link: '#', title: 'Personal Services Agreement' },
    STIPENDS_FORM: { link: stipendReportRoute, title: 'Stipends Form' }
  }

  const getUserAppsPermission = async (userId, accessToken) => {
    try {
      let loggedUserId = window.localStorage.getItem('loggedUserId');

      let permissions = [];
      try {
        permissions = await getUserPermissions(loggedUserId, accessToken);
        if(permissions.status){
          if (permissions.status === API_STATUS.UNAUTHORIZED) {
            toast.error("Session Expired");
            router.push('/')
          }else{

            let notificationsNew = permissions.data[0]?.notificationData
            const unreadNotifications = notificationsNew.filter((notification) => notification.readAt === null);
            const notificationsTempData = { ...notificationData }
      
            appIds.map((appId) => {
              const appUnreadNotifications = unreadNotifications.filter((notificationsNew) => notificationsNew.appId === appId);
              notificationsTempData[appId] = { read: 0, unread: appUnreadNotifications?.length };
            })
      
            setNotificationData(notificationsTempData);

            permissions=permissions.data
          }
        }
        
      } catch (e) {
      }

      let filteredArray = permissions[0].userAppsPermissionData.filter(item => {
        if (REACT_APP_Show_To_User === 'true') {
          if (item.appId === 'PERSONAL_SERVICE_AGREEMENT') {
            if (item.userId === '111be5e0-50d1-708b-aac1-92eb2d6b7a19' || item.userId === 'f15bf560-9021-7087-f4af-e46f711e3cff' || item.userId === '415b15f0-2071-70e1-8f08-533596198c49' || item.userId === 'b8f9e4f1-8eb3-4250-8f92-2fe6438ac9c7' || item.userId === '9490d71f-9892-44e2-a964-2f421a0873ae' || item.userId === '7f11c8d4-2aa3-46a0-be75-b9fdfba79db9' || item.userId === '22203577-6a0e-4dc4-91a9-26e712202234' || item.userId === '775f5b15-bf1e-4720-824a-5a654d198a6d' || item.userId === '8bfc4ff7-dc66-4304-a23f-4f84d5739664' || item.userId === '01db65e0-7001-70c9-2c4a-caeee8b8d553' || item.userId === 'c16bb530-3071-70fd-2fb5-1adfe88e2c25' || item.userId === 'c1ebe570-30c1-70be-f067-f4b881aba600' || item.userId === 'f17b05d0-7081-70d4-ffce-f5e4cc8799db' || item.userId === 'a12b9590-70f1-7089-0653-4c4df66f3fc1' || item.userId === '81eba5c0-40e1-70df-3648-6cc931ee5c8f' || item.userId === 'e16ba560-5011-7071-0509-493013d01402' || item.userId === 'a13b9530-10f1-7049-82df-194987073a13' ||
              item.userId === '311b9570-8001-70a9-a22b-3d6e8f985ffa' || item.userId === '01eb0560-b031-7032-d2a0-9cf0bde03a35' || item.userId === 'f1db65a0-c031-706e-ff32-91ec7c6590b1' || item.userId === '71db95d0-a0c1-70bc-7cf6-b162c0af869c' || item.userId === '817b75e0-50a1-705a-52c2-9bb24929afaa' || item.userId === '118b6580-5011-7052-1401-02323a0a78e4' || item.userId === '411b8530-b061-70a6-2665-f29dc1bac1f4' || item.userId === '015b0550-c0e1-7050-8603-a19397db9110' || item.userId === '41aba590-60e1-70ae-e7e7-263a1223d27e' || item.userId === '214b1530-b081-70cc-5b6c-b5b09e56a84f' || item.userId === 'f12ba510-6011-7028-19a3-453145c79ae7' || item.userId === '311ba5c0-c0b1-701c-88f3-7160dbb45ae1' || item.userId === 'c16b8510-7091-7039-2c8b-93343b5f57c7' || item.userId === 'a1ab3590-0011-70cb-6dba-731b4a5e2948' || item.userId === '812bc5a0-90f1-7027-e3f3-a5f3139f4b50') {
              return true;
            } else {
              return false;
            }
          }
          else if (item.appId === 'STIPENDS_FORM') {
            if (item.userId === '111be5e0-50d1-708b-aac1-92eb2d6b7a19' || item.userId === 'f15bf560-9021-7087-f4af-e46f711e3cff' || item.userId === '415b15f0-2071-70e1-8f08-533596198c49' || item.userId === 'b8f9e4f1-8eb3-4250-8f92-2fe6438ac9c7' || item.userId === '9490d71f-9892-44e2-a964-2f421a0873ae' || item.userId === '7f11c8d4-2aa3-46a0-be75-b9fdfba79db9' || item.userId === '22203577-6a0e-4dc4-91a9-26e712202234' || item.userId === '775f5b15-bf1e-4720-824a-5a654d198a6d' || item.userId === '8bfc4ff7-dc66-4304-a23f-4f84d5739664' || item.userId === '01db65e0-7001-70c9-2c4a-caeee8b8d553' || item.userId === 'c16bb530-3071-70fd-2fb5-1adfe88e2c25' || item.userId === 'c1ebe570-30c1-70be-f067-f4b881aba600' || item.userId === 'f17b05d0-7081-70d4-ffce-f5e4cc8799db' || item.userId === 'a12b9590-70f1-7089-0653-4c4df66f3fc1' || item.userId === '81eba5c0-40e1-70df-3648-6cc931ee5c8f' || item.userId === 'e16ba560-5011-7071-0509-493013d01402' || item.userId === 'a13b9530-10f1-7049-82df-194987073a13' ||
              item.userId === '311b9570-8001-70a9-a22b-3d6e8f985ffa' || item.userId === '01eb0560-b031-7032-d2a0-9cf0bde03a35' || item.userId === 'f1db65a0-c031-706e-ff32-91ec7c6590b1' || item.userId === '71db95d0-a0c1-70bc-7cf6-b162c0af869c' || item.userId === '817b75e0-50a1-705a-52c2-9bb24929afaa' || item.userId === '118b6580-5011-7052-1401-02323a0a78e4' || item.userId === '411b8530-b061-70a6-2665-f29dc1bac1f4' || item.userId === '015b0550-c0e1-7050-8603-a19397db9110' || item.userId === '41aba590-60e1-70ae-e7e7-263a1223d27e' || item.userId === '214b1530-b081-70cc-5b6c-b5b09e56a84f' || item.userId === 'f12ba510-6011-7028-19a3-453145c79ae7' || item.userId === '311ba5c0-c0b1-701c-88f3-7160dbb45ae1' || item.userId === 'c16b8510-7091-7039-2c8b-93343b5f57c7' || item.userId === 'a1ab3590-0011-70cb-6dba-731b4a5e2948' || item.userId === '812bc5a0-90f1-7027-e3f3-a5f3139f4b50') {
              return true;
            } else {
              return false;
            }
          }
          else if (item.appId === 'PERSONNEL_ACTION_FORM') {
            if (item.userId === '111be5e0-50d1-708b-aac1-92eb2d6b7a19' || item.userId === 'f15bf560-9021-7087-f4af-e46f711e3cff' || item.userId === '415b15f0-2071-70e1-8f08-533596198c49' || item.userId === 'b8f9e4f1-8eb3-4250-8f92-2fe6438ac9c7' || item.userId === '9490d71f-9892-44e2-a964-2f421a0873ae' || item.userId === '7f11c8d4-2aa3-46a0-be75-b9fdfba79db9' || item.userId === '22203577-6a0e-4dc4-91a9-26e712202234' || item.userId === '775f5b15-bf1e-4720-824a-5a654d198a6d' || item.userId === '8bfc4ff7-dc66-4304-a23f-4f84d5739664' || item.userId === '01db65e0-7001-70c9-2c4a-caeee8b8d553' || item.userId === 'c16bb530-3071-70fd-2fb5-1adfe88e2c25' || item.userId === 'c1ebe570-30c1-70be-f067-f4b881aba600' || item.userId === 'f17b05d0-7081-70d4-ffce-f5e4cc8799db' || item.userId === 'a12b9590-70f1-7089-0653-4c4df66f3fc1' || item.userId === '81eba5c0-40e1-70df-3648-6cc931ee5c8f' || item.userId === 'e16ba560-5011-7071-0509-493013d01402' || item.userId === 'a13b9530-10f1-7049-82df-194987073a13' ||
              item.userId === '311b9570-8001-70a9-a22b-3d6e8f985ffa' || item.userId === '01eb0560-b031-7032-d2a0-9cf0bde03a35' || item.userId === 'f1db65a0-c031-706e-ff32-91ec7c6590b1' || item.userId === '71db95d0-a0c1-70bc-7cf6-b162c0af869c' || item.userId === '817b75e0-50a1-705a-52c2-9bb24929afaa' || item.userId === '118b6580-5011-7052-1401-02323a0a78e4' || item.userId === '411b8530-b061-70a6-2665-f29dc1bac1f4' || item.userId === '015b0550-c0e1-7050-8603-a19397db9110' || item.userId === '41aba590-60e1-70ae-e7e7-263a1223d27e' || item.userId === '214b1530-b081-70cc-5b6c-b5b09e56a84f' || item.userId === 'f12ba510-6011-7028-19a3-453145c79ae7' || item.userId === '311ba5c0-c0b1-701c-88f3-7160dbb45ae1' || item.userId === 'c16b8510-7091-7039-2c8b-93343b5f57c7' || item.userId === 'a1ab3590-0011-70cb-6dba-731b4a5e2948' || item.userId === '812bc5a0-90f1-7027-e3f3-a5f3139f4b50' || item.userId === '01c6f376-c220-423e-ae34-b109567a817f') {
              return true;
            } else {
              return false;
            }
          }
          else if (item.appId === 'SIX_PERIOD') {
            if (item.userId === '111be5e0-50d1-708b-aac1-92eb2d6b7a19' || item.userId === 'f15bf560-9021-7087-f4af-e46f711e3cff' || item.userId === '415b15f0-2071-70e1-8f08-533596198c49' || item.userId === 'b8f9e4f1-8eb3-4250-8f92-2fe6438ac9c7' || item.userId === '9490d71f-9892-44e2-a964-2f421a0873ae' || item.userId === '7f11c8d4-2aa3-46a0-be75-b9fdfba79db9' || item.userId === '22203577-6a0e-4dc4-91a9-26e712202234' || item.userId === '775f5b15-bf1e-4720-824a-5a654d198a6d' || item.userId === '8bfc4ff7-dc66-4304-a23f-4f84d5739664' || item.userId === '01db65e0-7001-70c9-2c4a-caeee8b8d553' || item.userId === 'c16bb530-3071-70fd-2fb5-1adfe88e2c25' || item.userId === 'c1ebe570-30c1-70be-f067-f4b881aba600' || item.userId === 'f17b05d0-7081-70d4-ffce-f5e4cc8799db' || item.userId === 'a12b9590-70f1-7089-0653-4c4df66f3fc1' || item.userId === '81eba5c0-40e1-70df-3648-6cc931ee5c8f' || item.userId === 'e16ba560-5011-7071-0509-493013d01402' || item.userId === 'a13b9530-10f1-7049-82df-194987073a13' ||
              item.userId === '311b9570-8001-70a9-a22b-3d6e8f985ffa' || item.userId === '01eb0560-b031-7032-d2a0-9cf0bde03a35' || item.userId === 'f1db65a0-c031-706e-ff32-91ec7c6590b1' || item.userId === '71db95d0-a0c1-70bc-7cf6-b162c0af869c' || item.userId === '817b75e0-50a1-705a-52c2-9bb24929afaa' || item.userId === '118b6580-5011-7052-1401-02323a0a78e4' || item.userId === '411b8530-b061-70a6-2665-f29dc1bac1f4' || item.userId === '015b0550-c0e1-7050-8603-a19397db9110' || item.userId === '41aba590-60e1-70ae-e7e7-263a1223d27e' || item.userId === '214b1530-b081-70cc-5b6c-b5b09e56a84f' || item.userId === 'f12ba510-6011-7028-19a3-453145c79ae7' || item.userId === '311ba5c0-c0b1-701c-88f3-7160dbb45ae1' || item.userId === 'c16b8510-7091-7039-2c8b-93343b5f57c7' || item.userId === 'a1ab3590-0011-70cb-6dba-731b4a5e2948' || item.userId === '812bc5a0-90f1-7027-e3f3-a5f3139f4b50') {
              return true;
            } else {
              return false;
            }
          }
          return true;
        } else {
          return true;
        }
      })


      const uniquePermissions = filteredArray?.reduce((accumulator, permission) => {
        const existingPermission = accumulator.find(p => p.appId === permission.appId);

        if (!existingPermission) {
          accumulator.push(permission);
        }
        return accumulator;
      }, []);
      setUserAppsPermissionList(uniquePermissions);
    } catch (error) {
      console.error('Error fetching User Apps Permission:', error);
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem("loggedUserId") === null) {
      userHasAuthenticated(false);
    } else {

      let userId = window.localStorage.getItem('loggedUserId');
      let accessToken = window.localStorage.getItem('accessToken');
      let loggedUserRole = window.localStorage.getItem('loggedUserRole');
      setUserId(userId);
      setAccessToken(accessToken);
      setLoggedUserRole(loggedUserRole);
      // getUnreadNotificationCount(loggedUserId,accessToken);
      getUserAppsPermission(loggedUserId, accessToken);
      checkApplicationAccessibility(loggedUserRole);
    }
  }, []);


  const getNotifications = async () => {
    let accessToken = window.localStorage.getItem('accessToken');
    await getUserAppsPermission(loggedUserId,accessToken);
  }

  useEffect(() => {
    const intervalId = setInterval(getNotifications, 30000); // 30 seconds in milliseconds
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getTile = (appId) => {

    if (appId) {
      return (
        <a
          href={permissionsTileInfoDic[appId]?.link}
          /* key={index} */
          className="bg-[#F9FBFF] xl:p-[1.250vw] p-[20px] box-shadow rounded-lg relative xl:h-[8.833vw] h-[160px] cursor-pointer"
        >
          <h4 className="text-[#011834] text-[20px] xl:text-[1vw] font-medium leading-tight flex items-center xl:h-[4.167vw] h-[80px]">
            {permissionsTileInfoDic[appId]?.title}
          </h4>
          <div className="flex items-center gap-2 xl:mt-[1.042vw] mt-[18px]">
            <img
              src="/assets/images/arrowcircleright.svg"
              width={24}
              height={24}
              className="rounded-full xl:w-[1.250vw] xl:h-[1.250vw]"
              alt="Arrow"
            />
            <p className="text-[#1262D0] text-[28px] xl:text-[0.781vw] font-medium">
              Run
            </p>
          </div>
          {/* Replace this section with your actual alert count */}
          <div
            className="text-[#011834] font-semibold absolute bottom-0 right-0 text-right alert-bg-warp"
            style={{
              backgroundImage: `url('./assets/images/alerts-bg.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <div className="absolute bottom-2 right-3">
              <p className="text-base xl:text-[0.938vw]">
                {notificationData[appId]?.unread || 0}
              </p>
              <p className="text-[10px] font-semibold xl:text-[0.625vw]">
                Alerts
              </p>
            </div>
          </div>
        </a>
      );
    }
  }

  return (

    <div >
      <PageHeader pageTitle={"Dashboard"} />
      <div
        className="h-screen bg-landing"
        style={{
          backgroundImage: `url('/assets/images/landing_bg.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          height: "100%",
          minHeight: "100vh",
          backgroundSize: "contain",
        }}
      >
        <div className="xl:px-[1.042vw] 2xl:px-[1.042vw] px-[20px]">
          <div className="w-full z-20 header-wrap">
            <div className="">
              <div className=" py-[10px] xl:py-[0.521vw] relative z-20">
                <div className="px-[10px] xl:px-[0.521vw] xl:pl-[3.125vw] xl:pr-[0.925vw] py-[12px] xl:py-[0.625vw]">
                  <div className="flex items-center justify-end">
                    <div className="flex items-center  lg:gap-x-[40px] ">
                      <AccountSettings />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:px-[2.042vw] 2xl:px-[2.042vw] px-[20px] xl:pt-[3.292vw] pt-[140px]">
            <div>
              <img
                src="/assets/images/landing_logo.png"
                width={"120"}
                height={"120"}
                className="rounded-full w-[120px] h-[120px] xl:w-[7.292vw] xl:h-[7.292vw]"
              />

              <div className="xl:mt-[0.900vw] mt-[20px]">
                <h6 className="text-[#344054] text-[28px] xl:text-[1.5vw] 2xl:text-[1.2vw] font-light leading-tight">
                  Welcome to{" "}
                </h6>
                <h1 className="text-[#002870] text-[50px] xl:text-[2.5vw] font-extrabold leading-tight">
                  <span className="text-[#101828] font-normal">GUSD</span> Forms
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-12 md:grid-cols-12 gap-3 xl:gap-[1.250vw] pb-5 xl:mt-[1.250vw] mt-[20px]">
              <div className="xl:col-span-8 md:col-span-12">
                <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-3 xl:gap-[1vw]">

                  {userAppPermissionList.map(({ appId }) => getTile(appId))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApplicationDashboard;
