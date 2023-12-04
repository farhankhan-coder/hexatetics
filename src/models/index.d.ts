import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Apps {
  WEEKLY_ABSENCE_REPORT = "WEEKLY_ABSENCE_REPORT",
  WEEKLY_ABSENCE_REPORT_ADMIN = "WEEKLY_ABSENCE_REPORT_ADMIN",
  TIME_REPORT = "TIME_REPORT",
  SIX_PERIOD = "SIX_PERIOD",
  EMPLOYEE_HAND_BOOK = "EMPLOYEE_HAND_BOOK",
  CLASSIFIED_SUB_REQUEST = "CLASSIFIED_SUB_REQUEST",
  SUBSTITUTE_REQUEST_CERTIFICATED = "SUBSTITUTE_REQUEST_CERTIFICATED",
  STIPENDS_FORM = "STIPENDS_FORM",
  PERSONAL_SERVICE_AGREEMENT = "PERSONAL_SERVICE_AGREEMENT",
  PERSONNEL_ACTION_FORM = "PERSONNEL_ACTION_FORM"
}

export enum SourceEnum {
  REPORT_TRANSACTION = "REPORT_TRANSACTION",
  STIPEND_FORM = "STIPEND_FORM",
  TIME_REPORT = "TIME_REPORT",
  WEEKLY_ABSENCE_REPORT_CASSIFIED = "WEEKLY_ABSENCE_REPORT_CASSIFIED",
  CLASSIFIED_SUB_REQUEST = "CLASSIFIED_SUB_REQUEST",
  SUBSTITUTE_REQUEST_CERTIFICATED = "SUBSTITUTE_REQUEST_CERTIFICATED",
  WEEKLY_ABSENCE_REPORT_ADMIN = "WEEKLY_ABSENCE_REPORT_ADMIN",
  PERSONAL_SERVICE_AGREEMENT = "PERSONAL_SERVICE_AGREEMENT"
}

export enum NotificationTypeEnum {
  APP = "APP",
  EMAIL = "EMAIL"
}

export enum HandbookEnum {
  NEW = "NEW",
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  ESCALATED = "ESCALATED",
  RESENT = "RESENT",
  CANCELLED = "CANCELLED",
  ACKNOWLEDGE = "ACKNOWLEDGE"
}

export enum CertificatedAdminWeeklyAbsenceReportStatus {
  APPROVAL_ACCEPTED = "APPROVAL_ACCEPTED",
  APPROVAL_REJECTED = "APPROVAL_REJECTED",
  PAYROLL_ACCEPTED = "PAYROLL_ACCEPTED",
  PAYROLL_REJECTED = "PAYROLL_REJECTED",
  SUBMITTED = "SUBMITTED",
  RESUBMITTED = "RESUBMITTED",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  PENDING = "PENDING"
}

export enum TypeOfSubRequestOrObjectCode {
  CODE1 = "CODE1",
  CODE2 = "CODE2",
  CODE3 = "CODE3"
}

export enum EmployeeTypeEnum {
  CLASSIFIED = "CLASSIFIED",
  CERTIFICATED = "CERTIFICATED",
  ADMINISTRATOR = "ADMINISTRATOR"
}

export enum InitiateClassifiedWeeklyAbsenceReportStatus {
  PENDING = "PENDING",
  APPROVAL_ACCEPTED = "APPROVAL_ACCEPTED",
  APPROVAL_REJECTED = "APPROVAL_REJECTED",
  PAYROLL_ACCEPTED = "PAYROLL_ACCEPTED",
  PAYROLL_REJECTED = "PAYROLL_REJECTED",
  SUBMITTED = "SUBMITTED",
  RESUBMITTED = "RESUBMITTED",
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}



type EagerPSAPartyDocument = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAPartyDocument, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly filename?: string | null;
  readonly filepath?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSAPartyDocument = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAPartyDocument, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly filename?: string | null;
  readonly filepath?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSAPartyDocument = LazyLoading extends LazyLoadingDisabled ? EagerPSAPartyDocument : LazyPSAPartyDocument

export declare const PSAPartyDocument: (new (init: ModelInit<PSAPartyDocument>) => PSAPartyDocument) & {
  copyOf(source: PSAPartyDocument, mutator: (draft: MutableModel<PSAPartyDocument>) => MutableModel<PSAPartyDocument> | void): PSAPartyDocument;
}

type EagerPSADocuments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSADocuments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly filename?: string | null;
  readonly filepath?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSADocuments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSADocuments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly filename?: string | null;
  readonly filepath?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSADocuments = LazyLoading extends LazyLoadingDisabled ? EagerPSADocuments : LazyPSADocuments

export declare const PSADocuments: (new (init: ModelInit<PSADocuments>) => PSADocuments) & {
  copyOf(source: PSADocuments, mutator: (draft: MutableModel<PSADocuments>) => MutableModel<PSADocuments> | void): PSADocuments;
}

type EagerPersonnelActionFormBudgetCode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionFormBudgetCode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeesId?: string | null;
  readonly budgetCodes?: string | null;
  readonly budgetName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonnelActionFormBudgetCode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionFormBudgetCode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeesId?: string | null;
  readonly budgetCodes?: string | null;
  readonly budgetName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonnelActionFormBudgetCode = LazyLoading extends LazyLoadingDisabled ? EagerPersonnelActionFormBudgetCode : LazyPersonnelActionFormBudgetCode

export declare const PersonnelActionFormBudgetCode: (new (init: ModelInit<PersonnelActionFormBudgetCode>) => PersonnelActionFormBudgetCode) & {
  copyOf(source: PersonnelActionFormBudgetCode, mutator: (draft: MutableModel<PersonnelActionFormBudgetCode>) => MutableModel<PersonnelActionFormBudgetCode> | void): PersonnelActionFormBudgetCode;
}

type EagerUserAdditionalSettings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserAdditionalSettings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly stipendApprover?: string | null;
  readonly stipendInitiator?: string | null;
  readonly stipendPayroll?: string | null;
  readonly subReqClassifiedInitiator?: string | null;
  readonly subReqClassifiedApprover?: string | null;
  readonly subReqClassifiedPayroll?: string | null;
  readonly personnelServiceAgreeInitiator?: string | null;
  readonly personnelServiceAgreeApprover?: string | null;
  readonly personnelServiceAgreePayroll?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserAdditionalSettings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserAdditionalSettings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly stipendApprover?: string | null;
  readonly stipendInitiator?: string | null;
  readonly stipendPayroll?: string | null;
  readonly subReqClassifiedInitiator?: string | null;
  readonly subReqClassifiedApprover?: string | null;
  readonly subReqClassifiedPayroll?: string | null;
  readonly personnelServiceAgreeInitiator?: string | null;
  readonly personnelServiceAgreeApprover?: string | null;
  readonly personnelServiceAgreePayroll?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserAdditionalSettings = LazyLoading extends LazyLoadingDisabled ? EagerUserAdditionalSettings : LazyUserAdditionalSettings

export declare const UserAdditionalSettings: (new (init: ModelInit<UserAdditionalSettings>) => UserAdditionalSettings) & {
  copyOf(source: UserAdditionalSettings, mutator: (draft: MutableModel<UserAdditionalSettings>) => MutableModel<UserAdditionalSettings> | void): UserAdditionalSettings;
}

type EagerLoginEmail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoginEmail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLoginEmail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoginEmail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LoginEmail = LazyLoading extends LazyLoadingDisabled ? EagerLoginEmail : LazyLoginEmail

export declare const LoginEmail: (new (init: ModelInit<LoginEmail>) => LoginEmail) & {
  copyOf(source: LoginEmail, mutator: (draft: MutableModel<LoginEmail>) => MutableModel<LoginEmail> | void): LoginEmail;
}

type EagerPersonnelActionEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly salaryRate?: string | null;
  readonly rateofPay?: string | null;
  readonly reason?: string | null;
  readonly fundingSource?: string | null;
  readonly accountNo?: string | null;
  readonly budgetCode?: string | null;
  readonly effectiveDatesTo?: string | null;
  readonly effectiveDatesFrom?: string | null;
  readonly positionTitleTo?: string | null;
  readonly positionTitleFrom?: string | null;
  readonly created_by?: string | null;
  readonly submited_by?: string | null;
  readonly formId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonnelActionEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly salaryRate?: string | null;
  readonly rateofPay?: string | null;
  readonly reason?: string | null;
  readonly fundingSource?: string | null;
  readonly accountNo?: string | null;
  readonly budgetCode?: string | null;
  readonly effectiveDatesTo?: string | null;
  readonly effectiveDatesFrom?: string | null;
  readonly positionTitleTo?: string | null;
  readonly positionTitleFrom?: string | null;
  readonly created_by?: string | null;
  readonly submited_by?: string | null;
  readonly formId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonnelActionEmployee = LazyLoading extends LazyLoadingDisabled ? EagerPersonnelActionEmployee : LazyPersonnelActionEmployee

export declare const PersonnelActionEmployee: (new (init: ModelInit<PersonnelActionEmployee>) => PersonnelActionEmployee) & {
  copyOf(source: PersonnelActionEmployee, mutator: (draft: MutableModel<PersonnelActionEmployee>) => MutableModel<PersonnelActionEmployee> | void): PersonnelActionEmployee;
}

type EagerTransactionCyclePersonnel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TransactionCyclePersonnel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly approver_level?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTransactionCyclePersonnel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TransactionCyclePersonnel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly approver_level?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TransactionCyclePersonnel = LazyLoading extends LazyLoadingDisabled ? EagerTransactionCyclePersonnel : LazyTransactionCyclePersonnel

export declare const TransactionCyclePersonnel: (new (init: ModelInit<TransactionCyclePersonnel>) => TransactionCyclePersonnel) & {
  copyOf(source: TransactionCyclePersonnel, mutator: (draft: MutableModel<TransactionCyclePersonnel>) => MutableModel<TransactionCyclePersonnel> | void): TransactionCyclePersonnel;
}

type EagerPreSignupEmployeeApps = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PreSignupEmployeeApps, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly appId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPreSignupEmployeeApps = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PreSignupEmployeeApps, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly appId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PreSignupEmployeeApps = LazyLoading extends LazyLoadingDisabled ? EagerPreSignupEmployeeApps : LazyPreSignupEmployeeApps

export declare const PreSignupEmployeeApps: (new (init: ModelInit<PreSignupEmployeeApps>) => PreSignupEmployeeApps) & {
  copyOf(source: PreSignupEmployeeApps, mutator: (draft: MutableModel<PreSignupEmployeeApps>) => MutableModel<PreSignupEmployeeApps> | void): PreSignupEmployeeApps;
}

type EagerPreSignupEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PreSignupEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly role?: string | null;
  readonly reportingMangerEmail?: string | null;
  readonly employeeCode?: string | null;
  readonly employeeName?: string | null;
  readonly schoolCode?: string | null;
  readonly userType?: string | null;
  readonly isSixPeriodSAdmin?: string | null;
  readonly sixPeriodIsInitiator?: string | null;
  readonly sixPeriodIsApprover?: string | null;
  readonly sixPeriodIsPayroll?: string | null;
  readonly certiSubRIsInitiator?: string | null;
  readonly certiSubReIsApprover?: string | null;
  readonly certiSubReqIsPayroll?: string | null;
  readonly designation?: string | null;
  readonly isUser?: string | null;
  readonly timeRIsInitiator?: string | null;
  readonly timeRIsApprover?: string | null;
  readonly timeRIsPayroll?: string | null;
  readonly timeRIsSAdmin?: string | null;
  readonly stipendInitiator?: string | null;
  readonly stipendApprover?: string | null;
  readonly stipendPayroll?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPreSignupEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PreSignupEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email?: string | null;
  readonly role?: string | null;
  readonly reportingMangerEmail?: string | null;
  readonly employeeCode?: string | null;
  readonly employeeName?: string | null;
  readonly schoolCode?: string | null;
  readonly userType?: string | null;
  readonly isSixPeriodSAdmin?: string | null;
  readonly sixPeriodIsInitiator?: string | null;
  readonly sixPeriodIsApprover?: string | null;
  readonly sixPeriodIsPayroll?: string | null;
  readonly certiSubRIsInitiator?: string | null;
  readonly certiSubReIsApprover?: string | null;
  readonly certiSubReqIsPayroll?: string | null;
  readonly designation?: string | null;
  readonly isUser?: string | null;
  readonly timeRIsInitiator?: string | null;
  readonly timeRIsApprover?: string | null;
  readonly timeRIsPayroll?: string | null;
  readonly timeRIsSAdmin?: string | null;
  readonly stipendInitiator?: string | null;
  readonly stipendApprover?: string | null;
  readonly stipendPayroll?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PreSignupEmployee = LazyLoading extends LazyLoadingDisabled ? EagerPreSignupEmployee : LazyPreSignupEmployee

export declare const PreSignupEmployee: (new (init: ModelInit<PreSignupEmployee>) => PreSignupEmployee) & {
  copyOf(source: PreSignupEmployee, mutator: (draft: MutableModel<PreSignupEmployee>) => MutableModel<PreSignupEmployee> | void): PreSignupEmployee;
}

type EagerPersonnelActionTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly status?: string | null;
  readonly signature_File_Path?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonnelActionTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly status?: string | null;
  readonly signature_File_Path?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonnelActionTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerPersonnelActionTransactionCycle : LazyPersonnelActionTransactionCycle

export declare const PersonnelActionTransactionCycle: (new (init: ModelInit<PersonnelActionTransactionCycle>) => PersonnelActionTransactionCycle) & {
  copyOf(source: PersonnelActionTransactionCycle, mutator: (draft: MutableModel<PersonnelActionTransactionCycle>) => MutableModel<PersonnelActionTransactionCycle> | void): PersonnelActionTransactionCycle;
}

type EagerPersonnelActionFormTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionFormTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly status?: string | null;
  readonly signature_File_Path?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonnelActionFormTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionFormTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly status?: string | null;
  readonly signature_File_Path?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonnelActionFormTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerPersonnelActionFormTransactionCycle : LazyPersonnelActionFormTransactionCycle

export declare const PersonnelActionFormTransactionCycle: (new (init: ModelInit<PersonnelActionFormTransactionCycle>) => PersonnelActionFormTransactionCycle) & {
  copyOf(source: PersonnelActionFormTransactionCycle, mutator: (draft: MutableModel<PersonnelActionFormTransactionCycle>) => MutableModel<PersonnelActionFormTransactionCycle> | void): PersonnelActionFormTransactionCycle;
}

type EagerPersonnelActionInitiatorForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionInitiatorForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly formTitle?: string | null;
  readonly boardMeetingDate?: string | null;
  readonly location?: string | null;
  readonly actionToBeTaken?: string | null;
  readonly type?: string | null;
  readonly personalReportNo?: string | null;
  readonly deptHead?: string | null;
  readonly budgetClerk?: string | null;
  readonly budgetManager?: string | null;
  readonly executiveSecretary?: string | null;
  readonly executiveManagement?: string | null;
  readonly submited_by?: string | null;
  readonly created_by?: string | null;
  readonly hrTechnician?: string | null;
  readonly executivedirelemId?: string | null;
  readonly assignelemorsec?: string | null;
  readonly psayesorno?: string | null;
  readonly actionDate?: string | null;
  readonly actionItem?: string | null;
  readonly actionPage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonnelActionInitiatorForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonnelActionInitiatorForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly formTitle?: string | null;
  readonly boardMeetingDate?: string | null;
  readonly location?: string | null;
  readonly actionToBeTaken?: string | null;
  readonly type?: string | null;
  readonly personalReportNo?: string | null;
  readonly deptHead?: string | null;
  readonly budgetClerk?: string | null;
  readonly budgetManager?: string | null;
  readonly executiveSecretary?: string | null;
  readonly executiveManagement?: string | null;
  readonly submited_by?: string | null;
  readonly created_by?: string | null;
  readonly hrTechnician?: string | null;
  readonly executivedirelemId?: string | null;
  readonly assignelemorsec?: string | null;
  readonly psayesorno?: string | null;
  readonly actionDate?: string | null;
  readonly actionItem?: string | null;
  readonly actionPage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonnelActionInitiatorForm = LazyLoading extends LazyLoadingDisabled ? EagerPersonnelActionInitiatorForm : LazyPersonnelActionInitiatorForm

export declare const PersonnelActionInitiatorForm: (new (init: ModelInit<PersonnelActionInitiatorForm>) => PersonnelActionInitiatorForm) & {
  copyOf(source: PersonnelActionInitiatorForm, mutator: (draft: MutableModel<PersonnelActionInitiatorForm>) => MutableModel<PersonnelActionInitiatorForm> | void): PersonnelActionInitiatorForm;
}

type EagerUserAppsPermission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserAppsPermission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly AppId?: Apps | keyof typeof Apps | null;
  readonly UserId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserAppsPermission = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserAppsPermission, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly AppId?: Apps | keyof typeof Apps | null;
  readonly UserId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserAppsPermission = LazyLoading extends LazyLoadingDisabled ? EagerUserAppsPermission : LazyUserAppsPermission

export declare const UserAppsPermission: (new (init: ModelInit<UserAppsPermission>) => UserAppsPermission) & {
  copyOf(source: UserAppsPermission, mutator: (draft: MutableModel<UserAppsPermission>) => MutableModel<UserAppsPermission> | void): UserAppsPermission;
}

type EagerPSATransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSATransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly dateTime?: string | null;
  readonly approver_level?: string | null;
  readonly designation?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSATransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSATransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly dateTime?: string | null;
  readonly approver_level?: string | null;
  readonly designation?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSATransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerPSATransactionCycle : LazyPSATransactionCycle

export declare const PSATransactionCycle: (new (init: ModelInit<PSATransactionCycle>) => PSATransactionCycle) & {
  copyOf(source: PSATransactionCycle, mutator: (draft: MutableModel<PSATransactionCycle>) => MutableModel<PSATransactionCycle> | void): PSATransactionCycle;
}

type EagerPSAParty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAParty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly party?: string | null;
  readonly pocName?: string | null;
  readonly pocNumber?: string | null;
  readonly email?: string | null;
  readonly clientId?: string | null;
  readonly employerID?: string | null;
  readonly ssn?: string | null;
  readonly typeBE?: string | null;
  readonly license?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly address?: string | null;
  readonly zip?: string | null;
  readonly psaConsultantId?: string | null;
  readonly title?: string | null;
  readonly filename?: string | null;
  readonly filename2?: string | null;
  readonly strs?: boolean | null;
  readonly calpers?: boolean | null;
  readonly w9File?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSAParty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAParty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly party?: string | null;
  readonly pocName?: string | null;
  readonly pocNumber?: string | null;
  readonly email?: string | null;
  readonly clientId?: string | null;
  readonly employerID?: string | null;
  readonly ssn?: string | null;
  readonly typeBE?: string | null;
  readonly license?: string | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly address?: string | null;
  readonly zip?: string | null;
  readonly psaConsultantId?: string | null;
  readonly title?: string | null;
  readonly filename?: string | null;
  readonly filename2?: string | null;
  readonly strs?: boolean | null;
  readonly calpers?: boolean | null;
  readonly w9File?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSAParty = LazyLoading extends LazyLoadingDisabled ? EagerPSAParty : LazyPSAParty

export declare const PSAParty: (new (init: ModelInit<PSAParty>) => PSAParty) & {
  copyOf(source: PSAParty, mutator: (draft: MutableModel<PSAParty>) => MutableModel<PSAParty> | void): PSAParty;
}

type EagerPSAConsultant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAConsultant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly department?: string | null;
  readonly agreementDate?: string | null;
  readonly amount?: string | null;
  readonly effectiveDate?: string | null;
  readonly expireDate?: string | null;
  readonly reviewDate?: string | null;
  readonly notifyDays?: string | null;
  readonly submittedTo?: string | null;
  readonly accountNo?: string | null;
  readonly dateofboard?: string | null;
  readonly boardItem?: string | null;
  readonly pageItem?: string | null;
  readonly services?: string | null;
  readonly budgetClerk?: string | null;
  readonly hrConsultant?: string | null;
  readonly executive?: string | null;
  readonly hrexecutive?: string | null;
  readonly psaEmail?: string | null;
  readonly filename?: string | null;
  readonly notes?: string | null;
  readonly otherRemark?: string | null;
  readonly status?: string | null;
  readonly otp?: number | null;
  readonly createdBy?: string | null;
  readonly businessEntity?: string | null;
  readonly addendum?: string | null;
  readonly purchaseOrderNo?: string | null;
  readonly addendumNo?: string | null;
  readonly referenceNo?: string | null;
  readonly submittedCompletedFormTo?: string | null;
  readonly budgetManager?: string | null;
  readonly dateOfApprove?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSAConsultant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PSAConsultant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly department?: string | null;
  readonly agreementDate?: string | null;
  readonly amount?: string | null;
  readonly effectiveDate?: string | null;
  readonly expireDate?: string | null;
  readonly reviewDate?: string | null;
  readonly notifyDays?: string | null;
  readonly submittedTo?: string | null;
  readonly accountNo?: string | null;
  readonly dateofboard?: string | null;
  readonly boardItem?: string | null;
  readonly pageItem?: string | null;
  readonly services?: string | null;
  readonly budgetClerk?: string | null;
  readonly hrConsultant?: string | null;
  readonly executive?: string | null;
  readonly hrexecutive?: string | null;
  readonly psaEmail?: string | null;
  readonly filename?: string | null;
  readonly notes?: string | null;
  readonly otherRemark?: string | null;
  readonly status?: string | null;
  readonly otp?: number | null;
  readonly createdBy?: string | null;
  readonly businessEntity?: string | null;
  readonly addendum?: string | null;
  readonly purchaseOrderNo?: string | null;
  readonly addendumNo?: string | null;
  readonly referenceNo?: string | null;
  readonly submittedCompletedFormTo?: string | null;
  readonly budgetManager?: string | null;
  readonly dateOfApprove?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSAConsultant = LazyLoading extends LazyLoadingDisabled ? EagerPSAConsultant : LazyPSAConsultant

export declare const PSAConsultant: (new (init: ModelInit<PSAConsultant>) => PSAConsultant) & {
  copyOf(source: PSAConsultant, mutator: (draft: MutableModel<PSAConsultant>) => MutableModel<PSAConsultant> | void): PSAConsultant;
}

type EagerStipendTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly ccEmail?: string | null;
  readonly rejectedBy?: string | null;
  readonly submittedDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStipendTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly ccEmail?: string | null;
  readonly rejectedBy?: string | null;
  readonly submittedDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StipendTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerStipendTransactionCycle : LazyStipendTransactionCycle

export declare const StipendTransactionCycle: (new (init: ModelInit<StipendTransactionCycle>) => StipendTransactionCycle) & {
  copyOf(source: StipendTransactionCycle, mutator: (draft: MutableModel<StipendTransactionCycle>) => MutableModel<StipendTransactionCycle> | void): StipendTransactionCycle;
}

type EagerNotificationReadTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationReadTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly read_id?: string | null;
  readonly notification_id?: string | null;
  readonly user_id?: string | null;
  readonly read_at?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotificationReadTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationReadTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly read_id?: string | null;
  readonly notification_id?: string | null;
  readonly user_id?: string | null;
  readonly read_at?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NotificationReadTable = LazyLoading extends LazyLoadingDisabled ? EagerNotificationReadTable : LazyNotificationReadTable

export declare const NotificationReadTable: (new (init: ModelInit<NotificationReadTable>) => NotificationReadTable) & {
  copyOf(source: NotificationReadTable, mutator: (draft: MutableModel<NotificationReadTable>) => MutableModel<NotificationReadTable> | void): NotificationReadTable;
}

type EagerNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notification_type?: NotificationTypeEnum | keyof typeof NotificationTypeEnum | null;
  readonly user_id?: string | null;
  readonly source_id?: string | null;
  readonly source_typ?: SourceEnum | keyof typeof SourceEnum | null;
  readonly message?: string | null;
  readonly created_at?: number | null;
  readonly AppId?: Apps | keyof typeof Apps | null;
  readonly subject?: string | null;
  readonly read_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotificationTable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NotificationTable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly notification_type?: NotificationTypeEnum | keyof typeof NotificationTypeEnum | null;
  readonly user_id?: string | null;
  readonly source_id?: string | null;
  readonly source_typ?: SourceEnum | keyof typeof SourceEnum | null;
  readonly message?: string | null;
  readonly created_at?: number | null;
  readonly AppId?: Apps | keyof typeof Apps | null;
  readonly subject?: string | null;
  readonly read_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NotificationTable = LazyLoading extends LazyLoadingDisabled ? EagerNotificationTable : LazyNotificationTable

export declare const NotificationTable: (new (init: ModelInit<NotificationTable>) => NotificationTable) & {
  copyOf(source: NotificationTable, mutator: (draft: MutableModel<NotificationTable>) => MutableModel<NotificationTable> | void): NotificationTable;
}

type EagerCertificatedSubRequestTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly approver_level?: string | null;
  readonly signature_File_Path?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedSubRequestTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly approver_level?: string | null;
  readonly signature_File_Path?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedSubRequestTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedSubRequestTransactionCycle : LazyCertificatedSubRequestTransactionCycle

export declare const CertificatedSubRequestTransactionCycle: (new (init: ModelInit<CertificatedSubRequestTransactionCycle>) => CertificatedSubRequestTransactionCycle) & {
  copyOf(source: CertificatedSubRequestTransactionCycle, mutator: (draft: MutableModel<CertificatedSubRequestTransactionCycle>) => MutableModel<CertificatedSubRequestTransactionCycle> | void): CertificatedSubRequestTransactionCycle;
}

type EagerPersonalActionForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonalActionForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly positionTitle?: string | null;
  readonly effectiveDates?: string | null;
  readonly salaryRate?: string | null;
  readonly rateofPay?: string | null;
  readonly reason?: string | null;
  readonly fundingSource?: string | null;
  readonly accountNo?: string | null;
  readonly budgetCode?: string | null;
  readonly formId?: string | null;
  readonly effectiveDatesTo?: string | null;
  readonly effectiveDatesFrom?: string | null;
  readonly positionTitleTo?: string | null;
  readonly positionTitleFrom?: string | null;
  readonly formTitle?: string | null;
  readonly boardMeetingDate?: string | null;
  readonly location?: string | null;
  readonly actionToBeTaken?: string | null;
  readonly type?: string | null;
  readonly personalReportNo?: string | null;
  readonly deptHead?: string | null;
  readonly budgetClerk?: string | null;
  readonly budgetManager?: string | null;
  readonly executiveSecretary?: string | null;
  readonly executiveManagement?: string | null;
  readonly created_by?: string | null;
  readonly submited_by?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonalActionForm = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonalActionForm, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly employeeName?: string | null;
  readonly positionTitle?: string | null;
  readonly effectiveDates?: string | null;
  readonly salaryRate?: string | null;
  readonly rateofPay?: string | null;
  readonly reason?: string | null;
  readonly fundingSource?: string | null;
  readonly accountNo?: string | null;
  readonly budgetCode?: string | null;
  readonly formId?: string | null;
  readonly effectiveDatesTo?: string | null;
  readonly effectiveDatesFrom?: string | null;
  readonly positionTitleTo?: string | null;
  readonly positionTitleFrom?: string | null;
  readonly formTitle?: string | null;
  readonly boardMeetingDate?: string | null;
  readonly location?: string | null;
  readonly actionToBeTaken?: string | null;
  readonly type?: string | null;
  readonly personalReportNo?: string | null;
  readonly deptHead?: string | null;
  readonly budgetClerk?: string | null;
  readonly budgetManager?: string | null;
  readonly executiveSecretary?: string | null;
  readonly executiveManagement?: string | null;
  readonly created_by?: string | null;
  readonly submited_by?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonalActionForm = LazyLoading extends LazyLoadingDisabled ? EagerPersonalActionForm : LazyPersonalActionForm

export declare const PersonalActionForm: (new (init: ModelInit<PersonalActionForm>) => PersonalActionForm) & {
  copyOf(source: PersonalActionForm, mutator: (draft: MutableModel<PersonalActionForm>) => MutableModel<PersonalActionForm> | void): PersonalActionForm;
}

type EagerHandbookAssignee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HandbookAssignee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly handbook_id?: string | null;
  readonly emp_id?: string | null;
  readonly status?: HandbookEnum | keyof typeof HandbookEnum | null;
  readonly acknowledge_date?: string | null;
  readonly due_date?: string | null;
  readonly created_by?: string | null;
  readonly created_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHandbookAssignee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HandbookAssignee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly handbook_id?: string | null;
  readonly emp_id?: string | null;
  readonly status?: HandbookEnum | keyof typeof HandbookEnum | null;
  readonly acknowledge_date?: string | null;
  readonly due_date?: string | null;
  readonly created_by?: string | null;
  readonly created_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HandbookAssignee = LazyLoading extends LazyLoadingDisabled ? EagerHandbookAssignee : LazyHandbookAssignee

export declare const HandbookAssignee: (new (init: ModelInit<HandbookAssignee>) => HandbookAssignee) & {
  copyOf(source: HandbookAssignee, mutator: (draft: MutableModel<HandbookAssignee>) => MutableModel<HandbookAssignee> | void): HandbookAssignee;
}

type EagerHandbook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Handbook, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly handbook_name?: string | null;
  readonly description?: string | null;
  readonly file_path?: string | null;
  readonly created_date?: string | null;
  readonly created_by?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHandbook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Handbook, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly handbook_name?: string | null;
  readonly description?: string | null;
  readonly file_path?: string | null;
  readonly created_date?: string | null;
  readonly created_by?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Handbook = LazyLoading extends LazyLoadingDisabled ? EagerHandbook : LazyHandbook

export declare const Handbook: (new (init: ModelInit<Handbook>) => Handbook) & {
  copyOf(source: Handbook, mutator: (draft: MutableModel<Handbook>) => MutableModel<Handbook> | void): Handbook;
}

type EagerCertificatedSubRequestFundingAccountDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestFundingAccountDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly fundingAccountTypeId?: string | null;
  readonly accountNumber?: string | null;
  readonly noteIfSpecify?: string | null;
  readonly remarks?: string | null;
  readonly percentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedSubRequestFundingAccountDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestFundingAccountDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly fundingAccountTypeId?: string | null;
  readonly accountNumber?: string | null;
  readonly noteIfSpecify?: string | null;
  readonly remarks?: string | null;
  readonly percentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedSubRequestFundingAccountDetails = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedSubRequestFundingAccountDetails : LazyCertificatedSubRequestFundingAccountDetails

export declare const CertificatedSubRequestFundingAccountDetails: (new (init: ModelInit<CertificatedSubRequestFundingAccountDetails>) => CertificatedSubRequestFundingAccountDetails) & {
  copyOf(source: CertificatedSubRequestFundingAccountDetails, mutator: (draft: MutableModel<CertificatedSubRequestFundingAccountDetails>) => MutableModel<CertificatedSubRequestFundingAccountDetails> | void): CertificatedSubRequestFundingAccountDetails;
}

type EagerFundingAccountType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FundingAccountType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fundingAccountType?: string | null;
  readonly isSpecify?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFundingAccountType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FundingAccountType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fundingAccountType?: string | null;
  readonly isSpecify?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FundingAccountType = LazyLoading extends LazyLoadingDisabled ? EagerFundingAccountType : LazyFundingAccountType

export declare const FundingAccountType: (new (init: ModelInit<FundingAccountType>) => FundingAccountType) & {
  copyOf(source: FundingAccountType, mutator: (draft: MutableModel<FundingAccountType>) => MutableModel<FundingAccountType> | void): FundingAccountType;
}

type EagerCertificatedSubRequestSpecificTeacherDates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestSpecificTeacherDates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teacherId?: string | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedSubRequestSpecificTeacherDates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestSpecificTeacherDates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teacherId?: string | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedSubRequestSpecificTeacherDates = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedSubRequestSpecificTeacherDates : LazyCertificatedSubRequestSpecificTeacherDates

export declare const CertificatedSubRequestSpecificTeacherDates: (new (init: ModelInit<CertificatedSubRequestSpecificTeacherDates>) => CertificatedSubRequestSpecificTeacherDates) & {
  copyOf(source: CertificatedSubRequestSpecificTeacherDates, mutator: (draft: MutableModel<CertificatedSubRequestSpecificTeacherDates>) => MutableModel<CertificatedSubRequestSpecificTeacherDates> | void): CertificatedSubRequestSpecificTeacherDates;
}

type EagerCertificatedSubRequestTeacherData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestTeacherData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly teacherId?: string | null;
  readonly indicateIf?: string | null;
  readonly gradeOrSubject?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedSubRequestTeacherData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubRequestTeacherData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly teacherId?: string | null;
  readonly indicateIf?: string | null;
  readonly gradeOrSubject?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedSubRequestTeacherData = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedSubRequestTeacherData : LazyCertificatedSubRequestTeacherData

export declare const CertificatedSubRequestTeacherData: (new (init: ModelInit<CertificatedSubRequestTeacherData>) => CertificatedSubRequestTeacherData) & {
  copyOf(source: CertificatedSubRequestTeacherData, mutator: (draft: MutableModel<CertificatedSubRequestTeacherData>) => MutableModel<CertificatedSubRequestTeacherData> | void): CertificatedSubRequestTeacherData;
}

type EagerCertificatedSubInitiateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubInitiateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly schoolOrDeptId?: string | null;
  readonly reportDate?: string | null;
  readonly purposeOfReport?: string | null;
  readonly status?: string | null;
  readonly submittedBy?: string | null;
  readonly submittedOn?: string | null;
  readonly firstApproverId?: string | null;
  readonly secondApproverId?: string | null;
  readonly payrollId?: string | null;
  readonly thirdApproverId?: string | null;
  readonly assighmentTitle?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedSubInitiateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedSubInitiateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly schoolOrDeptId?: string | null;
  readonly reportDate?: string | null;
  readonly purposeOfReport?: string | null;
  readonly status?: string | null;
  readonly submittedBy?: string | null;
  readonly submittedOn?: string | null;
  readonly firstApproverId?: string | null;
  readonly secondApproverId?: string | null;
  readonly payrollId?: string | null;
  readonly thirdApproverId?: string | null;
  readonly assighmentTitle?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedSubInitiateRequest = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedSubInitiateRequest : LazyCertificatedSubInitiateRequest

export declare const CertificatedSubInitiateRequest: (new (init: ModelInit<CertificatedSubInitiateRequest>) => CertificatedSubInitiateRequest) & {
  copyOf(source: CertificatedSubInitiateRequest, mutator: (draft: MutableModel<CertificatedSubInitiateRequest>) => MutableModel<CertificatedSubInitiateRequest> | void): CertificatedSubInitiateRequest;
}

type EagerStipendAssignments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendAssignments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stipendMasterId?: string | null;
  readonly name?: string | null;
  readonly amount?: string | null;
  readonly isSplit?: boolean | null;
  readonly splitText?: string | null;
  readonly isExtraCurricular?: boolean | null;
  readonly isDeptChair?: boolean | null;
  readonly noOfEmployee?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStipendAssignments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendAssignments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stipendMasterId?: string | null;
  readonly name?: string | null;
  readonly amount?: string | null;
  readonly isSplit?: boolean | null;
  readonly splitText?: string | null;
  readonly isExtraCurricular?: boolean | null;
  readonly isDeptChair?: boolean | null;
  readonly noOfEmployee?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StipendAssignments = LazyLoading extends LazyLoadingDisabled ? EagerStipendAssignments : LazyStipendAssignments

export declare const StipendAssignments: (new (init: ModelInit<StipendAssignments>) => StipendAssignments) & {
  copyOf(source: StipendAssignments, mutator: (draft: MutableModel<StipendAssignments>) => MutableModel<StipendAssignments> | void): StipendAssignments;
}

type EagerDepartmentTypeMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DepartmentTypeMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDepartmentTypeMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DepartmentTypeMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DepartmentTypeMaster = LazyLoading extends LazyLoadingDisabled ? EagerDepartmentTypeMaster : LazyDepartmentTypeMaster

export declare const DepartmentTypeMaster: (new (init: ModelInit<DepartmentTypeMaster>) => DepartmentTypeMaster) & {
  copyOf(source: DepartmentTypeMaster, mutator: (draft: MutableModel<DepartmentTypeMaster>) => MutableModel<DepartmentTypeMaster> | void): DepartmentTypeMaster;
}

type EagerStipendTypeMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendTypeMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStipendTypeMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendTypeMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StipendTypeMaster = LazyLoading extends LazyLoadingDisabled ? EagerStipendTypeMaster : LazyStipendTypeMaster

export declare const StipendTypeMaster: (new (init: ModelInit<StipendTypeMaster>) => StipendTypeMaster) & {
  copyOf(source: StipendTypeMaster, mutator: (draft: MutableModel<StipendTypeMaster>) => MutableModel<StipendTypeMaster> | void): StipendTypeMaster;
}

type EagerSemisterMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SemisterMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySemisterMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SemisterMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SemisterMaster = LazyLoading extends LazyLoadingDisabled ? EagerSemisterMaster : LazySemisterMaster

export declare const SemisterMaster: (new (init: ModelInit<SemisterMaster>) => SemisterMaster) & {
  copyOf(source: SemisterMaster, mutator: (draft: MutableModel<SemisterMaster>) => MutableModel<SemisterMaster> | void): SemisterMaster;
}

type EagerYearMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyYearMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<YearMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type YearMaster = LazyLoading extends LazyLoadingDisabled ? EagerYearMaster : LazyYearMaster

export declare const YearMaster: (new (init: ModelInit<YearMaster>) => YearMaster) & {
  copyOf(source: YearMaster, mutator: (draft: MutableModel<YearMaster>) => MutableModel<YearMaster> | void): YearMaster;
}

type EagerStipendMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly schoolId?: string | null;
  readonly schoolYearId?: string | null;
  readonly semisterId?: string | null;
  readonly stipendAssignmentId?: string | null;
  readonly selfAssignment?: boolean | null;
  readonly departmentTypeId?: string | null;
  readonly peopleCountInDepartment?: string | null;
  readonly status?: CertificatedAdminWeeklyAbsenceReportStatus | keyof typeof CertificatedAdminWeeklyAbsenceReportStatus | null;
  readonly createdBy?: string | null;
  readonly isElementaryStipend?: boolean | null;
  readonly isMiddleStipend?: boolean | null;
  readonly isHighStipend?: boolean | null;
  readonly isDepartmentStipend?: boolean | null;
  readonly isHeadStipend?: boolean | null;
  readonly principalId?: string | null;
  readonly hrTechI?: string | null;
  readonly executiveManagerId?: string | null;
  readonly statusStipend?: string | null;
  readonly title?: string | null;
  readonly updatedBy?: string | null;
  readonly remark?: string | null;
  readonly rejectedBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStipendMaster = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StipendMaster, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employeeId?: string | null;
  readonly schoolId?: string | null;
  readonly schoolYearId?: string | null;
  readonly semisterId?: string | null;
  readonly stipendAssignmentId?: string | null;
  readonly selfAssignment?: boolean | null;
  readonly departmentTypeId?: string | null;
  readonly peopleCountInDepartment?: string | null;
  readonly status?: CertificatedAdminWeeklyAbsenceReportStatus | keyof typeof CertificatedAdminWeeklyAbsenceReportStatus | null;
  readonly createdBy?: string | null;
  readonly isElementaryStipend?: boolean | null;
  readonly isMiddleStipend?: boolean | null;
  readonly isHighStipend?: boolean | null;
  readonly isDepartmentStipend?: boolean | null;
  readonly isHeadStipend?: boolean | null;
  readonly principalId?: string | null;
  readonly hrTechI?: string | null;
  readonly executiveManagerId?: string | null;
  readonly statusStipend?: string | null;
  readonly title?: string | null;
  readonly updatedBy?: string | null;
  readonly remark?: string | null;
  readonly rejectedBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StipendMaster = LazyLoading extends LazyLoadingDisabled ? EagerStipendMaster : LazyStipendMaster

export declare const StipendMaster: (new (init: ModelInit<StipendMaster>) => StipendMaster) & {
  copyOf(source: StipendMaster, mutator: (draft: MutableModel<StipendMaster>) => MutableModel<StipendMaster> | void): StipendMaster;
}

type EagerUntitledModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UntitledModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly untitledfield?: TypeOfSubRequestOrObjectCode | keyof typeof TypeOfSubRequestOrObjectCode | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUntitledModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UntitledModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly untitledfield?: TypeOfSubRequestOrObjectCode | keyof typeof TypeOfSubRequestOrObjectCode | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UntitledModel = LazyLoading extends LazyLoadingDisabled ? EagerUntitledModel : LazyUntitledModel

export declare const UntitledModel: (new (init: ModelInit<UntitledModel>) => UntitledModel) & {
  copyOf(source: UntitledModel, mutator: (draft: MutableModel<UntitledModel>) => MutableModel<UntitledModel> | void): UntitledModel;
}

type EagerClassifiedSubInitiateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ClassifiedSubInitiateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly classification?: string | null;
  readonly selectedEmployeeId?: string | null;
  readonly fromDate?: string | null;
  readonly toDate?: string | null;
  readonly typeOfSubReqOrobjCode?: string | null;
  readonly totalWorkingHours?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly locationId?: string | null;
  readonly reasonForAbsenceRequest?: string | null;
  readonly substitude?: string | null;
  readonly confirmed?: boolean | null;
  readonly firstApproverId?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClassifiedSubInitiateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ClassifiedSubInitiateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly classification?: string | null;
  readonly selectedEmployeeId?: string | null;
  readonly fromDate?: string | null;
  readonly toDate?: string | null;
  readonly typeOfSubReqOrobjCode?: string | null;
  readonly totalWorkingHours?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly locationId?: string | null;
  readonly reasonForAbsenceRequest?: string | null;
  readonly substitude?: string | null;
  readonly confirmed?: boolean | null;
  readonly firstApproverId?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ClassifiedSubInitiateRequest = LazyLoading extends LazyLoadingDisabled ? EagerClassifiedSubInitiateRequest : LazyClassifiedSubInitiateRequest

export declare const ClassifiedSubInitiateRequest: (new (init: ModelInit<ClassifiedSubInitiateRequest>) => ClassifiedSubInitiateRequest) & {
  copyOf(source: ClassifiedSubInitiateRequest, mutator: (draft: MutableModel<ClassifiedSubInitiateRequest>) => MutableModel<ClassifiedSubInitiateRequest> | void): ClassifiedSubInitiateRequest;
}

type EagerEmployeeHandbook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeHandbook, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly EmployeeName?: string | null;
  readonly EmployeeId?: string | null;
  readonly dateHandbookSend?: string | null;
  readonly dateofAcknowledge?: string | null;
  readonly status?: string | null;
  readonly handbookName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployeeHandbook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeHandbook, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly EmployeeName?: string | null;
  readonly EmployeeId?: string | null;
  readonly dateHandbookSend?: string | null;
  readonly dateofAcknowledge?: string | null;
  readonly status?: string | null;
  readonly handbookName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmployeeHandbook = LazyLoading extends LazyLoadingDisabled ? EagerEmployeeHandbook : LazyEmployeeHandbook

export declare const EmployeeHandbook: (new (init: ModelInit<EmployeeHandbook>) => EmployeeHandbook) & {
  copyOf(source: EmployeeHandbook, mutator: (draft: MutableModel<EmployeeHandbook>) => MutableModel<EmployeeHandbook> | void): EmployeeHandbook;
}

type EagerSubstituteCertificateRequestTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequestTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly fromEmployeeId?: string | null;
  readonly toEmployeeId?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly approver_level?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubstituteCertificateRequestTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequestTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reportId?: string | null;
  readonly fromEmployeeId?: string | null;
  readonly toEmployeeId?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly approver_level?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubstituteCertificateRequestTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerSubstituteCertificateRequestTransactionCycle : LazySubstituteCertificateRequestTransactionCycle

export declare const SubstituteCertificateRequestTransactionCycle: (new (init: ModelInit<SubstituteCertificateRequestTransactionCycle>) => SubstituteCertificateRequestTransactionCycle) & {
  copyOf(source: SubstituteCertificateRequestTransactionCycle, mutator: (draft: MutableModel<SubstituteCertificateRequestTransactionCycle>) => MutableModel<SubstituteCertificateRequestTransactionCycle> | void): SubstituteCertificateRequestTransactionCycle;
}

type EagerSubstituteCertificateRequestAccountNoIDs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequestAccountNoIDs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly substituteCertificateRequestId?: string | null;
  readonly accountNumber?: string | null;
  readonly percentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubstituteCertificateRequestAccountNoIDs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequestAccountNoIDs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly substituteCertificateRequestId?: string | null;
  readonly accountNumber?: string | null;
  readonly percentage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubstituteCertificateRequestAccountNoIDs = LazyLoading extends LazyLoadingDisabled ? EagerSubstituteCertificateRequestAccountNoIDs : LazySubstituteCertificateRequestAccountNoIDs

export declare const SubstituteCertificateRequestAccountNoIDs: (new (init: ModelInit<SubstituteCertificateRequestAccountNoIDs>) => SubstituteCertificateRequestAccountNoIDs) & {
  copyOf(source: SubstituteCertificateRequestAccountNoIDs, mutator: (draft: MutableModel<SubstituteCertificateRequestAccountNoIDs>) => MutableModel<SubstituteCertificateRequestAccountNoIDs> | void): SubstituteCertificateRequestAccountNoIDs;
}

type EagerSubstituteCertificateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly classification?: string | null;
  readonly employeeCodeId?: string | null;
  readonly fromDate?: string | null;
  readonly toDate?: string | null;
  readonly typeOfSub?: string | null;
  readonly locationId?: string | null;
  readonly reasonForAbsenceRequest?: string | null;
  readonly substitudeName?: string | null;
  readonly isConfirmed?: boolean | null;
  readonly principleDepartmentHeadString?: string | null;
  readonly createdBy?: string | null;
  readonly CreatedByDateTime?: string | null;
  readonly fromTime?: string | null;
  readonly endTime?: string | null;
  readonly budgetApprover?: string | null;
  readonly payrollHr?: string | null;
  readonly totalWorkingHours?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubstituteCertificateRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubstituteCertificateRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignmentTitle?: string | null;
  readonly classification?: string | null;
  readonly employeeCodeId?: string | null;
  readonly fromDate?: string | null;
  readonly toDate?: string | null;
  readonly typeOfSub?: string | null;
  readonly locationId?: string | null;
  readonly reasonForAbsenceRequest?: string | null;
  readonly substitudeName?: string | null;
  readonly isConfirmed?: boolean | null;
  readonly principleDepartmentHeadString?: string | null;
  readonly createdBy?: string | null;
  readonly CreatedByDateTime?: string | null;
  readonly fromTime?: string | null;
  readonly endTime?: string | null;
  readonly budgetApprover?: string | null;
  readonly payrollHr?: string | null;
  readonly totalWorkingHours?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubstituteCertificateRequest = LazyLoading extends LazyLoadingDisabled ? EagerSubstituteCertificateRequest : LazySubstituteCertificateRequest

export declare const SubstituteCertificateRequest: (new (init: ModelInit<SubstituteCertificateRequest>) => SubstituteCertificateRequest) & {
  copyOf(source: SubstituteCertificateRequest, mutator: (draft: MutableModel<SubstituteCertificateRequest>) => MutableModel<SubstituteCertificateRequest> | void): SubstituteCertificateRequest;
}

type EagerCertifiedAdminReportsLog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertifiedAdminReportsLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly comment?: string | null;
  readonly date_and_time?: string | null;
  readonly user_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertifiedAdminReportsLog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertifiedAdminReportsLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly comment?: string | null;
  readonly date_and_time?: string | null;
  readonly user_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertifiedAdminReportsLog = LazyLoading extends LazyLoadingDisabled ? EagerCertifiedAdminReportsLog : LazyCertifiedAdminReportsLog

export declare const CertifiedAdminReportsLog: (new (init: ModelInit<CertifiedAdminReportsLog>) => CertifiedAdminReportsLog) & {
  copyOf(source: CertifiedAdminReportsLog, mutator: (draft: MutableModel<CertifiedAdminReportsLog>) => MutableModel<CertifiedAdminReportsLog> | void): CertifiedAdminReportsLog;
}

type EagerCertificatedAdminWeeklyAbsenceReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Certificated_Admin_Weekly_Absence_Report_Employee_id?: string | null;
  readonly absent_code_id?: string | null;
  readonly substitute_emp_id?: string | null;
  readonly is_full_day?: boolean | null;
  readonly partial_hour?: number | null;
  readonly partial_min?: number | null;
  readonly absent_date?: string | null;
  readonly employee_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedAdminWeeklyAbsenceReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Certificated_Admin_Weekly_Absence_Report_Employee_id?: string | null;
  readonly absent_code_id?: string | null;
  readonly substitute_emp_id?: string | null;
  readonly is_full_day?: boolean | null;
  readonly partial_hour?: number | null;
  readonly partial_min?: number | null;
  readonly absent_date?: string | null;
  readonly employee_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedAdminWeeklyAbsenceReportEmployeeDetails = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedAdminWeeklyAbsenceReportEmployeeDetails : LazyCertificatedAdminWeeklyAbsenceReportEmployeeDetails

export declare const CertificatedAdminWeeklyAbsenceReportEmployeeDetails: (new (init: ModelInit<CertificatedAdminWeeklyAbsenceReportEmployeeDetails>) => CertificatedAdminWeeklyAbsenceReportEmployeeDetails) & {
  copyOf(source: CertificatedAdminWeeklyAbsenceReportEmployeeDetails, mutator: (draft: MutableModel<CertificatedAdminWeeklyAbsenceReportEmployeeDetails>) => MutableModel<CertificatedAdminWeeklyAbsenceReportEmployeeDetails> | void): CertificatedAdminWeeklyAbsenceReportEmployeeDetails;
}

type EagerCertificatedAdminWeeklyAbsenceReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Certificated_Admin_Weekly_Absence_Report_id?: string | null;
  readonly employee_id?: string | null;
  readonly employee_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedAdminWeeklyAbsenceReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Certificated_Admin_Weekly_Absence_Report_id?: string | null;
  readonly employee_id?: string | null;
  readonly employee_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedAdminWeeklyAbsenceReportEmployee = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedAdminWeeklyAbsenceReportEmployee : LazyCertificatedAdminWeeklyAbsenceReportEmployee

export declare const CertificatedAdminWeeklyAbsenceReportEmployee: (new (init: ModelInit<CertificatedAdminWeeklyAbsenceReportEmployee>) => CertificatedAdminWeeklyAbsenceReportEmployee) & {
  copyOf(source: CertificatedAdminWeeklyAbsenceReportEmployee, mutator: (draft: MutableModel<CertificatedAdminWeeklyAbsenceReportEmployee>) => MutableModel<CertificatedAdminWeeklyAbsenceReportEmployee> | void): CertificatedAdminWeeklyAbsenceReportEmployee;
}

type EagerCertificatedAdminWeeklyAbsenceReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: CertificatedAdminWeeklyAbsenceReportStatus | keyof typeof CertificatedAdminWeeklyAbsenceReportStatus | null;
  readonly school_id?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly status_date_time?: string | null;
  readonly approver_status?: string | null;
  readonly approver_by?: string | null;
  readonly approver_date_time?: string | null;
  readonly payroll_status?: string | null;
  readonly payroll_by?: string | null;
  readonly payroll_date_time?: string | null;
  readonly approver_remark?: string | null;
  readonly payroll_remark?: string | null;
  readonly l1_authority?: string | null;
  readonly l2_authority?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCertificatedAdminWeeklyAbsenceReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CertificatedAdminWeeklyAbsenceReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: CertificatedAdminWeeklyAbsenceReportStatus | keyof typeof CertificatedAdminWeeklyAbsenceReportStatus | null;
  readonly school_id?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly status_date_time?: string | null;
  readonly approver_status?: string | null;
  readonly approver_by?: string | null;
  readonly approver_date_time?: string | null;
  readonly payroll_status?: string | null;
  readonly payroll_by?: string | null;
  readonly payroll_date_time?: string | null;
  readonly approver_remark?: string | null;
  readonly payroll_remark?: string | null;
  readonly l1_authority?: string | null;
  readonly l2_authority?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CertificatedAdminWeeklyAbsenceReport = LazyLoading extends LazyLoadingDisabled ? EagerCertificatedAdminWeeklyAbsenceReport : LazyCertificatedAdminWeeklyAbsenceReport

export declare const CertificatedAdminWeeklyAbsenceReport: (new (init: ModelInit<CertificatedAdminWeeklyAbsenceReport>) => CertificatedAdminWeeklyAbsenceReport) & {
  copyOf(source: CertificatedAdminWeeklyAbsenceReport, mutator: (draft: MutableModel<CertificatedAdminWeeklyAbsenceReport>) => MutableModel<CertificatedAdminWeeklyAbsenceReport> | void): CertificatedAdminWeeklyAbsenceReport;
}

type EagerTimeReportTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly approver_level?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeReportTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly approver_level?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeReportTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerTimeReportTransactionCycle : LazyTimeReportTransactionCycle

export declare const TimeReportTransactionCycle: (new (init: ModelInit<TimeReportTransactionCycle>) => TimeReportTransactionCycle) & {
  copyOf(source: TimeReportTransactionCycle, mutator: (draft: MutableModel<TimeReportTransactionCycle>) => MutableModel<TimeReportTransactionCycle> | void): TimeReportTransactionCycle;
}

type EagerEmployeeType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly untitledfield?: EmployeeTypeEnum | keyof typeof EmployeeTypeEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployeeType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly untitledfield?: EmployeeTypeEnum | keyof typeof EmployeeTypeEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmployeeType = LazyLoading extends LazyLoadingDisabled ? EagerEmployeeType : LazyEmployeeType

export declare const EmployeeType: (new (init: ModelInit<EmployeeType>) => EmployeeType) & {
  copyOf(source: EmployeeType, mutator: (draft: MutableModel<EmployeeType>) => MutableModel<EmployeeType> | void): EmployeeType;
}

type EagerTimeReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly time_Report_Employee_Id?: string | null;
  readonly date?: string | null;
  readonly totalHours?: string | null;
  readonly totalMin?: string | null;
  readonly totalHoursAndMinDisplay?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly time_Report_Employee_Id?: string | null;
  readonly date?: string | null;
  readonly totalHours?: string | null;
  readonly totalMin?: string | null;
  readonly totalHoursAndMinDisplay?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeReportEmployeeDetails = LazyLoading extends LazyLoadingDisabled ? EagerTimeReportEmployeeDetails : LazyTimeReportEmployeeDetails

export declare const TimeReportEmployeeDetails: (new (init: ModelInit<TimeReportEmployeeDetails>) => TimeReportEmployeeDetails) & {
  copyOf(source: TimeReportEmployeeDetails, mutator: (draft: MutableModel<TimeReportEmployeeDetails>) => MutableModel<TimeReportEmployeeDetails> | void): TimeReportEmployeeDetails;
}

type EagerTimeReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employee_Id?: string | null;
  readonly time_Report_Id?: string | null;
  readonly pay_Rate?: string | null;
  readonly totalEmployeeWorkingHours?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employee_Id?: string | null;
  readonly time_Report_Id?: string | null;
  readonly pay_Rate?: string | null;
  readonly totalEmployeeWorkingHours?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeReportEmployee = LazyLoading extends LazyLoadingDisabled ? EagerTimeReportEmployee : LazyTimeReportEmployee

export declare const TimeReportEmployee: (new (init: ModelInit<TimeReportEmployee>) => TimeReportEmployee) & {
  copyOf(source: TimeReportEmployee, mutator: (draft: MutableModel<TimeReportEmployee>) => MutableModel<TimeReportEmployee> | void): TimeReportEmployee;
}

type EagerTimeReportInitiateReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportInitiateReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly school_Department_Id?: string | null;
  readonly From_Date?: string | null;
  readonly To_Date?: string | null;
  readonly Type?: string | null;
  readonly Account?: string | null;
  readonly Hourly_Rate?: string | null;
  readonly Daily_Rate?: string | null;
  readonly Authorizing_Board_Report_Date?: string | null;
  readonly First_Approveal?: string | null;
  readonly Second_Approveal?: string | null;
  readonly Status?: string | null;
  readonly Created_By?: string | null;
  readonly Created_By_Date?: string | null;
  readonly payroll_id?: string | null;
  readonly validator_id?: string | null;
  readonly pageNo?: string | null;
  readonly Notes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeReportInitiateReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeReportInitiateReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly school_Department_Id?: string | null;
  readonly From_Date?: string | null;
  readonly To_Date?: string | null;
  readonly Type?: string | null;
  readonly Account?: string | null;
  readonly Hourly_Rate?: string | null;
  readonly Daily_Rate?: string | null;
  readonly Authorizing_Board_Report_Date?: string | null;
  readonly First_Approveal?: string | null;
  readonly Second_Approveal?: string | null;
  readonly Status?: string | null;
  readonly Created_By?: string | null;
  readonly Created_By_Date?: string | null;
  readonly payroll_id?: string | null;
  readonly validator_id?: string | null;
  readonly pageNo?: string | null;
  readonly Notes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeReportInitiateReport = LazyLoading extends LazyLoadingDisabled ? EagerTimeReportInitiateReport : LazyTimeReportInitiateReport

export declare const TimeReportInitiateReport: (new (init: ModelInit<TimeReportInitiateReport>) => TimeReportInitiateReport) & {
  copyOf(source: TimeReportInitiateReport, mutator: (draft: MutableModel<TimeReportInitiateReport>) => MutableModel<TimeReportInitiateReport> | void): TimeReportInitiateReport;
}

type EagerSixthPeriodReportTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SixthPeriodReportTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly approver_level?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySixthPeriodReportTransactionCycle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SixthPeriodReportTransactionCycle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_Id?: string | null;
  readonly from_Employee_Id?: string | null;
  readonly to_Employee_Id?: string | null;
  readonly status?: string | null;
  readonly isApproved?: boolean | null;
  readonly remark?: string | null;
  readonly date?: string | null;
  readonly signature_File_Path?: string | null;
  readonly approver_level?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SixthPeriodReportTransactionCycle = LazyLoading extends LazyLoadingDisabled ? EagerSixthPeriodReportTransactionCycle : LazySixthPeriodReportTransactionCycle

export declare const SixthPeriodReportTransactionCycle: (new (init: ModelInit<SixthPeriodReportTransactionCycle>) => SixthPeriodReportTransactionCycle) & {
  copyOf(source: SixthPeriodReportTransactionCycle, mutator: (draft: MutableModel<SixthPeriodReportTransactionCycle>) => MutableModel<SixthPeriodReportTransactionCycle> | void): SixthPeriodReportTransactionCycle;
}

type EagerSubject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Subject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Subject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Subject = LazyLoading extends LazyLoadingDisabled ? EagerSubject : LazySubject

export declare const Subject: (new (init: ModelInit<Subject>) => Subject) & {
  copyOf(source: Subject, mutator: (draft: MutableModel<Subject>) => MutableModel<Subject> | void): Subject;
}

type EagerSixthPeriodAssignmentInitiateReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SixthPeriodAssignmentInitiateReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignment_title?: string | null;
  readonly employee_id?: string | null;
  readonly assighment_at?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly subject_area?: string | null;
  readonly total_staffing_allocation?: string | null;
  readonly account_charged?: string | null;
  readonly current_fte_utilized?: string | null;
  readonly submited_by?: string | null;
  readonly submited_at?: string | null;
  readonly created_by?: string | null;
  readonly particular_emp_reporting_manager?: string | null;
  readonly budgetClerkId?: string | null;
  readonly budgetManagerId?: string | null;
  readonly hrDirectorI?: string | null;
  readonly payrollId?: string | null;
  readonly editable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySixthPeriodAssignmentInitiateReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SixthPeriodAssignmentInitiateReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly assignment_title?: string | null;
  readonly employee_id?: string | null;
  readonly assighment_at?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly subject_area?: string | null;
  readonly total_staffing_allocation?: string | null;
  readonly account_charged?: string | null;
  readonly current_fte_utilized?: string | null;
  readonly submited_by?: string | null;
  readonly submited_at?: string | null;
  readonly created_by?: string | null;
  readonly particular_emp_reporting_manager?: string | null;
  readonly budgetClerkId?: string | null;
  readonly budgetManagerId?: string | null;
  readonly hrDirectorI?: string | null;
  readonly payrollId?: string | null;
  readonly editable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SixthPeriodAssignmentInitiateReport = LazyLoading extends LazyLoadingDisabled ? EagerSixthPeriodAssignmentInitiateReport : LazySixthPeriodAssignmentInitiateReport

export declare const SixthPeriodAssignmentInitiateReport: (new (init: ModelInit<SixthPeriodAssignmentInitiateReport>) => SixthPeriodAssignmentInitiateReport) & {
  copyOf(source: SixthPeriodAssignmentInitiateReport, mutator: (draft: MutableModel<SixthPeriodAssignmentInitiateReport>) => MutableModel<SixthPeriodAssignmentInitiateReport> | void): SixthPeriodAssignmentInitiateReport;
}

type EagerReportsLog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportsLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly comment?: string | null;
  readonly date_and_time?: string | null;
  readonly user_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReportsLog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ReportsLog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly report_id?: string | null;
  readonly comment?: string | null;
  readonly date_and_time?: string | null;
  readonly user_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ReportsLog = LazyLoading extends LazyLoadingDisabled ? EagerReportsLog : LazyReportsLog

export declare const ReportsLog: (new (init: ModelInit<ReportsLog>) => ReportsLog) & {
  copyOf(source: ReportsLog, mutator: (draft: MutableModel<ReportsLog>) => MutableModel<ReportsLog> | void): ReportsLog;
}

type EagerInitiateClassifiedWeeklyAbsenceReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly initiate_classified_weekly_absence_report_employee_id?: string | null;
  readonly absent_code_id?: string | null;
  readonly substitute_emp_id?: string | null;
  readonly is_full_day?: boolean | null;
  readonly partial_hour?: number | null;
  readonly partial_min?: number | null;
  readonly absent_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInitiateClassifiedWeeklyAbsenceReportEmployeeDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReportEmployeeDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly initiate_classified_weekly_absence_report_employee_id?: string | null;
  readonly absent_code_id?: string | null;
  readonly substitute_emp_id?: string | null;
  readonly is_full_day?: boolean | null;
  readonly partial_hour?: number | null;
  readonly partial_min?: number | null;
  readonly absent_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InitiateClassifiedWeeklyAbsenceReportEmployeeDetails = LazyLoading extends LazyLoadingDisabled ? EagerInitiateClassifiedWeeklyAbsenceReportEmployeeDetails : LazyInitiateClassifiedWeeklyAbsenceReportEmployeeDetails

export declare const InitiateClassifiedWeeklyAbsenceReportEmployeeDetails: (new (init: ModelInit<InitiateClassifiedWeeklyAbsenceReportEmployeeDetails>) => InitiateClassifiedWeeklyAbsenceReportEmployeeDetails) & {
  copyOf(source: InitiateClassifiedWeeklyAbsenceReportEmployeeDetails, mutator: (draft: MutableModel<InitiateClassifiedWeeklyAbsenceReportEmployeeDetails>) => MutableModel<InitiateClassifiedWeeklyAbsenceReportEmployeeDetails> | void): InitiateClassifiedWeeklyAbsenceReportEmployeeDetails;
}

type EagerInitiateClassifiedWeeklyAbsenceReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly initiate_classified_weekly_absence_report_id?: string | null;
  readonly employee_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInitiateClassifiedWeeklyAbsenceReportEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReportEmployee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly initiate_classified_weekly_absence_report_id?: string | null;
  readonly employee_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InitiateClassifiedWeeklyAbsenceReportEmployee = LazyLoading extends LazyLoadingDisabled ? EagerInitiateClassifiedWeeklyAbsenceReportEmployee : LazyInitiateClassifiedWeeklyAbsenceReportEmployee

export declare const InitiateClassifiedWeeklyAbsenceReportEmployee: (new (init: ModelInit<InitiateClassifiedWeeklyAbsenceReportEmployee>) => InitiateClassifiedWeeklyAbsenceReportEmployee) & {
  copyOf(source: InitiateClassifiedWeeklyAbsenceReportEmployee, mutator: (draft: MutableModel<InitiateClassifiedWeeklyAbsenceReportEmployee>) => MutableModel<InitiateClassifiedWeeklyAbsenceReportEmployee> | void): InitiateClassifiedWeeklyAbsenceReportEmployee;
}

type EagerUserGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserGroups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly group_id?: string | null;
  readonly lock_access?: boolean | null;
  readonly request_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserGroups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly group_id?: string | null;
  readonly lock_access?: boolean | null;
  readonly request_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserGroups = LazyLoading extends LazyLoadingDisabled ? EagerUserGroups : LazyUserGroups

export declare const UserGroups: (new (init: ModelInit<UserGroups>) => UserGroups) & {
  copyOf(source: UserGroups, mutator: (draft: MutableModel<UserGroups>) => MutableModel<UserGroups> | void): UserGroups;
}

type EagerEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employee_name?: string | null;
  readonly employee_code?: string | null;
  readonly school_id?: string | null;
  readonly address_1?: string | null;
  readonly address_2?: string | null;
  readonly city?: string | null;
  readonly zip_code?: string | null;
  readonly country?: string | null;
  readonly phone_no?: string | null;
  readonly email?: string | null;
  readonly state?: string | null;
  readonly employeeType?: string | null;
  readonly user_Id?: string | null;
  readonly designation?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly role?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployee = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Employee, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly employee_name?: string | null;
  readonly employee_code?: string | null;
  readonly school_id?: string | null;
  readonly address_1?: string | null;
  readonly address_2?: string | null;
  readonly city?: string | null;
  readonly zip_code?: string | null;
  readonly country?: string | null;
  readonly phone_no?: string | null;
  readonly email?: string | null;
  readonly state?: string | null;
  readonly employeeType?: string | null;
  readonly user_Id?: string | null;
  readonly designation?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly role?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Employee = LazyLoading extends LazyLoadingDisabled ? EagerEmployee : LazyEmployee

export declare const Employee: (new (init: ModelInit<Employee>) => Employee) & {
  copyOf(source: Employee, mutator: (draft: MutableModel<Employee>) => MutableModel<Employee> | void): Employee;
}

type EagerRoleAccess = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleAccess, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly parent_id?: boolean | null;
  readonly sort_order?: string | null;
  readonly is_view_applicable?: boolean | null;
  readonly is_add_applicable?: boolean | null;
  readonly is_edit_applicable?: boolean | null;
  readonly is_delete_applicable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoleAccess = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleAccess, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly parent_id?: boolean | null;
  readonly sort_order?: string | null;
  readonly is_view_applicable?: boolean | null;
  readonly is_add_applicable?: boolean | null;
  readonly is_edit_applicable?: boolean | null;
  readonly is_delete_applicable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoleAccess = LazyLoading extends LazyLoadingDisabled ? EagerRoleAccess : LazyRoleAccess

export declare const RoleAccess: (new (init: ModelInit<RoleAccess>) => RoleAccess) & {
  copyOf(source: RoleAccess, mutator: (draft: MutableModel<RoleAccess>) => MutableModel<RoleAccess> | void): RoleAccess;
}

type EagerGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Groups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly selected_users?: string | null;
  readonly assigned_members_count?: number | null;
  readonly is_access_locked?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Groups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly selected_users?: string | null;
  readonly assigned_members_count?: number | null;
  readonly is_access_locked?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Groups = LazyLoading extends LazyLoadingDisabled ? EagerGroups : LazyGroups

export declare const Groups: (new (init: ModelInit<Groups>) => Groups) & {
  copyOf(source: Groups, mutator: (draft: MutableModel<Groups>) => MutableModel<Groups> | void): Groups;
}

type EagerAbsentType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AbsentType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAbsentType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AbsentType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AbsentType = LazyLoading extends LazyLoadingDisabled ? EagerAbsentType : LazyAbsentType

export declare const AbsentType: (new (init: ModelInit<AbsentType>) => AbsentType) & {
  copyOf(source: AbsentType, mutator: (draft: MutableModel<AbsentType>) => MutableModel<AbsentType> | void): AbsentType;
}

type EagerInitiateClassifiedWeeklyAbsenceReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly status?: InitiateClassifiedWeeklyAbsenceReportStatus | keyof typeof InitiateClassifiedWeeklyAbsenceReportStatus | null;
  readonly school_id?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly status_date_time?: string | null;
  readonly approver_status?: string | null;
  readonly approver_by?: string | null;
  readonly approver_date_time?: string | null;
  readonly payroll_status?: string | null;
  readonly payroll_by?: string | null;
  readonly payroll_date_time?: string | null;
  readonly approver_remark?: string | null;
  readonly payroll_remark?: string | null;
  readonly l1_authority?: string | null;
  readonly l2_authority?: string | null;
  readonly comment?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInitiateClassifiedWeeklyAbsenceReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InitiateClassifiedWeeklyAbsenceReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly status?: InitiateClassifiedWeeklyAbsenceReportStatus | keyof typeof InitiateClassifiedWeeklyAbsenceReportStatus | null;
  readonly school_id?: string | null;
  readonly from_date?: string | null;
  readonly to_date?: string | null;
  readonly status_date_time?: string | null;
  readonly approver_status?: string | null;
  readonly approver_by?: string | null;
  readonly approver_date_time?: string | null;
  readonly payroll_status?: string | null;
  readonly payroll_by?: string | null;
  readonly payroll_date_time?: string | null;
  readonly approver_remark?: string | null;
  readonly payroll_remark?: string | null;
  readonly l1_authority?: string | null;
  readonly l2_authority?: string | null;
  readonly comment?: string | null;
  readonly customUpdatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InitiateClassifiedWeeklyAbsenceReport = LazyLoading extends LazyLoadingDisabled ? EagerInitiateClassifiedWeeklyAbsenceReport : LazyInitiateClassifiedWeeklyAbsenceReport

export declare const InitiateClassifiedWeeklyAbsenceReport: (new (init: ModelInit<InitiateClassifiedWeeklyAbsenceReport>) => InitiateClassifiedWeeklyAbsenceReport) & {
  copyOf(source: InitiateClassifiedWeeklyAbsenceReport, mutator: (draft: MutableModel<InitiateClassifiedWeeklyAbsenceReport>) => MutableModel<InitiateClassifiedWeeklyAbsenceReport> | void): InitiateClassifiedWeeklyAbsenceReport;
}

type EagerAbsentCode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AbsentCode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly code?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAbsentCode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AbsentCode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly code?: string | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AbsentCode = LazyLoading extends LazyLoadingDisabled ? EagerAbsentCode : LazyAbsentCode

export declare const AbsentCode: (new (init: ModelInit<AbsentCode>) => AbsentCode) & {
  copyOf(source: AbsentCode, mutator: (draft: MutableModel<AbsentCode>) => MutableModel<AbsentCode> | void): AbsentCode;
}

type EagerGrades = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Grades, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGrades = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Grades, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Grades = LazyLoading extends LazyLoadingDisabled ? EagerGrades : LazyGrades

export declare const Grades: (new (init: ModelInit<Grades>) => Grades) & {
  copyOf(source: Grades, mutator: (draft: MutableModel<Grades>) => MutableModel<Grades> | void): Grades;
}

type EagerSchools = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Schools, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state_id?: string | null;
  readonly zip_code?: string | null;
  readonly is_active?: boolean | null;
  readonly code?: string | null;
  readonly name?: string | null;
  readonly isValidator?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySchools = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Schools, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state_id?: string | null;
  readonly zip_code?: string | null;
  readonly is_active?: boolean | null;
  readonly code?: string | null;
  readonly name?: string | null;
  readonly isValidator?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Schools = LazyLoading extends LazyLoadingDisabled ? EagerSchools : LazySchools

export declare const Schools: (new (init: ModelInit<Schools>) => Schools) & {
  copyOf(source: Schools, mutator: (draft: MutableModel<Schools>) => MutableModel<Schools> | void): Schools;
}

type EagerOrganizations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organizations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly organization_email?: string | null;
  readonly organization_phone_number?: string | null;
  readonly about_organization?: string | null;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state_id?: string | null;
  readonly zip_code?: string | null;
  readonly domain_name?: string | null;
  readonly is_active?: boolean | null;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganizations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organizations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly organization_email?: string | null;
  readonly organization_phone_number?: string | null;
  readonly about_organization?: string | null;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state_id?: string | null;
  readonly zip_code?: string | null;
  readonly domain_name?: string | null;
  readonly is_active?: boolean | null;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organizations = LazyLoading extends LazyLoadingDisabled ? EagerOrganizations : LazyOrganizations

export declare const Organizations: (new (init: ModelInit<Organizations>) => Organizations) & {
  copyOf(source: Organizations, mutator: (draft: MutableModel<Organizations>) => MutableModel<Organizations> | void): Organizations;
}