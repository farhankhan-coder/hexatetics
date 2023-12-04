import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import Link from "next/link";
import { ScrollPanel } from "primereact/scrollpanel";

export default function NotificationComponent() {
  const op = useRef(null);

  return (
    <div className="card flex justify-content-center">
      {/* <Button type="button" icon="pi pi-image" label="Image" /> */}
      <Link href="#" onClick={(e) => op.current.toggle(e)}>
        <i className="gusd-notification text-[#667085] text-[20px] xl:text-[1.250vw]"></i>
      </Link>
      <OverlayPanel ref={op}>
        <div className="flex justify-between">
          <div className="text-[#344054] font-semibold text-[18px] xl:text-[0.938vw] mb-[8px] xl:mb-[0.417vw]">
            Notifications
          </div>
          <Link
            href="#"
            onClick={(e) => op.current.toggle(e)}
            className="gusd-close border rounded-full px-2.5 py-2 bg-[#6366f1] text-white text-xs"
          ></Link>
        </div>
        <ScrollPanel
          style={{ width: "20rem", height: "23.438vw" }}
          className="notification"
        >
          <div className="grid grid-cols-1 divide-y">
            <div>
              <div className="col py-[18px] xl:py-[0.625vw] w-">
                <div className="flex items-center justify-between space-x-[8px] xl:space-x-[0.417vw]">
                  <div className="flex items-start space-x-[10px] xl:space-x-[0.521vw]">
                    <div className="content">
                      <div className="text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold">
                        Rejected
                      </div>
                      <div className="pt-1 text-[14px] xl:text-[0.729vw] text-[#344054]">
                        Hello SAMPLE USER DEMO, The Personnel Action Form form
                        titled rangoon initiated on 2023-08-24 for Teacher
                        Nilesh Nigade teacher three (SP-EMP-05-TC) is rejected
                        by Sixth Approverone and moved to status pending
                        approval
                      </div>
                      <div className="pt-1 text-[#667085] text-[12px] xl:text-[0.625vw]">
                        2023-08-24 12:24
                      </div>
                    </div>
                  </div>
                  <div className="dot">
                    <i className="gusd-dot text-[16px] xl:text-[0.833vw] text-[#d9342b]"></i>
                  </div>
                </div>
              </div>
              <div className="col py-[18px] xl:py-[0.625vw] w-">
                <div className="flex items-center justify-between space-x-[8px] xl:space-x-[0.417vw]">
                  <div className="flex items-start space-x-[10px] xl:space-x-[0.521vw]">
                    <div className="content">
                      <div className="text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold">
                        Rejected
                      </div>
                      <div className="pt-1 text-[14px] xl:text-[0.729vw] text-[#344054]">
                        Hello SAMPLE USER DEMO, The Personnel Action Form form
                        titled rangoon initiated on 2023-08-24 for Teacher
                        Nilesh Nigade teacher three (SP-EMP-05-TC) is rejected
                        by Sixth Approverone and moved to status pending
                        approval
                      </div>
                      <div className="pt-1 text-[#667085] text-[12px] xl:text-[0.625vw]">
                        2023-08-24 12:24
                      </div>
                    </div>
                  </div>
                  <div className="dot">
                    <i className="gusd-dot text-[16px] xl:text-[0.833vw] text-[#d9342b]"></i>
                  </div>
                </div>
              </div>
              <div className="col py-[18px] xl:py-[0.625vw] w-">
                <div className="flex items-center justify-between space-x-[8px] xl:space-x-[0.417vw]">
                  <div className="flex items-start space-x-[10px] xl:space-x-[0.521vw]">
                    <div className="content">
                      <div className="text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold">
                        Rejected
                      </div>
                      <div className="pt-1 text-[14px] xl:text-[0.729vw] text-[#344054]">
                        Hello SAMPLE USER DEMO, The Personnel Action Form form
                        titled rangoon initiated on 2023-08-24 for Teacher
                        Nilesh Nigade teacher three (SP-EMP-05-TC) is rejected
                        by Sixth Approverone and moved to status pending
                        approval
                      </div>
                      <div className="pt-1 text-[#667085] text-[12px] xl:text-[0.625vw]">
                        2023-08-24 12:24
                      </div>
                    </div>
                  </div>
                  <div className="dot">
                    <i className="gusd-dot text-[16px] xl:text-[0.833vw] text-[#22c55e]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollPanel>
      </OverlayPanel>
    </div>
  );
}
