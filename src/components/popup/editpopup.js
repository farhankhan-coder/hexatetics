import Link from "next/link";
import { Dialog } from 'primereact/dialog'
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
// import { InitiateClassifiedWeeklyAbsenceReport, InitiateClassifiedWeeklyAbsenceReportStatus, ReportsLog } from "../../models";
import { reactLocalStorage } from 'reactjs-localstorage';
import moment from "moment";
import { useReactToPrint } from "react-to-print";
// import { handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified } from '../../components/actions/notficationActions';
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';

export default function Editpopup(props) {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [reason, setReason] = useState(false);
    const componentRef = useRef();
    const [absentCodeList, setAbsentCodeList] = useState([]);

    const fullDay = "Full Day";

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const bothFalse = () => {
        setVisible2(false);
        setVisible(false);
        props.popupstate();
    }


    const onClickAck = async () => {
        const loggedUserId = reactLocalStorage.get("loggedUserId");
        const currentDateTime = moment();

        //console.log(InitiateClassifiedWeeklyAbsenceReportStatus)
        if (props.type === "Payroll") {
            if (props.reportId) {

                alertify.confirm('Confirmation', 'Do you want to approve?', async function () {
                    // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);

                    const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)


                    // Update record
                    await API.graphql({
                        query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                        variables: {
                            input: {
                                id: original.id,
                                _version: original._version,
                                payroll_status: InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED,
                                payroll_by: loggedUserId,
                                payroll_date_time: moment(currentDateTime).toISOString()

                            }
                        }
                    });

                    props.popupstate()
                    props.bindList();

                    /*   await DataStore.save(
                          InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                              updated.payroll_status = InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED;
                              updated.payroll_by = loggedUserId;
                              updated.payroll_date_time = moment(currentDateTime).toISOString()
                          })
                      ).then(() => {
                          props.popupstate()
                          props.bindList();
                      }) */

                    handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified('PENDING_FOR_PAYROLL', props.reportId, "WEEKLY_ABSENCE_REPORT", original.user_id, loggedUserId);
                    handlePrint();

                }
                    , function () { });

            }


        }

    }
    //* onclick Approve
    const onClickApprove = async () => {

        const loggedUserId = reactLocalStorage.get("loggedUserId");
        const currentDateTime = moment();

        if (props.type === "Payroll") {
            if (props.reportId) {
                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);

                var original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)

                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            payroll_status: InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED,
                            payroll_by: loggedUserId,
                            payroll_date_time: moment(currentDateTime).toISOString()

                        }
                    }
                });

                props.popupstate()
                props.bindList();

                /*  await DataStore.save(
                     InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                         updated.payroll_status = InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_ACCEPTED;
                         updated.payroll_by = loggedUserId;
                         updated.payroll_date_time = moment(currentDateTime).toISOString()
                     })
                 ).then(() => {
                     props.popupstate()
                     props.bindList();
                 }) */

                handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified('PENDING_FOR_PAYROLL', props.reportId, "WEEKLY_ABSENCE_REPORT", original.user_id, loggedUserId);
            }
        } else if (props.type === "Initiator") {
            if (props.reportId) {
                var original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)

                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);

                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            status: InitiateClassifiedWeeklyAbsenceReportStatus.SUBMITTED,
                            status_date_time: moment(currentDateTime).toISOString()
                        }
                    }
                });

                props.popupstate()
                props.bindList();

                /*  await DataStore.save(
                     InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                         updated.status = InitiateClassifiedWeeklyAbsenceReportStatus.SUBMITTED;
                         updated.status_date_time = moment(currentDateTime).toISOString()
                     })
                 ).then(() => {
                     props.popupstate()
                     props.bindList();
                 }) */
            }
        }
        else if (props.type === "Approver") {
            if (props.reportId) {
                const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)



                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            approver_status: InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED,
                            approver_by: loggedUserId,
                            approver_date_time: moment(currentDateTime).toISOString()
                        }
                    }
                });

                props.popupstate()
                props.bindList();


                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);
                /*  await DataStore.save(
                     InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                         updated.approver_status = InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_ACCEPTED;
                         updated.approver_by = loggedUserId;
                         updated.approver_date_time = moment(currentDateTime).toISOString()
                     })
                 ).then(() => {
                     props.popupstate()
                     props.bindList();
                 }) */

                handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified('APPROVED', props.reportId, "WEEKLY_ABSENCE_REPORT", original.l2_authority, loggedUserId);
                handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified('APPROVEDBY', props.reportId, "WEEKLY_ABSENCE_REPORT", original.user_id, loggedUserId);
            }


        }
    }



    //* onclick Reject
    const onClickSend = async () => {
        const loggedUserId = reactLocalStorage.get("loggedUserId");
        const currentDateTime = moment();


        if (props.type === "Payroll") {
            if (props.reportId) {

                //*Save Logged Report
                await API.graphql(
                    graphqlOperation(mutations.createReportsLog, {
                        input: {
                            report_id: props.reportId,
                            comment: reason,
                            date_and_time: moment(currentDateTime).toISOString(),
                            user_id: loggedUserId
                        }
                    })
                );

                /* await DataStore.save(
                    new ReportsLog({
                        "report_id": props.reportId,
                        "comment": reason,
                        "date_and_time": moment(currentDateTime).toISOString(),
                        "user_id": loggedUserId
                    })
                ); */

                const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)

                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);

                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            payroll_remark: reason
                        }
                    }
                });

                props.popupstate()
                props.bindList();

                /*  await DataStore.save(
                     InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                         updated.payroll_remark = reason;
                     })
                 ).then(() => {
                     props.bindList();
                     props.popupstate();
                     // setVisible(false);
                     // setVisible2(false);
                 }) */
            }
        } else if (props.type === "Approver") {
            if (props.reportId) {

                //*Save Logged Report
                await API.graphql(
                    graphqlOperation(mutations.createReportsLog, {
                        input: {
                            report_id: props.reportId,
                            comment: reason,
                            date_and_time: moment(currentDateTime).toISOString(),
                            user_id: loggedUserId
                        }
                    })
                );

                /* await DataStore.save(
                    new ReportsLog({
                        "report_id": props.reportId,
                        "comment": reason,
                        "date_and_time": moment(currentDateTime).toISOString(),
                        "user_id": loggedUserId
                    })
                ); */

                const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)
                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);


                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            approver_remark: reason
                        }
                    }
                });

                props.bindList();

                /* await DataStore.save(
                    InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                        updated.approver_remark = reason;
                    })
                ).then(() => {
                    props.bindList();
                    // props.popupstate();
                    // setVisible(false);
                    // setVisible2(false);
                }) */

                handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified('REJECTED', props.reportId, "WEEKLY_ABSENCE_REPORT", original.user_id, loggedUserId, reason);
            }
        }

    }

    //* onclick Reject
    const onClickReject = async () => {

        const loggedUserId = reactLocalStorage.get("loggedUserId");
        const currentDateTime = moment();

        if (props.type === "Payroll") {
            if (props.reportId) {
                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);
                const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)

                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            payroll_status: InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_REJECTED,
                            payroll_by: loggedUserId,
                            payroll_date_time: moment(currentDateTime).toISOString()
                        }
                    }
                });

                setVisible(true)
                props.bindList();

                /* await DataStore.save(
                    InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                        updated.payroll_status = InitiateClassifiedWeeklyAbsenceReportStatus.PAYROLL_REJECTED;
                        updated.payroll_by = loggedUserId;
                        updated.payroll_date_time = moment(currentDateTime).toISOString()
                    })
                ).then(() => {
                    setVisible(true)
                    props.bindList();
                    // props.popupstate();
                }) */
            }
        } else if (props.type === "Approver") {
            if (props.reportId) {
                // const original = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, props.reportId);
                const original = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", props.reportId)

                // Update record
                await API.graphql({
                    query: mutations.updateInitiateClassifiedWeeklyAbsenceReport,
                    variables: {
                        input: {
                            id: original.id,
                            _version: original._version,
                            approver_status: InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_REJECTED,
                            approver_by: loggedUserId,
                            approver_date_time: moment(currentDateTime).toISOString()
                        }
                    }
                });

                props.bindList();

                /*  await DataStore.save(
                     InitiateClassifiedWeeklyAbsenceReport.copyOf(original, (updated) => {
                         updated.approver_status = InitiateClassifiedWeeklyAbsenceReportStatus.APPROVAL_REJECTED;
                         updated.approver_by = loggedUserId;
                         updated.approver_date_time = moment(currentDateTime).toISOString()
                     })
                 ).then(() => {
 
                     // setVisible(true);
                     props.bindList();
                     // props.popupstate();
 
                 }) */
            }
        }

    }
    const BindList = async () => {
        var AbsentCodeResponses = await graphQLGetAllData("listAbsentCodes")
        AbsentCodeResponses = AbsentCodeResponses.sort((a, b) => a.name.localeCompare(b.name));
        setAbsentCodeList(AbsentCodeResponses)
    };

    useEffect(() => {
        BindList();
    }, []);

    return (
        <div >
            <div className="grid grid-cols-2 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8 bg-[#F5F6F7]  p-5">
                    <div className="pb-4">
                        <button onClick={() => props.popupstate()}> <i className='gusd-close-sidebar text-black ' style={{ fontSize: 20 }}></i>
                        </button>
                    </div>
                    <div>
                        <div className="text-[#113699] text-[16px] font-semibold leading-6">Glendale Unified School District</div>
                        <div className="text-[#344054] text-[12px] font-normal leading-4">Weekly Absence Report - Classified form</div>
                    </div>
                    <div className=' pt-2'>
                        <div className=' py-3'>
                            <div className='flex items-center justify-between border-b px-2 py-4'>
                                <div className='text-[#344054] text-[12px] font-normal leading-5 tracking-[-0.02em]'><p>School or Department</p></div>
                                <div className='text-[#344054] text-[12px] font-semibold leading-5 tracking-[-0.02em]'><p>{props.schoolName}</p></div>
                            </div>
                            <div className='flex items-center justify-between border-b py-4 px-2'>
                                <div className='text-[#344054] text-[12px] font-normal leading-5 tracking-[-0.02em]'><p>From</p></div>
                                <div className='text-[#344054] text-[12px] font-semibold leading-5 tracking-[-0.02em]'><p>{props.fromDate}</p></div>
                            </div>
                            <div className='flex items-center justify-between border-b py-4 px-2'>
                                <div className='text-[#344054] text-[12px] font-normal leading-5 tracking-[-0.02em]'><p>To</p></div>
                                <div className='text-[#344054] text-[12px] font-semibold leading-5 tracking-[-0.02em]'><p>{props.toDate}</p></div>
                            </div>
                            <div className='flex items-center justify-between border-b py-4 px-2'>
                                <div className='text-[#344054] text-[12px] font-normal leading-5 tracking-[-0.02em]'><p>Status</p></div>
                                <div className='text-[#93370D] text-[12px] font-semibold leading-5 tracking-[-0.02em] bg-[#FEF0C7] px-2 rounded-sm'><p>{props.status}</p></div>
                            </div>

                            <div className='flex items-center justify-between border-b py-4 px-2'>
                                <div className='text-[#344054] text-[12px] font-normal leading-5 tracking-[-0.02em]'><p>Comment</p></div>
                                <div className='text-[#344054] text-[12px] font-semibold leading-5 tracking-[-0.02em]'><p>{props.comment}</p></div>
                            </div>

                        </div>
                    </div>
                    <div className="py-3 emp-simple-tbl">
                        {
                            props.reportEmployeeLoading === true ?
                                <DataTable value={props.reportEmployeeList} rowGroupMode="rowspan" groupRowsBy="employeeName" emptyMessage="No Absence">
                                    <Column field="employeeName" header="Name of Employee"></Column>
                                    <Column field="absent_date" header="Dates Absent"></Column>
                                    <Column field="absent_code_id" header="Absent Codes"></Column>
                                    <Column field="partial_hour" body={(row) => {
                                        return (
                                            <h1>
                                                {row.is_full_day ? "Full Day"
                                                    :
                                                    (row.partial_hour === null ? "0" : row.partial_hour) + "." + (row.partial_min === null ? "0" : Number(row.partial_min / 60).toFixed(2).slice(-2).padStart(2, '0')) + "Hr"
                                                }

                                            </h1>
                                        )

                                    }}
                                        header="Total Hours"></Column>
                                    <Column field="substitutedEmployeeName" header="Substitute"></Column>
                                </DataTable> :
                                <div className="card flex justify-content-center">
                                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="5" fill="var(--surface-ground)" animationDuration="2s" />
                                </div>
                        }
                    </div>

                    {/* <div className="dialogpoput flex  justify-center py-8">
                    <InputSwitch checked={checked1} className='dialogpoput' onChange={(e) => setChecked1(e.value)} />
                    <span className="text-[#1E3E5A] text-[14px] font-medium leading-5 tracking-[-0.02em] pl-2 ">Add e Signature</span>
                </div> */}
                    <div className="bg-[#EFF0F1]">
                        <div className="p-5">
                            <div className="text-[#344054] text-[14px] font-medium leading-5 tracking-[-0.02em]">Absence Codes - Legends</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 p-2">
                                <div className="cols-span-1">
                                    <table className="table-auto">
                                        <tbody>
                                            {absentCodeList.length > 0 && absentCodeList.slice(0, 7).map((item, index) => {
                                                return (<>
                                                    <tr>
                                                        <td className="text-[#344054] text-[12px] font-semibold leading-5 text-right">{item.code}- </td>
                                                        <td className="text-[#344054] text-[12px] font-normal leading-5">{item.name}</td>
                                                    </tr>
                                                </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cols-span-1">
                                    <table className="table-auto">
                                        <tbody>
                                            {absentCodeList.length > 0 && absentCodeList.slice(7, 14).map((item, index) => {
                                                return (<>
                                                    <tr>
                                                        <td className="text-[#344054] text-[12px] font-semibold leading-5 text-right">{item.code}- </td>
                                                        <td className="text-[#344054] text-[12px] font-normal leading-5">{item.name}</td>
                                                    </tr>
                                                </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 justify-center justify-between my-2 px-2 xl:my-[2.083vw] pt-20 gap-4">


                        {props.type !== "Payroll" ?
                            <>
                                <button onClick={() => props.popupstate()} className="custmBtn2 flex border rounded-lg text-center text-[#344054]"><i className="gusd-close-circle-bold text-[14px] pr-3"></i>Cancel
                                </button>
                                <button className="custmBtn2 flex text-[#D92D20] border rounded-lg text-center" onClick={() => {
                                    // onClickReject();
                                    setVisible(true)
                                }
                                }><i className="gusd-close pr-3 text-[12px]"></i>Reject
                                </button>
                                <button className="custmBtn2 flex border rounded-lg bg-[#006b3c] text-[#ffffff] text-center" onClick={() => { onClickApprove(); }}><i className="gusd-check pr-3 text-[14px]"></i>Approve
                                </button>
                            </>
                            :
                            <>
                                {/* <button onClick={() => props.popupstate()} className=" h-10 mt-10 border rounded-lg text-center text-[#344054]"><i className="gusd-close-circle-bold text-[10px] pr-3"></i>Cancel
                    </button> */}

                                {/*<button className="mt-10 h-10 custmBtn2 border rounded-lg bg-[#006b3c] text-[#ffffff] text-center" onClick={() => { onClickAck(); }}><i className="gusd-check  text-[14px]"></i>Acknowledge
                    </button>*/}
                                {/***** print start  */}

                                <div className="bg-white  blue rp-3 border mt-5 col-span-3 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#344054] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">


                                    <span className="mr-3 "></span><span className='printicon "' onClick={onClickAck}>Acknowledge and Print</span>

                                    {/* print layout start */}
                                    <div style={{ display: "none" }} >


                                        <div ref={componentRef} className='printTable' id='divname'>
                                            <table className="print-component w-full">
                                                <thead className="table-header">
                                                    <tr>
                                                        <th>
                                                            <div>
                                                                {<>

                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <center className='font-bold text-[20px]' >GLENDALE UNIFIED SCHOOL DISTRICT
                                                                        </center>
                                                                        <center className='font-bold'>Weekly Absence Report - Classified
                                                                        </center>

                                                                        <p className='float-right'><span className='font-bold'>School or Dept. :- </span>{props.schoolName} </p><br />

                                                                        <p className='float-right'><span className='font-bold'>Period From :- </span>{props.fromDate}  </p><br />

                                                                        <p className='float-right'><span className='font-bold'>Period To :- </span>{props.toDate} </p>
                                                                        <br />
                                                                    </div>
                                                                </>}
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {<div>
                                                                <p className='float-left' ><span className='font-bold'>Comment :- </span>{props.comment} </p>
                                                                <br />

                                                                {props.reportEmployeeList.length ?
                                                                    <div className="mt-10  my-custom-datatable place-content-center"  >
                                                                        {
                                                                            <DataTable value={props.reportEmployeeList} rowGroupMode="rowspan" groupRowsBy="employeeName" emptyMessage="No Absence" className="border solid">
                                                                                <Column field="employeeName" header="Name of Employee"  ></Column>
                                                                                <Column field="absent_date" header="Dates Absent"></Column>
                                                                                <Column field="absent_code_id" header="Absent Codes"></Column>
                                                                                <Column field="partial_hour" body={(row) => {
                                                                                    return (
                                                                                        <h1>
                                                                                            {row.is_full_day ? "Full Day"
                                                                                                :
                                                                                                (row.partial_hour === null ? "0" : row.partial_hour) + "." + (row.partial_min === null ? "0" : Number(row.partial_min / 60).toFixed(2).slice(-2).padStart(2, '0')) + " Hr"} </h1>
                                                                                    )

                                                                                }}
                                                                                    header="Total Hours"></Column>
                                                                                <Column field="substitutedEmployeeName" header="Substitute"></Column>
                                                                            </DataTable>

                                                                        }

                                                                    </div>
                                                                    : null}

                                                                <table style={{ width: "100%", marginTop: "80px" }}>
                                                                    {/* <thead>
                                                                    <tr>
                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }} >Name of Employee</th>
                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Dates Absent</th>
                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Absent Code</th>
                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Total Hours</th>
                                                                        <th style={{ border: "1px solid #d0d0d0", padding: "5px" }}>Substitute</th>

                                                                    </tr>
                                                                    </thead>*/}
                                                                    {props.reportEmployeeList.length ?
                                                                        /*props.reportEmployeeList.map((item) => {
                                                                            return (
                                                                                <tr className='text-center'>
                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.employeeName}</td>
                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.absent_date}</td>
                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.absent_code_id}</td>
                                                                                    {item.is_full_day ?
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}> {"Full Day"} </td>
                                                                                        :
                                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.partial_hour}.{(item.partial_min === null ? "0" : Number(item.partial_min / 60 * 100).toFixed(0))} Hr </td>
                                                                                    }
                                                                                    <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>{item.substitutedEmployeeName}</td>

                                                                                </tr>
                                                                            );
                                                                        })*/
                                                                        null
                                                                        :

                                                                        <tr className='text-center'>
                                                                            <td colSpan="5" style={{ border: "1px solid #d0d0d0", padding: "5px" }}>"No Absence"</td>
                                                                        </tr>

                                                                    }

                                                                </table>

                                                                <div className='mt-8 font-bold' >ABSENCE CODES
                                                                </div>

                                                                <table style={{ width: "100%", marginTop: "20px" }}>
                                                                    <tr className='text-[12px]'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>B - Bereavement</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>NA - Personal (Not Approved)</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>S - Suspension</td>
                                                                    </tr>
                                                                    <tr className='text-[12px]'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>D - District Approved</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>OU - Other Unpaid</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>V - Vacation</td>
                                                                    </tr>
                                                                    <tr className='text-[12px]'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>I - Illness</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>PA - Personal (Approved)</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>W - Witness (District)</td>
                                                                    </tr>
                                                                    <tr className='text-[12px]'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>J - Jury Duty</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>WC - Worker's Compensation</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>DC - District Covid</td>
                                                                    </tr>
                                                                    <tr className='text-[12px]'>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>L - Last Day Worked</td>
                                                                        <td style={{ border: "1px solid #d0d0d0", padding: "5px" }}>PN - Personal Necessity</td>
                                                                    </tr>

                                                                </table>



                                                                <p className='float-right font-bold'>
                                                                    <span>{'Submitted by:'}</span></p><br />
                                                                <h2 className='float-right'>{props.submittedBy ? props.submittedBy : '-'} {props.submittedByDate ? props.submittedByDate : null} </h2><br />


                                                                <p className='float-right font-bold'>
                                                                    <span>{'Approved by:'}</span>
                                                                </p> <br />
                                                                <h2 className='float-right'>{props.approvedBy ? props.approvedBy : null} {props.approverDate ? props.approverDate : null} </h2><br />
                                                                <h2 className='float-right'>{props.payrollBy ? props.payrollBy : null} {props.payrollDate ? props.payrollDate : null}</h2>

                                                            </div>}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                {/* <tfoot className="table-footer">
                                                            <tr>
                                                                <td>
                                                                    {`Page Number ${1}`}
                                                                </td>
                                                            </tr>
                                                        </tfoot> */}
                                            </table>
                                        </div>

                                    </div>
                                    {/* print layout end */}


                                </div>

                            </>





                        }

                    </div>
                </div>

                {/* timeline in edit start*/}
                <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">

                    <div className="p-5">
                        <div className="text-[#344054] text-[16px] font-medium py-3 mb-5">Form History</div>

                        <div className="card custTable">

                            <Timeline value={props.events}
                                opposite={(item) => <Tag
                                    severity={props.approveStatusOptions(item)} className="mr-2 relative top-[-5px]"
                                    value={item.status}></Tag>} content={(item, i) => <div className="relative top-[-10px]">
                                        <div className="text-[#667085] text-[12px] ml-2">Step {i + 1}</div>
                                        <small className="xl:text-[0.729vw] text-[14px] font-semibold text-[#113699] leading-tight ml-2">{item.empTitle}</small>
                                        <div className="text-color-secondary text-xs ml-2">{item.empName}</div>
                                        <div className="text-color-secondary text-[9px] ml-2">{item.date}</div>

                                    </div>} />

                        </div>
                    </div>
                </div>
                {/* timeline in edit end*/}
            </div>
            <div className="dialogpoput flex justify-content-center">
                <Dialog visible={visible} position="right" style={{ width: '30vw' }} className="dialogpoput dialogres" onHide={() => setVisible(false)}>

                    <div className="text-[#101828] text-lg py-2 pt-5 font-bold">Reject Report</div>
                    <div className="text-[#344054] text-xs pb-2 font-medium">Enter the reason for rejection</div>
                    <div>
                        <textarea onChange={(e) => {
                            setReason(e.target.value);
                        }} placeholder="Enter the Reason for Rejection" className="border text-[14px] font-normal border-1 border-[#E4E7EC] w-full"></textarea>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="pt-2 flex pb-[-2px]">
                            <Link href={''} className="custmBtn3 rounded-lg text-[#344054] text-center"
                                onClick={() => {
                                    setVisible(false)
                                }}>Cancel
                            </Link>
                        </div>
                        <div className="pt-2 flex pb-[-2px]">
                            <Link href={''} className="custmBtn3 rounded-lg text-[#FFFFFF] text-center bg-[#113699]" onClick={() => {
                                onClickSend();
                                onClickReject();
                                setVisible2(true)
                            }}>Send
                            </Link>
                        </div>
                    </div>
                </Dialog>
            </div>

            <div className="dialogpoput flex justify-content-center">
                <Dialog visible={visible2} position="right" style={{ width: '30vw' }} className="dialogpoput dialogres" onHide={() => setVisible2(false)}>

                    <div className="text-[#101828] text-lg py-2 pt-5 font-bold">Reject Report</div>
                    <div className="text-[#249144] text-[16px] pb-2 font-medium">Message sent successfully!</div>
                    {/* <div className="text-[#344054] text-[14px]"> Information Missing for  "David", Please review and resubmit.</div> */}
                    <div className="pt-2 flex pb-[-2px] justify-center">
                        <Link href={''} className="custmBtn3 rounded-lg text-[#FFFFFF] text-center bg-[#113699]" onClick={() => bothFalse()}>Ok
                        </Link>
                    </div>

                </Dialog>
            </div>
        </div>
    )
}

