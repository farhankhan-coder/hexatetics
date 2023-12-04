
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
// import asset1 from '../../../../assets/svg/Asset1.svg'
// import uploadForms from '../../../../assets/svg/image2.svg'
// // import master1 from '../../../../assets/svg/Layer3.svg'
// import master2 from '../../../../assets/svg/layer4.svg'
// import schoolMaster from '../../../../assets/svg/image47.svg'
import Layout from '@/components/common/nav/admin/navComponent';

import Link from "next/link";

// import uploadHelpDocument from '../../../../assets/svg/image48.svg'


export default function Masters() {
    const [search, setSearch] = useState("");
    const contentData  = [
        {
            id: 0,
            image: "/assets/svg/Asset1.svg",
            title: "Users",
            link: "/admin/masters/users/user",
        },
        {
            id: 4,
            image: "/assets/svg/image47.svg",
            title: "School Master",
            link: "/admin/masters/school",
        },

        {
            id: 2,
            image: "/assets/svg/Layer3.svg",
            title: "Employee",
            link: "/admin/masters/employee",
        },
        {
            id: 3,
            image: "/assets/svg/Layer3.svg",
            title: "Form Report",
            link: "#",
        },
        {
            id: 5,
            image: "/assets/svg/Layer3.svg",
            title: "Time Report",
            link: "/admin/masters/TimeReport",
        },
        // {
        //     id: 3,
        //     image: master2,
        //     title: "Master 2",
        // },
        // {
        //     id: 1,
        //     image: uploadForms,
        //     title: "Upload Forms",
        // },
        // {
        //     id: 5,
        //     image: uploadHelpDocument,
        //     title: "Upload Help Document",
        // },
    ]
    const handleSearch = e => {
        const searchValue = e.target.value;
        setSearch(searchValue);
    
        const filteredData = contentData.filter(item =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    
        const filteredContent = searchValue ? filteredData : contentData;
        setContent(filteredContent);
      };
    
      const [content, setContent] = useState(contentData);

    return (
        <div>
            <Layout pageTitle="Admin Profile">
                <div className="grid justify-items-end m-3 ">
                    <span className="p-input-icon-left ">
                        <i className="pi pi-search dashboardSearchIcon" />
                        <InputText placeholder="Search" value={search} onChange={handleSearch} style={{fontSize:"12px"}}/>
                    </span>
                </div>
                <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-2  p-3 masters'>

                {content.length > 0 ? (
            content.map(item => (
              <div key={item.id}>
                <Card className="grid justify-items-center bg-white border text-center">
                  <Image src={item.image} alt="user" />
                  <h2 className="text-[#344054] font-semibold">{item.title}</h2>
                  <div className="xl:pt-[1.042vw]">
                    <Link  href={item.link}>
                      <button className="bg-[#113699] mt-2 text-[16px] xl:text-[0.833vw] rounded-md text-[#ffff] xl:pt-[0.521vw] xl:pb-[0.521vw] xl:pl-[0.938vw] xl:pr-[0.938vw] px-[10px] py-[10px]">
                        Manage
                      </button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="flex col-span-4 justify-center items-center mx-auto text-[1rem] w-full">
                <h1 >No data found.</h1>
            </div>
          )}
                </div>
            </Layout>
        </div>
    )
}
