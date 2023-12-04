import { Image } from "primereact/image";
import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
// import Layout from '../../Component/nav/initiator/nav.component';
import Layout from "@/components/layout/layout";

import { Sidebar } from "primereact/sidebar";
// import sideBarRight from "../../assets/images/sidebarright.svg"
// import { useReactToPrint } from "react-to-print";
import { Tag } from "primereact/tag";
import { Timeline } from "primereact/timeline";
import { Dropdown } from "primereact/dropdown";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import EyePopup from "@/components/popups/eyePopup";

export default function SubstituteReportList() {
  const [position, setPosition] = useState("right");
  const [visible, setVisible] = useState(false);
  const [fullViewForView, setFullViewForView] = useState(false);

  const handle = useFullScreenHandle();

  const data = [
    {
      sLNo: "1",
      assignmentTitle: "11/07/2023 to 11/09/2023",
      dates: "2023/08/9",
      submittedOn: "20223/09/09",
      status: "pending",
      remark: "-",
      action: "",
    },
    {
      sLNo: "2",
      assignmentTitle: "11/07/2023 to 11/09/2023",
      dates: "2023/08/9",
      submittedOn: "20223/09/09",
      status: "Rejected",
      remark: "-",
      action: "",
    },
  ];

  const reportListActions = (row) => {
    return [
      <>
        <Link
          href="#"
          className="py-2 px-2.5"
          onClick={() => {
            setVisible(true);
          }}
        >
          <i className="gusd-eye text-[#667085] text-[20px] font-meduim"></i>
        </Link>
        <Link href="/timeReport/initiateNewReport" className="py-2 px-2.5">
          <i className="gusd-edit text-[18px] text-[#667085] font-meduim"></i>
        </Link>
      </>,
    ];
  };

  const getSeverity = (status) => {
    switch (status) {
      case "Rejected":
        return "danger";

      case "Pending for Budget Approver":
        return "success";

      case "Pending for Principal/Department Head":
        return "info";

      case "pending":
        return "warning";

      case "renewal":
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };
  // table configs starts
  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  // });
  const events = [
    {
      status: "Rejected",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "Approved",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
  ];
  const getEvent = (Product) => {
    switch (Product.status) {
      case "Rejected":
        return "danger";

      case "Approved":
        return "success";

      case "Pending for Principal/Department Head":
        return "info";

      case "pending":
        return "warning";

      case "renewal":
        return null;
    }
  };

  const ApprovalData = [
    {
      title: "SP-EMP-05-TC",
      name: "Nilesh Nigade teacher three",
      status: "Rejected",
    },
    {
      title: "7887",
      name: "Sixth Approverone",
      status: "Approved",
    },
  ];
  const EventSatatus = (status) => {
    switch (status) {
      case "Rejected":
        return "danger";

      case "Approved":
        return "success";

      case "Pending for Principal/Department Head":
        return "info";

      case "pending":
        return "warning";

      case "renewal":
        return null;
    }
  };
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ]);
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const getEventSatatus = (Product) => {
    return (
      <Tag value={Product.status} severity={EventSatatus(Product.status)} />
    );
  };

  return (
    <Layout>
      <FullScreen handle={handle}>
        <div
          className="mt-7 relative z-10 col-span-12 lg:col-span-12 Tr-fullBody"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]">
            <div className="flex items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
              <p className="text-[22px] xl:text-[0.938vw]  text-[#101828] font-medium">
                Time Report
              </p>
              <div className="flex gap-2 xl:gap-[0.990vw] items-center">
                <Link
                  href="/timeReport/initiateNewReport"
                  className="w-full text-center tableBtn blue rounded-lg"
                >
                  <i className="gusd-pluse-circle mx-1.5 "></i> Initiate New
                  Report
                </Link>
                <Link onClick={handle.enter} href="#">
                  <i className="gusd-expand"></i>
                </Link>
              </div>
            </div>
            <TabView>
              <TabPanel header="Initiate Reports">
                <div className="initiator  arrowshow">
                  <div className="xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]">
                    <DataTable
                      className="custpaginator custIconsTable custmBtnTable custTable"
                      scrollable
                      filters={""}
                      filterDisplay="row"
                      value={data}
                      paginator
                      rowsPerPageOptions={[10, 20, 30]}
                      responsiveLayout="scroll"
                      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                      rows={11}
                      emptyMessage="No records found."
                    >
                      <Column
                        field="sLNo"
                        header="SL#"
                        style={{ maxWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="assignmentTitle"
                        header="Period"
                        filter
                        filterPlaceholder="Search"
                        sortable
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="dates"
                        filter
                        filterPlaceholder="Search"
                        header="School/Dept"
                        sortable
                      ></Column>
                      <Column
                        field="submittedOn"
                        header="Submitted On"
                        sortable
                        filter
                        filterPlaceholder="Search"
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="designation"
                        header="Status"
                        filter
                        filterElement={statusRowFilterTemplate}
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: "8rem" }}
                        className="Tr-statusField"

                      ></Column>
                      <Column
                        field="remark"
                        header="Remarks"
                        align="center"
                        filterPlaceholder="Search by Assignment Remarks"
                        style={{ minWidth: "6rem" }}
                      ></Column>
                      <Column
                        field="action"
                        header="Actions"
                        align="center"
                        body={reportListActions}
                        style={{ minWidth: "12rem" }}
                        exportable={false}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="Requested Reports">
                <div className="initiator  arrowshow">
                  <div className="xl:h-[37.760vw]  2xl:h-[37.760vw] lg:h-[37.760vw] h-[500px]">
                    <DataTable
                      className="custpaginator custIconsTable custmBtnTable custTable"
                      scrollable
                      filters={""}
                      filterDisplay="row"
                      value={data}
                      paginator
                      rowsPerPageOptions={[10, 20, 30]}
                      responsiveLayout="scroll"
                      paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                      rows={11}
                      emptyMessage="No records found."
                    >
                      <Column
                        field="sLNo"
                        header="SL#"
                        style={{ maxWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="assignmentTitle"
                        header="Period"
                        filter
                        filterPlaceholder="Search"
                        sortable
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="dates"
                        filter
                        filterPlaceholder="Search"
                        header="School/Dept"
                        sortable
                      ></Column>
                      <Column
                        field="submittedOn"
                        header="Submitted On"
                        sortable
                        filter
                        filterPlaceholder="Search"
                        style={{ minWidth: "5rem" }}
                      ></Column>
                      <Column
                        field="designation"
                        header="Status"
                        filter
                        filterElement={statusRowFilterTemplate}
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: "8rem" }}
                        className="Tr-statusField"
                      ></Column>
                      <Column
                        field="remark"
                        header="Remarks"
                        align="center"
                        filterPlaceholder="Search by Assignment Remarks"
                        style={{ minWidth: "6rem" }}
                      ></Column>
                      <Column
                        field="action"
                        header="Actions"
                        align="center"
                        body={reportListActions}
                        style={{ minWidth: "12rem" }}
                        exportable={false}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
          {/* <Sidebar className="relative reports-popup" visible={visible} position={position}
                        style={{ width: `${(fullViewForView) ? '70vw' : '70vw'}` }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() =>
                            setVisible(false)
                        } >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="col-span-1 lg:col-span-8 bg-[#F5F6F7] h-auto">
                                <div className="p-5">
                                    <div onClick={() => setVisible(false)} className="py-3">
                                        <Image src={"sideBarRight"} alt="user" width="24" height="24" /></div>
                                    {
                                        (!fullViewForView) ?
                                            <div>
                                                <div className='text-center'>
                                                    <div className="text-[#000000] text-md lg:text-[0.833vw] font-bold">GLENDALE UNIFIED SCHOOL DISTRICT</div>
                                                    <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">Request For Approval - Substitute Request Classified</div>
                                                </div>
                                                <div className='pt-3'>
                                                    <p>Approval Status</p>
                                                    <div className="py-3 emp-simple-tbl">
                                                        <DataTable
                                                            className="custpaginator custIcons custmBtnTable custTable"
                                                            value={ApprovalData}
                                                        >
                                                            <Column field="title" header="Title"></Column>
                                                            <Column field="name" header="Name"></Column>
                                                            <Column field="status" body={getEventSatatus} header="Status"></Column>
                                                        </DataTable>
                                                    </div>
                                                </div>
                                            </div> : null
                                    }
                                    <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">
                                        {
                                            (!fullViewForView) ?
                                                <div className='flex justify-between'>
                                                    <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Substitute Req...pdf</div>
                                                    <button onClick={() => setFullViewForView(true)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>View Full Screen</button>
                                                </div> :
                                                <div className='flex justify-between'>
                                                    <div className="text-[#344054] font-medium text-[20px] pb-3"><i className="mr-3 gusd-document"></i>Substitute Request Classified Teaching Assignment.pdf</div>
                                                    <button onClick={() => setFullViewForView(false)} className="text-[#113699] font-medium text-[14px] pb-3"><i className="pi pi-calendar mr-1 mt-2"></i>Exit Full Screen</button>
                                                </div>
                                        }
                                        {
                                            (!fullViewForView) ?
                                                <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] h-10' style={{ height: '286px' }}>
                                                    <div id="my-html-template" className='border px-8'>
                                                        <div className='flex gap-10 justify-end' >
                                                            <b>CLASSIFIED</b>
                                                            <b >FORM 3</b>
                                                        </div>
                                                        <center style={{ marginTop: '10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                            <div>Glendale, California</div>
                                                            <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>
                                                            <div className='border w-full border-4 text-[12px] mt-4'>
                                                                DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.
                                                            </div>
                                                        </center>
                                                    </div>
                                                </div> :
                                                <div className="grid grid-cols-1">
                                                    <div>
                                                        <div ref={componentRef} >
                                                            <div className='mt-[24px] xl:mt-[1.250vw] pb-[40px] xl:pb-[2.083vw] p-3'>
                                                                <div id="my-html-template" className='border px-8'>
                                                                    <div className='w-full pt-3 ' >
                                                                        <div className='flex justify-center '>
                                                                            <b className=''>CLASSIFIED </b>
                                                                        </div>
                                                                        <div className='flex justify-end relative top-[-1.4vw] print:top-[-1.6vw]'>
                                                                            <b className=''>FORM 3 </b>
                                                                        </div>
                                                                    </div>
                                                                    <center className='font-semibold' style={{ marginTop: '-10px' }}>GLENDALE UNIFIED SCHOOL DISTRICT
                                                                        <div>Glendale, California</div>
                                                                        <div style={{ marginTop: '20px' }}><b>ADVANCE REQUEST FOR CLASSIFIED SUBSTITUTE</b></div>

                                                                        <div className='border border-[#545454] w-2/4 text-[12px] mt-4 p-4 rounded-lg'>
                                                                            DIRECTIONS:This form is to be completed and routed according to the approval signature(s) sequence below when requesting a Classified Substitute.
                                                                        </div>
                                                                    </center>
                                                                    <div className='mt-8'>
                                                                        <div className='leading-8 '>
                                                                            <div className='flex justify-between'>
                                                                                <div className='flex gap-2'>CLASSIFICATION <div className='text-[green] font-bold ml-2 w-[14.625vw]  print:w-[20.625vw]   border-b border-[#545454]'>a</div>
                                                                                </div>
                                                                                <div>DATES From: <span className='text-[green] font-bold border-b border-[#545454]'>08/02/2023</span> Thru: <span className='text-[green] font-bold border-b border-[#545454]'>08/31/2023</span></div></div>
                                                                            <div>Type of Sub Request/Object Code: <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[20.625vw]'>CODE1</span></div>
                                                                            <div className='flex gap-2'>Absent Employee's Legal Name (if applicable) <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[30.625vw]'>Abedian Sarineh (80928)</span></div>

                                                                            <div className='flex justify-between'>
                                                                                <div>Total Working Hours <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[20.625vw]'></span></div>
                                                                                <div>From <span className='text-[green] font-bold border-b border-[#545454]'>10:11 PM</span> To <span className='text-[green] font-bold border-b border-[#545454]'>10:25 PM</span></div>
                                                                            </div>
                                                                            <div className='flex gap-2 mt-1'>
                                                                                <div>Location</div>
                                                                                <div className='text-[green] font-bold border-b border-[#545454]'>Business & financial services
                                                                                </div>
                                                                            </div>
                                                                            <div>Reason For Absence/Request <span className='text-[green] font-bold border-b border-[#545454]'> reason</span>
                                                                            </div>
                                                                            <div className='flex justify-between'>
                                                                                <div className='flex gap-1'>
                                                                                    If possible, we would like to have
                                                                                    <span className='text-[green] font-bold border-b border-[#545454] w-[15.625vw]  print:w-[20.625vw]'></span><span className='text-[green] font-bold '>
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex gap-2'>
                                                                                    <span>Confirmation status </span><span className='text-[green] font-bold border-b border-[#545454] w-[1]  print:w-[2.625vw]'>
                                                                                    </span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='mt-8 w-2/4 text-left'>
                                                                            <div className='font-bold text-center'>Account Number(s) To Be Charged
                                                                            </div>
                                                                            <div className='flex justify-center border-b border-[#545454] w-[20.625vw]  print:w-[30.625vw]'></div>
                                                                        </div>
                                                                        <div className='text-[10px] mt-[2vw] py-3'>Revised 1/17/23</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className='w-[100%] bg-[#113699] border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#fff] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center' onClick={handlePrint} >Print</button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-4 bg-[#F5F6F7] h-auto'>
                                <div className="p-5">
                                    <div className="text-[#344054] text-[16px] font-medium py-3">Form History</div>
                                    <div className="card custTable py-2">
                                        <Timeline value={events}
                                            opposite={(item) => <Tag
                                                severity={getEvent(item)} className="mr-2 relative d-tag top-[-5px]"
                                                value={item.status}></Tag>}
                                            content={(item, i) => <div className="relative top-[-10px]">
                                                <div className="text-[#667085] text-[12px] ml-2">Step {i + 1}</div>
                                                <div className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] leading-tight ml-2">HANRIET Aghajani</div>
                                                <div className="text-color-secondary text-[9px] ml-2">08/31/2023, 05:38 PM</div>
                                            </div>} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Sidebar> */}
        </div>
      </FullScreen>
      <EyePopup
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
      />
    </Layout>
  );
}
