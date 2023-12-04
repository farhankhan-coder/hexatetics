
// Cart Table if any changes please let me know sujit
export const MyAccountTable2 = {
    getProductsData() {
        return [
            
            {
                SL: '1',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
               
               
            },
            {
                SL: '2',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Rejected',
                Remarks: 'Missing info, please review',
            },
            {
                SL: '3',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '4',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
                
            },
            {
                SL: '5',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '6',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '7',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '8',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '9',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '10',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '11',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '12',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            
                      
           
        ];
    },

    getProductsData2() {
        return [
            
            {
                SL: '1',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
               
               
            },
            {
                SL: '2',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Rejected',
                Remarks: '',
            },
            {
                SL: '3',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '4',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
                
            },
            {
                SL: '5',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '6',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '7',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Approved',
                Remarks: '',
            },
            {
                SL: '8',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '9',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '10',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '11',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            {
                SL: '12',                
                WeekDuration: '6th -12th Mar23',
                Submittedon:'13th Mar23',
                TaskSLA: 'Pending for Approval',
                Remarks: '',
            },
            
                      
           
        ];
    },
    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 3));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProductsSmall2() {
        return Promise.resolve(this.getProductsData2().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithSLsSmall() {
        return Promise.resolve(this.getProductsWithSLsData().slice(0, 10));
    },

    getProductsWithSLs() {
        return Promise.resolve(this.getProductsWithSLsData());
    }
};