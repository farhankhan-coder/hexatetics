export const API_STATUS = {
    SUCCESS: 200,
    FAIL: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    NOT_MODIFIED: 304,
    SERVICE_UNAVAILABLE: 503,
    DUPLICATE_RECORD: 409
};

export const Apps = {
    WeeklyAbsentReportCertificatedAdmin: 'Weekly Absent Report- Certificated-Admin',
    WeeklyAbsentReportClassified: 'Weekly Absent Report- Classified'
};

export const USER_TYPES = {
    Admin: "A",
    Employee: "E",
}

export const CertificatedAdminWeeklyAbsenceReportStatus = {
    APPROVAL_ACCEPTED : "APPROVAL_ACCEPTED",
    APPROVAL_REJECTED : "APPROVAL_REJECTED",
    PAYROLL_ACCEPTED : "PAYROLL_ACCEPTED",
    PAYROLL_REJECTED : "PAYROLL_REJECTED",
    SUBMITTED : "SUBMITTED",
    RESUBMITTED : "RESUBMITTED",
    OPEN : "OPEN",
    CLOSED : "CLOSED",
    PENDING : "PENDING",
    REVIEWED_AND_RESUBMITED :"REVIEWED_AND_RESUBMITED",
    REJECTED : "REJECTED",
    APPROVED : "APPROVED"
}

module.exports = { API_STATUS, USER_TYPES, CertificatedAdminWeeklyAbsenceReportStatus,Apps };
