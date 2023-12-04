// // @ts-check
// import { initSchema } from '@aws-amplify/datastore';
// import { schema } from './schema';

// const Apps = {
//   "WEEKLY_ABSENCE_REPORT": "WEEKLY_ABSENCE_REPORT",
//   "WEEKLY_ABSENCE_REPORT_ADMIN": "WEEKLY_ABSENCE_REPORT_ADMIN",
//   "TIME_REPORT": "TIME_REPORT",
//   "SIX_PERIOD": "SIX_PERIOD",
//   "EMPLOYEE_HAND_BOOK": "EMPLOYEE_HAND_BOOK",
//   "CLASSIFIED_SUB_REQUEST": "CLASSIFIED_SUB_REQUEST",
//   "SUBSTITUTE_REQUEST_CERTIFICATED": "SUBSTITUTE_REQUEST_CERTIFICATED",
//   "STIPENDS_FORM": "STIPENDS_FORM",
//   "PERSONAL_SERVICE_AGREEMENT": "PERSONAL_SERVICE_AGREEMENT",
//   "PERSONNEL_ACTION_FORM": "PERSONNEL_ACTION_FORM"
// };

// const SourceEnum = {
//   "REPORT_TRANSACTION": "REPORT_TRANSACTION",
//   "STIPEND_FORM": "STIPEND_FORM",
//   "TIME_REPORT": "TIME_REPORT",
//   "WEEKLY_ABSENCE_REPORT_CASSIFIED": "WEEKLY_ABSENCE_REPORT_CASSIFIED",
//   "CLASSIFIED_SUB_REQUEST": "CLASSIFIED_SUB_REQUEST",
//   "SUBSTITUTE_REQUEST_CERTIFICATED": "SUBSTITUTE_REQUEST_CERTIFICATED",
//   "WEEKLY_ABSENCE_REPORT_ADMIN": "WEEKLY_ABSENCE_REPORT_ADMIN",
//   "PERSONAL_SERVICE_AGREEMENT": "PERSONAL_SERVICE_AGREEMENT"
// };

// const NotificationTypeEnum = {
//   "APP": "APP",
//   "EMAIL": "EMAIL"
// };

// const HandbookEnum = {
//   "NEW": "NEW",
//   "PENDING": "PENDING",
//   "SUBMITTED": "SUBMITTED",
//   "ESCALATED": "ESCALATED",
//   "RESENT": "RESENT",
//   "CANCELLED": "CANCELLED",
//   "ACKNOWLEDGE": "ACKNOWLEDGE"
// };

// const CertificatedAdminWeeklyAbsenceReportStatus = {
//   "APPROVAL_ACCEPTED": "APPROVAL_ACCEPTED",
//   "APPROVAL_REJECTED": "APPROVAL_REJECTED",
//   "PAYROLL_ACCEPTED": "PAYROLL_ACCEPTED",
//   "PAYROLL_REJECTED": "PAYROLL_REJECTED",
//   "SUBMITTED": "SUBMITTED",
//   "RESUBMITTED": "RESUBMITTED",
//   "OPEN": "OPEN",
//   "CLOSED": "CLOSED",
//   "PENDING": "PENDING"
// };

// const TypeOfSubRequestOrObjectCode = {
//   "CODE1": "CODE1",
//   "CODE2": "CODE2",
//   "CODE3": "CODE3"
// };

// const EmployeeTypeEnum = {
//   "CLASSIFIED": "CLASSIFIED",
//   "CERTIFICATED": "CERTIFICATED",
//   "ADMINISTRATOR": "ADMINISTRATOR"
// };

// const InitiateClassifiedWeeklyAbsenceReportStatus = {
//   "PENDING": "PENDING",
//   "APPROVAL_ACCEPTED": "APPROVAL_ACCEPTED",
//   "APPROVAL_REJECTED": "APPROVAL_REJECTED",
//   "PAYROLL_ACCEPTED": "PAYROLL_ACCEPTED",
//   "PAYROLL_REJECTED": "PAYROLL_REJECTED",
//   "SUBMITTED": "SUBMITTED",
//   "RESUBMITTED": "RESUBMITTED",
//   "OPEN": "OPEN",
//   "CLOSED": "CLOSED"
// };

// const { PSAPartyDocument, PSADocuments, PersonnelActionFormBudgetCode, UserAdditionalSettings, LoginEmail, PersonnelActionEmployee, TransactionCyclePersonnel, PreSignupEmployeeApps, PreSignupEmployee, PersonnelActionTransactionCycle, PersonnelActionFormTransactionCycle, PersonnelActionInitiatorForm, UserAppsPermission, PSATransactionCycle, PSAParty, PSAConsultant, StipendTransactionCycle, NotificationReadTable, NotificationTable, CertificatedSubRequestTransactionCycle, PersonalActionForm, HandbookAssignee, Handbook, CertificatedSubRequestFundingAccountDetails, FundingAccountType, CertificatedSubRequestSpecificTeacherDates, CertificatedSubRequestTeacherData, CertificatedSubInitiateRequest, StipendAssignments, DepartmentTypeMaster, StipendTypeMaster, SemisterMaster, YearMaster, StipendMaster, UntitledModel, ClassifiedSubInitiateRequest, EmployeeHandbook, SubstituteCertificateRequestTransactionCycle, SubstituteCertificateRequestAccountNoIDs, SubstituteCertificateRequest, CertifiedAdminReportsLog, CertificatedAdminWeeklyAbsenceReportEmployeeDetails, CertificatedAdminWeeklyAbsenceReportEmployee, CertificatedAdminWeeklyAbsenceReport, TimeReportTransactionCycle, EmployeeType, TimeReportEmployeeDetails, TimeReportEmployee, TimeReportInitiateReport, SixthPeriodReportTransactionCycle, Subject, SixthPeriodAssignmentInitiateReport, ReportsLog, InitiateClassifiedWeeklyAbsenceReportEmployeeDetails, InitiateClassifiedWeeklyAbsenceReportEmployee, UserGroups, Employee, RoleAccess, Groups, AbsentType, InitiateClassifiedWeeklyAbsenceReport, AbsentCode, Grades, Schools, Organizations } = initSchema(schema);

// export {
//   PSAPartyDocument,
//   PSADocuments,
//   PersonnelActionFormBudgetCode,
//   UserAdditionalSettings,
//   LoginEmail,
//   PersonnelActionEmployee,
//   TransactionCyclePersonnel,
//   PreSignupEmployeeApps,
//   PreSignupEmployee,
//   PersonnelActionTransactionCycle,
//   PersonnelActionFormTransactionCycle,
//   PersonnelActionInitiatorForm,
//   UserAppsPermission,
//   PSATransactionCycle,
//   PSAParty,
//   PSAConsultant,
//   StipendTransactionCycle,
//   NotificationReadTable,
//   NotificationTable,
//   CertificatedSubRequestTransactionCycle,
//   PersonalActionForm,
//   HandbookAssignee,
//   Handbook,
//   CertificatedSubRequestFundingAccountDetails,
//   FundingAccountType,
//   CertificatedSubRequestSpecificTeacherDates,
//   CertificatedSubRequestTeacherData,
//   CertificatedSubInitiateRequest,
//   StipendAssignments,
//   DepartmentTypeMaster,
//   StipendTypeMaster,
//   SemisterMaster,
//   YearMaster,
//   StipendMaster,
//   UntitledModel,
//   ClassifiedSubInitiateRequest,
//   EmployeeHandbook,
//   SubstituteCertificateRequestTransactionCycle,
//   SubstituteCertificateRequestAccountNoIDs,
//   SubstituteCertificateRequest,
//   CertifiedAdminReportsLog,
//   CertificatedAdminWeeklyAbsenceReportEmployeeDetails,
//   CertificatedAdminWeeklyAbsenceReportEmployee,
//   CertificatedAdminWeeklyAbsenceReport,
//   TimeReportTransactionCycle,
//   EmployeeType,
//   TimeReportEmployeeDetails,
//   TimeReportEmployee,
//   TimeReportInitiateReport,
//   SixthPeriodReportTransactionCycle,
//   Subject,
//   SixthPeriodAssignmentInitiateReport,
//   ReportsLog,
//   InitiateClassifiedWeeklyAbsenceReportEmployeeDetails,
//   InitiateClassifiedWeeklyAbsenceReportEmployee,
//   UserGroups,
//   Employee,
//   RoleAccess,
//   Groups,
//   AbsentType,
//   InitiateClassifiedWeeklyAbsenceReport,
//   AbsentCode,
//   Grades,
//   Schools,
//   Organizations,
//   Apps,
//   SourceEnum,
//   NotificationTypeEnum,
//   HandbookEnum,
//   CertificatedAdminWeeklyAbsenceReportStatus,
//   TypeOfSubRequestOrObjectCode,
//   EmployeeTypeEnum,
//   InitiateClassifiedWeeklyAbsenceReportStatus
// };