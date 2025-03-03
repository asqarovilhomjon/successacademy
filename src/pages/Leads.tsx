import { useState, useEffect } from "react";
import SidebarLayout from "../layouts/SidebarLayout";
import { useLeadListQuery } from "../services/Service";
import LeadColumn from "./LeadColumn";
import { Spin, Skeleton, Button, Modal, Select } from "antd";
import { IoSearch } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";



const { Option } = Select;


type Lead = {
    id: number;
    phone: string;
    lesson_type_display?: string;
    source_display?: string;
    created_at: string;
    lesson_time?: string;
    status_display: string;
};

export default function Leads() {
    const { data } = useLeadListQuery({});
    const [showLoading, setShowLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [activeTab, setActiveTab] = useState<"Leads" | "Applications">("Leads");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("+998");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
    const [showMore, setShowMore] = useState(false);
    const [selectedLessonType, setSelectedLessonType] = useState<string | undefined>(undefined);
    const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [selectedLeadSource, setSelectedLeadSource] = useState<string | undefined>(undefined);
    

    const isFormValid = firstName && lastName && phoneNumber.length === 13 && selectedSubject && (!showMore || (selectedLessonType && selectedTeacher && selectedTime && selectedLeadSource));

    const handleOpenConfirmModal = () => {
        setIsModalOpen(false);
        setIsConfirmModalOpen(true);
    };
    
    const handleConfirm = async () => {
        setIsConfirmModalOpen(false);
        try {
            const response = await fetch("https://test.api.mydays.uz/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone: phoneNumber,
                    subject: selectedSubject,
                    lessonType: selectedLessonType,
                    teacher: selectedTeacher,
                    lessonTime: selectedTime,
                    leadSource: selectedLeadSource,
                }),
            });
            if (!response.ok) throw new Error("Failed to add lead");
            setIsSuccessModalOpen(true);
        } catch (error) {
            alert("Failed to add lead. Please try again.");
        }
    };
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 12) value = value.slice(0, 12);
        if (!value.startsWith("998")) {
            value = "998" + value;
        }
        setPhoneNumber("+" + value);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
            setShowSkeleton(true);
            setTimeout(() => setShowSkeleton(false), 1000);
        }, 1000);
    }, []);

    const leadsByStatus: Record<string, Lead[]> = {
        "New Leads": [],
        "Contacted": [],
        "Trial Lesson": [],
        "Summary": [],
    };

    if (data?.results) {
        data.results.forEach((lead: Lead) => {
            if (leadsByStatus[lead.status_display]) {
                leadsByStatus[lead.status_display].push(lead);
            }
        });
    }

    if (showLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    const filteredLeadsByStatus =
        activeTab === "Applications"
            ? { "New Leads": leadsByStatus["New Leads"] }
            : leadsByStatus;

    return (
        <SidebarLayout>
            <div className="!mb-8">
                <div className="flex justify-between items-center">
                    <div className="text-[12px] font-[500] opacity-70 mb-4 flex space-x-6">
                        <span className={`cursor-pointer pb-2 ${activeTab === "Leads" ? "border-b-4 border-blue-500 text-blue-500" : "text-[#90A0B7]"}`} onClick={() => setActiveTab("Leads")}>Leads</span>
                        <span className={`cursor-pointer pb-2 ${activeTab === "Applications" ? "border-b-4 border-blue-500 text-blue-500" : "text-[#90A0B7]"}`} onClick={() => setActiveTab("Applications")}>Applications</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <IoSearch className="ml-[15px] text-gray-500 text-lg cursor-pointer" />
                        <Button type="primary" icon={<UserOutlined />} onClick={() => setIsModalOpen(true)}>New Lead</Button>
                    </div>
                </div>

                <div className="grid bg-white rounded-lg p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(filteredLeadsByStatus).map(([status, leads]: any) => (
                        <div key={status} className="p-4 rounded-lg">
                            {showSkeleton ? (
                                <Skeleton active paragraph={{ rows: 4 }} />
                            ) : (
                                <LeadColumn key={status} title={status} leads={leads} />
                            )}
                        </div>
                    ))}
                </div>

                <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={550}>
                <div className="h-auto flex flex-col items-center">
                    <h2 className="text-[#334D6E] text-[25px] font-[700] mt-[55px]">Add New Lead</h2>
                    <p className="max-w-[390px] text-center text-[#90A0B7] mb-[10px]">By creating a new lead, you will also be adding a new customer to customer base</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <div className="flex flex-col mb-[5px]">
                            <label className="text-[#334D6E] text-sm mb-[5px]">First Name</label>
                            <input type="text" value={firstName} onChange={handleFirstNameChange} className="w-[210px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name" />
                        </div>
                        <div className="flex flex-col mb-[5px]">
                            <label className="text-[#334D6E] text-sm mb-[5px]">Last Name</label>
                            <input type="text" value={lastName} onChange={handleLastNameChange} className="w-[210px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name" />
                        </div>
                        <div className="flex flex-col mb-[5px]">
                            <label className="text-[#334D6E] text-sm mb-[5px]">Phone Number</label>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={13} value={phoneNumber} onChange={handlePhoneChange} className="w-[210px] h-[45px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+998" />
                        </div>
                        <div className="flex flex-col mb-[5px]">
                            <label className="text-[#334D6E] text-sm mb-[5px]">Select subject</label>
                            <Select value={selectedSubject} onChange={setSelectedSubject} placeholder="Select" className="w-[210px] min-h-[45px]">
                                <Option value="math">Math</Option>
                                <Option value="english">English</Option>
                            </Select>
                        </div>
                        {showMore && (
                            <>
                                <div className="flex flex-col">
                                        <label className="text-[#334D6E] text-sm mb-[5px]">Selected Lesson Type</label>
                                        <Select value={selectedLessonType} placeholder="Select" onChange={setSelectedLessonType} className="w-[210px]">
                                            <Option value="online">Online</Option>
                                            <Option value="offline">Offline</Option>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#334D6E] text-sm mb-[5px]">Select Teacher</label>
                                        <Select value={selectedTeacher} placeholder="Select" onChange={setSelectedTeacher} className="w-[210px]">
                                            <Option value="teacher1">Teacher 1</Option>
                                            <Option value="teacher2">Teacher 2</Option>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#334D6E] text-sm mb-[5px]">Select Time</label>
                                        <Select value={selectedTime} placeholder="Select" onChange={setSelectedTime} className="w-[210px]">
                                            <Option value="morning">Morning</Option>
                                            <Option value="afternoon">Afternoon</Option>
                                            <Option value="evening">Evening</Option>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#334D6E] text-sm mb-[5px]">Select Lead Source</label>
                                        <Select value={selectedLeadSource} placeholder="Select" onChange={setSelectedLeadSource} className="w-[210px]">
                                            <Option value="referral">Referral</Option>
                                            <Option value="advertisement">Advertisement</Option>
                                        </Select>
                                    </div>
                            </>
                        )}
                    </div>
                        <div className="flex justify-between items-center w-full px-4 mt-4">
                            <button onClick={() => setShowMore(!showMore)} className="text-blue-500 flex items-center">
                                {showMore ? "Hide" : "Show More"}
                                <HiOutlineChevronDown className={`ml-2 transition-transform ${showMore ? "rotate-180" : "rotate-0"}`} />
                            </button>
                        </div>
                        <div className="flex justify-end w-full px-4 mt-6 space-x-4">
                            <Button style={{ width: 128, height: 35 }} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="primary" onClick={handleOpenConfirmModal} disabled={!isFormValid}>Confirm</Button>
                        </div>
                </div>
            </Modal>
            <Modal open={isConfirmModalOpen} onCancel={() => setIsConfirmModalOpen(false)} footer={null} width={400}>
                    <div className="w-[317px] flex flex-col h-[120px]">
                        <span className="text-[#334D6E]  text-[16px] font-[700] text-center">Confirm Add New Lead</span>
                        <span className="text-center text-[#90A0B7] mt-2 max-w-[250px] m-auto mb-5">Do you confirm the addition of a new lead to the system?</span>
                        <div className="text-center flex items-center justify-center gap-3">
                            <Button className="min-w-[125px]" onClick={() => setIsConfirmModalOpen(false)}>Go Back</Button>
                            <Button className="min-w-[125px]" type="primary" onClick={handleConfirm}>Yes</Button>
                        </div>
                    </div>
            </Modal>
            <Modal open={isSuccessModalOpen} onCancel={() => setIsSuccessModalOpen(false)} footer={null} width={400}>
                <div className="flex flex-col items-center py-6">
                    <IoCheckmarkCircleOutline className="text-white size-[60px] p-2.5 bg-blue-600 rounded-[50%]" size={30} />
                    <span className="text-[#334D6E] text-[16px] font-[700] mt-3">
                        New lead has been added
                    </span>
                    <span className="text-center text-[12px] text-[#90A0B7] mt-2 max-w-[200px] m-auto">
                        A new lead has been successfully added to the system
                    </span>
                </div>
            </Modal>
            </div>
        </SidebarLayout>
    );
}
