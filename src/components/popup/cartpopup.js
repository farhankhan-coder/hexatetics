import Image from "next/image";
import Link from "next/link";
import React  from "react";
import { Rating } from "primereact/rating";
import { Checkbox } from "primereact/checkbox";
import { Divider } from 'primereact/divider';
import { useState } from "react";

export default function CartPopup(props) {

    const [value1, setValue1] = useState(null);
    const [checked, setChecked] = useState(false);

    return (
        <>
            <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] headerImg relative">
                <Image className="" src={"/assets/images/cartHeaderImg.png"} width={"764"} height={"509"} alt="EMS" />
                <div className="absolute bottom-5 right-5">
                    <Link href={""} className="flex items-center justify-center text-lg w-[35px] h-[35px] xl:w-[3.594vw] xl:h-[3.542vw] rounded-full bg-[#EC695F] text-white">
                        <i className="NU-cart"></i></Link>
                </div>
            </div>
            <div className="flex justify-between mt-[24px] xl:mt-[1.250vw]">
                <div className="leftContent">
                    <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Unit 1</div>
                    <div className="text-[18px] xl:text-[0.938vw] text-[#344054] font-semibold">Being My Best Self</div>
                    <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Online Material</div>
                    <div className="text-[32px] xl:text-[1.667vw] text-[#344054] font-semibold">$ 499.99</div>
                </div>
                <div className="rightContent">
                    <Rating value={value1} onChange={(e) =>
                        setValue1(e.value)} cancel={false}
                        onIcon={<><i className="NU-star text-[#FBC968]"></i></>}
                        offIcon={<><i className="NU-star text-[#5252524D]"></i></>}
                    />
                    <div className="text-[12px] xl:text-[0.625vw] text-[#5252524D] text-end">23 Reviews</div>
                </div>
            </div>
            <Divider />
            <div className="text-[rgba(82,82,82,0.65)] text-[12px] xl:text-[0.625vw]">Description</div>
            <div className="text-[12px] xl:text-[0.625vw] text-[#525252] font-semibold">
                Lorem ipsum dolor sit amet consectetur. Amet mauris convallis amet aliquet amet. Platea magnis fringilla vel tortor sapien. Bibendum maecenas iaculis at nulla massa posuere diam nunc pretium. Varius auctor cras aliquet tristique. Ultrices pulvinar tincidunt neque at eu. Accumsan facilisis neque. Lorem ipsum dolor sit amet consectetur. Amet mauris convallis amet aliquet amet. Platea magnis fringilla vel tortor sapien. Bibendum maecenas iaculis at nulla massa posuere diam nunc pretium. Varius auctor cras aliquet tristique. Ultrices pulvinar tincidunt neque at eu. Accumsan facilisis neque.
            </div>
            <div className="flex items-center justify-between mt-[32px] xl:mt-[1.667vw]">
                <div className="text-[16px] xl:text-[0.833vw] text-[#525252] font-medium">Lessons</div>
                <div className="text-[#308B90] text-[12px] xl:text-[0.625vw]">
                    <Link href={""}>
                        Select All</Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] xl:gap-[1.250vw] mt-[24px] xl:mt-[1.250vw]">
                <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] bg-white rounded-[4px]">
                    <div className="flex justify-end px-[5px] pt-[5px]">
                        <Checkbox inputId="ingredient1" onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                    </div>
                    <div className="px-[20px] xl:px-[1.042vw] pb-[20px] xl:pb-[1.042vw]">
                        <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Lesson 1</div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold">Getting to Know One Another</div>
                        <div className="flex space-x-[2px] mt-[10px] xl:mt-[0.521vw]">
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">PDF</div>
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#FCEAE8] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Video</div>
                        </div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold mt-[20px] xl:mt-[1.042vw]">$ 99.99</div>
                    </div>
                </div>
                <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] bg-white rounded-[4px]">
                    <div className="flex justify-end px-[5px] pt-[5px]">
                        <Checkbox onChange={e => setChecked(e.checked)}></Checkbox>
                    </div>
                    <div className="px-[20px] xl:px-[1.042vw] pb-[20px] xl:pb-[1.042vw]">
                        <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Lesson 2</div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold">Discovering Commonalities</div>
                        <div className="flex space-x-[2px] mt-[10px] xl:mt-[0.521vw]">
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">PDF</div>
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#FCEAE8] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Video</div>
                        </div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold mt-[20px] xl:mt-[1.042vw]">$ 99.99</div>
                    </div>
                </div>
                <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] bg-white rounded-[4px]">
                    <div className="flex justify-end px-[5px] pt-[5px]">
                        <Checkbox onChange={e => setChecked(e.checked)}></Checkbox>
                    </div>
                    <div className="px-[20px] xl:px-[1.042vw] pb-[20px] xl:pb-[1.042vw]">
                        <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Lesson 3</div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold">Learning from Diversity</div>
                        <div className="flex space-x-[2px] mt-[10px] xl:mt-[0.521vw]">
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">PDF</div>
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#5252524D] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Audio</div>
                        </div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold mt-[20px] xl:mt-[1.042vw]">$ 99.99</div>
                    </div>
                </div>
                <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] bg-white rounded-[4px]">
                    <div className="flex justify-end px-[5px] pt-[5px]">
                        <Checkbox onChange={e => setChecked(e.checked)}></Checkbox>
                    </div>
                    <div className="px-[20px] xl:px-[1.042vw] pb-[20px] xl:pb-[1.042vw]">
                        <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Lesson 4</div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold">Building Community</div>
                        <div className="flex space-x-[2px] mt-[10px] xl:mt-[0.521vw]">
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">PDF</div>
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#FCEAE8] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Video</div>
                        </div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold mt-[20px] xl:mt-[1.042vw]">$ 99.99</div>
                    </div>
                </div>
                <div className="shadow-[4px_0px_64px_rgba(0,0,0,0.08)] bg-white rounded-[4px]">
                    <div className="flex justify-end px-[5px] pt-[5px]">
                        <Checkbox onChange={e => setChecked(e.checked)}></Checkbox>
                    </div>
                    <div className="px-[20px] xl:px-[1.042vw] pb-[20px] xl:pb-[1.042vw]">
                        <div className="text-[#344054] text-[12px] xl:text-[0.625vw]">Lesson 5</div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold">Building Community</div>
                        <div className="flex space-x-[2px] mt-[10px] xl:mt-[0.521vw]">
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#D9F1F2] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">PDF</div>
                            <div className="text-[#344054] text-[12px] xl:text-[0.625vw] bg-[#FCEAE8] inline-block py-[4px] xl:py-[0.208vw] px-[8px] xl:px-[0.417vw] rounded-[4px] xl:rounded-[0.208vw]">Video</div>
                        </div>
                        <div className="text-[#344054] text-[18px] xl:text-[0.938vw] font-semibold mt-[20px] xl:mt-[1.042vw]">$ 99.99</div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F5F6F7] py-12 px-6 xl:py-[2.552vw] xl:px-[1.250vw] mt-6 xl:mt-[1.250vw]">
                <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-[24px] xl:gap-[1.250vw]">
                    <div className="w-full">
                        <Link href={"/register/product-detail"} className="lightGreen custmBtn text-center radius8 w-full">View more details</Link>
                    </div>
                    <div className="w-full">
                        <Link href={"/register/shoppingcart"} className="red text-[#FFFFFF] custmBtn text-center radius8 w-full space-x-3"><span>Add to Cart</span> <i className="NU-arrow-thin-right"></i> </Link>
                    </div>
                </div>
            </div>

        </>
    )
}