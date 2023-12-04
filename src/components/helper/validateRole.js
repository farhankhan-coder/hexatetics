import {reactLocalStorage} from 'reactjs-localstorage';
import { USER_TYPES } from './enum';

function ValidateSuperadminRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole === USER_TYPES.SUPERADMIN)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateAdminRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole === USER_TYPES.ADMIN)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateInitiatorAndApproverRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole ===  USER_TYPES.INITIATOR || loggedUserRole === USER_TYPES.APPROVER)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function ValidateApproverRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole ===  USER_TYPES.APPROVER)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateInitiatorRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole ===  USER_TYPES.INITIATOR)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function ValidatePayrollRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole === USER_TYPES.PAYROLL)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateAllRoleExceptAdmin() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole === USER_TYPES.SUPERADMIN || loggedUserRole === USER_TYPES.PAYROLL || loggedUserRole === USER_TYPES.INITIATOR || loggedUserRole === USER_TYPES.APPROVER)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateAllRoleExceptSuperadmin() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole ===  USER_TYPES.PAYROLL || loggedUserRole === USER_TYPES.INITIATOR || loggedUserRole === USER_TYPES.APPROVER || loggedUserRole === USER_TYPES.ADMIN)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateAllRole() {
    let loggedUserRole = reactLocalStorage.get('loggedUserRole')?.toUpperCase();
    if(loggedUserRole === USER_TYPES.SUPERADMIN || loggedUserRole === USER_TYPES.PAYROLL || loggedUserRole === USER_TYPES.INITIATOR || loggedUserRole === USER_TYPES.APPROVER || loggedUserRole === USER_TYPES.ADMIN)
    {
        return true;
    }
    else
    {
        return false;
    }
}
export { ValidateAdminRole, ValidateApproverRole, ValidateInitiatorRole, ValidatePayrollRole, ValidateAllRoleExceptAdmin, ValidateAllRole,ValidateInitiatorAndApproverRole,ValidateAllRoleExceptSuperadmin };