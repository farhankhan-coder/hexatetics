import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout/layout";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Link from "next/link";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export default function Index() {
  let [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [reportEmployeeList, setReportEmployeeList] = useState([]);
  const approveStatusOptions = (product) => {
    switch (product.status) {
      case "Rejected":
        return "danger";

      case "APPROVAL_REJECTED":
        return "danger";

      case "Completed":
        return "success";

      case "Pending":
        return "warning";

      case "Closed":
        return "success";
      case "OPEN":
        return "info";
      case "Approved":
        return "success";

      case "APPROVAL_ACCEPTED":
        return "success";

      case "RESUBMITTED":
        return "info";

      case "SUBMITTED":
        return "info";

      case "Submitted":
        return "info";

      case "Reviewed & resubmitted":
        return "info";

      default:
        return null;
    }
  };

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  // page
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeList, setEmployeeList] = useState();
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [SelectperiodExpand, setActivate] = useState("");
  const toggleActiveexpand = () => {
    setActivate(
      SelectperiodExpand === "SelectperiodExpand" ? "" : "SelectperiodExpand"
    );
  };
  const [absentDate, setAbsentDate] = useState([]);

  return (
    <>
      <Layout pageTitle="Home">
        <div className="pl-[95px] xl:pl-[7.292vw] pr-[15px] xl:pr-[3.125vw] xl:pt-[4.792vw]">
          <Button icon="pi pi-arrow-left" onClick={() => show("right")} />
          <Dialog
            className="relative reports-popup"
            visible={visible}
            position={position}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            onHide={() => setVisible(false)}
            draggable={false}
            resizable={false}
          >
            <div className="grid grid-cols-1 xl:grid-cols-12 pb-[100px]">
              <div className="col-span-1 lg:col-span-8 h-auto">
                <div className="p-5">
                  <Link
                    href={""}
                    onClick={() => {
                      setVisible(false);
                    }}
                    className="py-3"
                  >
                    <Image
                      src={"assets/images/sidebarright.svg"}
                      width={"24"}
                      height={"24"}
                      alt="user"
                    />
                  </Link>
                  <div className="text-[#113699] text-md lg:text-[0.833vw] font-bold">
                    Glendale Unified School District
                  </div>
                  <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">
                    Weekly Absence Report - Classified form
                  </div>

                  <div className="pt-3">
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                      <div className="font-medium">School or Department </div>
                      <div className="font-semibold ">R.d. white elem.</div>
                    </div>
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                      <div className="font-medium">From </div>
                      <div className="font-semibold ">12/19/2023</div>
                    </div>
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                      <div className="font-medium">To </div>
                      <div className="font-semibold ">12/19/2023</div>
                    </div>
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                      <div className="font-medium">Status </div>
                      <Tag
                        severity=""
                        value={"Approved"}
                        className=""
                        style={{ background: "#EBFFF3", color: "#003D19" }}
                      ></Tag>
                    </div>
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                      <div className="font-medium">Approved By </div>
                      <div className="font-semibold ">POOJA Innive</div>
                    </div>
                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw]">
                      <div className="font-medium">Submitted By </div>
                      <div className="font-semibold ">Namarata Desai</div>
                    </div>

                    <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw]">
                      <div className="font-medium">Comment </div>
                      <div className="font-semibold "></div>
                    </div>
                  </div>
                  <div className="py-3 emp-simple-tbl">
                    <DataTable
                      value={reportEmployeeList}
                      rowGroupMode="rowspan"
                      groupRowsBy="employeeName"
                      emptyMessage="No Absence"
                    >
                      <Column
                        field="employeeName"
                        header="Name of Employee"
                      ></Column>
                      <Column
                        field="absent_date"
                        header="Dates Absent"
                      ></Column>
                      <Column
                        field="absent_code_id"
                        header="Absent Codes"
                      ></Column>
                      <Column
                        field="partial_hour"
                        header="Total Hours"
                      ></Column>
                      <Column
                        field="substitutedEmployeeName"
                        header="Substitute"
                      ></Column>
                    </DataTable>
                  </div>

                  <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">
                    <div className="text-[#344054] font-medium text-[14px] pb-3">
                      Absence Codes - Legends
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div class="text-[#344054] text-[12px]">
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            B-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Berevement</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            D-{" "}
                          </div>
                          <div class="col-span-4 pl-1">District Approved</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            DC-{" "}
                          </div>
                          <div class="col-span-4 pl-1">District Covid</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            I-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Illness</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            J-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Jury Duty</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            L-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Last Day Worked</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            {" "}
                            OU-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Other Unpaid</div>
                        </div>
                      </div>

                      <div class="text-[#344054] text-[12px]">
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            PA-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Personal (Approved)</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            NA-{" "}
                          </div>
                          <div class="col-span-4 pl-1">
                            Personal (Not Approved)
                          </div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            PN-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Personal Necessity</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            S-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Suspension</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            V-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Vacation</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            W-{" "}
                          </div>
                          <div class="col-span-4 pl-1">Witness (District)</div>
                        </div>
                        <div class="grid grid-cols-5 pb-0.5">
                          <div class="col-span-1 font-semibold text-right">
                            WC-{" "}
                          </div>
                          <div class="col-span-4 pl-1">
                            Worker’s Compensation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">
                <div className="p-5">
                  <div className="text-[#344054] text-[16px] font-medium py-3 mb-5">
                    Form History
                  </div>

                  <div className="card custTable">
                    <Timeline
                      value={events}
                      opposite={(item) => (
                        <Tag
                          severity={approveStatusOptions(item)}
                          className="mr-2 relative top-[-5px]"
                          value={item.status}
                        ></Tag>
                      )}
                      content={(item, i) => (
                        <div className="relative top-[-10px]">
                          <div className="text-[#667085] text-[12px] ml-2">
                            Step {i + 1}
                          </div>
                          <small className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] leading-tight ml-2">
                            sdfsdf
                          </small>
                          <div className="text-color-secondary text-xs ml-2">
                            sdfsdf
                          </div>
                          <div className="text-color-secondary text-[9px] ml-2">
                            sdfsdf
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-[0] bottom-[0] left-[0] bg-[#F5F6F7] p-[1.25rem]">
              <div className="bg-[#113699] border border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                <i className="mr-3 gusd-print-outline"></i>
                <span className="printicon">Print</span>
              </div>
            </div>
          </Dialog>
        </div>

        {/* page start  */}
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
                  <div className="absolute left-[10px] top-[0] z-10">
                    <i className="gusd-employee text-[#667085] text-sm"></i>
                  </div>
                  <Dropdown
                    id="dept"
                    value={selectedSchool}
                    onChange={(e) => {
                      EmployeeList(e);
                      setDateCount(0);
                    }}
                    filter
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
                  <div className="absolute left-[10px] top-[0] z-10">
                    <i className="gusd-employee text-[#667085] text-sm"></i>
                  </div>
                  <Dropdown
                    id="employee"
                    value={selectedEmployee}
                    options={employeeList}
                    filter
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
                  <div className="absolute left-[10px] top-[0] z-10">
                    <i className="gusd-employee text-[#667085] text-sm"></i>
                  </div>
                  <Dropdown
                    id="employee"
                    value={selectedEmployee}
                    options={employeeList}
                    filter
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
                    <div className="absolute left-[10px] top-[0] z-10">
                      <i className="gusd-calendar text-[#667085] text-sm"></i>
                    </div>
                    <i className="gusd-arrow-down text-[#344054] text-xs xl:text-[0.7rem] absolute right-[1.4rem] top-[1.0rem] z-10"></i>
                    <div className="card justify-content-center">
                      <div>
                        <Calendar
                          value={"periodDates"}
                          placeholder="Date Range"
                          selectionMode=""
                          className="w-full h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 xl:mt-[1.094vw] pb-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-[1.250vw]">
              <div className="col-span-12 lg:col-span-8">
                <div id={SelectperiodExpand} className="box-shadow-1 bg-white">
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
                      inline
                      selectionMode="multiple"
                    />
                  </div>
                </div>
                <div className="mt-6 xl:mt-[1.250vw]">
                  <div className="bg-white box-shadow-1">
                    <div className="p-4 xl:p-[0.833vw] pb-0">
                      <div className="text-[#101828] font-semibold -tracking-[0.02em] text-base xl:text-[0.833vw]">
                        <p>Preview</p>
                      </div>
                    </div>
                    <div className="px-3 xl:px-[0.677vw] custp-table-d initiatorperiodtable">
                      <DataTable  tableStyle={{ width: '100%' }}>
    <Column field="code" header="Name of Employee"></Column>
    <Column field="name" header="Dates Absent"></Column>
    <Column field="category" header="Absent Codes"></Column>
    <Column field="quantity" header="Total Hours"></Column>
    <Column field="quantity" header="Name of Substitute"></Column>
    <Column field="quantity" header="Action"></Column>
</DataTable>
                    </div>
                  </div>
                </div>
                <div className=" mt-10  flex flex-wrap xl:flex-nowrap gap-4 mt-5 xl:gap-[0.938vw] xl:mt-[1.250vw] w-1/2">
                  <h3 className="text-[#113699]  py-4 font-semibold -tracking-[0.02em] text-xl xl:text-[1.042vw]">
                    Comment
                  </h3>

                  <textarea
                    placeholder=""
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    cols="50"
                    type="text"
                    className=" text-[#344054] text-[16px] a rounded-lg disabled bg-[#fff] flex-1 appearance-none border border-[#D0D5DD]  py-2 px-4 bg-grey text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#8E8E8E]"
                  ></textarea>
                </div>
                <div class="mt-[1.250vw]">
                  <div class="flex flex-wrap justify-between items-center">
                    <div class="">
                      <a
                        class="text-[#344054] text-xs xl:text-[0.938vw] font-medium bg-white inline-block border border-[#D0D5DD] rounded xl:rounded-lg py-[0.833vw] px-[2.917vw] box-shadow-2"
                        href="/initiator/weekly_absence_report"
                      >
                        <i class="mr-1 gusd-arrow-line-right"></i>Back
                      </a>
                    </div>
                    <div class="space-x-4">
                      <button class="font-medium inline-block text-[#FFFFFF] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#113699] border border-[#F2F4F7]">
                        <i class="mr-3 gusd-print-outline"></i>Print
                      </button>
                      <a
                        class="font-medium inline-block text-[#2D5BE5] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#EFF8FF] border border-[#D0D5DD]"
                        href="/initiator/reports/initiatereport/1732d683-365d-41a0-9661-bf066f645dce"
                      >
                        Save
                      </a>
                      <a
                        class="font-medium inline-block text-[#FFFFFF] text-xs xl:text-[0.938vw] py-[0.833vw] px-[2.448vw] box-shadow-2 rounded xl:rounded-lg bg-[#113699] border border-[#F2F4F7]"
                        href="/initiator/reports/initiatereport/1732d683-365d-41a0-9661-bf066f645dce"
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-white box-shadow-1 p-4 rounded-lg xl:p-[0.833vw]">
                  <div className="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                    <p>Selected Dates</p>
                  </div>
                </div>
                <div className="bg-white box-shadow-1 p-4 mt-6 rounded-lg xl:p-[0.833vw] xl:mt-[1.250vw]">
                  <div class="text-[#101828] font-semibold text-base xl:text-[0.833vw]">
                    <p>Absence Codes - Legends</p>
                  </div>
                  <div className="flex flex-wrap xl:flex-nowrap gap-4 mt-5 xl:gap-[0.938vw] xl:mt-[1.250vw]">
                    <div class="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                      <p>
                        B - <span class="font-normal">Berevement</span>
                      </p>
                      <p>
                        D - <span class="font-normal">District Approved</span>
                      </p>
                      <p>
                        DC - <span class="font-normal">District Covid</span>
                      </p>
                      <p>
                        I - <span class="font-normal">Illness</span>
                      </p>
                      <p>
                        J - <span class="font-normal">Jury Duty</span>
                      </p>
                      <p>
                        L - <span class="font-normal">Last Day Worked</span>
                      </p>
                      <p>
                        OU - <span class="font-normal">Other Unpaid</span>
                      </p>
                    </div>
                    <div class="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                      <p>
                        PA -{" "}
                        <span class="font-normal">Personal (Approved)</span>
                      </p>
                      <p>
                        NA -{" "}
                        <span class="font-normal">Personal (Not Approved)</span>
                      </p>
                      <p>
                        PN - <span class="font-normal">Personal Necessity</span>
                      </p>
                      <p>
                        S - <span class="font-normal">Suspension</span>
                      </p>
                      <p>
                        V - <span class="font-normal">Vacation</span>
                      </p>
                      <p>
                        W - <span class="font-normal">Witness (District)</span>
                      </p>
                      <p>
                        WC -{" "}
                        <span class="font-normal">Worker’s Compensation</span>
                      </p>
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
