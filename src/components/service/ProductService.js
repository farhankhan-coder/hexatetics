export const ProductService = {
    getProductsData() {
        return [
             
            {
                modules1: 'Module 1',
                modules2: 'Module 1',
                modulestatus: 'Completed',
                approvalstatus: 'Completed',
                submission: '09/07/2022',
                resubmission: '09/07/2022',
                deadline: 'N/A',
                additionalnote: '-',
                dropdown: ''
            },
            {
                modules1: 'Module 2',
                modules2: 'Module 2',
                modulestatus: 'Submitted',
                approvalstatus: 'Pending',
                submission: '09/07/2022',
                resubmission: '09/07/2022',
                deadline: 'N/A',
                additionalnote: '-',
                dropdown: ''
            },
            {
                modules1: 'Module 3',
                modules2: 'Module 3',
                modulestatus: 'Work inprogress',
                approvalstatus: 'Recommended​',
                submission: '09/07/2022',
                resubmission: '09/07/2022',
                deadline: 'N/A',
                additionalnote: '-',
                dropdown: ''
            },
            {
                modules1: 'Module 4',
                modules2: 'Module 4',
                modulestatus: 'Submitted',
                approvalstatus: 'Action Required',
                submission: '09/07/2022',
                resubmission: '09/07/2022',
                deadline: '09/09/2022',
                additionalnote: 'Please work on video 2.2',
                dropdown: ''
            },
            {
                modules1: 'Module 5',
                modules2: 'Module 5',
                modulestatus: 'Submitted',
                approvalstatus: 'Action Required',
                submission: '09/07/2022',
                resubmission: '09/07/2022',
                deadline: '09/09/2022',
                additionalnote: 'Please work on video 2.2',
                dropdown: ''
            },   
            {
                name: 'Alpha',
                id: '34567',
                modulesassigned: '4',
                modulescompleted: '2',
                completionrate: '50%',
                modulescreated: '2',
                modulerecommended: '4',
                beforedeadline: '70%',
                afterdeadline: '30%',
                schoolname: 'School 1'
            },
        ];

        
    },

    getModuleDetailsData() {
        return [
           
            {
                modulesname: 'Module1',
                moduleenroll: 'Recommended',
                modulestatus: '20 Minutes',
                empno: '4',
                completedemp: '2',
                Credtedby: 'Admin',
                createdon: '09/10/2022',
                topic: 'Topic 1',
                school:"School 1",
                rating:"3.5 Stars",
                dropdown: ''
            },
            {
                modulesname: 'Module1',
                moduleenroll: 'Completed',
                modulestatus: '20 Minutes',
                empno: '4',
                completedemp: '2',
                Credtedby: 'Admin',
                createdon: '09/10/2022',
                topic: 'Topic 1',
                school:"School 1",
                rating:"3.5 Stars",
                dropdown: ''
            },
            {
                modulesname: 'Module1',
                moduleenroll: 'Mandatory',
                modulestatus: '20 Minutes',
                empno: '4',
                completedemp: '2',
                Credtedby: 'Admin',
                createdon: '09/10/2022',
                topic: 'Topic 1',
                school:"School 1",
                rating:"3.5 Stars",
                dropdown: ''
            },
           
        ];

        
    },
    getModule1Data() {
        return [
           
            {
                modulesname: 'Module1',
                moduleenroll: 'Recommended',
                modulelength: '20 Minutes',
                empno: '4',
                assigndate: '9/10/2022',
                completestatus: 'Completed',
                completedate: '20/10/2022',
                deadline: 'xx-xx-xxxx',
                school:"School 1",
                dropdown: ''
            },
            {
                modulesname: 'Module1',
                moduleenroll: 'Recommended',
                modulelength: '20 Minutes',
                empno: '4',
                assigndate: '9/10/2022',
                completestatus: '',
                completedate: '20/10/2022',
                deadline: 'xx-xx-xxxx',
                school:"School 1",
                dropdown: ''
            },
            {
                modulesname: 'Module1',
                moduleenroll: 'Recommended',
                modulelength: '20 Minutes',
                empno: '4',
                assigndate: '9/10/2022',
                completestatus: 'Mandatory',
                completedate: '20/10/2022',
                deadline: 'xx-xx-xxxx',
                school:"School 1",
                dropdown: ''
            },
           
        ];

        
    },

    getProductsdistrictData() {
        return [
             
            {
                schoolName: 'School 1',
                employeeName: 'Alpha 1',
                employeeID: 'XXXX',
                moduleCreated: 'Module1',
                moduleRecommended: '',
                recommendedCratedOn: '09/07/2022',
                dropdown: ''
            },
            {
                schoolName: 'School 2',
                employeeName: 'Alpha 2',
                employeeID: 'XXXX',
                moduleCreated: '',
                moduleRecommended: 'Module2',
                recommendedCratedOn: '09/07/2022',
                dropdown: ''
            },
            {
                schoolName: 'Module 1',
                employeeName: 'Module 1',
                employeeID: 'Completed',
                moduleCreated: 'Completed',
                moduleRecommended: '09/07/2022',
                recommendedCratedOn: '09/07/2022',
                dropdown: ''
            },
            {
                schoolName: 'Module 1',
                employeeName: 'Module 1',
                employeeID: 'Completed',
                moduleCreated: 'Completed',
                moduleRecommended: '09/07/2022',
                recommendedCratedOn: '09/07/2022',
                dropdown: ''
            },
            {
                schoolName: 'Module 1',
                employeeName: 'Module 1',
                employeeID: 'Completed',
                moduleCreated: 'Completed',
                moduleRecommended: '09/07/2022',
                recommendedCratedOn: '09/07/2022',
                dropdown: ''
            },
                      
           
        ];
    },

    getAssignModuleData() {
        return [
             
            {
                employeesName: 'Alpha',
                schoolName: 'School1',
                employeesID: '654321',
                department: 'Science',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },
            {
                employeesName: 'Alpha 1',
                schoolName: 'School1',
                employeesID: '654321',
                department: 'Science',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },
            {
                employeesName: 'Module 1',
                schoolName: 'Module 1',
                employeesID: 'Completed',
                department: 'Completed',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },
            {
                employeesName: 'Module 1',
                schoolName: 'Module 1',
                employeesID: 'Completed',
                department: 'Completed',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },
            {
                employeesName: 'Module 1',
                schoolName: 'Module 1',
                employeesID: 'Completed',
                department: 'Completed',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },   
            
            {
                employeesName: 'Module 1',
                schoolName: 'Module 1',
                employeesID: 'Completed',
                department: 'Completed',
                GroupsName: 'Group 1',
                GroupsType: 'Type1',
                GroupsMamber: 'Teacher 1',
            },
           
        ];

        
    },


    getProductDetailData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 'US$ 499,99',
                total: 'US$ 499,99',
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },
    getModuleDetailsMini() {
        return Promise.resolve(this.getModuleDetailsData().slice(0, 3));
    },

    getModule1Mini() {
        return Promise.resolve(this.getModule1Data().slice(0, 3));
    },

    getProductsdistrict() {
        return Promise.resolve(this.getProductsdistrictData().slice(0, 2));
    },

    getAssignModuleMini() {
        return Promise.resolve(this.getAssignModuleData().slice(0, 2));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

