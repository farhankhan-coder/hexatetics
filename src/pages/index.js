import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { API_STATUS } from '../helper/enum';
import { useRouter } from "next/router";
import { reactLocalStorage } from 'reactjs-localstorage';
import PageHeader from '@/components/common/nav/admin/PageHeaderComponent';
const LogInpage = () => {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const authenticateEmployee = async () => {

    let API_KEY = process.env.HEXA_API_KEY;
    let SECRET_KEY = process.env.HEXA_SECRETE_KEY;

    if(username.trim().length === 0){
      toast.error("Please Enter email")
      return;
    }
    if(password.trim().length === 0){
      toast.error("Please Enter password")
      return;
    }
   
    //*Request Data
    let requestData = {
      "username": username,
      "password": password,
      "API_KEY": API_KEY,
      "SECRET_KEY": SECRET_KEY
    }

    try {
      //*User data update api call
      const response = await axios.post("/api/auth", { requestData });
      let returnData = response.data.data.returnData;
      if (response.status === API_STATUS.SUCCESS) {
        toast.success("Login Successfully!");
        //SETTING LOCAL STORAGE HERE.
        reactLocalStorage.set('accessToken',returnData.accessToken);
        reactLocalStorage.set('refreshToken',returnData.refreshToken);
        reactLocalStorage.set('loggedUserId',returnData.userDetails.cognitoUserId);
        reactLocalStorage.set('loggedFirstName',returnData.userDetails.firstName);
        reactLocalStorage.set('loggedLastName',returnData.userDetails.lastName);
        reactLocalStorage.set('loggedUserRole',returnData.userDetails.role);
        reactLocalStorage.set('loggedl2authority',returnData.userDetails.L2_authoritys);
        reactLocalStorage.set('loggedStipendApprover',returnData.userDetails.loggedStipendApprover);
        reactLocalStorage.set('loggedStipendInitiator',returnData.userDetails.loggedStipendInitiator);
        reactLocalStorage.set('loggedStipendPayroll',returnData.userDetails.loggedStipendPayroll);
        reactLocalStorage.set('loggedPersonnelServiceAgreeInitiator',returnData.userDetails.loggedPersonnelServiceAgreeInitiator);
        reactLocalStorage.set('loggedPersonnelServiceAgreeApprover',returnData.userDetails.loggedPersonnelServiceAgreeApprover);
        reactLocalStorage.set('loggedl1authority',returnData.userDetails.loggedl1authority);
        reactLocalStorage.set('SPReportingManager',returnData.userDetails.SPReportingManager);
        reactLocalStorage.set('sixPeriodIsInitiator',returnData.userDetails.sixPeriodIsInitiator);
        reactLocalStorage.set('sixPeriodIsApprover',returnData.userDetails.sixPeriodIsApprover);
        reactLocalStorage.set('sixPeriodIsPayroll',returnData.userDetails.sixPeriodIsPayroll);
        reactLocalStorage.set('isSixPeriodSAdmin',returnData.userDetails.isSixPeriodSAdmin);
        reactLocalStorage.set('personnelIsInitiator',returnData.userDetails.personnelIsInitiator);
        reactLocalStorage.set('personnelIsApprover',returnData.userDetails.personnelIsApprover);
        reactLocalStorage.set('personnelIsPayroll',returnData.userDetails.personnelIsPayroll);
        reactLocalStorage.set('ispersonnelIsAdmin',returnData.userDetails.ispersonnelIsAdmin);
        reactLocalStorage.set('timeRIsInitiator',returnData.userDetails.timeRIsInitiator);
        reactLocalStorage.set('timeRIsApprover',returnData.userDetails.timeRIsApprover);
        reactLocalStorage.set('timeRIsPayroll',returnData.userDetails.timeRIsPayroll);
        reactLocalStorage.set('timeRIsSAdmin',returnData.userDetails.timeRIsSAdmin);
        reactLocalStorage.set('certiSubRIsInitiator',returnData.userDetails.certiSubRIsInitiator);
        reactLocalStorage.set('certiSubReIsApprover',returnData.userDetails.certiSubReIsApprover);
        reactLocalStorage.set('certiSubReqIsPayroll',returnData.userDetails.certiSubReqIsPayroll);

        router.push("/dashboard");
      }
    } catch (error) {
      console.log('error', error);
      if( error.response.status === API_STATUS.UNAUTHORIZED){
        toast.error("Invalid username or password");
        router.push('/')
      }
      else if (error.response.status === API_STATUS.FORBIDDEN) {
        toast.error("Are you a hacker ?");
      }
    }

  }

  return (
    <>
    <PageHeader pageTitle={"Login"}/>
      <div className="overflow-auto login-page">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 ">
          <div className="flex flex-wrap flex-row justify-center login bg-transparent dark:bg-[#1E2124] xl:border-r xl:border[#F9FAFB] xl:border-opacity-10 bg-none">
            <div className="w-full p-2 px-10 2xl:max-w-lg xl:max-w-lg aos-init aos-animate">
              <div className="flex flex-wrap items-center mt-8 mb-3 ">
                <span className="p-image p-component relative h-[105px] w-[105px] xl:h-[5.469vw] xl:w-[5.469vw]">
                  <Image
                    src={'/assets/images/login-logo.png'}
                    width="120"
                    height="120"
                    alt="GUSD App"
                  />
                </span>
              </div>
              <div className="mb-2 xl:mb-[2.083vw]">
                <h2 className="text-[24px] xl:text-[1.875vw] font-semibold text-[#101828] dark:text-white">
                  Welcome to <span className="text-[#05A6F6]">GUSD</span> forms
                </h2>
              </div>
              <div className="text-[#344054] text-sm text-[18px] lg:text-lg xl:text-[0.938vw] font-medium py-2">
                Please enter details to Login
              </div>
              {/* <button className="text-[14px] xl:text-[0.938vw] w-full text-[#101828] bg-white mb-8 xl:mb-[2.083vw] flex items-center justify-center font-medium  googlebtn p-3">
              <span className="p-image p-component mr-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqkRXVUTJavl1kxlIhufALwkRoDGiwcPaBQ&usqp=CAU"
                  width="20"
                  height="20"
                  alt="Sign in with Google"
                />
              </span>
              Sign in with Google
            </button> */}

              <div className="my-2 xl:my-[0.521vw] sign">

                <div className=" text-[#98A2B3]  text-[16px] xl:text-[0.938vw] font-normal relative ">

                  Sign in with Email
                </div>
              </div>

              <form>
                <div className="relative  mb-2 xl:mb-[0.781vw]">
                  <div className="py-2">
                    <label
                      htmlFor="required-email"
                      className="text-[rgb(52,64,84)] text-[16px] xl:text-[0.938vw] font-medium"
                    >
                      Email
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    className="login-ip p-inputtext p-component rounded w-full placeholder:text-[#667085] placeholder:text-[16px]"
                    // onChange={(e) => setEmail(e.target.value)} value={email} 
                    id="required-email"
                    placeholder="youremail@gusd.net"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="relative mb-2 xl:mb-[0.781vw] password-custom">
                  <div className="py-2">
                    <label
                      htmlFor="required-password"
                      className="text-[#344054] text-[16px] xl:text-[0.938vw] font-medium"
                    >
                      Password{" "}
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                  </div>
                  <div className="p-password p-component p-inputwrapper p-input-icon-right w-full placeholder:text-[#667085] placeholder:text-[16px]">
                    <input
                      id="required-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*****************"
                      className="login-ip p-inputtext p-component p-password-input rounded w-full"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <i className="gusd-eye passview" onClick={togglePasswordVisibility}>

                    </i>

                  </div>
                </div>
                {/* <div className="flex mt-3 ">
                <input type="checkbox" className="w-[20px] xl:w-[1.042vw]"/>
                <label htmlFor="rememberMe" className="ml-2 text-[16px] xl:text-[0.833vw]">
                  Remember me
                </label>
                <div className="ml-[180px] xl:ml-[10.417vw] text-blue-600">Forget Password?</div>
              </div> */}
                <Link href="#">
                  <div onClick={authenticateEmployee} className="my-[15px] xl:my-[2.138vw]">
                    <button type="submit" className="w-full  custmBtn blue radius8 text-lg ">
                      Login
                    </button>
                  </div>
                </Link>

                {/* <div className="flex justify-center text-[16px] xl:text-[0.833vw]">
                Not Registered yet?
                <span className="text-blue-600 ml-2 text-[16px] xl:text-[0.833vw]">Create account.</span>
              </div> */}
              </form>
            </div>
          </div>

          <div className="py-[20px] px-[40px] xl:py-[9.375vw] xl:px-[6.354vw] aos-init aos-animate">
            <span className="p-image p-component relative xl:h-[31.250vw] xl:w-[36.458vw]">
              <img src={'/assets/images/login-page.svg'} width="700" height="600" alt="GUSD forms" />
            </span>
          </div>
        </div>
      </div>
    </>

  );
};

export default LogInpage;
