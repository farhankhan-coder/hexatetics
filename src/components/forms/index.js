import React from 'react'
import { Link } from 'react-router-dom';
import arrowcircleright from "../../assets/images/arrowcircleright.svg";

export default function Forms(props) {
    return (
        <div>
            <Link to={props.data?.link}>
                <div className="bg-[#F9FBFF] xl:p-[1.250vw] p-[20px] box-shadow rounded-lg relative xl:h-[8.833vw] h-[160px]">
                    <h4 className="text-[#011834] text-[20px] xl:text-[1vw] font-medium leading-tight flex items-center xl:h-[4.167vw] h-[80px]">
                        {props.data?.title}
                    </h4>
                    <div className="flex items-center gap-2 xl:mt-[1.042vw] mt-[18px]">
                        <img
                            src={arrowcircleright}
                            width={24}
                            height={24}
                            className="rounded-full xl:w-[1.250vw] xl:h-[1.250vw]"
                            alt="Arrow"
                        />
                        <p className="text-[#1262D0] text-[28px] xl:text-[0.781vw] font-medium">Run</p>
                    </div>
                    {/* Move the inner Link content outside */}
                    <div className="text-[#011834] font-semibold absolute bottom-0 right-0 text-right alert-bg-warp">
                        <div className="absolute bottom-2 right-3">
                            <p className="text-base xl:text-[0.938vw]">{props.data?.alertconunt}</p>
                            <p className="text-[10px] font-semibold xl:text-[0.625vw]">Alerts</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
