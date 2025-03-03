import { GiGraduateCap } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { RiLinkUnlinkM } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { LuAlarmClock } from "react-icons/lu";

interface Lead {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    lesson_type_display: string;
    source_display: string;
    created_at: string;
    lesson_time?: string;
    teacher_name?: string; // API-dan keladigan qiymat
}

interface LeadColumnProps {
    title: string;
    leads: Lead[];
}

export default function LeadColumn({ title, leads }: LeadColumnProps) {
    return (
        <div className="bg-[#F3F4F7] shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="bg-blue-600 text-white cursor-pointer text-center py-2 rounded-md font-semibold">
                {title}
            </h2>
            <div className="flex-1 space-y-4 mt-4">
                {leads.length > 0 ? (
                    leads.map((lead) => (
                        <div
                            key={lead.id}
                            className="bg-white p-3 cursor-pointer rounded-lg shadow-md space-y-1 text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-[#334D6E] text-[13px] font-semibold break-all">
                                    {lead.first_name} {lead.last_name}
                                </h3>
                                <HiOutlineDotsHorizontal className="opacity-60" />
                            </div>
                            <div className="gap-2 space-y-1">
                                <span className="text-white py-0.5 px-3 rounded-[4px] text-[12px] bg-[#33A9FF]">
                                    {lead.phone}
                                </span>
                                <div className="flex gap-3.5">
                                    <div>
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <GiGraduateCap className="text-[14px] mr-1" />
                                            <span>General English</span>
                                        </div>
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <GiGraduateCap className="text-[14px] mr-1" />
                                            {lead.lesson_type_display || "No lesson type"}
                                        </div>
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <IoBookOutline className="text-[14px] mr-1" />
                                            {lead.teacher_name ? lead.teacher_name : "Belgilanmagan"}
                                        </div>
                                    </div>
                                    <div>                                      
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <RiLinkUnlinkM className="text-[14px] mr-1" />
                                            {lead.source_display || "No source"}
                                        </div>
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <CiCalendarDate className="text-[14px] mr-1" />
                                            {lead.created_at.length > 10 ? lead.created_at.substring(0, 10) + "..." : lead.created_at}
                                        </div>
                                        <div className="flex items-center text-[10px] text-[#334D6E]">
                                            <LuAlarmClock className="text-[14px] mr-1" />
                                            {lead.lesson_time 
                                                ? (lead.lesson_time.length > 10 ? lead.lesson_time.substring(0, 10) + "..." : lead.lesson_time)
                                                : "Belgilanmagan"
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No leads</p>
                )}
            </div>
        </div>
    );
}
