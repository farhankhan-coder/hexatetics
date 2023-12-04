import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Link from 'next/link'
import { toast } from 'react-toastify';
import Layout from '@/components/common/nav/admin/navComponent';
import { Checkbox } from "primereact/checkbox";
import capitalizeFirst from '@/components/common/capitalizeFirst';
export default function createSchool() {

    //Validate User Logged In
    const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [showPleaseWaitButton, setPleaseWaitButton] = useState(false);
    const { editSchoolId } = useParams();
    const [isEditMode, setEditMode] = useState(false);
    const [schoolIDForEdit, setSchoolIDForEdit] = useState("");
    // let navigateTo = useNavigate();

    //School Info
    const [schoolName, setSchoolName] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [city, setCity] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [state, setState] = useState("");
	
	const [isValidator, setIsValidator] = useState(false);
	


    //Create School Info
    const saveSchoolInfo = async () => {

        if (schoolName === '') { toast.error('Please enter School Name'); return; }
        else if (schoolId === '') { toast.error('Please enter School Code'); return; }

        setPleaseWaitButton(true);

        var updatedSchoolId;
        if (isEditMode) {
            const original = await DataStore.query(Schools, schoolIDForEdit);
            await DataStore.save(
                Schools.copyOf(original, (updated) => {
                    updated.name = capitalizeFirst(schoolName);
                    updated.address = capitalizeFirst(addressOne);
                    updated.city = capitalizeFirst(city);
                    updated.zip_code = zipCode;
                    updated.state_id = state;
                    updated.code = schoolId;
					updated.isValidator = String(isValidator);
                })
            );
            toast.success('Data Added Successfully.');
            goBack()

            updatedSchoolId = original.id;

        } else {
            //Save School Info
            var newSchoolId = await DataStore.save(new Schools({
                "name": capitalizeFirst(schoolName),
                "address": capitalizeFirst(addressOne),
                "city": capitalizeFirst(city),
                "zip_code": zipCode,
                "state_id": state,
                "code": schoolId,
				"isValidator" : String(isValidator),
            })
            );
            updatedSchoolId = newSchoolId.id;
            toast.success('Data Added Successfully.');
            goBack()
        }
    }


    // async function onLoad() {
    //     try {
    //       await Auth.currentSession();
    //       if (!ValidateAdminRole()) { userHasAuthenticated(false); }
    //     } catch (e) {
    //       userHasAuthenticated(false);
    //     }
    //   }


    async function BindExistingData() {

        //Edit existing record
        if (editSchoolId != null) {
            setSchoolIDForEdit(editSchoolId);

            const original = await DataStore.query(Schools, editSchoolId);
			console.log(original.isValidator)
            if (original != null) {
                setSchoolName(original.name);
                setAddressOne(original.address);
                setSchoolId(original.code)
                setZipCode(original.zip_code);
                setState(original.state_id);
                setCity(original.city);
                setEditMode(true);
				setIsValidator(original.isValidator === null || original.isValidator === ''  ? false : original.isValidator )
            }
            else {
                toast.error('Invalid record.');
                goBack()
            }
        }
		
		console.log(isValidator)
    }


    useEffect(() => {
        // onLoad();
        BindExistingData();
    }, []);

    // const goBack = () => {
        // setPleaseWaitButton(false);
        // navigateTo("/admin/setting/masters/school");
    // }

    return  (
        <Layout pageTitle="Dashboard">
            <div>
                <div className="xl:h-full lg:h-full md:h-full 2xl:h-full bg-body-blue">

                    <div className='pdTopPopup'>
                        <div
                            className="flex grid flex-row flex-wrap justify-center flex-1 gap-4 pl-5 pr-5 mt-5 align-center 2xl:grid-cols-8 xl:grid-cols-10 lg:grid-cols-8 sm:grid-cols-1 contract-grid-wrapper">
                            <div className="col-span-6 col-start-3 lg:col-start-3 xl:col-start-3 2xl:col-start-2">
                                <div className="bg-white rounded-md shadow dark:bg-[#252423]">
                                    <div className="flex justify-center mt-3 mb-2 pt-4">
                                        <h2 className="page-title">
                                            {isEditMode ? "Edit" : "Create"} School
                                        </h2>
                                    </div>
                                    <div x-data="{tab: 1}"></div>
                                    <div className={"block w-full"}>
                                        <div className="px-4 mt-6" x-show="tab === 1">
                                            <div className="flex grid flex-row flex-wrap flex-1 mb-6 align-center 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4">

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        School Code</label>
                                                    <input value={(schoolId)} onChange={e => setSchoolId(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="School Id" />
                                                </div>


                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        School Name <label htmlFor="" className="text-[#FF0000] text-[14px] font-medium ">
                                                            * </label></label>
                                                    <input value={(schoolName)} onChange={e => setSchoolName(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="School Name" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Address
                                                    </label>
                                                    <input
                                                        value={addressOne}
                                                        onChange={(e) => setAddressOne(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="Address"
                                                    />
                                                </div>


                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        City </label>
                                                    <input value={city} onChange={e => setCity(e.target.value)} type="text" className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]" placeholder="City" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        State
                                                    </label>
                                                    <input
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="State"
                                                    />
                                                </div>



                                                <div className="relative mb-4">
                                                    <label className="text-[#344054] text-[14px] font-medium dark:text-[#FFFFFF]">
                                                        Zip Code
                                                    </label>
                                                    <input
                                                        value={zipCode}
                                                        onChange={(e) => setZipCode(e.target.value)}
                                                        type="text"
                                                        className="text-[16px] rounded-lg   flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1.5 placeholder:text-[#667085] dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]"
                                                        placeholder="Zip Code"
                                                    />
                                                </div>
												
												
												
												 <div className="relative mb-4">
												 
												 <div className="flex align-items-center">
                              <Checkbox inputId="ingredient1" name="timereport1" value={isValidator} onChange={(e) => setIsValidator(!isValidator)} checked={isValidator=== 'true' || isValidator===  true ?  true : false } />
                              <label htmlFor="ingredient1" className="ml-2">Is Validator</label>
                            </div>
							
                                                   
                                                   
                                                </div>


                                            </div>
                                            <div className="grow flex justify-center gap-3 mb-3 pb-4">
                                                <Link href="/admin/masters/school" className=" py-2 px-5 bg-white text-[#344054] transition ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md dark:bg-[#333231] dark:border-[#333231] dark:text-[#FFFFFF]">Cancel</Link>
                                                <button onClick={() => saveSchoolInfo()} className=" py-2 px-6 bg-btn-blue text-[#fff] transition bg-[#113699] ease-in duration-200 text-[14px] text-center font-medium  shadow-md focus:outline-none leading-6  justify-center rounded-lg border border-[#D0D5DD] rounded-md">{showPleaseWaitButton ? 'Please wait...' : 'Submit'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
   
    );
}

