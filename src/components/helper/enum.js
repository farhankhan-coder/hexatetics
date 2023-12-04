export const USER_TYPES = {
  ADMIN: "A",
  INITIATOR: "I",
  APPROVER: "AP",
  PAYROLL: "P",
  SUPERADMIN: "SA"
};

export const USER_TYPES_NAMES = {
  A: "Admin",
  I: "Initiator",
  AP: "Approver",
  P: "Payroll",
  SA: "Superadmin"
};

export const USER_TYPE_LIST = [
  { value: "A", name: "Admin" },
  { value: "I", name: "Initiator" },
  { value: "AP", name: "Approver" },
  { value: "P", name: "Payroll" },
  { value: "SA", name: "Superadmin" }
];

export const USER_TYPE_LABEL = [
  { value: "A", label: "Admin" },
  { value: "I", label: "Initiator" },
  { value: "AP", label: "Approver" },
  { value: "P", label: "Payroll" },
  // { value: "SA", label: "Superadmin" }
];

export const USER_EMPLOYEE_TYPES = [
  { value: "Cl", label: "Classified" },
  { value: "Ce", label: "Certificated" },
  { value: "Ad", label: "Administrator" }
];

export const USER_TYPE_CODE = [
  { name: "Admin", code: "A" },
  { name: "Initiator", code: "I" },
  { name: "Approver", code: "AP" },
  { name: "Payroll", code: "P" },
  { name: "Superadmin", code: "SA" }
];

export const Request_Status = {
  P: "PENDING",
  O: "OPEN",
  AP: "APPROVAL_ACCEPTED",
  AR: "APPROVAL_REJECTED",
  PA: "PAYROLL_ACCEPTED",
  PR: "PAYROLL_REJECTED",
  S: "SUBMITTED",
  RS: "RESUBMITTED",
  C: "CLOSED"
};

export const Handbook_Status = {
  NEW: "NEW",
  PENDING: "PENDING",
  SUBMITTED: "SUBMITTED",
  ACKNOWLEDGE: "ACKNOWLEDGE",
  CANCELLED: "CANCELLED",
  ESCALATED: "ESCALATED",
  RESENT: "RESENT"
};

export const severity = {
  [Handbook_Status.NEW]: "info",
  [Handbook_Status.PENDING]: "warning",
  [Handbook_Status.SUBMITTED]: "success",
  [Handbook_Status.ACKNOWLEDGE]: "success",
  [Handbook_Status.CANCELLED]: "info",
  [Handbook_Status.ESCALATED]: "danger",
  [Handbook_Status.RESENT]: "warning"
};

export const Request_Stipend_Status = {
  PENDING: "Pending.- (step 1)",
  PENDING_FOR_APPROVAL_EMPLOYEE: "Pending for Approval Employee- (step 2)",
  PENDING_FOR_APPROVAL_PRINCIPAL: "Pending for Prior Approval Principal- (step 3)",
  PENDING_FOR_APPROVAL_HR_TECHNICIAN: "Pending for Prior Approval HR technician- (step 4)",
  PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT: "Pending for Approval Excecutive Management- (step 5)",
  PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN: "Pending for Assignment Completion HR Technician- (step 6)",
  PENDING_FOR_APPROVAL_FINAL_APPROVAL: "Pending for Final Approval Principal- (step 7)",
  PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN: "Pending for Completion HR Technician- (step 8)",
  ACKNOWLEDGMENT_HR_TECHNICIAN: "Completed-(step 9)",
  APPROVEDBY: "APPROVEDBY",
  SUBMITTED: "Submitted",
  REJECT: "Rejected"
};

export const Request_Stipend_Status_Name = [
  "Pending.- (step 1)",
  "Pending for Approval Employee- (step 2)",
  "Pending for Prior Approval Principal- (step 3)",
  "Pending for Prior Approval HR technician- (step 4)",
  "Pending for Approval Excecutive Management- (step 5)",
  "Pending for Assignment Completion HR Technician- (step 6)",
  "Pending for Final Approval Principal- (step 7)",
  "Pending for Completion HR Technician- (step 8)",
  "Completed-(step 9)",
  "Rejected"
];

export const stipend_Type = [
  { name: 'Elementary Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isElementaryStipend' },
  { name: 'Middle School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isMiddleStipend' },
  { name: 'High School Extra-Curricular Stipend(01.0-00000.0-11303-10000-1170-0005616)', key: 'isHighStipend' },
  { name: 'Department Chair Stipend(01.0-00000.0-11303-10000-1170-0005616)(01.0-65000.0-57606-11100-1170-0000600-SPED)', key: 'isDepartmentStipend' },
  { name: 'Head Counselor Stipend(01.0-00000.0-00000-31101-1272-0004682)', key: 'isHeadStipend' }
];

export const Google_API_KEY = "AIzaSyDmHcZjsvYmfI5cJ6ucGsdKx1NmLu2DcJQ";

export const notificationEnums = {
  REPORT_TRANSACTION: 'REPORT_TRANSACTION'
};

export const sourceTypeEnum = {
  APP: 'APP',
  EMAIL: 'EMAIL'
}

export const BUSINESS_ENTITY = {
  I: "Individual",
  SP: "Sole Partnership",
  P: "Partnership",
  C: "Corporation",
  O: "Other"
};

export const PSA_Status = {
  PENDING: "Pending",
  PENDING_FOR_APPROVAL_PSA_CONSULTANT: "Pending for approval PSA Consultant",
  PENDING_FOR_APPROVAL_BUDGET_CLERK: "Pending for approval Budget Clerk",
  PENDING_FOR_APPROVAL_BUDGET_MANAGER: "Pending for approval Budget Manager",
  PENDING_FOR_APPROVAL_HR_CONSULTANT_CLEARANCE_VERIFICATION: "Pending for approval HR Executive Secretary",
  PENDING_FOR_APPROVAL_EXECUTIVE_APPROVER: "Pending for approval Executive Approver",
  PENDING_FOR_APPROVAL_HR_EXCECUTIVE_SECREATARY: "Pending for Acknowledgement HR Executive Secretary",
  APPROVED: "HR Executive secretary",
  ACKNOWLEDGE: "Acknowledged by HR Executive Secretary",
  REJECTED: "Rejected",
  // REVIEWDRESUBMITTED: "Reviewed Resubmitted"

};

export const PSA_Status_For_Dropdown = {
  PENDING: "Pending",
  PENDING_FOR_APPROVAL_PSA_CONSULTANT: "Pending for approval PSA Consultant",
  PENDING_FOR_APPROVAL_BUDGET_CLERK: "Pending for approval Budget Clerk",
  PENDING_FOR_APPROVAL_BUDGET_MANAGER: "Pending for approval Budget Manager",
  // PENDING_FOR_APPROVAL_HR_CONSULTANT_CLEARANCE_VERIFICATION: "Pending for approval HR Consultant",
  PENDING_FOR_APPROVAL_HR_EXECUTIVE_SECRETARY: "Pending for approval HR Executive Secretary",
  PENDING_FOR_APPROVAL_EXECUTIVE_APPROVER: "Pending for approval Executive Approver",
  PENDING_FOR_APPROVAL_HR_EXCECUTIVE_SECREATARY: "Pending for Acknowledgement HR Executive Secretary",
  ACKNOWLEDGE: "Acknowledged by HR Executive Secretary",
  REJECTED: "Rejected",
  // REVIEWDRESUBMITTED: "Reviewed Resubmitted"

};

export const PSA_Designation = {
  INITIATOR: "INITIATOR",
  PSA_CONSULTANT: "PSA_CONSULTANT",
  BUDGET_CLERK: "BUDGET_CLERK",
  BUDGET_MANAGER: "BUDGET_MANAGER",
  HR_EXCECUTIVE_SECREATARY_APPROVER: "HR_EXCECUTIVE_SECREATARY_APPROVER",
  EXECUTIVE_APPROVER: "EXECUTIVE_APPROVER",
  HR_EXCECUTIVE_SECREATARY_PAYROLL: "HR_EXCECUTIVE_SECREATARY_PAYROLL",
};

export const designationForAllApps = [
  { code: 'DEPARTMENT_HEAD', name: "Department Head" },
  { code: 'PRINCIPAL', name: "Principal" },
  { code: 'BUDGET_CLERK', name: "Budget Clerk" },
  { code: 'BUDGET_MANAGER', name: "Budget Manager" },
  { code: 'HR_TECH', name: "HR Tech" },
  { code: 'Janitor', name: "Janitor" },
  { code: 'SUPERINTENDENT', name: "Superintendent" },
]


export const AllStatusData = {
  PENDING: "PENDING",
  SUBMITTED: "SUBMITTED",
  CLOSED: "CLOSED",
  REVIEWED_AND_RESUBMITTED: "REVIEWED AND RESUBMITTED",
  PENDING_FOR_APPROVAL: "PENDING FOR APPROVAL",
  PENDING_FOR_ACKNOWLEDGEMENT: "PENDING FOR ACKNOWLEDGEMENT",
  HR_EXCECUTIVE_SECREATARY_PAYROLL: "HR_EXCECUTIVE_SECREATARY_PAYROLL",
  APPROVED :"APPROVED",
  REJECTED:"REJECTED"
};