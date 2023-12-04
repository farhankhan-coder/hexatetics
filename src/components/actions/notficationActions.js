// File to handle Notification actions

import { notificationEnums, Request_Status, sourceTypeEnum } from "../../helper/enum";
// import { specialRoutes } from "../../helper/routeConstants";

import { NotificationReadTable, NotificationTable, Employee, StipendMaster, PSAConsultant, InitiateClassifiedWeeklyAbsenceReport, CertificatedSubInitiateRequest, SubstituteCertificateRequest, CertificatedAdminWeeklyAbsenceReport, TimeReportInitiateReport } from "../../models";

import { create_notification } from "./notificationsGraphQLActions";
// import { GetValueFromArray, graphQLGetAllData, graphQLFindRecordById } from '../../helper/commonfunctions';
// import awsmobile from "../../aws-exports";
import moment from 'moment';
// import handleDateSelect from '../../helper/convertDateIntoPSTFormat';

const SESConfig = {
    accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
    region: process.env.REACT_APP_AWS_Region
};
const fromEmail = process.env.REACT_APP_From_Email;

const PropTypes = require('prop-types');

const createNotification = async (userId, type, sourceId, sourceType, subject, message, appId) => {

    try {



    } catch (e) {
    }
}

const removeBrTags = (text) => {
    return text.replace(/<br\s*\/?>/gi, '');
}

const createEmailNotifications = async (user_email, user_id, type, sourceId, sourceType, subject, message, appId, ccEmail = []) => {
    // below console is for checking mail of receiver
    let emailAddresses = [];
    if (ccEmail.length > 0) {
        emailAddresses = {
            ToAddresses: [user_email],
            CcAddresses: ccEmail
        }
    } else {
        emailAddresses = {
            ToAddresses: [user_email]
        }
    }

    const params = {
        Source: fromEmail,
        Destination: emailAddresses,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: message
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        }
    };

    try {
        const mail = await new AWS.SES(SESConfig).sendEmail(params).promise();
    } catch (e) {
    }

    if (user_id) {
        await create_notification(user_id, type, sourceId, sourceType, subject, removeBrTags(message), appId);
    }
}


const handleNotificationsOnStatusChange = async (status, reportDetails, appId) => {
    const {
        id,
        title,
        initiated_date: initiated_date,
        previous_status,
        new_status,
        approverDetails,
        initiatorDetails,
        targetUserDetails,
        nextApproverDetails,
        ccUserDetails
    } = reportDetails;
    const { approver_id, approver_name, approver_email, approver_user_code } = approverDetails;
    const { initiator_id, initiator_name, initiator_email, initiator_user_code } = initiatorDetails;
    const { target_user_id, target_user_name, target_user_email, target_user_code } = targetUserDetails;
    const { next_approver_id, next_approver_name, next_approver_email, next_approver_code } = nextApproverDetails;

    let reportUrl = window.location.origin + `?${specialRoutes.sixth_period_report_approval_request}=${id}`;
    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'Pending':
                notificationMessageList = [
                    {
                        to: next_approver_id,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ]
                break;
            case 'Open':
                notificationMessageList = [
                    {
                        to: next_approver_id,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    },
                    {
                        to: initiator_id,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${initiator_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ]
                break;
            case 'Approved':
                notificationMessageList = [
                    {
                        to: initiator_id,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                        notificationMessage: `Hello ${initiator_name},<br>The report titled ${title} initiated by you on ${initiated_date} is Approved by ${approver_name}`
                    },
                    {
                        to: next_approver_id,
                        type: 'APP',
                        subject: 'Pending Approval',
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: initiator_email,
                        type: 'EMAIL',
                        user_id: initiator_id,
                        subject: status,
                        emailSubject: 'Report Approved',
                        emailMessage: `Hello ${initiator_name},<br> The form titled "${title}" initiated by you on ${initiated_date} is approved by ${approver_name}.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id,
                        subject: 'Pending Approval',
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ];
                break;
            case 'Rejected':
                notificationMessageList = [
                    {
                        to: initiator_id,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                        notificationMessage: `Hello ${initiator_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is rejected by ${approver_name} and moved to status pending approval`
                    },
                    (initiator_id !== next_approver_id ?
                        {
                            to: next_approver_id,
                            type: 'APP',
                            subject: 'Pending Approval',
                            notificationSubject: 'Report Pending Approval',
                            notificationMessage: `Hello ${next_approver_name},  The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id,
                        type: 'EMAIL',
                        subject: status,
                        emailSubject: 'Report Rejected',
                        emailMessage: `Hello ${initiator_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is rejected by ${approver_name} and moved to status pending approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    (initiator_id !== next_approver_id ?
                        {
                            to: next_approver_email,
                            user_id: approver_id,
                            type: 'EMAIL',
                            subject: 'Pending Approval',
                            emailSubject: 'Report Pending Approval',
                            emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null)
                ]
                break;
            case 'Pending Acknowledged':
                notificationMessageList = [
                    {
                        to: initiator_id,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${initiator_name}, The 6th Period Teaching Assignment form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for acknowledgement`
                    },
                    {
                        to: next_approver_id,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${next_approver_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                    }
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${initiator_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        user_id: next_approver_id,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ];
                break;
            case 'Acknowledge':
                notificationMessageList = [
                    {
                        to: initiator_id,
                        type: 'APP',
                        subject: 'Acknowledge',
                        notificationSubject: 'Report Acknowledged',
                        notificationMessage: `Hello ${initiator_name}, The form titled "${title}" initiated by you on ${initiated_date} is acknowledged by ${approver_name}`
                    },
                    (next_approver_id ?
                        {
                            to: next_approver_id,
                            type: 'APP',
                            subject: 'Pending Acknowledgement',
                            notificationSubject: 'Report Pending Acknowledgement',
                            notificationMessage: `Hello ${next_approver_name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                        } : null),
                    (ccUserDetails ?
                        {
                            to: ccUserDetails.userId,
                            type: 'APP',
                            subject: 'Pending Acknowledgement',
                            notificationSubject: 'Report Pending Acknowledgement',
                            notificationMessage: `Hello ${ccUserDetails.name}, The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id,
                        type: 'EMAIL',
                        subject: 'Acknowledge',
                        emailSubject: 'Report Acknowledged',
                        emailMessage: `Hello ${initiator_name},<br> The form titled "${title}" initiated by you on ${initiated_date} is acknowledged by ${approver_name}.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    (next_approver_id ?
                        {
                            to: next_approver_email,
                            user_id: next_approver_id,
                            type: 'EMAIL',
                            subject: 'Pending Acknowledgement',
                            emailSubject: 'Report Pending Acknowledgement',
                            emailMessage: `Hello ${next_approver_name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null),
                    (ccUserDetails ?
                        {
                            to: ccUserDetails.email,
                            user_id: ccUserDetails.userId,
                            type: 'EMAIL',
                            subject: 'Pending Acknowledgement',
                            emailSubject: 'Report Pending Acknowledgement',
                            emailMessage: `Hello ${ccUserDetails.name},<br> The 6th Period Teaching Assignment form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null)
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'REPORT_TRANSACTION', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }


        notificationMessageList?.map((msg) => {
            if (msg) {
                create_notification(msg.to, msg.type, id, 'REPORT_TRANSACTION', msg.subject, msg.notificationMessage, appId);
            }

        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'REPORT_TRANSACTION', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

const handleNotificationsOnStatusChangeforPersonnelAction = async (status, reportDetails, appId) => {
    let reportDetailsdata = reportDetails;
    // const response = await reportDetails?.then((e) => { 
    //     reportDetailsdata = e
    // }) 
    const { id, title, initiated_date: initiated_date, previous_status, new_status, approverDetails, initiatorDetails, targetUserDetails, nextApproverDetails } = reportDetailsdata;
    const { approver_name, approver_id, approver_email, approver_user_code } = approverDetails;
    const { initiator_id, initiator_name, initiator_email, initiator_user_code } = initiatorDetails;
    const { target_user_id, target_user_name, target_user_email, target_user_code } = targetUserDetails;
    const { next_approver_id, next_approver_name, next_approver_email, next_approver_code } = nextApproverDetails;

    let reportUrl = window.location.origin + `?${specialRoutes.personal_action_report_approval_request}=${id}`;

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'Pending':
                notificationMessageList = [
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br>The form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.`
                        // notificationMessage: `Hello ${next_approver_name}, The Personnel Action Form form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br>The form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    }
                ]
                break;
            case 'Open':
                notificationMessageList = [
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br>The form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.`
                        // notificationMessage: `Hello ${next_approver_name}, The Personnel Action Form form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br>The form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Approved',
                        notificationMessage: `Hello ${initiator_name},<br>The report titled "${title}" initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is Approved by ${approver_name}`
                    }
                ];
                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: status,
                        emailSubject: 'Approved',
                        // emailMessage: `Hello ${initiator_name}, The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} initiated by you is Approved by ${approver_name} :  <br /> ${reportUrl}`
                        emailMessage: `Hello ${initiator_name},<br>The report titled "${title}" initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is Approved by ${approver_name}:  <br><br>Please Review By Clicking below Link:   <br /> ${reportUrl}`
                    }
                ]
                break;
            case 'Approved':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                        notificationMessage: `Hello ${initiator_name},<br>The report titled "${title}" initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is Approved by ${approver_name}`

                    },
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: 'Pending Approval',
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name}, The Personnel Action Form form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: initiator_email,
                        type: 'EMAIL',
                        user_id: initiator_id?.Value,
                        subject: status,
                        emailSubject: 'Report Approved',
                        emailMessage: `Hello ${initiator_name},<br>The report titled "${title}" initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is Approved by ${approver_name}.<br>Please Review By Clicking below Link: <br /> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: 'Pending Approval',
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`

                    }
                ];
                break;
            case 'REMINDER':
                notificationMessageList = [
                    // {
                    //     to: initiator_id?.Value,
                    //     type: 'APP',
                    //     subject: status,
                    //     notificationSubject: 'REMINDER',
                    //     notificationMessage: `Hello ${initiator_name}, The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is approved by ${approver_name} and moved to status pending approval`
                    // },
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: 'Reminder - Pending Approval',
                        notificationSubject: 'Reminder - Pending Approval',
                        notificationMessage: `The form titled "${title}" initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    // {
                    //     to: initiator_email,
                    //     type: 'EMAIL',
                    //     user_id: initiator_id?.Value,
                    //     subject: 'REMINDER',
                    //     emailSubject: 'REMINDER',
                    //     emailMessage: `Hello ${initiator_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is approved by ${approver_name} and moved to status pending approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    // },
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: 'Reminder: Personnel Action Form Pending Approval',
                        emailSubject: 'Reminder: Personnel Action Form Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    }
                ];
                break;
            case 'Rejected':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                        notificationMessage: `Hello ${initiator_name},<br>The form titled "${title}" initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is rejected by ${approver_name}.`
                    },
                    (initiator_id?.Value !== next_approver_id?.Value ?
                        {
                            to: next_approver_id?.Value,
                            type: 'APP',
                            subject: 'Pending Approval',
                            notificationSubject: 'Report Pending Approval',
                            notificationMessage: `Hello ${next_approver_name},  The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: status,
                        emailSubject: 'Report Rejected',
                        emailMessage: `Hello ${initiator_name},<br> The form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is rejected by ${approver_name} and moved to status pending approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    },
                    (initiator_id?.Value !== next_approver_id?.Value ?
                        {
                            to: next_approver_email,
                            user_id: approver_id?.Value,
                            type: 'EMAIL',
                            subject: 'Pending Approval',
                            emailSubject: 'Report Pending Approval',
                            emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                        } : null)
                ]
                break;
            case 'Pending Acknowledged':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${initiator_name}, The Personnel Action Form form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for acknowledgement`
                    },
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${next_approver_name}, The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                    }
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${initiator_name},<br> The Personnel Action Form form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for acknowledgement.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        user_id: next_approver_id?.Value,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link :  <br /> ${reportUrl}`
                    }
                ];
                break;
            case 'Acknowledge':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: 'Acknowledge',
                        notificationSubject: 'Report Acknowledged',
                        notificationMessage: `Hello ${initiator_name},<br> The Personnel Action Form form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for your acknowledgement`
                    },
                    (next_approver_id?.Value ?
                        {
                            to: next_approver_id?.Value,
                            type: 'APP',
                            subject: 'Pending Acknowledgement',
                            notificationSubject: 'Report Pending Acknowledgement',
                            notificationMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: 'Acknowledge',
                        emailSubject: 'Report Acknowledged',
                        emailMessage: `Hello ${initiator_name},<br> The Personnel Action Form form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for your acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    (next_approver_id?.Value ?
                        {
                            to: next_approver_email,
                            user_id: next_approver_id?.Value,
                            type: 'EMAIL',
                            subject: 'Pending Acknowledgement',
                            emailSubject: 'Report Pending Acknowledgement',
                            emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null)
                ]
                break;
                case 'Closed':
                    notificationMessageList = [
                        {
                            to: initiator_id?.Value,
                            type: 'APP',
                            subject: 'Acknowledge',
                            notificationSubject: 'Report Acknowledged',
                            notificationMessage: `Hello ${initiator_name},<br> The form titled ${title} initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is acknowledged by ${approver_name}.`
                        },
                        // (next_approver_id?.Value ?
                        //     {
                        //         to: next_approver_id?.Value,
                        //         type: 'APP',
                        //         subject: 'Pending Acknowledgement',
                        //         notificationSubject: 'Report Pending Acknowledgement',
                        //         notificationMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${moment(initiated_date).format("MM/DD/YYYY")} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                        //     } : null)
                    ];
                    emailMessageList = [
                        {
                            to: initiator_email,
                            user_id: initiator_id?.Value,
                            type: 'EMAIL',
                            subject: 'Acknowledge',
                            emailSubject: 'Report Acknowledged',
                            emailMessage: `Hello ${initiator_name},<br> The form titled ${title} initiated by you on ${moment(initiated_date).format("MM/DD/YYYY")} is acknowledged by ${approver_name}<br><br>Please Review By Clicking below Link: <br> ${reportUrl}`
                        },
                        // (next_approver_id?.Value ?
                        //     {
                        //         to: next_approver_email,
                        //         user_id: next_approver_id?.Value,
                        //         type: 'EMAIL',
                        //         subject: 'Pending Acknowledgement',
                        //         emailSubject: 'Report Pending Acknowledgement',
                        //         emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        //     } : null)
                    ]
                    break;
                
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'REPORT_TRANSACTION', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }


        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'REPORT_TRANSACTION', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'REPORT_TRANSACTION', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};
const handleNotificationsOnStatusChangeforWAP_Classified = async (status, reportDetails, appId) => {
    let reportDetailsdata = reportDetails;
    // const response = await reportDetails?.then((e) => { 
    //     reportDetailsdata = e
    // }) 
    const { id, title, initiated_date: initiated_date, previous_status, new_status, approverDetails, initiatorDetails, targetUserDetails, nextApproverDetails } = reportDetailsdata;
    const { approver_name, approver_id, approver_email, approver_user_code } = approverDetails;
    const { initiator_id, initiator_name, initiator_email, initiator_user_code } = initiatorDetails;
    const { target_user_id, target_user_name, target_user_email, target_user_code } = targetUserDetails;
    const { next_approver_id, next_approver_name, next_approver_email, next_approver_code } = nextApproverDetails;

    let reportUrl = window.location.origin + `?${specialRoutes.personal_action_report_approval_request}=${id}`;

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'Pending':
                notificationMessageList = [
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ]
                break;
            case 'Open':
                notificationMessageList = [
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: status,
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ]
                break;
            case 'Approved':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                        notificationMessage: `Hello ${initiator_name},<br>The form titled "${title}" initiated by you on ${initiated_date} is approved by ${approver_name}.`
                    },
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: 'Pending Approval',
                        notificationSubject: 'Report Pending Approval',
                        notificationMessage: `Hello ${next_approver_name},<br>The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                    }
                ];

                emailMessageList = [
                    {
                        to: initiator_email,
                        type: 'EMAIL',
                        user_id: initiator_id?.Value,
                        subject: status,
                        emailSubject: 'Report Approved',
                        emailMessage: `Hello ${initiator_name},<br> The form titled "${title}" initiated by you on ${initiated_date} is approved by ${approver_name}.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        type: 'EMAIL',
                        user_id: next_approver_id?.Value,
                        subject: 'Pending Approval',
                        emailSubject: 'Report Pending Approval',
                        emailMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ];
                break;
            case 'Rejected':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: status,
                        notificationSubject: 'Report Approved',
                         
                        notificationMessage: `Hello ${initiator_name},<br>The Personnel Action Form form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is rejected by ${approver_name} and moved to status pending approval`
                    },
                    (initiator_id?.Value !== next_approver_id?.Value ?
                        {
                            to: next_approver_id?.Value,
                            type: 'APP',
                            subject: 'Pending Approval',
                            notificationSubject: 'Report Pending Approval',
                            notificationMessage: `Hello ${next_approver_name},  The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: status,
                        emailSubject: 'Report Rejected',
                        emailMessage: `Hello ${initiator_name},<br> The Personnel Action Form form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is rejected by ${approver_name} and moved to status pending approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    (initiator_id?.Value !== next_approver_id?.Value ?
                        {
                            to: next_approver_email,
                            user_id: approver_id?.Value,
                            type: 'EMAIL',
                            subject: 'Pending Approval',
                            emailSubject: 'Report Pending Approval',
                            emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for approval.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null)
                ]
                break;
            case 'Pending Acknowledged':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${initiator_name},<br>The form titled "${title}" initiated by you on ${initiated_date} is pending for acknowledgement`
                    },
                    {
                        to: next_approver_id?.Value,
                        type: 'APP',
                        subject: 'Pending Acknowledgement',
                        notificationSubject: 'Report Pending Acknowledgement',
                        notificationMessage: `Hello ${next_approver_name}, The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                    }
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${initiator_name},<br> The form titled "${title}" initiated by you on ${initiated_date} is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    },
                    {
                        to: next_approver_email,
                        user_id: next_approver_id?.Value,
                        type: 'EMAIL',
                        subject: 'Pending Acknowledgement',
                        emailSubject: 'Report Pending Acknowledgement',
                        emailMessage: `Hello ${next_approver_name},<br> The form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                    }
                ];
                break;
            case 'Acknowledge':
                notificationMessageList = [
                    {
                        to: initiator_id?.Value,
                        type: 'APP',
                        subject: 'Acknowledge',
                        notificationSubject: 'Report Acknowledged',
                        notificationMessage: `The Personnel Action Form form titled ${title} initiated by "${initiator_name} (${initiator_user_code})" for Teacher "${target_user_name} (${target_user_code})" is pending for acknowledgement`
                    },
                    (next_approver_id?.Value ?
                        {
                            to: next_approver_id?.Value,
                            type: 'APP',
                            subject: 'Pending Acknowledgement',
                            notificationSubject: 'Report Pending Acknowledgement',
                            notificationMessage: `Hello ${next_approver_name}, The Personnel Action Form form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement`
                        } : null)
                ];
                emailMessageList = [
                    {
                        to: initiator_email,
                        user_id: initiator_id?.Value,
                        type: 'EMAIL',
                        subject: 'Acknowledge',
                        emailSubject: 'Report Acknowledged',
                        emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled ${title} initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`                    },
                    (next_approver_id?.Value ?
                        {
                            to: next_approver_email,
                            user_id: next_approver_id?.Value,
                            type: 'EMAIL',
                            subject: 'Pending Acknowledgement',
                            emailSubject: 'Report Pending Acknowledgement',
                            emailMessage: `Hello ${next_approver_name},<br> The Personnel Action Form form titled "${title}" initiated on ${initiated_date} for Teacher ${target_user_name} (${target_user_code}) is pending for acknowledgement.<br> Please Review By Clicking below Link.<br> ${reportUrl}`
                        } : null)
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'REPORT_TRANSACTION', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }


        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'REPORT_TRANSACTION', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'REPORT_TRANSACTION', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

const handleNotificationsOnStatusChangeforStipendForm = async (status, id, appId, userId, loggedUserId, ccEmail = '', reason = '') => {
    const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    // const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])

    const currentDateTime = moment();

    const stipendDetails = await DataStore.query(StipendMaster, id);
    // const stipendDetails = await graphQLFindRecordById("getStipendMaster", id)


    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let stipendTitle = '-';
    let toEmployeeName = '-';
    let toEmployeeCode = '-';

    if (stipendDetails) {

        const toEmployeeDetails = await DataStore.query(Employee, stipendDetails.employeeId);
        // const toEmployeeDetails = await graphQLFindRecordById("getEmployee", stipendDetails.employeeId)

        toEmployeeName = toEmployeeDetails ? toEmployeeDetails.employee_name : '-';
        toEmployeeCode = toEmployeeDetails ? toEmployeeDetails.employee_code : '-';
        stipendTitle = stipendDetails.title;
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();
    let defaultLoginURL = window.location.origin + `${specialRoutes.stipend_request}/${id}`;
    let stipendURL = window.location.origin + `${specialRoutes.stipend_approver_request}`;
    let stipendPayrollURL = window.location.origin + `${specialRoutes.stipend_payroll_request}`;
    let initiatedDate = stipendDetails.createdAt ? moment(stipendDetails.createdAt).format('MM/DD/YYYY') : moment(currentDateTime).toISOString();

    //get Intiater Management
    let intiaterManagement;
    if (loggedUserId) {
        try {
            intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
        } catch (e) {
        }
        // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
        // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
        // var fullName = lastName + " " + firstName
        // var fullNameApprovedBy = lastName + "," + firstName
        var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
        var fullNameApprovedBy = fullName
    }

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'PENDING_FOR_APPROVAL_EMPLOYEE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated by ${fullName} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Stipend Form Assignment!',
                        emailSubject: 'Stipend Form Assignment!',
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated by ${fullName} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval. <br><br>Please review the progress of the request by clicking below Link: <br/> ${defaultLoginURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVAL_PRINCIPAL':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link: <br/>  ${stipendURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVAL_HR_TECHNICIAN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link: <br/>  ${stipendPayrollURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_ACKNOWLEDGMENT_HR_TECHNICIAN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link:<br/>  ${stipendPayrollURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVAL_ASSIGNMENT_COMPLETION_HR_TECHNICIAN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        cc: ccEmail,
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link: <br/>  ${stipendPayrollURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVAL_EXCECUTIVE_MANAGEMENT':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link: <br/>  ${stipendURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVAL_FINAL_APPROVAL':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is pending for your approval.<br><br>Please review the progress of the request by clicking below Link: <br/>  ${stipendURL}`
                    }
                ]
                break;
            case 'ACKNOWLEDGMENT_HR_TECHNICIAN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled "${stipendTitle}" initiated by you on ${initiatedDate} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        cc: ccEmail,
                        subject: "Stipend Form Assignment!",
                        emailSubject: "Stipend Form Assignment!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled "${stipendTitle}" initiated by you on ${initiatedDate} is acknowledged by ${fullNameApprovedBy}.<br><br>Please Review By Clicking below Link :<br/> ${stipendPayrollURL}`
                    }
                ]
                break;
            case 'COMPLETED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Assignment!",
                        notificationSubject: "Stipend Form Assignment- Completed!",
                        notificationMessage: `
                        Hello ${employeeName},<br>The Stipend Form titled "${stipendTitle}" initiated by you on ${initiatedDate} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Stipend Form Assignment!',
                        emailSubject: 'Stipend Form Assignment!',
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled "${stipendTitle}" initiated by you on ${initiatedDate} is acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link:  <br/> ${defaultLoginURL}`
                    }
                ]
                break;
            case 'Rejected':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Rejected!",
                        notificationSubject: "Stipend Form Rejected!",
                        notificationMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is rejected by ${fullNameApprovedBy}.<ul><li>Rejected Reason: ${reason}</li></ul>`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        cc: ccEmail,
                        user_id: employeeUserId,
                        subject: "Stipend Form Rejected!",
                        emailSubject: "Stipend Form Rejected!",
                        emailMessage: `Hello ${employeeName},<br>The Stipend Form titled ${stipendTitle} initiated on ${initiatedDate} for Employee ${toEmployeeName} (${toEmployeeCode}) is rejected by ${fullNameApprovedBy}.<ul><li>Rejected Reason: ${reason}</li></ul>.<br><br>Please review the progress of the request by clicking below Link: <br/> ${defaultLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Stipend Form Approved!",
                        notificationSubject: "Stipend Form Approved!",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${stipendTitle}" initiated by you on ${initiatedDate} is Approved by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        cc: ccEmail,
                        user_id: employeeUserId,
                        subject: "Stipend Form Approved!",
                        emailSubject: "Stipend Form Approved!",
                        emailMessage: `Hello ${employeeName},<br>The report titled "${stipendTitle}" initiated by you on ${initiatedDate} is Approved by ${fullNameApprovedBy}.<br><br>Please Review By Clicking below Link: <br/> ${defaultLoginURL}`

                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'REPORT_TRANSACTION', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'STIPEND_FORM', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'STIPEND_FORM', email.emailSubject, email.emailMessage, appId, email.cc ? email.cc : []);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

const handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified = async (status, id, appId, userId, loggedUserId, reason = '') => {

    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));

    var employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])
    // const warClassifiedDetails = await DataStore.query(InitiateClassifiedWeeklyAbsenceReport, id);

    var warClassifiedDetails = await graphQLFindRecordById("getInitiateClassifiedWeeklyAbsenceReport", id)

    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';
    let submittedOn = '-';

    if (warClassifiedDetails) {
        notificationTitle = "Weekly Absence Report - Classified " + moment(warClassifiedDetails.from_date).format("MM/DD/YYYY") + "-" + moment(warClassifiedDetails.to_date).format("MM/DD/YYYY");
        submittedOn = moment(warClassifiedDetails.status_date_time).format("MM/DD/YYYY");
    }


    const cognito = new AWS.CognitoIdentityServiceProvider();

    let defaultApproverLoginURL = window.location.origin + `${specialRoutes.WAR_approver_request}`;
    let defaultPayrollLoginURL = window.location.origin + `${specialRoutes.WAR_payroll_request}`;
    let defaultLoginURL = window.location.origin + `${specialRoutes.WAR_Classified_Initiate_request}`;

    //get Intiater Management
    let intiaterManagement;
    if (loggedUserId) {
        try {
            intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
        } catch (e) {
        }
        // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
        // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
        // var fullName = lastName + " " + firstName
        // var fullNameApprovedBy = lastName + "," + firstName
        var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
        var fullNameApprovedBy = fullName
    }

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'PENDING_FOR_APPROVAL':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly Absence Report Classified",
                        notificationSubject: "Weekly Absence Report Classified",
                        notificationMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly Absence Report Classified',
                        emailSubject: 'Weekly Absence Report Classified',
                        emailMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_PAYROLL':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly Absence Report Classified Assignment!",
                        notificationSubject: "Weekly Absence Report Classified Assignment!",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly Absence Report Classified Assignment!',
                        emailSubject: 'Weekly Absence Report Classified Assignment!',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultPayrollLoginURL}`
                    }
                ]
                break;
            case 'APPROVED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly Absence Report Classified",
                        notificationSubject: "Weekly Absence Report Classified",
                        notificationMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by ${fullName} is pending for acknowledge.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly Absence Report Classified',
                        emailSubject: 'Weekly Absence Report Classified',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullName}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly Absence Report Classified",
                        notificationSubject: "Weekly Absence Report Classified",
                        notificationMessage: `Hello ${employeeName},
                        <br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.`

                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly Absence Report Classified',
                        emailSubject: 'Weekly Absence Report Classified',
                        emailMessage: `Hello ${employeeName},
                        <br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultLoginURL}`
                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly Absence Report Classified",
                        notificationSubject: "Weekly Absence Report Classified",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} rejected by ${fullName}.<ul><li>Rejected Reason: ${reason}</li></ul>`                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly Absence Report Classified',
                        emailSubject: 'Weekly Absence Report Classified',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} rejected by ${fullName}.<ul><li>Rejected Reason: ${reason}</li></ul>`
                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'WEEKLY_ABSENCE_REPORT_CASSIFIED', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'WEEKLY_ABSENCE_REPORT_CASSIFIED', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'WEEKLY_ABSENCE_REPORT_CASSIFIED', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

const handleNotificationsOnStatusChangeforSubstituteRequestCertificated = async (status, id, appId, userId, loggedUserId, rejectReson = "") => {
    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])

    // const certificateSubRequestDetails = await DataStore.query(CertificatedSubInitiateRequest, id);
    const certificateSubRequestDetails = await graphQLFindRecordById("getCertificatedSubInitiateRequest", id)


    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';

    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';
    let submittedOn = '-';

    if (certificateSubRequestDetails) {
        // notificationTitle = "Weekly Absence Report - Classified " + moment(substituteRequestCertificateDetails.from_date).format("MM/DD/YYYY") + " " + moment(substituteRequestCertificateDetails.to_date).format("MM/DD/YYYY");
        notificationTitle = `Substitute Request Certificated - ${certificateSubRequestDetails.assighmentTitle}`;
        submittedOn = moment(certificateSubRequestDetails.submittedOn).format("MM/DD/YYYY");
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();
    let defaultApproverLoginURL = window.location.origin + `${specialRoutes.substituteRequestCertificated_request}`;

    //get Intiater Management
    let intiaterManagement;
    if (loggedUserId) {
        try {
            intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
        } catch (e) {
        }
        // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
        // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
        // var fullName = lastName + " " + firstName
        // var fullNameApprovedBy = lastName + "," + firstName
        var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
        var fullNameApprovedBy = fullName
    }

    
    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'OPEN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request",
                        notificationSubject: "Substitute request",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request',
                        emailSubject: 'Substitute request',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'PAYROLL_ACK':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request",
                        notificationSubject: "Substitute request",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request',
                        emailSubject: 'Substitute request',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'REVIEWED&RESUBMITTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request reviewed and resubmitted",
                        notificationSubject: "Substitute request reviewed and resubmitted",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request reviewed and resubmitted',
                        emailSubject: 'Substitute request reviewed and resubmitted',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request approved",
                        notificationSubject: "Substitute request approved",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request approved',
                        emailSubject: 'Substitute request approved',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request approved",
                        notificationSubject: "Substitute request approved",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request approved',
                        emailSubject: 'Substitute request approved',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.<br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'ACKNOWLEDGE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request closed",
                        notificationSubject: "Substitute request closed",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}.`                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request closed',
                        emailSubject: 'Substitute request closed',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute request Rejected",
                        notificationSubject: "Substitute request Rejected",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} is rejected by ${fullNameApprovedBy}. Reason is ${rejectReson}.`                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute request Rejected',
                        emailSubject: 'Substitute request Rejected',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} is rejected by ${fullName}. Reason is ${rejectReson}. <br><br>Please Review By Clicking below Link: <br/> ${defaultApproverLoginURL}`                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'SUBSTITUTE_REQUEST_CERTIFICATED', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {
            if (msg) {
                create_notification(msg.to, msg.type, id, 'SUBSTITUTE_REQUEST_CERTIFICATED', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'SUBSTITUTE_REQUEST_CERTIFICATED', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

//Time Report Notification start
const handleNotificationsOnStatusChangeforTimeReport = async (status, id, appId, userId, loggedUserId, rejectReson = "") => {
    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])
    // const certificateSubRequestDetails = await DataStore.query(TimeReportInitiateReport, id);
    const certificateSubRequestDetails = await graphQLFindRecordById("getTimeReportInitiateReport", id)



    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';
    let submittedOn = '-';

    if (certificateSubRequestDetails) {
        // notificationTitle = "Weekly Absence Report - Classified " + moment(substituteRequestCertificateDetails.from_date).format("MM/DD/YYYY") + " " + moment(substituteRequestCertificateDetails.to_date).format("MM/DD/YYYY");
        notificationTitle = `TIME_REPORT - ${moment(certificateSubRequestDetails.From_Date).format("MM/DD/YYYY") + ' to ' + moment(certificateSubRequestDetails.To_Date).format("MM/DD/YYYY")}`;
        submittedOn = moment(certificateSubRequestDetails.Created_By_Date).format("MM/DD/YYYY");
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();
    let defaultApproverLoginURL = window.location.origin + `${specialRoutes.timeReport_request}`;

   //get Intiater Management
   let intiaterManagement;
   if (loggedUserId) {
       try {
           intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
       } catch (e) {
       }
       // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
       // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
       // var fullName = lastName + " " + firstName
       // var fullNameApprovedBy = lastName + "," + firstName
       var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
       var fullNameApprovedBy = fullName
   }

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'OPEN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT",
                        notificationSubject: "TIME_REPORT",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT',
                        emailSubject: 'TIME_REPORT',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'PAYROLL_ACK':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT",
                        notificationSubject: "TIME_REPORT",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT',
                        emailSubject: 'TIME_REPORT',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'REVIEWED&RESUBMITTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT reviewed and resubmitted",
                        notificationSubject: "TIME_REPORT reviewed and resubmitted",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT reviewed and resubmitted',
                        emailSubject: 'TIME_REPORT reviewed and resubmitted',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT approved",
                        notificationSubject: "TIME_REPORT approved",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT approved',
                        emailSubject: 'TIME_REPORT approved',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'ACKNOWLEDGE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT closed",
                        notificationSubject: "TIME_REPORT closed",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT closed',
                        emailSubject: 'TIME_REPORT closed',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT",
                        notificationSubject: "TIME_REPORT",
                        notificationMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT',
                        emailSubject: 'TIME_REPORT',
                        emailMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/> ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "TIME_REPORT Rejected",
                        notificationSubject: "TIME_REPORT Rejected",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} is rejected by ${fullName}. Reason is ${rejectReson}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'TIME_REPORT Rejected',
                        emailSubject: 'TIME_REPORT Rejected',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} is rejected by ${fullName}. Reason is ${rejectReson}. <br><br>Please Review By Clicking below Link: <br/> ${defaultApproverLoginURL}`
                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'TIME_REPORT', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'TIME_REPORT', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'TIME_REPORT', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error("Error in handleNotificationsOnStatusChangeforTimeReport", error);
        return 'Error';
    }
};
//time report notification end

const handleNotificationsOnStatusChangeforClassifiedSubRequest = async (status, id, appId, userId, loggedUserId, reason = '') => {
    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])
    // const substituteCertificateRequestDetails = await DataStore.query(SubstituteCertificateRequest, id);
    const substituteCertificateRequestDetails = await graphQLFindRecordById("getSubstituteCertificateRequest", id)



    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';
    let submittedOn = '-';

    if (substituteCertificateRequestDetails) {
        notificationTitle = substituteCertificateRequestDetails.assignmentTitle ? substituteCertificateRequestDetails.assignmentTitle : 'Substitute Report Classified Assignment!';
        submittedOn = moment(substituteCertificateRequestDetails.createdAt).format("MM/DD/YYYY");
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();

    let defaultLoginURL = window.location.origin + `${specialRoutes.substituteRequestClassified_request}`;

    //get Intiater Management
    let intiaterManagement;
    if (loggedUserId) {
        try {
            intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
        } catch (e) {
        }
        // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
        // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
        // var fullName = lastName + " " + firstName
        // var fullNameApprovedBy = lastName + "," + firstName
        var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
        var fullNameApprovedBy = fullName
    }

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'OPEN':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified",
                        notificationSubject: "Substitute Report Classified",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified',
                        emailSubject: 'Substitute Report Classified',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultLoginURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_APPROVE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified pending",
                        notificationSubject: "Substitute Report Classified pending",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified pending',
                        emailSubject: 'Substitute Report Classified pending',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/> ${defaultLoginURL}`
                    }
                ]
                break;
            case 'PENDING_FOR_ACK':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified pending",
                        notificationSubject: "Substitute Report Classified pending",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified pending',
                        emailSubject: 'Substitute Report Classified pending',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by ${fullName} is pending for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/> ${defaultLoginURL}`
                    }
                ]
                break;
            case 'ACKNOWLEDGE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified Acknowledged",
                        notificationSubject: "Substitute Report Classified Acknowledged",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified Acknowledged',
                        emailSubject: 'Substitute Report Classified Acknowledged',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullName}. <br><br>Please Review By Clicking below Link <br/>:  ${defaultLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified",
                        notificationSubject: "Substitute Report Classified",
                        notificationMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified',
                        emailSubject: 'Substitute Report Classified',
                        emailMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.<br><br>Please Review By Clicking below Link <br/>: ${defaultLoginURL}`
                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Substitute Report Classified Rejected",
                        notificationSubject: "Substitute Report Classified Rejected",
                        notificationMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} rejected by ${fullName}.<ul><li>Rejected Reason: ${reason}</li></ul>`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Substitute Report Classified Rejected',
                        emailSubject: 'Substitute Report Classified Rejected',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} rejected by ${fullName}.<ul><li>Rejected Reason: ${reason}</li></ul> 
                        Please Review By Clicking below Link <br/>:  ${defaultLoginURL}`
                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'CLASSIFIED_SUB_REQUEST', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'CLASSIFIED_SUB_REQUEST', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'CLASSIFIED_SUB_REQUEST', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

const handleNotificationsOnStatusChangeforWeeklyAbsenceReportAdmin = async (status, id, appId, userId, loggedUserId, userType = '', reason = '') => {
    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])
    // const weeklyAbsenceReportAdminDetails = await DataStore.query(CertificatedAdminWeeklyAbsenceReport, id);
    const weeklyAbsenceReportAdminDetails = await graphQLFindRecordById("getCertificatedAdminWeeklyAbsenceReport", id)

    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;
        employeeName = employee[0].employee_name;
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';
    let submittedOn = '-';

    if (weeklyAbsenceReportAdminDetails) {
        notificationTitle = "Weekly Absence Report - Certificated Admin " + moment(weeklyAbsenceReportAdminDetails.from_date).format("MM/DD/YYYY") + " - " + moment(weeklyAbsenceReportAdminDetails.to_date).format("MM/DD/YYYY");
        submittedOn = moment(weeklyAbsenceReportAdminDetails.status_date_time).format("MM/DD/YYYY");
    }

    const cognito = new AWS.CognitoIdentityServiceProvider();

    let initiaterLoginURL = window.location.origin + `${specialRoutes.WAR_certificated_initiator_request}`;
    let approverLoginURL = window.location.origin + `${specialRoutes.WAR_certificated_approver_request}`;
    let payrollLoginURL = window.location.origin + `${specialRoutes.WAR_certificated_payroll_request}`;

   //get Intiater Management
   let intiaterManagement;
   if (loggedUserId) {
       try {
           intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
       } catch (e) {
       }
       // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
       // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
       // var fullName = lastName + " " + firstName
       // var fullNameApprovedBy = lastName + "," + firstName
       var fullName = await GetValueFromArray(intiaterManagement.UserAttributes, "name")
       var fullNameApprovedBy = fullName
   }

    let notificationMessageList;
    let emailMessageList;

    try {
        switch (status) {
            case 'CREATED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly absence report - Admin",
                        notificationSubject: "Weekly absence report created",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly absence report - Admin',
                        emailSubject: 'Weekly absence report created',
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${approverLoginURL}`
                    }
                ]
                break;
            case 'APPROVED1':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: `Weekly absence report approved - Admin`,
                        notificationSubject: `Weekly absence report approved - Admin`,
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by ${fullName} is pending for acknowledge.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: `Weekly absence report approved - Admin`,
                        emailSubject: `Weekly absence report approved - Admin`,
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by ${fullName} is acknowledge. <br><br>Please Review By Clicking below Link: <br/>  ${payrollLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: `Weekly absence report approved - Admin`,
                        notificationSubject: `Weekly absence report approved - Admin`,
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: `Weekly absence report approved - Admin`,
                        emailSubject: `Weekly absence report approved - Admin`,
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is Approved by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/> ${initiaterLoginURL}`
                    }
                ]
                break;
            case 'ACKNOWLEDGED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: `Weekly absence report acknowledged`,
                        notificationSubject: `Weekly absence report acknowledged`,
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: `Weekly absence report acknowledged`,
                        emailSubject: `Weekly absence report acknowledged`,
                        emailMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${initiaterLoginURL}`
                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "Weekly absence report rejected",
                        notificationSubject: "Weekly absence report rejected",
                        notificationMessage: `Hello ${employeeName},<br>The report titled "${notificationTitle}" initiated by you on ${submittedOn} is rejected by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'Weekly absence report rejected',
                        emailSubject: 'Weekly absence report rejected',
                        emailMessage: `Hello ${employeeName},<br> Report titled ${notificationTitle} initiated by you is rejected by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${initiaterLoginURL}`
                    }
                ]
                break;
            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'CLASSIFIED_SUB_REQUEST', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'CLASSIFIED_SUB_REQUEST', msg.subject, msg.notificationMessage, appId);
            }
        })

        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'CLASSIFIED_SUB_REQUEST', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};

//PSA Notification



const handleNotificationsOnStatusChangeforPSA = async (status, id, appId, userId, loggedUserId, rejectReson = "",submmitedOn) => {


    // const employee = await DataStore.query(Employee, (c) => c.user_Id.eq(userId));
    const employee = await graphQLGetAllData("listEmployees", [{ user_Id: { eq: userId } }])
    const cognito = new AWS.CognitoIdentityServiceProvider();


    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
        secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
        region: process.env.REACT_APP_AWS_Region,
    });

    //get Intiater Management
    let intiaterManagement;
    if (loggedUserId) {
        try {
            intiaterManagement = await cognito.adminGetUser({ UserPoolId: awsmobile.aws_user_pools_id, Username: loggedUserId }).promise();
        } catch (e) {
        }
        // var firstName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:firstName")
        // var lastName = await GetValueFromArray(intiaterManagement.UserAttributes, "custom:lastName")
        // var fullName = lastName + " " + firstName
        // var fullNameApprovedBy = lastName + "," + firstName
        var fullName = intiaterManagement ? await GetValueFromArray(intiaterManagement.UserAttributes, "name") : ''
        var fullNameApprovedBy = fullName
    }


    // const PSADetails = await DataStore.query(PSAConsultant, id);
    const PSADetails = await graphQLFindRecordById("getPSAConsultant", id)

    let employeeUserId = '';
    let employeeName = '';
    let employeeCode = '';
    let employeeEmail = '';
    let employeeId = '';
    if (employee.length > 0) {
        employeeUserId = employee[0].user_Id;

        //in employee name have comma then replace with space.
        if (employee[0].employee_name.includes(',')) {
            employeeName = (employee[0].employee_name).replace(/,/g, "");
        } else {
            employeeName = employee[0].employee_name;
        }
        employeeCode = employee[0].employee_code;
        employeeEmail = employee[0].email;
        employeeId = employee[0].id;
    }

    let notificationTitle = '-';

    if (PSADetails) {
        // notificationTitle = "Weekly Absence Report - Classified " + moment(PSADetails.from_date).format("MM/DD/YYYY") + " " + moment(PSADetails.to_date).format("MM/DD/YYYY");
        notificationTitle = `Personal Service Agreement - ${PSADetails.assignmentTitle}`;
    }


    let defaultApproverLoginURL = window.location.origin + `${specialRoutes.personalServiceAgreement}`;




    // if (loggedUserId === '1') {
    //     fullName = 'PSA Consultant'
    // }
    let notificationMessageList;
    let emailMessageList;



    try {
        switch (status) {

            //-------last when lat app acknowledge report then notification goes to initiator--------
            case 'Acknowledged by HR Executive Secretary':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br>The Report titled "${notificationTitle}" initiated by you on ${moment(submmitedOn).format("MM/DD/YYYY")} is Acknowledged by ${fullNameApprovedBy}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br>The Report titled "${notificationTitle}" initiated by you on ${moment(submmitedOn).format("MM/DD/YYYY")} is Acknowledged by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;


            //--------end code-----------------------------------------------------------------------


            case 'Pending for approval PSA Consultant':

                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'PSA Consultant Accepted':

                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by you is approved by PSA consultant .`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by you is approved by PSA consultant . <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;


            // add case for budget manager start 
            case 'Pending for approval Budget Manager':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            // add case for budget manager end 



            case 'Pending for approval Budget Clerk':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;

            case 'Pending for approval HR Executive Secretary':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];



                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;


            case 'Pending for approval Executive Approver':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;


            case 'Pending for Acknowledgement HR Executive Secretary':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;



            case 'HR Executive secretary':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;

            case 'REVIEWED&RESUBMITTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request reviewed and resubmitted",
                        notificationSubject: "PSA request reviewed and resubmitted",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request reviewed and resubmitted',
                        emailSubject: 'PSA request reviewed and resubmitted',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is pending for your approval. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]

                break;
            case 'ACKNOWLEDGE':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request",
                        notificationSubject: "PSA request",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by ${fullName} is waiting for your acknowledgement. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'APPROVEDBY':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request Approved",
                        notificationSubject: "PSA request Approved",
                        notificationMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${moment(submmitedOn).format("MM/DD/YYYY")} is Approved by ${fullNameApprovedBy}.`
                    }
                ];
                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request Approved',
                        emailSubject: 'PSA request Approved',
                        emailMessage: `Hello ${employeeName},<br>The report titled ${notificationTitle} initiated by you on ${moment(submmitedOn).format("MM/DD/YYYY")} is Approved by ${fullNameApprovedBy}. <br><br>Please Review By Clicking below Link: <br/> ${defaultApproverLoginURL}`
                    }
                ]
                break;
            case 'REJECTED':
                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request Rejected",
                        notificationSubject: "PSA request Rejected",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle} is rejected by ${fullName}. Reason is ${rejectReson}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request Rejected',
                        emailSubject: 'PSA request Rejected',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle} is rejected by ${fullName}. Reason is ${rejectReson}. <br><br>Please Review By Clicking below Link: <br/> ${defaultApproverLoginURL}`
                    }
                ]
                break;


            case 'PSA Consultant Rejected':

                notificationMessageList = [
                    {
                        to: employeeUserId,
                        type: 'APP',
                        subject: "PSA request Rejected",
                        notificationSubject: "PSA request Rejected",
                        notificationMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by you is rejected by PSA consultant and Rejected Reason is ${rejectReson}.`
                    }
                ];

                emailMessageList = [
                    {
                        to: employeeEmail,
                        type: 'EMAIL',
                        user_id: employeeUserId,
                        subject: 'PSA request',
                        emailSubject: 'PSA request',
                        emailMessage: `Hello, ${employeeName}<br> Report titled ${notificationTitle}. Initiated by you is rejected by PSA consultant and Rejected Reason is ${rejectReson}. <br><br>Please Review By Clicking below Link: <br/>  ${defaultApproverLoginURL}`
                    }
                ]
                break;

            default:
                createEmailNotifications(fromEmail, null, "EMAIL", id, 'PERSONAL_SERVICE_AGREEMENT', "Status is blank", `Issue with report status with id: ${id}`, appId);
                break;
        }

        notificationMessageList?.map((msg) => {

            if (msg) {
                create_notification(msg.to, msg.type, id, 'PERSONAL_SERVICE_AGREEMENT', msg.subject, msg.notificationMessage, appId);
            }
        })
        // emailMessageList = [];
        emailMessageList?.map((email) => {
            if (email) {
                createEmailNotifications(email.to, email.user_id, email.type, id, 'PERSONAL_SERVICE_AGREEMENT', email.emailSubject, email.emailMessage, appId);
            }

        })

        return 'Success';
    } catch (error) {
        console.error(error);
        return 'Error';
    }
};


createNotification.propTypes = {
    userId: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['APP', 'EMAIL']),
    sourceId: PropTypes.string.isRequired,
    // sourceType: PropTypes.oneOf(Object.keys(sourceTypeEnum)).isRequired,
    message: PropTypes.string.isRequired
}

export { handleNotificationsOnStatusChange, handleNotificationsOnStatusChangeforPersonnelAction, handleNotificationsOnStatusChangeforStipendForm, handleNotificationsOnStatusChangeforWAP_Classified, handleNotificationsOnStatusChangeforWeeklyAbsenceReportClassified, handleNotificationsOnStatusChangeforSubstituteRequestCertificated, handleNotificationsOnStatusChangeforClassifiedSubRequest, handleNotificationsOnStatusChangeforWeeklyAbsenceReportAdmin, handleNotificationsOnStatusChangeforPSA, handleNotificationsOnStatusChangeforTimeReport, createEmailNotifications }
