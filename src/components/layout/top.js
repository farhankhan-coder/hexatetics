import React from "react";
import AccountSettings from "../AccountSettings";
import NotificationComponent from "../notification/notification";
export default function Top() {
  return (
    <header>
      <div className="fixed w-full z-20 header-wrap top-0">
        <div className="pl-[80px] xl:pl-[4.167vw]">
          <div className="bg-white dashboardHeader shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1)] py-[0.500vw] relative z-20">
            <div className="px-[15px] xl:px-[3.125vw] py-[12px] xl:py-[0.625vw]">
              <div className="flex items-center justify-between">
                <div className="xl:text-[1.25vw] text-[16px] font-semibold text-[#344054]">
                  Reports
                </div>
                <div className="flex items-center divide-x divide-[#E0E0E0] gap-x-[20px] lg:gap-x-[40px] xl:gap-x-[2.083vw]">
                  <div className="space-x-[20px] lg:space-x-[40px] xl:space-x-[2.083vw] relative">
                    <NotificationComponent />
                  </div>
                  <AccountSettings profile={"/initiatorprofile"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Sidebar /> */}
      </div>
    </header>
  );
}
