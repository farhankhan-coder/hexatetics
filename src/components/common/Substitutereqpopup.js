import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Link from 'next/link';
function Substitutereqpopup(props) {
    const [selectedCity, setSelectedCity] = useState(null);
    const [value, setValue] = useState('');
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
  return (
   <>
   <Dialog
                                                                                        header="Add New Employee" draggable={false} className='add_New_Employee'
                                                                                        visible={props.visible}
                                                                                        style={{ width: "30vw" }}

                                                                                        onHide={props.onHide}
                                                                                    // footer={footerContentForReqReject}
                                                                                    >
                                                                                        <div className="m-0">

                                                                                            <div className="font-medium text-sm mb-2 mt-3">School/Department <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <Dropdown id="dept"
                                                                                             value={cities}
                                                                                               onChange={(e) => setSelectedCity(e.value)} 
                                                                                                filter
                                                                                                // disabled={disabled}
                                                                                                options={cities} showClear optionLabel="name" placeholder="Select School/Department" className="w-full h-11 rounded-md border border-[#E4E7EC] pl-5" style={{ fontSize: '0.875rem', color: '#667085', fontWeight: '400' }}
                                                                                            />
                                                                                            {/* <div className="font-medium text-[18px] mb-2 mt-3">Employee Name <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <InputText
                                                                                                value={NewEmployeeName}
                                                                                                placeholder=""
                                                                                                onChange={e => { setNewEmployeeName(e.target.value) }}
                                                                                                className="w-full"
                                                                                            /> */}
                                                                                            <div className="font-medium text-sm mb-2 mt-3">First Name <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <InputText
                                                                                                value={value}
                                                                                                placeholder="Enter First Name"
                                                                                                onChange={e => { setValue(e.target.value) }}
                                                                                                className="w-full"
                                                                                            />
                                                                                            <div className="font-medium text-sm mb-2 mt-3">Last Name <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <InputText
                                                                                                value={value}
                                                                                                placeholder="Enter Last Name"
                                                                                                onChange={e => { setValue(e.target.value) }}
                                                                                                className="w-full"
                                                                                            />
                                                                                            {/*  <div className="font-medium text-[18px] mb-2 mt-3">Select Role
                                                                                                <span className="text-[red] pl-0.2">*</span>
                                                                                            </div>
                                                                                            <Dropdown value={newEmpSelectedRole} onChange={(e) => setNewEmpSelectedRole(e.value)} options={rolesArray} optionLabel="name"
                                                                                                placeholder="Select a Role" className="w-full md:w-14rem" />

                                                                                            <div className="font-medium text-[18px] mb-2 mt-3">Designation<span className="text-[red] pl-0.2">*</span></div>
                                                                                            <Dropdown value={newEmpSelectedDesignation} onChange={(e) => setNewEmpSelectedDesignation(e.value)} options={designationForAllApps} optionLabel="name"
                                                                                                placeholder="Select a Designation" className="w-full md:w-14rem" /> */}
                                                                                            {/* -------------------------------- */}


                                                                                            <div className="font-medium text-sm mb-2 mt-3">Employee Code <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <InputText
                                                                                                value={value}
                                                                                                placeholder="Enter Employee Code"
                                                                                                onChange={e => { setValue(e.target.value) }}
                                                                                                className="w-full"
                                                                                            />

                                                                                            <div className="font-medium text-sm mb-2 mt-3 ">Employee Email Address <span className="text-[red] pl-0.2">*</span></div>
                                                                                            <InputText
                                                                                                value={value}
                                                                                                placeholder="Enter Employee Email Address"
                                                                                                onChange={e => { setValue(e.target.value) }}
                                                                                                className="w-full"
                                                                                            />
                                                                                        </div>
                                                                                        <div className='flex justify-between gap-2 mt-3'>
                                                                                            <Link href="" onClick={() => { setOpenNewEmployee(false); }}
                                                                                                className='text-[#344054] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                                                                <i class="pi pi-times"></i><span>Cancel</span></Link>

                                                                                            <Link href="" onClick={() => { AddNewEmployee() }}
                                                                                                className='text-[#039855] font-medium text-sm text-center xl:py-[0.521vw] py-[8px] xl:px-[0.781vw] px-[14px] border border-[#D0D5DD] bg-white Shadow_xs rounded-lg space-x-2 cursor-pointer'>
                                                                                                <i class="pi pi-check"></i><span>Add</span></Link>

                                                                                        </div>
                                                                                    </Dialog>
   </>
  )
}

export default Substitutereqpopup