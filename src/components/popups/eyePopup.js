import React, { Fragment, useState, useEffect } from 'react';
import * as PropTypes from "prop-types";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from 'moment';
import reportId from '@/pages/war_certificated/initiate/[id]';
import axios from 'axios';
import { getAbsenceCodeList } from "../../helper/actions/absenceCodeListActions";
import sidebar from "../../../public/assets/images/sidebarright.svg"
import { AllStatusData } from '../helper/enum';
import { Apps } from '@/helper/enum';






const myInter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

function EyePopup(props) {

  const [absentCodeList, setAbsenceCodeList] = useState([]);

  const getAllAbsentCodeList = async () => {

    //*Get userID, Access Token from local storage
    let accessToken = window.localStorage.getItem('accessToken');
    let absenceCodeList = [];
    absenceCodeList = await getAbsenceCodeList(accessToken);
    console.log('absenceCodeList____________________________', absenceCodeList);
    setAbsenceCodeList(absenceCodeList?.rows)
  }

  console.log('props', props);

  const userRole = props.userRole
  // console.log("props", props);
  const [checked, setChecked] = useState(false);
  const [reportEmployeeList, setReportEmployeeList] = useState([]);
  const fullDay = "Full Day";

  const handlePrint = () => {
    console.log('Wait PRINITIG');
  }

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

  const approveStatusOptions = (product) => {
    console.log("product", product.status);
    switch (product.status) {
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

  const handelAction = async (status) => {
    console.log('reaching in action');
    let accessToken = window.localStorage.getItem("accessToken");
    console.log('accessToken', accessToken);

    const requestedData = {
      "accessToken": accessToken,
      "userType": props.userRole,
      "status": status,
      "taskId": props.taskId,
      "reportId": props.reportId
    }

    const response = await axios.post("/api/war_certificated/updateWarCertificatedStatus", { requestedData });

    console.log('response', response);
    props.onHide();
    props.bindList();

  }

  useEffect(() => {
    getAllAbsentCodeList()
  }, [])

  return (
    <Dialog
      className="relative reports-popup"
      visible={props.visible}
      position="right"
      style={{ width: "60vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={props.onHide}
      draggable={false}
      resizable={false}
    >
      <div className="grid grid-cols-2 xl:grid-cols-12 pb-[100px]">
        <div className="col-span-1 lg:col-span-8 h-auto">
          <div className="p-5">
            <Link href={""} onClick={props.onHide} className="py-3">
              <Image src={sidebar} alt="user" width="24" height="24" />
            </Link>
            <div className="text-[#113699] text-md lg:text-[0.833vw] font-bold">
              Glendale Unified School District
            </div>
            <div className="text-[#344054] text-xs lg:text-[0.625vw] font-medium">
              {Apps.WeeklyAbsentReportCertificatedAdmin}
            </div>

            <div className="pt-3">
              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                <div className="font-medium">School or Department </div>
                <div className="font-semibold ">{props.schoolName}</div>
              </div>
              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                <div className="font-medium">From </div>
                <div className="font-semibold ">{props.fromDate ? moment(props.fromDate, "YYYY-MM-DD").format("YYYY/MM/DD") : "-"}</div>
              </div>
              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                <div className="font-medium">To </div>
                <div className="font-semibold ">{props.toDate ? moment(props.toDate, "YYYY-MM-DD").format("YYYY/MM/DD") : "-"}</div>
              </div>
              <div className="flex justify-between custTable text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                <div className="font-medium">Status </div>
                <Tag
                  severity={getSeverity(props.status)}
                  value={props.status}
                ></Tag>
              </div>
              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw] border-b border-[#E4E7EC]">
                <div className="font-medium">Approved By </div>
                <div className="font-semibold ">{props.approvedBy}</div>
              </div>
              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw]">
                <div className="font-medium">Submitted By </div>
                <div className="font-semibold ">{props.submittedBy}</div>
              </div>

              <div className="flex justify-between text-[#344054] text-[12px] py-[0.729vw] px-[0.417vw]">
                <div className="font-medium">Comment </div>
                <div className="font-semibold ">{props.comment}</div>
              </div>
            </div>
            {/* <div className="py-3 emp-simple-tbl">
              <DataTable
                value={reportEmployeeList}
                rowGroupMode="rowspan"
                groupRowsBy="employeeName"
                emptyMessage="No Absence"
              >
                <Column field="employeeName" header="Name of Employee"></Column>
                <Column field="absent_date" header="Dates Absent"></Column>
                <Column field="absent_code_id" header="Absent Codes"></Column>
                <Column field="partial_hour" header="Total Hours"></Column>
                <Column
                  field="substitutedEmployeeName"
                  header="Substitute"
                ></Column>
              </DataTable>
            </div> */}
            {
              props.adminReportLoading === true ?
                <>
                  <div className='mt-8 font-bold text-[12px]' >Administrator
                  </div>
                  <div className="py-3 emp-simple-tbl">

                    <div>
                      {
                        props.administratorData.length > 0 ?
                          <Paper>
                            <Table>
                              <TableHead>
                                {
                                  <TableRow>
                                    <TableCell>Name of Employee</TableCell>
                                    <TableCell>
                                      Dates Absent</TableCell>
                                    <TableCell>Absent Codes</TableCell>
                                    <TableCell>Name of Substitute</TableCell>
                                    <TableCell>Total Hours</TableCell>
                                  </TableRow>
                                }
                              </TableHead>

                              <TableBody>
                                {
                                  (props.administratorData).map((item, i) => (
                                    <Fragment>
                                      {

                                        <TableRow>
                                          <TableCell
                                            rowSpan={item.employeeResponse.length + 1}
                                          >
                                            {/* {(reportId) ?
                                                  <Link className=' show default overflow-hidden truncate w-5 underline text-blue-600 hover:text-blue-800 visited:text-purple-600 ' onClick={() => {
                                                    onClickUpdateFollow(i, item)
                                                  }}> {item.employeeName}</Link> : item.employeeName
                                                } */}
                                            {item.employeeName}
                                          </TableCell>
                                        </TableRow>

                                      }


                                      {item.employeeResponse.map((detail, detailIndex) => (

                                        <TableRow>
                                          <TableCell>{moment(detail.absentDate).format("MM/DD/YYYY")}</TableCell>

                                          <TableCell>{detail.absentCode.name}</TableCell>
                                          <TableCell>{detail.nameOfTheSubstitute}</TableCell>
                                          {detail.isFullDay ?
                                            <TableCell>
                                              {fullDay}
                                            </TableCell>
                                            :
                                            <TableCell>
                                              {detail.partialHour === null + "." && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr" === null ? "-" : detail.partialHour + "." !== null && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') === null ? detail.partialHour : detail.partialHour + "." === null && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr" !== null ? Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + "min" : detail.partialHour + "." + Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr"}</TableCell>
                                          }
                                        </TableRow>
                                      ))}
                                    </Fragment>
                                  ))
                                }
                              </TableBody>
                            </Table>
                          </Paper> :
                          <Paper>
                            <Table>
                              <TableHead>
                                {
                                  <TableRow>
                                    <TableCell>Name of Employee</TableCell>
                                    <TableCell>
                                      Dates Absent</TableCell>
                                    <TableCell>Absent Codes</TableCell>
                                    <TableCell>Name of Substitute</TableCell>
                                    <TableCell>Total Hours</TableCell>
                                  </TableRow>
                                }
                              </TableHead>
                              <TableBody>

                                <Fragment>


                                  <TableRow>
                                    <div className=' mx-auto my-2 px-3'>No Absence </div>
                                  </TableRow>
                                </Fragment>
                              </TableBody>
                            </Table>
                          </Paper>

                      }
                    </div>
                  </div>
                  <div className='mt-8 font-bold text-[12px]' >Certificated
                  </div>
                  <div className="py-3 emp-simple-tbl">
                    {
                      props.CertificatedDatas.length > 0 ?
                        <Paper>
                          <Table>
                            <TableHead>
                              {
                                <TableRow>
                                  <TableCell>Name of Employee</TableCell>
                                  <TableCell>
                                    Dates Absent</TableCell>
                                  <TableCell>Absent Codes</TableCell>
                                  <TableCell>Name of Substitute</TableCell>
                                  <TableCell>Total Hours</TableCell>
                                </TableRow>
                              }
                            </TableHead>

                            <TableBody>
                              {
                                (props.CertificatedDatas).map((item, i) => (
                                  <Fragment>
                                    {

                                      <TableRow>
                                        <TableCell
                                          rowSpan={item.employeeResponse.length + 1}
                                        >
                                          {item.employeeName}
                                        </TableCell>
                                      </TableRow>

                                    }


                                    {item.employeeResponse.map((detail, detailIndex) => (

                                      <TableRow>
                                        <TableCell>{moment(detail.absentDate).format("MM/DD/YYYY")}</TableCell>

                                        <TableCell>{detail.absentCode.name}</TableCell>
                                        <TableCell>{detail.nameOfTheSubstitute}</TableCell>
                                        {detail.isFullDay ?
                                          <TableCell>
                                            {fullDay}
                                          </TableCell>
                                          :
                                          <TableCell>
                                            {detail.partialHour === null + "." && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr" === null ? "-" : detail.partialHour + "." !== null && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') === null ? detail.partialHour : detail.partialHour + "." === null && Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr" !== null ? Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + "min" : detail.partialHour + "." + Number(detail.partialMin / 60).toFixed(2).slice(-2).padStart(2, '0') + " hr"}</TableCell>
                                        }
                                      </TableRow>
                                    ))}
                                  </Fragment>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </Paper> :
                        <Paper>
                          <Table>
                            <TableHead>
                              {
                                <TableRow>
                                  <TableCell>Name of Employee</TableCell>
                                  <TableCell>
                                    Dates Absent</TableCell>
                                  <TableCell>Absent Codes</TableCell>
                                  <TableCell>Name of Substitute</TableCell>
                                  <TableCell>Total Hours</TableCell>
                                </TableRow>
                              }
                            </TableHead>
                            <TableBody>

                              <Fragment>


                                <TableRow>
                                   <div className=' mx-auto my-2 px-3'>No Absence </div>
                                </TableRow>
                              </Fragment>
                            </TableBody>
                          </Table>
                        </Paper>
                    }
                  </div>
                </> : null
            }

            <div className="bg-[#EFF0F1] rounded-[8px] p-3 mt-3">
              <div className="text-[#344054] font-medium text-[14px] pb-3">
                Absence Codes - Legends
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                  {absentCodeList?.length > 0 && absentCodeList.slice(0, 7).map((item, index) => {
                    return (<>
                      <p>{item.title} - <span className="font-normal">{item.name}</span></p>
                    </>
                    )
                  })}
                </div>

                <div className="text-[#344054] font-semibold text-xs xl:text-[0.729vw] space-y-1">
                  {absentCodeList?.length > 0 && absentCodeList.slice(7, 14).map((item, index) => {
                    return (<>
                      <p>{item.title} - <span className="font-normal">{item.name}</span></p>
                    </>
                    )
                  })}
                </div>
              </div>
            </div>
            {userRole === 'I' && <div>
              {props.edit === false ?
                <div onClick={handlePrint} className="printicon bg-[#113699]  border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                  <i className="mr-3 gusd-print-outline"></i><span className='printicon'>Print</span>
                </div> : null}
              {/* {props.edit === true ?
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 justify-center justify-between mt-2 px-2 xl:my-[2.083vw] gap-4">
                  <button onClick={() => props.popupstate()} className="custmBtn2 border rounded-lg text-center text-[#344054]"><i className="gusd-close-circle-bold text-[14px] pr-3"></i>Cancel
                  </button>
                  <button className="custmBtn2 text-[#D92D20] border rounded-lg text-center" onClick={() => {
                    // onClickReject();
                    setVisible(true)
                  }
                  }><i className="gusd-close pr-3 text-[12px]"></i>Reject
                  </button>
                  <button className="custmBtn2 border rounded-lg bg-[#006b3c] text-[#ffffff] text-center" onClick={() => { onClickApprove(); }}><i className="gusd-check pr-3 text-[14px]"></i>Approve
                  </button>
                </div> : null} */}
            </div>}
            {userRole === 'AP' && <div>
              {props.edit === false ?
                <div onClick={handlePrint} className="printicon bg-[#113699]  border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                  <i className="mr-3 gusd-print-outline"></i><span className='printicon'>Print</span>
                </div> : null}
              {props.edit === true ?
                <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 justify-center justify-between mt-2 px-2 xl:my-[2.083vw] gap-4">
                  <button onClick={props.onHide}
                    className="custmBtn2 border rounded-lg text-center text-[#344054]"><i className="gusd-close-circle-bold text-[14px] pr-3"></i>Cancel
                  </button>

                  <button className="custmBtn2 text-[#D92D20] border rounded-lg text-center" onClick={() => {
                    // onClickReject();
                    handelAction('reject')
                  }
                  }><i className="gusd-close pr-3 text-[12px]"></i>Reject
                  </button>

                  <button className="custmBtn2 border rounded-lg bg-[#006b3c] text-[#ffffff] text-center" onClick={() => {
                    handelAction('approve')
                  }}>
                    <i className="gusd-check pr-3 text-[14px]"></i>Approve
                  </button>
                </div> : null}
            </div>}
            {userRole === 'P' && <div>
              {props.edit === false ?
                <div onClick={handlePrint} className="printicon bg-[#113699]  border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                  <i className="mr-3 gusd-print-outline"></i><span className='printicon'>Print</span>
                </div> : null}
              {props.edit === true ?
                <div onClick={() => handelAction('approve')} className="printicon bg-[#113699]  border mt-10 border-[#D0D5DD] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] font-medium text-[#FFF] flex items-center py-[10px] px-[8px] rounded-[8px] justify-center">
                  <i className="mr-3 gusd-print-outline"></i><span className='printicon'> Acknowledge And Print</span>
                </div> : null}
            </div>}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 bg-[#EFF0F1] h-auto">
          <div className="p-5">
            <div className="text-[#344054] text-[16px] font-medium py-3 mb-5">
              Form History
            </div>

            <div className="card custTable">
              <Timeline
                value={props.events}
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
                      {item.date != "Invalid date" ? item.date : ""}
                    </small>
                    <div className="text-color-secondary text-xs ml-2">
                      {item.name}
                    </div>
                    <div className="text-color-secondary text-[9px] ml-2">
                      {item.empTitle}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

EyePopup.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.any,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EyePopup;
