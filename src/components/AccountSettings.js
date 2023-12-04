// import { Auth } from "aws-amplify";
// import { reactLocalStorage } from "reactjs-localstorage";
import { Image } from "primereact/image";
import React, { useEffect, useRef, useState, Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AWS from "aws-sdk";
// import defaultProfile from '../../../src/assets/images/defaultProfile.jpg'
// import profile  from "../../public/assets/images/profile.png"
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

const AccountSettings = () => {
  // const loggedUserId = reactLocalStorage.get('loggedUserId');
  const [profilePicture, SetProfilePicture] = useState("");
  const menu = useRef(null);
  // const myNavigation = useNavigate();

  const items = [
    // {
    //   label: 'View profile',
    //   icon: 'gusd-user',
    //   url: '/initiatorprofile'
    // },
    {
      label: "Change Password",
      icon: "gusd-lock",
      url: "/changepassword",
    },
    {
      separator: true,
    },
    {
      label: "Log out",
      icon: "gusd-logout",
      // command: async () => {
      //   await Auth.signOut({ global: false });
      //   reactLocalStorage.clear();
      //   myNavigation('/');
      // }
      Link:"/"
    },
  ];

  // const logOut = async () => {
  //   await Auth.signOut({ global: false });
  //   reactLocalStorage.clear();
  //   myNavigation('/');
  // }

  // async function signOutAndClearStorage() {
  //   await Auth.signOut({ global: false });
  //   reactLocalStorage.clear();
  //   myNavigation('/');
  // }

  // const getProfilePictureUrl = () => {
  //   const bucketName = process.env.REACT_APP_AWS_Bucket;
  //   let profilePictureKey = 'public/profile/' + loggedUserId + '/profile.jpeg';

  //   profilePictureKey = 'public/profile/' + loggedUserId + '/profile.jpeg';

  //   // Create an instance of the S3 service
  //   const s3 = new AWS.S3();
  //   // Generate a presigned URL for the image
  //   const params = {
  //     Bucket: bucketName,
  //     Key: profilePictureKey,
  //     Expires: 3600 // URL expiration time in seconds
  //   };

  //   // Generate the presigned URL
  //   s3.getSignedUrl('getObject', params, function (err, url) {

  //     try {
  //       SetProfilePicture(url);
  //     }
  //     catch (e) {
  //       SetProfilePicture(defaultProfile);
  //       console.error('Error generating presigned URL: ', err);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   // console.log(profilePicture);
  //   getProfilePictureUrl();
  // }, [profilePicture]);

  return (
    <>
      {/* <div className='pl-[20px] lg:pl-[40px] xl:pl-[2.083vw]'>
        <div className='flex items-center space-x-[20px] xl:space-x-[1.042vw] cursor-pointer' onClick={(e) => menu.current.toggle(e)}>
          {profilePicture ? <><Image src={profilePicture} width={"48"} height={"48"} imageClassName='rounded-full w-[48px] h-[48px] xl:w-[2.500vw] xl:h-[2.500vw] object-cover userImg' /></> :<Image src={defaultProfile} width={"48"} height={"48"} imageClassName='rounded-full w-[48px] h-[48px] xl:w-[2.500vw] xl:h-[2.500vw] object-cover userImg' />}
          
          <i className='gusd-arrow-down text-[#667085] text-[14px] xl:text-[0.729vw]'></i>
        </div>
      </div>
      <TieredMenu model={items} popup ref={menu} className='profileDropdown' /> */}

      <Menu
        as="div"
        className="relative inline-block z-10 xl:pl-[30px] pl-[30px]"
      >
        <div className="flex items-center">
          <Menu.Button className="flex items-center">
            {/* <Avatar  src={profilePic} /> */}
            <div className="relative py-2">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/assets/images/profile.png"
                    width={"48"}
                    height={"48"}
                    imageClassName="rounded-full w-[48px] h-[48px] xl:w-[2.500vw] xl:h-[2.500vw] object-cover userImg"
                  />
                </div>
              </div>
            </div>
            <span className="text-[rgba(76,82,95,0.6);] pl-2 xl:pl-4">
              <i className="gusd-arrow-down text-[#4C525F]/60 text-[12px]"></i>
            </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 w-full min-w-[250px]  origin-top-right bg-white rounded-[5px] xl:rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] divide-y divide-solid divide-[#E4E7EC]">
            <div className="px-4 pt-5 pb-3 xl:px-[0.833vw]">
              <div className="flex items-center gap-3">
                <Link
                  // to={"/changepassword"}
                  href="#"
                  className="text-[#222222] text-[14px] xl:text-[0.833vw] font-normal "
                >
                  <i className="mr-3 p-menuitem-icon gusd-lock"></i>
                  Change Password
                </Link>
              </div>
            </div>

            <div className="px-4 py-4">
              <Link
                // to={"#"}
                href="/"
                // onClick={() => {
                //   signOutAndClearStorage()
                // }}
                className="text-[#222222] text-[14px] xl:text-[0.833vw] font-normal "
              >
                <i className="mr-3 gusd-logout"></i>Log out
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default AccountSettings;
