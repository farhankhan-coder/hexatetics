import React, { Fragment, useState, useEffect } from 'react';
import { useFullScreenHandle } from "react-full-screen";
import Link from 'next/link';
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import moment from "moment";
import { Apps } from '../../../helper/enum'
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel, TabView } from 'primereact/tabview';
import { useRouter } from "next/router";
import { Button } from 'primereact/button';
import { AllStatusData } from '@/components/helper/enum';

export default function Index(props) {
  const handle = useFullScreenHandle();
  const router = useRouter();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });
  const [rows, setRows] = useState(10)
  const [schoolFilterValue, setSchoolFilter] = useState('');
  const [weekFilterValue, setWeekFilter] = useState('');
  const [submittedFilterVlaue, setSubmittedFilter] = useState('');
  const [statusFilterValue, setStatusFilter] = useState('')
  console.log('props.activeIndex', props.activeIndex)
  //State's for EYEPOPUP
  const [schoolName, setSchoolName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [comment, setComment] = useState("");
  const [employeeReports, setEmployeeReports] = useState([]);
  const [administratorData, setAdministratorData] = useState([]);
  const [CertificatedDatas, setCertificatedDatas] = useState([]);
  const [events, setEvents] = useState([])


  const getSeverity = (status) => {
    switch (status) {
      case AllStatusData.PENDING:
        return 'warning';

      case AllStatusData.SUBMITTED:
        return 'info';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.REVIEWED_AND_RESUBMITTED:
        return 'warning';

      case AllStatusData.APPROVED:
        return 'warning';

      case AllStatusData.REJECTED:
        return 'danger';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.PENDING_FOR_APPROVAL:
        return 'warning'

      case AllStatusData.PENDING_FOR_ACKNOWLEDGEMENT:
        return 'warning'

      default:
        return null;
    }
  };

  const [statuses] = useState([AllStatusData.APPROVED, AllStatusData.PENDING, AllStatusData.REJECTED,
  AllStatusData.SUBMITTED, AllStatusData.REVIEWED_AND_RESUBMITTED, AllStatusData.CLOSED]);

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown value={props.statusFilterValue} options={statuses}
        // onChange={(e) => {options.filterApplyCallback(e.value)}} 
        onChange={(e) => { props.setStatusFilter(e.value) }}
        itemTemplate={statusItemTemplate} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const TimeSubmitted = (rowdata) => {
    return (rowdata.submittedOn !== null && rowdata.statusDateTime !== null ? <span> {moment(rowdata.statusDateTime).format("MM/DD/YYYY")} </span> : "-");
  }

  const TaskStatusSLA = (rowdata) => {
    return <Tag value={rowdata.status} severity={TaskStatusSL(rowdata)}></Tag>;
  };

  const TaskStatusSL = (rowdata) => {
    console.log("rowdata",rowdata)
    switch (rowdata.status) {
      case AllStatusData.PENDING:
        return 'warning';

      case AllStatusData.SUBMITTED:
        return 'info';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.REVIEWED_AND_RESUBMITTED:
        return 'warning';

      case AllStatusData.APPROVED:
        return 'warning';

      case AllStatusData.REJECTED:
        return 'danger';

      case AllStatusData.CLOSED:
        return 'success';

      case AllStatusData.PENDING_FOR_APPROVAL:
        return 'warning'

      case AllStatusData.PENDING_FOR_ACKNOWLEDGEMENT:
        return 'warning'

      default:
        return null;
    }
  };

  const handelWeekDurationChange = () => {
    return (
      <InputText value={props.weekFilterValue} onChange={(e) => props.setWeekFilter(e.target.value)} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
    );
  }

  const handelSchoolNameChange = () => {
    return (
      <InputText value={props.schoolFilterValue} onChange={(e) => props.setSchoolFilter(e.target.value)} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
    );
  };

  const handelSubmittedOnChange = () => {
    return (
      <InputText value={props.submittedFilterVlaue} onChange={(e) => props.setSubmittedFilter(e.target.value)} placeholder="Select" className="p-column-filter custDropdown" showClear style={{ minWidth: '7rem' }} />
    );
  }

  const onSelectionChange = (event) => {
    const value = event.value;
    // console.log("value",value)
  };

  return (
    <>
      <div
        className="relative z-10 col-span-12 lg:col-span-12 pt-9"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="bg-[#fff] box-shadow-2 radius8 border border-[#E4E7EC]">
          <div className="flex items-center justify-between p-[20px] xl:px-[1.250vw] xl:py-[0.990vw] border-b border-[#E4E7EC] ">
            <div className="flex items-center gap-2">
              <p className="text-[22px] xl:text-[0.938vw] text-[#101828] font-medium">
                {Apps.WeeklyAbsentReportClassified}
              </p>
              <Tag severity="" value={`${props.count} Request`} style={{ background: '#EFF8FF', color: '#0487C8', marginTop: "-3px" }} rounded></Tag>
            </div>
            <div className="flex gap-2 xl:gap-[0.990vw] items-center">
              <Link
                href="/war_classified/initiate/create"
                className="w-full text-center tableBtn blue rounded-lg"
              >
                <i className="gusd-pluse-circle mx-1.5 "></i> Initiate New
                Report
              </Link>
              <i className="pi pi-download"></i>
              <Link href="#" onClick={handle.enter}>
                <i className="gusd-expand"></i>
              </Link>
            </div>
          </div>

          {props.isListLoaded === true ?
            <>
              <div className="flex flex-wrap gap-2 mb-3 borderTabs">
                <Button onClick={() => router.push("/war_classified")} className={props.activeIndex === 0 ? 'active_tabed' : 'p-button-text tab_inactived'} label="Initiate Reports" />
                <Button onClick={() => router.push("/war_classified/approver")} className={props.activeIndex === 1 ? 'active_tabed' : 'p-button-text tab_inactived'} label="Requested Reports" />
                <Button onClick={() => router.push("/war_classified/payroll")} className={props.activeIndex === 2 ? 'active_tabed' : 'p-button-text tab_inactived'} label="Payroll Reports" />
              </div>
              <div className={props.weeklyAbsenceReports.length === 0 ? "datatableemptymessage arrowhide" : "initiator  arrowshow"}>
                <DataTable
                  className="custpaginator custIconsTable custmBtnTable custTable "
                  sortField="submittedOn"
                  filters={""}
                  filterDisplay="row"
                  loading={""}
                  scrollable
                  lazy
                  value={props.weeklyAbsenceReports}
                  first={props.lazyState.first}
                  paginator
                  rows={props.rows}
                  rowsPerPageOptions={[10, 20, 30]}
                  totalRecords={props.count}
                  onSelectionChange={onSelectionChange}
                  onPage={props.onPage}
                >
                  <Column
                    header="SL#"
                    style={{ maxWidth: "5rem" }}
                    body={(data, options) => options.rowIndex + 1}
                  ></Column>
                  <Column
                    field="workDuration"
                    header="Week Duration"
                    filter
                    filterPlaceholder="Search"
                    sortable
                    style={{ minWidth: "14rem" }}
                    filterElement={(e) => handelWeekDurationChange(e.value, e.field)}
                  ></Column>
                  <Column
                    field="schoolName"
                    header="School/Department Name"
                    filter
                    filterPlaceholder="Search"
                    sortable
                    style={{ minWidth: "16rem" }}
                    filterElement={(e) => handelSchoolNameChange(e.value, e.field)}
                  ></Column>
                  <Column
                    field="submittedOn"
                    header="Submitted On"
                    filter
                    filterPlaceholder="Search"
                    sortable
                    style={{ minWidth: "7rem" }}
                    body={TimeSubmitted}
                    filterElement={(e) => handelSubmittedOnChange(e.value, e.field)}
                  ></Column>
                  <Column
                    field="status"
                    header="Status"
                    showFilterMenu={false}
                    filterMenuStyle={{ minWidth: "14rem" }}
                    style={{ maxWidth: "14rem" }}
                    body={TaskStatusSLA}
                    filter
                    filterElement={statusRowFilterTemplate}
                  ></Column>
                  <Column
                    field="remark"
                    header="Remarks"
                    align="center"
                    style={{ maxWidth: "6rem" }}
                  ></Column>
                  <Column
                    field="action"
                    frozen
                    alignFrozen='right'
                    header="Action"
                    align="center"
                    body={props.superAdminActions}
                    style={{ minWidth: "3rem" }}

                  ></Column>
                </DataTable>
              </div>
            </>
            :
            <div className='text-center py-8' >
              {/* <ProgressSpinner /> */}
              <div>No data Found</div>
              </div>
          }
        </div >
      </div >

    </>
  );
}
