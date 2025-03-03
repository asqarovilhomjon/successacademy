// import { useState } from "react";
import { Layout, Table, Tag, Progress } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { IoAlarmOutline } from "react-icons/io5";
import SidebarLayout from "../layouts/SidebarLayout";
import { FaRegUser } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { motion } from "framer-motion";


const { Content } = Layout;

const pieData = [
    { name: "Paid", value: 60, color: "#005EEB" },
    { name: "Not Paid", value: 40, color: "#C2DAFF" },
];

const barData = [
    { month: "JAN", value: 27000000 },
    { month: "FEB", value: 39000000 },
    { month: "MAR", value: 55000000 },
    { month: "APR", value: 35000000 },
    { month: "MAY", value: 47000000 },
    { month: "JUN", value: 60000000 },
    { month: "JUL", value: 37000000 },
    { month: "AUG", value: 52000000 },
];

const stats = [
    { percent: 67, amount: "255,000,000", color: "#ff4d4f" },
    { percent: 35, amount: "218,000,000", color: "#52c41a" },
    { percent: 21, amount: "156,000,000", color: "#fa8c16" },
];

// Table ustunlari

const columns = [
    { title: <span style={{ fontSize: "12px", marginLeft: "10px" ,color: "#192A3E", fontWeight: 600 }}>#</span>, dataIndex: "id", key: "id" },
    {
        title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Lesson time</span>,
        dataIndex: "time",
        key: "time",
        render: (text: string) => {
            return (
                <div className="flex flex-row gap-[6px] items-center">
                    <IoAlarmOutline />
                    <Tag color={text && text.includes("09:00") ? "red" : "blue"}>
                        {text}
                    </Tag>
                </div>

            )
        },
    },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Name</span>, dataIndex: "name", key: "name" },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Teache name</span>, dataIndex: "teacher", key: "teacher" },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Subject name: level</span>, dataIndex: "subject", key: "subject" },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Lesson type</span>, dataIndex: "lessonType", key: "lessonType" },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Room</span>, dataIndex: "room", key: "room" },
    { title: <span style={{ fontSize: "12px", color: "#192A3E", fontWeight: 600 }}>Students</span>, dataIndex: "students", key: "students" },
];


// Table ma'lumotlari
const data = [
    {
        id:  <span style={{ fontSize: "14px", color: "#707683", fontWeight: 400 }}>18</span>,
        time: "09:00 - 10:00",
        name: <span style={{ fontSize: "14px", color: "#707683", fontWeight: 600 }}>Group 52</span>,
        teacher: 
            <div className="flex flex-row gap-1.5">
                <FaRegUser className="mt-1 opacity-60"/>
                <span style={{ fontSize: "14px", color: "#707683", fontWeight: 400 }}>Mr. Johnson</span>
            </div>,
        subject: 
            <div className="flex flex-row gap-1.5">
                <GiGraduateCap className="mt-1 text-[16px] opacity-60"/>
                <span style={{ fontSize: "14px", color: "#707683", fontWeight: 400 }}>General English</span>
            </div>,
        lessonType: 
        <div className="flex flex-row gap-1.5">
            <FaUserGroup className="mt-1 text-[16px] opacity-60"/>
            <span style={{ fontSize: "14px", color: "#707683", fontWeight: 400 }}>Group</span>
        </div>,
        room: <span style={{ fontSize: "14px", background:"#33A9FF", padding:"4px", borderRadius:"6px", color: "white", fontWeight: 400 }}>Room 2-3</span>,
        students: 
        <div className="flex flex-row gap-1.5">
            <FaUserGroup className="mt-1 text-[16px] opacity-60"/>
            <span style={{ fontSize: "14px", color: "#707683", fontWeight: 400 }}>18 students</span>
        </div>,
    },
];


export default function Dashboard() {
    return (
        <div className="fullContainer">
            <SidebarLayout>
                <Content className=" !bg-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center gap-4 hover:bg-gradient-to-r hover:bg-blue-100 hover:!text-white">
                            <div className="w-16 h-16 bg-blue-400 m-2 rounded-[20px] flex justify-center items-center">
                                <FaRegUser className="text-white text-3xl" />
                            </div>
                            <p className="text-[#334D6E] text-lg"><span className="text-[22px] font-bold">45<br/></span>New leads</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center gap-4 hover:bg-gradient-to-r hover:bg-blue-100 hover:!text-white">
                            <div className="w-16 h-16 bg-blue-400 m-2 rounded-[20px] flex justify-center items-center">
                                <GiGraduateCap className="text-white text-3xl" />
                            </div>
                            <p className="text-[#334D6E] text-lg"><span className="text-[22px] font-bold">45<br/></span>All students</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center gap-4 hover:bg-gradient-to-r hover:bg-blue-100 hover:!text-white">
                            <div className="w-16 h-16 bg-blue-400 m-2 rounded-[20px] flex justify-center items-center">
                                <FaUserGroup className="text-white text-3xl" />
                            </div>
                            <p className="text-[#334D6E] text-lg"><span className="text-[22px] font-bold">45<br/></span>Groups</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center gap-4 hover:bg-gradient-to-r hover:bg-blue-100 hover:!text-white">
                            <div className="w-16 h-16 bg-blue-400 m-2 rounded-[20px] flex justify-center items-center">
                                <FaCoins className="text-white text-3xl" />
                            </div>
                            <p className="text-[#334D6E] text-lg"><span className="text-[22px] font-bold">45<br/></span>Debtors</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 mb-6">
                        <div className="bg-white p-6 max-w-[290px] max-h-[320px] rounded-lg shadow-md col-span-4">
                            <h3 className="text-[14px] font-medium text-[#334D6E]">Payment Status</h3>
                            <PieChart width={200} height={200} className="mx-auto relative">
                                <Pie 
                                    data={pieData} 
                                    dataKey="value" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={50} 
                                    outerRadius={80} 
                                    stroke="none"
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="white"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fontSize="12px"
                                                fontWeight="bold"
                                            >
                                                {(percent * 100).toFixed(0)}%
                                            </text>
                                        );
                                    }}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <text 
                                    x="50%" 
                                    y="50%" 
                                    textAnchor="middle" 
                                    dominantBaseline="central" 
                                    className="text-[#292D30] font-semibold text-[12px]"
                                >
                                    Payments
                                </text>
                            </PieChart>
                            <div className="flex justify-center gap-6 mt-5">
                                {pieData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div 
                                            className="w-8 h-2 rounded-md"
                                            style={{ backgroundColor: entry.color }}
                                        ></div>
                                        <span className="text-[10px] font-medium text-gray-600">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                
                            </div>
                        </div>


                        <div className="bg-white min-w-[565px] ml-[-64px] max-h-[320px] p-6 rounded-lg shadow-md col-span-5">
                            <h3 className="text-[14px] text-[#334D6E] font-semibold mb-4">Monthly Financial Indicators</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} barCategoryGap={5}>
                                    {/* 1px chiziqlar */}
                                    <CartesianGrid strokeDasharray="1 1" stroke="#e0e0e0" vertical={false} />

                                    {/* Oylik X o‘qi */}
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />

                                    {/* Y o‘qi - NumberFormat bilan formatlangan */}
                                    <YAxis
                                        ticks={[10000000, 20000000, 30000000, 40000000, 50000000, 60000000]}
                                        tickFormatter={(value) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}
                                        tick={{ fontSize: 12 }}
                                        domain={[0, 60000000]}
                                    />

                                    {/* Tooltip formatlangan holda */}
                                    <Tooltip formatter={(value) => new Intl.NumberFormat("en-US").format(value as number)} />

                                    {/* Ustunlar - width 30px, yangi rang #005EEB */}
                                    <Bar dataKey="value" fill="#005EEB" className="hover:cursor-pointer hover:text-[#C2DAFF]" radius={[8, 8, 6, 6]} barSize={28} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="rounded-lg col-span-4">
            <div className="flex flex-col gap-3">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="flex bg-white ml-[54px] max-w-[300px] hover:shadow-md duration-200 cursor-pointer items-center p-[12px] rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }} // Har bir element ketma-ket animatsiya bo‘ladi
                    >
                        <Progress
                            type="circle"
                            percent={stat.percent}
                            strokeColor={stat.color}
                            size={75}
                            strokeWidth={15}
                        />
                        <div className="ml-4">
                            <h3 className="text-[10px] text-[#334D6E] mb-2 font-semibold">In This Month</h3>
                            <p className="text-md font-bold mb-2 text-gray-800">{stat.amount} so‘m</p>
                            <div className="flex gap-2">
                                <IoBookOutline className="text-[14px]" style={{ color: stat.color }} />
                                <span className="text-[10px] text-[#334D6E]">General English</span>
                                <GiGraduateCap className="text-[14px]" style={{ color: stat.color }} />
                                <span className="text-[10px] text-[#334D6E]">1255</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
                    </div>

                    <div className="overflow-x-auto pb-10">
                        <Table dataSource={data} columns={columns} rowKey="id" />;
                    </div>
                </Content>
            </SidebarLayout>
        </div>
    );
}
